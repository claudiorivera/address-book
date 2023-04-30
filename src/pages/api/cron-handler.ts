import { faker } from "@faker-js/faker";
import { NextApiHandler } from "next";

import { env } from "@/env.mjs";
import { prisma } from "@/server/db/client";

const handler: NextApiHandler = async (req, res) => {
	const { method } = req;

	const { authorization } = req.headers;

	if (authorization === `Bearer ${env.CRON_SECRET}`) {
		switch (method) {
			case "POST":
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
							address2: isRarelyProvided
								? faker.address.secondaryAddress()
								: "",
							city: isRarelyProvided ? faker.address.city() : "",
							state: isRarelyProvided ? faker.address.stateAbbr() : "",
							zip: isRarelyProvided ? faker.address.zipCode("#####") : "",
							notes: isRarelyProvided ? faker.lorem.paragraph() : "",
						},
					});
				}
				return res.status(204).end();
			default:
				res.setHeader("Allow", ["POST"]);
				return res.status(405).end(`Method ${method} Not Allowed`);
		}
	}

	return res.status(401).end("Unauthorized");
};

export default handler;
