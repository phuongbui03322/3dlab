"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import type { Product } from "@/types/product";

import ProductBadge from "./ProductBadge";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";
import { useCart } from "@/app/hooks/useCart";

import ProductGuarantee from "./ProductGuarantee";
import ProductSpecs from "./ProductSpecs";
import ProductActions from "./ProductActions";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] ?? ""
  );

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] ?? ""
  );
const { addToCart } = useCart();
  return (
    <div className="space-y-6">

      {/* Badge */}
      <div className="flex flex-wrap items-center gap-3">
        <ProductBadge badge={product.badge} />

        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-600">
          Chính hãng 3D LAB
        </span>
      </div>

      {/* Tên */}
      <div className="space-y-4">
        <h1 className="text-3xl font-black leading-tight text-slate-900 md:text-5xl">
          {product.name}
        </h1>

        {product.shortDescription && (
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            {product.shortDescription}
          </p>
        )}
      </div>

      {/* Rating */}
      <div className="flex flex-wrap items-center gap-3">
        <ProductRating rating={product.rating} />

        {product.reviews && (
          <span className="text-sm text-slate-500">
            {product.reviews} đánh giá
          </span>
        )}
      </div>

      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
  <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
    Giá sản phẩm
  </p>

  <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
    Giá tính theo kích thước
  </h2>

  <p className="mt-3 text-slate-600">
    Mỗi mẫu có nhiều kích thước khác nhau. Vui lòng liên hệ để nhận báo giá
    chính xác theo kích thước bạn mong muốn.
  </p>

  <a
    href="https://m.me/1151757441360383"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
  >
    💬 Liên hệ Shop
  </a>
</div>

      {/* Cam kết */}
      <ProductGuarantee />

      {/* Tồn kho */}
      <div>
        {product.stock !== undefined ? (
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
            Còn {product.stock} sản phẩm
          </span>
        ) : (
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
            Còn hàng
          </span>
        )}
      </div>

      {/* Kích thước */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-3">
          <p className="font-semibold text-slate-900">
            Kích thước
          </p>

          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`rounded-2xl border px-5 py-3 font-medium transition-all ${
                  selectedSize === size
                    ? "border-orange-500 bg-orange-500 text-white shadow-lg"
                    : "border-slate-300 hover:border-orange-500 hover:bg-orange-50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Màu sắc */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-3">
          <p className="font-semibold text-slate-900">
            Màu sắc
          </p>

          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`rounded-2xl border px-5 py-3 font-medium transition-all ${
                  selectedColor === color
                    ? "border-orange-500 bg-orange-500 text-white shadow-lg"
                    : "border-slate-300 hover:border-orange-500 hover:bg-orange-50"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
            {/* Số lượng */}
      <div className="space-y-3">
        <p className="font-semibold text-slate-900">
          Số lượng
        </p>

        <div className="flex w-fit items-center overflow-hidden rounded-2xl border border-slate-300 shadow-sm">
          <button
            type="button"
            onClick={() =>
              setQuantity((value) => Math.max(1, value - 1))
            }
            className="p-4 transition hover:bg-slate-100"
          >
            <Minus size={18} />
          </button>

          <div className="w-16 text-center font-semibold">
            {quantity}
          </div>

          <button
            type="button"
            onClick={() =>
              setQuantity((value) => value + 1)
            }
            className="p-4 transition hover:bg-slate-100"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

            {/* Thông số */}
      <ProductSpecs product={product} />

      {/* Nút hành động */}
      <ProductActions
  onAddToCart={() =>
    addToCart(product, quantity)
  }
/>
    </div>
  );
}