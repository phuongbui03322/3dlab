import { notFound } from "next/navigation";

import CollectionHero from "@/components/collections/CollectionHero";
import CollectionProducts from "@/components/collections/CollectionProducts";
import { featuredProducts } from "@/data/featuredProducts";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

const banners: Record<
  string,
  {
    title: string;
    description: string;
    image: string;
  }
> = {
  marvel: {
    title: "Marvel Collection",
    description:
      "Những mô hình Marvel được yêu thích nhất tại 3D LAB.",
    image: "/images/banners/marvel1.png",
  },

  anime: {
    title: "Anime Collection",
    description:
      "Naruto, One Piece và nhiều nhân vật Anime nổi tiếng.",
    image: "/images/banners/anime.png",
  },

  "dragon-ball": {
    title: "Dragon Ball Collection",
    description:
      "Son Goku, Vegeta, Broly, Frieza và nhiều nhân vật Dragon Ball.",
    image: "/images/banners/dragonball.png",
  },

  dc: {
    title: "DC Collection",
    description:
      "Batman, Joker, Superman và nhiều nhân vật DC.",
    image: "/images/banners/dc.png",
  },

  game: {
    title: "Game Collection",
    description:
      "Các mô hình từ những tựa game nổi tiếng dành cho game thủ.",
    image: "/images/banners/game.png",
  },

  cartoon: {
    title: "Cartoon Collection",
    description:
      "Những nhân vật hoạt hình được yêu thích.",
    image: "/images/banners/cartoon.png",
  },

  pokemon: {
    title: "Pokémon Collection",
    description:
      "Những mô hình Pokémon được yêu thích nhất tại 3D LAB.",
    image: "/images/banners/pokemon.png",
  },

  sonic: {
    title: "Sonic Collection",
    description:
      "Những mô hình Sonic được yêu thích nhất tại 3D LAB.",
    image: "/images/banners/sonic.png",
  },

  "moc-khoa": {
    title: "Móc Khóa 3D",
    description:
      "Bộ sưu tập móc khóa 3D độc đáo, nhỏ gọn và phù hợp làm quà tặng hoặc phụ kiện cá nhân.",
    image: "/images/banners/moc-khoa.png",
  },
  "mo-hinh-mini": {
  title: "Mô Hình Mini",
  description:
    "Những mô hình 3D mini nhỏ xinh, đáng yêu và phù hợp để trang trí bàn làm việc, taplo xe hoặc làm quà tặng.",
  image: "/images/banners/mo-hinh-mini.png",
},
};

export default async function CollectionPage({
  params,
}: Props) {
  const { category } = await params;

  const config = banners[category];

  if (!config) {
    notFound();
  }

  const products = featuredProducts.filter((item) => {
    const slug = item.category
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/\s+/g, "-");

    return slug === category;
  });

  return (
    <>
      <CollectionHero
        title={config.title}
        description={config.description}
        banner={config.image}
        total={products.length}
      />

      <CollectionProducts
        title={config.title}
        products={products}
      />
    </>
  );
}