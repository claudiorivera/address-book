import { z } from "zod";

export const imageUploadValidationSchema = z.object({
	base64Image: z.string().nullish(),
});
