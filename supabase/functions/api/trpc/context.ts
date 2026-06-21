import { initTRPC } from "@trpc/server";

export async function createContext(_req: Request) {
  return { userId: null as string | null };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const adminProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    // Skeleton: unconditionally passes through.
    // Future: if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
    return next({ ctx });
  }),
);
