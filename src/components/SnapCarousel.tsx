"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode; // <li> items
  label: string;
  className?: string; // classes for the scroll list (padding, gap, grid overrides)
  auto?: number; // auto-advance every N ms (0 = off). Pauses on hover/touch, off for reduced motion.
  focus?: boolean; // mobile "cover-flow": centre item big, neighbours smaller/dimmer
  arrowClass?: string; // visibility classes for the prev/next buttons
};

export default function SnapCarousel({ children, label, className = "", auto = 0, focus = false, arrowClass = "flex" }: Props) {
  const ref = useRef<HTMLUListElement>(null);
  const hovering = useRef(false);
  const pausedUntil = useRef(0);

  const step = useCallback((dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    if (!items.length) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let idx = 0;
    let best = Infinity;
    items.forEach((it, i) => {
      const d = Math.abs(it.offsetLeft + it.offsetWidth / 2 - mid);
      if (d < best) { best = d; idx = i; }
    });
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const atStart = el.scrollLeft <= 4;
    if (dir === 1 && atEnd) return el.scrollTo({ left: 0, behavior: "smooth" });
    if (dir === -1 && atStart) return el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    const t = items[Math.min(items.length - 1, Math.max(0, idx + dir))];
    el.scrollTo({ left: t.offsetLeft - (el.clientWidth - t.offsetWidth) / 2, behavior: "smooth" });
  }, []);

  // auto-advance
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (hovering.current || document.hidden || Date.now() < pausedUntil.current) return;
      step(1);
    }, auto);
    return () => clearInterval(id);
  }, [auto, step]);

  // cover-flow scaling (below lg only)
  useEffect(() => {
    const el = ref.current;
    if (!el || !focus) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    const apply = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      (Array.from(el.children) as HTMLElement[]).forEach((it) => {
        if (mq.matches) { it.style.transform = ""; it.style.opacity = ""; return; }
        const d = Math.min(1, Math.abs(it.offsetLeft + it.offsetWidth / 2 - mid) / el.clientWidth);
        it.style.transform = `scale(${1 - d * 0.22})`;
        it.style.opacity = String(1 - d * 0.5);
      });
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(apply); };
    apply();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [focus]);

  const userTouched = () => { pausedUntil.current = Date.now() + 6000; };
  const btn = "absolute top-1/2 z-10 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow-md hover:bg-white";

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      onFocus={() => (hovering.current = true)}
      onBlur={() => (hovering.current = false)}
    >
      <ul
        ref={ref}
        onTouchStart={userTouched}
        onWheel={userTouched}
        onPointerDown={userTouched}
        className={`no-scrollbar relative flex snap-x snap-mandatory overflow-x-auto scroll-smooth ${className}`}
      >
        {children}
      </ul>
      <button type="button" aria-label={`Previous ${label}`} onClick={() => { userTouched(); step(-1); }} className={`${btn} left-2 ${arrowClass}`}>‹</button>
      <button type="button" aria-label={`Next ${label}`} onClick={() => { userTouched(); step(1); }} className={`${btn} right-2 ${arrowClass}`}>›</button>
    </div>
  );
}
