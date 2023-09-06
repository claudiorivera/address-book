import { initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superjson from "superjson";

import { prisma } from "~/server/db/client";

export const createContext = async (_opts: FetchCreateContextFnOptions) => {
	return {
		prisma,
	};
};

const t = initTRPC.context<typeof createContext>().create({
	transformer: superjson,
	errorFormatter({ shape }) {
		return shape;
	},
});

export const router = t.router;

export const publicProcedure = t.procedure;
