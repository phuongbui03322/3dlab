"use client";

import { useMemo, useState } from "react";
import OrderDialog from "@/components/order/OrderDialog";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
} from "lucide-react";

import { useCart } from "@/app/hooks/useCart";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [note, setNote] = useState("");
  const [openOrder, setOpenOrder] = useState(false);

  const message = useMemo(() => {
    if (items.length === 0) return "";

    let text = "Xin chào 3D LAB.\n\n";
    text += "Tôi muốn báo giá các mẫu sau:\n\n";

    items.forEach((item, index) => {
      text += `${index + 1}. ${item.name}\n`;
      text += `Số lượng: ${item.quantity}\n\n`;
    });

    if (note.trim()) {
      text += `Ghi chú:\n${note}\n`;
    }

    return encodeURIComponent(text);
  }, [items, note]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[190] bg-black/40 transition-opacity duration-300 ${
          isCartOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[200] flex h-screen w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isCartOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold">
            🛒 Giỏ hàng ({items.length})
          </h2>

          <button
            onClick={closeCart}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X />
          </button>
        </div>

        {/* Empty */}
        {items.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="text-7xl">🛒</div>

            <h3 className="mt-6 text-xl font-bold">
              Giỏ hàng đang trống
            </h3>

            <p className="mt-2 text-slate-500">
              Hãy thêm vài mô hình bạn yêu thích.
            </p>
          </div>
        )}

        {/* List */}
        {items.length > 0 && (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border p-4"
                >
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-slate-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <h3 className="font-bold">
                        {item.name}
                      </h3>

                      <p className="text-sm text-blue-600">
                        {item.category}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="rounded-lg border p-2 hover:bg-slate-100"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="w-8 text-center font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="rounded-lg border p-2 hover:bg-slate-100"
                        >
                          <Plus size={16} />
                        </button>

                        <button
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="ml-auto rounded-lg p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="space-y-4 border-t px-5 pt-5 pb-25">
              <textarea
                rows={4}
                placeholder="Ghi chú..."
                value={note}
                onChange={(e) =>
                  setNote(e.target.value)
                }
                className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
              />

              <button
  onClick={clearCart}
  className="w-full rounded-xl border border-red-200 py-3 font-semibold text-red-600 transition hover:bg-red-50"
>
  Xóa tất cả
</button>

<button
  onClick={() => setOpenOrder(true)}
  className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
>
  📩 Gửi đơn
</button>

<a
  href={`https://m.me/1151757441360383`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
>
  <MessageCircle size={20} />
  Liên hệ Shop
</a>
            </div>
          </>
        )}
      </aside>
      <OrderDialog
  open={openOrder}
  onClose={() => setOpenOrder(false)}
  items={items}
  note={note}
  onSuccess={() => {
    clearCart();
  }}
/>
    </>
  );
}