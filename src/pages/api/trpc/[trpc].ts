import * as trpcNext from "@trpc/server/adapters/next";

import { prisma } from "~/server/db/client";
import { appRouter } from "~/server/trpc/router/_app";

export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: () => ({
		prisma,
	}),
});
