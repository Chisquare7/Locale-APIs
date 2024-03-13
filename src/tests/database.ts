import mongoose, {Connection} from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"


let mongoServer: MongoMemoryServer;
let mongoUri: string;

export async function connect(): Promise<void> {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
}


export async function closeDatabase(): Promise<void> {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop;
    }
}

export async function clearDatabase(): Promise<void> {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({})
    }
}

export function getConnection(): Connection {
    return mongoose.connection;
}

export const mockMongoose = () => {
    const mockConnect = jest.spyOn(mongoose, "connect");
    const mockDisconnect = jest.spyOn(mongoose, "disconnect");

    mockConnect.mockRejectedValue(undefined);
    mockDisconnect.mockRejectedValue(undefined);
}