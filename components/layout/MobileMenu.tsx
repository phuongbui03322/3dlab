"use client";

import Link from "next/link";
import { useCartContext } from "@/app/context/CartContext";
import { featuredProducts } from "@/data/featuredProducts";

import {
  X,
  Home,
  ShoppingCart,
  Phone,
  Info,
  ChevronRight,
  ChevronDown,
  Grid3X3,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const HEADER_HEIGHT = 128;

export default function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  const { openCart } = useCartContext();

  const [aboutOpen, setAboutOpen] = useState(false);
const [animeOpen, setAnimeOpen] = useState(false);
const [dragonBallOpen, setDragonBallOpen] = useState(false);

  /* ================================
     ĐẾM SẢN PHẨM THEO DANH MỤC
  ================================= */

  const categoryCount = useMemo(() => {
    return featuredProducts.reduce<Record<string, number>>(
      (acc, product) => {
        const categories = Array.isArray(product.category)
          ? product.category
          : [product.category];

        categories.forEach((category) => {
          acc[category] = (acc[category] || 0) + 1;
        });

        return acc;
      },
      {}
    );
  }, []);

  const animeTotal =
  (categoryCount["Dragon Ball"] ?? 0) +
  (categoryCount["One Piece"] ?? 0);
  const characterCount = useMemo(() => {
  return featuredProducts.reduce<Record<string, number>>(
    (acc, product) => {
      if (product.character) {
        acc[product.character] =
          (acc[product.character] || 0) + 1;
      }

      return acc;
    },
    {}
  );
}, []);

  /* ================================
     KHÓA SCROLL KHI MENU MỞ
  ================================= */

  useEffect(() => {
    document.body.style.overflow =
      open || aboutOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, aboutOpen]);

  return (
    <>
      {/* =================================
          BACKDROP
      ================================== */}

      <div
        onClick={onClose}
        className={`fixed inset-x-0 bottom-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
        style={{
          top: HEADER_HEIGHT,
        }}
      />

      {/* =================================
          DRAWER
      ================================== */}

      <aside
        className={`fixed left-0 z-50 flex flex-col overflow-hidden rounded-tr-3xl bg-zinc-50 shadow-2xl transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
        style={{
          top: HEADER_HEIGHT,
          width: "82vw",
          maxWidth: "320px",
          height: `calc(100dvh - ${HEADER_HEIGHT}px)`,
        }}
      >

        {/* =================================
            HEADER
        ================================== */}

        <div className="flex items-center justify-between border-b bg-white px-5 py-4">
          <div>
            <h2 className="text-xl font-black text-blue-600">
              3D LAB
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Biến ý tưởng thành mô hình 3D
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================
            INFO
        ================================== */}

        <div className="space-y-1 border-b bg-white px-5 py-4 text-xs">
          <div>⭐ 500+ mẫu mô hình</div>
          <div>🚚 Ship toàn quốc</div>
          <div>🖨️ In theo yêu cầu</div>
        </div>

        {/* =================================
            MENU
        ================================== */}

        <div className="flex-1 overflow-y-auto">
          <nav className="px-3 py-2">

            {/* Trang chủ */}
            <MenuItem
              icon={<Home size={18} />}
              title="Trang chủ"
              href="/"
              onClose={onClose}
            />

            <div className="my-2 border-t" />

            {/* =================================
                TẤT CẢ SẢN PHẨM
            ================================== */}

            <Link
              href="/collections/all"
              onClick={onClose}
              className="
                mb-2
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                bg-blue-50
                px-3
                py-3
                text-[15px]
                font-semibold
                text-blue-700
                ring-1
                ring-blue-100
                transition-all
                duration-200
                hover:bg-blue-100
              "
            >
              <div className="flex items-center gap-3">

                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Grid3X3 size={16} />
                </span>

                <span>
                  Tất cả sản phẩm
                </span>

                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                  {featuredProducts.length}
                </span>

              </div>

              <ChevronRight
                size={17}
                className="text-blue-600"
              />
            </Link>

            {/* =================================
                SONIC
            ================================== */}


            {/* =================================
    ANIME - DANH MỤC CHA
================================= */}

<button
  type="button"
  onClick={() =>
    setAnimeOpen((prev) => !prev)
  }
  className="
    flex
    w-full
    items-center
    justify-between
    rounded-xl
    px-3
    py-2.5
    text-[15px]
    font-medium
    text-slate-700
    transition-all
    duration-200
    hover:bg-blue-50
    hover:text-blue-600
  "
>
  <div className="flex min-w-0 flex-1 items-center gap-2">
    <span className="shrink-0 font-bold">
      Anime
    </span>

    <span
      className="shrink-0 whitespace-nowrap text-[10px] font-black text-red-500"
      style={{
        animation: "animeGlow 1.5s ease-in-out infinite",
      }}
    >
      🔥 ĐANG HOT
    </span>

    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
      {animeTotal}
    </span>
  </div>

  {animeOpen ? (
    <ChevronDown
      size={16}
      className="ml-2 shrink-0 text-blue-600"
    />
  ) : (
    <ChevronRight
      size={16}
      className="ml-2 shrink-0 text-slate-400"
    />
  )}
</button>
{/* =================================
    ANIME SUBMENU
================================= */}

{animeOpen && (
  <div className="mb-1 ml-4 border-l border-slate-200 pl-2">

    {/* =================================
        DRAGON BALL - DANH MỤC CHA
    ================================== */}

    <button
      type="button"
      onClick={() =>
        setDragonBallOpen((prev) => !prev)
      }
      className="
        flex
        w-full
        items-center
        justify-between
        rounded-xl
        px-3
        py-2
        text-[15px]
        font-medium
        text-slate-700
        transition-all
        duration-200
        hover:bg-blue-50
        hover:text-blue-600
      "
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate">
          Dragon Ball
        </span>

        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
          {categoryCount["Dragon Ball"] ?? 0}
        </span>
      </div>

      {dragonBallOpen ? (
        <ChevronDown
          size={16}
          className="text-blue-600"
        />
      ) : (
        <ChevronRight
          size={16}
          className="text-slate-400"
        />
      )}
    </button>

    {/* =================================
        DRAGON BALL SUBMENU
    ================================== */}

    {dragonBallOpen && (
      <div className="ml-4 border-l border-slate-200 pl-2">

        {/* Tất cả Dragon Ball */}
        <CategoryItem
          title="Tất cả sản phẩm"
          href="/collections/dragon-ball"
          count={
            categoryCount["Dragon Ball"] ?? 0
          }
          onClose={onClose}
          subItem
        />

        {/* Goku */}
        <CategoryItem
          title="Goku"
          href="/collections/dragon-ball/goku"
          count={characterCount["Goku"] ?? 0}
          onClose={onClose}
          subItem
        />

        {/* Vegeta */}
        <CategoryItem
          title="Vegeta"
          href="/collections/dragon-ball/vegeta"
          count={characterCount["Vegeta"] ?? 0}
          onClose={onClose}
          subItem
        />

        {/* Broly */}
        <CategoryItem
          title="Broly"
          href="/collections/dragon-ball/broly"
          count={characterCount["Broly"] ?? 0}
          onClose={onClose}
          subItem
        />

        {/* Frieza */}
        <CategoryItem
          title="Frieza"
          href="/collections/dragon-ball/frieza"
          count={characterCount["Frieza"] ?? 0}
          onClose={onClose}
          subItem
        />

        {/* Beerus */}
        <CategoryItem
          title="Beerus"
          href="/collections/dragon-ball/beerus"
          count={characterCount["Beerus"] ?? 0}
          onClose={onClose}
          subItem
        />

        {/* Piccolo */}
        <CategoryItem
          title="Piccolo"
          href="/collections/dragon-ball/piccolo"
          count={characterCount["Piccolo"] ?? 0}
          onClose={onClose}
          subItem
        />

        {/* Trunks */}
        <CategoryItem
          title="Trunks"
          href="/collections/dragon-ball/trunks"
          count={characterCount["Trunks"] ?? 0}
          onClose={onClose}
          subItem
        />

        {/* Vegito */}
        <CategoryItem
          title="Vegito"
          href="/collections/dragon-ball/vegito"
          count={characterCount["Vegito"] ?? 0}
          onClose={onClose}
          subItem
        />

        {/* Super Buu */}
        <CategoryItem
          title="Super Buu"
          href="/collections/dragon-ball/super-buu"
          count={characterCount["Super Buu"] ?? 0}
          onClose={onClose}
          subItem
        />

        {/* Perfect Cell */}
        <CategoryItem
          title="Perfect Cell"
          href="/collections/dragon-ball/perfect-cell"
          count={characterCount["Perfect Cell"] ?? 0}
          onClose={onClose}
          subItem
        />

        {/* Android 16 */}
        <CategoryItem
          title="Android 16"
          href="/collections/dragon-ball/android-16"
          count={characterCount["Android 16"] ?? 0}
          onClose={onClose}
          subItem
        />

        {/* Omega Shenron */}
        <CategoryItem
          title="Omega Shenron"
          href="/collections/dragon-ball/omega-shenron"
          count={characterCount["Omega Shenron"] ?? 0}
          onClose={onClose}
          subItem
        />

        {/* Cooler */}
        <CategoryItem
          title="Cooler"
          href="/collections/dragon-ball/cooler"
          count={characterCount["Cooler"] ?? 0}
          onClose={onClose}
          subItem
        />

        {/* Jiren */}
        <CategoryItem
          title="Jiren"
          href="/collections/dragon-ball/jiren"
          count={characterCount["Jiren"] ?? 0}
          onClose={onClose}
          subItem
        />
      </div>
    )}

    {/* =================================
        ONE PIECE
    ================================== */}

    <CategoryItem
      title="One Piece"
      href="/collections/one-piece"
      count={categoryCount["One Piece"] ?? 0}
      onClose={onClose}
      subItem
    />
  </div>

            )}

            <CategoryItem
              title="Sonic"
              href="/collections/sonic"
              count={categoryCount["Sonic"] ?? 0}
              onClose={onClose}
            />

            {/* =================================
                MÔ HÌNH MINI
            ================================== */}

            <CategoryItem
              title="Mô hình Mini"
              href="/collections/mo-hinh-mini"
              count={
                categoryCount["Mô hình Mini"] ?? 0
              }
              onClose={onClose}
            />

            {/* =================================
                MÓC KHÓA
            ================================== */}

            <CategoryItem
              title="Móc khóa"
              href="/collections/moc-khoa"
              count={
                categoryCount["Móc khóa"] ?? 0
              }
              onClose={onClose}
            />

            {/* =================================
                POKEMON
            ================================== */}

            <CategoryItem
              title="Pokemon"
              href="/collections/pokemon"
              count={
                categoryCount["Pokemon"] ?? 0
              }
              onClose={onClose}
            />

            {/* =================================
                MARVEL
            ================================== */}

            <CategoryItem
              title="Marvel"
              href="/collections/marvel"
              count={
                categoryCount["Marvel"] ?? 0
              }
              onClose={onClose}
            />

            {/* =================================
                DC
            ================================== */}

            <CategoryItem
              title="DC"
              href="/collections/dc"
              count={categoryCount["DC"] ?? 0}
              onClose={onClose}
            />

            {/* =================================
                CARTOON
            ================================== */}

            <CategoryItem
              title="Cartoon"
              href="/collections/cartoon"
              count={
                categoryCount["Cartoon"] ?? 0
              }
              onClose={onClose}
            />

            {/* =================================
                GAME
            ================================== */}

            <CategoryItem
              title="Game"
              href="/collections/game"
              count={categoryCount["Game"] ?? 0}
              onClose={onClose}
            />

            {/* =================================
                GIỎ HÀNG
            ================================== */}

            <button
              onClick={() => {
                onClose();
                openCart();
              }}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-[15px]
                font-medium
                transition-all
                duration-200
                hover:bg-blue-100
                hover:text-blue-600
              "
            >
              <ShoppingCart size={18} />
              <span>Giỏ hàng</span>
            </button>

            {/* =================================
                LIÊN HỆ
            ================================== */}

            <MenuItem
              icon={<Phone size={18} />}
              title="Liên hệ"
              href="/#footer"
              onClose={onClose}
            />

            {/* =================================
                GIỚI THIỆU
            ================================== */}

            <button
              onClick={() => setAboutOpen(true)}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-[15px]
                font-medium
                transition-all
                duration-200
                hover:bg-blue-100
                hover:text-blue-600
              "
            >
              <Info size={18} />
              <span>
                Giới Thiệu Về Chúng Tôi
              </span>
            </button>

          </nav>
        </div>
      </aside>

      {/* =================================
          ABOUT MODAL
      ================================== */}

      {aboutOpen && (
        <>
          <div
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={() => setAboutOpen(false)}
          />

          <div className="
            fixed
            left-1/2
            top-1/2
            z-[201]
            w-[90%]
            max-w-md
            -translate-x-1/2
            -translate-y-1/2
            rounded-2xl
            bg-white
            p-6
            shadow-2xl
          ">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="text-xl font-bold text-slate-900">
                Về 3D LAB
              </h3>

              <button
                onClick={() =>
                  setAboutOpen(false)
                }
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <p className="leading-7 text-slate-600">
              <strong>3D LAB</strong> được thành lập
              với mong muốn mang những nhân vật và ý
              tưởng yêu thích trở thành mô hình thực tế.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Từ những figure anime, Marvel, game cho
              đến các mô hình thiết kế riêng, chúng tôi
              luôn chú trọng vào độ sắc nét, chất lượng
              bề mặt và trải nghiệm của khách hàng.
            </p>

            <button
              onClick={() =>
                setAboutOpen(false)
              }
              className="
                mt-6
                w-full
                rounded-xl
                bg-blue-600
                py-3
                font-semibold
                text-white
                transition
                hover:bg-blue-700
              "
            >
              Đã hiểu
            </button>

          </div>
        </>
      )}
    </>
  );
}

