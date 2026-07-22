import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

import { CartProvider } from "@/app/context/CartContext";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "3D LAB",
    template: "%s | 3D LAB",
  },
  description:
    "3D LAB - Chuyên mô hình 3D, in 3D theo yêu cầu, mô hình sưu tầm chất lượng cao.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
        <CartProvider>
          <Header />

          <main className="relative z-0 flex-1 pt-28 md:pt-16">
            {children}
          </main>

          <Footer />
          <Toaster
  position="top-center"
  richColors
  closeButton
/>
        </CartProvider>
      </body>
    </html>
  );
}