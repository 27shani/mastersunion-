import Image from "next/image";
import { campus } from "@/data/home";

export default function VisitStore() {
  return (
    <section id="campus" className="mx-2 mb-3 mt-8 scroll-mt-24 lg:mx-3 lg:mt-14">
      <div className="grid overflow-hidden rounded-3xl bg-white lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
          <Image src={campus.img} alt="Master's Union campus" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-3 p-4 lg:gap-3 lg:p-12">
          <h2 className="text-[15px] font-semibold tracking-tight lg:text-[17px]">{campus.title}</h2>
          <address className="text-[12px] font-normal not-italic leading-relaxed text-neutral-600 lg:text-[13px]">
            {campus.address.map((l) => <span key={l} className="block">{l}</span>)}
          </address>
          <p className="text-[11px] text-neutral-500 lg:text-[12px]">{campus.hours}</p>
          <a href={campus.mapUrl} target="_blank" rel="noopener noreferrer" className="w-fit rounded-full bg-black px-5 py-2.5 text-[11px] font-medium text-white transition hover:bg-neutral-800 lg:px-6 lg:py-3 lg:text-[13px]">
            View on map
          </a>
        </div>
      </div>
    </section>
  );
}
