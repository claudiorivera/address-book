// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { contactRouter } from "./contact";

export const appRouter = t.router({
	contact: contactRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
