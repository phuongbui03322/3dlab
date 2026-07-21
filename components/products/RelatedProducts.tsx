import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({
  products,
}: RelatedProductsProps) {
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
        <p className="text-slate-500">
          Chưa có sản phẩm liên quan.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}