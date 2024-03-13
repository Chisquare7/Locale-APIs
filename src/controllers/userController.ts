import {Request, Response} from "express"
import userModel from "../models/users"
import bcrypt from "bcrypt"

const createUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: "The provided email is invalid or does not exist in the database"
            })
        }

        if (!password || !password.trim()) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            })
        }

        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Oops! Email already exists and API key already generated"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({email, password: hashedPassword});
        await newUser.save();

        
        const apiKey = await newUser.generateApiKey();

        res.status(201).json({
            success: true,
            message: "A new user created successfully",
            apiKey: apiKey
        });
    } catch (error) {
        console.error("Error encountered when creating a new user:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export {createUser}