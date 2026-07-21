import {
  CheckCircle2,
  PackageCheck,
  Printer,
  ShieldCheck,
} from "lucide-react";

export default function ProductGuarantee() {
  const items = [
    {
      icon: Printer,
      title: "In bằng Bambu Lab A1",
    },
    {
      icon: CheckCircle2,
      title: "PLA+ cao cấp",
    },
    {
      icon: ShieldCheck,
      title: "Kiểm tra trước khi giao",
    },
    {
      icon: PackageCheck,
      title: "Đóng gói chống sốc",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="mb-5 text-lg font-bold">
        Cam kết từ 3D LAB
      </h3>

      <div className="space-y-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-3"
            >
              <Icon
                className="text-orange-500"
                size={20}
              />

              <span className="text-slate-700">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}