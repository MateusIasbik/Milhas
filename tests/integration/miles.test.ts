import supertest from "supertest";
import app from "../../src/app";
import httpStatus from "http-status";
import prisma from "database";
import { generatePostMiles, generateMiles } from "./factories/miles-factory";
import { any, string } from "joi";

const api = supertest(app);

beforeEach(async () => {
    await prisma.miles.deleteMany();
});

describe("POST /miles", () => {

  it("should return code and miles", async () => {
    const trip = await generatePostMiles();
    console.log(trip);

    const { body } = await api.post("/miles").send(trip);
    expect(body).toEqual(
        expect.objectContaining({
            code: expect.any(String),
            miles: expect.any(Number)
        })
    )
  });

})