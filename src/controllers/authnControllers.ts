import ApiKeyModel from "../models/apiKey";


const generateApiKey = async (userId: string) => {
    try {
        const existingApiKey = await ApiKeyModel.findOne({userId});

        if  (existingApiKey) {
            console.error("API Key already generated for this user")
            return;
        }

        const apiKey = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        const newApiKey = new ApiKeyModel({userId, key: apiKey});

        await newApiKey.save();

        console.log("API Key generated successfully for user:", userId);
    } catch (error) {
        console.error("Error encountered when generating API key:", error);
        
    }
};

export { generateApiKey };