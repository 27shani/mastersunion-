import Link from "next/link";
import Image from "next/image";
import { brand } from "@/data/home";
import { products } from "@/data/products";

// TODO: confirm phone/WhatsApp and social URLs.
const cols = [
  { h: "Connect with us", l: [["Call", "/contact"], ["Text (WhatsApp)", "/contact"], ["Instagram", "https://www.instagram.com/mastersunion/"], ["YouTube", "https://www.youtube.com/@mastersunion"], ["LinkedIn", "https://www.linkedin.com/school/masters-union/"]] },
  { h: "Order Support", l: [["Make a return/Exchange", "/return-policy"], ["Refund/Exchange policy", "/return-policy"], ["Track your order", "/contact"], ["Shipping policy", "/shipping-policy"], ["FAQ's", "/faq"], ["Terms", "https://shop.mastersunion.org/pages/terms-conditions"]] },
  { h: "We are Master's Union", l: [["Our story", "/about"], ["Campus store", "/#campus"], ["Collaborations", "/contact"], ["Privacy policy", "/privacy-policy"], ["Contact", "/contact"]] },
];

export default function Footer() {
  const bag = products.find((p) => p.slug === "okami-voyager-pack")!;
  return (
    <footer className="bg-canvas px-2 pb-4 pt-3 lg:px-3">
      <div className="rounded-3xl bg-white px-6 py-10 lg:px-16 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1fr_1.5fr]">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-3 lg:grid-cols-3">
            {cols.map((c) => (
              <nav key={c.h} aria-label={c.h}>
                <h3 className="mb-5 text-[15px] font-semibold">{c.h}</h3>
                <ul className="space-y-3.5 text-[13px] text-neutral-600">
                  {c.l.map(([t, h]) => (
                    <li key={t}>{h.startsWith("http") ? <a href={h} target="_blank" rel="noopener noreferrer" className="hover:text-black">{t}</a> : <Link href={h} className="hover:text-black">{t}</Link>}</li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          {/* brand mark + bag */}
          <div className="flex items-center justify-between gap-4 lg:justify-end lg:gap-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.logoDark} alt="Master's Union" className="h-14 w-auto opacity-70 lg:h-20" />
            <span className="relative hidden aspect-[4/5] w-36 overflow-hidden rounded-2xl bg-neutral-100 sm:block lg:w-44">
              <Image src={bag.images[0].src} alt="" fill sizes="180px" className="object-cover" />
            </span>
          </div>
        </div>
        <p className="mt-10 text-right text-[10px] uppercase tracking-wide text-neutral-500 lg:mt-6">© {new Date().getFullYear()} Master&apos;s Union Merch Store, all rights reserved</p>
      </div>
    </footer>
  );
}
