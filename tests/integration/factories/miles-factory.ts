import prisma from "database";
import { faker } from "@faker-js/faker";

export async function generateMiles(code: string) {
    return await prisma.miles.create({
        data : { 
            code: code,
            miles: parseFloat((Math.random()).toFixed(4))
         }
    })
}

export async function generatePostMiles() {

    const services = ["ECONOMIC", "ECONOMIC_PREMIUM", "EXECUTIVE", "FIRST_CLASS"];
    const affiliates = ["BRONZE", "SILVER", "GOLD", "PLATINUM"];
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