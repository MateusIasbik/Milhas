import * as distanceCalculator from "../../src/services/distances-calculator-service";
import { generatePostMilesUnitTest } from "./fatories/miles-factory-unit";

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Distance Calculator Service Unit Testing", () => {

    it("shold return distance in kilometers", async () => {
        const coords1 = { lat: 52.5200, long: 13.4050 }; // Berlim
        const coords2 = { lat: 48.8566, long: 2.3522 }; // Paris

        const result = distanceCalculator.calculateDistance(coords1, coords2);

        const expectedDistance = 877;
        expect(result).toBeCloseTo(expectedDistance, 0);
    });

    it("shold return distance in miles", async () => {
        const coords1 = { lat: 52.5200, long: 13.4050 }; // Berlim
        const coords2 = { lat: 48.8566, long: 2.3522 }; // Paris

        const result = distanceCalculator.calculateDistance(coords1, coords2, true);

        const expectedDistance = 545;
        expect(result).toBeCloseTo(expectedDistance, 0);
    });

})