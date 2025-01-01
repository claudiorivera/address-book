import { createId } from "@paralleldrive/cuid2";
import { type InferSelectModel, relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const contacts = pgTable("contacts", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	firstName: text("firstName"),
	lastName: text("lastName"),
	email: text("email"),
	phoneNumber: text("phoneNumber").notNull(),
	address1: text("address1"),
	address2: text("address2"),
	city: text("city"),
	state: text("state"),
	zip: text("zip"),
	notes: text("notes"),
	photoId: text("photoId"),
	createdAt: timestamp("createdAt").defaultNow().notNull(),
	updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Contact = InferSelectModel<typeof contacts>;

export const createContactSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string().email().optional(),
	phoneNumber: z.string().min(1, "Required"),
	address1: z.string().optional(),
	address2: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	notes: z.string().optional(),
});

export const updateContactSchema = createContactSchema.extend({
	id: z.string().cuid2(),
});

export const contactsRelations = relations(contacts, ({ one }) => ({
	photo: one(photo, {
		fields: [contacts.photoId],
		references: [photo.id],
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

export type Photo = InferSelectModel<typeof photo>;
