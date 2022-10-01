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
	getAll: t.procedure.query(({ ctx }) => {
		return ctx.prisma.contact.findMany({
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
