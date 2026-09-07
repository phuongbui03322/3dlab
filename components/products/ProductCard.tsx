"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart } from "lucide-react";

import { useCart } from "@/app/hooks/useCart";
import type { Product } from "@/types/product";

import ProductBadge from "./ProductBadge";
import ProductRating from "./ProductRating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const discount =
    product.originalPrice &&
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : null;

  // Các danh mục hiển thị giá trực tiếp
  const hasFixedPrice =
    product.category === "Pokemon" ||
    product.category === "Sonic" ||
    product.category === "Móc khóa" ||
    product.category === "Mô hình Mini";

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square cursor-pointer overflow-hidden bg-slate-100">

          <ProductBadge badge={product.badge} />

          {discount && (
            <div className="absolute right-3 top-3 z-20 rounded-lg bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
              -{discount}%
            </div>
          )}

          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

        </div>
      </Link>

      {/* Content */}
      <div className="space-y-4 p-5">

        {/* Category */}
        <p className="text-sm font-semibold text-blue-600">
          {product.category}
        </p>

        {/* Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[56px] cursor-pointer text-lg font-bold text-slate-900 transition-colors duration-300 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        {/* Short description */}
        {product.shortDescription && (
          <p className="line-clamp-2 text-sm leading-6 text-slate-500">
            {product.shortDescription}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center justify-between">
          <ProductRating rating={product.rating} />

          {product.reviews && (
            <span className="text-xs text-slate-500">
              ({product.reviews} đánh giá)
            </span>
          )}
        </div>

        {/* Price / Quote */}
        <div className="space-y-3">

          {hasFixedPrice ? (
            <>
              {/* Giá */}
              <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                💰{" "}
                {product.price > 0
                  ? `${product.price.toLocaleString("vi-VN")}đ`
                  : "Liên hệ báo giá"}
              </div>

              {/* Liên hệ Shop */}
              <a
                href="https://m.me/1151757441360383"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                💬 Liên hệ Shop
              </a>
            </>
          ) : (
            <>
              {/* Sản phẩm cần chọn kích thước */}
              <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                📏 Giá theo kích thước
              </div>

              {/* Báo giá */}
              <a
                href="https://m.me/1151757441360383"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                💬 Liên hệ báo giá
              </a>
            </>
          )}

        </div>

        {/* Sold + Stock */}
        <div className="flex items-center justify-between text-sm">

          {product.sold ? (
            <span className="text-slate-500">
              Đã bán {product.sold}
            </span>
          ) : (
            <span />
          )}

          {product.stock !== undefined && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              Còn {product.stock}
            </span>
          )}

        </div>

        {/* Footer */}
        <div className="space-y-3 border-t border-slate-100 pt-4">

          {/* Thêm vào giỏ */}
          <button
            onClick={() => addToCart(product)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-black"
          >
            <ShoppingCart size={18} />
            Thêm vào giỏ
          </button>

          {/* Xem chi tiết */}
          <Link
            href={`/product/${product.slug}`}
            className="flex items-center justify-between rounded-xl border px-4 py-3 transition hover:border-blue-600 hover:text-blue-600"
          >
            <span className="text-sm font-semibold">
              Xem chi tiết
            </span>

            <Eye size={18} />
          </Link>

        </div>

      </div>
    </div>
  );
}