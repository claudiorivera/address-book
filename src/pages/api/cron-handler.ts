import { faker } from "@faker-js/faker";
import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { contacts } from "~/server/db/schema";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method } = req;

	const { authorization } = req.headers;

	if (authorization === `Bearer ${env.CRON_SECRET}`) {
		switch (method) {
			case "POST":
				await db.delete(contacts);

				// create 20 contacts
				for (let i = 0; i < 20; i++) {
					const isOftenProvided = Math.random() > 0.33;
					const isRarelyProvided = Math.random() > 0.75;

					await db.insert(contacts).values({
						firstName: isOftenProvided ? faker.person.firstName() : "",
						lastName: isOftenProvided ? faker.person.lastName() : "",
						phoneNumber:
							"+" + faker.helpers.replaceSymbolWithNumber("###########"),
						email: isRarelyProvided ? faker.internet.email() : "",
						address1: isRarelyProvided ? faker.location.streetAddress() : "",
						address2: isRarelyProvided ? faker.location.secondaryAddress() : "",
						city: isRarelyProvided ? faker.location.city() : "",
						state: isRarelyProvided
							? faker.location.state({ abbreviated: true })
							: "",
						zip: isRarelyProvided ? faker.location.zipCode("#####") : "",
						notes: isRarelyProvided ? faker.lorem.paragraph() : "",
					});
				}
				return res.status(204).end();
			default:
				res.setHeader("Allow", ["POST"]);
				return res.status(405).end(`Method ${method} Not Allowed`);
		}
	}

	return res.status(401).end("Unauthorized");
}
