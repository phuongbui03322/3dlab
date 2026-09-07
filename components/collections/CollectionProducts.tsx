"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  Search,
} from "lucide-react";

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
  const [visibleCount, setVisibleCount] =
    useState(PRODUCTS_PER_LOAD);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  // Tìm kiếm sản phẩm
  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return products;
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(keyword)
    );
  }, [products, search]);

  // Số sản phẩm đang hiển thị
  const displayedProducts = filteredProducts.slice(
    0,
    visibleCount
  );

  const hasMore =
    visibleCount < filteredProducts.length;

  const handleClick = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      if (hasMore) {
        setVisibleCount((prev) =>
          Math.min(
            prev + PRODUCTS_PER_LOAD,
            filteredProducts.length
          )
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

  // Khi tìm kiếm thì quay lại 8 sản phẩm đầu
  const handleSearch = (
    value: string
  ) => {
    setSearch(value);
    setVisibleCount(PRODUCTS_PER_LOAD);
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
      className="py-10 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Header */}
        <div className="mb-6">

          <div className="flex items-end justify-between gap-4">

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-red-500 sm:text-sm">
                3D LAB
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {title}
              </h2>
            </div>

            <div className="hidden rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-600 md:block">
              {search
                ? `${filteredProducts.length} sản phẩm`
                : `${products.length} sản phẩm`}
            </div>

          </div>

          {/* Search */}
          <div className="relative mt-5">
            <Search
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
              placeholder="Tìm mô hình..."
              className="h-11 w-full rounded-full border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:h-12 sm:text-base"
            />

            {search && (
              <button
                type="button"
                onClick={() => handleSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 transition hover:text-slate-700"
              >
                Xóa
              </button>
            )}
          </div>

        </div>

        {/* Không tìm thấy */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <Search
                size={24}
                className="text-slate-400"
              />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Không tìm thấy mô hình
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Thử tìm với tên sản phẩm khác.
            </p>

            <button
              type="button"
              onClick={() => handleSearch("")}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <>
            {/* Products */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">

              {displayedProducts.map(
                (product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-up"
                    style={{
                      animationDelay: `${index * 40}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <ProductCard
                      product={product}
                    />
                  </div>
                )
              )}

            </div>

            {/* Load more */}
            {filteredProducts.length >
              PRODUCTS_PER_LOAD && (
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

                      <ChevronDown
                        size={18}
                      />
                    </>
                  ) : (
                    <>
                      Thu gọn

                      <ChevronUp
                        size={18}
                      />
                    </>
                  )}

                </button>

              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}