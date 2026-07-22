"use client";

import { useState } from "react";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

interface OrderDialogProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  note: string;
  onSuccess: () => void;
}

export default function OrderDialog({
  open,
  onClose,
  items,
  note,
  onSuccess,
}: OrderDialogProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Vui lòng nhập họ tên");
      return;
    }

    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;

    if (!phoneRegex.test(phone.trim())) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          note,
          items,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Có lỗi xảy ra");
      }

      toast.success("Đã gửi yêu cầu thành công!", {
        description: "3D LAB sẽ liên hệ với bạn trong thời gian sớm nhất.",
      });

      setName("");
      setPhone("");

      onSuccess();

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (error) {
      toast.error("Không thể gửi đơn.", {
        description:
          error instanceof Error
            ? error.message
            : "Vui lòng thử lại sau.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] overflow-y-auto bg-black/50 p-4">
      <div className="flex min-h-full items-start justify-center py-8 sm:items-center">
        <div className="w-full max-w-md max-h-[90svh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
          <h2 className="text-2xl font-bold">
            Gửi yêu cầu
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Vui lòng để lại thông tin để 3D LAB liên hệ báo giá.
          </p>

          <div className="mt-6 space-y-4">
            <input
              type="text"
              autoComplete="name"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border p-3 outline-none transition focus:border-blue-600"
            />

            <input
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border p-3 outline-none transition focus:border-blue-600"
            />

            <div className="rounded-xl border p-4">
              <p className="mb-3 font-semibold">
                Sản phẩm đã chọn
              </p>

              <div className="space-y-2 text-sm">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4"
                  >
                    <span>{item.name}</span>

                    <span className="whitespace-nowrap">
                      x{item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 rounded-xl border py-3 font-semibold transition hover:bg-slate-100 disabled:opacity-60"
              >
                Huỷ
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Đang gửi...
                  </div>
                ) : (
                  "📩 Gửi đơn"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}