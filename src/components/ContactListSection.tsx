import { Contact } from "@prisma/client";
import Link from "next/link";

import { ContactListRow } from "./ContactListRow";

type Props = {
	label: string;
	contacts: Array<Contact | null>;
};

export const ContactListSection = ({ label, contacts }: Props) => {
	return (
		<>
			<section className="sticky top-0 flex items-center bg-base-300 px-4 py-3 text-sm font-semibold text-secondary">
				{label}
			</section>
			{contacts.map(
				(contact) =>
					!!contact && (
						<Link key={contact.id} href={`/contacts/${contact.id}`}>
							<a>
								<ContactListRow contact={contact} />
							</a>
						</Link>
					),
			)}
		</>
	);
};
