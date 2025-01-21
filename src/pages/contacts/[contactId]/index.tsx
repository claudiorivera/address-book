import type { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { ConditionalWrapper } from "~/components/conditional-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card } from "~/components/ui/card";
import type { ContactGetByIdOutput } from "~/server/api/routers/contact";
import { api } from "~/utils/api";
import { getGoogleMapsUrlForContact } from "~/utils/get-google-maps-url-for-contact";
import { hrefPrefixForField } from "~/utils/get-href-prefix-for-field";

type Contact = NonNullable<ContactGetByIdOutput>;

export function getServerSideProps({ query }: GetServerSidePropsContext) {
	if (typeof query.contactId !== "string") {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			contactId: query.contactId,
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
			<div className="flex items-center justify-between pb-4 text-primary-foreground">
				<Link href="/" className="flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-4 w-4"
					>
						<title>Back Arrow</title>
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
			{!!contact && (
				<div className="flex flex-col items-center gap-4">
					<Avatar>
						<AvatarImage src={contact.photo?.url} />
						<AvatarFallback>
							{contact.firstName?.charAt(0).toUpperCase()}
							{contact.lastName?.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>

					<h1 className="mb-4 font-bold text-2xl">
						{contact.firstName} {contact.lastName}
					</h1>

					<ContactDetailsSection
						label="Phone Number"
						contact={contact}
						field="phoneNumber"
					/>
					<ContactDetailsSection
						label="Email"
						contact={contact}
						field="email"
					/>
					<ContactDetailsAddressSection contact={contact} />
					<ContactDetailsSection
						label="Notes"
						contact={contact}
						field="notes"
					/>
				</div>
			)}
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
		<Card className="flex w-full flex-col gap-1 bg-background px-4 py-2 text-xs">
			<p className="text-primary-foreground">Address</p>
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
		</Card>
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
		<Card className="flex w-full flex-col gap-1 bg-background px-4 py-2 text-xs">
			<p className="text-primary-foreground">{label}</p>
			<ConditionalWrapper
				condition={["email", "phoneNumber"].includes(field)}
				wrapper={(children) => (
					<Link href={`${hrefPrefixForField(field)}${value}`}>{children}</Link>
				)}
			>
				<span>{value}</span>
			</ConditionalWrapper>
		</Card>
	);
}
