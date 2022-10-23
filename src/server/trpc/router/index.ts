// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { cloudinaryRouter } from "./cloudinary";
import { contactRouter } from "./contact";

export const appRouter = t.router({
	contact: contactRouter,
	cloudinary: cloudinaryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
