import { Contact } from "@prisma/client";

type Options = {
  sortKey?: keyof Contact;
};

export const collateContacts = (contacts: Contact[], options?: Options) => {
  return contacts.reduce((obj, contact) => {
    const key = contact.firstName?.charAt(0).toUpperCase() || "#";

    if (!obj[key]) {
      obj[key] = [];
    }

    obj[key]?.push(contact);

    if (!!options?.sortKey) {
      obj[key]?.sort(
        (a, b) =>
          a[options.sortKey as keyof Contact]?.localeCompare(
            b[options.sortKey as keyof Contact] || ""
          ) || 0
      );
    }

    return obj;
  }, {} as Record<string, Contact[]>);
};
