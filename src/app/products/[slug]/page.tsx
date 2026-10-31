"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products, formatPrice } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import ProductReviews from "@/components/ProductReviews";
import { useCheckout } from "@/context/CheckoutContext";
import { IconHeart, IconPlus, IconMinus } from "@/components/Icons";
import { cn } from "@/lib/utils";

const TRUST = [
  { title: "Free Shipping", sub: "Above ₹1299", d: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" },
  { title: "Returns/Exchange", sub: "T&C Apply", d: "M4 12a8 8 0 0114-5.3M20 4v4h-4M20 12a8 8 0 01-14 5.3M4 20v-4h4" },
  { title: "Secure Checkout", sub: "Secure Payment", d: "M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6zM9 12l2 2 4-4" },
];

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={cn("h-3.5 w-3.5", i <= Math.round(value) ? "fill-black" : "fill-neutral-300")}>
          <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6L10 15l-5.3 3 1.1-6L1.4 7.8l6-.8z" />
        </svg>
      ))}
    </span>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const { openCheckout } = useCheckout();
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed, recentlyViewed } = useStore();

  const firstAvail = product?.variants.find((v) => v.available) ?? product?.variants[0];
  const [size, setSize] = useState<string | undefined>(firstAvail?.size);
  const [color, setColor] = useState<string | undefined>(firstAvail?.color);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "washcare" | "shipping">("details");
  const [mainImg, setMainImg] = useState(0);

  useEffect(() => {
    if (product) addRecentlyViewed(product.id);
  }, [product, addRecentlyViewed]);

  if (!product) notFound();

  const sizes = Array.from(new Set(product.variants.map((v) => v.size).filter(Boolean))) as string[];
  const colors = Array.from(new Set(product.variants.map((v) => v.color).filter(Boolean))) as string[];
  const selected = product.variants.find(
    (v) => (!size || !v.size || v.size === size) && (!color || !v.color || v.color === color)
  );
  const sizeAvailable = (s: string) =>
    product.variants.some((v) => v.size === s && v.available && (!color || !v.color || v.color === color));

  const inWishlist = isInWishlist(product.id);
  const tagline = product.description.split(/(?<=\.)\s/)[0];
  const discount = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0;

  const upgrade = products
    .filter((p) => p.id !== product.id && p.category !== product.category && p.available)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    .slice(0, 2);
  const others = products.filter((p) => p.id !== product.id);
  const sameCat = others.filter((p) => p.category === product.category || p.collections.some((c) => c !== "all" && product.collections.includes(c)));
  const related = [...sameCat, ...others.filter((p) => !sameCat.includes(p))].slice(0, 4);
  const seen = recentlyViewed.filter((id) => id !== product.id).map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;
  const recent = [...seen, ...others.filter((p) => !seen.includes(p) && !related.includes(p)), ...others.filter((p) => !seen.includes(p))].filter((p, i, a) => a.indexOf(p) === i).slice(0, 4);

  const handleAdd = () => { if (selected?.available) addToCart(product.id, selected.id, qty); };
  const handleBuy = () => { if (selected?.available) openCheckout({ productId: product.id, variantId: selected.id, quantity: qty }); };
  const quickAdd = (id: string) => {
    const p = products.find((x) => x.id === id);
    const v = p?.variants.find((x) => x.available);
    if (p && v) addToCart(p.id, v.id, 1);
  };

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-[1400px]">
        {/* Breadcrumb */}
        <nav className="px-3 pb-2 pt-3 text-[11px] text-neutral-400 lg:px-8 lg:text-[12px]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-black">Home</Link>
          <span className="mx-1.5">›</span>
          <Link href={`/collections/${product.category}`} className="capitalize hover:text-black">{product.category}</Link>
          <span className="mx-1.5">›</span>
          <span className="text-neutral-600">{product.name}</span>
        </nav>

        <div className="mx-2 rounded-3xl bg-white p-2 lg:mx-6 lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-8">
          {/* ── Gallery: big image + 4 thumbnails ── */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={product.images[mainImg]?.src || product.images[0].src}
                alt={product.images[mainImg]?.alt || product.name}
                fill
                priority
                className="object-cover"
                sizes="(min-width:1024px) 55vw, 100vw"
              />
              <div className="absolute bottom-3 left-3 rounded bg-black/30 px-2 py-0.5 text-[11px] text-white/90 backdrop-blur">
                {mainImg + 1} / {product.images.length}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 py-2.5 lg:py-3">
              {Array.from({ length: Math.max(4, product.images.length) }).slice(0, 4).map((_, i) => {
                const img = product.images[i];
                return img ? (
                  <button
                    key={i}
                    onClick={() => setMainImg(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={cn("relative aspect-square overflow-hidden rounded-lg border-2 bg-neutral-100 transition", mainImg === i ? "border-black" : "border-transparent")}
                  >
                    <Image src={img.src} alt="" fill className="object-cover" sizes="120px" />
                  </button>
                ) : (
                  <div key={i} className="aspect-square rounded-lg bg-neutral-100" aria-hidden />
                );
              })}
            </div>
          </div>

          {/* ── Info ── */}
          <div className="px-2 pb-3 pt-2 lg:px-0 lg:pt-0">
            {product.rating != null && (
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                <Stars value={product.rating} />
                {product.reviewCount != null && <span>({product.reviewCount})</span>}
              </div>
            )}
            <div className="mt-1 flex items-start justify-between gap-3">
              <h1 className="text-[17px] font-semibold leading-snug tracking-tight lg:text-[26px]">{product.name}</h1>
              <button onClick={() => toggleWishlist(product.id)} className="shrink-0 p-1" aria-label="Wishlist">
                <IconHeart className="h-5 w-5" filled={inWishlist} />
              </button>
            </div>
            <p className="mt-1 text-[12px] leading-snug text-neutral-500 lg:text-[14px]">{tagline}</p>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-[16px] font-semibold lg:text-[20px]">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-[12px] text-neutral-400 line-through lg:text-[14px]">{formatPrice(product.compareAtPrice)}</span>
              )}
              {discount > 0 && <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-[10px] font-medium">{discount}% off</span>}
            </div>

            {colors.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-[11px] text-neutral-500">Color{color ? `: ${color}` : ""}</p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      title={c}
                      aria-label={c}
                      aria-pressed={color === c}
                      style={{ backgroundColor: c.toLowerCase().replace(/\s/g, "") }}
                      className={cn("h-7 w-7 rounded-full border border-neutral-300 ring-offset-2 transition", color === c && "ring-2 ring-black")}
                    />
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[11px] text-neutral-500">{product.optionLabel ?? "Size"}{size ? `: ${size}` : ""}</p>
                  {(product.optionLabel ?? "Size") === "Size" && <button className="rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium">Size Guide</button>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => {
                    const ok = sizeAvailable(s);
                    return (
                      <button
                        key={s}
                        disabled={!ok}
                        onClick={() => setSize(s)}
                        aria-pressed={size === s}
                        className={cn(
                          "h-9 min-w-[44px] rounded-full border px-3 text-[12px] font-medium transition lg:h-10 lg:min-w-[52px] lg:text-[13px]",
                          size === s ? "border-black bg-black text-white" : "border-neutral-300 bg-white text-black",
                          !ok && "cursor-not-allowed bg-neutral-100 text-neutral-400 line-through opacity-60"
                        )}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="mt-5 flex gap-2">
              <div className="flex h-11 items-center rounded-full bg-black px-1 text-white lg:h-12">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-9 w-9 items-center justify-center" aria-label="Decrease quantity"><IconMinus className="h-3.5 w-3.5" /></button>
                <span className="w-6 text-center text-[13px] font-medium" aria-live="polite">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(10, q + 1))} className="flex h-9 w-9 items-center justify-center" aria-label="Increase quantity"><IconPlus className="h-3.5 w-3.5" /></button>
              </div>
              <button
                onClick={handleAdd}
                disabled={!selected?.available}
                className="h-11 flex-1 rounded-full bg-black text-[13px] font-semibold text-white disabled:opacity-40 lg:h-12"
              >
                {selected?.available === false ? "Sold out" : "Add to Cart"}
              </button>
            </div>
            <button
              onClick={handleBuy}
              disabled={!selected?.available}
              className="mt-2 h-11 w-full rounded-full bg-black text-[13px] font-semibold text-white disabled:opacity-40 lg:h-12"
            >
              Buy Now
            </button>

            {/* Upgrade the look */}
            {upgrade.length > 0 && (
              <div className="mt-6">
                <h2 className="mb-2.5 text-[14px] font-semibold lg:text-[16px]">Upgrade the look</h2>
                <ul className="space-y-2">
                  {upgrade.map((p) => (
                    <li key={p.id} className="flex items-center gap-3 rounded-2xl bg-neutral-100 p-2.5">
                      <Link href={`/products/${p.slug}`} className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                        <Image src={p.images[0].src} alt="" fill sizes="64px" className="object-cover" />
                      </Link>
                      <Link href={`/products/${p.slug}`} className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-medium lg:text-[13px]">{p.name}</p>
                        <p className="text-[12px] text-neutral-600">{formatPrice(p.price)}</p>
                      </Link>
                      <button onClick={() => quickAdd(p.id)} className="h-8 shrink-0 rounded-full bg-black px-4 text-[11px] font-semibold text-white" aria-label={`Add ${p.name} to bag`}>
                        Add
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust badges */}
            <ul className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-neutral-200 p-3">
              {TRUST.map((t) => (
                <li key={t.title} className="flex flex-col items-center text-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={t.d} /></svg>
                  <span className="mt-1 text-[10px] font-semibold leading-tight lg:text-[11px]">{t.title}</span>
                  <span className="text-[9px] leading-tight text-neutral-500 lg:text-[10px]">{t.sub}</span>
                </li>
              ))}
            </ul>

            {/* Tabs */}
            <div className="mt-6">
              <div className="flex border-b border-neutral-200" role="tablist">
                {(["details", "washcare", "shipping"] as const).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn("flex-1 pb-2.5 text-center text-[12px] font-medium transition lg:text-[13px]", activeTab === tab ? "border-b-2 border-black text-black" : "text-neutral-400")}
                  >
                    {tab === "details" ? "Details & Description" : tab === "washcare" ? "Washcare" : "Shipping"}
                  </button>
                ))}
              </div>
              <div className="space-y-1 pt-3 text-[12px] leading-relaxed text-neutral-600 lg:text-[13px]" role="tabpanel">
                {activeTab === "details" && (
                  <>
                    <p>{product.description}</p>
                  </>
                )}
                {activeTab === "washcare" && (product.washcare?.map((d, i) => <p key={i}>• {d}</p>) || <p>• Machine wash cold. Do not bleach. Line dry.</p>)}
                {activeTab === "shipping" && (
                  product.shipping?.map((d, i) => <p key={i}>{d}</p>) || (<><p>Packed within 24 hours.</p><p>Free delivery pan-India.</p><p>Dispatches next day.</p></>)
                )}
              </div>
            </div>
          </div>
        </div>

        {/* You may also like (4) */}
        <section className="mx-2 mt-5 lg:mx-6" aria-labelledby="related-h">
          <h2 id="related-h" className="mb-3 px-1 text-[15px] font-semibold lg:text-[17px]">You may also like</h2>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Reviews */}
        <ProductReviews product={product} />

        {/* Recently viewed (4) on a white rounded panel */}
        <section className="mx-2 mt-3 rounded-3xl bg-white p-3 lg:mx-6 lg:p-6" aria-labelledby="recent-h">
          <h2 id="recent-h" className="mb-3 px-1 text-[15px] font-semibold lg:text-[17px]">Recently viewed</h2>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
            {recent.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
        <div className="h-6" />
      </div>
    </div>
  );
}
