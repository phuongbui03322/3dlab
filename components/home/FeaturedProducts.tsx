"use client";

import { useEffect, useState } from "react";

import ProductCard from "@/components/products/ProductCard";
import { featuredProducts } from "@/data/featuredProducts";

export default function FeaturedProducts() {
  const [displayedProducts, setDisplayedProducts] =
    useState<typeof featuredProducts>([]);

  useEffect(() => {
    // Chỉ lấy sản phẩm Pokémon + Sonic
    const products = featuredProducts.filter(
      (product) =>
        product.category === "Pokemon" ||
        product.category === "Sonic"
    );

    // Random sản phẩm
    const shuffled = [...products].sort(
      () => Math.random() - 0.5
    );

    // Chỉ lấy 6 sản phẩm
    setDisplayedProducts(shuffled.slice(0, 6));
  }, []);

  return (
    <section
      id="featured-products"
      className="pt-6 pb-14 scroll-mt-32"
    >
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
            3D LAB
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Sản phẩm nổi bật
          </h2>

          <p className="mt-3 text-gray-500">
            Những mẫu bán chạy và được khách hàng yêu thích nhất.
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{
                animationDelay: `${index * 40}ms`,
                animationFillMode: "both",
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}