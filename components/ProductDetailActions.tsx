"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import type { Product } from "@prisma/client";
import { ShoppingBag, Heart, Plus, Minus, Check } from "lucide-react";
import { motion } from "framer-motion";

type ProductDetailActionsProps = {
  product: Product;
};

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addToCart, toggleWishlist, isInWishlist, setIsCartOpen } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleDecrease = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-gray-500">Quantity</span>
        <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
          <button
            onClick={handleDecrease}
            className="px-3 py-2 hover:bg-gray-50 text-gray-600 active:bg-gray-100 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center text-sm font-bold text-ink select-none">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="px-3 py-2 hover:bg-gray-50 text-gray-600 active:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 px-8 text-sm font-bold text-header shadow-md hover:opacity-90 active:scale-[0.98] transition-all"
          style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
        >
          {added ? (
            <>
              <Check className="h-5 w-5" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" />
              Add to Shopping Order
            </>
          )}
        </button>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 transition-all active:scale-[0.98] ${
            isWishlisted
              ? "border-red-200 bg-red-50 text-red-500 font-semibold"
              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-ink font-medium"
          }`}
        >
          <motion.div animate={{ scale: isWishlisted ? [1, 1.2, 1] : 1 }}>
            <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
          </motion.div>
          <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
        </button>
      </div>

    </div>
  );
}
