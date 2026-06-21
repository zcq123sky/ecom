# ecom API Refactor: tRPC + Zod, Remove Hono REST

## Goal

Remove Hono REST CRUD routes. Rebuild the Edge Function API around tRPC with proper Zod input validation. Split into `public` (customer-facing) and `admin` (owner-facing) routers.

## Scope

### Delete
- `supabase/functions/api/crudFactory.ts`
- `supabase/functions/api/routes/` — entire directory

### New files
- `supabase/functions/api/trpc/context.ts` — `createContext`, `requireAdmin` middleware (auth skeleton)
- `supabase/functions/api/trpc/public.ts` — `list`, `byId`, `purchase` procedures for all 3 entities
- `supabase/functions/api/trpc/admin.ts` — `create`, `update`, `delete` procedures for all 3 entities
- `supabase/functions/api/schemas/beverage.ts`
- `supabase/functions/api/schemas/snack.ts`
- `supabase/functions/api/schemas/toy.ts`

### Modify
- `supabase/functions/api/index.ts` — keep Hono as HTTP shell, serve only tRPC, remove REST route mounting
- `supabase/functions/api/trpc/router.ts` — compose public + admin routers

### Untouched
- `packages/monidb/` — schema, client, seed entirely unchanged
- `apps/app/` — routes and components unchanged; only `lib/api.ts` and `lib/trpc.ts` may need updates

## Router Structure

```
root
├── public (no middleware)
│   ├── beverage.list    → db.select().from(beverage)
│   ├── beverage.byId    → db.select().where(eq(id))
│   ├── beverage.purchase → check stock → decrement → return updated item
│   ├── snack.{list,byId,purchase}
│   └── toy.{list,byId,purchase}
│
└── admin (requireAdmin middleware skeleton)
    ├── beverage.{create,update,delete}
    ├── snack.{create,update,delete}
    └── toy.{create,update,delete}
```

### purchase Procedure
- Input: `{ id: number, quantity: number }` (quantity ≥ 1)
- Logic: select item by id → if `stock < quantity`, throw TRPCError `PRECONDITION_FAILED` → `db.update().set({ stock: stock - quantity })` → return updated item
- Error: item not found → `NOT_FOUND`; insufficient stock → `PRECONDITION_FAILED`

## Zod Schemas

Located in `supabase/functions/api/schemas/`.

### Beverage
- `beverageCreate`: `{ name: z.string().min(1), price: z.string(), category: z.string(), volume: z.number().int().positive(), stock: z.number().int().min(0).optional().default(0) }`
- `beverageUpdate`: partial of create, at least one key
- `beveragePurchase`: `{ id: z.number().int().positive(), quantity: z.number().int().positive() }`

### Snack
- `snackCreate`: `{ name: z.string().min(1), price: z.string(), category: z.string(), weight: z.number().int().positive(), stock: z.number().int().min(0).optional().default(0) }`
- `snackUpdate`: partial
- `snackPurchase`: `{ id, quantity }`

### Toy
- `toyCreate`: `{ name: z.string().min(1), price: z.string(), category: z.string(), material: z.string(), size: z.string(), stock: z.number().int().min(0).optional().default(0) }`
- `toyUpdate`: partial
- `toyPurchase`: `{ id, quantity }`

## Context & Middleware

Initial skeleton in `trpc/context.ts`:

```ts
export async function createContext(req: Request) {
  // Later: parse JWT from Authorization header
  return { userId: null as string | null }
}

export const requireAdmin = t.middleware(({ ctx, next }) => {
  // Later: check ctx.userId, throw UNAUTHORIZED if null
  return next({ ctx })
})
```

`requireAdmin` is attached to `admin` router only. Initially it passes through unconditionally — the skeleton is ready for when auth is wired up.

## Hono Entry Point (index.ts)

After cleanup:

```ts
import { Hono } from "hono"
import { cors } from "hono/cors"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "./trpc/router.ts"
import { createContext } from "./trpc/context.ts"

const app = new Hono()
app.use("/api/*", cors())
app.all("/api/trpc", (c) => fetchRequestHandler({
  endpoint: "/api/trpc",
  req: c.req.raw,
  router: appRouter,
  createContext: () => createContext(c.req.raw),
}))
app.all("/api/trpc/*", (c) => fetchRequestHandler({
  endpoint: "/api/trpc",
  req: c.req.raw,
  router: appRouter,
  createContext: () => createContext(c.req.raw),
}))

export default app
```

## Implementation Order

1. Create `schemas/` directory with 3 entity schema files
2. Create `trpc/context.ts`
3. Create `trpc/public.ts`
4. Create `trpc/admin.ts`
5. Rewrite `trpc/router.ts`
6. Delete `crudFactory.ts` and `routes/`
7. Rewrite `index.ts`
8. Update frontend `lib/api.ts` — either delete or migrate callers to tRPC (depends on whether any component imports it)
9. `apps/app/src/lib/supabase.ts` untouched (kept for future auth)

## Constraints

- Keep all existing `packages/monidb/` imports intact
- No new dependencies beyond what's already in `deno.json`
- Type sharing via JSR is user's responsibility — not in scope
