import { generateMilesForTrip } from "../../src/services/miles-service";
import * as milesRepository from "../../src/repositories/miles-repository";
import { generateMilesUnitTest, generatePostMilesUnitTest } from "./fatories/miles-factory-unit";

describe("Miles Service Unit Testing", () => {

    it("should create miles", async () => {
        const tripData = await generatePostMilesUnitTest();
        const trip = await generateMilesUnitTest();

        jest.spyOn(milesRepository, "saveMiles").mockResolvedValueOnce(trip);

        const miles = await generateMilesForTrip(tripData);

        expect(milesRepository.saveMiles).toHaveBeenCalled();
        expect(miles[0]).toEqual(trip[0]);
    });

})