"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "3D LAB nhận in từ những định dạng file nào?",
    answer:
      "Chúng tôi nhận in từ các file STL, 3MF, OBJ và nhiều định dạng mô hình 3D phổ biến khác.",
  },
  {
    question: "Nếu chưa có file 3D thì sao?",
    answer:
      "Bạn chỉ cần gửi hình ảnh hoặc ý tưởng. 3D LAB sẽ tư vấn và hỗ trợ thiết kế hoặc chỉnh sửa trước khi in.",
  },
  {
    question: "Có thể thay đổi kích thước mô hình không?",
    answer:
      "Có. Hầu hết các mô hình đều có thể thay đổi kích thước trước khi in để phù hợp với nhu cầu của bạn.",
  },
  {
    question: "Sử dụng loại nhựa nào?",
    answer:
      "3D LAB sử dụng PLA chất lượng cao với nhiều màu sắc, phù hợp cho mô hình trưng bày và quà tặng.",
  },
  {
    question: "Thời gian hoàn thành bao lâu?",
    answer:
      "Thông thường từ 1–5 ngày tùy vào kích thước, số lượng và độ phức tạp của mô hình.",
  },
  {
    question: "Có giao hàng toàn quốc không?",
    answer:
      "Có. Chúng tôi giao hàng toàn quốc và đóng gói chống sốc cẩn thận để bảo vệ sản phẩm.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpen((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative z-10 bg-white pt-12 pb-14">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            ❓ Câu hỏi thường gặp
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Giải đáp nhanh
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Một số câu hỏi mà khách hàng thường quan tâm trước khi đặt in hoặc
            mua mô hình.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full cursor-pointer items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-slate-50 active:bg-slate-100"
                >
                  <span className="pr-4 text-lg font-semibold text-slate-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 leading-8 text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}