import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/user.model.js";
import Gig from "./models/gig.model.js";
import Order from "./models/order.model.js";
import Review from "./models/review.model.js";
import Conversation from "./models/conversation.model.js";
import Message from "./models/message.model.js";

dotenv.config();

const run = async () => {
    try {
        console.log("Connection to DB...");
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to DB!");

        // 1. Clear Database
        console.log("Clearing old data...");
        await User.deleteMany();
        await Gig.deleteMany();
        await Order.deleteMany();
        await Review.deleteMany();
        await Conversation.deleteMany();
        await Message.deleteMany();
        console.log("Database Cleared.");

        const hash = bcrypt.hashSync("123456", 5);

        // 2. Create Sellers (Team Members)
        const teamSellers = [
            { user: "omar_dev", email: "omar@test.com", name: "Omar Elhadad" },
            { user: "zyad_back", email: "zyad@test.com", name: "Zyad Elhosiny" },
            { user: "mahmoud_ai", email: "mahmoud@test.com", name: "Mahmoud Khedr" },
            { user: "rahma_ui", email: "rahma@test.com", name: "Rahma Ahmed" },
            { user: "zyad_ui", email: "zyad2@test.com", name: "Zyad Nagdy" }
        ];

        const savedSellers = [];
        for (const s of teamSellers) {
            const newUser = new User({
                username: s.user,
                email: s.email,
                password: hash,
                isSeller: true,
                country: "Egypt",
                desc: `I am ${s.name}, a professional freelancer on Skillverse.`,
                img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
            });
            const saved = await newUser.save();
            savedSellers.push(saved);
        }
        console.log("Created 5 Freelancers (Sellers).");

        // 3. Create Buyers
        const buyers = [
            { user: "alice_buyer", email: "alice@test.com" },
            { user: "bob_buyer", email: "bob@test.com" },
            { user: "charlie_buyer", email: "charlie@test.com" },
            { user: "david_buyer", email: "david@test.com" },
            { user: "eve_buyer", email: "eve@test.com" }
        ];

        for (const b of buyers) {
            const newUser = new User({
                username: b.user,
                email: b.email,
                password: hash,
                isSeller: false, // Buyer
                country: "USA",
                img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600"
            });
            await newUser.save();
        }
        console.log("Created 5 Buyers.");

        // 4. Create Gigs for Sellers
        // User requested "2 gigs in each field" for each account.
        // We include ALL 9 categories found in the Navbar to ensure complete coverage.
        // Categories must use spaces (not hyphens) to match frontend routing (e.g. "?cat=graphics design")
        const categories = [
            "graphics design",
            "video animation",
            "writing translation",
            "ai services",
            "digital marketing",
            "music audio",
            "programming",
            "business",
            "lifestyle"
        ];

        const images = [
            "https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/6039245/pexels-photo-6039245.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/14081711/pexels-photo-14081711.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/3584970/pexels-photo-3584970.jpeg?auto=compress&cs=tinysrgb&w=1600"
        ];

        let gigCount = 0;
        for (const seller of savedSellers) {
            for (const cat of categories) {
                // Create 2 gigs per category for this seller
                for (let i = 1; i <= 2; i++) {
                    await Gig.create({
                        userId: seller._id,
                        pp: seller.img, // Add Profile Pic
                        username: seller.username, // Add Username
                        title: `I will do professional ${cat} service ${i}`,
                        desc: `This is a premium service for ${cat} offered by ${seller.username}. We provide top quality work with unlimited revisions to help your business grow.`,
                        totalStars: Math.floor(Math.random() * 5) + 1, // 1-5 stars
                        starNumber: Math.floor(Math.random() * 50) + 1, // 1-50 reviews
                        cat: cat, // Use space-separated category to match Navbar links
                        price: (Math.floor(Math.random() * 9) + 1) * 10 + 9, // e.g. 19, 29, ..., 99
                        cover: images[Math.floor(Math.random() * images.length)],
                        shortTitle: `Expert ${cat} ${i}`,
                        shortDesc: "High quality, fast delivery.",
                        deliveryTime: Math.floor(Math.random() * 5) + 1,
                        revisionNumber: 3,
                        features: ["Source File", "High Resolution", "Commercial Use", "24/7 Support"],
                        sales: Math.floor(Math.random() * 100)
                    });
                    gigCount++;
                }
            }
        }

        console.log(`Created ${gigCount} Gigs.`);
        console.log("SEEDING COMPLETE!");
        console.log("------------------------------------------------");
        console.log("FREELANCERS (Password: 123456):");
        teamSellers.forEach(s => console.log(`- ${s.name} (${s.user}) -> ${s.email}`));
        console.log("\nBUYERS (Password: 123456):");
        buyers.forEach(b => console.log(`- ${b.user} -> ${b.email}`));
        console.log("------------------------------------------------");

        process.exit();

    } catch (err) {
        console.log("Seeding Error:", err);
        process.exit(1);
    }
};

run();
