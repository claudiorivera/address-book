import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSidePropsContext } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SuperJSON } from "superjson";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card } from "~/components/ui/card";
import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";
import { api } from "~/utils/api";
import { getGoogleMapsUrlForContact } from "~/utils/get-google-maps-url-for-contact";

export async function getServerSideProps(
	context: GetServerSidePropsContext<{ contactId: string }>,
) {
	if (typeof context.query.contactId !== "string") {
		return {
			notFound: true,
		};
	}

	const helpers = createServerSideHelpers({
		router: appRouter,
		ctx: {
			db,
		},
		transformer: SuperJSON,
	});

	await helpers.contact.getById.prefetch({ id: context.query.contactId });

	return {
		props: {
			contactId: context.query.contactId,
			trpcState: helpers.dehydrate(),
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

	if (!contact) return null;

	return (
		<div className="min-h-screen p-4">
			<Navigation contactId={contactId} />

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

				<ContactDetails>
					<ContactDetails.Heading>Phone Number</ContactDetails.Heading>
					<Link href={`tel:${contact.phoneNumber}`}>{contact.phoneNumber}</Link>
				</ContactDetails>

				{contact.email && (
					<ContactDetails>
						<ContactDetails.Heading>Email</ContactDetails.Heading>
						<Link href={`mailto:${contact.email}`}>{contact.email}</Link>
					</ContactDetails>
				)}

				{[
					contact.address1,
					contact.address2,
					contact.city,
					contact.state,
					contact.zip,
				].some(Boolean) && (
					<ContactDetails>
						<ContactDetails.Heading>Address</ContactDetails.Heading>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={getGoogleMapsUrlForContact(contact)}
							className="flex flex-col"
						>
							<div className="flex flex-col">
								<span>{contact.address1}</span>
								<span>{contact.address2}</span>
								<span>
									{contact.city}
									{contact.state ? `, ${contact.state}` : ""}
									{contact.zip ? ` ${contact.zip}` : ""}
								</span>
							</div>
						</a>
					</ContactDetails>
				)}

				{contact.notes && (
					<ContactDetails>
						<ContactDetails.Heading>Notes</ContactDetails.Heading>
						{contact.notes}
					</ContactDetails>
				)}
			</div>
		</div>
	);
}

function ContactDetails({ children }: { children: ReactNode }) {
	return (
		<Card className="flex w-full flex-col gap-1 bg-background px-4 py-2 text-xs">
			{children}
		</Card>
	);
}

ContactDetails.Heading = ContactDetailsHeading;
function ContactDetailsHeading({ children }: { children: ReactNode }) {
	return <p className="text-primary-foreground">{children}</p>;
}

function Navigation({ contactId }: { contactId: string }) {
	return (
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
	);
}
