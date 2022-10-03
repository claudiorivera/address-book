import { Contact } from "@prisma/client";

type Props = {
	contact: Contact;
};

export const ContactDetailsAddressSection = ({ contact }: Props) => {
	if (!contact.address1) return null;

	return (
		<div className="card w-full rounded bg-base-100 text-xs">
			<div className="card-body px-4 py-2">
				<label className="text-secondary">Address</label>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`https://www.google.com/maps/search/${contact.address1}`}
					className="flex flex-col"
				>
					<span>{contact.address1}</span>
					{contact.address2 && <span>{contact.address2}</span>}
					{contact.city && (
						<span>
							{contact.city}, {contact.state} {contact.zip}
						</span>
					)}
				</a>
			</div>
		</div>
	);
};
