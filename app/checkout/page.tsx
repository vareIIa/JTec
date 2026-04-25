"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import type { CartItem } from "@/lib/cart";
import AuthStep, { type CheckoutCustomer } from "@/components/checkout/auth-step";
import PixStep from "@/components/checkout/pix-step";
import ConfirmationStep from "@/components/checkout/confirmation-step";

type Step = "auth" | "pix" | "confirmation";

const STEPS: { id: Step; label: string }[] = [
  { id: "auth", label: "Identificação" },
  { id: "pix", label: "Pagamento" },
  { id: "confirmation", label: "Confirmação" },
];

function StepIndicator({ current }: { current: Step }) {
  const idx = STEPS.findIndex((s) => s.id === current);
  return (
    <div className="mb-10 flex items-center justify-center gap-0">
      {STEPS.map((step, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  done
                    ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-400/40"
                    : active
                      ? "bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                      : "border border-white/10 bg-white/[0.03] text-gray-600"
                }`}
              >
                {done ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-[10px] font-mono uppercase tracking-[0.15em] transition-colors ${
                  active ? "text-white" : done ? "text-emerald-400/70" : "text-gray-600"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-3 mb-5 h-px w-12 transition-colors ${
                  i < idx ? "bg-emerald-400/40" : "bg-white/[0.06]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [step, setStep] = useState<Step>("auth");
  const [customer, setCustomer] = useState<CheckoutCustomer | null>(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);

  // Empty cart guard (only before confirmation)
  if (items.length === 0 && step !== "confirmation") {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
          <svg className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
            <path d="M3 4h2l2.5 12h11L21 7H6" />
          </svg>
        </div>
        <div>
          <h2 className="font-nacelle text-2xl font-semibold text-white">Carrinho vazio</h2>
          <p className="mt-2 text-sm text-gray-400">Adicione produtos antes de finalizar a compra.</p>
        </div>
        <Link
          href="/loja"
          className="group relative overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(139,92,246,0.7)]"
        >
          Ir para a loja
        </Link>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen pt-28 pb-20">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-fuchsia-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-lg px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs">
          <Link href="/loja" className="group inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-white">
            <svg className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Loja
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-gray-300">Checkout</span>
        </div>

        <StepIndicator current={step} />

        {/* Step title */}
        <div className="mb-8 text-center">
          <h1 className="font-nacelle text-2xl font-semibold text-white">
            {step === "auth" && "Como deseja se identificar?"}
            {step === "pix" && "Realize o pagamento"}
            {step === "confirmation" && "Tudo certo!"}
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {step === "auth" && "Precisamos do seu e-mail para enviar os produtos."}
            {step === "pix" && "Escaneie o QR code com o app do seu banco."}
            {step === "confirmation" && "Seus produtos serão entregues em breve."}
          </p>
        </div>

        {/* Step content */}
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-xl sm:p-8">
          {step === "auth" && (
            <AuthStep
              onComplete={(c) => {
                setCustomer(c);
                setStep("pix");
              }}
            />
          )}

          {step === "pix" && customer && (
            <PixStep
              items={items}
              total={items.reduce((s, i) => s + i.price, 0)}
              customer={customer}
              onConfirmed={(num) => {
                setPurchasedItems([...items]);
                setOrderNumber(num);
                clearCart();
                setStep("confirmation");
              }}
            />
          )}

          {step === "confirmation" && (
            <ConfirmationStep
              orderNumber={orderNumber}
              customerEmail={customer?.email ?? ""}
              items={purchasedItems}
            />
          )}
        </div>

        {/* Security badges */}
        {step !== "confirmation" && (
          <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-gray-600">
            <span className="flex items-center gap-1.5">
              <svg className="h-3 w-3 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Ambiente seguro
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3 w-3 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Dados criptografados
            </span>
            <span className="text-white/20">·</span>
            <span>PIX · Banco Central</span>
          </div>
        )}
      </div>
    </section>
  );
}
