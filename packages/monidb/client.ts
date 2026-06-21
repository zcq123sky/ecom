import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { Sql } from "postgres";

const databaseUrl = Deno.env.get("SUPABASE_DB_URL") ?? Deno.env.get("DATABASE_URL")!;
const client: Sql = postgres(databaseUrl, { prepare: false });
const db: ReturnType<typeof drizzle> = drizzle(client);

export { db };
