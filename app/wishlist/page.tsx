"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/lib/utils";
import { Heart, Trash2, ShoppingBag, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, setIsCartOpen } = useShop();

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    toggleWishlist(product); // Remove from wishlist after moving to cart
    setIsCartOpen(true);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 18 },
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="border-b border-gray-100 pb-5">
        <div className="flex items-center gap-2 text-primary" style={{ color: "var(--primary)" }}>
          <Heart className="h-5 w-5 fill-current" />
          <span className="text-xs font-bold uppercase tracking-wider">Your Favorites</span>
        </div>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl font-serif">
          Your Wishlist
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          You have {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved in your wishlist.
        </p>
      </div>

      <AnimatePresence mode="popLayout">
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-12 text-center py-20 bg-white/50 rounded-2xl border border-dashed border-gray-200 max-w-md mx-auto"
          >
            <div className="rounded-full bg-gray-50 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-gray-100">
              <Heart className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-base font-semibold text-ink font-sans">Your wishlist is empty</h3>
            <p className="mt-1.5 text-sm text-gray-500 max-w-xs mx-auto">
              Save items you love here by clicking the heart icon on any product card while browsing.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#131921] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
            >
              <ShoppingCart className="h-3.5 w-3.5 text-primary" style={{ color: "var(--primary)" }} />
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {wishlist.map((product) => (
              <motion.div
                layout
                key={product.id}
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100/80 hover:border-gray-200 hover:shadow-md transition-all duration-300"
              >
                
                {/* Product Image */}
                <div className="aspect-square relative bg-gray-50/50 overflow-hidden">
                  <Link href={`/products/${product.slug}`} className="block w-full h-full">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-3xl font-serif">
                        A
                      </div>
                    )}
                  </Link>

                  {/* Remove Button (Trash) */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute right-2.5 top-2.5 z-10 rounded-full bg-white/90 p-1.5 text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all duration-200 active:scale-95 border border-gray-100"
                    title="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col p-4 justify-between">
                  <div>
                    {product.category && (
                      <span className="text-[10px] font-bold tracking-wide uppercase text-gray-400">
                        {product.category}
                      </span>
                    )}
                    <Link href={`/products/${product.slug}`} className="mt-1 block">
                      <h3 className="line-clamp-2 text-sm font-semibold text-ink hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100/50">
                    <p className="text-base font-bold text-primary mb-3">
                      {formatPrice(product.price)}
                    </p>

                    {/* Move to Cart */}
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-bold text-header hover:opacity-90 shadow-sm transition-all active:scale-[0.98]"
                      style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
