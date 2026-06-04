"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Printer, Copy, Globe, FileText, ArrowRight } from "lucide-react";
import type { Service } from "@prisma/client";
import { SectionHeading } from "./SectionHeading";

type HomeServicesProps = {
  services: Service[];
};

export default function HomeServices({ services }: HomeServicesProps) {
  // Map service slug to a custom Lucide Icon
  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case "xerox-photocopy":
        return <Copy className="h-8 w-8 text-primary" style={{ color: "var(--primary)" }} />;
      case "print-outs-service":
        return <Printer className="h-8 w-8 text-primary" style={{ color: "var(--primary)" }} />;
      case "tamil-nadu-e-sevai":
        return <Globe className="h-8 w-8 text-primary" style={{ color: "var(--primary)" }} />;
      default:
        return <FileText className="h-8 w-8 text-primary" style={{ color: "var(--primary)" }} />;
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center md:text-left">
        <SectionHeading>Our Digital Services</SectionHeading>
        <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-xl">
          Quick processing and professional handling for your essential daily administrative tasks.
        </p>
      </div>

      {services.length === 0 ? (
        <p className="mt-8 text-sm sm:text-base text-gray-500 text-center">
          No services available yet. Check back soon.
        </p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service: Service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ 
                y: -6,
                scale: 1.02,
                boxShadow: "0 12px 24px rgba(44, 40, 37, 0.08)"
              }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
              className="group relative rounded-xl border border-gray-100/80 bg-white/70 p-6 shadow-sm hover:border-primary/30 transition-colors backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                {/* Icon wrapper with micro-rotation hover */}
                <div className="mb-4 inline-block rounded-lg bg-gray-50 p-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {getServiceIcon(service.slug)}
                </div>

                <h3 className="text-lg font-bold text-ink group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-3 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100/50 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  style={{ color: "var(--primary)" }}
                >
                  View Details & Pricing
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="https://wa.me/919884270833?text=I%20am%20interested%20in%20your%20services"
                  target="_blank"
                  className="rounded-full bg-primary/10 hover:bg-primary px-3.5 py-1.5 text-xs font-bold text-ink hover:text-white transition-colors"
                >
                  Inquire
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
