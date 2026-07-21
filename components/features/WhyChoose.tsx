import {
  ShieldCheck,
  Truck,
  Printer,
  Palette,
  MessageCircleMore,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Printer,
    title: "Máy in hiện đại",
    description:
      "Sử dụng Bambu Lab cho chất lượng in sắc nét, bề mặt đẹp và độ chính xác cao.",
  },
  {
    icon: Palette,
    title: "Đa dạng màu sắc",
    description:
      "Nhiều màu PLA chất lượng cao, phù hợp cho mô hình trưng bày và sưu tầm.",
  },
  {
    icon: Sparkles,
    title: "Hoàn thiện tỉ mỉ",
    description:
      "Mỗi mô hình đều được kiểm tra và vệ sinh trước khi đóng gói.",
  },
  {
    icon: Truck,
    title: "Giao hàng toàn quốc",
    description:
      "Đóng gói chống sốc cẩn thận, đảm bảo mô hình đến tay bạn nguyên vẹn.",
  },
  {
    icon: MessageCircleMore,
    title: "Tư vấn nhanh",
    description:
      "Hỗ trợ lựa chọn kích thước, màu sắc và báo giá trong thời gian ngắn.",
  },
  {
    icon: ShieldCheck,
    title: "Uy tín & chất lượng",
    description:
      "Cam kết đúng mẫu, đúng kích thước và hỗ trợ khi có lỗi trong quá trình sản xuất.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white pt-12 pb-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            ⭐ Vì sao chọn 3D LAB
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Chất lượng tạo nên sự khác biệt
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Chúng tôi không chỉ in mô hình, mà còn mang đến những sản phẩm
            được hoàn thiện tỉ mỉ với chất lượng tốt nhất.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex flex-col items-center text-center rounded-3xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
  <Icon
    className="text-blue-600"
    size={24}
  />
</div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-center text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}