import { z } from "zod";
import { db } from "monidb/client";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { beverage, snack, toy } from "monidb/schema";
import { beverageSchemas } from "../schemas/beverage.ts";
import { snackSchemas } from "../schemas/snack.ts";
import { toySchemas } from "../schemas/toy.ts";
import { adminProcedure, router } from "./context.ts";

function entityRouter(table: any, idColumn: any, schemas: { create: z.ZodTypeAny; update: z.ZodTypeAny }) {
  return router({
    create: adminProcedure.input(schemas.create).mutation(({ input }) =>
      db.insert(table).values(input).returning().then((r) => r[0])
    ),
    update: adminProcedure.input(schemas.update).mutation(({ input }) =>
      db.update(table).set((input as any).data).where(eq(idColumn, (input as any).id)).returning().then((r) => {
        if (r.length === 0) throw new TRPCError({ code: "NOT_FOUND", message: "Item not found" });
        return r[0];
      })
    ),
    delete: adminProcedure.input(z.number().int().positive()).mutation(({ input }) =>
      db.delete(table).where(eq(idColumn, input)).returning().then((r) => {
        if (r.length === 0) throw new TRPCError({ code: "NOT_FOUND", message: "Item not found" });
        return r[0];
      })
    ),
  });
}

export const adminRouter = router({
  beverage: entityRouter(beverage, beverage.id, { create: beverageSchemas.create, update: beverageSchemas.update }),
  snack: entityRouter(snack, snack.id, { create: snackSchemas.create, update: snackSchemas.update }),
  toy: entityRouter(toy, toy.id, { create: toySchemas.create, update: toySchemas.update }),
});
