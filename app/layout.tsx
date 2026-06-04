import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import ThemeSync from "@/components/ThemeSync";
import MobileBottomNav from "@/components/MobileBottomNav";
import CartDrawer from "@/components/CartDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import { prisma } from "@/lib/prisma";

import type { Viewport } from "next";

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cormorant", // Map to heading token to preserve styles
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "K.N.R E-Sevai | Fine Stationery Store",
  description: "Your local destination for premium writing instruments, journals, photocopying, high-quality printing, and official Tamil Nadu Government E-Sevai utility services.",
};

async function getBackgroundImage() {
  try {
    const setting = await prisma.settings.findUnique({
      where: { key: "background_image" },
    });
    return setting?.value || null;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const backgroundImage = await getBackgroundImage();

  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-gray-50/50">
        
        {/* Global Background Layer */}
        {backgroundImage && (
          <div className="fixed inset-0 z-[-10] overflow-hidden">
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              priority
              quality={75}
              className="object-cover blur-[3px] opacity-70"
            />
            {/* Transparent overlay */}
            <div className="absolute inset-0" style={{ backgroundColor: "var(--background-overlay)" }} />
            <ThemeSync image={backgroundImage} />
          </div>
        )}

        <Providers>
          <Header />
          {/* Add padding at the bottom on mobile to prevent the sticky bottom nav from overlapping content */}
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />

          {/* E-Commerce global portals */}
          <MobileBottomNav />
          <CartDrawer />
          <QuickViewModal />
        </Providers>

      </body>
    </html>
  );
}
