# ecom API Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove Hono REST CRUD, rebuild the Edge Function API around tRPC with proper Zod input validation, split into public + admin routers.

**Architecture:** tRPC procedures replace Hono CRUD routes. A `purchase` procedure adds the first real business logic (stock check + decrement). Public router handles customer operations; admin router handles owner CRUD with auth middleware skeleton.

**Tech Stack:** Hono (HTTP shell), tRPC (server + client), Zod (validation), Drizzle ORM + postgres (DB), Supabase Edge Function (deploy target).

## Global Constraints

- No new dependencies beyond what's already in `deno.json` files
- All `packages/monidb/` imports remain unchanged
- CamelCase field names in Zod schemas (matches Drizzle JS property names, e.g. `isAvailable` not `is_available`)
- Auth middleware skeleton only — JWT parsing not implemented yet
- Type sharing via JSR is user's responsibility — not in scope

---

### Task 1: Create Zod Schema Files

**Files:**
- Create: `supabase/functions/api/schemas/beverage.ts`
- Create: `supabase/functions/api/schemas/snack.ts`
- Create: `supabase/functions/api/schemas/toy.ts`

**Interfaces:**
- Produces: `beverageSchemas.create` (ZodObject), `beverageSchemas.update` (shape-only, for wrapping with id), `beverageSchemas.purchase` (ZodObject) — and similarly for snack, toy.

- [ ] **Create `supabase/functions/api/schemas/beverage.ts`**

```ts
import { z } from "zod";

const create = z.object({
  name: z.string().min(1),
  price: z.string(),
  category: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  volume: z.number().int().positive(),
  stock: z.number().int().min(0).default(0),
  isAvailable: z.boolean().optional().default(true),
});

const updateShape = z.object({
  name: z.string().min(1).optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  volume: z.number().int().positive().optional(),
  stock: z.number().int().min(0).optional(),
  isAvailable: z.boolean().optional(),
});

export const beverageSchemas = {
  create,
  updateShape,
  update: z.object({ id: z.number().int().positive(), data: updateShape }),
  purchase: z.object({ id: z.number().int().positive(), quantity: z.number().int().positive() }),
};
```

- [ ] **Create `supabase/functions/api/schemas/snack.ts`**

```ts
import { z } from "zod";

const create = z.object({
  name: z.string().min(1),
  price: z.string(),
  category: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  weight: z.number().int().positive(),
  stock: z.number().int().min(0).default(0),
  isAvailable: z.boolean().optional().default(true),
});

const updateShape = z.object({
  name: z.string().min(1).optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  weight: z.number().int().positive().optional(),
  stock: z.number().int().min(0).optional(),
  isAvailable: z.boolean().optional(),
});

export const snackSchemas = {
  create,
  updateShape,
  update: z.object({ id: z.number().int().positive(), data: updateShape }),
  purchase: z.object({ id: z.number().int().positive(), quantity: z.number().int().positive() }),
};
```

- [ ] **Create `supabase/functions/api/schemas/toy.ts`**

```ts
import { z } from "zod";

const create = z.object({
  name: z.string().min(1),
  price: z.string(),
  category: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  material: z.string(),
  size: z.string(),
  stock: z.number().int().min(0).default(0),
  isAvailable: z.boolean().optional().default(true),
});

const updateShape = z.object({
  name: z.string().min(1).optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  material: z.string().optional(),
  size: z.string().optional(),
  stock: z.number().int().min(0).optional(),
  isAvailable: z.boolean().optional(),
});

export const toySchemas = {
  create,
  updateShape,
  update: z.object({ id: z.number().int().positive(), data: updateShape }),
  purchase: z.object({ id: z.number().int().positive(), quantity: z.number().int().positive() }),
};
```

- [ ] **Verify TypeScript compiles**

```bash
deno check supabase/functions/api/schemas/beverage.ts
deno check supabase/functions/api/schemas/snack.ts
deno check supabase/functions/api/schemas/toy.ts
```

Expected: no output (success)

- [ ] **Commit Task 1**

```bash
git add supabase/functions/api/schemas/
git commit -m "feat: add Zod schemas for beverage, snack, toy"
```

---

### Task 2: Create tRPC Context + Middleware

**Files:**
- Create: `supabase/functions/api/trpc/context.ts`

**Interfaces:**
- Produces: `createContext(req: Request) => { userId: string | null }`, `router`, `publicProcedure`, `adminProcedure`

- [ ] **Create `supabase/functions/api/trpc/context.ts`**

```ts
import { initTRPC } from "@trpc/server";

export async function createContext(req: Request) {
  // Future: parse JWT from Authorization header and set userId
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
```

- [ ] **Verify TypeScript compiles**

```bash
deno check supabase/functions/api/trpc/context.ts
```

Expected: no output

- [ ] **Commit Task 2**

```bash
git add supabase/functions/api/trpc/context.ts
git commit -m "feat: add tRPC context and adminProcedure middleware skeleton"
```

---

### Task 3: Create Public Router

**Files:**
- Create: `supabase/functions/api/trpc/public.ts`

**Interfaces:**
- Depends on: `beverageSchemas.purchase`, `snackSchemas.purchase`, `toySchemas.purchase` (from Task 1), `router`, `publicProcedure` (Task 2)
- Produces: `publicRouter` — combines all 3 entity routers

