"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";

import ProductCard from "@/components/products/ProductCard";
import { featuredProducts } from "@/data/featuredProducts";

const PRODUCTS_PER_LOAD = 4;

export default function FeaturedProducts() {
  const [visibleCount, setVisibleCount] =
    useState(PRODUCTS_PER_LOAD);

  const [loading, setLoading] = useState(false);

  const displayedProducts = featuredProducts.slice(
    0,
    visibleCount
  );

  const hasMore =
    visibleCount < featuredProducts.length;

  const handleClick = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      if (hasMore) {
        setVisibleCount((prev) =>
          Math.min(
            prev + PRODUCTS_PER_LOAD,
            featuredProducts.length
          )
        );
      } else {
        setVisibleCount(PRODUCTS_PER_LOAD);

        document
          .getElementById("featured-products")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }

      setLoading(false);
    }, 250);
  };

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

        {/* Button */}
        {featuredProducts.length >
          PRODUCTS_PER_LOAD && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleClick}
              disabled={loading}
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Đang tải...
                </>
              ) : hasMore ? (
                <>
                  Xem thêm sản phẩm
                  <ChevronDown size={18} />
                </>
              ) : (
                <>
                  Thu gọn
                  <ChevronUp size={18} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}