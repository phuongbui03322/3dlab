"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import type { Product } from "@/types/product";
import type { CartItem } from "@/types/cart";

interface CartContextType {
  items: CartItem[];
  totalItems: number;

  isCartOpen: boolean;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addToCart: (
    product: Product,
    quantity?: number
  ) => void;

  removeFromCart: (id: number) => void;

  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;

  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ===========================
  // Load cart
  // ===========================
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const data = localStorage.getItem("cart");

      if (data) {
        const parsed = JSON.parse(data);

        // Đảm bảo dữ liệu cũ không làm lỗi giỏ hàng
        const validItems: CartItem[] = parsed
          .filter(
            (item: CartItem) =>
              item &&
              typeof item.id === "number" &&
              typeof item.quantity === "number"
          )
          .map((item: CartItem) => ({
            ...item,
            price:
              typeof item.price === "number"
                ? item.price
                : 0,
          }));

        setItems(validItems);
      }
    } catch (error) {
      console.error(
        "Không thể đọc giỏ hàng:",
        error
      );
    }
  }, []);

  // ===========================
  // Save cart
  // ===========================
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(
      "cart",
      JSON.stringify(items)
    );
  }, [items]);

  // ===========================
  // Drawer
  // ===========================
  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // ===========================
  // Add product
  // ===========================
  const addToCart = (
    product: Product,
    quantity: number = 1
  ) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
                price: product.price,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image,
          category: product.category,
          price: product.price,
          quantity,
        },
      ];
    });

    toast.success("Đã thêm vào giỏ hàng", {
      description: `${product.name} × ${quantity}`,
    });

    // Nếu muốn tự mở giỏ hàng:
    // setIsCartOpen(true);
  };

  // ===========================
  // Remove
  // ===========================
  const removeFromCart = (id: number) => {
    setItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  // ===========================
  // Increase
  // ===========================
  const increaseQuantity = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  // ===========================
  // Decrease
  // ===========================
  const decreaseQuantity = (id: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  // ===========================
  // Clear
  // ===========================
  const clearCart = () => {
    setItems([]);
  };

  // ===========================
  // Total quantity
  // ===========================
  const totalItems = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [items]);

  const value: CartContextType = {
    items,
    totalItems,

    isCartOpen,

    openCart,
    closeCart,
    toggleCart,

    addToCart,
    removeFromCart,

    increaseQuantity,
    decreaseQuantity,

    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(
    CartContext
  );

  if (!context) {
    throw new Error(
      "useCartContext must be used within CartProvider"
    );
  }

  return context;
}