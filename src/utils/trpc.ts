import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { AppRouter } from "~/server/trpc/router/_app";

function getBaseUrl() {
	if (typeof window !== "undefined") {
		// In the browser, we return a relative URL
		return "";
	}
	// When rendering on the server, we return an absolute URL

	// reference for vercel.com
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}

	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
	config() {
		return {
			transformer: superjson,
			links: [
				httpBatchLink({
					url: getBaseUrl() + "/api/trpc",
				}),
			],
		};
	},
	ssr: true,
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
