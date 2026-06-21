import { router } from "./context.ts";
import { publicRouter } from "./public.ts";
import { adminRouter } from "./admin.ts";

export const appRouter = router({
  public: publicRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
