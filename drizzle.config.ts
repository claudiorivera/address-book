import type { Config } from "drizzle-kit";

import { env } from "~/env.js";

export default {
	schema: "./src/server/db/schema.ts",
	driver: "turso",
	dbCredentials: {
		url: env.TURSO_URL,
		authToken: env.TURSO_AUTH_TOKEN,
	},
	tablesFilter: ["drizzle_*"],
} satisfies Config;
