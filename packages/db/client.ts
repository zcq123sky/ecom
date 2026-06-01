import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!dbInstance) {
    const databaseUrl = Deno.env.get("DATABASE_URL")!;
    const client = postgres(databaseUrl, { prepare: false });
    dbInstance = drizzle({ client });
  }
  return dbInstance;
}
