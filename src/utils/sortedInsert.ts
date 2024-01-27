// inspired by https://stackoverflow.com/a/60702475
export function sortedInsert<Element>(
	array: Array<Element>,
	element: Element,
	sortKey?: keyof Element,
) {
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

function binarySearchAndInsert<Element>(
	array: Array<Element>,
	element: Element,
	min: number,
	max: number,
	compareFn: (a: Element, b: Element) => boolean,
): () => void {
	if (min > max) {
		array.splice(min, 0, element);
		return () => {};
	}

	const mid = Math.floor((max - min) / 2) + min;
	const midElement = array[mid];

	if (midElement) {
		return compareFn(midElement, element)
			? binarySearchAndInsert(array, element, mid + 1, max, compareFn)
			: binarySearchAndInsert(array, element, min, mid - 1, compareFn);
	}

	array.splice(mid, 0, element);
	return () => {};
}

function compare<Value>(a: Value, b: Value) {
	if (typeof a === "string" && typeof b === "string") {
		return !!a.localeCompare(b);
	}
	return a < b;
}
