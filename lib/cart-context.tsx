"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { type CartItem, loadCartFromStorage, saveCartToStorage } from "./cart";

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
  count: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    if (!hydrated.current) {
      setItems(loadCartFromStorage());
      hydrated.current = true;
    }
  }, []);

  useEffect(() => {
    if (hydrated.current) saveCartToStorage(items);
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id) ? prev : [...prev, item],
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      clearCart,
      total,
      count: items.length,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
    }),
    [items, addItem, removeItem, clearCart, total, isDrawerOpen, openDrawer, closeDrawer],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
