import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

function databaseConnect(): void {
    mongoose.connect(process.env.DB_URL as string, {
        serverSelectionTimeoutMS: 60000,
    });

    mongoose.connection.on("connected", () => {
        console.log("Database connected successfully");
    });

    mongoose.connection.on("error", (error: Error) => {
        console.log("Failed Database connection", error)
    });
}

export { databaseConnect };