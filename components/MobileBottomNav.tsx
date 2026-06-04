"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { Home, ShoppingBag, Heart, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cart, wishlist, setIsCartOpen } = useShop();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <>
      {/* Floating Cart Button (Mobile Only) */}
      {cartCount > 0 && (
        <motion.button
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0, y: 50 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-20 right-4 z-40 md:hidden flex h-14 w-14 items-center justify-center rounded-full bg-primary text-header shadow-2xl transition-all cursor-pointer"
          style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
          aria-label="Open Cart"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow">
            {cartCount}
          </span>
        </motion.button>
      )}

      {/* Sticky Bottom Navigation (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-35 md:hidden bg-white/90 backdrop-blur-md border-t border-gray-100 flex items-center justify-around py-2 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] select-none">
        
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium transition-colors ${
            pathname === "/" ? "text-primary" : "text-gray-400 hover:text-ink"
          }`}
        >
          <Home className="h-5 w-5 mb-0.5" />
          <span>Home</span>
        </Link>

        {/* Categories / Products */}
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium transition-colors ${
            pathname.startsWith("/products") ? "text-primary" : "text-gray-400 hover:text-ink"
          }`}
        >
          <ShoppingBag className="h-5 w-5 mb-0.5" />
          <span>Products</span>
        </Link>

        {/* Cart Toggle */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium text-gray-400 hover:text-ink relative"
        >
          <div className="relative">
            <ShoppingCart className="h-5 w-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-header" style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}>
                {cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium transition-colors relative ${
            pathname === "/wishlist" ? "text-primary" : "text-gray-400 hover:text-ink"
          }`}
        >
          <div className="relative">
            <Heart className="h-5 w-5 mb-0.5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </div>
          <span>Wishlist</span>
        </Link>

        {/* Profile / Dashboard */}
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium transition-colors ${
            pathname.startsWith("/dashboard") ? "text-primary" : "text-gray-400 hover:text-ink"
          }`}
        >
          <User className="h-5 w-5 mb-0.5" />
          <span>Profile</span>
        </Link>

      </nav>
    </>
  );
}
