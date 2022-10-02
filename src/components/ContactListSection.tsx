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
			<section className="sticky top-0 flex items-center bg-slate-50/90 px-4 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 backdrop-blur-sm dark:bg-slate-700/90 dark:text-slate-200 dark:ring-black/10">
				{label}
			</section>
			<div className="divide-y dark:divide-slate-200/5">
				{contacts.map(
					(contact) =>
						contact && (
							<Link key={contact.id} href={`/contacts/${contact.id}`}>
								<a>
									<ContactListRow contact={contact} />
								</a>
							</Link>
						),
				)}
			</div>
		</>
	);
};
