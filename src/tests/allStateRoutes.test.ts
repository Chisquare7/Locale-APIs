import supertest from "supertest";
import app from "../server";
import { expect } from "@jest/globals";
import userModel from "../models/users";
import ApiKeyModel from "../models/apiKey";
import { v4 as uuidv4 } from "uuid";
import { getCachedData } from "../utils/cacheService";

const testUser = {
  email: "testing@example.com",
  password: "test12345678",
};

let server: any;
let apiKey: string;
let invalidApiKey: string;

let validStateCode = "abia";
let invalidStateCode = "london";

let validStateName = "lagos";
let invalidStateName = "alabama";

describe("All State Route Test", () => {
  beforeEach(async () => {
    await userModel.deleteMany({});
    await ApiKeyModel.deleteMany({});
    server = app.listen(3000);

    invalidApiKey = uuidv4();

    const response = await supertest(app)
      .post("/users")
      .set("content-type", "application/json")
      .send(testUser);

    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      success: true,
      message: "A new user created successfully",
      apiKey: expect.any(String),
    });

    apiKey = response.body.apiKey;
  }, 30000);

  afterEach((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  // Testing getNigeriaStates Route

  it("should return states with valid API key", async () => {
    if (!apiKey) {
      throw new Error("API key not found");
    }

    const response = await supertest(app).get("/states").set("api-key", apiKey);

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      success: true,
      result: expect.any(Object),
    });
  });

  it("should return forbidden error with invalid API key", async () => {
    const response = await supertest(app)
      .get("/states")
      .set("api-key", invalidApiKey);

    expect(response.status).toEqual(403);
    expect(response.body).toMatchObject({
      success: false,
      message: "Oops! Invalid API key",
    });
  });

  it("should return unauthorized error without API key", async () => {
    const response = await supertest(app).get("/states");

    expect(response.status).toEqual(401);
    expect(response.body).toMatchObject({
      success: false,
      message: "Unauthorized - API key is required",
    });
  });


  // Testing getSingleState Route

  it("should return a single state when provided with a valid state code", async () => {
    const response = await supertest(app)
      .get(`/one-state/code/${validStateCode}`)
      .set("api-key", apiKey);

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      success: true,
      result: expect.any(Object),
    });

    const cachedData = getCachedData("nigeriaSingleState");
    expect(cachedData.success).toEqual(true);
    expect(cachedData.data).toBeDefined();
  });

  it("should return 404 error when provided with an invalid state code", async () => {
    const response = await supertest(app)
      .get(`/one-state/code/${invalidStateCode}`)
      .set("api-key", apiKey);

    expect(response.status).toEqual(404);
    expect(response.body).toMatchObject({
      success: false,
      message: `State with code ${invalidStateCode} not found`,
    });
  });

  it("should return 404 error when state code is not provided", async () => {
    const response = await supertest(app)
      .get("/one-state/code")
      .set("api-key", apiKey);

    expect(response.status).toEqual(404);
    expect(response.body).toMatchObject({});
  });

  // Testing State with LGAs Route

  it("should return a single state when provided with a valid state code", async () => {
    const response = await supertest(app)
      .get(`/state-lgas/name/${validStateName}`)
      .set("api-key", apiKey);

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      success: true,
      result: expect.any(Object),
    });

    const cachedData = getCachedData("nigeriaStateWithLGAs");
    expect(cachedData.success).toEqual(true);
    expect(cachedData.data).toBeDefined();
  });

  it("should return 404 error when provided with an invalid state name", async () => {
    const response = await supertest(app)
      .get(`/state-lgas/name/${invalidStateName}`)
      .set("api-key", apiKey);

    expect(response.status).toEqual(404);
    expect(response.body).toMatchObject({});
  });

  it("should return 404 error when state name is not provided", async () => {
    const response = await supertest(app)
      .get("/state-lgas/name")
      .set("api-key", apiKey);

    expect(response.status).toEqual(404);
    expect(response.body).toMatchObject({});
  });

  // Testing getLGAs (to get all LGAs under a state) Routes

  it("should return all LGAs in a state when provided with a valid state code", async () => {
    const response = await supertest(app)
      .get(`/lgas/${validStateCode}`)
      .set("api-key", apiKey);

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      success: true,
      result: expect.any(Object),
    });

    const cachedData = getCachedData(`stateLGAs_${validStateCode}`);
    expect(cachedData.success).toEqual(true);
    expect(cachedData.data).toBeDefined();
  });

  // Testing getStateTowns (to get all towns in a state) Routes

  it("should return all towns in a state when provided with a valid state code", async () => {
    const response = await supertest(app)
      .get(`/towns/${validStateCode}`)
      .set("api-key", apiKey);

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      success: true,
      result: expect.any(Object),
    });

    const cachedData = getCachedData(`stateTowns_${validStateCode}`);
    expect(cachedData.success).toEqual(true);
    expect(cachedData.data).toBeDefined();
  });

});
