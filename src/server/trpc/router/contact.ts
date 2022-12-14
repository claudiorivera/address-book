import { Prisma } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

import {
	createContactValidationSchema,
	updateContactValidationSchema,
} from "@/schemas";
import { publicProcedure, router } from "@/server/trpc/trpc";
import { RouterOutput } from "@/utils";

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

export const contactRouter = router({
	getAll: publicProcedure.query(({ ctx }) =>
		ctx.prisma.contact.findMany({
			select: defaultContactSelect,
		}),
	),
	getById: publicProcedure
		.input(z.object({ id: z.string().cuid() }))
		.query(({ input, ctx }) => {
			const { id } = input;
			return ctx.prisma.contact.findUnique({
				where: { id },
				select: defaultContactSelect,
			});
		}),
	create: publicProcedure
		.input(createContactValidationSchema)
		.mutation(({ input, ctx }) => {
			return ctx.prisma.contact.create({
				data: input,
				select: defaultContactSelect,
			});
		}),
	update: publicProcedure
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
	delete: publicProcedure
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

export type ContactCreateOutput = RouterOutput["contact"]["create"];
export type ContactGetAllOutput = RouterOutput["contact"]["getAll"];
export type ContactGetByIdOutput = RouterOutput["contact"]["getById"];
