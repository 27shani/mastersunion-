"use client";

// DUMMY support chat: scripted replies only. Replace with a real provider (Intercom, Gorgias, etc.) later.
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Msg = { from: "bot" | "me"; text: string };
const QUICK = ["Track my order", "Exchange or return", "Size help", "Shipping charges"];
const REPLIES: Record<string, string> = {
  "Track my order": "Share your order number (it starts with MU) and we’ll look it up. Demo: order #MU482193 is out for delivery.",
  "Exchange or return": "Size issue or a product concern? Exchanges are easy (subject to availability). Write to helpdesk@mastersunion.org with your order number.",
  "Size help": "Each product page lists a size chart. If you’re between sizes, the hoodies run relaxed, so size down for a closer fit.",
  "Shipping charges": "We ship pan-India. Shipping is free on orders above ₹1299, otherwise ₹79. Orders dispatch next day.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "Hi! I’m the Master’s Union store assistant. How can I help today?" }]);
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing, open]);

  const send = (t: string) => {
    const v = t.trim();
    if (!v) return;
    setMsgs((m) => [...m, { from: "me", text: v }]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: REPLIES[v] ?? "Thanks for reaching out! A teammate will reply here shortly. For urgent order help, email helpdesk@mastersunion.org." }]);
    }, 900);
  };

  return (
    <>
      {open && (
        <div className="mu-pop fixed bottom-24 right-3 z-[80] flex h-[min(520px,70svh)] w-[calc(100vw-1.5rem)] max-w-[360px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 sm:right-5" role="dialog" aria-label="Chat support">
          <div className="flex items-center justify-between bg-neutral-950 px-4 py-3 text-white">
            <div><p className="text-sm font-semibold">Master’s Union Support</p><p className="text-[11px] text-white/60">Typically replies in a few minutes</p></div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-xl leading-none">×</button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto bg-neutral-50 p-3">
            {msgs.map((m, i) => (
              <div key={i} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                <p className={cn("max-w-[82%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug", m.from === "me" ? "bg-black text-white" : "bg-white text-neutral-900 shadow-sm")}>{m.text}</p>
              </div>
            ))}
            {typing && <p className="text-xs text-neutral-400">Typing…</p>}
            {msgs.length === 1 && <div className="flex flex-wrap gap-1.5 pt-1">{QUICK.map((q) => <button key={q} onClick={() => send(q)} className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs">{q}</button>)}</div>}
            <div ref={end} />
          </div>
          <div className="flex items-center gap-2 border-t border-neutral-200 p-2.5">
            <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(text)} placeholder="Type a message…" className="h-10 flex-1 rounded-full bg-neutral-100 px-4 text-sm outline-none" />
            <button onClick={() => send(text)} className="h-10 rounded-full bg-black px-4 text-sm font-medium text-white">Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Close chat" : "Open chat"} aria-expanded={open} className="fixed bottom-5 right-3 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-neutral-950 text-white shadow-xl transition hover:scale-105 sm:right-5">
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" /></svg>
      </button>
    </>
  );
}
