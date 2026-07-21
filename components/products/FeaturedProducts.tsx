import { featuredProducts } from "@/data/featuredProducts";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Featured
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Sản phẩm nổi bật
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">
            Những mẫu mô hình được yêu thích và bán chạy nhất tại 3D LAB.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.slice(0, 6).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="rounded-full bg-black px-10 py-4 text-white transition hover:bg-blue-600">
            Xem tất cả sản phẩm
          </button>
        </div>
      </div>
    </section>
  );
}