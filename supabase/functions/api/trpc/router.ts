import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { db } from "monidb/client";
import { eq } from "drizzle-orm";
import { beverage, snack, toy } from "monidb/schema";

const t = initTRPC.create();

function crudRouter(table: any, idColumn: any) {
  return t.router({
    list: t.procedure.query(() => db.select().from(table)),
    byId: t.procedure.input(z.number()).query(({ input }) =>
      db.select().from(table).where(eq(idColumn, input)).then((r) => r[0] ?? null)
    ),
    create: t.procedure.input(z.record(z.any())).mutation(({ input }) =>
      db.insert(table).values(input).returning().then((r) => r[0])
    ),
    update: t.procedure
      .input(z.object({ id: z.number(), data: z.record(z.any()) }))
      .mutation(({ input }) =>
        db.update(table).set(input.data).where(eq(idColumn, input.id)).returning().then((r) => r[0])
      ),
    delete: t.procedure.input(z.number()).mutation(({ input }) =>
      db.delete(table).where(eq(idColumn, input)).returning().then((r) => r[0])
    ),
  });
}

export const appRouter = t.router({
  beverage: crudRouter(beverage, beverage.id),
  snack: crudRouter(snack, snack.id),
  toy: crudRouter(toy, toy.id),
});

export type AppRouter = typeof appRouter;
