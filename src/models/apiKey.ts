import mongoose, { Document, Schema, SchemaDefinitionType } from "mongoose";

export interface ApiKeyDocument extends Document {
  userId: Schema.Types.ObjectId;
  key: string;
}

const apiKeySchema = new Schema<ApiKeyDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  key: { type: String, required: true, unique: true },
});

const ApiKeyModel = mongoose.model<ApiKeyDocument>("ApiKey", apiKeySchema);

export default ApiKeyModel;
