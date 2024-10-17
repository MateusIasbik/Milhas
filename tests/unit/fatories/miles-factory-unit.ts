import { faker } from "@faker-js/faker";
import { AffiliateStatus, ServiceClass } from "../../../src/protocols/index";

export async function generateMilesUnitTest() {
    return {
        id: parseFloat((Math.random()).toFixed(4)),
        code: faker.string.uuid(),
        miles: parseFloat((Math.random()).toFixed(4))

    }
}

export async function generateMilesByCode(code: string) {
    return {
        id: parseFloat((Math.random()).toFixed(4)),
        code,
        miles: parseFloat((Math.random()).toFixed(4))

    }
}

export async function generatePostMilesUnitTest() {

    const services: ServiceClass[] = [ServiceClass.ECONOMIC, ServiceClass.ECONOMIC_PREMIUM, ServiceClass.EXECUTIVE, ServiceClass.FIRST_CLASS];
    const affiliates: AffiliateStatus[] = [AffiliateStatus.BRONZE, AffiliateStatus.SILVER, AffiliateStatus.GOLD, AffiliateStatus.PLATINUM];
    const date = faker.date.future();
    const formattedDate = date.toISOString().split('T')[0];
    const fakeFalse = false;

    return {
        code: faker.string.uuid(),
        origin: {
            lat: parseFloat((Math.random() * 180 - 90).toFixed(2)),
            long: parseFloat((Math.random() * 360 - 180).toFixed(2)),
        },
        destination: {
            lat: parseFloat((Math.random() * 180 - 90).toFixed(2)),
            long: parseFloat((Math.random() * 360 - 180).toFixed(2))
        },
        miles: fakeFalse,
        plane: faker.company.name(),
        service: faker.helpers.arrayElement(services),
        affiliate: faker.helpers.arrayElement(affiliates),
        date: formattedDate
    }
}