import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import Gig from "./models/gig.model.js";

dotenv.config();

const categories = [
    "graphics design",
    "digital marketing",
    "writing translation",
    "video animation",
    "music audio",
    "programming",
    "business",
    "lifestyle",
    "data",
    "photography",
    "ai services"
];

const adjectives = ["Professional", "Stunning", "Creative", "Modern", "Unique", "High-Quality", "Expert", "Custom", "Premium", "Fast"];
const verbs = ["create", "design", "build", "write", "edit", "develop", "record", "produce", "optimize", "manage"];
const nouns = {
    "graphics design": ["logo", "flyer", "banner", "business card", "illustration", "UI/UX design", "poster", "infographic"],
    "digital marketing": ["SEO strategy", "social media plan", "email campaign", "ad setup", "content calendar", "marketing audit"],
    "writing translation": ["blog post", "article", "translation", "resume", "cover letter", "script", "product description"],
    "video animation": ["explainer video", "intro/outro", "logo animation", "video editing", "whiteboard animation", "3D model"],
    "music audio": ["voice over", "jingle", "podcast editing", "mixing & mastering", "sound effects", "beat making"],
    "programming": ["website", "mobile app", "script", "bug fix", "API integration", "database design", "Wordpress site"],
    "business": ["business plan", "market research", "virtual assistant", "data entry", "financial consulting", "legal advice"],
    "lifestyle": ["fitness plan", "diet plan", "online lesson", "relationship advice", "gaming coaching", "travel itinerary"],
    "data": ["data analysis", "visualization", "scraping", "cleaning", "formatting", "database management"],
    "photography": ["product photo", "portrait retouching", "event photography", "photo editing", "background removal"],
    "ai services": ["AI art generation", "Midjourney prompt", "ChatGPT workflow", "AI chatbot", "custom AI model", "Stable Diffusion art"]
};

const covers = [
    "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/6954162/pexels-photo-6954162.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/267399/pexels-photo-267399.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/305530/pexels-photo-305530.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600"
];

const fakeSellers = [
    { username: "Alice_Designer", email: "alice@test.com", img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1600" },
    { username: "Bob_Developer", email: "bob@test.com", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600" },
    { username: "Charlie_Writer", email: "charlie@test.com", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600" },
    { username: "Diana_Marketer", email: "diana@test.com", img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600" },
    { username: "Evan_Editor", email: "evan@test.com", img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600" }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");

        // Create or find fake sellers
        const sellerIds = [];
        for (const fake of fakeSellers) {
            let seller = await User.findOne({ email: fake.email });
            if (!seller) {
                seller = new User({
                    username: fake.username,
                    email: fake.email,
                    password: "password123",
                    country: "USA",
                    isSeller: true,
                    desc: `I am ${fake.username}, a professional freelancer on Skillverse.`,
                    img: fake.img
                });
                await seller.save();
                console.log(`Created seller: ${fake.username}`);
            }
            sellerIds.push(seller._id);
        }

        // Clear existing gigs
        await Gig.deleteMany({});
        console.log("Cleared existing gigs");

        const gigs = [];

        for (const cat of categories) {
            const catNouns = nouns[cat] || nouns["graphics design"];

            for (let i = 0; i < 15; i++) {
                const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
                const verb = verbs[Math.floor(Math.random() * verbs.length)];
                const noun = catNouns[Math.floor(Math.random() * catNouns.length)];

                const title = `I will ${verb} a ${adj.toLowerCase()} ${noun} for you`;
                const shortTitle = `${adj} ${noun}`;
                const cover = covers[Math.floor(Math.random() * covers.length)];

                const randomPrice = Math.floor(Math.random() * 100) + 10;
                const randomStars = Math.floor(Math.random() * 5) + 1;

                // Assign to a random fake seller
                const randomSellerId = sellerIds[Math.floor(Math.random() * sellerIds.length)];

                gigs.push({
                    userId: randomSellerId,
                    title: title,
                    desc: `I am an expert in ${cat}. ${title}. I have over 5 years of experience and I guarantee high quality work. Order now!`,
                    shortTitle: shortTitle,
                    shortDesc: `Professional ${noun} service`,
                    cat: cat,
                    price: randomPrice,
                    cover: cover,
                    images: [cover],
                    features: ["Source File", "High Resolution", "Commercial Use"],
                    deliveryTime: Math.floor(Math.random() * 7) + 1,
                    revisionNumber: Math.floor(Math.random() * 3) + 1,
                    totalStars: randomStars * 5,
                    starNumber: 5,
                    sales: Math.floor(Math.random() * 100)
                });
            }
        }

        await Gig.insertMany(gigs);
        console.log(`Successfully added ${gigs.length} gigs assigned to random sellers!`);

        mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
};

seed();
