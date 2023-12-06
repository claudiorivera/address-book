import { migrate } from "drizzle-orm/postgres-js/migrator";
import { client, db } from "~/server/db";

await migrate(db, { migrationsFolder: "./src/server/db/migrations" });

await client.end();
