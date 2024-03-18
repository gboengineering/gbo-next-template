import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from "./db";

async function runMigration() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  pool.end();
}

runMigration();
