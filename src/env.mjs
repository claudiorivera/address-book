import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		CRON_SECRET: z.string(),
		DATABASE_URL: z.string(),
	},
	shared: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		CRON_SECRET: process.env.CRON_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
	},
	emptyStringAsUndefined: true,
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
