import {Request, Response} from "express";
import ApiKeyModel from "../models/apiKey";
// import { generateApiKey } from "../accessServices/authnService";

const generateApiKeyController = async (req: Request, res: Response) => {
    try {
        const {userId} = req.body;
        const existingApiKey = await ApiKeyModel.findOne({userId});

        if  (existingApiKey) {
            return res.status(400).json({message: "API Key already generated for this user"})
        }

        const apiKey = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        const newApiKey = new ApiKeyModel({userId, key: apiKey});

        await newApiKey.save();

        res.status(201).json({apiKey})
    } catch (error) {
        console.error("Error encountered when generating API key:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export { generateApiKeyController };