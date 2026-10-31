import Image from "next/image";
import { campus } from "@/data/home";

export default function VisitStore() {
  return (
    <section id="campus" className="mx-2 mt-3 mb-3 scroll-mt-24 lg:mx-3">
      <div className="grid overflow-hidden rounded-3xl bg-white lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
          <Image src={campus.img} alt="Master's Union campus" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-3 p-5 lg:gap-4 lg:p-14">
          <h2 className="text-lg font-semibold tracking-tight lg:text-3xl">{campus.title}</h2>
          <address className="text-[13px] not-italic leading-relaxed text-neutral-700 lg:text-base">
            {campus.address.map((l) => <span key={l} className="block">{l}</span>)}
          </address>
          <p className="text-xs text-neutral-500 lg:text-sm">{campus.hours}</p>
          <a href={campus.mapUrl} target="_blank" rel="noopener noreferrer" className="w-fit rounded-full bg-black px-5 py-2.5 text-xs font-medium text-white transition hover:bg-neutral-800 lg:px-6 lg:py-3 lg:text-sm">
            View on map
          </a>
        </div>
      </div>
    </section>
  );
}
