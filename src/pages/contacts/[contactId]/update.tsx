import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import SuperJSON from "superjson";
import { ContactForm } from "~/components/contact-form";
import { Form } from "~/components/ui/form";
import { useZodForm } from "~/hooks/use-zod-form";
import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";
import { updateContactSchema } from "~/server/db/schema";
import { api } from "~/utils/api";

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

export default function UpdateContactPage({
	contactId,
}: {
	contactId: string;
}) {
	const { data: contact } = api.contact.getById.useQuery({
		id: contactId,
	});

	if (!contact) {
		throw new Error("Unreachable");
	}

	const router = useRouter();
	const utils = api.useUtils();

	const { mutate: updateContact, isPending } = api.contact.update.useMutation({
		onSettled: () =>
			utils.contact.getById.invalidate({
				id: contact.id,
			}),
	});

	const form = useZodForm({
		schema: updateContactSchema,
		values: {
			id: contact.id,
			firstName: contact.firstName ?? undefined,
			lastName: contact.lastName ?? undefined,
			address1: contact.address1 ?? undefined,
			address2: contact.address2 ?? undefined,
			city: contact.city ?? undefined,
			state: contact.state ?? undefined,
			zip: contact.zip ?? undefined,
			email: contact.email ?? undefined,
			phoneNumber: contact.phoneNumber,
			notes: contact.notes ?? undefined,
		},
	});

	return (
		<div className="min-h-screen p-4">
			<div className="flex items-center justify-between pb-4 text-primary-foreground">
				<Link href={`/contacts/${contact.id}`} className="flex items-center">
					<span className="text-sm">Cancel</span>
				</Link>
				<button
					type="submit"
					className="text-primary-foreground text-sm"
					form="update-contact"
					disabled={isPending}
				>
					Done
				</button>
			</div>

			<Form {...form}>
				<div className="p-4">
					<ContactForm
						id="update-contact"
						onSubmit={form.handleSubmit((values) => {
							updateContact(values, {
								onSuccess: () => void router.push(`/contacts/${contact.id}`),
							});
						})}
					/>
				</div>
			</Form>
		</div>
	);
}
