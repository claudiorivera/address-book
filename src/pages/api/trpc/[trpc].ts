import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

import { prisma } from "@/server/db/client";
import { appRouter } from "@/server/trpc/router/_app";

export default async function handler(req: NextRequest) {
	return fetchRequestHandler({
		endpoint: "/api/trpc",
		router: appRouter,
		req,
		createContext: () => ({
			prisma: prisma,
		}),
	});
}

export type AppRouter = typeof appRouter;

export const config = {
	runtime: "edge",
};
