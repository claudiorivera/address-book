import { Contact } from "@prisma/client";

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
							<div key={contact.id} className="flex items-center gap-4 p-4">
								<div className="h-10" />
								<strong className="text-sm font-medium text-slate-900 dark:text-slate-200">
									{contact.firstName ? (
										<span>
											{contact.firstName} {contact.lastName}
										</span>
									) : (
										<span>{contact.phoneNumber}</span>
									)}
								</strong>
							</div>
						),
				)}
			</div>
		</>
	);
};
