export type ProductCategory =
  | "Anime"
  | "Marvel"
  | "Dragon Ball"
  | "DC"
  | "Game"
  | "Cartoon";

export type ProductBadge =
  | "Best Seller"
  | "New"
  | "Hot"
  | "Sale";

export interface Product {
  // ========================
  // Thông tin cơ bản
  // ========================
  id: number;

  slug: string;

  name: string;

  category: ProductCategory;

  description?: string;

  shortDescription?: string;

  // ========================
  // Hình ảnh
  // ========================
  image: string;

  gallery?: string[];
  video?: string;
  videoThumbnail?: string;

  // ========================
  // Giá
  // ========================
  price: number;

  oldPrice?: number;

  badge?: ProductBadge;

  featured?: boolean;

  // ========================
  // Đánh giá
  // ========================
  rating?: number;

  reviews?: number;

  // ========================
  // Kích thước & Thông số
  // ========================
  height?: string;

  width?: string;

  depth?: string;

  weight?: string;

  material?: string;

  color?: string;

  printer?: string;

  nozzle?: string;

  layerHeight?: string;

  printTime?: string;

  // ========================
  // Tuỳ chọn
  // ========================
  sizes?: string[];

  colors?: string[];

  painted?: boolean;

  // ========================
  // Kho hàng
  // ========================
  stock?: number;

  sold?: number;

  // ========================
  // Ưu điểm sản phẩm
  // ========================
  features?: string[];

  // ========================
  // SEO
  // ========================
  seoTitle?: string;

  seoDescription?: string;
}