import { faker } from "@faker-js/faker";
import cuid from "cuid";
import { describe, expect, it } from "vitest";
import { type ContactGetAllOutput } from "~/server/api/routers/contact";
import { collateContacts } from "./collateContacts";

const fakeContact = {
	id: cuid(),
	firstName: "",
	lastName: "",
	phoneNumber: "+" + faker.helpers.replaceSymbolWithNumber("###########"),
	email: "",
	address1: "",
	address2: "",
	city: "",
	state: "",
	zip: "",
	notes: "",
	photo: {
		id: cuid(),
		cloudinaryId: "123",
		contactId: cuid(),
		height: 100,
		width: 100,
		url: "https://picsum.photos/100/100",
	},
	createdAt: Date.now(),
	updatedAt: Date.now(),
} satisfies ContactGetAllOutput[number];

describe("collateContacts", () => {
	const contacts: ContactGetAllOutput = [];

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
				photo: {
					id: cuid(),
					cloudinaryId: "123",
					contactId: cuid(),
					height: 100,
					width: 100,
					url: "https://picsum.photos/100/100",
				},
				createdAt: Date.now(),
				updatedAt: Date.now(),
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
				photo: {
					id: cuid(),
					cloudinaryId: "123",
					contactId: cuid(),
					height: 100,
					width: 100,
					url: "https://picsum.photos/100/100",
				},
				createdAt: Date.now(),
				updatedAt: Date.now(),
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
