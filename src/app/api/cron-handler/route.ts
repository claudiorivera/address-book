import { faker } from "@faker-js/faker";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { contacts } from "~/server/db/schema";

export async function POST() {
	const headersList = await headers();
	const authorization = headersList.get("authorization");

	if (authorization === `Bearer ${env.CRON_SECRET}`) {
		await db.delete(contacts);

		// create 20 contacts
		for (let i = 0; i < 20; i++) {
			const isOftenProvided = Math.random() > 0.33;
			const isRarelyProvided = Math.random() > 0.75;

			await db.insert(contacts).values({
				firstName: isOftenProvided ? faker.person.firstName() : "",
				lastName: isOftenProvided ? faker.person.lastName() : "",
				phoneNumber: `+1${faker.string.numeric(10)}`,
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
	}

	return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
