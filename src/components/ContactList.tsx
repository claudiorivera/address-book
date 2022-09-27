import { inferProcedureOutput } from "@trpc/server";

import { AppRouter } from "../server/trpc/router";
import { ContactListSection } from "./ContactListSection";

type Contact = inferProcedureOutput<AppRouter["contact"]["getById"]>;

type Props = {
  collatedContacts: Record<string, Contact[]>;
};

export const ContactList = ({ collatedContacts }: Props) => {
  return (
    <>
      {Object.entries(collatedContacts).map(([label, contacts]) => (
        <ContactListSection key={label} label={label} contacts={contacts} />
      ))}
    </>
  );
};
