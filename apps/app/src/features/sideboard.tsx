import { ProductCard } from '@/components/product-card.tsx'
interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
}


export function SideBoard({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 border-2 border-purple-500">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
  );
}
