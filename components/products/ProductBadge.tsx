interface ProductBadgeProps {
  badge?: "Best Seller" | "New" | "Hot" | "Sale";
}

const badgeStyles = {
  "Best Seller": "bg-amber-500 text-white",
  New: "bg-emerald-500 text-white",
  Hot: "bg-red-500 text-white",
  Sale: "bg-sky-600 text-white",
};

export default function ProductBadge({ badge }: ProductBadgeProps) {
  if (!badge) return null;

  return (
    <span
      className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow ${badgeStyles[badge]}`}
    >
      {badge}
    </span>
  );
}