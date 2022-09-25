import { Contact } from "@prisma/client";
import { describe, expect, it } from "vitest";

import { collateContacts } from "./collateContacts";

const contacts: Contact[] = [
  {
    id: "a1",
    firstName: "Alice",
    lastName: "Zang",
    email: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  },
  {
    id: "a2",
    firstName: "Abby",
    lastName: "Anderson",
    email: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  },
  {
    id: "#1",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "555-555-5555",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  },
];

describe("collateContacts", () => {
  it("should return an object with 2 keys", () => {
    expect(collateContacts(contacts)).toHaveProperty("A");
    expect(collateContacts(contacts)).toHaveProperty("#");
    expect(collateContacts(contacts)).not.toHaveProperty("B");
  });

  it("should return the correct number of contacts for a given key", () => {
    expect(collateContacts(contacts).A).toHaveLength(2);
    expect(collateContacts(contacts)["#"]).toHaveLength(1);
  });
});
