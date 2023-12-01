import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

export const contacts = sqliteTable("contacts", {
	id: text("id").primaryKey(),
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
	createdAt: integer("createdAt").default(sql`(cast (unixepoch () as int))`),
	updatedAt: integer("updatedAt").default(sql`(cast (unixepoch () as int))`),
});

export const contactsRelations = relations(contacts, ({ one }) => ({
	photo: one(photo, {
		fields: [contacts.id],
		references: [photo.contactId],
	}),
}));

export const photo = sqliteTable("photos", {
	id: text("id").primaryKey(),
	cloudinaryId: text("cloudinaryId").notNull().unique(),
	url: text("url").notNull(),
	width: integer("width").notNull(),
	height: integer("height").notNull(),
	contactId: text("contactId")
		.notNull()
		.references(() => contacts.id),
});

export const createContactSchema = createInsertSchema(contacts);
