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
