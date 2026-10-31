"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { IconHeart } from "@/components/Icons";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
          <IconHeart className="w-7 h-7 text-muted" />
        </div>
        <h1 className="text-2xl font-semibold mb-2">Save things as you browse</h1>
        <p className="text-muted mb-8 max-w-sm mx-auto">Tap the heart on any product. It lands here so you don&apos;t lose it.</p>
        <Link href="/collections/all" className="btn btn-primary px-8 h-12 rounded-full text-sm font-medium inline-flex items-center">
          Keep browsing
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <h1 className="text-2xl font-semibold mb-8">Wishlist ({items.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
