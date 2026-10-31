import Link from "next/link";
import Image from "next/image";
import { collections, getProductsByCollection, products } from "@/data/products";

const imageFor = (slug: string) => getProductsByCollection(slug)[0]?.images[0]?.src ?? products[0].images[0].src;

export default function CollectionsIndex() {
  return (
    <div className="bg-canvas min-h-screen px-4 py-8">
      <h1 className="text-[22px] font-semibold tracking-tight mb-6">Collections</h1>
      <div className="space-y-3">
        {collections.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            className="flex items-center gap-3 py-2"
          >
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
              <Image
                src={imageFor(c.slug)}
                alt={c.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div>
              <p className="text-[15px] font-medium">{c.name}</p>
              <p className="text-[12px] text-neutral-500 mt-0.5 line-clamp-1">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
