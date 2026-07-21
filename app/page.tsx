import Hero from "@/components/hero/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CollectionSection from "@/components/collections/CollectionSection";
import CustomPrint from "@/components/services/CustomPrint";
import WhyChoose from "@/components/features/WhyChoose";
import Stats from "@/components/stats/Stats";
import Testimonials from "@/components/testimonials/Testimonials";
import FAQ from "@/components/faq/FAQ";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Danh mục */}
      <Categories />

      {/* Sản phẩm nổi bật */}
      <FeaturedProducts />

      {/* ================== Bộ sưu tập ================== */}

      <CollectionSection
        title="Marvel Collection"
        description="Những mô hình Marvel được yêu thích và bán chạy nhất."
        category="Marvel"
        href="/collections/marvel"
        banner="/images/banners/marvel1.png"
      />

      <CollectionSection
        title="Anime Collection"
        description="Các nhân vật Anime nổi tiếng được in 3D sắc nét."
        category="Anime"
        href="/collections/anime"
        banner="/images/banners/anime.png"
      />

      <CollectionSection
        title="DC Collection"
        description="Những siêu anh hùng và phản diện nổi tiếng từ vũ trụ DC."
        category="DC"
        href="/collections/dc"
        banner="/images/banners/dc.png"
      />

      <CollectionSection
        title="Dragon Ball Collection"
        description="Bộ sưu tập Son Goku, Vegeta, Broly và nhiều nhân vật Dragon Ball."
        category="Dragon Ball"
        href="/collections/dragon-ball"
        banner="/images/banners/dragonball.png"
      />

      <CollectionSection
        title="Cartoon Collection"
        description="Những mô hình Cartoon được yêu thích và bán chạy nhất."
        category="Cartoon"
        href="/collections/cartoon"
        banner="/images/banners/cartoon.png"
      />

      <CollectionSection
        title="Game Collection"
        description="Mô hình từ các tựa game nổi tiếng dành cho game thủ."
        category="Game"
        href="/collections/game"
        banner="/images/banners/game.png"
      />

      {/* =============================================== */}

      {/* In theo yêu cầu */}
      <CustomPrint />

      {/* Vì sao chọn 3D LAB */}
      <WhyChoose />

      {/* Thống kê */}
      <Stats />

      {/* Đánh giá khách hàng */}
      <Testimonials />

      {/* Câu hỏi thường gặp */}
      <FAQ />
    </>
  );
}