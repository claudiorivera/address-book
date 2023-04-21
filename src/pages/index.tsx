import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import superjson from "superjson";

import { ContactList, CreateContactFormModal, Search } from "@/components";
import { createContext } from "@/server/trpc/context";
import { appRouter } from "@/server/trpc/router/_app";
import { filterByQuery, trpc } from "@/utils";

export const getServerSideProps: GetServerSideProps = async () => {
	const helpers = createServerSideHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});

	await helpers.contact.getAll.prefetch();

	return {
		props: {
			trpcState: helpers.dehydrate(),
		},
	};
};

const Home: NextPage = () => {
	const [isCreateContactModalOpen, setIsCreateContactModalOpen] =
		useState(false);
	const [query, setQuery] = useState("");

	const { data: contacts } = trpc.contact.getAll.useQuery();

	const filteredContacts = filterByQuery(contacts ?? [], query);

	const handleAddContactModalToggle = () => {
		setIsCreateContactModalOpen(!isCreateContactModalOpen);
	};

	return (
		<div className="relative">
			<h1 className="p-4 text-xl font-bold text-secondary">Address Book</h1>
			<button
				className="absolute right-4 top-4 text-secondary"
				onClick={handleAddContactModalToggle}
			>
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
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
			</button>

			<Search query={query} setQuery={setQuery} />
			<ContactList contacts={filteredContacts} />

			<CreateContactFormModal
				isOpen={isCreateContactModalOpen}
				onClose={handleAddContactModalToggle}
			/>
		</div>
	);
};

export default Home;
