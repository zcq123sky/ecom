import { createCrudRoutes } from "../crudFactory.ts";
import { toy } from "monidb/schema";

const toyRoutes = createCrudRoutes(toy);

// 导出类型，供前端使用
export type ToyRoutes = typeof toyRoutes;
export { toyRoutes };
