"use client";

import { useState } from "react";
import type { Product } from "@/types/product";

interface ProductTabsProps {
  product: Product;
}

type Tab = "description" | "specifications" | "features";

export default function ProductTabs({
  product,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] =
    useState<Tab>("description");

  return (
    <div>
      {/* Tabs */}
      <div className="mb-10 flex flex-wrap gap-3 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("description")}
          className={`border-b-2 px-5 py-4 text-sm font-semibold transition ${
            activeTab === "description"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Mô tả
        </button>

        <button
          onClick={() => setActiveTab("specifications")}
          className={`border-b-2 px-5 py-4 text-sm font-semibold transition ${
            activeTab === "specifications"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Thông số
        </button>

        <button
          onClick={() => setActiveTab("features")}
          className={`border-b-2 px-5 py-4 text-sm font-semibold transition ${
            activeTab === "features"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Đặc điểm
        </button>
      </div>

      {/* Description */}
      {activeTab === "description" && (
        <div className="space-y-5 leading-8 text-slate-600">
          <p>
            {product.description ??
              "Mô hình được in bằng công nghệ in 3D chất lượng cao, cho độ sắc nét và độ bền vượt trội. Phù hợp để trưng bày, sưu tầm hoặc làm quà tặng."}
          </p>

          <p>
            Tất cả sản phẩm tại <strong>3D LAB</strong> đều
            được kiểm tra trước khi giao hàng nhằm đảm bảo
            chất lượng tốt nhất.
          </p>

          {product.painted && (
            <p>
              ✔ Đã sơn hoàn thiện thủ công với độ chi tiết cao.
            </p>
          )}
        </div>
      )}

      {/* Specifications */}
      {activeTab === "specifications" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <tbody>
              <Row title="Danh mục" value={product.category} />

              <Row
                title="Chất liệu"
                value={product.material ?? "PLA+"}
              />

              <Row
                title="Chiều cao"
                value={product.height ?? "--"}
              />

              <Row
                title="Chiều rộng"
                value={product.width ?? "--"}
              />

              <Row
                title="Chiều sâu"
                value={product.depth ?? "--"}
              />

              <Row
                title="Khối lượng"
                value={product.weight ?? "--"}
              />

              <Row
                title="Máy in"
                value={product.printer ?? "--"}
              />

              <Row
                title="Đầu phun"
                value={product.nozzle ?? "--"}
              />

              <Row
                title="Layer Height"
                value={product.layerHeight ?? "--"}
              />

              <Row
                title="Thời gian in"
                value={product.printTime ?? "--"}
              />
            </tbody>
          </table>
        </div>
      )}

      {/* Features */}
      {activeTab === "features" && (
        <div className="space-y-4">
          {product.features?.length ? (
            product.features.map((feature) => (
              <div
                key={feature}
                className="flex gap-3 rounded-xl bg-slate-50 p-4"
              >
                <span className="text-blue-600">✔</span>

                <span>{feature}</span>
              </div>
            ))
          ) : (
            <div className="rounded-xl bg-slate-50 p-6 text-slate-600">
              <ul className="space-y-3">
                <li>✔ In bằng công nghệ FDM chất lượng cao.</li>
                <li>✔ Chi tiết sắc nét.</li>
                <li>✔ Màu sắc đẹp.</li>
                <li>✔ Đóng gói chống sốc.</li>
                <li>✔ Hỗ trợ in theo yêu cầu.</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface RowProps {
  title: string;
  value: string;
}

function Row({
  title,
  value,
}: RowProps) {
  return (
    <tr className="border-b border-slate-200 last:border-none">
      <td className="w-56 bg-slate-50 px-6 py-4 font-semibold">
        {title}
      </td>

      <td className="px-6 py-4">
        {value}
      </td>
    </tr>
  );
}