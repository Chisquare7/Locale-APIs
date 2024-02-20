import express, {Request, Response} from "express"
import userModel from "../models/users"
import bcrypt from "bcrypt"

const createUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: "A new user created successfully"});
    } catch (error) {
        console.error("Error encountered when creating a new user:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export {createUser}