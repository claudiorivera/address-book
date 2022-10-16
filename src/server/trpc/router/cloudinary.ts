import { TRPCError } from "@trpc/server";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

import { t } from "../trpc";

export const cloudinaryRouter = t.router({
	upload: t.procedure
		.input(
			z.object({
				base64string: z.string(),
				imageName: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const { base64string, imageName } = input;
			try {
				const { secure_url, height, width, public_id } =
					await cloudinary.uploader.upload(base64string, {
						public_id: `address-book/${imageName}`,
					});
				return {
					cloudinaryId: public_id,
					url: secure_url,
					height,
					width,
				};
			} catch (error) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "An unexpected error occurred, please try again later.",
					cause: error,
				});
			}
		}),
	destroy: t.procedure
		.input(z.object({ cloudinaryId: z.string() }))
		.mutation(({ input }) => {
			const { cloudinaryId } = input;
			return cloudinary.uploader.destroy(cloudinaryId);
		}),
});
