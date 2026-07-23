import {
  Heart,
  MessageCircle,
  ShoppingCart,
  Zap,
} from "lucide-react";

interface ProductActionsProps {
  onAddToCart: () => void;
}

export default function ProductActions({
  onAddToCart,
}: ProductActionsProps) {
  return (
    <div className="space-y-3">
      <button
        onClick={onAddToCart}
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 py-4 font-semibold text-white transition hover:bg-black"
      >
        <ShoppingCart size={20} />
        Thêm vào giỏ
      </button>
    </div>
  );
}