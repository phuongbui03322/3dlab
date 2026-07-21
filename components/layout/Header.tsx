"use client";

import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";

import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <Link
              href="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-slate-100"
            >
              <ShoppingCart size={22} />

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                0
              </span>
            </Link>
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
    </>
  );
}