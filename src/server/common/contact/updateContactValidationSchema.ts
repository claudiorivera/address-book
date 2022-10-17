import { literal, z } from "zod";

export const updateContactValidationSchema = z.object({
	id: z.string().cuid(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string().email().or(literal("")).optional(),
	phoneNumber: z.string().optional(),
	address1: z.string().optional(),
	address2: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	notes: z.string().optional(),
	photo: z.string().optional(),
});
