"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockMongoose = exports.getConnection = exports.clearDatabase = exports.closeDatabase = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongoServer;
let mongoUri;
async function connect() {
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose_1.default.connect(mongoUri);
}
exports.connect = connect;
async function closeDatabase() {
    await mongoose_1.default.disconnect();
    if (mongoServer) {
        await mongoServer.stop;
    }
}
exports.closeDatabase = closeDatabase;
async function clearDatabase() {
    const collections = mongoose_1.default.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}
exports.clearDatabase = clearDatabase;
function getConnection() {
    return mongoose_1.default.connection;
}
exports.getConnection = getConnection;
const mockMongoose = () => {
    const mockConnect = jest.spyOn(mongoose_1.default, "connect");
    const mockDisconnect = jest.spyOn(mongoose_1.default, "disconnect");
    mockConnect.mockRejectedValue(undefined);
    mockDisconnect.mockRejectedValue(undefined);
};
exports.mockMongoose = mockMongoose;
