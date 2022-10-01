import { faker } from "@faker-js/faker";
import { Contact } from "@prisma/client";
import cuid from "cuid";
import { beforeEach, describe, expect, it } from "vitest";

import { collateContacts } from "./collateContacts";

const contacts: Contact[] = [];

beforeEach(async () => {
	// Clear mocks and add some testing data after before each test run
	contacts.length = 0;
	for (let i = 0; i < 10; i++) {
		const isOften = Math.random() > 0.2;
		const isRarely = Math.random() > 0.75;

		contacts.push({
			id: cuid(),
			firstName: isOften ? faker.name.firstName() : "",
			lastName: isOften ? faker.name.lastName() : "",
			phoneNumber: faker.phone.number("+1##########"),
			email: isRarely ? faker.internet.email() : "",
			address1: isRarely ? faker.address.streetAddress() : "",
			address2: isRarely ? faker.address.secondaryAddress() : "",
			city: isRarely ? faker.address.city() : "",
			state: isRarely ? faker.address.state() : "",
			zip: isRarely ? faker.address.zipCode() : "",
			notes: isRarely ? faker.lorem.paragraph() : "",
		});
	}
});

describe("collateContacts", () => {
	it("should return an object with a # key", () => {
		expect(collateContacts(contacts)).toHaveProperty("#");
	});

	it("should return an object with alpha keys first and numbers last", () => {
		const keys = Object.keys(collateContacts(contacts));

		expect(keys[0]).toMatch(/^[A-Z]$/);
		expect(keys[keys.length - 1]).toBe("#");
	});

	it("should return an object with alpha keys in alphabetical order", () => {
		const keys = Object.keys(collateContacts(contacts));

		const alphaKeys = keys.filter((key) => key !== "#");

		expect(alphaKeys).toEqual(alphaKeys.sort());
	});
});
