import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
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
			const { id, data } = input;

			if (!data.photo)
				return await ctx.prisma.contact.update({
					where: { id },
					data,
					select: defaultContactSelect,
				});

			const { secure_url, height, width, public_id } =
				await cloudinary.uploader.upload(data.photo, {
					public_id: `address-book/${id}`,
				});

			return await ctx.prisma.contact.update({
				where: { id },
				data: {
					...data,
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
	updatePhoto: t.procedure
		.input(
			z.object({
				base64: z.string(),
				contactId: z.string().cuid(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const { base64, contactId } = input;
			try {
				const { secure_url, height, width, public_id } =
					await cloudinary.uploader.upload(base64, {
						public_id: `address-book/${contactId}`,
						overwrite: true,
					});

				const uploadedPhoto = {
					cloudinaryId: public_id,
					url: secure_url,
					height,
					width,
				};

				return await ctx.prisma.contact.update({
					where: { id: contactId },
					data: {
						photo: {
							upsert: {
								create: uploadedPhoto,
								update: uploadedPhoto,
							},
						},
					},
					select: defaultContactSelect,
				});
			} catch (error) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "An unexpected error occurred, please try again later.",
					cause: error,
				});
			}
		}),
});
