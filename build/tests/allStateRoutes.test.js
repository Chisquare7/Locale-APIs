"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const globals_1 = require("@jest/globals");
const users_1 = __importDefault(require("../models/users"));
const apiKey_1 = __importDefault(require("../models/apiKey"));
const uuid_1 = require("uuid");
const cacheService_1 = require("../utils/cacheService");
const testUser = {
    email: "testing@example.com",
    password: "test12345678",
};
let server;
let apiKey;
let invalidApiKey;
let validStateCode = "abia";
let invalidStateCode = "london";
let validStateName = "lagos";
let invalidStateName = "alabama";
describe("All State Route Test", () => {
    beforeEach(async () => {
        await users_1.default.deleteMany({});
        await apiKey_1.default.deleteMany({});
        server = server_1.default.listen(3000);
        invalidApiKey = (0, uuid_1.v4)();
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
    }, 30000);
    afterEach((done) => {
        if (server) {
            server.close(done);
        }
        else {
            done();
        }
    });
    // Testing getNigeriaStates Route
    it("should return states with valid API key", async () => {
        if (!apiKey) {
            throw new Error("API key not found");
        }
        const response = await (0, supertest_1.default)(server_1.default).get("/states").set("api-key", apiKey);
        (0, globals_1.expect)(response.status).toEqual(200);
        (0, globals_1.expect)(response.body).toMatchObject({
            success: true,
            result: globals_1.expect.any(Object),
        });
    });
    it("should return forbidden error with invalid API key", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get("/states")
            .set("api-key", invalidApiKey);
        (0, globals_1.expect)(response.status).toEqual(403);
        (0, globals_1.expect)(response.body).toMatchObject({
            success: false,
            message: "Oops! Invalid API key",
        });
    });
    it("should return unauthorized error without API key", async () => {
        const response = await (0, supertest_1.default)(server_1.default).get("/states");
        (0, globals_1.expect)(response.status).toEqual(401);
        (0, globals_1.expect)(response.body).toMatchObject({
            success: false,
            message: "Unauthorized - API key is required",
        });
    });
    // Testing getSingleState Route
    it("should return a single state when provided with a valid state code", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/one-state/code/${validStateCode}`)
            .set("api-key", apiKey);
        (0, globals_1.expect)(response.status).toEqual(200);
        (0, globals_1.expect)(response.body).toMatchObject({
            success: true,
            result: globals_1.expect.any(Object),
        });
        const cachedData = (0, cacheService_1.getCachedData)("nigeriaSingleState");
        (0, globals_1.expect)(cachedData.success).toEqual(true);
        (0, globals_1.expect)(cachedData.data).toBeDefined();
    });
    it("should return 404 error when provided with an invalid state code", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/one-state/code/${invalidStateCode}`)
            .set("api-key", apiKey);
        (0, globals_1.expect)(response.status).toEqual(404);
        (0, globals_1.expect)(response.body).toMatchObject({
            success: false,
            message: `State with code ${invalidStateCode} not found`,
        });
    });
    it("should return 404 error when state code is not provided", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get("/one-state/code")
            .set("api-key", apiKey);
        (0, globals_1.expect)(response.status).toEqual(404);
        (0, globals_1.expect)(response.body).toMatchObject({});
    });
    // Testing State with LGAs Route
    it("should return a single state when provided with a valid state code", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/state-lgas/name/${validStateName}`)
            .set("api-key", apiKey);
        (0, globals_1.expect)(response.status).toEqual(200);
        (0, globals_1.expect)(response.body).toMatchObject({
            success: true,
            result: globals_1.expect.any(Object),
        });
        const cachedData = (0, cacheService_1.getCachedData)("nigeriaStateWithLGAs");
        (0, globals_1.expect)(cachedData.success).toEqual(true);
        (0, globals_1.expect)(cachedData.data).toBeDefined();
    });
    it("should return 404 error when provided with an invalid state name", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/state-lgas/name/${invalidStateName}`)
            .set("api-key", apiKey);
        (0, globals_1.expect)(response.status).toEqual(404);
        (0, globals_1.expect)(response.body).toMatchObject({});
    });
    it("should return 404 error when state name is not provided", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get("/state-lgas/name")
            .set("api-key", apiKey);
        (0, globals_1.expect)(response.status).toEqual(404);
        (0, globals_1.expect)(response.body).toMatchObject({});
    });
    // Testing getLGAs (to get all LGAs under a state) Routes
    it("should return all LGAs in a state when provided with a valid state code", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/lgas/${validStateCode}`)
            .set("api-key", apiKey);
        (0, globals_1.expect)(response.status).toEqual(200);
        (0, globals_1.expect)(response.body).toMatchObject({
            success: true,
            result: globals_1.expect.any(Object),
        });
        const cachedData = (0, cacheService_1.getCachedData)(`stateLGAs_${validStateCode}`);
        (0, globals_1.expect)(cachedData.success).toEqual(true);
        (0, globals_1.expect)(cachedData.data).toBeDefined();
    });
    // Testing getStateTowns (to get all towns in a state) Routes
    it("should return all towns in a state when provided with a valid state code", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/towns/${validStateCode}`)
            .set("api-key", apiKey);
        (0, globals_1.expect)(response.status).toEqual(200);
        (0, globals_1.expect)(response.body).toMatchObject({
            success: true,
            result: globals_1.expect.any(Object),
        });
        const cachedData = (0, cacheService_1.getCachedData)(`stateTowns_${validStateCode}`);
        (0, globals_1.expect)(cachedData.success).toEqual(true);
        (0, globals_1.expect)(cachedData.data).toBeDefined();
    });
});
