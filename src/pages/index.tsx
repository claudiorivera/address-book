import { createProxySSGHelpers } from "@trpc/react/ssg";
import classNames from "classnames";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import superjson from "superjson";

import { ContactList } from "../components/ContactList";
import { CreateContactFormModal } from "../components/CreateContactFormModal";
import { Meta } from "../components/Meta";
import { Search } from "../components/Search";
import { createContext } from "../server/trpc/context";
import { appRouter } from "../server/trpc/router";
import { trpc } from "../utils/trpc";

export const getServerSideProps: GetServerSideProps = async () => {
	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});

	await ssg.contact.getByQuery.prefetch({ query: "" });

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
	};
};

const Home: NextPage = () => {
	const [isCreateContactModalOpen, setIsCreateContactModalOpen] =
		useState(false);
	const [query, setQuery] = useState("");
	const { data: contacts, isLoading } = trpc.contact.getByQuery.useQuery({
		query,
	});

	const handleAddContactModalToggle = () => {
		setIsCreateContactModalOpen(!isCreateContactModalOpen);
	};

	return (
		<>
			<Meta />

			<div
				className={classNames("loading", {
					"animate-none": !isLoading,
				})}
			/>
			<main className="container relative mx-auto max-w-3xl bg-base-200">
				<h1 className="p-4 text-xl font-bold text-secondary">Address Book</h1>
				<button
					className="absolute top-4 right-4 text-secondary"
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
				<ContactList contacts={contacts} />

				<CreateContactFormModal
					isOpen={isCreateContactModalOpen}
					onClose={handleAddContactModalToggle}
				/>
			</main>
		</>
	);
};

export default Home;
