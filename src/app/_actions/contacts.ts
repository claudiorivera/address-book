"use server";

import { eq } from "drizzle-orm";
import { type InferFlattenedErrors, formatError, validate } from "~/lib/utils";
import { db } from "~/server/db";
import {
	contacts,
	createContactSchema,
	updateContactSchema,
} from "~/server/db/schema";

export type CreateContactFormState =
	| {
			errors?: InferFlattenedErrors<typeof createContactSchema>;
	  }
	| undefined;

export async function createContact(
	_formState: CreateContactFormState,
	formData: FormData,
) {
	const validation = validate({
		formData,
		schema: createContactSchema,
	});

	if (!validation.success) {
		const errors = formatError({
			error: validation.error,
		});

		console.dir(errors, { depth: Number.POSITIVE_INFINITY });

		return { errors } satisfies CreateContactFormState;
	}

	await db.insert(contacts).values(validation.data);
}

export type UpdateContactFormState = CreateContactFormState;

export async function updateContact(
	_formState: UpdateContactFormState,
	formData: FormData,
) {
	const validation = validate({
		formData,
		schema: updateContactSchema,
	});

	if (!validation.success) {
		const errors = formatError({
			error: validation.error,
		});

		console.dir(errors, { depth: Number.POSITIVE_INFINITY });

		return { errors } satisfies UpdateContactFormState;
	}

	await db
		.update(contacts)
		.set(validation.data)
		.where(eq(contacts.id, validation.data.id));
}
