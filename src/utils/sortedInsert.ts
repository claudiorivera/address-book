// inspired by https://stackoverflow.com/a/60702475
export function sortedInsert<T>(array: T[], element: T, sortKey?: keyof T) {
	if (!array.length) return [element];

	const newArray = [...array];

	if (sortKey) {
		binarySearchAndInsert(newArray, element, 0, newArray.length - 1, (a, b) =>
			compare(a[sortKey], b[sortKey]),
		);
	} else {
		binarySearchAndInsert(newArray, element, 0, newArray.length - 1, compare);
	}

	return newArray;
}

function binarySearchAndInsert<T>(
	array: T[],
	element: T,
	min: number,
	max: number,
	compareFn: (a: T, b: T) => boolean,
): void {
	if (min > max) {
		array.splice(min, 0, element);
		return;
	}

	const mid = Math.floor((max - min) / 2) + min;
	const midElement = array[mid];

	if (midElement) {
		return compareFn(midElement, element)
			? binarySearchAndInsert(array, element, mid + 1, max, compareFn)
			: binarySearchAndInsert(array, element, min, mid - 1, compareFn);
	}

	array.splice(mid, 0, element);
	return;
}

function compare<T>(a: T, b: T) {
	if (typeof a === "string" && typeof b === "string") {
		return !!a.localeCompare(b);
	}
	return a < b;
}
