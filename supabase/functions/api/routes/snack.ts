import { createCrudRoutes } from "../crudFactory.ts";
import { snack } from "monidb/schema";

const snackRoutes = createCrudRoutes(snack);

// 导出类型，供前端使用
export type SnackRoutes = typeof snackRoutes;
export { snackRoutes };
