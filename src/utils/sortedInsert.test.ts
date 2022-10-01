import { describe, expect, it } from "vitest";

import { sortedInsert } from "./sortedInsert";

describe("sortedInsert", () => {
	it("should return an array with +1 length than the original", () => {
		const myArray = [1, 2, 3, 4, 5];
		const result = sortedInsert(myArray, 3);
		expect(result.length).toBe(myArray.length + 1);
	});

	it("should insert the new element in the correct sorted position", () => {
		const array1 = [1, 3];
		const result1 = sortedInsert(array1, 2);
		expect(result1).toEqual([1, 2, 3]);

		const array2 = [4, 6, 7];
		const result2 = sortedInsert(array2, 5);
		expect(result2).toEqual([4, 5, 6, 7]);

		const array3 = [1, 2];
		const result3 = sortedInsert(array3, 0);
		expect(result3).toEqual([0, 1, 2]);

		const array4 = [1, 2];
		const result4 = sortedInsert(array4, 3);
		expect(result4).toEqual([1, 2, 3]);

		const array5: Array<number> = [];
		const result5 = sortedInsert(array5, 1);
		expect(result5).toEqual([1]);
	});

	it("should sort objects by a given sort key", () => {
		const array1 = [{ id: 1 }, { id: 3 }];
		const result1 = sortedInsert(array1, { id: 2 }, "id");
		expect(result1).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);

		const array2 = [{ id: 4 }, { id: 6 }, { id: 7 }];
		const result2 = sortedInsert(array2, { id: 5 }, "id");
		expect(result2).toEqual([{ id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }]);

		const array3 = [{ id: 1 }, { id: 2 }];
		const result3 = sortedInsert(array3, { id: 0 }, "id");
		expect(result3).toEqual([{ id: 0 }, { id: 1 }, { id: 2 }]);

		const array4 = [{ id: 1 }, { id: 2 }];
		const result4 = sortedInsert(array4, { id: 3 }, "id");
		expect(result4).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);

		const array5: Array<{ id: number }> = [];
		const result5 = sortedInsert(array5, { id: 1 }, "id");
		expect(result5).toEqual([{ id: 1 }]);
	});
});
