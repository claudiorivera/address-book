import { Contact } from "@prisma/client";
import Link from "next/link";

type Props = {
	contact: Contact;
};

export const ContactDetails = ({ contact }: Props) => {
	return (
		<div className="flex flex-col items-center gap-4">
			{contact.firstName && (
				<h1 className="mb-4 text-2xl font-bold text-base-content">
					{contact.firstName} {contact.lastName}
				</h1>
			)}
			<div className="card w-full rounded bg-base-100 text-xs">
				<div className="card-body px-4 py-2">
					<label className="text-secondary">Phone Number</label>
					<Link href={`tel:${contact.phoneNumber}`}>
						<a>
							<span>{contact.phoneNumber}</span>
						</a>
					</Link>
				</div>
			</div>
			{contact.email && (
				<div className="card w-full rounded bg-base-100 text-xs">
					<div className="card-body px-4 py-2">
						<label className="text-secondary">Email</label>
						<Link href={`mailto:${contact.email}`}>
							<a>
								<span>{contact.email}</span>
							</a>
						</Link>
					</div>
				</div>
			)}
			{contact.address1 && (
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
			)}
			{contact.notes && (
				<div className="card w-full rounded bg-base-100 text-xs">
					<div className="card-body px-4 py-2">
						<label className="text-secondary">Notes</label>
						<p>{contact.notes}</p>
					</div>
				</div>
			)}
		</div>
	);
};
