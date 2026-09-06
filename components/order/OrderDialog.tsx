"use client";

import { useState } from "react";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
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
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // Tổng tiền các sản phẩm đã có giá
  const totalPrice = items.reduce((total, item) => {
    if (item.price > 0) {
      return total + item.price * item.quantity;
    }

    return total;
  }, 0);

  // Có sản phẩm chưa có giá hay không
  const hasContactPrice = items.some(
    (item) => item.price <= 0
  );

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

    if (!address.trim()) {
      toast.error("Vui lòng nhập địa chỉ nhận hàng");
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
          address,
          note,
          items,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Có lỗi xảy ra"
        );
      }

      toast.success(
        "Đã gửi yêu cầu thành công!",
        {
          description:
            "3D LAB sẽ liên hệ với bạn trong thời gian sớm nhất.",
        }
      );

      setName("");
      setPhone("");
      setAddress("");

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
        <div className="max-h-[90svh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">

          {/* Tiêu đề */}
          <h2 className="text-2xl font-bold">
            Gửi yêu cầu
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Vui lòng để lại thông tin để 3D LAB liên hệ báo giá.
          </p>

          <div className="mt-6 space-y-4">

            {/* Họ tên */}
            <input
              type="text"
              autoComplete="name"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-xl border p-3 outline-none transition focus:border-blue-600"
            />

            {/* Số điện thoại */}
            <input
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full rounded-xl border p-3 outline-none transition focus:border-blue-600"
            />

            {/* Địa chỉ */}
            <textarea
              autoComplete="street-address"
              placeholder="Địa chỉ nhận hàng"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              rows={3}
              className="w-full resize-none rounded-xl border p-3 outline-none transition focus:border-blue-600"
            />

            {/* Sản phẩm */}
            <div className="rounded-xl border p-4">
              <p className="mb-3 font-semibold">
                Sản phẩm đã chọn
              </p>

              <div className="space-y-4 text-sm">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4"
                  >
                    {/* Thông tin sản phẩm */}
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2">
                        {item.name}
                      </p>

                      {item.price > 0 ? (
                        <p className="mt-1 font-semibold text-orange-600">
                          {item.price.toLocaleString("vi-VN")}đ
                          {" × "}
                          {item.quantity}
                        </p>
                      ) : (
                        <p className="mt-1 font-semibold text-orange-600">
                          Liên hệ báo giá
                          {" × "}
                          {item.quantity}
                        </p>
                      )}
                    </div>

                    {/* Thành tiền */}
                    {item.price > 0 ? (
                      <span className="shrink-0 text-right font-bold text-slate-900">
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString("vi-VN")}
                        đ
                      </span>
                    ) : (
                      <span className="shrink-0 text-right font-semibold text-slate-500">
                        —
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Tổng tiền */}
              <div className="mt-4 border-t pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-slate-700">
                    Tổng tiền
                  </span>

                  {hasContactPrice ? (
                    <span className="text-right text-lg font-extrabold text-orange-600">
                      Liên hệ báo giá
                    </span>
                  ) : (
                    <span className="text-right text-xl font-extrabold text-orange-600">
                      {totalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Nút */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 rounded-xl border py-3 font-semibold transition hover:bg-slate-100 disabled:opacity-60"
              >
                Huỷ
              </button>

              <button
                type="button"
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