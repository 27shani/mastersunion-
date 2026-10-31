"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { useCheckout } from "@/context/CheckoutContext";
import { IconMenu, IconSearch, IconHeart, IconBag, IconClose, IconPlus, IconMinus } from "./Icons";
import { products, formatPrice } from "@/data/products";
import { megaTiles, brand } from "@/data/home";
import { cn } from "@/lib/utils";

const shopLinks = [
  { label: "All Products", href: "/collections/all" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Bestsellers", href: "/collections/bestsellers" },
  { label: "Apparel", href: "/collections/apparel-1" },
  { label: "Drinkware", href: "/collections/drinkware-1" },
  { label: "Bags & Accessories", href: "/collections/accessories" },
  { label: "Union Originals", href: "/collections/union-originals" },
];
const helpLinks = [
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Shipping", href: "/shipping-policy" },
  { label: "Returns & Exchanges", href: "/return-policy" },
  { label: "About", href: "/about" },
];

function Logo({ light, className }: { light: boolean; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={light ? brand.logoLight : brand.logoDark} alt="Master's Union" className={cn("h-7 w-auto object-contain lg:h-9", className)} />;
}

export default function Header() {
  const { cartCount, wishlist, cartTotal, getCartProducts, updateQuantity, removeFromCart } = useStore();
  const { openCheckout } = useCheckout();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const isHome = usePathname() === "/";
  // Transparent at the top of the home page (white icons over the hero); liquid glass once scrolled.
  const overHero = isHome && !scrolled && !mega;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen || cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen, cartOpen]);

  const q = query.trim().toLowerCase();
  const results = q.length > 1 ? products.filter((p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))).slice(0, 6) : [];
  const suggested = products.filter((p) => p.featured).slice(0, 4);
  const items = getCartProducts();

  const iconBtn = "relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5";
  const badge = "absolute right-1 top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-medium text-white";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-300",
          scrolled && !mega ? "glass" : mega ? "bg-white" : "bg-transparent",
          !isHome && !scrolled && !mega && "bg-white/80 backdrop-blur"
        )}
        onMouseLeave={() => setMega(false)}
        onKeyDown={(e) => e.key === "Escape" && setMega(false)}
      >
        <div className={cn("transition-colors duration-300", overHero ? "text-white" : "text-neutral-950")}>
          {/* Mobile header */}
          <div className="flex h-14 items-center justify-between px-3 lg:hidden">
            <div className="flex items-center gap-1 rounded-full border border-black/5 bg-white/90 py-1 pl-1 pr-3 text-neutral-950 shadow-sm backdrop-blur">
              <button onClick={() => setMenuOpen(true)} className="flex h-8 w-8 items-center justify-center rounded-full" aria-label="Open menu">
                <IconMenu className="h-4 w-4" />
              </button>
              <Link href="/" aria-label="Master's Union home" className="flex items-center">
                <Logo light={false} className="h-6" />
              </Link>
            </div>
            <div className="flex items-center">
              <button onClick={() => setSearchOpen(true)} className={iconBtn} aria-label="Search"><IconSearch className="h-5 w-5" /></button>
              <Link href="/wishlist" className={iconBtn} aria-label="Wishlist">
                <IconHeart className="h-5 w-5" />
                {wishlist.length > 0 && <span className={badge}>{wishlist.length}</span>}
              </Link>
              <button onClick={() => setCartOpen(true)} className={iconBtn} aria-label="Bag">
                <IconBag className="h-5 w-5" />
                {cartCount > 0 && <span className={badge}>{cartCount}</span>}
              </button>
            </div>
          </div>

          {/* Desktop header */}
          <div className="hidden h-[76px] grid-cols-3 items-center px-8 lg:grid">
            <nav className="flex gap-8 text-[13px] font-medium tracking-wide" aria-label="Primary">
              <Link href="/collections/new-arrivals" onMouseEnter={() => setMega(false)}>New in</Link>
              <button onMouseEnter={() => setMega(true)} onFocus={() => setMega(true)} aria-expanded={mega} aria-haspopup="true">Collections</button>
              <Link href="/contact" onMouseEnter={() => setMega(false)}>Contact</Link>
            </nav>
            <Link href="/" aria-label="Master's Union home" className="justify-self-center"><Logo light={overHero} /></Link>
            <div className="flex items-center justify-end gap-1">
              <button onClick={() => setSearchOpen(true)} className={iconBtn} aria-label="Search"><IconSearch className="h-5 w-5" /></button>
              <Link href="/wishlist" className={iconBtn} aria-label="Wishlist">
                <IconHeart className="h-5 w-5" />
                {wishlist.length > 0 && <span className={badge}>{wishlist.length}</span>}
              </Link>
              <button onClick={() => setCartOpen(true)} className={iconBtn} aria-label="Bag">
                <IconBag className="h-5 w-5" />
                {cartCount > 0 && <span className={badge}>{cartCount}</span>}
              </button>
              <button onClick={() => setMenuOpen(true)} className="ml-3 flex h-10 w-[72px] items-center justify-center rounded-full border border-black/5 bg-white text-neutral-950 shadow-sm" aria-label="Open menu">
                <IconMenu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {mega && (
            <div className="mu-pop mx-4 mb-3 hidden rounded-3xl bg-white p-4 text-neutral-950 shadow-2xl lg:block">
              <ul className="grid grid-cols-5 gap-3">
                {megaTiles.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} onClick={() => setMega(false)} className="block overflow-hidden rounded-2xl bg-neutral-100 text-center text-xs font-medium">
                      <span className="relative block aspect-[5/4]"><Image src={c.img} alt="" fill sizes="20vw" className="object-cover" /></span>
                      <span className="block py-2.5">{c.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Menu drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
          <aside className="mu-pop absolute inset-y-0 left-0 flex w-[86%] max-w-[380px] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4">
              <Logo light={false} className="h-7" />
              <button onClick={() => setMenuOpen(false)} className={iconBtn} aria-label="Close menu"><IconClose className="h-5 w-5" /></button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 pb-8">
              <p className="mb-2 mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">Shop</p>
              <ul>
                {shopLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} onClick={() => setMenuOpen(false)} className="block border-b border-neutral-200/70 py-3.5 text-[17px] font-medium tracking-tight">{l.label}</Link></li>
                ))}
              </ul>
              <p className="mb-2 mt-8 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">Help</p>
              <ul className="space-y-2.5 text-sm text-neutral-700">
                {helpLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link></li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Search */}
      {searchOpen && (
        <div className="fixed inset-0 z-[70] bg-white/95 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Search">
          <div className="mx-auto max-w-2xl px-4 pt-4">
            <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-4">
              <IconSearch className="h-4 w-4 text-neutral-500" />
              <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="h-12 flex-1 bg-transparent text-[15px] outline-none" />
              <button onClick={() => { setSearchOpen(false); setQuery(""); }} aria-label="Close search"><IconClose className="h-5 w-5" /></button>
            </div>
            <p className="mb-3 mt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">{results.length ? "Results" : "Popular right now"}</p>
            <ul className="space-y-2">
              {(results.length ? results : suggested).map((p) => (
                <li key={p.id}>
                  <Link href={`/products/${p.slug}`} onClick={() => { setSearchOpen(false); setQuery(""); }} className="flex items-center gap-3 rounded-2xl p-2 hover:bg-neutral-100">
                    <span className="relative h-16 w-14 overflow-hidden rounded-xl bg-neutral-100"><Image src={p.images[0].src} alt="" fill sizes="56px" className="object-cover" /></span>
                    <span><span className="block text-sm font-medium">{p.name}</span><span className="text-sm text-neutral-600">{formatPrice(p.price)}</span></span>
                  </Link>
                </li>
              ))}
              {q.length > 1 && results.length === 0 && <li className="py-6 text-sm text-neutral-500">No products found for “{query}”.</li>}
            </ul>
          </div>
        </div>
      )}

      {/* Bag drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Bag">
          <button className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setCartOpen(false)} aria-label="Close bag" />
          <aside className="mu-pop absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
              <h2 className="text-base font-semibold">Your bag ({cartCount})</h2>
              <button onClick={() => setCartOpen(false)} className={iconBtn} aria-label="Close bag"><IconClose className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-3">
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-sm text-neutral-500">Your bag is empty.</p>
                  <Link href="/collections/all" onClick={() => setCartOpen(false)} className="mt-4 inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white">Continue shopping</Link>
                </div>
              ) : (
                <ul className="divide-y divide-neutral-200">
                  {items.map(({ item, product }) => (
                    <li key={item.productId + item.variantId} className="flex gap-3 py-4">
                      <Link href={`/products/${product.slug}`} onClick={() => setCartOpen(false)} className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                        <Image src={product.images[0].src} alt="" fill sizes="80px" className="object-cover" />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="truncate text-sm font-medium">{product.name}</p>
                        {item.size && <p className="text-xs text-neutral-500">{product.optionLabel ?? "Size"}: {item.size}</p>}
                        <p className="mt-0.5 text-sm">{formatPrice(product.price)}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-neutral-300">
                            <button onClick={() => item.quantity > 1 ? updateQuantity(item.productId, item.variantId, item.quantity - 1) : removeFromCart(item.productId, item.variantId)} className="flex h-8 w-8 items-center justify-center" aria-label="Decrease"><IconMinus className="h-3 w-3" /></button>
                            <span className="w-5 text-center text-xs">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center" aria-label="Increase"><IconPlus className="h-3 w-3" /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.productId, item.variantId)} className="text-xs text-neutral-500 underline">Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-neutral-200 p-5">
                <div className="mb-1 flex justify-between text-sm"><span>Subtotal</span><span className="font-semibold">{formatPrice(cartTotal)}</span></div>
                <p className="mb-4 text-xs text-neutral-500">Shipping and taxes calculated at checkout.</p>
                <button onClick={() => { setCartOpen(false); openCheckout(); }} className="h-12 w-full rounded-full bg-black text-sm font-semibold text-white">Checkout</button>
                <Link href="/cart" onClick={() => setCartOpen(false)} className="mt-2 block text-center text-xs text-neutral-500 underline">View full bag</Link>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
