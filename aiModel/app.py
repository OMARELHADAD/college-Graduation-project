import os
import json
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv("environment.env")
load_dotenv() # Fallback to standard .env

from pymongo import MongoClient
import bson.json_util

app = Flask(__name__)

# Initialize OpenAI client for OpenRouter
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

# Database Connection
mongo_uri = os.getenv("MONGO")
db = None
if mongo_uri:
    try:
        client_mongo = MongoClient(mongo_uri)
        # Try getting default database, fallback to 'test'
        try:
            db = client_mongo.get_database()
        except:
            db = client_mongo["test"] # Fallback DB name
        print("Connected to MongoDB successfully.")
    except Exception as e:
        print(f"MongoDB Connection Failed: {e}")

def get_system_context():
    global db # Access global db
    if db is None:
        # Fallback to static file if DB fails
        if os.path.exists("data2.json"):
            with open("data2.json", "r", encoding="utf-8") as f:
                return json.load(f)
        return {"error": "No database or static data available", "system_status": "Offline"}

    try:
        # Fetch diverse data from DB to give context
        # Limiting to recent/top items to avoid token overflow
        users = list(db.users.find({}, {"password": 0, "createdAt": 0, "updatedAt": 0}).limit(10))
        gigs = list(db.gigs.find().sort("createdAt", -1).limit(10))
        orders = list(db.orders.find().sort("createdAt", -1).limit(5))
        
        # Convert ObjectId to string for JSON serialization
        context_data = {
            "platform_users": json.loads(bson.json_util.dumps(users)),
            "available_gigs": json.loads(bson.json_util.dumps(gigs)),
            "recent_orders": json.loads(bson.json_util.dumps(orders)),
            "system_status": "Online and Connected to Real-time DB"
        }
        return context_data
    except Exception as e:
        print(f"Error fetching DB data: {e}")
        return {"error": f"Failed to fetch database data: {str(e)}", "system_status": "DB Error"}

SYSTEM_INSTRUCTION = """
You are the "Skillverse System AI" — the central intelligence of this freelance platform.
**You have DIRECT ACCESS to the live database**, including users, gigs, and recent orders.

Your Goal:
- Assist users by querying the LIVE data provided to you in the context.
- If a user asks "Who are the designers?", look at the 'available_gigs' or 'platform_users'.
- If a user asks "What are the latest jobs?", look at 'available_gigs'.
- Be helpful, professional, and aware that you see real-time information.

LIMITATION: You can only see the data provided in your context window (top 10 items usually).
If asked about something you don't see, say: "I don't see that in my current snapshot of the database."
"""

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    # Load dynamic data for every request
    data = get_system_context()
    context = json.dumps(data, ensure_ascii=False, indent=2)

    prompt = f"""{SYSTEM_INSTRUCTION}
    
    [LIVE SYSTEM DATABASE SNAPSHOT]:
    {context}
    
    User Query: {user_input}
    
    Assistant:"""

    models_to_try = [
        "mistralai/mistral-7b-instruct:free",
        "huggingfaceh4/zephyr-7b-beta:free",
        "openchat/openchat-7b:free",
        "gryphe/mythomax-l2-13b:free",
        "meta-llama/llama-3-8b-instruct:free",
        "google/gemini-2.0-flash-exp:free",
        "google/gemini-exp-1206:free"
    ]

    answer = None
    last_error = None

    for model in models_to_try:
        try:
            print(f"Trying model: {model}...")
            completion = client.chat.completions.create(
                extra_headers={
                    "HTTP-Referer": "http://localhost:5000",
                    "X-Title": "Freelance Bot",
                },
                model=model,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            answer = completion.choices[0].message.content
            print(f"Success with model: {model}")
            break # Stop loop on success
        except Exception as e:
            print(f"Failed with {model}: {e}")
            last_error = e
            continue # Try next model

    if answer:
        return jsonify({"response": answer})
    else:
        print(f"All models failed. Last error: {last_error}")
        return jsonify({"error": "Service busy. Please try again later."}), 503

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        user_id = request.json.get("userId")
        if not user_id:
            return jsonify({"error": "No userId provided"}), 400

        global db
        if db is None:
             return jsonify({"error": "Database not connected"}), 500

        # 1. Fetch User's Orders to find what they like
        orders = list(db.orders.find({"buyerId": user_id}))
        if not orders:
            return jsonify([]) # No history, return empty list

        # 2. Get Gigs from these orders to find Categories
        purchased_gig_ids = [order["gigId"] for order in orders]
        purchased_gigs = list(db.gigs.find({"_id": {"$in": [bson.ObjectId(gid) for gid in purchased_gig_ids if bson.ObjectId.is_valid(gid)]}}))
        
        favorite_categories = set(g["cat"] for g in purchased_gigs if "cat" in g)
        
        if not favorite_categories:
            return jsonify([])

        # 3. Find Candidate Gigs in these categories (excluding already bought ones)
        candidates = list(db.gigs.find({
            "cat": {"$in": list(favorite_categories)},
            "_id": {"$nin": [bson.ObjectId(gid) for gid in purchased_gig_ids if bson.ObjectId.is_valid(gid)]}
        }).sort("totalStars", -1).limit(10)) # Get top 10 candidates

        if not candidates:
            return jsonify([])

        # 4. Use AI to pick the Top 3 best matches
        candidates_json = json.dumps(json.loads(bson.json_util.dumps(candidates)))
        
        prompt = f"""
        You are a recommendation engine.
        User liked categories: {list(favorite_categories)}
        
        Here are top candidate gigs:
        {candidates_json}
        
        Task: Select exactly 3 gigs that are the most diverse and highest quality from this list.
        Return ONLY a JSON array of their IDs (strings). Example: ["id1", "id2", "id3"].
        Do not explain.
        """

        models_to_try = [
            "mistralai/mistral-7b-instruct:free",
            "meta-llama/llama-3-8b-instruct:free",
            "google/gemini-2.0-flash-exp:free"
        ]

        recommended_ids = []
        
        for model in models_to_try:
            try:
                completion = client.chat.completions.create(
                    extra_headers={
                        "HTTP-Referer": "http://localhost:5000",
                        "X-Title": "Freelance Recommender",
                    },
                    model=model,
                    messages=[{"role": "user", "content": prompt}]
                )
                response_text = completion.choices[0].message.content
                # cleaned_text = response_text.strip().replace("```json", "").replace("```", "")
                # Find JSON array in text
                start = response_text.find("[")
                end = response_text.rfind("]") + 1
                if start != -1 and end != -1:
                    json_str = response_text[start:end]
                    recommended_ids = json.loads(json_str)
                    break
            except Exception as e:
                print(f"Rec fail {model}: {e}")
                continue

        # If AI failed or returned empty, just take top 3 from candidates
        if not recommended_ids:
            recommended_ids = [str(c["_id"]) for c in candidates[:3]]

        # Fetch full objects for the recommended IDs (to ensure order)
        final_recs = []
        for rid in recommended_ids:
            # Find in candidates list to avoid DB roundtrip
            found = next((c for c in candidates if str(c["_id"]) == rid), None)
            if found:
                final_recs.append(found)

        # Convert ObjectId to string for frontend compatibility
        final_recs_simple = []
        for r in final_recs:
            r_simple = r.copy()
            r_simple["_id"] = str(r["_id"])
            if "userId" in r_simple:
                r_simple["userId"] = str(r_simple["userId"])
            final_recs_simple.append(r_simple)

        return jsonify(final_recs_simple)

    except Exception as e:
        print(f"Recommendation Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
