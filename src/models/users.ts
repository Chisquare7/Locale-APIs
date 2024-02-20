import mongoose, {Document, Schema} from "mongoose";

export interface UserDocument extends Document {
    email: string;
    password: string;
}

const userSchema = new Schema<UserDocument>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

const userModel = mongoose.model<UserDocument>("users", userSchema)

export default userModel;