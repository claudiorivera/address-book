import { Contact } from "@prisma/client";

import { ContactDetailsAddressSection } from "./ContactDetailsAddressSection";
import { ContactDetailsSection } from "./ContactDetailsSection";

type Props = {
	contact: Contact;
};

export const ContactDetails = ({ contact }: Props) => {
	return (
		<div className="flex flex-col items-center gap-4">
			{(contact.firstName || contact.lastName) && (
				<h1 className="mb-4 text-2xl font-bold text-base-content">
					{contact.firstName} {contact.lastName}
				</h1>
			)}
			<ContactDetailsSection
				label="Phone Number"
				contact={contact}
				field="phoneNumber"
			/>
			<ContactDetailsSection label="Email" contact={contact} field="email" />
			<ContactDetailsAddressSection contact={contact} />
			<ContactDetailsSection label="Notes" contact={contact} field="notes" />
		</div>
	);
};
