import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { db } from "monidb/client";
import { eq } from "drizzle-orm";
import { beverage, snack, toy } from "monidb/schema";
import { beverageSchemas } from "../schemas/beverage.ts";
import { snackSchemas } from "../schemas/snack.ts";
import { toySchemas } from "../schemas/toy.ts";
import { publicProcedure, router } from "./context.ts";

function entityRouter(table: any, idColumn: any, schemas: { purchase: typeof beverageSchemas.purchase }) {
  return router({
    list: publicProcedure.query(() => db.select().from(table)),
    byId: publicProcedure.input(z.number()).query(({ input }) =>
      db.select().from(table).where(eq(idColumn, input)).then((r) => r[0] ?? null)
    ),
    purchase: publicProcedure.input(schemas.purchase).mutation(async ({ input }) => {
      const { id, quantity } = input;
      const items = await db.select().from(table).where(eq(idColumn, id));
      if (items.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Item not found" });
      }
      const item = items[0];
      if (item.stock < quantity) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Insufficient stock: available ${item.stock}, requested ${quantity}`,
        });
      }
      const updated = await db.update(table).set({ stock: item.stock - quantity }).where(eq(idColumn, id)).returning();
      return updated[0];
    }),
  });
}

export const publicRouter = router({
  beverage: entityRouter(beverage, beverage.id, beverageSchemas),
  snack: entityRouter(snack, snack.id, snackSchemas),
  toy: entityRouter(toy, toy.id, toySchemas),
});
