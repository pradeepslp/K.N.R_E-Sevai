"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Eye } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen,
  } = useShop();

  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuickViewProduct(null);
    };
    if (quickViewProduct) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [quickViewProduct, setQuickViewProduct]);

  const handleAddToCart = () => {
    if (!quickViewProduct) return;
    addToCart(quickViewProduct, 1);
    setQuickViewProduct(null);
    setIsCartOpen(true); // Open the cart drawer for instant feedback
  };

  const isWishlisted = quickViewProduct ? isInWishlist(quickViewProduct.id) : false;

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickViewProduct(null)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md"
          />

          {/* Modal Wrapper */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl border border-gray-100 flex flex-col md:flex-row md:h-auto max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1.5 text-gray-500 hover:bg-gray-100 hover:text-ink transition-colors shadow-sm"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 aspect-square relative bg-gray-50/50 p-6 flex items-center justify-center border-r border-gray-100">
                {quickViewProduct.imageUrl ? (
                  <Image
                    src={quickViewProduct.imageUrl}
                    alt={quickViewProduct.name}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="text-gray-300 font-serif text-6xl">A</div>
                )}
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  {quickViewProduct.category && (
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                      {quickViewProduct.category}
                    </span>
                  )}
                  <h3 className="mt-2 text-xl font-bold text-ink sm:text-2xl leading-tight">
                    {quickViewProduct.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(quickViewProduct.price)}
                    </span>
                  </div>
                  {quickViewProduct.description && (
                    <p className="mt-4 text-sm text-gray-600 line-clamp-4 leading-relaxed whitespace-pre-wrap">
                      {quickViewProduct.description}
                    </p>
                  )}
                  <p className="mt-4 text-xs text-gray-400">
                    Visit store or order online via WhatsApp checkout.
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
                    style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => toggleWishlist(quickViewProduct)}
                      className={`flex items-center justify-center rounded-md border p-2.5 transition-colors ${
                        isWishlisted
                          ? "border-red-200 bg-red-50 text-red-500"
                          : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-ink"
                      }`}
                      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                    <Link
                      href={`/products/${quickViewProduct.slug}`}
                      onClick={() => setQuickViewProduct(null)}
                      className="flex items-center justify-center rounded-md border border-gray-200 bg-white p-2.5 text-gray-500 hover:bg-gray-50 hover:text-ink transition-colors"
                      title="View full details"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
