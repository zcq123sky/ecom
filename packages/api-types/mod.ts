/**
 * @moly/api-types — tRPC AppRouter type + entity interfaces for ecom frontend.
 *
 * This package exports the AppRouter type that createTRPCReact<AppRouter>()
 * needs. The type is defined via a fake tRPC router (never executed at runtime)
 * to guarantee 100% type compatibility with tRPC v11 inference.
 *
 * Entity interfaces are also exported for convenience.
 */

import { initTRPC } from "@trpc/server";

// ── Helpers ──

function type<T>() {
  return { parse: (_x: unknown) => _x as T };
}

// ── Entity types (mirrors monidb schema) ──

export interface Beverage {
  id: number;
  name: string;
  description: string | null;
  price: string;
  image: string | null;
  category: string;
  volume: number | null;
  stock: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBeverage {
  name: string;
  price: string;
  category: string;
  volume: number;
  stock?: number;
  description?: string;
  image?: string;
  isAvailable?: boolean;
}

export interface UpdateBeverage {
  id: number;
  data: Partial<CreateBeverage>;
}

export interface Snack {
  id: number;
  name: string;
  description: string | null;
  price: string;
  image: string | null;
  category: string;
  weight: number | null;
  stock: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSnack {
  name: string;
  price: string;
  category: string;
  weight: number;
  stock?: number;
  description?: string;
  image?: string;
  isAvailable?: boolean;
}

export interface UpdateSnack {
  id: number;
  data: Partial<CreateSnack>;
}

export interface Toy {
  id: number;
  name: string;
  description: string | null;
  price: string;
  image: string | null;
  category: string;
  material: string;
  size: string;
  stock: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateToy {
  name: string;
  price: string;
  category: string;
  material: string;
  size: string;
  stock?: number;
  description?: string;
  image?: string;
  isAvailable?: boolean;
}

export interface UpdateToy {
  id: number;
  data: Partial<CreateToy>;
}

export interface PurchaseInput {
  id: number;
  quantity: number;
}

// ── AppRouter type (fake router, never executed) ──

const t = initTRPC.create();

const _appRouter = t.router({
  public: t.router({
    beverage: t.router({
      list: t.procedure.query(() => ({}) as Beverage[]),
      byId: t.procedure.input(type<number>()).query(() => ({}) as Beverage | null),
      purchase: t.procedure.input(type<PurchaseInput>()).mutation(() => ({}) as Beverage),
    }),
    snack: t.router({
      list: t.procedure.query(() => ({}) as Snack[]),
      byId: t.procedure.input(type<number>()).query(() => ({}) as Snack | null),
      purchase: t.procedure.input(type<PurchaseInput>()).mutation(() => ({}) as Snack),
    }),
    toy: t.router({
      list: t.procedure.query(() => ({}) as Toy[]),
      byId: t.procedure.input(type<number>()).query(() => ({}) as Toy | null),
      purchase: t.procedure.input(type<PurchaseInput>()).mutation(() => ({}) as Toy),
    }),
  }),
  admin: t.router({
    beverage: t.router({
      create: t.procedure.input(type<CreateBeverage>()).mutation(() => ({}) as Beverage),
      update: t.procedure.input(type<UpdateBeverage>()).mutation(() => ({}) as Beverage),
      delete: t.procedure.input(type<number>()).mutation(() => ({}) as Beverage),
    }),
    snack: t.router({
      create: t.procedure.input(type<CreateSnack>()).mutation(() => ({}) as Snack),
      update: t.procedure.input(type<UpdateSnack>()).mutation(() => ({}) as Snack),
      delete: t.procedure.input(type<number>()).mutation(() => ({}) as Snack),
    }),
    toy: t.router({
      create: t.procedure.input(type<CreateToy>()).mutation(() => ({}) as Toy),
      update: t.procedure.input(type<UpdateToy>()).mutation(() => ({}) as Toy),
      delete: t.procedure.input(type<number>()).mutation(() => ({}) as Toy),
    }),
  }),
});

export type AppRouter = typeof _appRouter;
