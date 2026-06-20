import { ProductCard } from './ProductCard';
import { Screw } from './Screw';
import type { Product } from '@/data/products';

interface ProductDisplayProps {
  products: Product[];
  selectedProduct: number | null;
  onSelectProduct: (id: number) => void;
}

export function ProductDisplay({ products, selectedProduct, onSelectProduct }: ProductDisplayProps) {
  const rows = [
    products.slice(0, 4),
    products.slice(4, 8),
    products.slice(8, 12),
  ];

  return (
    <div className="relative w-[1040px] bg-machine-inner border-3 border-outline rounded-t-xl p-6 flex flex-col gap-4"
      style={{ boxShadow: '8px 8px 0 0 rgba(0,0,0,0.2)' }}
    >
      <Screw className="top-2.5 left-2.5" />
      <Screw className="top-2.5 right-2.5" />
      <Screw className="bottom-2.5 left-2.5" />
      <Screw className="bottom-2.5 right-2.5" />

      <div className="absolute inset-4 border-2 border-outline rounded pointer-events-none" />

      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-2.5 justify-center">
          {row.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              isSelected={selectedProduct === product.id}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
