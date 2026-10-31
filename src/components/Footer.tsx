"use client";

import { useState } from "react";
import Link from "next/link";
import { brand } from "@/data/home";

const cols = [
  { h: "Shop", l: [["All products", "/collections/all"], ["New arrivals", "/collections/new-arrivals"], ["Bestsellers", "/collections/bestsellers"], ["Apparel", "/collections/apparel-1"], ["Drinkware", "/collections/drinkware-1"], ["Bags & accessories", "/collections/accessories"], ["Union Originals", "/collections/union-originals"]] },
  { h: "Order support", l: [["Returns & exchanges", "/return-policy"], ["Shipping policy", "/shipping-policy"], ["Privacy policy", "/privacy-policy"], ["FAQ", "/faq"], ["Contact", "/contact"]] },
  { h: "We are Master's Union", l: [["Our story", "/about"], ["Campus store", "/#campus"], ["Wishlist", "/wishlist"], ["Terms & conditions", "https://shop.mastersunion.org/pages/terms-conditions"]] },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer className="bg-canvas px-2 pb-4 pt-3 lg:px-3">
      <div className="rounded-3xl bg-white p-6 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1fr_1.4fr] lg:gap-10">
          {cols.map((c) => (
            <nav key={c.h} aria-label={c.h}>
              <h3 className="mb-4 text-[14px] font-semibold">{c.h}</h3>
              <ul className="space-y-2.5 text-[13px] text-neutral-600">
                {c.l.map(([t, h]) => (
                  <li key={t}>{h.startsWith("http") ? <a href={h} target="_blank" rel="noopener noreferrer" className="hover:text-black">{t}</a> : <Link href={h} className="hover:text-black">{t}</Link>}</li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h3 className="mb-2 text-[14px] font-semibold">Newsletter</h3>
            <p className="text-[13px] text-neutral-600">Join to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            {done ? <p className="mt-3 text-sm text-emerald-700">You’re on the list. Thank you!</p> : (
              <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setDone(true); }} className="mt-3 flex gap-2">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" className="h-11 min-w-0 flex-1 rounded-full bg-neutral-100 px-4 text-sm outline-none focus:ring-1 focus:ring-black" />
                <button className="h-11 rounded-full bg-black px-5 text-[13px] font-medium text-white">Join</button>
              </form>
            )}
            <p className="mt-5 text-[12px] text-neutral-500">Need help? <a href={`mailto:${brand.email}`} className="underline">{brand.email}</a></p>
          </div>
        </div>
        <div className="mt-10 border-t border-neutral-200 pt-6 lg:mt-14">
          <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">Our promise</p>
          <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-neutral-700 lg:text-[15px]">{brand.promise}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brand.logoDark} alt="Master's Union" className="mt-8 h-9 w-auto opacity-80 lg:h-12" />
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-neutral-500 lg:text-right">© {new Date().getFullYear()} Master&apos;s Union Merch Store. All rights reserved.</p>
    </footer>
  );
}
