import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	clientPrefix: "PUBLIC_",
	server: {
		GITHUB_CLIENT_ID: z.string().optional(),
		GITHUB_CLIENT_SECRET: z.string().optional(),
		NEXTAUTH_SECRET: z.string(),
		NEXTAUTH_URL: z.string().url().optional(),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		CRON_SECRET: z.string(),
		TURSO_URL: z.string().url(),
		TURSO_AUTH_TOKEN: z.string().min(1),
	},
	client: {},
	runtimeEnv: {
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NODE_ENV: process.env.NODE_ENV,
		CRON_SECRET: process.env.CRON_SECRET,
		TURSO_URL: process.env.TURSO_URL,
		TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
	},
});
