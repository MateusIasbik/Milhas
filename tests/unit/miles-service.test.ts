import { generateMilesForTrip, getMilesFromCode } from "../../src/services/miles-service";
import * as milesRepository from "../../src/repositories/miles-repository";
import { generateMilesByCode, generateMilesUnitTest, generatePostMilesUnitTest } from "./fatories/miles-factory-unit";

beforeEach(() => {
    jest.clearAllMocks();
  });

describe("Miles Service Unit Testing", () => {

    it("should create miles", async () => {
        const tripData = await generatePostMilesUnitTest();
        const trip = await generateMilesUnitTest();

        jest.spyOn(milesRepository, "saveMiles").mockResolvedValueOnce(trip);

        const miles = await generateMilesForTrip(tripData);

        expect(milesRepository.saveMiles).toHaveBeenCalled();
        expect(miles[0]).toEqual(trip[0]);
    });

    it("should return error if miles already registered for code", async () => {
        const tripData = await generatePostMilesUnitTest();
        const existingMiles = { 
            id: 1,
            code: tripData.code,
            miles: 100
        };

        jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(existingMiles);

        const promise = generateMilesForTrip(tripData);

        expect(promise).rejects.toEqual({
            type: "conflict",
            message: `Miles already registered for code ${tripData.code}`
          })
    });

    it("should get miles by code", async () => {
        const tripData = await generatePostMilesUnitTest();
        const trip = await generateMilesByCode(tripData.code);

        jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(trip);

        const result = await getMilesFromCode(tripData.code);

        expect(milesRepository.findMiles).toHaveBeenCalled();
        expect(result[0]).toEqual(trip[0]);

    });

})




