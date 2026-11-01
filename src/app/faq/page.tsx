"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "How long does shipping take?", a: "Orders are packed within 24 hours and typically delivered within 3–7 business days across India." },
  { q: "What is the return policy?", a: "We accept returns within 7 days of delivery for unused items in original packaging. Size exchanges are subject to availability." },
  { q: "Do you ship internationally?", a: "Currently we ship pan-India only. International shipping will be announced soon." },
  { q: "How do I track my order?", a: "You will receive a tracking link via email once your order ships." },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-14">
      <h1 className="text-[20px] lg:text-[24px] font-semibold tracking-tight mb-10">FAQ</h1>
      <div className="space-y-2">
        {faqs.map((f, i) => (
          <div key={i} className="border border-border rounded-xl overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium">
              {f.q}
              <span className="text-[16px] leading-none">{open === i ? "−" : "+"}</span>
            </button>
            <div className={cn("px-5 text-sm text-muted overflow-hidden transition-all", open === i ? "pb-4 max-h-40" : "max-h-0")}>
              {f.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
