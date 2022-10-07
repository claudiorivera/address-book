import { Contact } from "@prisma/client";

import { getGoogleMapsUrlForContact } from "../utils/getGoogleMapsUrlForContact";

type Props = {
	contact: Contact;
};

export const ContactDetailsAddressSection = ({ contact }: Props) => {
	const { address1, address2, city, state, zip } = contact;

	const hasNoAddressFields = [address1, address2, city, state, zip].every(
		(field) => !field,
	);

	if (hasNoAddressFields) return null;

	return (
		<div className="card w-full rounded bg-base-100 text-xs">
			<div className="card-body px-4 py-2">
				<label className="text-secondary">Address</label>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={getGoogleMapsUrlForContact(contact)}
					className="flex flex-col"
				>
					<div className="flex flex-col">
						<span>{address1}</span>
						<span>{address2}</span>
						<span>
							{city}
							{state ? ", " : ""}
							{state}
							{zip ? " " : ""}
							{zip}
						</span>
					</div>
				</a>
			</div>
		</div>
	);
};
