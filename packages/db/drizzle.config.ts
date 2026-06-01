import { defineConfig } from "drizzle-kit";
const databaseUrl = Deno.env.get("DATABASE_URL");
if (!databaseUrl) throw new Error("DATABASE_URL is not set");
export default defineConfig({
	out: "./migrations",
	strict: true,
	verbose: true,
	schema: "./schema/mod.ts",
	dialect: "postgresql",
	casing: "snake_case",
	dbCredentials: {
		url: databaseUrl,
	},
});
