import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		CRON_SECRET: z.string(),
		TURSO_URL: z.string().url(),
		TURSO_AUTH_TOKEN: z.string().min(1),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		CRON_SECRET: process.env.CRON_SECRET,
		TURSO_URL: process.env.TURSO_URL,
		TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
