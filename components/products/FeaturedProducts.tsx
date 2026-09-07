import { featuredProducts } from "@/data/featuredProducts";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  // Chỉ lấy sản phẩm Pokemon + Sonic
  const pokemonAndSonic = featuredProducts.filter(
    (product) =>
      product.category === "Pokemon" ||
      product.category === "Sonic"
  );

  // Xáo trộn ngẫu nhiên
  const randomProducts = [...pokemonAndSonic]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Tiêu đề */}
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

        {/* Sản phẩm Pokemon + Sonic */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {randomProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Xem tất cả */}
        <div className="mt-16 text-center">
          <button className="rounded-full bg-black px-10 py-4 text-white transition hover:bg-blue-600">
            Xem tất cả sản phẩm
          </button>
        </div>

      </div>
    </section>
  );
}