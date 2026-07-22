"use client";

import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/app/hooks/useCart";

import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { totalItems, openCart } = useCart();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto max-w-7xl">
          {/* Top */}
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            {/* Menu */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-slate-100"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="select-none text-3xl font-black tracking-widest text-blue-600 transition hover:text-blue-700"
            >
              3D LAB
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-slate-100"
              aria-label="Mở giỏ hàng"
            >
              <ShoppingCart size={22} />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Search */}
          <div className="relative border-t border-slate-200 p-4">
            <SearchBar
              menuOpen={menuOpen}
              onOpenSearch={() => {
                if (menuOpen) {
                  setMenuOpen(false);
                }
              }}
            />
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <CartDrawer />
    </>
  );
}