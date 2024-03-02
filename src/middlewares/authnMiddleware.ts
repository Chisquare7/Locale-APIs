import { Request, Response, NextFunction } from "express";
import ApiKeyModel from "../models/apiKey";

const authenticateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const apiKey = req.headers["api-key"];
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - API key is required"
      });
    }

    const existingApiKey = await ApiKeyModel.findOne({key: apiKey});
    if (!existingApiKey) {
      console.log("API Key not found:", apiKey);
      return res.status(403).json({
        success: false,
        message: "Oops! Invalid API key"
      })
    }

    next()
  } catch (error) {
    console.error("Error authenticating API key:", error);
    next(
      new Error("Oops! Failed to authenticate API key")
    );
  }
};

export { authenticateApiKey };
