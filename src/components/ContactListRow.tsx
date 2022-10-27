import { InferProcedures } from "@/utils";

type Contact = InferProcedures["contact"]["getById"]["output"];

type Props = {
	contact: Contact;
};

export const ContactListRow = ({ contact }: Props) => {
	return (
		<div className="flex items-center gap-4 px-4 py-2">
			<div className="h-10" />
			<strong className="text-sm font-medium text-base-content">
				<NameOrPhoneNumber contact={contact} />
			</strong>
		</div>
	);
};

type NameOrPhoneNumberProps = {
	contact: Contact;
};

const NameOrPhoneNumber = ({ contact }: NameOrPhoneNumberProps) => {
	if (contact?.firstName || contact?.lastName) {
		return (
			<span>
				{contact.firstName} {contact.lastName}
			</span>
		);
	}

	return <span>{contact?.phoneNumber}</span>;
};
