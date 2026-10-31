"use client";

import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { IconHeart, IconPlus } from "./Icons";
import { cn } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const inWishlist = isInWishlist(product.id);
  const primary = product.images[0];
  const secondary = product.images[1];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const firstAvailable = product.variants.find((v) => v.available);
    if (firstAvailable) {
      addToCart(product.id, firstAvailable.id, 1);
    }
  };

  return (
    <div className="product-card group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[2/3] lg:aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100">
          {primary && (
            <Image
              src={primary.src}
              alt={primary.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className={cn(
                "primary-image object-cover",
                secondary && "group-hover:opacity-0"
              )}
            />
          )}
          {secondary && (
            <Image
              src={secondary.src}
              alt={secondary.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="secondary-image absolute inset-0 object-cover"
            />
          )}

          {/* Bookmark / Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute top-1 right-1 lg:top-2.5 lg:right-2.5 z-10 p-1.5"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <IconHeart
              className={cn("w-4 h-4 lg:w-5 lg:h-5 drop-shadow-sm", inWishlist ? "text-black" : "text-black/80")}
              filled={inWishlist}
            />
          </button>

          {!product.available && (
            <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
              <span className="text-xs font-medium uppercase tracking-wide">Sold Out</span>
            </div>
          )}
        </div>
      </Link>

      {/* Name + Price + Add */}
      <div className="mt-1.5 lg:mt-2.5 flex items-start justify-between gap-1 px-0.5">
        <div className="min-w-0 flex-1">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-[11px] lg:text-[13px] font-medium leading-snug tracking-tight text-foreground line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="mt-0.5 text-[11px] lg:text-[13px] text-neutral-600 lg:text-foreground">
            {formatPrice(product.price)}
          </p>
        </div>
        <button
          onClick={handleQuickAdd}
          className="shrink-0 w-6 h-6 lg:w-7 lg:h-7 flex items-center justify-center text-foreground hover:opacity-60 transition mt-0.5"
          aria-label="Add to bag"
        >
          <IconPlus className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
        </button>
      </div>
    </div>
  );
}
