import { calculateMiles } from "../../src/services/miles-calculator-service";
import { generatePostMilesUnitTest } from "./fatories/miles-factory-unit";
import * as distanceCalculator from "../../src/services/distances-calculator-service";
import { ServiceClass, AffiliateStatus } from "../../src/protocols"; // Importar os tipos


beforeEach(() => {
    jest.clearAllMocks();
  });

describe("Miles Calculator Service Unit Testing", () => {

    it("should calculator miles without bonus", async () => {
        const trip = await generatePostMilesUnitTest();
        const newTrip = { 
            ...trip,
            origin: { lat: 0, long: 0 },
            destination: { lat: 1, long: 1 },
            service: ServiceClass.ECONOMIC,
            affiliate: AffiliateStatus.BRONZE,
            date: "2024-12-01"
        }
        
        const mockDistance = 100;
        jest.spyOn(distanceCalculator, "calculateDistance").mockReturnValueOnce(mockDistance);

        const miles = calculateMiles(newTrip);
        expect(miles).toBe(mockDistance);
    });

    it("should calculator miles with service first-class", async () => {
        const trip = await generatePostMilesUnitTest();
        const newTrip = { 
            ...trip,
            origin: { lat: 0, long: 0 },
            destination: { lat: 1, long: 1 },
            service: ServiceClass.FIRST_CLASS,
            affiliate: AffiliateStatus.BRONZE,
            date: "2024-12-01"
        }
        
        const mockDistance = 100;
        jest.spyOn(distanceCalculator, "calculateDistance").mockReturnValueOnce(mockDistance);

        const result = mockDistance * 2;
        const miles = calculateMiles(newTrip);
        expect(miles).toBe(result);
    });

    it("should calculator miles with affiliate Status Platina", async () => {
        const trip = await generatePostMilesUnitTest();
        const newTrip = { 
            ...trip,
            origin: { lat: 0, long: 0 },
            destination: { lat: 1, long: 1 },
            service: ServiceClass.ECONOMIC,
            affiliate: AffiliateStatus.PLATINUM,
            date: "2024-12-01"
        }
        
        const mockDistance = 100;
        jest.spyOn(distanceCalculator, "calculateDistance").mockReturnValueOnce(mockDistance);

        const result = mockDistance * 1.5;
        const miles = calculateMiles(newTrip);
        expect(miles).toBe(result);
    });

    it("should calculator miles with trip date in May", async () => {
        const trip = await generatePostMilesUnitTest();
        const newTrip = { 
            ...trip,
            origin: { lat: 0, long: 0 },
            destination: { lat: 1, long: 1 },
            service: ServiceClass.ECONOMIC,
            affiliate: AffiliateStatus.BRONZE,
            date: "2024-05-17"
        }
        
        const mockDistance = 100;
        jest.spyOn(distanceCalculator, "calculateDistance").mockReturnValueOnce(mockDistance);

        const result = mockDistance * 1.1;
        const miles = calculateMiles(newTrip);
        expect(miles).toBeCloseTo(result, 5);
    });

})