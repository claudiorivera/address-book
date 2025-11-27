import { zodResolver } from "@hookform/resolvers/zod";
import { createServerSideHelpers } from "@trpc/react-query/server";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import SuperJSON from "superjson";
import { ContactForm } from "~/components/contact-form";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { appRouter } from "~/server/api/root";
import type { ContactGetAllOutput } from "~/server/api/routers/contact";
import { db } from "~/server/db";
import { createContactSchema } from "~/server/db/schema";
import { api } from "~/utils/api";
import { collateContacts } from "~/utils/collate-contacts";
import { filterByQuery } from "~/utils/filter-by-query";

type Contact = ContactGetAllOutput[number];

export async function getServerSideProps() {
	const helpers = createServerSideHelpers({
		router: appRouter,
		ctx: {
			db,
		},
		transformer: SuperJSON,
	});

	await helpers.contact.getAll.prefetch();

	return {
		props: {
			trpcState: helpers.dehydrate(),
		},
	};
}

export default function HomePage() {
	const { data: contacts } = api.contact.getAll.useQuery();

	if (!contacts) {
		throw new Error("Unreachable");
	}

	const [query, setQuery] = useState("");
	const filteredContacts = useMemo(
		() => filterByQuery(contacts, query),
		[contacts, query],
	);
	const collatedContacts = useMemo(
		() => collateContacts(filteredContacts),
		[filteredContacts],
	);

	const [isCreateContactDialogOpen, setIsCreateContactDialogOpen] =
		useState(false);
	const form = useForm({
		resolver: zodResolver(createContactSchema),
	});
	const utils = api.useUtils();
	const { mutate: createContact, isPending } = api.contact.create.useMutation({
		onSettled: () => utils.contact.getAll.invalidate(),
	});

	return (
		<Dialog
			open={isCreateContactDialogOpen}
			onOpenChange={(open) => setIsCreateContactDialogOpen(open)}
		>
			<header className="p-4">
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<h1 className="font-bold text-primary-foreground text-xl">
							Address Book
						</h1>
						<DialogTrigger asChild>
							<Button variant="link" className="text-primary-foreground">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="h-6 w-6"
								>
									<title>Plus Icon</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 4.5v15m7.5-7.5h-15"
									/>
								</svg>
							</Button>
						</DialogTrigger>
					</div>

					<Input
						type="search"
						placeholder="Search"
						autoComplete="off"
						autoCorrect="off"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
			</header>

			<section>
				{Array.from(collatedContacts.entries()).map(([label, contacts]) => (
					<div key={label}>
						<div className="sticky top-0 flex items-center bg-background px-4 py-3 font-semibold text-primary-foreground text-sm">
							{label}
						</div>

						{contacts.map((contact) => (
							<Link key={contact.id} href={`/contacts/${contact.id}`}>
								<div className="flex items-center gap-4 py-2">
									<div className="h-10" />
									<strong className="font-medium text-sm">
										<ContactDisplay contact={contact} />
									</strong>
								</div>
							</Link>
						))}
					</div>
				))}
			</section>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Contact</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<ContactForm
						id="create-contact"
						onSubmit={form.handleSubmit((values) =>
							createContact(values, {
								onSuccess: () => setIsCreateContactDialogOpen(false),
							}),
						)}
					/>
				</Form>

				<DialogFooter>
					<Button type="submit" form="create-contact" disabled={isPending}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function ContactDisplay({ contact }: { contact: Contact }) {
	if (contact.firstName ?? contact.lastName) {
		return (
			<span>
				{contact.firstName}&nbsp;{contact.lastName}
			</span>
		);
	}

	return <span>{contact.phoneNumber}</span>;
}
