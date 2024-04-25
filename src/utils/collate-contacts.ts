import type { ContactGetAllOutput } from "~/server/api/routers/contact";
import { sortedInsert } from "./sorted-insert";

type Contact = ContactGetAllOutput[number];

export function collateContacts(
	contacts: ContactGetAllOutput,
	options?: {
		sortKey?: keyof Contact;
	},
) {
	const collatedContacts = new Map<string, ContactGetAllOutput>();

	for (const contact of contacts) {
		const firstInitial = contact.firstName?.toUpperCase().slice(0, 1);

		const key = firstInitial?.length ? firstInitial : "#";

		const contactsForKey = collatedContacts.get(key);

		if (contactsForKey) {
			const sortedArray = sortedInsert(
				contactsForKey,
				contact,
				options?.sortKey,
			);

			collatedContacts.set(key, sortedArray);
		} else {
			collatedContacts.set(key, [contact]);
		}
	}

	return new Map(
		[...collatedContacts.entries()].sort((a, b) => {
			if (a[0] === "#") return 1;
			if (b[0] === "#") return -1;
			return a[0].localeCompare(b[0]);
		}),
	);
}
