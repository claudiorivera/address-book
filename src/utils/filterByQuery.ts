export function filterByQuery<T extends Record<string, unknown>>(
	array: T[],
	query: string,
) {
	return array.filter((el) =>
		Object.values(el).some(
			(value) =>
				typeof value === "string" &&
				value.toLowerCase().includes(query.toLowerCase()),
		),
	);
}
