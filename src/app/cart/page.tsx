"use client";

import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { useCheckout } from "@/context/CheckoutContext";
import { formatPrice } from "@/data/products";
import { IconPlus, IconMinus, IconClose } from "@/components/Icons";

export default function CartPage() {
  const { getCartProducts, updateQuantity, removeFromCart, cartTotal, cartCount, clearCart } = useStore();
  const { openCheckout } = useCheckout();
  const items = getCartProducts();

  if (cartCount === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-2">Your bag is empty</h1>
        <p className="text-muted mb-8">Let&apos;s get started</p>
        <Link href="/collections/all" className="btn btn-primary px-8 h-12 rounded-full text-sm font-medium inline-flex items-center">
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14">
      <h1 className="text-2xl font-semibold mb-8">Your bag ({cartCount})</h1>
      <div className="space-y-6">
        {items.map(({ item, product }) => (
          <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 border-b border-border pb-6">
            <div className="relative w-24 h-28 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
              <Image src={product.images[0]?.src} alt={product.name} fill className="object-cover" sizes="96px" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between gap-2">
                <div>
                  <Link href={`/products/${product.slug}`} className="font-medium text-sm hover:underline">{product.name}</Link>
                  {item.size && <p className="text-xs text-muted mt-0.5">Size: {item.size}</p>}
                </div>
                <button onClick={() => removeFromCart(item.productId, item.variantId)} className="p-1 text-muted hover:text-foreground" aria-label="Remove">
                  <IconClose className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center border border-border rounded-full">
                  <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center"><IconMinus className="w-3 h-3" /></button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center"><IconPlus className="w-3 h-3" /></button>
                </div>
                <span className="font-medium text-sm">{formatPrice(product.price * item.quantity)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <div className="flex justify-between text-lg font-semibold mb-6">
          <span>Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <p className="text-xs text-muted mb-6">Shipping & taxes calculated at checkout. Demo checkout — payment is not connected.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => openCheckout()} className="btn btn-primary flex-1 h-12 rounded-full text-sm font-medium">Proceed to Checkout</button>
          <button onClick={clearCart} className="btn btn-outline flex-1 h-12 rounded-full text-sm font-medium">Clear bag</button>
        </div>
      </div>
    </div>
  );
}
