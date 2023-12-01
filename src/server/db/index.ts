import { createClient } from "@libsql/client/http";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "~/env.js";
import * as schema from "./schema";

export const db = drizzle(
	createClient({ url: env.TURSO_URL, authToken: env.TURSO_AUTH_TOKEN }),
	{ schema },
);
