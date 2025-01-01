import { eq } from "drizzle-orm";
import { UpdateContactForm } from "~/app/contacts/[contactId]/update/_components/update-contact-form";
import { db } from "~/server/db";
import { contacts } from "~/server/db/schema";

export default async function UpdateContactPage({
	params,
}: {
	params: Promise<{ contactId: string }>;
}) {
	const { contactId } = await params;

	const contact = await db.query.contacts.findFirst({
		where: eq(contacts.id, contactId),
		with: {
			photo: true,
		},
	});

	if (!contact) return null;

	return <UpdateContactForm contact={contact} />;
}
