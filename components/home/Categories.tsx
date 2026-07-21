"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/layout/Container";

const categories = [
  {
    title: "Anime",
    image: "/images/categories/anime.png",
    href: "/collections/anime",
  },
  {
    title: "Marvel",
    image: "/images/categories/marvel.png",
    href: "/collections/marvel",
  },
  {
    title: "DC",
    image: "/images/categories/dc.png",
    href: "/collections/dc",
  },
  {
    title: "Dragon Ball",
    image: "/images/categories/dragonball.png",
    href: "/collections/dragon-ball",
  },
  {
    title: "Cartoon",
    image: "/images/categories/cartoon.png",
    href: "/collections/cartoon",
  },
  {
    title: "Game",
    image: "/images/categories/game.png",
    href: "/collections/game",
  },
];

export default function Categories() {
  const pathname = usePathname();

  return (
    <section id="collections" className="bg-white py-12">
      <Container>
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Danh mục
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Khám Phá Bộ Sưu Tập
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Chọn danh mục để xem các mô hình yêu thích.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group relative h-36 overflow-hidden rounded-3xl transition-all duration-300 active:scale-95 ${
                  isActive
                    ? "ring-4 ring-blue-500"
                    : "hover:scale-[1.02]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover brightness-110 contrast-110 saturate-110 transition-all duration-500 group-hover:scale-110 group-hover:brightness-125"
                />

                <div className="absolute inset-0 bg-black/10" />

                {isActive && (
                  <div className="absolute right-3 top-3 rounded-full bg-blue-600 px-2 py-1 text-[11px] font-semibold text-white">
                    Đang xem
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 py-4">
                  <p className="text-center text-base font-semibold text-white">
                    {item.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}