import { inferProcedureOutput } from "@trpc/server";

import { AppRouter } from "../server/trpc/router";

type Contact = inferProcedureOutput<AppRouter["contact"]["getById"]>;

type Props = {
  contacts: Contact[];
};
export const ContactList = ({ contacts }: Props) => {
  return (
    <div>
      <section className="sticky top-0 flex items-center bg-slate-50/90 px-4 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 backdrop-blur-sm dark:bg-slate-700/90 dark:text-slate-200 dark:ring-black/10">
        A
      </section>
      <div className="divide-y dark:divide-slate-200/5">
        {contacts
          .filter(
            (contact) => contact?.firstName && /^A/i.test(contact.firstName)
          )
          .map(
            (contact) =>
              contact && (
                <div key={contact.id} className="flex items-center gap-4 p-4">
                  <div className="h-10" />
                  <strong className="text-sm font-medium text-slate-900 dark:text-slate-200">
                    {contact.firstName} {contact.lastName}
                  </strong>
                </div>
              )
          )}
      </div>
    </div>
  );
};
