import { trpc } from "@/lib/trpc";

export interface Product {
  id: number;
  name: string;
  price: number;
  emoji: string;
  category: "drink" | "snack" | "toy";
  status: "available" | "low";
}

const emojiMap: Record<string, string> = {
  "可口可乐": "🥤",
  "柠檬茶": "🍋",
  "矿泉水": "💧",
  "冰红茶": "🧊",
  "薯片": "🍿",
  "巧克力": "🍫",
  "饼干": "🍪",
  "花生": "🥜",
  "毛绒玩具": "🧸",
  "扭蛋": "🎰",
  "盲盒": "🎁",
  "果汁": "🧃",
};

export const categoryColors: Record<Product["category"], string> = {
  drink: "bg-product-drink",
  snack: "bg-product-snack",
  toy: "bg-product-toy",
};

function transform(item: any): Product {
  return {
    id: item.id,
    name: item.name,
    price: Number(item.price),
    emoji: emojiMap[item.name] || "📦",
    category: item.category,
    status: item.stock <= 3 ? "low" : "available",
  };
}

export function useProducts() {
  const beverages = trpc.beverage.list.useQuery();
  const snacks = trpc.snack.list.useQuery();
  const toys = trpc.toy.list.useQuery();

  const isLoading = beverages.isLoading || snacks.isLoading || toys.isLoading;
  const data = [
    ...(beverages.data ?? []),
    ...(snacks.data ?? []),
    ...(toys.data ?? []),
  ].map(transform);

  return { data, isLoading };
}
