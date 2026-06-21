import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgPolicy,
  pgTable,
  serial,
  text,
  timestamp,
  type PgTableWithColumns,
} from "drizzle-orm/pg-core";
import { anonRole } from "drizzle-orm/supabase";

const snackTable: Omit<PgTableWithColumns<any>, 'enableRLS'> = pgTable("snack", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image"),
  category: text("category"),
  weight: integer("weight"),
  stock: integer("stock").default(0).notNull(),
  isAvailable: boolean("is_available").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, () => [
  pgPolicy("anon_select_snack", {
    for: "select",
    to: anonRole,
    using: sql`true`,
  }),
]).enableRLS();

export const snack: typeof snackTable = snackTable;
