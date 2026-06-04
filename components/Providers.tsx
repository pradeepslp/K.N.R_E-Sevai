"use client";

import { SessionProvider } from "next-auth/react";
import { ShopProvider } from "@/context/ShopContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ShopProvider>
        {children}
      </ShopProvider>
    </SessionProvider>
  );
}
