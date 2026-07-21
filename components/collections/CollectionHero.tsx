import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  banner: string;
  total: number;
}

export default function CollectionHero({
  title,
  description,
  banner,
  total,
}: Props) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={banner}
        alt={title}
        width={1800}
        height={700}
        className="h-[320px] w-full object-cover md:h-[420px]"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-2xl text-white">

            <nav className="mb-5 text-sm text-gray-300">
              <Link
                href="/"
                className="hover:text-white"
              >
                Trang chủ
              </Link>

              <span className="mx-2">/</span>

              <span>{title}</span>
            </nav>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
              3D LAB
            </p>

            <h1 className="text-4xl font-bold md:text-6xl">
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-gray-200">
              {description}
            </p>

            <div className="mt-8 inline-flex rounded-full bg-white/15 px-5 py-2 text-sm backdrop-blur">
              {total} sản phẩm
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}