- [ ] **Create `supabase/functions/api/trpc/public.ts`**

```ts
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
```

- [ ] **Verify TypeScript compiles**

```bash
deno check supabase/functions/api/trpc/public.ts
```

Expected: no output

- [ ] **Commit Task 3**

```bash
git add supabase/functions/api/trpc/public.ts
git commit -m "feat: add public tRPC router with list, byId, purchase"
```

---

### Task 4: Create Admin Router

**Files:**
- Create: `supabase/functions/api/trpc/admin.ts`

**Interfaces:**
- Depends on: `beverageSchemas.create`, `beverageSchemas.update`, `snackSchemas.create`, `snackSchemas.update`, `toySchemas.create`, `toySchemas.update` (Task 1), `router`, `adminProcedure` (Task 2)
- Produces: `adminRouter` — CRUD for all 3 entities with `adminProcedure`

- [ ] **Create `supabase/functions/api/trpc/admin.ts`**

```ts
import { z } from "zod";
import { db } from "monidb/client";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { beverage, snack, toy } from "monidb/schema";
import { beverageSchemas } from "../schemas/beverage.ts";
import { snackSchemas } from "../schemas/snack.ts";
import { toySchemas } from "../schemas/toy.ts";
import { adminProcedure, router } from "./context.ts";

function entityRouter(table: any, idColumn: any, schemas: { create: any; update: any }) {
  return router({
    create: adminProcedure.input(schemas.create).mutation(({ input }) =>
      db.insert(table).values(input).returning().then((r) => r[0])
    ),
    update: adminProcedure.input(schemas.update).mutation(({ input }) =>
      db.update(table).set(input.data).where(eq(idColumn, input.id)).returning().then((r) => {
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
```

- [ ] **Verify TypeScript compiles**

```bash
deno check supabase/functions/api/trpc/admin.ts
```

Expected: no output

- [ ] **Commit Task 4**

```bash
git add supabase/functions/api/trpc/admin.ts
git commit -m "feat: add admin tRPC router with create, update, delete"
```

---

### Task 5: Compose Root Router + Clean Up index.ts

**Files:**
- Modify: `supabase/functions/api/trpc/router.ts`
- Modify: `supabase/functions/api/index.ts`
- Delete: `supabase/functions/api/crudFactory.ts`
- Delete: `supabase/functions/api/routes/beverage.ts`
- Delete: `supabase/functions/api/routes/snack.ts`
- Delete: `supabase/functions/api/routes/toy.ts`

- [ ] **Rewrite `supabase/functions/api/trpc/router.ts`**

```ts
import { router } from "./context.ts";
import { publicRouter } from "./public.ts";
import { adminRouter } from "./admin.ts";

export const appRouter = router({
  public: publicRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
```

- [ ] **Rewrite `supabase/functions/api/index.ts`**

```ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./trpc/router.ts";
import { createContext } from "./trpc/context.ts";

const app = new Hono();
app.use("/api/*", cors());

app.all("/api/trpc", (c) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext: () => createContext(c.req.raw),
  }),
);
app.all("/api/trpc/*", (c) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext: () => createContext(c.req.raw),
  }),
);

export default app;
```

- [ ] **Delete REST files**

```bash
rm supabase/functions/api/crudFactory.ts
rm -r supabase/functions/api/routes/
```

- [ ] **Verify TypeScript compiles**

```bash
deno check supabase/functions/api/index.ts
deno check supabase/functions/api/trpc/router.ts
```

Expected: no output

- [ ] **Commit Task 5**

```bash
git add supabase/functions/api/trpc/router.ts \
      supabase/functions/api/index.ts \
      -A supabase/functions/api/
git commit -m "refactor: compose public+admin router, remove REST routes"
```

---

### Task 6: Update Frontend

**Files:**
- Modify: `apps/app/src/lib/api.ts`
- Modify: `apps/app/src/lib/trpc.ts`

- [ ] **Check `apps/app/src/lib/api.ts` usage**

Search for imports of `api.ts` across `apps/app/src/`:

```bash
rg "from.*lib/api" apps/app/src/ || echo "No imports found"
```

If no imports exist, the file has no callers and can be kept as-is or deleted.

- [ ] **Verify frontend tRPC type import still works**

The relative import path `../../../supabase/functions/api/trpc/router.ts` in `apps/app/src/lib/trpc.ts` still resolves since the file still exists at that path. No change needed.

- [ ] **Commit Task 6**

```bash
git add -A
git commit -m "chore: cleanup unused frontend api references"
```

---

### Verification

After all tasks, run a final check:

```bash
deno check supabase/functions/api/index.ts
```

If you have `supabase` CLI and local services running:

```bash
supabase functions serve api --env-file supabase/functions/api/.env
```

Then test from another terminal:

```bash
# List beverages
curl http://127.0.0.1:54321/functions/v1/api/trpc/public.beverage.list

# Purchase a beverage (id=1, qty=2)
curl -X POST http://127.0.0.1:54321/functions/v1/api/trpc/public.beverage.purchase \
  -H "Content-Type: application/json" \
  -d '{"0":{"id":1,"quantity":2}}'
```
