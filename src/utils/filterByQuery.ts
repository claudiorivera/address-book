export const filterByQuery = <T extends Record<string, unknown>>(
	array: T[],
	query: string,
) =>
	array.filter((el) =>
		Object.values(el).some(
			(value) =>
				!!value &&
				typeof value === "string" &&
				value.toLowerCase().includes(query.toLowerCase()),
		),
	);
