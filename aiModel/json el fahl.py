import json
import google.generativeai as genai

genai.configure(api_key="AIzaSyBQWa9NnvPNDVAi0QlsIkQcZYIpGAUdTc0") 

with open("data2.json", "r", encoding="utf-8") as f:
    data = json.load(f)

context = json.dumps(data, ensure_ascii=False, indent=2)

model = genai.GenerativeModel("gemini-2.0-flash")

system_instruction = """
You are a helpful AI assistant for freelancers and clients.
You work on a freelance platform described in the JSON data below.
Your job is to:
- Help freelancers find jobs or projects that match their skills.
- Help clients find suitable freelancers.
- Always use the data provided in the JSON (projects, freelancers, skills, etc.).
You may speak naturally and politely, and you can infer matches logically using the data.
If a user asks something unrelated to freelancing, jobs, clients, or the platform, reply exactly: "sorry i cant assist with that."
Never make up data — only refer to or summarize what's in the JSON.
"""

print("🔹 Chat started! Ask your question below:")
print("🔹 Type 'exit' to quit.\n")

while True:
    user_input = input(" You: ").strip()
    if user_input.lower() in ["exit", "quit"]:
        print(" Goodbye!")
        break

    prompt = f"""{system_instruction}

Here is the JSON data about the freelance platform:
{context}

User: {user_input}

Please:
- Search inside the JSON data for relevant information.
- If the user is a freelancer looking for jobs, suggest projects that match.
- If the user is a client looking for freelancers, suggest suitable ones.
- Use data fields like 'skills', 'projects', 'categories', and 'budget'.
- Speak naturally and friendly.
- If nothing relevant exists in the JSON, say exactly: "sorry i cant assist with that."

Assistant:"""

    response = model.generate_content(prompt)
    answer = response.text.strip()

    print(" Gemini:", answer)
    print()
