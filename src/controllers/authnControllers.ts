import {Request, Response} from "express";
import ApiKeyModel from "../models/apiKey";
// import { generateApiKey } from "../accessServices/authnService";

const generateApiKey = async (userId: string) => {
    try {
        // const {userId} = req.body;
        const existingApiKey = await ApiKeyModel.findOne({userId});

        if  (existingApiKey) {
            console.error("API Key already generated for this user")
            return
            // return res.status(400).json({message: "API Key already generated for this user"})
        }

        const apiKey = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        const newApiKey = new ApiKeyModel({userId, key: apiKey});

        await newApiKey.save();

        // res.status(201).json({apiKey})
        console.log("API Key generated successfully for user:", userId);
    } catch (error) {
        console.error("Error encountered when generating API key:", error);
        // res.status(500).json({message: "Internal server error"});
    }
};

export { generateApiKey };