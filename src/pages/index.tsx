import type { NextPage } from "next";

import { ContactList } from "../components/ContactList";
import { Meta } from "../components/Meta";
import { Search } from "../components/Search";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: contacts } = trpc.contact.getAll.useQuery();

  return (
    <>
      <Meta />

      <main className="container mx-auto">
        <h1 className="p-4 text-xl font-bold">Address Book</h1>

        <Search />

        {contacts && <ContactList contacts={contacts} />}
      </main>
    </>
  );
};

export default Home;
