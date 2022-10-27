import { ContactListSection } from "@/components";
import { collateContacts, InferProcedures } from "@/utils";

type Props = {
	contacts: InferProcedures["contact"]["getAll"]["output"];
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
