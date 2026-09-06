import type { ProductCategory } from "./product";

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  image: string;
  category: ProductCategory;
   price: number;
  quantity: number;
}