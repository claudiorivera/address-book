import {createId} from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const contacts = pgTable("contacts", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	firstName: text("firstName"),
	lastName: text("lastName"),
	email: text("email"),
	phoneNumber: text("phoneNumber"),
	address1: text("address1"),
	address2: text("address2"),
	city: text("city"),
	state: text("state"),
	zip: text("zip"),
	notes: text("notes"),
	createdAt: timestamp("createdAt").defaultNow().notNull(),
	updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const contactsRelations = relations(contacts, ({ one }) => ({
	photo: one(photo, {
		fields: [contacts.id],
		references: [photo.contactId],
	}),
}));

export const photo = pgTable("photos", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	cloudinaryId: text("cloudinaryId").notNull().unique(),
	url: text("url").notNull(),
	width: integer("width").notNull(),
	height: integer("height").notNull(),
	contactId: text("contactId")
		.notNull()
		.references(() => contacts.id),
});

export const createContactSchema = createInsertSchema(contacts);
