import { notFound } from "next/navigation";

import { featuredProducts } from "@/data/featuredProducts";

import Breadcrumb from "@/components/common/Breadcrumb";
import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import ProductTabs from "@/components/products/ProductTabs";
import RelatedProducts from "@/components/products/RelatedProducts";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const product = featuredProducts.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = featuredProducts
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  return (
    <main className="bg-white pt-10 md:pt-0">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Trang chủ",
            href: "/",
          },
          {
            label: product.category,
            href: `/collections/${product.category.toLowerCase()}`,
          },
          {
            label: product.name,
          },
        ]}
      />

      {/* Product */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery product={product} />

          <ProductInfo product={product} />
        </div>
      </section>

      {/* Tabs */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-8 text-2xl font-bold text-slate-900 lg:mb-10 lg:text-3xl">
              Sản phẩm liên quan
            </h2>

            <RelatedProducts products={relatedProducts} />
          </div>
        </section>
      )}
    </main>
  );
}