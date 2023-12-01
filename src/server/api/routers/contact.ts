import { eq } from "drizzle-orm";
import { z } from "zod";
import { updateContactValidationSchema } from "~/schemas/updateContactValidationSchema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { contacts, createContactSchema } from "~/server/db/schema";
import { type RouterOutputs } from "~/utils/api";

export const contactRouter = createTRPCRouter({
	getAll: publicProcedure.query(({ ctx }) =>
		ctx.db.query.contacts.findMany({
			with: {
				photo: true,
			},
		}),
	),
	getById: publicProcedure
		.input(z.object({ id: z.string().cuid() }))
		.query(async ({ input, ctx }) =>
			ctx.db.query.contacts.findFirst({
				where: eq(contacts.id, input.id),
				with: {
					photo: true,
				},
			}),
		),
	create: publicProcedure
		.input(createContactSchema)
		.mutation(({ input, ctx }) => ctx.db.insert(contacts).values(input)),
	update: publicProcedure
		.input(updateContactValidationSchema)
		.mutation(async ({ input, ctx }) =>
			ctx.db.update(contacts).set(input).where(eq(contacts.id, input.id)),
		),
	delete: publicProcedure
		.input(
			z.object({
				id: z.string().cuid(),
			}),
		)
		.mutation(({ input, ctx }) =>
			ctx.db.delete(contacts).where(eq(contacts.id, input.id)),
		),
});

type ContactGetByIdOutput = RouterOutputs["contact"]["getById"];
export type Contact = NonNullable<ContactGetByIdOutput>;
export type ContactGetAllOutput = RouterOutputs["contact"]["getAll"];
