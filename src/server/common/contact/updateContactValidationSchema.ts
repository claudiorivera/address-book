import { literal, z } from "zod";

export const updateContactValidationSchema = z.object({
	id: z.string().cuid(),
	firstName: z.string().nullish(),
	lastName: z.string().nullish(),
	email: z.string().email().or(literal("")).nullish(),
	phoneNumber: z.string().nullish(),
	address1: z.string().nullish(),
	address2: z.string().nullish(),
	city: z.string().nullish(),
	state: z.string().nullish(),
	zip: z.string().nullish(),
	notes: z.string().nullish(),
	photoBase64: z.string().nullish(),
});
