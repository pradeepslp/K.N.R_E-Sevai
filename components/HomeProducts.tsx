"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import type { Product } from "@prisma/client";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";

type HomeProductsProps = {
  products: Product[];
};

export default function HomeProducts({ products }: HomeProductsProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 18 },
    },
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-center sm:text-left">
          <SectionHeading>Featured Products</SectionHeading>
          <p className="mt-1 text-sm text-gray-500 max-w-md">
            Handpicked premium writing instruments, journals, and stationery essentials.
          </p>
        </div>
        <Link
          href="/products"
          className="group flex items-center justify-center gap-1 text-sm font-bold text-primary hover:underline"
          style={{ color: "var(--primary)" }}
        >
          View all products
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-8 text-sm sm:text-base text-gray-500 text-center">
          No products to show yet. Check back soon.
        </p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product: Product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