/* =========================================================
   MENU ITEM
========================================================= */

function MenuItem({
  icon,
  title,
  href,
  onClose,
}: {
  icon?: ReactNode;
  title: string;
  href: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-3
        py-2.5
        text-[15px]
        font-medium
        transition-all
        duration-200
        hover:bg-blue-100
        hover:text-blue-600
      "
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}

/* =========================================================
   CATEGORY ITEM
========================================================= */

function CategoryItem({
  title,
  href,
  count,
  onClose,
  subItem = false,
}: {
  title: string;
  href: string;
  count: number;
  onClose: () => void;
  subItem?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={`
        flex
        w-full
        items-center
        justify-between
        rounded-xl
        text-[15px]
        font-medium
        text-slate-700
        transition-all
        duration-200
        hover:bg-blue-50
        hover:text-blue-600
        ${
          subItem
            ? "px-3 py-2"
            : "px-3 py-2.5"
        }
      `}
    >
      <div className="flex min-w-0 items-center gap-2">

        <span className="truncate">
          {title}
        </span>

        <span className="
          shrink-0
          rounded-full
          bg-slate-100
          px-2
          py-0.5
          text-xs
          font-semibold
          text-slate-500
        ">
          {count}
        </span>

      </div>

      <ChevronRight
        size={16}
        className="shrink-0 text-slate-400"
      />
    </Link>
  );
}