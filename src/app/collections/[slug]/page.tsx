"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { collections, getProductsByCollection, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const filterChips = [
  { label: "View all", href: "/collections/all" },
  { label: "New", href: "/collections/new-arrivals" },
  { label: "Bestsellers", href: "/collections/bestsellers" },
  { label: "Apparel", href: "/collections/apparel-1" },
  { label: "Drinkware", href: "/collections/drinkware-1" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Originals", href: "/collections/union-originals" },
];

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const allProducts = getProductsByCollection(slug);
  const [sort, setSort] = useState("featured");

  const sorted = useMemo(() => {
    const list = [...allProducts];
    switch (sort) {
      case "price-asc": return list.sort((a, b) => a.price - b.price);
      case "price-desc": return list.sort((a, b) => b.price - a.price);
      case "newest": return list.filter((p) => p.newArrival).concat(list.filter((p) => !p.newArrival));
      default: return list;
    }
  }, [allProducts, sort]);

  // Hero image: first product of the collection (real store imagery)
  const heroImg = allProducts[0]?.images[0]?.src ?? "";

  return (
    <div className="bg-white min-h-screen">
      {/* Collection title + chips */}
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-[22px] font-semibold tracking-tight mb-3">{collection.name}</h1>

        {/* Horizontal filter chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          {filterChips.map((chip) => (
            <Link
              key={chip.href}
              href={chip.href}
              className={cn(
                "shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition",
                chip.href === `/collections/${slug}`
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-neutral-200 hover:border-neutral-400"
              )}
            >
              {chip.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Collection hero image */}
      <div className="px-3 mb-4">
        <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-neutral-100">
          <Image
            src={heroImg}
            alt={collection.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Sort + count */}
      <div className="px-4 flex items-center justify-between mb-3">
        <p className="text-[13px] text-neutral-500">{sorted.length} products</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-[13px] border border-neutral-200 rounded-full px-3 py-1.5 bg-white outline-none"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product grid — tight 2-col */}
      {sorted.length === 0 ? (
        <div className="py-20 text-center text-neutral-400 text-sm">No products in this collection.</div>
      ) : (
        <div className="px-3 grid grid-cols-2 gap-2.5 sm:gap-3.5 pb-8">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Collection description */}
      <div className="px-4 pb-6">
        <p className="text-[14px] font-medium leading-snug">
          {collection.description || `${collection.name} — designed for campus life and everyday ambition.`}
        </p>
        <button className="mt-1 text-[13px] text-neutral-500 underline">Read more...</button>
      </div>

      {/* Popular searches */}
      <div className="px-4 pb-10">
        <p className="text-[13px] font-semibold mb-2">Popular searches</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-neutral-500">
          <Link href="/collections/all" className="hover:text-black">Shop by category</Link>
          <Link href="/collections/new-arrivals" className="hover:text-black">Shop by style</Link>
          <Link href="/collections/accessories" className="hover:text-black">Shop by color</Link>
        </div>
      </div>
    </div>
  );
}
