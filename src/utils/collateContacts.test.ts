import { describe, expect, it } from "vitest";

import { collateContacts } from "./collateContacts";

const contacts = [
  {
    id: "a1",
    firstName: "abby",
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
    firstName: "Alice",
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
  {
    id: "#2",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "222-333-4444",
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
    expect(collateContacts(contacts)["#"]).toHaveLength(2);
  });

  it("should sort by last name", () => {
    const sortedContacts = collateContacts(contacts, {
      sortKey: "lastName",
    });

    expect(sortedContacts.A && sortedContacts.A[0]?.firstName).toBe("Alice");
    expect(sortedContacts.A && sortedContacts.A[1]?.firstName).toBe("abby");
  });

  it("should sort by phone number", () => {
    const sortedContacts = collateContacts(contacts, {
      sortKey: "phoneNumber",
    });

    expect(sortedContacts["#"] && sortedContacts["#"][0]?.phoneNumber).toBe(
      "222-333-4444"
    );
    expect(sortedContacts["#"] && sortedContacts["#"][1]?.phoneNumber).toBe(
      "555-555-5555"
    );
  });
});
