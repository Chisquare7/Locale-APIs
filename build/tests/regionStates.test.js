"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const globals_1 = require("@jest/globals");
const regionStates_1 = __importDefault(require("../models/regionStates"));
const users_1 = __importDefault(require("../models/users"));
const apiKey_1 = __importDefault(require("../models/apiKey"));
const testUser = {
    email: "testing@example.com",
    password: "test12345678",
};
let server;
let apiKey;
let validRegionCode = "nc";
let invalidRegionCode = "tr";
const seedRegion = {
    region: {
        name: "Testing Region",
        region_code: validRegionCode,
        major_languages: ["English"],
        population: 1000000,
        total_area: "500",
        states: [
            {
                name: "State 1",
                capital: "Capital 1",
                state_code: "Code 1",
                creation_date: "2024-01-01",
                location: {
                    latitude: "0",
                    longitude: "0",
                },
                total_area: "100",
                population: 500000,
                postal_code: 12345,
                religions: ["Religion 1"],
            },
            {
                name: "State 2",
                capital: "Capital 2",
                state_code: "Code 2",
                creation_date: "2024-01-02",
                location: {
                    latitude: "1",
                    longitude: "1",
                },
                total_area: "200",
                population: 700000,
                postal_code: 67890,
                religions: ["Religion 2"],
            },
        ],
    },
};
describe("Region Routes Test", () => {
    beforeEach(async () => {
        await users_1.default.deleteMany({});
        await apiKey_1.default.deleteMany({});
        // await regionStateModel.deleteMany({});
        server = server_1.default.listen(3000);
        const response = await (0, supertest_1.default)(server_1.default)
            .post("/users")
            .set("content-type", "application/json")
            .send(testUser);
        (0, globals_1.expect)(response.status).toEqual(201);
        (0, globals_1.expect)(response.body).toMatchObject({
            success: true,
            message: "A new user created successfully",
            apiKey: globals_1.expect.any(String),
        });
        apiKey = response.body.apiKey;
        if (!(await regionStates_1.default.findOne({ region_code: validRegionCode }))) {
            (await regionStates_1.default.create(seedRegion)).save();
        }
    }, 30000);
    afterEach((done) => {
        if (server) {
            server.close(done);
        }
        else {
            done();
        }
    });
    it("should return all regions successfully", async () => {
        const response = await (0, supertest_1.default)(server_1.default).get("/regions/all").set("api-key", apiKey);
        (0, globals_1.expect)(response.status).toEqual(200);
        (0, globals_1.expect)(response.body).toMatchObject({
            success: true,
            result: globals_1.expect.any(Object),
        });
    });
    it("should return an error for an invalid region code", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/one-region/code/${invalidRegionCode}`)
            .set("api-key", apiKey);
        (0, globals_1.expect)(response.status).toEqual(404);
        (0, globals_1.expect)(response.body).toMatchObject({});
    });
});
