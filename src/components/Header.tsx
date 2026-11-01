"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { useCheckout } from "@/context/CheckoutContext";
import { IconMenu, IconSearch, IconHeart, IconBag, IconClose, IconPlus, IconMinus } from "./Icons";
import { products, formatPrice } from "@/data/products";
import { megaTiles, brand } from "@/data/home";
import { cn } from "@/lib/utils";

const FREE_SHIPPING = 1299;

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

// One black logo file; inverted to white over the hero.
function Logo({ white, className }: { white: boolean; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={brand.logoDark} alt="Master's Union" className={cn("w-auto object-contain transition-[filter] duration-300", white && "brightness-0 invert", className)} />;
}

function CollectionRows({ onPick }: { onPick: () => void }) {
  return (
    <ul className="max-w-[640px]">
      {megaTiles.map((c) => (
        <li key={c.href} className="border-b border-neutral-200">
          <Link href={c.href} onClick={onPick} className="flex items-center gap-4 py-1.5">
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-200"><Image src={c.img} alt="" fill sizes="64px" className="object-cover" /></span>
            <span className="text-[13px]">{c.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Header() {
  const { cartCount, wishlist, cartTotal, getCartProducts, updateQuantity, removeFromCart } = useStore();
  const { openCheckout } = useCheckout();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const isHome = usePathname() === "/";
  // Transparent at the top of the home page; liquid glass once scrolled. Logo and icons are always black.

  const openSearch = () => { setPanelTop(headerRef.current?.getBoundingClientRect().bottom ?? 0); setSearchOpen(true); };
  const closeSearch = () => { setSearchOpen(false); setQuery(""); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // other components (e.g. product page "Add to cart") can open the bag
  useEffect(() => {
    const open = () => setCartOpen(true);
    window.addEventListener("mu:open-cart", open);
    return () => window.removeEventListener("mu:open-cart", open);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen || cartOpen ? "hidden" : "";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenuOpen(false); setCartOpen(false); closeSearch(); } };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [menuOpen, searchOpen, cartOpen]);

  const q = query.trim().toLowerCase();
  const results = q.length > 1 ? products.filter((p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))).slice(0, 6) : [];
  const items = getCartProducts();
  const inBag = new Set(items.map((i) => i.product.id));
  const mayLike = [...products.filter((p) => p.featured), ...products.filter((p) => !p.featured)].filter((p) => !inBag.has(p.id)).slice(0, 5);
  const remaining = Math.max(0, FREE_SHIPPING - cartTotal);
  const pct = Math.min(100, Math.round((cartTotal / FREE_SHIPPING) * 100));

  const iconBtn = "relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5";
  const badge = "absolute right-1 top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-medium text-white";
  const iconGroup = "flex items-center rounded-full bg-white/80 px-0.5 text-neutral-950 shadow-sm backdrop-blur-md transition-colors lg:bg-transparent lg:px-0 lg:shadow-none lg:backdrop-blur-none";

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-[60] transition-[background,box-shadow] duration-300",
          searchOpen || mega ? "bg-white" : scrolled ? "glass" : "",
          !isHome && !scrolled && !mega && !searchOpen && "lg:bg-white/80 lg:backdrop-blur"
        )}
        onMouseLeave={() => setMega(false)}
        onKeyDown={(e) => e.key === "Escape" && setMega(false)}
      >
        <div className="text-neutral-950">
          {/* Mobile header: no bar background, just a floating menu pill + icons */}
          <div className="flex h-14 items-center justify-between px-3 lg:hidden">
            <div className={"flex items-center gap-2 rounded-full bg-white/80 py-1 pl-1 pr-4 text-neutral-950 shadow-sm backdrop-blur-md"}>
              <button onClick={() => setMenuOpen(true)} className={"flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100"} aria-label="Open menu">
                <IconMenu className="h-4 w-4" />
              </button>
              <Link href="/" aria-label="Master's Union home" className="flex items-center"><Logo white={false} className="h-7" /></Link>
            </div>
            <div className={iconGroup}>
              <button onClick={openSearch} className={iconBtn} aria-label="Search"><IconSearch className="h-5 w-5" /></button>
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
          <div className="hidden h-[80px] grid-cols-3 items-center px-8 lg:grid">
            <nav className="flex gap-8 text-[13px] font-medium tracking-wide" aria-label="Primary">
              <Link href="/collections/new-arrivals" onMouseEnter={() => setMega(false)}>New in</Link>
              <button onMouseEnter={() => setMega(true)} onFocus={() => setMega(true)} aria-expanded={mega} aria-haspopup="true">Collections</button>
              <Link href="/contact" onMouseEnter={() => setMega(false)}>Contact</Link>
            </nav>
            <Link href="/" aria-label="Master's Union home" className="justify-self-center"><Logo white={false} className="h-11" /></Link>
            <div className="flex items-center justify-end gap-1">
              <button onClick={searchOpen ? closeSearch : openSearch} className={iconBtn} aria-label="Search"><IconSearch className="h-5 w-5" /></button>
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

      {/* Search: panel drops from the header, page behind is blurred */}
      {searchOpen && (
        <>
          <button className="fixed inset-0 z-[55] bg-black/25 backdrop-blur-md" onClick={closeSearch} aria-label="Close search" />
          <div className="mu-pop fixed inset-x-0 z-[56] overflow-y-auto rounded-b-3xl bg-white px-4 pb-6 pt-2 lg:px-6" style={{ top: panelTop, maxHeight: `calc(100svh - ${panelTop}px)` }} role="dialog" aria-modal="true" aria-label="Search">
            <div className="flex items-center gap-3 lg:gap-5">
              <div className="flex h-12 flex-1 items-center rounded-full bg-neutral-100 px-5 lg:h-14 lg:px-6">
                <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search here...." className="h-full flex-1 bg-transparent text-[12px] outline-none focus:outline-none focus-visible:outline-none placeholder:text-neutral-400" />
                <IconSearch className="h-5 w-5 text-neutral-400" />
              </div>
              <button onClick={closeSearch} aria-label="Close search" className="p-2"><IconClose className="h-5 w-5" /></button>
            </div>
            <h2 className="mb-3 mt-6 text-[15px] font-semibold">{q.length > 1 ? "Products" : "Collections"}</h2>
            {q.length > 1 ? (
              results.length ? (
                <ul className="max-w-[640px]">
                  {results.map((p) => (
                    <li key={p.id} className="border-b border-neutral-300/70">
                      <Link href={`/products/${p.slug}`} onClick={closeSearch} className="flex items-center gap-4 py-1.5">
                        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100"><Image src={p.images[0].src} alt="" fill sizes="64px" className="object-cover" /></span>
                        <span><span className="block text-sm">{p.name}</span><span className="text-xs text-neutral-500">{formatPrice(p.price)}</span></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-neutral-500">No products found for “{query}”.</p>
            ) : <CollectionRows onPick={closeSearch} />}
          </div>
        </>
      )}

      {/* Menu drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
          <aside className="mu-pop absolute inset-y-0 left-0 flex w-[86%] max-w-[380px] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4">
              <Logo white={false} className="h-8" />
              <button onClick={() => setMenuOpen(false)} className={iconBtn} aria-label="Close menu"><IconClose className="h-5 w-5" /></button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 pb-8">
              <p className="mb-2 mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">Shop</p>
              <ul>{shopLinks.map((l) => <li key={l.href}><Link href={l.href} onClick={() => setMenuOpen(false)} className="block border-b border-neutral-200/70 py-3.5 text-[17px] font-medium tracking-tight">{l.label}</Link></li>)}</ul>
              <p className="mb-2 mt-8 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">Help</p>
              <ul className="space-y-2.5 text-sm text-neutral-700">{helpLinks.map((l) => <li key={l.href}><Link href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link></li>)}</ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Bag drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Bag">
          <button className="absolute inset-0 bg-black/45" onClick={() => setCartOpen(false)} aria-label="Close bag" />
          <aside className="mu-pop absolute inset-y-0 right-0 flex w-full max-w-[500px] flex-col bg-[#ece9e4] shadow-2xl">
            <div className="flex justify-end px-4 pt-4">
              <button onClick={() => setCartOpen(false)} className={iconBtn} aria-label="Close bag"><IconClose className="h-6 w-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-6">
              {items.length === 0 ? (
                <div className="pt-6">
                  <h2 className="text-[20px] font-semibold leading-tight tracking-tight">Your bag is empty!</h2>
                  <p className="text-sm text-neutral-700">Let&apos;s get started</p>
                  <Link href="/collections/all" onClick={() => setCartOpen(false)} className="mt-12 inline-block text-sm">Shop now ↗</Link>
                </div>
              ) : (
                <div>
                  <h2 className="text-[17px] font-semibold tracking-tight">Your bag ({cartCount})</h2>
                  {/* free-shipping progress */}
                  <div className="mt-3 rounded-2xl bg-white p-4">
                    <p className="text-[13px]">
                      {remaining > 0 ? <>You’re <span className="font-semibold">{formatPrice(remaining)}</span> away from free shipping</> : <span className="font-semibold">You’ve unlocked free shipping</span>}
                    </p>
                    <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Progress to free shipping">
                      <div className="h-full rounded-full bg-neutral-950 transition-[width] duration-500" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="mt-1.5 flex justify-between text-[10px] text-neutral-500"><span>{formatPrice(0)}</span><span>Free shipping {formatPrice(FREE_SHIPPING)}</span></div>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {items.map(({ item, product }) => (
                      <li key={item.productId + item.variantId} className="flex gap-3 rounded-2xl bg-white p-3">
                        <Link href={`/products/${product.slug}`} onClick={() => setCartOpen(false)} className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100"><Image src={product.images[0].src} alt="" fill sizes="80px" className="object-cover" /></Link>
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
                </div>
              )}

              <h3 className="mb-3 mt-10 text-[15px] font-semibold">Products you may like</h3>
              <ul className="grid grid-cols-5 gap-2">
                {mayLike.map((p) => (
                  <li key={p.id}>
                    <Link href={`/products/${p.slug}`} onClick={() => setCartOpen(false)} className="relative block aspect-[4/5] overflow-hidden rounded-md bg-neutral-200" aria-label={p.name}>
                      <Image src={p.images[0].src} alt={p.name} fill sizes="90px" className="object-cover" />
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="mb-2 mt-10 text-[15px] font-semibold">Collections</h3>
              <CollectionRows onPick={() => setCartOpen(false)} />
            </div>
            {items.length > 0 && (
              <div className="border-t border-neutral-300 bg-[#ece9e4] p-5">
                <div className="mb-1 flex justify-between text-sm"><span>Subtotal</span><span className="font-semibold">{formatPrice(cartTotal)}</span></div>
                <p className="mb-3 text-xs text-neutral-500">Shipping and taxes calculated at checkout.</p>
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
