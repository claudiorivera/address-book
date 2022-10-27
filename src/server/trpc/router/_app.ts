// src/server/router/_app.ts

import { router } from "../trpc";
import { cloudinaryRouter } from "./cloudinary";
import { contactRouter } from "./contact";

export const appRouter = router({
	contact: contactRouter,
	cloudinary: cloudinaryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
