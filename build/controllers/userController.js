"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: "The provided email is invalid or does not exist in the database"
            });
        }
        if (!password || !password.trim()) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }
        const existingUser = await users_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Oops! Email already exists and API key already generated"
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new users_1.default({ email, password: hashedPassword });
        await newUser.save();
        const apiKey = await newUser.generateApiKey();
        res.status(201).json({
            success: true,
            message: "A new user created successfully",
            apiKey: apiKey
        });
    }
    catch (error) {
        console.error("Error encountered when creating a new user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createUser = createUser;
