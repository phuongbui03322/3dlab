"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types/product";

interface CollectionProductsProps {
  title: string;
  products: Product[];
}

const PRODUCTS_PER_LOAD = 8;

export default function CollectionProducts({
  title,
  products,
}: CollectionProductsProps) {
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD);
  const [loading, setLoading] = useState(false);

  const displayedProducts = products.slice(0, visibleCount);

  const hasMore = visibleCount < products.length;

  const handleClick = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      if (hasMore) {
        setVisibleCount((prev) =>
          Math.min(prev + PRODUCTS_PER_LOAD, products.length)
        );
      } else {
        setVisibleCount(PRODUCTS_PER_LOAD);

        document
          .getElementById("collection-products")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }

      setLoading(false);
    }, 250);
  };

  if (products.length === 0) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          Chưa có sản phẩm
        </h2>

        <p className="mt-3 text-gray-500">
          Danh mục này sẽ được cập nhật trong thời gian tới.
        </p>
      </section>
    );
  }

  return (
    <section
      id="collection-products"
      className="py-14"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 flex items-end justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
              3D LAB
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {title}
            </h2>

          </div>

          <div className="hidden rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-600 md:block">
            {products.length} sản phẩm
          </div>

        </div>

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

        {products.length > PRODUCTS_PER_LOAD && (
          <div className="mt-12 flex justify-center">

            <button
              onClick={handleClick}
              disabled={loading}
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
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