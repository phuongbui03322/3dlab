"use client";

import { featuredProducts } from "@/data/featuredProducts";
import { Search, X } from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface SearchBarProps {
  menuOpen: boolean;
  onOpenSearch: () => void;
}

export default function SearchBar({
  menuOpen,
  onOpenSearch,
}: SearchBarProps) {
  const [keyword, setKeyword] = useState("");
  const [mounted, setMounted] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [dropdownStyle, setDropdownStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const closeSearch = () => {
    setKeyword("");
    inputRef.current?.blur();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Menu mở => đóng Search
  useEffect(() => {
    if (menuOpen) {
      closeSearch();
    }
  }, [menuOpen]);

  // Cập nhật vị trí dropdown
  useEffect(() => {
    const updatePosition = () => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();

      setDropdownStyle({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  // Click ngoài để đóng
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        wrapperRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }

      closeSearch();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ESC để đóng
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSearch();
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const results = useMemo(() => {
    const value = keyword.trim().toLowerCase();

    if (!value) return [];

    return featuredProducts
      .filter((item) =>
        item.name.toLowerCase().includes(value)
      )
      .slice(0, 6);
  }, [keyword]);

  return (
    <>
      <div ref={wrapperRef} className="w-full">
        <div className="flex h-11 items-center rounded-full border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white">
          <input
            ref={inputRef}
            type="search"
            value={keyword}
            placeholder="Tìm mô hình..."
            autoComplete="off"
            onChange={(e) => {
              onOpenSearch();
              setKeyword(e.target.value);
            }}
            className="flex-1 bg-transparent text-[16px] outline-none"
          />

          <Search
            size={18}
            className="text-slate-500"
          />
        </div>
      </div>

      {mounted &&
        !menuOpen &&
        keyword.trim() !== "" &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: dropdownStyle.top,
              left: dropdownStyle.left,
              width: dropdownStyle.width,
              zIndex: 999999,
            }}
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              {results.length > 0 ? (
                <>
                  <div className="max-h-96 overflow-y-auto">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={closeSearch}
                        className="flex items-center justify-between border-b border-slate-100 px-4 py-3 transition hover:bg-slate-50 last:border-b-0"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {product.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {product.category}
                          </p>
                        </div>

                        <span className="ml-4 shrink-0 font-semibold text-blue-600">
  Liên hệ
</span>
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 bg-slate-50 p-2">
                    <button
                      onClick={closeSearch}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <X size={18} />
                      Đóng
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="px-4 py-5 text-center text-sm text-slate-500">
                    Không tìm thấy sản phẩm
                  </div>

                  <div className="border-t border-slate-200 bg-slate-50 p-2">
                    <button
                      onClick={closeSearch}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <X size={18} />
                      Đóng
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}