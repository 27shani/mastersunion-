"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { products, Product } from "@/data/products";

export type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;
  size?: string;
  color?: string;
};

type StoreContextType = {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  addToCart: (productId: string, variantId: string, quantity?: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addRecentlyViewed: (productId: string) => void;
  cartCount: number;
  cartTotal: number;
  getCartProducts: () => { item: CartItem; product: Product }[];
};

const StoreContext = createContext<StoreContextType | null>(null);

const CART_KEY = "mu_cart";
const WISHLIST_KEY = "mu_wishlist";
const RECENT_KEY = "mu_recent";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISHLIST_KEY);
      const r = localStorage.getItem(RECENT_KEY);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
      if (r) setRecentlyViewed(JSON.parse(r));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed, hydrated]);

  const addToCart = useCallback((productId: string, variantId: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.variantId === variantId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.variantId === variantId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      const product = products.find((p) => p.id === productId);
      const variant = product?.variants.find((v) => v.id === variantId);
      return [
        ...prev,
        {
          productId,
          variantId,
          quantity,
          size: variant?.size,
          color: variant?.color,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, variantId: string) => {
    setCart((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
  }, []);

  const updateQuantity = useCallback((productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const addRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const cartTotal = cart.reduce((sum, i) => {
    const product = products.find((p) => p.id === i.productId);
    return sum + (product?.price || 0) * i.quantity;
  }, 0);

  const getCartProducts = useCallback(() => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? { item, product } : null;
      })
      .filter(Boolean) as { item: CartItem; product: Product }[];
  }, [cart]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        recentlyViewed,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addRecentlyViewed,
        cartCount,
        cartTotal,
        getCartProducts,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}