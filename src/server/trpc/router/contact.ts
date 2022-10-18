import { Prisma } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

import { createContactValidationSchema } from "../../common/contact/createContactValidationSchema";
import { updateContactValidationSchema } from "../../common/contact/updateContactValidationSchema";
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
	photo: true,
});

export const contactRouter = t.router({
	getAll: t.procedure.query(({ ctx }) =>
		ctx.prisma.contact.findMany({
			select: defaultContactSelect,
		}),
	),
	getById: t.procedure
		.input(z.object({ id: z.string().cuid() }))
		.query(({ input, ctx }) => {
			const { id } = input;
			return ctx.prisma.contact.findUnique({
				where: { id },
				select: defaultContactSelect,
			});
		}),
	create: t.procedure
		.input(createContactValidationSchema)
		.mutation(({ input, ctx }) => {
			return ctx.prisma.contact.create({
				data: input,
				select: defaultContactSelect,
			});
		}),
	update: t.procedure
		.input(updateContactValidationSchema)
		.mutation(async ({ input, ctx }) => {
			if (!input.photo)
				return ctx.prisma.contact.update({
					where: { id: input.id },
					data: input,
					select: defaultContactSelect,
				});

			const { secure_url, height, width, public_id } =
				await cloudinary.uploader.upload(input.photo, {
					public_id: `address-book/${input.id}`,
				});

			return await ctx.prisma.contact.update({
				where: { id: input.id },
				data: {
					...input,
					photo: {
						create: {
							cloudinaryId: public_id,
							url: secure_url,
							height,
							width,
						},
					},
				},
				select: defaultContactSelect,
			});
		}),
	delete: t.procedure
		.input(
			z.object({
				id: z.string().cuid(),
			}),
		)
		.mutation(({ input, ctx }) => {
			const { id } = input;
			return ctx.prisma.contact.delete({ where: { id } });
		}),
});
