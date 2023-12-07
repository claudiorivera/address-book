import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	// delete all contacts
	await prisma.contact.deleteMany();

	// create 20 contacts
	for (let i = 0; i < 20; i++) {
		const isOftenProvided = Math.random() > 0.2;
		const isRarelyProvided = Math.random() > 0.75;

		await prisma.contact.create({
			data: {
				firstName: isOftenProvided ? faker.person.firstName() : "",
				lastName: isOftenProvided ? faker.person.lastName() : "",
				phoneNumber: "+" + faker.helpers.replaceSymbolWithNumber("###########"),
				email: isRarelyProvided ? faker.internet.email() : "",
				address1: isRarelyProvided ? faker.location.streetAddress() : "",
				address2: isRarelyProvided ? faker.location.secondaryAddress() : "",
				city: isRarelyProvided ? faker.location.city() : "",
				state: isRarelyProvided ? faker.location.state() : "",
				zip: isRarelyProvided ? faker.location.zipCode("#####") : "",
				notes: isRarelyProvided ? faker.lorem.paragraph() : "",
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
