import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { Sql } from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

let _db: PostgresJsDatabase | null = null;

export function getDb(): PostgresJsDatabase {
  if (!_db) {
    const databaseUrl = Deno.env.get("SUPABASE_DB_URL") ?? Deno.env.get("DATABASE_URL")!;
    const client: Sql = postgres(databaseUrl, { prepare: false });
    _db = drizzle(client);
  }
  return _db;
}
