"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useContactFilter } from "~/contexts/contact-filter-provider";
import type { Contact } from "~/server/db/schema";
import { collateContacts } from "~/utils/collate-contacts";

export function ContactList({ contacts = [] }: { contacts: Array<Contact> }) {
	const { query } = useContactFilter();

	const filteredContacts = useMemo(
		() =>
			contacts.filter((contact) => {
				const queryLower = query.toLowerCase();

				return (
					contact.firstName?.toLowerCase().includes(queryLower) ||
					contact.lastName?.toLowerCase().includes(queryLower) ||
					contact.phoneNumber.includes(query)
				);
			}),
		[contacts, query],
	);

	const collatedContacts = useMemo(
		() => collateContacts(filteredContacts),
		[filteredContacts],
	);

	return (
		<section>
			{Array.from(collatedContacts.entries()).map(([label, contacts]) => (
				<div key={label}>
					<div className="sticky top-0 flex items-center bg-background px-4 py-3 font-semibold text-primary-foreground text-sm">
						{label}
					</div>

					{contacts.map((contact) => (
						<Link key={contact.id} href={`/contacts/${contact.id}`}>
							<div className="flex items-center gap-4 py-2">
								<div className="h-10" />
								<strong className="font-medium text-sm">
									<NameOrPhoneNumber contact={contact} />
								</strong>
							</div>
						</Link>
					))}
				</div>
			))}
		</section>
	);
}

function NameOrPhoneNumber({ contact }: { contact: Contact }) {
	if (contact.firstName) {
		return (
			<span>
				{contact.firstName}
				{contact.lastName && ` ${contact.lastName}`}
			</span>
		);
	}

	return <span>{contact.phoneNumber}</span>;
}
