import {
  Box,
  Clock3,
  Printer,
  Ruler,
  Scale,
} from "lucide-react";

import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductSpecs({
  product,
}: Props) {
  const specs = [
    {
      icon: Ruler,
      label: "Chiều cao",
      value: product.height,
    },
    {
      icon: Box,
      label: "Chất liệu",
      value: product.material,
    },
    {
      icon: Scale,
      label: "Khối lượng",
      value: product.weight,
    },
    {
      icon: Printer,
      label: "Máy in",
      value: product.printer,
    },
    {
      icon: Clock3,
      label: "Thời gian in",
      value: product.printTime,
    },
  ].filter((item) => item.value);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {specs.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <Icon
                className="text-orange-500"
                size={20}
              />

              <span className="text-sm text-slate-500">
                {item.label}
              </span>
            </div>

            <p className="font-semibold">
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}