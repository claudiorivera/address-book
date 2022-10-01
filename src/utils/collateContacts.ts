import { Contact } from "@prisma/client";

import { sortedInsert } from "./sortedInsert";

type Options = {
	sortKey?: keyof Contact;
};

export const collateContacts = (contacts: Contact[], options?: Options) => {
	const collatedContacts = new Map<string, Contact[]>();

	contacts.forEach((contact) => {
		const key =
			contact[options?.sortKey || "firstName"]?.toUpperCase().slice(0, 1) ||
			"#";

		const contactsArrayForCurrentKey = collatedContacts.get(key);

		if (contactsArrayForCurrentKey) {
			const sortedArray = sortedInsert(
				contactsArrayForCurrentKey,
				contact,
				options?.sortKey,
			);

			collatedContacts.set(key, sortedArray);
		} else {
			collatedContacts.set(key, [contact]);
		}
	});

	return new Map(
		[...collatedContacts.entries()].sort((a, b) => {
			if (a[0] === "#") return 1;
			if (b[0] === "#") return -1;
			return a[0].localeCompare(b[0]);
		}),
	);
};
