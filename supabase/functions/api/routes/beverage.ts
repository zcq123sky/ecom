import { createCrudRoutes } from "../crudFactory.ts";
import { beverage } from "monidb/schema";

const beverageRoutes = createCrudRoutes(beverage);
// 导出类型，供前端使用
export type BeverageRoutes = typeof beverageRoutes;
export { beverageRoutes };
