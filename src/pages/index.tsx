import type { NextPage } from "next";
import { useState } from "react";

import { ContactList } from "../components/ContactList";
import { Meta } from "../components/Meta";
import { Search } from "../components/Search";
import { collateContacts } from "../utils/collateContacts";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
	const [query, setQuery] = useState("");
	const { data: contacts } = trpc.contact.getByQuery.useQuery({ query });

	return (
		<>
			<Meta />

			<main className="container mx-auto bg-base-200">
				<h1 className="p-4 text-xl font-bold text-secondary">Address Book</h1>

				<Search query={query} setQuery={setQuery} />

				{contacts && (
					<ContactList collatedContacts={collateContacts(contacts)} />
				)}
			</main>
		</>
	);
};

export default Home;
