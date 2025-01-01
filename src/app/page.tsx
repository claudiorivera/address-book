import { ContactList } from "~/app/_components/contact-list";
import { CreateContactDialog } from "~/app/_components/create-contact-dialog";
import { ContactFilterProvider } from "~/contexts/contact-filter-provider";
import { db } from "~/server/db";

export default async function HomePage() {
	const contacts = await db.query.contacts.findMany({
		with: {
			photo: true,
		},
	});

	return (
		<ContactFilterProvider>
			<CreateContactDialog />
			<ContactList contacts={contacts} />
		</ContactFilterProvider>
	);
}
