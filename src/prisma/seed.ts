import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { faker } from "@faker-js/faker";

async function main() {
	// delete all contacts
	await prisma.contact.deleteMany();

	// create 20 contacts
	for (let i = 0; i < 20; i++) {
		const isOftenProvided = Math.random() > 0.2;
		const isRarelyProvided = Math.random() > 0.75;

		await prisma.contact.create({
			data: {
				firstName: isOftenProvided ? faker.name.firstName() : "",
				lastName: isOftenProvided ? faker.name.lastName() : "",
				phoneNumber: faker.phone.number("+1##########"), // assume always provided, for now
				email: isRarelyProvided ? faker.internet.email() : "",
				address1: isRarelyProvided ? faker.address.streetAddress() : "",
				address2: isRarelyProvided ? faker.address.secondaryAddress() : "",
				city: isRarelyProvided ? faker.address.city() : "",
				state: isRarelyProvided ? faker.address.state() : "",
				zip: isRarelyProvided ? faker.address.zipCode() : "",
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
