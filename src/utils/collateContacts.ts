import { Contact } from "@prisma/client";

type Options = {
  sortKey?: keyof Contact;
};

export const collateContacts = (contacts: Contact[], options?: Options) => {
  return contacts.reduce((unsortedObject, contact) => {
    const key = contact.firstName?.charAt(0).toUpperCase() || "#";

    if (!unsortedObject[key]) {
      unsortedObject[key] = [];
    }

    unsortedObject[key]?.push(contact);

    if (!!options?.sortKey) {
      unsortedObject[key]?.sort(
        (a, b) =>
          a[options.sortKey as keyof Contact]?.localeCompare(
            b[options.sortKey as keyof Contact] || ""
          ) || 0
      );
    }

    return (
      Object.keys(unsortedObject)
        // sort keys alphabetically with numbers last
        .sort((a, b) => (a === "#" ? 1 : b === "#" ? -1 : a.localeCompare(b)))
        .reduce((sortedObject, key) => {
          sortedObject[key] = unsortedObject[key];

          return sortedObject;
        }, {} as Record<string, Contact[] | undefined>)
    );
  }, {} as Record<string, Contact[] | undefined>);
};
