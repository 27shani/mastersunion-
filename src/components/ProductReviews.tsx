"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";
import { getReviews, ratingBreakdown } from "@/data/reviews";
import { cn } from "@/lib/utils";

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex", className)} aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={cn("h-3.5 w-3.5", i <= Math.round(value) ? "fill-neutral-950" : "fill-neutral-300")}><path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6L10 15l-5.3 3 1.1-6L1.4 7.8l6-.8z" /></svg>
      ))}
    </span>
  );
}

export default function ProductReviews({ product }: { product: Product }) {
  const reviews = getReviews(product);
  const [shown, setShown] = useState(3);
  const [writing, setWriting] = useState(false);
  const [sent, setSent] = useState(false);
  const [stars, setStars] = useState(5);
  const breakdown = ratingBreakdown(reviews);
  const avg = product.rating ?? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <section className="mx-2 mt-3 rounded-3xl bg-white p-4 lg:mx-6 lg:p-8" aria-labelledby="reviews-h">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-14">
        <div className="lg:w-64 lg:shrink-0">
          <h2 id="reviews-h" className="text-[15px] font-semibold lg:text-[18px]">Customer reviews</h2>
          <div className="mt-3 flex items-end gap-2"><span className="text-4xl font-semibold tracking-tight">{avg.toFixed(1)}</span><span className="pb-1 text-xs text-neutral-500">out of 5</span></div>
          <Stars value={avg} className="mt-1" />
          <p className="mt-1 text-xs text-neutral-500">Based on {product.reviewCount ?? reviews.length} reviews</p>
          <ul className="mt-4 space-y-1.5">
            {breakdown.map((b) => (
              <li key={b.star} className="flex items-center gap-2 text-[11px] text-neutral-600">
                <span className="w-3">{b.star}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-200"><span className="block h-full rounded-full bg-neutral-950" style={{ width: `${(b.count / reviews.length) * 100}%` }} /></span>
              </li>
            ))}
          </ul>
          <button onClick={() => { setWriting((w) => !w); setSent(false); }} className="mt-5 h-10 w-full rounded-full border border-neutral-950 text-[13px] font-medium">Write a review</button>
          <p className="mt-2 text-[10px] text-neutral-400">Sample reviews shown for demo.</p>
        </div>

        <div className="min-w-0 flex-1">
          {writing && (
            <div className="mu-pop mb-5 rounded-2xl bg-neutral-100 p-4">
              {sent ? <p className="text-sm">Thanks! Your review would be published after moderation (demo).</p> : (
                <div className="space-y-3">
                  <div className="flex gap-1" role="radiogroup" aria-label="Your rating">{[1, 2, 3, 4, 5].map((s) => <button key={s} onClick={() => setStars(s)} aria-label={`${s} stars`} className={cn("text-2xl leading-none", s <= stars ? "text-neutral-950" : "text-neutral-300")}>★</button>)}</div>
                  <input placeholder="Title" className="h-10 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-black" />
                  <textarea placeholder="Share your experience" rows={3} className="w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-black" />
                  <button onClick={() => setSent(true)} className="h-10 rounded-full bg-black px-6 text-[13px] font-medium text-white">Submit review</button>
                </div>
              )}
            </div>
          )}
          <ul className="divide-y divide-neutral-200">
            {reviews.slice(0, shown).map((r) => (
              <li key={r.id} className="py-5 first:pt-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold">{r.name[0]}</span>
                    <div><p className="text-[13px] font-medium">{r.name} <span className="font-normal text-neutral-500">· {r.city}</span></p>{r.verified && <p className="text-[10px] text-emerald-700">✓ Verified buyer</p>}</div>
                  </div>
                  <span className="text-[11px] text-neutral-400">{r.date}</span>
                </div>
                <Stars value={r.rating} className="mt-3" />
                <p className="mt-1.5 text-[13px] font-semibold">{r.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-neutral-600">{r.text}</p>
                {r.images.length > 0 && (
                  <div className="mt-3 flex gap-2">
                    {r.images.map((src, i) => <span key={i} className="relative h-20 w-20 overflow-hidden rounded-xl bg-neutral-100 lg:h-24 lg:w-24"><Image src={src} alt={`Photo from ${r.name}`} fill sizes="96px" className="object-cover" /></span>)}
                  </div>
                )}
              </li>
            ))}
          </ul>
          {shown < reviews.length && <button onClick={() => setShown(reviews.length)} className="mt-2 h-10 rounded-full border border-neutral-300 px-6 text-[13px] font-medium">Show all reviews</button>}
        </div>
      </div>
    </section>
  );
}
