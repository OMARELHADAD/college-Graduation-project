import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import bcrypt from "bcrypt";

dotenv.config();

mongoose.connect(process.env.MONGO).then(async () => {
    try {
        const hash = bcrypt.hashSync("password123", 5);

        await User.deleteOne({ username: "superadmin" });

        const superadmin = new User({
            username: "superadmin",
            email: "admin@test.com",
            password: hash,
            country: "USA",
            isAdmin: true,
            isSeller: true,
        });

        await superadmin.save();
        console.log("Created 'superadmin' user with password 'password123'!");
    } catch (err) {
        console.error("Error creating superadmin:", err);
    } finally {
        mongoose.connection.close();
    }
});
