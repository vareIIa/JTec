import type { CartItem } from "./cart";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type CustomerInfo = {
  email: string;
  name?: string;
  google_id?: string;
  google_picture?: string;
};

export type OrderResponse = {
  order_number: string;
  pix_payload: string;
  total: string;
  customer_email: string;
  customer_name: string;
  items: { product_id: string; product_name: string; price: string }[];
};

export async function createOrder(
  customer: CustomerInfo,
  items: CartItem[],
): Promise<OrderResponse> {
  const res = await fetch(`${API}/api/orders/create/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer,
      items: items.map((i) => ({
        product_id: i.id,
        product_name: i.name,
        price: i.price,
      })),
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Erro ao criar pedido.");
  }

  return res.json() as Promise<OrderResponse>;
}

export async function confirmOrder(orderNumber: string): Promise<void> {
  const res = await fetch(`${API}/api/orders/${orderNumber}/confirm/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Erro ao confirmar pedido.");
  }
}
