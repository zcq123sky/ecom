import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getDb } from "monidb/client";
import { eq } from "drizzle-orm";
import { beverage, snack, toy } from "monidb/schema";
import { publicProcedure, router } from "./context.ts";

const purchaseSchema = z.object({ id: z.number().int().positive(), quantity: z.number().int().positive() });

function entityRouter(table: any, idColumn: any) {
  return router({
    list: publicProcedure.query(() => getDb().select().from(table)),
    byId: publicProcedure.input(z.number()).query(({ input }) =>
      getDb().select().from(table).where(eq(idColumn, input)).then((r) => r[0] ?? null)
    ),
    purchase: publicProcedure.input(purchaseSchema).mutation(async ({ input }) => {
      const { id, quantity } = input;
      const items = await getDb().select().from(table).where(eq(idColumn, id));
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
      const updated = await getDb().update(table).set({ stock: item.stock - quantity }).where(eq(idColumn, id)).returning();
      return updated[0];
    }),
  });
}

export const publicRouter = router({
  beverage: entityRouter(beverage, beverage.id),
  snack: entityRouter(snack, snack.id),
  toy: entityRouter(toy, toy.id),
});
