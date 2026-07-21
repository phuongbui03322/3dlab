"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  Play,
} from "lucide-react";

import type { Product } from "@/types/product";

interface ProductGalleryProps {
  product: Product;
}

type MediaItem =
  | {
      type: "image";
      src: string;
    }
  | {
      type: "video";
      src: string;
      thumbnail?: string;
    };

export default function ProductGallery({
  product,
}: ProductGalleryProps) {
  const images = useMemo(
    () =>
      product.gallery && product.gallery.length > 0
        ? product.gallery
        : [product.image],
    [product.gallery, product.image]
  );

  const media = useMemo<MediaItem[]>(
  () => [
    ...images.map((src) => ({
      type: "image" as const,
      src,
    })),
    ...(product.video
      ? [
          {
            type: "video" as const,
            src: product.video,
            thumbnail: product.videoThumbnail,
          },
        ]
      : []),
  ],
  [images, product.video, product.videoThumbnail]
);
  console.log(product.video);
console.log(media);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [lightboxOpen, setLightboxOpen] =
    useState(false);

  const [mounted, setMounted] =
    useState(false);

  const touchStartX = useRef<number | null>(
    null
  );

  const touchEndX = useRef<number | null>(
    null
  );

  const previewVideoRef =
    useRef<HTMLVideoElement>(null);

  const lightboxVideoRef =
    useRef<HTMLVideoElement>(null);

  const current = media[activeIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
    setLightboxOpen(false);
  }, [product.slug]);

  useEffect(() => {
    document.body.style.overflow =
      lightboxOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  useEffect(() => {
    previewVideoRef.current?.pause();
    lightboxVideoRef.current?.pause();
  }, [activeIndex]);

  useEffect(() => {
    if (!lightboxOpen) {
      lightboxVideoRef.current?.pause();
    }
  }, [lightboxOpen]);

  const handlePrevious = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0
        ? media.length - 1
        : prev - 1
    );
  }, [media.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === media.length - 1
        ? 0
        : prev + 1
    );
  }, [media.length]);

  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current =
      e.touches[0].clientX;
  };

  const handleTouchMove = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    touchEndX.current =
      e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      return;
    }

    const distance =
      touchStartX.current -
      touchEndX.current;

    if (Math.abs(distance) > 40) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const onKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (!lightboxOpen) return;

      if (event.key === "ArrowLeft") {
        handlePrevious();
      }

      if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        onKeyDown
      );
  }, [
    lightboxOpen,
    handlePrevious,
    handleNext,
  ]);
  return (
  <>
    <section
      aria-label="Thư viện hình ảnh sản phẩm"
      className="flex flex-col gap-6 lg:flex-row"
    >
      {/* Thumbnail */}
{images.length > 1 && (
  <div className="order-2 flex gap-3 overflow-x-auto pb-2 lg:order-1 lg:w-24 lg:flex-col lg:overflow-visible">
    {images.map((src, index) => {
      const active = index === activeIndex;

      return (
        <button
          key={index}
          type="button"
          onClick={() => setActiveIndex(index)}
          className={[
            "relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border transition-all duration-300",
            active
              ? "border-orange-500 ring-2 ring-orange-100"
              : "border-slate-200 hover:border-orange-400",
          ].join(" ")}
        >
          <Image
            src={src}
            alt={`${product.name} ${index + 1}`}
            fill
            sizes="80px"
            className="object-cover"
          />

          {index === 0 && product.video && (
            <>
              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
                VIDEO
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  const videoIndex = media.findIndex(
                    (item) => item.type === "video"
                  );

                  if (videoIndex !== -1) {
                    setActiveIndex(videoIndex);
                    setLightboxOpen(true);
                  }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="rounded-full bg-white/90 p-3 shadow-lg transition hover:scale-110">
                  <Play
                    size={18}
                    fill="currentColor"
                  />
                </div>
              </button>
            </>
          )}
        </button>
      );
    })}
  </div>
)}

{/* Main */}
<div className="order-1 flex-1">
  <div className="relative overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-sm">
    <div
      className="group relative aspect-square w-full overflow-hidden"
      onClick={() => setLightboxOpen(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {current.type === "image" ? (
        <Image
          key={current.src}
          src={current.src}
          alt={product.name}
          fill
          priority
          sizes="(max-width:1024px)100vw,50vw"
          className="cursor-zoom-in object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  <div className="rounded-full bg-white/90 p-5 shadow-xl">
    <Play
      size={34}
      fill="currentColor"
    />
  </div>
</div>
          <video
            ref={previewVideoRef}
            src={current.src}
            controls
            playsInline
            className="h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            VIDEO
          </div>
        </>
      )}

      {current.type === "image" && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          className="absolute bottom-5 right-5 rounded-full bg-white/90 p-3 shadow-lg transition hover:scale-110"
        >
          <ZoomIn size={20} />
        </button>
      )}
    </div>

    {media.length > 1 && (
      <>
        <button
          type="button"
          onClick={handlePrevious}
          className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition hover:bg-orange-500 hover:text-white"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition hover:bg-orange-500 hover:text-white"
        >
          <ChevronRight size={22} />
        </button>
      </>
    )}
  </div>

  {media.length > 1 && (
    <div className="mt-5 flex items-center justify-between">
      <span className="text-sm text-slate-500">
        {current.type === "video"
  ? "Video"
  : `Ảnh ${activeIndex + 1}/${media.length}`}
      </span>

      <div className="flex gap-2">
        {media.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={
              index === activeIndex
                ? "h-2 w-8 rounded-full bg-orange-500"
                : "h-2 w-2 rounded-full bg-slate-300"
            }
          />
        ))}
      </div>
    </div>
  )}
</div>
</section>
{/* ================= LIGHTBOX ================= */}
{mounted &&
  lightboxOpen &&
  createPortal(
    <div
      className="fixed inset-0 z-[999999] bg-black/95"
      onClick={() => setLightboxOpen(false)}
    >
      {/* Close */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setLightboxOpen(false);
        }}
        className="fixed right-5 top-5 z-[1000000] flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
      >
        <X size={28} />
      </button>

      {/* Previous */}
      {media.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="fixed left-5 top-1/2 z-[1000000] flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-orange-500"
        >
          <ChevronLeft size={30} />
        </button>
      )}

            {/* Media */}
            <div
              className="absolute inset-0 flex items-center justify-center p-6"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative flex h-[90vh] w-full max-w-7xl items-center justify-center">
                {current.type === "image" ? (
                  <Image
                    src={current.src}
                    alt={product.name}
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain"
                  />
                ) : (
                  <video
                    ref={lightboxVideoRef}
                    src={current.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[85vh] w-auto rounded-2xl shadow-2xl"
                  />
                )}
              </div>
            </div>

            {/* Next */}
{media.length > 1 && (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      handleNext();
    }}
    className="fixed right-5 top-1/2 z-[1000000] flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-orange-500"
  >
    <ChevronRight size={30} />
  </button>
)}

{/* Counter */}
{media.length > 1 && (
  <div className="fixed bottom-6 left-1/2 z-[1000000] -translate-x-1/2 rounded-full bg-white/15 px-5 py-2 text-sm text-white backdrop-blur">
    {current.type === "video"
  ? "Video"
  : `Ảnh ${activeIndex + 1}/${media.length}`}
  </div>
)}
</div>,
document.body
)}
    </>
  );
}