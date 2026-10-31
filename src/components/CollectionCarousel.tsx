import Link from "next/link";
import Image from "next/image";
import SnapCarousel from "./SnapCarousel";
import { megaTiles } from "@/data/home";

// Desktop: 3 collections per row. Mobile: 1 per row (centre card big, neighbours peek).
// Auto-advances every 3.5s; swipe, arrows and hover-pause give the visitor control.
export default function CollectionCarousel() {
  return (
    <SnapCarousel
      label="Collections"
      auto={3500}
      focus
      className="gap-3 px-[11vw] py-2 lg:px-0 lg:py-0"
    >
      {megaTiles.map((c) => (
        <li key={c.href} className="w-[78vw] shrink-0 snap-center lg:w-[calc((100%-24px)/3)]">
          <Link href={c.href} className="relative block aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 shadow-md lg:aspect-[4/5] lg:shadow-none">
            <Image src={c.img} alt="" fill sizes="(min-width:1024px) 33vw, 78vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <span className="absolute inset-x-0 bottom-4 text-center text-sm font-semibold text-white lg:text-base">{c.name}</span>
          </Link>
        </li>
      ))}
    </SnapCarousel>
  );
}
