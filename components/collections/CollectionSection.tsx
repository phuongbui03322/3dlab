import Image from "next/image";
import Link from "next/link";

import ProductCard from "@/components/products/ProductCard";
import { featuredProducts } from "@/data/featuredProducts";

interface CollectionSectionProps {
  title: string;
  description: string;
  category: string;
  href: string;
  banner: string;
}

export default function CollectionSection({
  title,
  description,
  category,
  href,
  banner,
}: CollectionSectionProps) {
  const products = featuredProducts
    .filter((product) => product.category === category)
    .slice(0, 2);

  if (products.length === 0) return null;

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4">
        {/* Banner */}
        <div className="relative mb-10 overflow-hidden rounded-3xl">
          <Image
            src={banner}
            alt={title}
            width={1600}
            height={600}
            className="h-56 w-full object-cover transition duration-700 hover:scale-105 md:h-72 lg:h-80"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl px-6 md:px-12">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
                3D LAB
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
                {title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-200 md:text-lg">
                {description}
              </p>

              <Link
                href={href}
                className="mt-8 inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Khám phá bộ sưu tập →
              </Link>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href={href}
            className="inline-flex rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Xem tất cả →
          </Link>
        </div>
      </div>
    </section>
  );
}