"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, FileText, ArrowRight } from "lucide-react";

export default function HomeHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -12, 0],
      rotate: [0, 2, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#131921] text-white py-16 sm:py-24 md:py-32">
      
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-primary blur-[80px] animate-blob-1" style={{ backgroundColor: "var(--primary)" }} />
        <div className="absolute right-10 bottom-10 h-80 w-80 rounded-full bg-secondary blur-[100px] animate-blob-2" style={{ backgroundColor: "var(--secondary)" }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Hero Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6"
        >
          {/* Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-secondary backdrop-blur-sm border border-white/10"
            style={{ color: "var(--secondary)" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>K.N.R E-Sevai & Fancy Store</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.1] text-balance font-serif"
          >
            Fine Stationery & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary" style={{ backgroundImage: "linear-gradient(to right, var(--primary), var(--secondary))" }}>
              Digital Services
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed"
          >
            Explore our premium selection of notebooks, writing tools, and desk accessories. We also provide secure government utilities, photocopying, and bulk document printing.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link
              href="/products"
              className="group flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm sm:text-base font-bold text-header hover:opacity-90 shadow-lg active:scale-[0.98] transition-all"
              style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
            >
              Shop Stationery
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#services"
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm sm:text-base font-bold text-white hover:bg-white/10 active:scale-[0.98] transition-all"
            >
              Explore Services
            </a>
          </motion.div>
        </motion.div>

        {/* Hero Right Media / Decorative Cards */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          
          <motion.div
            variants={floatVariants}
            animate="animate"
            className="relative w-72 sm:w-80 h-72 sm:h-80 rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-sm select-none"
          >
            {/* Top Row Decor */}
            <div className="flex justify-between items-center">
              <span className="text-2xl">✒️</span>
              <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-secondary" style={{ color: "var(--secondary)" }}>
                Est. 2026
              </span>
            </div>

            {/* Middle Row Decor */}
            <div className="space-y-2">
              <div className="h-1.5 w-1/3 rounded-full bg-white/20" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
              <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
            </div>

            {/* Bottom Row Card Content */}
            <div className="rounded-xl bg-white/10 p-4 border border-white/5 space-y-2 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="rounded bg-secondary p-1 text-header" style={{ backgroundColor: "var(--secondary)", color: "var(--header)" }}>
                  <FileText className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-white">E-Sevai Services</span>
              </div>
              <p className="text-[10px] text-gray-400">
                Easy online certificate requests, bill payments, and documentation support.
              </p>
            </div>
            
            {/* Floating side tag */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 top-1/4 rounded-lg bg-primary px-3 py-1.5 text-xs font-black text-header shadow-lg flex items-center gap-1 border border-white/10"
              style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
            >
              <span>★</span> Premium Quality
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
