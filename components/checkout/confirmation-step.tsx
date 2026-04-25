"use client";

import Link from "next/link";
import type { CartItem } from "@/lib/cart";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

interface ConfirmationStepProps {
  orderNumber: string;
  customerEmail: string;
  items: CartItem[];
}

export default function ConfirmationStep({ orderNumber, customerEmail, items }: ConfirmationStepProps) {
  const total = items.reduce((s, i) => s + i.price, 0);

  return (
    <div className="space-y-6 text-center">
      {/* Animated success icon */}
      <div className="flex justify-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" style={{ animationDuration: "2s" }} />
          <div className="absolute inset-2 rounded-full bg-emerald-500/10" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-emerald-400/50 bg-emerald-500/10">
            <svg className="h-10 w-10 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <h2 className="font-nacelle text-2xl font-semibold text-white">
          Pedido recebido!
        </h2>
        <p className="text-sm leading-relaxed text-gray-400">
          Seu pagamento está sendo verificado. Os produtos serão enviados para{" "}
          <span className="font-medium text-indigo-300">{customerEmail}</span> em breve.
        </p>
      </div>

      {/* Order number */}
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-5 py-2">
        <svg className="h-3.5 w-3.5 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <span className="font-mono text-sm text-indigo-200">
          Pedido <strong>{orderNumber}</strong>
        </span>
      </div>

      {/* Products summary */}
      <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 text-left space-y-3">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600">Resumo do pedido</p>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className={`h-8 w-8 shrink-0 rounded-xl bg-gradient-to-br ${item.gradient} opacity-80`} />
            <span className="flex-1 text-xs text-gray-300">{item.name}</span>
            <span className="font-mono text-xs text-white">{brl(item.price)}</span>
          </div>
        ))}
        <div className="border-t border-white/[0.07] pt-3 flex items-center justify-between">
          <span className="text-xs text-gray-400">Total pago</span>
          <span className="font-nacelle text-sm font-semibold bg-gradient-to-r from-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">
            {brl(total)}
          </span>
        </div>
      </div>

      {/* Info box */}
      <div className="flex items-start gap-3 rounded-2xl border border-indigo-400/15 bg-indigo-500/5 px-5 py-4 text-left">
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" />
        </svg>
        <div>
          <p className="text-xs font-medium text-indigo-200">Entrega por e-mail</p>
          <p className="mt-1 text-xs leading-relaxed text-gray-400">
            Após confirmação do pagamento, você receberá seus produtos em{" "}
            <strong className="text-white">{customerEmail}</strong>. Verifique também a pasta de spam.
          </p>
        </div>
      </div>

      {/* WhatsApp contact */}
      <a
        href="https://wa.me/5531985975200"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-3.5 text-sm text-gray-300 transition-all hover:border-emerald-400/20 hover:bg-emerald-500/5 hover:text-emerald-300"
      >
        <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488" />
        </svg>
        Dúvidas? Fale conosco no WhatsApp
      </a>

      {/* Back to store */}
      <Link
        href="/loja"
        className="block text-center text-xs text-gray-600 transition-colors hover:text-gray-400"
      >
        ← Voltar à loja
      </Link>
    </div>
  );
}
