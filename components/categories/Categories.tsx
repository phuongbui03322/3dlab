import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Anime",
    image: "/images/categories/anime.jpg",
    href: "/collections/anime",
  },
  {
    title: "Marvel",
    image: "/images/categories/marvel.jpg",
    href: "/collections/marvel",
  },
  {
    title: "DC",
    image: "/images/categories/dc.jpg",
    href: "/collections/dc",
  },
  {
    title: "Dragon Ball",
    image: "/images/categories/dragonball.jpg",
    href: "/collections/dragon-ball",
  },
  {
    title: "Cartoon",
    image: "/images/categories/cartoon.jpg",
    href: "/collections/cartoon",
  },
  {
    title: "Game",
    image: "/images/categories/game.jpg",
    href: "/collections/game",
  },
  {
    title: "Theo yêu cầu",
    image: "/images/categories/custom.jpg",
    href: "/custom-order",
  },
];

export default function Categories() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            DANH MỤC
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Khám phá bộ sưu tập
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">
            Từ Anime, Marvel, DC, Dragon Ball, Cartoon đến Game và mô
            hình theo yêu cầu.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-3xl bg-black shadow-xl"
            >
              <div className="relative h-[420px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-bold text-white">
                    {item.title}
                  </h3>

                  <span className="mt-4 inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition group-hover:bg-blue-600 group-hover:text-white">
                    Khám phá →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}