"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, Send } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart } = useShop();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, setIsCartOpen]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.product.name} (Qty: ${item.quantity}) - ${formatPrice(
            item.product.price * item.quantity
          )}`
      )
      .join("\n");

    const message = `Hello K.N.R E-Sevai! I would like to place an order for the following items:\n\n${itemsText}\n\n*Total Items:* ${totalItems}\n*Total Price:* ${formatPrice(
      totalPrice
    )}\n\nPlease let me know availability and payment details. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919884270833?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Slide-over Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl sm:max-w-md border-l border-gray-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-ink">Shopping Cart</h2>
                {totalItems > 0 && (
                  <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-ink">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-ink transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Items list */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <div className="rounded-full bg-gray-50 p-6 mb-4">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-base font-semibold text-ink">Your cart is empty</h3>
                  <p className="mt-1 text-sm text-gray-500 max-w-xs">
                    Browse our collection of stationery and services and add some items to your order.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
                    style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.product.id}
                    className="flex gap-4 border border-gray-100 rounded-lg p-3 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                  >
                    {/* Item Image */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-white border border-gray-200">
                      {item.product.imageUrl ? (
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-400 font-serif text-lg">
                          A
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-ink line-clamp-1">
                          {item.product.name}
                        </h4>
                        {item.product.category && (
                          <span className="text-[11px] text-gray-500">
                            {item.product.category}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center border border-gray-200 rounded bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-ink">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-primary">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary / Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 bg-gray-50/50 p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ink">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-ink">
                  <span>Total Estimate</span>
                  <span className="text-primary">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-[11px] text-gray-500 text-center">
                  Estimates exclude custom printing service requirements.
                </p>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  <button
                    onClick={handleCheckout}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-white shadow-md hover:opacity-90 active:scale-[0.98] transition-all"
                    style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
                  >
                    <Send className="h-4 w-4" />
                    Send Order via WhatsApp
                  </button>
                  <button
                    onClick={clearCart}
                    className="text-xs text-gray-500 hover:text-red-500 text-center py-1 transition-colors"
                  >
                    Clear All Items
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
