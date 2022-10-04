import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createContactValidationSchema } from "../../common/contact/createContactValidationSchema";
import { t } from "../trpc";

const defaultContactSelect = Prisma.validator<Prisma.ContactSelect>()({
	id: true,
	firstName: true,
	lastName: true,
	email: true,
	phoneNumber: true,
	address1: true,
	address2: true,
	city: true,
	state: true,
	zip: true,
	notes: true,
});

export const contactRouter = t.router({
	getByQuery: t.procedure
		.input(z.object({ query: z.string() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.contact.findMany({
				where: {
					OR: [
						{ firstName: { contains: input.query, mode: "insensitive" } },
						{ lastName: { contains: input.query, mode: "insensitive" } },
						{ email: { contains: input.query, mode: "insensitive" } },
						{ phoneNumber: { contains: input.query, mode: "insensitive" } },
						{ address1: { contains: input.query, mode: "insensitive" } },
						{ address2: { contains: input.query, mode: "insensitive" } },
						{ city: { contains: input.query, mode: "insensitive" } },
						{ state: { contains: input.query, mode: "insensitive" } },
						{ zip: { contains: input.query, mode: "insensitive" } },
						{ notes: { contains: input.query, mode: "insensitive" } },
					],
				},
				select: defaultContactSelect,
			});
		}),
	getById: t.procedure
		.input(z.object({ id: z.string().cuid() }))
		.query(({ input, ctx }) => {
			const { id } = input;
			const contact = ctx.prisma.contact.findUnique({
				where: { id },
				select: defaultContactSelect,
			});

			if (!contact) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No event with id '${id}'`,
				});
			}

			return contact;
		}),
	create: t.procedure
		.input(createContactValidationSchema)
		.mutation(async ({ input, ctx }) => {
			const contact = await ctx.prisma.contact.create({
				data: input,
				select: defaultContactSelect,
			});
			return contact;
		}),
	update: t.procedure
		.input(
			z.object({
				id: z.string().cuid(),
				data: z.object({
					firstName: z.string().optional(),
					lastName: z.string().optional(),
					email: z.string().email().optional(),
					phoneNumber: z.string().optional(),
					address1: z.string().optional(),
					address2: z.string().optional(),
					city: z.string().optional(),
					state: z.string().optional(),
					zip: z.string().optional(),
					notes: z.string().optional(),
				}),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const { id, data } = input;
			const contact = await ctx.prisma.contact.update({
				where: { id },
				data,
				select: defaultContactSelect,
			});
			return contact;
		}),
	delete: t.procedure
		.input(
			z.object({
				id: z.string().cuid(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const { id } = input;
			await ctx.prisma.contact.delete({ where: { id } });
			return {
				id,
			};
		}),
});
