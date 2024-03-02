import supertest from "supertest";
import app from "../server";
import { expect } from "@jest/globals";
import userModel from "../models/users";
import ApiKeyModel from "../models/apiKey";

const testUser = {
  email: "testing@example.com",
  password: "test12345678",
};

const invalidUserAuth = {
  email: "existingUser@example.com",
  password: "invalid12345678",
};

let server: any;


describe("User signup and Authentication Test", () => {
  beforeEach(async () => {
    await userModel.deleteMany({});
    await ApiKeyModel.deleteMany({});
    server = app.listen(0);
  }, 10000);

  it("should create a new user and return a success message and an API key", async () => {
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
  });

  it("should return an error message if the user already exists", async () => {
    await supertest(app)
      .post("/users")
      .set("content-type", "application/json")
      .send(testUser);
      
    const response = await supertest(app)
      .post("/users")
      .set("content-type", "application/json")
      .send(testUser);

    expect(response.status).toEqual(400);
    expect(response.body).toMatchObject({
      success: false,
      message: "Oops! Email already exists and API key already generated",
    });
  });

  afterAll((done) => {
    server.close(done);
  });
});
