"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function databaseConnect() {
    mongoose_1.default.connect(process.env.DB_URL, {
        serverSelectionTimeoutMS: 60000,
    });
    mongoose_1.default.connection.on("connected", () => {
        console.log("Database connected successfully");
    });
    mongoose_1.default.connection.on("error", (error) => {
        console.log("Failed Database connection", error);
    });
}
exports.databaseConnect = databaseConnect;
