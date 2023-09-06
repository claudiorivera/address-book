import {
	ContactDetailsAddressSection,
	ContactDetailsHeader,
	ContactDetailsSection,
} from "~/components";
import { ContactGetByIdOutput } from "~/server/trpc/router/contact";

type Props = {
	contact: ContactGetByIdOutput;
};

export const ContactDetails = ({ contact }: Props) => {
	if (!contact) return null;

	return (
		<div className="flex flex-col items-center gap-4">
			<ContactDetailsHeader contact={contact} />

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
