import { Hono } from "hono";
import { cors } from "hono/cors";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { beverageRoutes } from "./routes/beverage.ts";
import { snackRoutes } from "./routes/snack.ts";
import { toyRoutes } from "./routes/toy.ts";
import { appRouter } from "./trpc/router.ts";

const app = new Hono();
app.use("/api/*", cors());
app.get("/api/test", (c) => c.text("Hello from test!"));

// REST 路由
app.route("/api/beverage", beverageRoutes);
app.route("/api/snack", snackRoutes);
app.route("/api/toy", toyRoutes);

// tRPC — 直接透传，无需 URL 重写
app.all("/api/trpc", (c) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext: () => ({}),
  }),
);
app.all("/api/trpc/*", (c) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext: () => ({}),
  }),
);

export default app;
