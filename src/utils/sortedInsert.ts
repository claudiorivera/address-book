// https://stackoverflow.com/a/60702475
export function sortedInsert<T>(array: T[], element: T) {
	if (!array.length) return [element];

	const newArray = [...array];

	binarySearch(newArray, element, 0, newArray.length - 1);

	return newArray;
}

function binarySearch<T>(
	array: T[],
	element: T,
	min: number,
	max: number,
): void {
	if (min > max) {
		array.splice(min, 0, element);
		return;
	}

	const mid = Math.floor((max - min) / 2) + min;
	const midElement = array[mid];

	if (midElement && element < midElement) {
		return binarySearch(array, element, min, mid - 1);
	} else if (midElement && element > midElement) {
		return binarySearch(array, element, mid + 1, max);
	} else {
		array.splice(mid, 0, element);
		return;
	}
}
