import { Prisma } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

import {
	createContactValidationSchema,
	updateContactValidationSchema,
} from "@/schemas";
import { t } from "@/server/trpc/trpc";

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
			const { photoBase64, ...contact } = input;

			if (!photoBase64)
				return ctx.prisma.contact.update({
					where: { id: input.id },
					data: contact,
					select: defaultContactSelect,
				});

			const { secure_url, height, width, public_id } =
				await cloudinary.uploader.upload(photoBase64, {
					public_id: `address-book/${input.id}`,
				});

			const contactPhoto = {
				cloudinaryId: public_id,
				url: secure_url,
				height,
				width,
			};

			return await ctx.prisma.contact.update({
				where: { id: input.id },
				data: {
					...contact,
					photo: {
						upsert: {
							create: contactPhoto,
							update: contactPhoto,
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
