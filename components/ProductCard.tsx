"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { motion } from "framer-motion";

type ProductCardProps = { product: Product };

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, setIsCartOpen } = useShop();

  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100/80 hover:border-gray-200 hover:shadow-md transition-all duration-300">
      
      {/* Product Image Container */}
      <div className="aspect-square relative bg-gray-50/50 overflow-hidden select-none">
        
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          {product.imageUrl ? (
            <div className="w-full h-full relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-1"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                unoptimized={product.imageUrl.startsWith("http")}
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-3xl sm:text-4xl font-serif">
              A
            </div>
          )}
        </Link>

        {/* Floating Heart Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute right-2.5 top-2.5 z-10 rounded-full bg-white/90 p-1.5 text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all duration-200 active:scale-95"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <motion.div
            animate={{ scale: isWishlisted ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className="h-4 w-4"
              fill={isWishlisted ? "currentColor" : "none"}
              color={isWishlisted ? "#ef4444" : "currentColor"}
            />
          </motion.div>
        </button>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
          
          {/* Quick View Button */}
          <button
            onClick={handleQuickView}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#131921]/95 hover:bg-[#131921] px-2 py-2 text-xs font-semibold text-white shadow-sm transition-colors backdrop-blur-sm"
            title="Quick View"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </button>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="rounded-lg bg-primary hover:opacity-90 p-2 text-header shadow-sm transition-all"
            style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
            title="Add to Cart"
            aria-label="Add to cart directly"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col p-3.5">
        
        {/* Category Label */}
        {product.category && (
          <span className="text-[11px] font-medium tracking-wide uppercase text-gray-400">
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <Link href={`/products/${product.slug}`} className="mt-1 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold text-ink group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price & Cart Actions always clickable */}
        <div className="mt-3 flex items-center justify-between pt-1 border-t border-gray-100/50">
          <p className="text-base font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          <span className="text-xs font-medium text-primary hover:underline group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}
