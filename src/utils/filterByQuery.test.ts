import { describe, expect, it } from "vitest";

import { filterByQuery } from "./filterByQuery";

describe("filterByQuery", () => {
	const contacts = [
		{
			firstName: "John",
			lastName: "Doe",
			photo: {
				url: "https://picsum.photos/100",
			},
		},
		{
			firstName: "Jane",
			lastName: "Doe",
			photo: {
				url: "https://picsum.photos/100",
			},
		},
	];

	it("should filter by any key", () => {
		expect(filterByQuery(contacts, "")).toEqual(contacts);
		expect(filterByQuery(contacts, "do")).toEqual(contacts);
		expect(filterByQuery(contacts, "ja")).toEqual([contacts[1]]);
		expect(filterByQuery(contacts, "steve")).toEqual([]);
	});
});
