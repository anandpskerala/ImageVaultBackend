import mongoose from "mongoose";
import { config } from "@/config.js";

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("MongoDB Connected");
    });

    mongoose.connection.on("error", (err) => {
        console.error("Mongoose connection error:", err);
    });
    try {
        await mongoose.connect(config.db, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("Mongoose connection closed (app termination)");
            process.exit(0);
        });
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
};

export default connectDB;