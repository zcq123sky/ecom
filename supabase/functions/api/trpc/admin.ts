import { z } from "zod";
import { db } from "monidb/client";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { beverage, snack, toy } from "monidb/schema";
import { beverageSchemas } from "../schemas/beverage.ts";
import { snackSchemas } from "../schemas/snack.ts";
import { toySchemas } from "../schemas/toy.ts";
import { adminProcedure, router } from "./context.ts";

const B = beverage as any;
const S = snack as any;
const T = toy as any;

export const adminRouter = router({
  beverage: router({
    create: adminProcedure.input(beverageSchemas.create).mutation(({ input }) =>
      db.insert(B).values(input).returning().then((r) => r[0])
    ),
    update: adminProcedure.input(beverageSchemas.update).mutation(({ input }) =>
      db.update(B).set((input as any).data).where(eq(B.id, (input as any).id)).returning().then((r) => {
        if (r.length === 0) throw new TRPCError({ code: "NOT_FOUND", message: "Item not found" });
        return r[0];
      })
    ),
    delete: adminProcedure.input(z.number().int().positive()).mutation(({ input }) =>
      db.delete(B).where(eq(B.id, input)).returning().then((r) => {
        if (r.length === 0) throw new TRPCError({ code: "NOT_FOUND", message: "Item not found" });
        return r[0];
      })
    ),
  }),
  snack: router({
    create: adminProcedure.input(snackSchemas.create).mutation(({ input }) =>
      db.insert(S).values(input).returning().then((r) => r[0])
    ),
    update: adminProcedure.input(snackSchemas.update).mutation(({ input }) =>
      db.update(S).set((input as any).data).where(eq(S.id, (input as any).id)).returning().then((r) => {
        if (r.length === 0) throw new TRPCError({ code: "NOT_FOUND", message: "Item not found" });
        return r[0];
      })
    ),
    delete: adminProcedure.input(z.number().int().positive()).mutation(({ input }) =>
      db.delete(S).where(eq(S.id, input)).returning().then((r) => {
        if (r.length === 0) throw new TRPCError({ code: "NOT_FOUND", message: "Item not found" });
        return r[0];
      })
    ),
  }),
  toy: router({
    create: adminProcedure.input(toySchemas.create).mutation(({ input }) =>
      db.insert(T).values(input).returning().then((r) => r[0])
    ),
    update: adminProcedure.input(toySchemas.update).mutation(({ input }) =>
      db.update(T).set((input as any).data).where(eq(T.id, (input as any).id)).returning().then((r) => {
        if (r.length === 0) throw new TRPCError({ code: "NOT_FOUND", message: "Item not found" });
        return r[0];
      })
    ),
    delete: adminProcedure.input(z.number().int().positive()).mutation(({ input }) =>
      db.delete(T).where(eq(T.id, input)).returning().then((r) => {
        if (r.length === 0) throw new TRPCError({ code: "NOT_FOUND", message: "Item not found" });
        return r[0];
      })
    ),
  }),
});
