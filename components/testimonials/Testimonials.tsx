import Image from "next/image";
import { BadgeCheck, Star } from "lucide-react";

const testimonials = [
  {
    name: "Minh Anh",
    role: "Đã mua tại 3D LAB",
    avatar: "/testimonials/customer1.jpg",
    content:
      "Mô hình rất đẹp, màu sắc chuẩn và đóng gói cực kỳ cẩn thận. Shop tư vấn rất nhiệt tình, mình sẽ tiếp tục ủng hộ.",
  },
  {
    name: "Ngọc Linh",
    role: "Đã mua tại 3D LAB",
    avatar: "/testimonials/customer2.jpg",
    content:
      "Chất lượng in vượt mong đợi, bề mặt mịn, màu sắc đẹp và giao hàng nhanh. Rất hài lòng với sản phẩm.",
  },
  {
    name: "Thanh Hà",
    role: "Đã mua tại 3D LAB",
    avatar: "/testimonials/customer3.jpg",
    content:
      "Đặt in theo yêu cầu và được hỗ trợ chỉnh sửa file rất tận tình. Thành phẩm đúng như mong muốn.",
  },
  {
    name: "Quang Huy",
    role: "Đã mua tại 3D LAB",
    avatar: "/testimonials/customer4.jpg",
    content:
      "Mô hình in rất sắc nét, màu sắc đẹp và đúng như hình mẫu. Đóng gói cẩn thận, giao hàng nhanh, chắc chắn sẽ quay lại mua tiếp.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 pt-12 pb-14">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            💬 Khách hàng nói gì?
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
            Feedback từ khách hàng
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Những đánh giá thực tế từ khách hàng đã sử dụng dịch vụ và sản phẩm
            của 3D LAB.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl md:p-7"
            >
              {/* Stars */}
              <div className="mb-4 flex justify-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="min-h-[120px] text-center text-sm leading-7 text-slate-600 md:text-base">
                "{item.content}"
              </p>

              {/* Customer */}
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={52}
                  height={52}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100 transition-transform duration-300 group-hover:scale-110 md:h-14 md:w-14"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-900 md:text-base">
                      {item.name}
                    </h4>

                    <BadgeCheck
                      size={16}
                      className="text-blue-600"
                    />
                  </div>

                  <p className="mt-1 text-xs font-medium text-blue-600 md:text-sm">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 md:text-base">
            ❤️ Cảm ơn tất cả khách hàng đã tin tưởng và lựa chọn{" "}
            <span className="font-semibold text-slate-900">3D LAB</span>.
          </p>
        </div>
      </div>
    </section>
  );
}