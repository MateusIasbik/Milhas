import supertest from "supertest";
import app from "../../src/app";
import httpStatus from "http-status";
import prisma from "database";
import { generatePostMiles, generateMiles } from "./factories/miles-factory";

const api = supertest(app);

beforeEach(async () => {
    await prisma.miles.deleteMany();
});

describe("POST /miles", () => {

  it("should return code and miles", async () => {
    const trip = await generatePostMiles();

    const { body } = await api.post("/miles").send(trip);
    expect(body).toEqual(
        expect.objectContaining({
            code: expect.any(String),
            miles: expect.any(Number)
        })
    )
  });

  it("should return error 409 if code already exists", async () => {
    const trip = await generatePostMiles();
    await generateMiles(trip.code);

    const { status } = await api.post("/miles").send(trip);
    expect(status).toBe(httpStatus.CONFLICT);
  })

})

describe("GET /miles:code", () => {
    
    it("should get miles by code", async () => {
        const trip = await generatePostMiles();
        await generateMiles(trip.code);

        const { body } = await api.get(`/miles/${trip.code}`);
        console.log(body);
        expect(body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                code: expect.any(String),
                miles: expect.any(Number)
            })
        )
    })
})