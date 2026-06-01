// src/components/ProductCard.tsx
import { Link } from '@tanstack/react-router'

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$productId"
      params={{ productId: String(product.id) }}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-1 text-gray-900">{product.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">¥{product.price}</span>
          <span className="text-sm text-yellow-500">★ {product.rating}</span>
        </div>
      </div>
    </Link>
  )
}
