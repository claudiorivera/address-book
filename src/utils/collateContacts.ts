import { Contact } from "@prisma/client";

type Options = {
	sortKey?: "firstName" | "lastName";
};

export const collateContacts = (contacts: Contact[], options?: Options) => {
	const collatedContacts = new Map<string, Contact[]>();

	contacts.forEach((contact) => {
		const key =
			contact[options?.sortKey || "firstName"]?.toUpperCase().slice(0, 1) ||
			"#";

		if (!collatedContacts.has(key)) {
			collatedContacts.set(key, [contact]);
		} else {
			collatedContacts.get(key)?.push(contact);
		}
	});

	return collatedContacts;
};
