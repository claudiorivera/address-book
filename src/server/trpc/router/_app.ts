// src/server/router/_app.ts

import { router } from "../trpc";
import { contactRouter } from "./contact";

export const appRouter = router({
	contact: contactRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
