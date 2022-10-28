// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";

import { createContext } from "@/server/trpc/context";
import { appRouter } from "@/server/trpc/router/_app";

// export API handler
export default createNextApiHandler({
	router: appRouter,
	createContext,
});

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "10mb",
		},
	},
};
