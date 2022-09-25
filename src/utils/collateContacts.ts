import { Contact } from "@prisma/client";

export const collateContacts = (contacts: Contact[]) => {
  return contacts.reduce((obj, contact) => {
    if (!contact) return obj;

    const key = contact.firstName?.charAt(0).toUpperCase() || "#";

    if (!obj[key]) {
      obj[key] = [];
    }

    obj[key]?.push(contact);

    return obj;
  }, {} as Record<string, Contact[]>);
};
