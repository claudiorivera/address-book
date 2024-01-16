import type { GetServerSidePropsContext } from "next";
import NextImage from "next/image";
import Link from "next/link";
import { ConditionalWrapper } from "~/components/ConditionalWrapper";
import { type ContactGetByIdOutput } from "~/server/api/routers/contact";
import { api } from "~/utils/api";
import { getGoogleMapsUrlForContact } from "~/utils/getGoogleMapsUrlForContact";
import { hrefPrefixForField } from "~/utils/getHrefPrefixForField";

type Contact = NonNullable<ContactGetByIdOutput>;

export function getServerSideProps({ query }: GetServerSidePropsContext) {
	if (typeof query["contactId"] !== "string") {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			contactId: query["contactId"],
		},
	};
}

export default function ContactDetailsPage({
	contactId,
}: {
	contactId: string;
}) {
	const { data: contact } = api.contact.getById.useQuery({
		id: contactId,
	});

	return (
		<div className="min-h-screen p-4">
			<div className="flex items-center justify-between pb-4 text-secondary">
				<Link href="/" className="flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
					<span className="text-sm">Contacts</span>
				</Link>
				<Link href={`/contacts/${contactId}/update`}>
					<span className="text-sm">Update</span>
				</Link>
			</div>
			{!!contact && <ContactDetails contact={contact} />}
		</div>
	);
}

function ContactDetails({ contact }: { contact: Contact }) {
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
}

function ContactDetailsAddressSection({ contact }: { contact: Contact }) {
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
							{state ? `, ${state}` : ""}
							{zip ? ` ${zip}` : ""}
						</span>
					</div>
				</a>
			</div>
		</div>
	);
}

function ContactDetailsHeader({ contact }: { contact: Contact }) {
	return (
		<>
			<div className="avatar placeholder">
				<div className="w-24 rounded-full bg-base-300 text-base-content ring ring-secondary">
					{!!contact.photo?.url ? (
						<NextImage
							src={contact.photo.url}
							alt="avatar"
							height={contact.photo.height}
							width={contact.photo.width}
						/>
					) : (
						<span className="text-3xl">
							{contact.firstName?.charAt(0).toUpperCase()}
							{contact.lastName?.charAt(0).toUpperCase()}
						</span>
					)}
				</div>
			</div>
			<h1 className="mb-4 text-2xl font-bold text-base-content">
				{contact.firstName} {contact.lastName}
			</h1>
		</>
	);
}

function ContactDetailsSection({
	contact,
	label,
	field,
}: {
	contact: Contact;
	label: string;
	field: keyof Contact;
}) {
	const value = contact[field];

	if (typeof value !== "string") return null;

	if (!value.length) return null;

	return (
		<div className="card w-full rounded bg-base-100 text-xs">
			<div className="card-body px-4 py-2">
				<label className="text-secondary">{label}</label>
				<ConditionalWrapper
					condition={["email", "phoneNumber"].includes(field)}
					wrapper={(children) => (
						<Link href={`${hrefPrefixForField(field)}${value}`}>
							{children}
						</Link>
					)}
				>
					<span>{value}</span>
				</ConditionalWrapper>
			</div>
		</div>
	);
}
