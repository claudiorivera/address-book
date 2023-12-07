import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "~/env.mjs";

const client = postgres(env.DATABASE_URL, { max: 1 });

const db = drizzle(client);

await migrate(db, { migrationsFolder: "./src/server/db/migrations" });

await client.end();
