import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { env } from "@/config";
import * as schema from "./schema";

export const pool = new Pool({
  host: env.DB_HOST,
  // @ts-ignore
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

export const db = drizzle(pool, { schema });
