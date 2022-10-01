import { inferProcedureOutput } from "@trpc/server";

import { AppRouter } from "../server/trpc/router";
import { ContactListSection } from "./ContactListSection";

type Contact = inferProcedureOutput<AppRouter["contact"]["getById"]>;

type Props = {
	collatedContacts: Map<string, Contact[]>;
};

export const ContactList = ({ collatedContacts }: Props) => {
	return (
		<>
			{Array.from(collatedContacts.entries()).map(([label, contacts]) => (
				<ContactListSection key={label} label={label} contacts={contacts} />
			))}
		</>
	);
};
