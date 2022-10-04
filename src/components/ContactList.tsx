import { Contact } from "@prisma/client";
import { useMemo } from "react";

import { collateContacts } from "../utils/collateContacts";
import { ContactListSection } from "./ContactListSection";

type Props = {
	contacts: Contact[] | undefined;
};

export const ContactList = ({ contacts }: Props) => {
	const collatedContacts = useMemo(
		() => collateContacts(contacts || []),
		[contacts],
	);

	return (
		<>
			{Array.from(collatedContacts.entries()).map(([label, contacts]) => (
				<ContactListSection key={label} label={label} contacts={contacts} />
			))}
		</>
	);
};
