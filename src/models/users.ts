import mongoose, {Document, Schema} from "mongoose";
import { generateApiKey } from "../controllers/authnControllers";
import ApiKeyModel from "./apiKey";

export interface UserDocument extends Document {
    email: string;
    password: string;
    generateApiKey: () => Promise<string>;
}

export const userSchema = new Schema<UserDocument>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

userSchema.methods.generateApiKey = async function (): Promise<string> {
    const userId = this._id;
    await generateApiKey(userId)
    
    const apiKey = await ApiKeyModel.findOne({userId});
    if (!apiKey) {
        throw new Error("API key not found for the user") 
    }

    return apiKey.key;
}

const userModel = mongoose.model<UserDocument>("users", userSchema)

export default userModel;