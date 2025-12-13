import mongoose from "mongoose";
import dotenv from "dotenv";
import Gig from "./models/gig.model.js";

dotenv.config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO || "mongodb+srv://skillverse:skillverse@cluster0.v3i18.mongodb.net/SkillVerse?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to DB");

        const gigs = await Gig.find({}, { userId: 1, title: 1 });
        console.log("Found", gigs.length, "gigs");

        gigs.forEach(g => {
            const isValid = mongoose.Types.ObjectId.isValid(g.userId);
            console.log(`Gig "${g.title}": userId="${g.userId}" (Valid ObjectId? ${isValid})`);
        });

        mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

checkData();
