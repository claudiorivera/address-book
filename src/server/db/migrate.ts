import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
import { env } from "~/env";

const client = new Client({
  connectionString: env.DATABASE_URL,
  
});

await client.connect();

const db = drizzle(client);

await migrate(db, { migrationsFolder: "./src/server/db/migrations" });

await client.end();
