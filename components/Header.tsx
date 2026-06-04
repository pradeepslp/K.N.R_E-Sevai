"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { cart, wishlist, setIsCartOpen } = useShop();

  // Detect scrolling to toggle backdrop style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-header/80 backdrop-blur-md shadow-lg border-b border-white/5 py-2"
          : "bg-header shadow-sm border-b border-white/10 py-3 sm:py-4"
      } text-white`}
      style={{ backgroundColor: "rgba(19, 25, 33, 0.95)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        
        {/* Brand Logo */}
        <Link
          href="/"
          className="shrink-0 font-serif text-xl sm:text-2xl font-bold text-white hover:text-secondary transition-colors whitespace-nowrap tracking-wide flex items-center gap-1.5"
        >
          <span className="bg-primary px-2 py-0.5 rounded text-header text-sm sm:text-base font-sans font-black" style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}>
            KNR
          </span>
          <span className="font-serif">E-Sevai</span>
        </Link>

        {/* Search Bar - Desktop */}
        <form
          className="hidden flex-1 max-w-lg mx-6 md:block"
          action="/products"
          method="get"
        >
          <div className="relative flex rounded-full overflow-hidden bg-white/10 border border-white/20 focus-within:border-primary/50 focus-within:bg-white transition-all duration-300">
            <input
              type="search"
              name="q"
              placeholder="Search premium products..."
              className="w-full px-4 py-2 bg-transparent text-white focus:text-ink text-sm placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary hover:opacity-90 px-5 text-header flex items-center justify-center transition-colors"
              style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
              aria-label="Search submit"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className={`relative rounded-md px-3 py-2 transition-all ${
              pathname === "/"
                ? "text-primary bg-white/5"
                : "text-white/80 hover:text-white hover:bg-white/5"
            }`}
          >
            Home
          </Link>
          <Link
            href="/#services"
            className="rounded-md px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          >
            Services
          </Link>
          <Link
            href="/products"
            className={`rounded-md px-3 py-2 transition-all ${
              pathname.startsWith("/products")
                ? "text-primary bg-white/5"
                : "text-white/80 hover:text-white hover:bg-white/5"
            }`}
          >
            Products
          </Link>
          <Link
            href="/dashboard"
            className={`rounded-md px-3 py-2 transition-all ${
              pathname.startsWith("/dashboard")
                ? "text-primary bg-white/5"
                : "text-white/80 hover:text-white hover:bg-white/5"
            }`}
            title="Owner dashboard"
          >
            Dashboard
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Wishlist Link */}
          <Link
            href="/wishlist"
            className="relative p-2 text-white/80 hover:text-white hover:bg-white/5 rounded-full transition-all"
            aria-label="Wishlist page"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow"
              >
                {wishlistCount}
              </motion.span>
            )}
          </Link>

          {/* Cart Icon Toggle */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white/80 hover:text-white hover:bg-white/5 rounded-full transition-all"
            aria-label="Toggle cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount} // triggers jump on change
                className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-black text-header shadow"
                style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Login / Profile */}
          <Link
            href="/dashboard"
            className="p-2 text-white/80 hover:text-white hover:bg-white/5 rounded-full transition-all"
            aria-label="Login or Dashboard"
          >
            <User className="h-5 w-5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/5 rounded-full transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/5 bg-header/95 backdrop-blur-md overflow-hidden"
            style={{ backgroundColor: "rgba(19, 25, 33, 0.98)" }}
          >
            <div className="flex flex-col px-4 py-3 space-y-1">
              
              {/* Search Bar - Mobile */}
              <form className="pb-3" action="/products" method="get">
                <div className="relative flex rounded-md overflow-hidden bg-white/10 border border-white/10">
                  <input
                    type="search"
                    name="q"
                    placeholder="Search catalog..."
                    className="w-full px-3 py-1.5 bg-transparent text-white text-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-primary px-4 text-header flex items-center justify-center"
                    style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </form>

              <Link
                href="/"
                className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/" ? "text-primary bg-white/5" : "text-white/85 hover:bg-white/5 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href="/#services"
                className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-white/85 hover:bg-white/5 hover:text-white transition-colors"
              >
                Services
              </Link>
              <Link
                href="/products"
                className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/products") ? "text-primary bg-white/5" : "text-white/85 hover:bg-white/5 hover:text-white"
                }`}
              >
                Products
              </Link>
              <Link
                href="/dashboard"
                className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/dashboard") ? "text-primary bg-white/5" : "text-white/85 hover:bg-white/5 hover:text-white"
                }`}
              >
                Owner Dashboard
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
