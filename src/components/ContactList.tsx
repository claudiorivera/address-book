import { ContactListSection } from "@/components";
import { ContactGetAllOutput } from "@/server/trpc/router/contact";
import { collateContacts } from "@/utils";

type Props = {
	contacts: ContactGetAllOutput;
};

export const ContactList = ({ contacts }: Props) => {
	const collatedContacts = collateContacts(contacts);

	return (
		<>
			{Array.from(collatedContacts.entries()).map(([label, contacts]) => (
				<ContactListSection key={label} label={label} contacts={contacts} />
			))}
		</>
	);
};
