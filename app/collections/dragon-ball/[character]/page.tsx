import { notFound } from "next/navigation";

import CollectionHero from "@/components/collections/CollectionHero";
import CollectionProducts from "@/components/collections/CollectionProducts";
import { featuredProducts } from "@/data/featuredProducts";

interface Props {
  params: Promise<{
    character: string;
  }>;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/\s+/g, "-");
}

export default async function DragonBallCharacterPage({
  params,
}: Props) {
  const { character } = await params;

  const products = featuredProducts.filter((product) => {
    const categories = Array.isArray(product.category)
      ? product.category
      : [product.category];

    if (!categories.includes("Dragon Ball")) {
      return false;
    }

    return (
      product.character &&
      slugify(product.character) === character
    );
  });

  if (products.length === 0) {
    notFound();
  }

  const characterName = products[0].character!;

  return (
    <>
      <CollectionHero
        title={`${characterName} - Dragon Ball`}
        description={`Các mô hình ${characterName} thuộc bộ sưu tập Dragon Ball tại 3D LAB.`}
        banner="/images/banners/dragonball.png"
        total={products.length}
      />

      <CollectionProducts
        title={`${characterName} - Dragon Ball`}
        products={products}
      />
    </>
  );
}