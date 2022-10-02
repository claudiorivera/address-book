import { Contact } from "@prisma/client";

type Props = {
	contact: Contact;
};

export const ContactListRow = ({ contact }: Props) => {
	return (
		<div className="flex items-center gap-4 p-4">
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
	);
};
