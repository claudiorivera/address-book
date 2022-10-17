import NextImage from "next/future/image";

import { ContactType } from "../pages/contacts/[contactId]";

type Props = {
	contact: ContactType;
};

export const ContactDetailsHeader = ({ contact }: Props) => {
	if (!contact) return null;

	return (
		<>
			<div className="avatar placeholder">
				<div className="w-24 rounded-full bg-base-100 text-primary-content ring ring-secondary">
					{!contact.photo?.url && (
						<span className="text-3xl">
							{contact.firstName?.charAt(0).toUpperCase()}
							{contact.lastName?.charAt(0).toUpperCase()}
						</span>
					)}
					{!!contact.photo?.url && (
						<NextImage
							src={contact.photo.url}
							alt="avatar"
							height={contact.photo.height}
							width={contact.photo.width}
						/>
					)}
				</div>
			</div>
			<h1 className="mb-4 text-2xl font-bold text-base-content">
				{contact.firstName} {contact.lastName}
			</h1>
		</>
	);
};
