import { describe, expect, it } from "bun:test";
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
		expect(filterByQuery(contacts, "")).toEqual(contacts);
		expect(filterByQuery(contacts, "do")).toEqual(contacts);
		expect(filterByQuery(contacts, "ja")).toEqual([
			{
				firstName: "Jane",
				lastName: "Doe",
				photo: {
					url: "https://picsum.photos/100",
				},
			},
		]);
		expect(filterByQuery(contacts, "steve")).toEqual([]);
	});
});
