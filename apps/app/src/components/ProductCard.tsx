import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onSelect?: (id: number) => void;
  isSelected?: boolean;
}

const statusConfig: Record<string, { text: string; color: string }> = {
  available: { text: '● 可选', color: 'text-product-drink' },
  low: { text: '仅剩3个', color: 'text-machine-accent-dark' },
};

export function ProductCard({ product, onSelect, isSelected }: ProductCardProps) {
  const bgClass = {
    drink: 'bg-product-drink',
    snack: 'bg-product-snack',
    toy: 'bg-product-toy',
  }[product.category];

  const status = statusConfig[product.status];

  return (
    <div
      className={`w-[235px] h-[230px] bg-machine-inner border-3 border-outline rounded-lg p-3 flex flex-col gap-[6px] select-none transition-transform ${
        isSelected ? 'scale-95 opacity-80' : ''
      }`}
      style={{
        boxShadow: isSelected
          ? '1px 1px 0 0 #2C1810'
          : '3px 3px 0 0 rgba(0,0,0,0.25)',
      }}
      onClick={() => onSelect?.(product.id)}
    >
      <div className={`relative flex-1 ${bgClass} border-2 border-outline rounded overflow-hidden min-h-0`}
        style={{ boxShadow: 'inset 0 0 6px rgba(0,0,0,0.27)' }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-white/35 z-10" />
        <div className="absolute top-2 right-2 w-2 h-24 bg-white/12 -rotate-[30deg] z-10" />
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-black/20 z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl">{product.emoji}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 h-5">
        <span className="text-machine-accent-dark text-sm font-bold">{product.id}</span>
        <span className="text-text-dark text-sm font-bold truncate">{product.name}</span>
      </div>
      <div className="flex items-center gap-1.5 h-5">
        <span className="text-lever-handle text-sm font-bold">¥{product.price}</span>
        <span className={`text-xs ${status.color} truncate`}>{status.text}</span>
      </div>
    </div>
  );
}
