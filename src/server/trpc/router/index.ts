import { cloudinaryRouter } from "@/server/trpc/router/cloudinary";
import { contactRouter } from "@/server/trpc/router/contact";
import { t } from "@/server/trpc/trpc";

export const appRouter = t.router({
	contact: contactRouter,
	cloudinary: cloudinaryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
