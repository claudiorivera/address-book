import type { NextPage } from "next";
import { useState } from "react";

import { ContactList } from "../components/ContactList";
import { CreateContactFormModal } from "../components/CreateContactFormModal";
import { Meta } from "../components/Meta";
import { Search } from "../components/Search";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
	const [isCreateContactModalOpen, setIsCreateContactModalOpen] =
		useState(false);
	const [query, setQuery] = useState("");
	const { data: contacts } = trpc.contact.getByQuery.useQuery({ query });

	const handleAddContactModalToggle = () => {
		setIsCreateContactModalOpen(!isCreateContactModalOpen);
	};

	return (
		<>
			<Meta />

			<main className="container relative mx-auto bg-base-200">
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
