import {
  Heart,
  MessageCircle,
  ShoppingCart,
  Zap,
} from "lucide-react";

export default function ProductActions() {
  return (
    <div className="space-y-3">
      <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 py-4 font-semibold text-white transition hover:bg-black">
        <ShoppingCart size={20} />
        Thêm vào giỏ
      </button>

      <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600">
        <Zap size={20} />
        Mua ngay
      </button>

      <button className="flex w-full items-center justify-center gap-3 rounded-2xl border py-4 font-semibold transition hover:bg-slate-50">
        <MessageCircle size={20} />
        Liên hệ Zalo
      </button>

      <button className="flex w-full items-center justify-center gap-3 rounded-2xl border py-4 font-semibold transition hover:bg-slate-50">
        <Heart size={20} />
        Thêm vào yêu thích
      </button>
        </div>
  );
}