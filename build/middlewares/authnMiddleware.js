"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateApiKey = void 0;
const apiKey_1 = __importDefault(require("../models/apiKey"));
const authenticateApiKey = async (req, res, next) => {
    try {
        const apiKey = req.headers["api-key"];
        if (!apiKey) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - API key is required"
            });
        }
        const existingApiKey = await apiKey_1.default.findOne({ key: apiKey });
        if (!existingApiKey) {
            console.log("API Key not found:", apiKey);
            return res.status(403).json({
                success: false,
                message: "Oops! Invalid API key"
            });
        }
        next();
    }
    catch (error) {
        console.error("Error authenticating API key:", error);
        next(new Error("Oops! Failed to authenticate API key"));
    }
};
exports.authenticateApiKey = authenticateApiKey;
