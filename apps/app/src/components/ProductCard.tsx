import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onSelect?: (id: number) => void;
  isSelected?: boolean;
  label: string;
}

export function ProductCard({ product, onSelect, isSelected, label }: ProductCardProps) {
  const bgClass = {
    drink: 'bg-product-drink',
    snack: 'bg-product-snack',
    toy: 'bg-product-toy',
  }[product.category];

  const isAvailable = product.status === 'available';

  return (
    <div
      className="w-[236px] h-[280px] bg-machine-inner border-4 border-outline p-3 flex flex-col select-none"
      style={{ opacity: isSelected ? 0.8 : 1 }}
      onClick={() => onSelect?.(product.id)}
    >
      <div className={`relative flex-1 ${bgClass} border-2 border-outline rounded overflow-hidden min-h-0`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl">{product.emoji}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 h-8 px-1">
        <div className={`w-11 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
          isAvailable ? 'bg-green-700' : 'bg-red-600'
        }`}>
          {label}
        </div>
        <span className="text-xs text-lever-handle font-bold">¥{product.price}</span>
      </div>
    </div>
  );
}
