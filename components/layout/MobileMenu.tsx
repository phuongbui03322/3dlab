"use client";

import Link from "next/link";
import { useCartContext } from "@/app/context/CartContext";
import { featuredProducts } from "@/data/featuredProducts";
import {
  X,
  Home,
  Heart,
  ShoppingCart,
  Phone,
  Info,
  Wand2,
  ChevronRight,
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

  const categoryCount = useMemo(() => {
  return featuredProducts.reduce<Record<string, number>>(
    (acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    },
    {}
  );
}, []);

  useEffect(() => {
    document.body.style.overflow =
      open || aboutOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, aboutOpen]);

  return (
    <>
      {/* Backdrop */}
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

      {/* Drawer */}
      <aside
        className={`fixed left-0 z-50 flex flex-col overflow-hidden rounded-tr-3xl bg-zinc-50 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          top: HEADER_HEIGHT,
          width: "82vw",
          maxWidth: "320px",
          height: `calc(100dvh - ${HEADER_HEIGHT}px)`,
        }}
      >
        {/* Header */}
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

        {/* Info */}
        <div className="space-y-1 border-b bg-white px-5 py-4 text-xs">
          <div>⭐ 500+ mẫu mô hình</div>
          <div>🚚 Ship toàn quốc</div>
          <div>🖨️ In theo yêu cầu</div>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-3 py-2">
            <MenuItem
              icon={<Home size={18} />}
              title="Trang chủ"
              href="/"
              onClose={onClose}
            />

            <div className="my-2 border-t" />

            <CategoryItem
  title="Anime"
  href="/collections/anime"
  count={categoryCount["Anime"] ?? 0}
  onClose={onClose}
/>

            <CategoryItem
              title="Marvel"
              href="/collections/marvel"
              count={categoryCount["Marvel"] ?? 0}
              onClose={onClose}
            />

            <CategoryItem
              title="DC"
              href="/collections/dc"
              count={categoryCount["DC"] ?? 0}
              onClose={onClose}
            />

            <CategoryItem
              title="Dragon Ball"
              href="/collections/dragon-ball"
              count={categoryCount["Dragon Ball"] ?? 0}
              onClose={onClose}
            />

            <CategoryItem
  title="Cartoon"
  href="/collections/cartoon"
  count={categoryCount["Cartoon"] ?? 0}
  onClose={onClose}
/>


            <CategoryItem
              title="Game"
              href="/collections/game"
              count={categoryCount["Game"] ?? 0}
              onClose={onClose}
            />
            <CategoryItem
  title="Pokemon"
  href="/collections/pokemon"
  count={categoryCount["Pokemon"] ?? 0}
  onClose={onClose}
/>

            <div className="my-2 border-t" />

            <MenuItem
              icon={<Heart size={18} />}
              title="Sản phẩm nổi bật"
              href="/#featured-products"
              onClose={onClose}
            />

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

            <MenuItem
              icon={<Phone size={18} />}
              title="Liên hệ"
              href="/#footer"
              onClose={onClose}
            />

            <button
              onClick={() => setAboutOpen(true)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-all duration-200 hover:bg-blue-100 hover:text-blue-600"
            >
              <Info size={18} />
              <span>Giới Thiệu Về Chúng Tôi</span>
            </button>
          </nav>
        </div>

        {/* Bottom */}
        <div className="border-t bg-white p-4">
          <button
  onClick={() => {
    onClose();
    window.open(
      "https://m.me/1151757441360383",
      "_blank"
    );
  }}
  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
>
  <Wand2 size={16} />
  Đặt in theo yêu cầu
</button>
        </div>
      </aside>

      {/* About Modal */}
      {aboutOpen && (
        <>
          <div
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={() => setAboutOpen(false)}
          />

          <div className="fixed left-1/2 top-1/2 z-[201] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Về 3D LAB
              </h3>

              <button
                onClick={() => setAboutOpen(false)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <p className="leading-7 text-slate-600">
              <strong>3D LAB</strong> được thành lập với mong muốn
              mang những nhân vật và ý tưởng yêu thích trở thành mô
              hình thực tế.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Từ những figure anime, Marvel, game cho đến các mô
              hình thiết kế riêng, chúng tôi luôn chú trọng vào độ
              sắc nét, chất lượng bề mặt và trải nghiệm của khách
              hàng.
            </p>

            <button
              onClick={() => setAboutOpen(false)}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Đã hiểu
            </button>
          </div>
        </>
      )}
    </>
  );
}
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

function CategoryItem({
  title,
  href,
  count,
  onClose,
}: {
  title: string;
  href: string;
  count: number;
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
        justify-between
        rounded-xl
        px-3
        py-2.5
        text-[15px]
        transition-all
        duration-200
        hover:bg-blue-100
        hover:text-blue-600
      "
    >
      <div className="flex items-center gap-2">
        <span>{title}</span>

        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
          {count}
        </span>
      </div>

      <ChevronRight
        size={16}
        className="text-slate-500"
      />
    </Link>
  );
}