import { z } from "zod";

export const createContactValidationSchema = z.object({
	firstName: z.string(),
	lastName: z.string().nullish(),
	email: z.string().email().or(z.literal("")).nullish(),
	phoneNumber: z.string().nullish(),
	address1: z.string().nullish(),
	address2: z.string().nullish(),
	city: z.string().nullish(),
	state: z.string().nullish(),
	zip: z.string().nullish(),
	notes: z.string().nullish(),
});
