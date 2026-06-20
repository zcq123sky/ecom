// supabase/functions/api/crudFactory.ts
import { Hono } from "hono";
import { db } from "monidb/client";
import { eq } from "drizzle-orm";

export function createCrudRoutes(table: any) {
  const app = new Hono();

  // GET / - 列表
  app.get("/", async (c) => {
    try {
      const items = await db.select().from(table);
      return c.json({ success: true, data: items });
    } catch (err: any) {
      console.error(err);
      return c.json({ error: err.message }, 500);
    }
  });

  // GET /:id - 详情
  app.get("/:id", async (c) => {
    const id = c.req.param("id");
    try {
      const items = await db.select().from(table).where(eq(table.id, Number(id)));
      if (items.length === 0) return c.json({ error: "Not found" }, 404);
      return c.json({ success: true, data: items[0] });
    } catch (err: any) {
      return c.json({ error: err.message }, 500);
    }
  });

  // POST / - 创建
  app.post("/", async (c) => {
    const body = await c.req.json();
    try {
      const inserted = await db.insert(table).values(body).returning();
      return c.json({ success: true, data: inserted[0] }, 201);
    } catch (err: any) {
      return c.json({ error: err.message }, 400);
    }
  });

  // PUT /:id - 更新
  app.put("/:id", async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    try {
      const updated = await db.update(table).set(body).where(eq(table.id, Number(id))).returning();
      if (updated.length === 0) return c.json({ error: "Not found" }, 404);
      return c.json({ success: true, data: updated[0] });
    } catch (err: any) {
      return c.json({ error: err.message }, 400);
    }
  });

  // DELETE /:id - 删除
  app.delete("/:id", async (c) => {
    const id = c.req.param("id");
    try {
      const deleted = await db.delete(table).where(eq(table.id, Number(id))).returning();
      if (deleted.length === 0) return c.json({ error: "Not found" }, 404);
      return c.json({ success: true, message: "Deleted" });
    } catch (err: any) {
      return c.json({ error: err.message }, 500);
    }
  });

  return app;
}
