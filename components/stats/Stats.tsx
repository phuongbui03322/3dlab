const stats = [
  {
    value: "500+",
    title: "Mô hình đã in",
    description: "Đa dạng từ Anime, Marvel đến mô hình theo yêu cầu.",
  },
  {
    value: "20+",
    title: "Màu PLA",
    description: "Nhiều lựa chọn màu sắc phù hợp với từng mô hình.",
  },
  {
    value: "24h",
    title: "Báo giá nhanh",
    description: "Phản hồi và tư vấn trong thời gian ngắn.",
  },
  {
    value: "100%",
    title: "Kiểm tra trước khi giao",
    description: "Mỗi sản phẩm đều được kiểm tra kỹ trước khi đóng gói.",
  },
];

export default function Stats() {
  return (
    <section className="bg-slate-50 pt-12 pb-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            📊 3D LAB
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
            3D LAB qua những con số
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Chúng tôi luôn nỗ lực mang đến những sản phẩm chất lượng và trải
            nghiệm tốt nhất cho khách hàng.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:p-8"
            >
              <h3 className="text-4xl font-bold text-blue-600 md:text-5xl">
                {item.value}
              </h3>

              <h4 className="mt-3 text-lg font-semibold text-slate-900 md:text-xl">
                {item.title}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600 md:mt-3 md:text-base md:leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}