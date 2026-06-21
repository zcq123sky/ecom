import { db } from "./client.ts";
import { beverage } from "./schema/beverage.ts";
import { snack } from "./schema/snack.ts";
import { toy } from "./schema/toy.ts";

async function main() {
  console.log("Seeding database...")

  const beverages = await db.insert(beverage).values([
    { name: "可口可乐", price: "5", category: "drink", volume: 330, stock: 50 },
    { name: "柠檬茶", price: "4", category: "drink", volume: 310, stock: 40 },
    { name: "矿泉水", price: "3", category: "drink", volume: 550, stock: 60 },
    { name: "冰红茶", price: "4", category: "drink", volume: 500, stock: 35 },
    { name: "果汁", price: "6", category: "drink", volume: 300, stock: 25 },
  ]).returning();
  console.log(`Inserted ${beverages.length} beverages`);

  const snacks = await db.insert(snack).values([
    { name: "薯片", price: "8", category: "snack", weight: 75, stock: 30 },
    { name: "巧克力", price: "10", category: "snack", weight: 50, stock: 20 },
    { name: "饼干", price: "6", category: "snack", weight: 100, stock: 25 },
    { name: "花生", price: "5", category: "snack", weight: 60, stock: 15 },
  ]).returning();
  console.log(`Inserted ${snacks.length} snacks`);

  const toys = await db.insert(toy).values([
    { name: "毛绒玩具", price: "15", category: "toy", material: "毛绒", size: "15cm", stock: 10 },
    { name: "扭蛋", price: "10", category: "toy", material: "塑料", size: "5cm", stock: 15 },
    { name: "盲盒", price: "20", category: "toy", material: "纸盒", size: "8cm", stock: 3 },
  ]).returning();
  console.log(`Inserted ${toys.length} toys`);

  console.log("Seed complete!");
  Deno.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  Deno.exit(1);
});
