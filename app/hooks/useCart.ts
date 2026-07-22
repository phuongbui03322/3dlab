"use client";

import { useCartContext } from "@/app/context/CartContext";

export function useCart() {
  return useCartContext();
}