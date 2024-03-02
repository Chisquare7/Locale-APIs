import mongoose, {Connection} from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"

// mongoose.Promise = global.Promise;

// class ConnectionManager {

//     public mongoServer: MongoMemoryServer
//     public connection: MongooseConnection | null;

//     constructor () {
//         this.mongoServer = new MongoMemoryServer();
//         this.connection = null
//     }

//     async start(): Promise<void> {
//         this.mongoServer = await MongoMemoryServer.create();
//     }

//     async connect (): Promise<void> {
//         const mongoUri = await this.mongoServer.getUri();
        
//         this.connection = await mongoose.createConnection(mongoUri);
//     }

//     async disconnect(): Promise<void> {
//         if (this.connection) {
//             await this.connection.close();
//         }
//         await this.mongoServer.stop()
//     }

//     async cleanup(): Promise<void> {
//         if (!this.connection) {
//             throw new Error("Connection not established");
//         }

//         const models = Object.keys(this.connection.models);
//         const promises: Promise<any>[] = [];

//         models.forEach((model) => {
//             promises.push(this.connection!.models[model].deleteMany([]));
//         })

//         await Promise.all(promises);
//     }

// }

// export {ConnectionManager};


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