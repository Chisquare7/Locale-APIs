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
const testUser = {
    email: "testing@example.com",
    password: "test12345678",
};
const invalidUserAuth = {
    email: "existingUser@example.com",
    password: "invalid12345678",
};
let server;
describe("User signup and Authentication Test", () => {
    beforeEach(async () => {
        await users_1.default.deleteMany({});
        await apiKey_1.default.deleteMany({});
        server = server_1.default.listen(0);
    }, 10000);
    it("should create a new user and return a success message and an API key", async () => {
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
    });
    it("should return an error message if the user already exists", async () => {
        await (0, supertest_1.default)(server_1.default)
            .post("/users")
            .set("content-type", "application/json")
            .send(testUser);
        const response = await (0, supertest_1.default)(server_1.default)
            .post("/users")
            .set("content-type", "application/json")
            .send(testUser);
        (0, globals_1.expect)(response.status).toEqual(400);
        (0, globals_1.expect)(response.body).toMatchObject({
            success: false,
            message: "Oops! Email already exists and API key already generated",
        });
    });
    afterAll((done) => {
        server.close(done);
    });
});
