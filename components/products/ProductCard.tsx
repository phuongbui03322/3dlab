"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart } from "lucide-react";

import type { Product } from "@/types/product";

import ProductBadge from "./ProductBadge";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <ProductBadge badge={product.badge} />

        {/* Wishlist */}
        <button
          type="button"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition-all duration-300 group-hover:scale-110"
        >
          <Heart
            size={18}
            className="text-slate-700 transition-colors duration-300 group-hover:text-red-500"
          />
        </button>

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Category */}
        <p className="text-sm font-semibold text-blue-600">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="line-clamp-2 min-h-[56px] text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
          {product.name}
        </h3>

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

        {/* Price */}
        <ProductPrice
          price={product.price}
          oldPrice={product.oldPrice}
        />

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
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 transition-colors duration-300 group-hover:text-blue-600">
          <span className="text-sm font-semibold">
            Xem chi tiết
          </span>

          <Eye
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}