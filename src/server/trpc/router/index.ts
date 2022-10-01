// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { authRouter } from "./auth";
import { contactRouter } from "./contact";

export const appRouter = t.router({
	auth: authRouter,
	contact: contactRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
