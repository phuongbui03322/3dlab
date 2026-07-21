"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";

export default function Hero() {
  const scrollToFeatured = () => {
    document.getElementById("featured-products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative z-0 min-h-[72svh] w-full overflow-hidden lg:min-h-screen">
      {/* Background Desktop */}
      <Image
        src="/images/hero/bn2.jpg"
        alt="Hero Background Desktop"
        fill
        priority
        className="-z-10 hidden object-cover md:block"
      />

      {/* Background Mobile */}
      <Image
        src="/images/hero/bn dt.png"
        alt="Hero Background Mobile"
        fill
        priority
        className="-z-10 object-cover md:hidden"
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/45" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center">
        <Container>
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/hero/lg.png"
              alt="3D LAB"
              width={420}
              height={420}
              priority
              className="mb-8 w-72 drop-shadow-2xl sm:w-80 md:w-[420px] lg:w-[520px]"
            />

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[3rem] lg:whitespace-nowrap">
              Biến Ý Tưởng Thành{" "}
              <span className="text-blue-400">Mô Hình 3D</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
              Chất lượng cao • Chi tiết sắc nét • Hoàn thiện tỉ mỉ
            </p>

            {/* Buttons */}
            <div className="mt-10 flex w-full max-w-md gap-4">
              <a
                href="https://m.me/1151757441360383"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 flex-1 items-center justify-center rounded-full bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-700"
              >
                Liên hệ
              </a>

              <button
                type="button"
                onClick={scrollToFeatured}
                className="flex h-12 flex-1 items-center justify-center rounded-full border border-white bg-white text-base font-semibold text-black transition hover:bg-gray-100"
              >
                Bộ sưu tập
              </button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}