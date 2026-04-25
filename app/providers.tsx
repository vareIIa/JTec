"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/store/cart-drawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </SessionProvider>
  );
}
