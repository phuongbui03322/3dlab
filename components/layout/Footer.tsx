"use client";

import {
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { FaFacebookF } from "react-icons/fa";
import { SiTiktok, SiZalo } from "react-icons/si";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-slate-800 bg-slate-950 scroll-mt-32"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center px-5 py-8">
        {/* Logo */}
        <h2 className="text-2xl font-black tracking-[0.25em] text-white">
          3D LAB
        </h2>

        <p className="mt-2 text-sm font-medium tracking-wide text-slate-400">
          Mô hình 3D
          <span className="mx-2 text-slate-600">•</span>
          Figure
          <span className="mx-2 text-slate-600">•</span>
          In theo yêu cầu
        </p>

        {/* Social */}
        <div className="mt-6 flex items-center gap-3">
          <a
            href="#"
            aria-label="Facebook"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            <FaFacebookF size={17} />
          </a>

          <a
            href="#"
            aria-label="Zalo"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-sky-500 hover:bg-sky-500 hover:text-white"
          >
            <SiZalo size={18} />
          </a>

          <a
            href="#"
            aria-label="TikTok"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-white hover:bg-white hover:text-black"
          >
            <SiTiktok size={18} />
          </a>
        </div>

        {/* Contact */}
        <div className="mt-7 flex flex-col items-center gap-3 text-sm text-slate-400">
          {/* Hàng 1 */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <div className="flex items-center gap-1.5">
              <Phone size={15} className="text-blue-500" />
              <span>0942.99.2020</span>
            </div>

            <span className="text-slate-600">•</span>

            <div className="flex items-center gap-1.5">
              <Mail size={15} className="text-blue-500" />
              <span>contact@3dlab.vn</span>
            </div>
          </div>

          {/* Hàng 2 */}
          <div className="flex items-center gap-2 text-center">
            <MapPin size={15} className="shrink-0 text-blue-500" />
            <span>136 Đ. Hồ Tùng Mậu, Phú Diễn, Hà Nội</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex w-full flex-col items-center gap-4 border-t border-slate-800 pt-5">
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <ArrowUp size={16} />
            Lên đầu trang
          </button>

          <p className="text-center text-xs text-slate-600">
            © {new Date().getFullYear()} 3D LAB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}