"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

export type DirectItem = { productId: string; variantId: string; quantity: number };

type Ctx = {
  isOpen: boolean;
  direct: DirectItem | null;
  openCheckout: (direct?: DirectItem) => void; // no argument = check out the whole bag
  closeCheckout: () => void;
};

const CheckoutContext = createContext<Ctx | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [direct, setDirect] = useState<DirectItem | null>(null);
  const openCheckout = useCallback((d?: DirectItem) => { setDirect(d ?? null); setOpen(true); }, []);
  const closeCheckout = useCallback(() => setOpen(false), []);
  return <CheckoutContext.Provider value={{ isOpen, direct, openCheckout, closeCheckout }}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const c = useContext(CheckoutContext);
  if (!c) throw new Error("useCheckout must be used within CheckoutProvider");
  return c;
}
