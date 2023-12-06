import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "~/env.js";
import * as schema from "./schema";

export const db = drizzle(postgres(env.DATABASE_URL), { schema });

await migrate(db, { migrationsFolder: "./src/server/db/migrations" });
