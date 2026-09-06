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

  // Tổng tiền
  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [items]);

  // Tổng số lượng
  const totalQuantity = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [items]);

  const message = useMemo(() => {
    if (items.length === 0) return "";

    let text = "Xin chào 3D LAB.\n\n";
    text += "Tôi muốn báo giá các mẫu sau:\n\n";

    items.forEach((item, index) => {
      text += `${index + 1}. ${item.name}\n`;
      text += `Giá: ${item.price.toLocaleString("vi-VN")}đ\n`;
      text += `Số lượng: ${item.quantity}\n`;
      text += `Thành tiền: ${(item.price * item.quantity).toLocaleString(
        "vi-VN"
      )}đ\n\n`;
    });

    text += `Tạm tính: ${subtotal.toLocaleString("vi-VN")}đ\n\n`;

    if (note.trim()) {
      text += `Ghi chú:\n${note}\n`;
    }

    return encodeURIComponent(text);
  }, [items, note, subtotal]);

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
              {items.map((item) => {
                const itemTotal =
                  item.price * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border p-4"
                  >
                    <div className="flex gap-4">
                      {/* Ảnh */}
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Nội dung */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <h3 className="font-bold leading-6">
                          {item.name}
                        </h3>

                        <p className="text-sm text-blue-600">
                          {item.category}
                        </p>

                        {/* Giá */}
                        <p className="mt-1 text-base font-bold text-orange-600">
                          {item.price.toLocaleString("vi-VN")}đ
                        </p>

                        {/* Thành tiền */}
                        {item.quantity > 1 && (
                          <p className="mt-1 text-sm text-slate-500">
                            Thành tiền:{" "}
                            <span className="font-semibold text-slate-700">
                              {itemTotal.toLocaleString("vi-VN")}đ
                            </span>
                          </p>
                        )}

                        {/* Số lượng + xóa */}
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
                );
              })}
            </div>

            {/* Footer */}
            <div className="space-y-4 border-t px-5 pt-5 pb-25">

              {/* Tổng số lượng + tạm tính */}
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    Tổng số lượng
                  </span>

                  <span className="font-semibold">
                    {totalQuantity}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">
                    Tạm tính
                  </span>

                  <span className="text-xl font-extrabold text-orange-600">
                    {subtotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>

              {/* Ghi chú */}
              <textarea
                rows={4}
                placeholder="Ghi chú..."
                value={note}
                onChange={(e) =>
                  setNote(e.target.value)
                }
                className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
              />

              {/* Xóa tất cả */}
              <button
                onClick={clearCart}
                className="w-full rounded-xl border border-red-200 py-3 font-semibold text-red-600 transition hover:bg-red-50"
              >
                Xóa tất cả
              </button>

              {/* Gửi đơn */}
              <button
                onClick={() => setOpenOrder(true)}
                className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                📩 Gửi đơn
              </button>

              {/* Liên hệ Shop */}
              <a
                href="https://m.me/1151757441360383"
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

      {/* Order Dialog */}
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