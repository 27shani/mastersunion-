"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import SnapCarousel from "./SnapCarousel";
import { getProductBySlug } from "@/data/products";
import { looks } from "@/data/home";

function Reel({ slug, video }: { slug: string; video: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const product = getProductBySlug(slug);
  if (!product) return null;
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {}); else v.pause();
  };
  return (
    <li
      className="w-[58vw] shrink-0 snap-center sm:w-[36vw] lg:w-auto"
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => ref.current?.pause()}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-neutral-900 shadow-md lg:shadow-none">
        <video
          ref={ref}
          src={video}
          poster={product.images[0]?.src}
          muted
          loop
          playsInline
          preload="none"
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label={`${product.name} look. Tap to play or pause`}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${product.name} reel` : `Play ${product.name} reel`}
          className={`absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/50 backdrop-blur-md transition lg:h-14 lg:w-14 ${playing ? "pointer-events-none opacity-0" : "opacity-100 hover:bg-white/40"}`}
        >
          <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-current lg:h-6 lg:w-6" aria-hidden><path d="M8 5.5v13a1 1 0 001.5.86l10.5-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z" /></svg>
        </button>
        {/* light black fade behind name (left) and button (right) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-2.5 pt-12 text-white lg:p-3">
          <p className="line-clamp-2 text-[11px] font-medium leading-tight lg:text-[13px]">{product.name}</p>
          <Link href={`/products/${product.slug}`} className="pointer-events-auto shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-black lg:px-3 lg:py-1.5 lg:text-[12px]">
            Shop now
          </Link>
        </div>
      </div>
    </li>
  );
}

// Desktop: 5 reels in a row (use lg:grid-cols-4 for four). Mobile: cover-flow with swipe + arrows.
export default function ShopByLook() {
  return (
    <div>
      <h2 className="mb-3 px-1 text-[15px] font-semibold tracking-tight lg:mb-4 lg:text-[17px]">Shop by look</h2>
      <SnapCarousel
        label="Shop by look"
        focus
        arrowClass="flex lg:hidden"
        className="gap-3 px-[21vw] py-2 sm:px-[32vw] lg:grid lg:grid-cols-5 lg:gap-3.5 lg:overflow-visible lg:snap-none lg:px-0 lg:py-0"
      >
        {looks.map((l) => <Reel key={l.slug} {...l} />)}
      </SnapCarousel>
    </div>
  );
}
