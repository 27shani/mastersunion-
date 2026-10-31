import Image from "next/image";
import { everyMove, droppingSoon, services } from "@/data/home";

// "Merch for Your Every Move" — three editorial cards (content from shop.mastersunion.org)
export function EveryMove() {
  return (
    <section className="mx-2 mt-3 rounded-3xl bg-white p-4 lg:mx-3 lg:p-10" aria-labelledby="move-h">
      <h2 id="move-h" className="text-xl font-semibold tracking-tight lg:text-4xl">{everyMove.title}</h2>
      <p className="mt-1.5 max-w-xl text-[13px] text-neutral-600 lg:mt-3 lg:text-base">{everyMove.intro}</p>
      <ol className="mt-5 grid gap-3 lg:mt-8 lg:grid-cols-3 lg:gap-5">
        {everyMove.items.map((it) => (
          <li key={it.n} className="group overflow-hidden rounded-2xl bg-neutral-100">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[4/5]">
              <Image src={it.img} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
              <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-medium backdrop-blur">{it.n}</span>
            </div>
            <div className="p-4">
              <h3 className="text-[15px] font-semibold lg:text-lg">{it.title}</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-neutral-600 lg:text-sm">{it.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// "Dropping soon" teaser grid
export function DroppingSoon() {
  return (
    <section className="mx-2 mt-5 lg:mx-3 lg:px-3" aria-labelledby="soon-h">
      <div className="mb-3 flex items-center gap-2 px-1 lg:mb-4">
        <h2 id="soon-h" className="text-[15px] font-semibold tracking-tight lg:text-[17px]">Dropping soon</h2>
        <span className="rounded-full bg-black px-2 py-0.5 text-[10px] font-medium text-white">Coming</span>
      </div>
      <ul className="grid grid-cols-3 gap-2 lg:grid-cols-6 lg:gap-4">
        {droppingSoon.map((d) => (
          <li key={d.name} className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
            <Image src={d.img} alt={d.name} fill sizes="(min-width:1024px) 16vw, 33vw" className="object-cover" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-2 text-[10px] font-medium text-white lg:p-3 lg:text-xs">{d.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Easy exchanges / pan-India shipping / need help
export function ServiceStrip() {
  return (
    <section className="mx-2 mb-3 grid gap-px overflow-hidden rounded-3xl bg-neutral-200 lg:mx-3 lg:grid-cols-3" aria-label="Store services">
      {services.map((s) => (
        <div key={s.title} className="bg-white p-5 lg:p-8">
          <h3 className="text-[14px] font-semibold lg:text-base">{s.title}</h3>
          <p className="mt-1 text-[12px] leading-relaxed text-neutral-600 lg:text-sm">{s.text}</p>
        </div>
      ))}
    </section>
  );
}
