"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiKey = void 0;
const apiKey_1 = __importDefault(require("../models/apiKey"));
const generateApiKey = async (userId) => {
    try {
        const existingApiKey = await apiKey_1.default.findOne({ userId });
        if (existingApiKey) {
            console.error("API Key already generated for this user");
            return;
        }
        const apiKey = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        const newApiKey = new apiKey_1.default({ userId, key: apiKey });
        await newApiKey.save();
        console.log("API Key generated successfully for user:", userId);
    }
    catch (error) {
        console.error("Error encountered when generating API key:", error);
    }
};
exports.generateApiKey = generateApiKey;
