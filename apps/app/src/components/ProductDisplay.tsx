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
    <div className="relative w-[1040px] bg-machine-inner border-3 border-b-0 border-outline p-6 flex flex-col gap-4 justify-center">
      <Screw className="top-2.5 left-2.5" />
      <Screw className="top-2.5 right-2.5" />
      <Screw className="bottom-2.5 left-2.5" />
      <Screw className="bottom-2.5 right-2.5" />

      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-4 justify-center">
          {row.map((product, ci) => (
            <ProductCard
              key={product.id}
              product={product}
              label={`${['A','B','C'][ri]}${ci + 1}`}
              onSelect={onSelectProduct}
              isSelected={selectedProduct === product.id}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
