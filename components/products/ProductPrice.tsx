import { formatPrice } from "@/lib/format";

interface ProductPriceProps {
  price: number;
  oldPrice?: number;
  variant?: "card" | "detail";
}

export default function ProductPrice({
  price,
  oldPrice,
  variant = "card",
}: ProductPriceProps) {
  const discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : null;

  const priceClass =
    variant === "detail"
      ? "text-4xl font-extrabold text-red-600"
      : "text-2xl font-bold text-red-600";

  const oldPriceClass =
    variant === "detail"
      ? "text-lg text-slate-400 line-through"
      : "text-sm text-slate-400 line-through";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {oldPrice && oldPrice > price && (
        <span className={oldPriceClass}>
          {formatPrice(oldPrice)}
        </span>
      )}

      <span className={priceClass}>
        {formatPrice(price)}
      </span>

      {variant === "detail" && discount && (
        <span className="inline-flex items-center rounded-md bg-red-600 px-2.5 py-1 text-sm font-bold text-white shadow-sm">
          -{discount}%
        </span>
      )}
    </div>
  );
}