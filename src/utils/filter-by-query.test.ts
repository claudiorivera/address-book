import { describe, expect, it } from "vitest";
import { filterByQuery } from "./filter-by-query";

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
		expect(filterByQuery({ array: contacts, query: "" })).toEqual(contacts);
		expect(filterByQuery({ array: contacts, query: "do" })).toEqual(contacts);
		expect(filterByQuery({ array: contacts, query: "ja" })).toEqual([
			{
				firstName: "Jane",
				lastName: "Doe",
				photo: {
					url: "https://picsum.photos/100",
				},
			},
		]);
		expect(filterByQuery({ array: contacts, query: "steve" })).toEqual([]);
	});
});
