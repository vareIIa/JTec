export type CartItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  gradient: string;
};

const STORAGE_KEY = "jtec_cart";

export function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
