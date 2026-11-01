import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import CollectionCarousel from "@/components/CollectionCarousel";
import ShopByLook from "@/components/ShopByLook";
import VisitStore from "@/components/VisitStore";
import { EveryMove, DroppingSoon } from "@/components/StoreExtras";
import { heroImage } from "@/data/home";
import { products, getProductsByCollection } from "@/data/products";

function SectionHead({ title, href, dark }: { title: string; href: string; dark?: boolean }) {
  return (
    <div className="mb-3 flex items-center justify-between px-1 lg:mb-4">
      <h2 className="text-[15px] font-semibold tracking-tight lg:text-[17px]">{title}</h2>
      <Link
        href={href}
        className={`rounded-full px-3 py-1 text-[11px] font-medium transition lg:px-3.5 lg:py-1.5 lg:text-[13px] ${
          dark ? "bg-black text-white hover:bg-neutral-800" : "bg-white hover:bg-neutral-200"
        }`}
      >
        Discover more
      </Link>
    </div>
  );
}

// White rounded section on the grey page (the section is round, the product cards are not)
const PANEL = "mx-2 mt-3 rounded-3xl bg-white p-3 lg:mx-3 lg:p-6";
// 2 per row (2x2) on mobile, 4 per row on desktop; tight gaps so images stay big
const GRID = "grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4";

export default function HomePage() {
  const latest = getProductsByCollection("new-arrivals").slice(0, 4);
  const featured = getProductsByCollection("bestsellers").slice(0, 4);
  const accessories = getProductsByCollection("accessories").slice(0, 4);

  return (
    <div className="bg-canvas">
      {/* HERO — fits the screen height on desktop */}
      <section className="relative -mt-14 w-full aspect-[3/4] sm:aspect-[16/10] max-h-[88vh] lg:-mt-20 lg:aspect-auto lg:max-h-none lg:h-[100svh] overflow-hidden bg-neutral-900">
        <Image
          src={heroImage}
          alt="Master's Union merchandise"
          fill
          priority
          className="object-cover object-[52%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-10 sm:pb-14 lg:pb-12">
          <Link href="/collections/all" className="border-b border-white pb-0.5 text-[14px] font-medium tracking-wide text-white lg:text-[15px]">
            Shop now
          </Link>
        </div>
      </section>

      {/* LATEST DROP — sits directly on the grey page */}
      <section className="mx-2 mt-3 lg:mx-3 lg:mt-6 lg:px-3">
        <SectionHead title="Latest drop" href="/collections/new-arrivals" />
        <div className={GRID}>{latest.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      {/* FEATURED MERCHANDISE */}
      <section className={`${PANEL} mt-5`}>
        <SectionHead title="Featured merchandise" href="/collections/bestsellers" dark />
        <div className={GRID}>{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      {/* COLLECTIONS — auto-scrolling, 3 per row desktop / 1 per row mobile */}
      <section className="mx-2 mt-5 lg:mx-3 lg:px-3">
        <SectionHead title="Shop by collection" href="/collections/all" />
        <CollectionCarousel />
      </section>

      {/* SHOP BY LOOK */}
      <section className={PANEL}>
        <ShopByLook />
      </section>

      {/* ACCESSORIES */}
      <section className="mx-2 mt-5 lg:mx-3 lg:px-3">
        <SectionHead title="Accessories" href="/collections/accessories" dark />
        <div className={GRID}>{accessories.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <EveryMove />
      <DroppingSoon />

      {/* VISIT THE STORE AT CAMPUS */}
      <VisitStore />
    </div>
  );
}
