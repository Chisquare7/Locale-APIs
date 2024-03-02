import supertest from "supertest";
import app from "../server";
import {expect} from "@jest/globals";
import regionStateModel from "../models/regionStates";
import userModel from "../models/users";
import ApiKeyModel from "../models/apiKey";
// import { mockMongoose, connect, closeDatabase, clearDatabase } from "./database";


const testUser = {
  email: "testing@example.com",
  password: "test12345678",
};

let server: any;
let apiKey: string;

let validRegionCode = "nc";
let invalidRegionCode = "tr"

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
        await userModel.deleteMany({});
        await ApiKeyModel.deleteMany({});
        await regionStateModel.deleteMany({});

        server = app.listen(3000);

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

        if (
          !(await regionStateModel.findOne({ region_code: validRegionCode }))
        ) {
          (await regionStateModel.create(seedRegion)).save();
        }

    }, 30000)

    afterEach((done) => {
        if (server) {
            server.close(done);
        } else {
            done();
        }
    });

    it("should return all regions successfully", async () => {
        const response = await supertest(app).get("/region").set("api-key", apiKey)

        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject({
          success: true,
          result: expect.any(Object),
        });
    });

    it("should return an error for an invalid region code", async () => {
        const response = await supertest(app)
          .get(`/one-region/code/${invalidRegionCode}`)
          .set("api-key", apiKey);

        expect(response.status).toEqual(404);
        expect(response.body).toMatchObject({});
    });
})
