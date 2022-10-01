import { faker } from "@faker-js/faker";
import { Contact } from "@prisma/client";
import cuid from "cuid";
import { describe, expect, it } from "vitest";

import { collateContacts } from "./collateContacts";

const fakeContact = {
	id: cuid(),
	firstName: "",
	lastName: "",
	phoneNumber: faker.phone.number("+1##########"),
	email: "",
	address1: "",
	address2: "",
	city: "",
	state: "",
	zip: "",
	notes: "",
};

describe("collateContacts", () => {
	const contacts: Contact[] = [];

	it("should return an object with a # key", () => {
		contacts.length = 0;
		for (let i = 0; i < 3; i++) {
			contacts.push(fakeContact);
		}
		expect(collateContacts(contacts)).toBeInstanceOf(Map);
	});

	it("should return an array in the # key", () => {
		contacts.length = 0;
		for (let i = 0; i < 3; i++) {
			contacts.push(fakeContact);
		}

		const sortedContacts = collateContacts(contacts);

		expect(sortedContacts.get("#")).toBeInstanceOf(Array);
	});

	it("should sort the elements of the array in the # key", () => {
		contacts.length = 0;
		contacts.push(
			{
				id: cuid(),
				firstName: "",
				lastName: "",
				phoneNumber: "+9",
				email: "",
				address1: "",
				address2: "",
				city: "",
				state: "",
				zip: "",
				notes: "",
			},
			{
				id: cuid(),
				firstName: "",
				lastName: "",
				phoneNumber: "+1",
				email: "",
				address1: "",
				address2: "",
				city: "",
				state: "",
				zip: "",
				notes: "",
			},
		);
		const sortedContacts = collateContacts(contacts);

		const numberValues = sortedContacts.get("#");

		const firstValue = numberValues?.[0]?.phoneNumber;
		const secondValue = numberValues?.[1]?.phoneNumber;

		expect(firstValue).toBe("+1");
		expect(secondValue).toBe("+9");
	});
});
