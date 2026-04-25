"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { createOrder, confirmOrder } from "@/lib/api";
import type { CartItem } from "@/lib/cart";
import type { CheckoutCustomer } from "./auth-step";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

interface PixStepProps {
  items: CartItem[];
  total: number;
  customer: CheckoutCustomer;
  onConfirmed: (orderNumber: string) => void;
}

export default function PixStep({ items, total, customer, onConfirmed }: PixStepProps) {
  const [pixPayload, setPixPayload] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [copied, setCopied] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [showSoftPrompt, setShowSoftPrompt] = useState(false);
  const orderCreated = useRef(false);

  // Create order on mount
  useEffect(() => {
    if (orderCreated.current) return;
    orderCreated.current = true;

    createOrder(customer, items)
      .then((res) => {
        setPixPayload(res.pix_payload);
        setOrderNumber(res.order_number);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message || "Erro ao gerar pagamento. Tente novamente.");
        setLoading(false);
      });
  }, [customer, items]);

  // 60-second timer
  useEffect(() => {
    if (loading || error) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setShowSoftPrompt(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [loading, error]);

  async function handleConfirm() {
    if (!orderNumber) return;
    setConfirming(true);
    try {
      await confirmOrder(orderNumber);
      onConfirmed(orderNumber);
    } catch {
      setConfirming(false);
    }
  }

  async function handleCopy() {
    if (!pixPayload) return;
    await navigator.clipboard.writeText(pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center gap-6 py-16">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-400" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white">Gerando seu pagamento…</p>
          <p className="mt-1 text-xs text-gray-500">Isso leva apenas um segundo.</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-red-400/20 bg-red-500/5 p-8 text-center">
        <svg className="h-10 w-10 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" />
        </svg>
        <p className="text-sm font-medium text-white">{error}</p>
        <p className="text-xs text-gray-500">Verifique se o backend está rodando em localhost:8000</p>
        <button
          type="button"
          onClick={() => { orderCreated.current = false; setLoading(true); setError(null); }}
          className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-xs text-white hover:bg-white/[0.08]"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  const progress = (secondsLeft / 60) * 100;

  return (
    <div className="space-y-5">
      {/* Order number badge */}
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-indigo-400/20 bg-indigo-500/5 px-4 py-2.5">
        <svg className="h-3.5 w-3.5 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <span className="font-mono text-xs text-indigo-200">Pedido <strong>{orderNumber}</strong></span>
      </div>

      {/* QR Code card */}
      <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02]">
        <div className="flex flex-col items-center gap-4 px-8 py-8">
          {/* PIX header */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Pagamento seguro via PIX · Banco Central do Brasil
          </div>

          {/* QR Code */}
          <div className="rounded-2xl bg-white p-4 shadow-[0_0_60px_rgba(139,92,246,0.2)]">
            {pixPayload && (
              <QRCodeSVG
                value={pixPayload}
                size={200}
                bgColor="#ffffff"
                fgColor="#0a0a18"
                level="M"
              />
            )}
          </div>

          {/* Copy button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
              copied
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-white/20 hover:bg-white/[0.07]"
            }`}
          >
            {copied ? (
              <>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                Copiado!
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copiar código PIX
              </>
            )}
          </button>

          {/* Timer bar */}
          {secondsLeft > 0 && (
            <div className="w-full space-y-1.5">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center font-mono text-[10px] text-gray-600">
                QR code válido por {secondsLeft}s
              </p>
            </div>
          )}
        </div>

        {/* Products in order */}
        <div className="border-t border-white/[0.06] px-6 py-4 space-y-2.5">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600">Produtos</p>
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`h-7 w-7 shrink-0 rounded-lg bg-gradient-to-br ${item.gradient} opacity-80`} />
                <span className="truncate text-xs text-gray-300">{item.name}</span>
              </div>
              <span className="shrink-0 font-mono text-xs text-white">{brl(item.price)}</span>
            </div>
          ))}
          <div className="border-t border-white/[0.06] pt-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-300">Total a pagar</span>
            <span className="font-nacelle text-base font-semibold bg-gradient-to-r from-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">
              {brl(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Soft prompt after 60s */}
      {showSoftPrompt && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-400/20 bg-amber-500/5 px-5 py-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            <p className="text-xs text-amber-200/80">Ainda está aí? Já fez o pagamento?</p>
          </div>
          <button
            type="button"
            onClick={handleConfirm}
            className="shrink-0 rounded-full bg-amber-500/20 px-3 py-1.5 text-xs font-medium text-amber-200 transition-colors hover:bg-amber-500/30"
          >
            Sim, já paguei
          </button>
        </div>
      )}

      {/* Main "Já paguei" CTA */}
      <button
        type="button"
        onClick={handleConfirm}
        disabled={confirming}
        className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full border border-emerald-400/40 bg-emerald-500/10 py-4 text-sm font-semibold text-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.1)] transition-all hover:border-emerald-400/60 hover:bg-emerald-500/15 hover:shadow-[0_0_40px_rgba(52,211,153,0.2)] disabled:opacity-60"
      >
        {confirming ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-400/30 border-t-emerald-400" />
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
        {confirming ? "Confirmando…" : "Já efetuei o pagamento ✓"}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </button>

      <p className="text-center text-[11px] text-gray-600">
        Após confirmar, você receberá seus produtos no e-mail cadastrado.
      </p>
    </div>
  );
}
