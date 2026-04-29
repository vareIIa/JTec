"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/store/cart-drawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <SessionProvider>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
