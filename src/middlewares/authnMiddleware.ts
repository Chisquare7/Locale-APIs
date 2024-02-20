import { Request, Response, NextFunction } from "express";
import ApiKeyModel from "../models/apiKey";
// import dotenv from "dotenv";

// dotenv.config();

const authenticateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const apiKey = req.headers["api-key"];
    if (!apiKey) {
      return res.status(401).json({ message: "Unauthorized - API key is required" });
    }

    const existingApiKey = await ApiKeyModel.findOne({key: apiKey});
    if (!existingApiKey) {
      return res.status(403).json({message: "Oops! Invalid API key"})
    }

    next()
  } catch (error) {
    console.error("Error authenticating API key:", error);
    res.status(500).json({message: "Internal Server Error"})
  }
};

export { authenticateApiKey };
