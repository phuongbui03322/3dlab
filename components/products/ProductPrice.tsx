import { formatPrice } from "@/lib/format";

interface ProductPriceProps {
  price: number;
  oldPrice?: number;
}

export default function ProductPrice({
  price,
  oldPrice,
}: ProductPriceProps) {
  return (
    <div className="space-y-1">
      {oldPrice && (
        <p className="text-sm text-gray-400 line-through">
          {formatPrice(oldPrice)}
        </p>
      )}

      <p className="text-2xl font-bold text-red-600">
        {formatPrice(price)}
      </p>
    </div>
  );
}