"use client";

// DUMMY checkout flow modelled on GoKwik's one-tap experience: returning-customer phone + OTP are
// prefilled, a saved address is preselected, then payment, a mock "processing" screen and confirmation.
// No real payment, OTP or order is created anywhere.

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { useCheckout } from "@/context/CheckoutContext";
import { products, formatPrice } from "@/data/products";
import { IconClose } from "./Icons";
import { cn } from "@/lib/utils";

type Step = "verify" | "address" | "payment" | "processing" | "success";
const STEPS: Step[] = ["verify", "address", "payment"];

const CUSTOMER = { name: "Aarav Sharma", phone: "98765 43210", email: "aarav.sharma@example.com", otp: "4821" };
const ADDRESSES = [
  { id: "a1", tag: "Hostel", line: "Room 214, Block B, Masters' Union Campus", city: "Gurugram, Haryana 122101" },
  { id: "a2", tag: "Home", line: "B-42, Sector 21, Dwarka", city: "New Delhi 110075" },
];
const METHODS = [
  { id: "upi", label: "UPI", sub: "Google Pay, PhonePe, Paytm" },
  { id: "card", label: "Credit / Debit card", sub: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Netbanking", sub: "All major banks" },
  { id: "cod", label: "Cash on delivery", sub: "Pay when it arrives (+₹50)" },
];

export default function CheckoutSheet() {
  const { isOpen, direct, closeCheckout } = useCheckout();
  const { getCartProducts, clearCart } = useStore();
  const [step, setStep] = useState<Step>("verify");
  const [verified, setVerified] = useState(false);
  const [addr, setAddr] = useState("a1");
  const [method, setMethod] = useState("upi");
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const [procMsg, setProcMsg] = useState("Contacting your bank…");
  const [orderId, setOrderId] = useState("");

  // reset whenever the sheet opens
  useEffect(() => {
    if (!isOpen) return;
    setStep("verify"); setVerified(false); setAddr("a1"); setMethod("upi"); setCoupon(""); setApplied(false);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && isOpen && step !== "processing" && closeCheckout();
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [isOpen, step, closeCheckout]);

  // one-tap: auto-verify the prefilled OTP shortly after the step appears
  useEffect(() => {
    if (!isOpen || step !== "verify") return;
    const t = setTimeout(() => setVerified(true), 1400);
    return () => clearTimeout(t);
  }, [isOpen, step]);

  const lines = useMemo(() => {
    if (!isOpen) return [];
    if (direct) {
      const p = products.find((x) => x.id === direct.productId);
      const v = p?.variants.find((x) => x.id === direct.variantId);
      return p ? [{ product: p, size: v?.size, qty: direct.quantity }] : [];
    }
    return getCartProducts().map(({ item, product }) => ({ product, size: item.size, qty: item.quantity }));
  }, [isOpen, direct, getCartProducts]);

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const discount = applied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal - discount >= 1299 || subtotal === 0 ? 0 : 79;
  const cod = method === "cod" ? 50 : 0;
  const total = subtotal - discount + shipping + cod;

  const pay = () => {
    setStep("processing");
    setProcMsg("Contacting your bank…");
    setTimeout(() => setProcMsg("Authorising payment…"), 1100);
    setTimeout(() => setProcMsg("Confirming your order…"), 2200);
    setTimeout(() => {
      setOrderId("MU" + Math.floor(100000 + Math.random() * 900000));
      if (!direct) clearCart();
      setStep("success");
    }, 3300);
  };

  if (!isOpen) return null;
  const chosen = ADDRESSES.find((a) => a.id === addr)!;
  const idx = STEPS.indexOf(step);

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label="Checkout">
      <button className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => step !== "processing" && closeCheckout()} aria-label="Close checkout" />
      <div className="mu-pop relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-[460px] sm:rounded-3xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">Secure checkout</p>
            <h2 className="text-[15px] font-semibold">{step === "success" ? "Order confirmed" : step === "processing" ? "Processing" : step === "verify" ? "Welcome back" : step === "address" ? "Delivery details" : "Payment"}</h2>
          </div>
          {step !== "processing" && <button onClick={closeCheckout} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100" aria-label="Close"><IconClose className="h-5 w-5" /></button>}
        </div>
        {idx >= 0 && (
          <div className="flex gap-1.5 px-5 pt-3" aria-hidden>
            {STEPS.map((s, i) => <span key={s} className={cn("h-1 flex-1 rounded-full", i <= idx ? "bg-black" : "bg-neutral-200")} />)}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 && step !== "success" ? (
            <p className="py-12 text-center text-sm text-neutral-500">Your bag is empty.</p>
          ) : step === "verify" ? (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">We found your saved details, so checkout takes one tap.</p>
              <label className="block">
                <span className="text-xs text-neutral-500">Mobile number</span>
                <div className="mt-1 flex h-12 items-center rounded-xl border border-neutral-300 px-3 text-sm"><span className="mr-2 text-neutral-500">+91</span>{CUSTOMER.phone}</div>
              </label>
              <div>
                <span className="text-xs text-neutral-500">One-time password</span>
                <div className="mt-1 flex gap-2">
                  {CUSTOMER.otp.split("").map((d, i) => <span key={i} className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-300 text-lg font-semibold">{d}</span>)}
                </div>
                <p className={cn("mt-2 text-xs", verified ? "text-emerald-700" : "text-neutral-500")}>{verified ? `✓ Verified — hi ${CUSTOMER.name.split(" ")[0]}!` : "Auto-filling OTP…"}</p>
              </div>
              <p className="text-[11px] text-neutral-400">Demo only: no real OTP is sent.</p>
            </div>
          ) : step === "address" ? (
            <div className="space-y-4">
              <ul className="space-y-2">
                {ADDRESSES.map((a) => (
                  <li key={a.id}>
                    <button onClick={() => setAddr(a.id)} className={cn("flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition", addr === a.id ? "border-black bg-neutral-50" : "border-neutral-200")}>
                      <span className={cn("mt-0.5 h-4 w-4 shrink-0 rounded-full border", addr === a.id ? "border-[5px] border-black" : "border-neutral-400")} />
                      <span className="text-sm"><span className="block font-medium">{CUSTOMER.name} · <span className="text-neutral-500">{a.tag}</span></span>{a.line}<br />{a.city}<br /><span className="text-xs text-neutral-500">+91 {CUSTOMER.phone}</span></span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl bg-neutral-100 p-3.5 text-sm"><p className="font-medium">Standard delivery</p><p className="text-xs text-neutral-600">Dispatches next day · arrives in 3–5 working days</p></div>
              <p className="text-xs text-neutral-500">Order updates go to {CUSTOMER.email}</p>
            </div>
          ) : step === "payment" ? (
            <div className="space-y-4">
              <ul className="space-y-2">
                {METHODS.map((m) => (
                  <li key={m.id}>
                    <button onClick={() => setMethod(m.id)} className={cn("flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition", method === m.id ? "border-black bg-neutral-50" : "border-neutral-200")}>
                      <span className={cn("h-4 w-4 shrink-0 rounded-full border", method === m.id ? "border-[5px] border-black" : "border-neutral-400")} />
                      <span className="text-sm"><span className="block font-medium">{m.label}</span><span className="text-xs text-neutral-500">{m.sub}</span></span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code (try UNION10)" className="h-11 flex-1 rounded-xl border border-neutral-300 px-3 text-sm outline-none focus:border-black" />
                <button onClick={() => setApplied(coupon.trim().toUpperCase() === "UNION10")} className="h-11 rounded-xl border border-black px-4 text-sm font-medium">Apply</button>
              </div>
              {applied && <p className="text-xs text-emerald-700">UNION10 applied — 10% off.</p>}
              <div className="space-y-1.5 rounded-2xl bg-neutral-100 p-3.5 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                {discount > 0 && <div className="flex justify-between text-emerald-700"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
                <div className="flex justify-between"><span>Shipping</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></div>
                {cod > 0 && <div className="flex justify-between"><span>COD fee</span><span>{formatPrice(cod)}</span></div>}
                <div className="flex justify-between border-t border-neutral-300 pt-2 text-[15px] font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
              </div>
            </div>
          ) : step === "processing" ? (
            <div className="flex flex-col items-center py-16 text-center">
              <span className="h-12 w-12 animate-spin rounded-full border-[3px] border-neutral-200 border-t-black" />
              <p className="mt-6 text-sm font-medium">{procMsg}</p>
              <p className="mt-1 text-xs text-neutral-500">Please don’t close this window.</p>
            </div>
          ) : (
            <div className="py-4 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white"><svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
              <h3 className="mt-4 text-[18px] font-semibold">Thank you, {CUSTOMER.name.split(" ")[0]}!</h3>
              <p className="mt-1 text-sm text-neutral-600">Order <span className="font-semibold text-black">#{orderId}</span> is confirmed.</p>
              <p className="mt-1 text-xs text-neutral-500">A confirmation was sent to {CUSTOMER.email} (demo).</p>
              <div className="mt-5 rounded-2xl bg-neutral-100 p-4 text-left text-sm">
                <p className="font-medium">Delivering to</p>
                <p className="text-neutral-600">{chosen.line}, {chosen.city}</p>
                <p className="mt-2 text-xs text-neutral-500">Estimated delivery in 3–5 working days.</p>
              </div>
              <p className="mt-4 text-xs text-neutral-400">This was a demo checkout. No payment was taken.</p>
            </div>
          )}
        </div>

        {/* footer with order summary + CTA */}
        {step !== "processing" && (
          <div className="border-t border-neutral-200 bg-white px-5 pb-5 pt-3">
            {step !== "success" && lines.length > 0 && (
              <div className="mb-3 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {lines.slice(0, 3).map((l) => <span key={l.product.id} className="relative h-10 w-9 overflow-hidden rounded-lg border-2 border-white bg-neutral-100"><Image src={l.product.images[0].src} alt="" fill sizes="40px" className="object-cover" /></span>)}
                </div>
                <p className="flex-1 text-xs text-neutral-600">{lines.reduce((s, l) => s + l.qty, 0)} item(s)</p>
                <p className="text-sm font-semibold">{formatPrice(total)}</p>
              </div>
            )}
            {step === "verify" && <button disabled={!verified} onClick={() => setStep("address")} className="h-12 w-full rounded-full bg-black text-sm font-semibold text-white disabled:opacity-40">{verified ? "Continue" : "Verifying…"}</button>}
            {step === "address" && <div className="flex gap-2"><button onClick={() => setStep("verify")} className="h-12 rounded-full border border-neutral-300 px-5 text-sm font-medium">Back</button><button onClick={() => setStep("payment")} className="h-12 flex-1 rounded-full bg-black text-sm font-semibold text-white">Deliver here</button></div>}
            {step === "payment" && <div className="flex gap-2"><button onClick={() => setStep("address")} className="h-12 rounded-full border border-neutral-300 px-5 text-sm font-medium">Back</button><button onClick={pay} className="h-12 flex-1 rounded-full bg-black text-sm font-semibold text-white">{method === "cod" ? "Place order" : `Pay ${formatPrice(total)}`}</button></div>}
            {step === "success" && <button onClick={closeCheckout} className="h-12 w-full rounded-full bg-black text-sm font-semibold text-white">Continue shopping</button>}
          </div>
        )}
      </div>
    </div>
  );
}
