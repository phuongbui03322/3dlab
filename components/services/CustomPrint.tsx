import Link from "next/link";
import {
  ArrowRight,
  FileUp,
 MessageCircle,
  Printer,
  PackageCheck,
} from "lucide-react";

const steps = [
  {
    icon: FileUp,
    title: "Gửi file STL hoặc hình ảnh tham khảo",
  },
  {
    icon: MessageCircle,
    title: "3D LAB tư vấn và báo giá",
  },
  {
    icon: Printer,
    title: "Tiến hành in & hoàn thiện",
  },
  {
    icon: PackageCheck,
    title: "Kiểm tra & giao tận nơi",
  },
];

export default function CustomPrint() {
  return (
    <section className="relative overflow-hidden pt-12 pb-14">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-slate-50 to-white" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-14">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              🖨️ Dịch vụ in 3D theo yêu cầu
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Biến ý tưởng thành mô hình thực tế
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Chỉ cần gửi file STL, 3MF hoặc hình ảnh tham khảo.
              Chúng tôi sẽ tư vấn, chỉnh sửa nếu cần và in mô hình với
              chất lượng cao theo đúng yêu cầu của bạn.
            </p>
          </div>

          {/* Quy trình */}
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg md:p-6"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                    <Icon size={28} strokeWidth={2.2} />
                  </div>

                  <p className="font-semibold leading-7 text-slate-800">
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mx-auto mt-16 flex w-full max-w-xl gap-4">
            <Link
              href="/custom-print"
              className="flex h-14 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
            >
              Đặt in ngay
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/contact"
              className="flex h-14 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-slate-300 px-6 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}