import { Contact } from "@prisma/client";
import { useMemo } from "react";

import { ContactListSection } from "@/components";
import { collateContacts } from "@/utils";

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
