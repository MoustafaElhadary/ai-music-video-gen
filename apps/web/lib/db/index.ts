import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import { env } from "@web/lib/env.mjs";

// const connectionString = env.DATABASE_URL;
const connectionString =
  "postgres://postgres.ifpupndmbhydfccmnbuz:3YKHV44icY4U@ad@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1";
const client = postgres(connectionString);
export const db = drizzle(client);
