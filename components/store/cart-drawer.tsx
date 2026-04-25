"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

export default function CartDrawer() {
  const { items, removeItem, clearCart, total, count, isDrawerOpen, closeDrawer } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-sm flex-col transition-transform duration-300 ease-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "rgba(9,9,20,0.97)",
          borderLeft: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
          <div className="flex items-center gap-2.5">
            <svg className="h-4 w-4 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
              <path d="M3 4h2l2.5 12h11L21 7H6" />
            </svg>
            <span className="font-nacelle text-sm font-semibold text-white">
              Carrinho
              {count > 0 && (
                <span className="ml-2 rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs font-mono text-indigo-300">
                  {count}
                </span>
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:border-white/20 hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
                <svg className="h-7 w-7 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
                  <path d="M3 4h2l2.5 12h11L21 7H6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Carrinho vazio</p>
                <p className="mt-1 text-xs text-gray-500">Adicione produtos para continuar.</p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-gray-300 transition-colors hover:bg-white/[0.08]"
              >
                Explorar produtos
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3"
                >
                  {/* Gradient thumb */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} opacity-90`}
                  >
                    <svg className="h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                    </svg>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-white">{item.name}</p>
                    <p className="mt-0.5 text-xs text-indigo-300">{brl(item.price)}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-500 transition-colors hover:border-red-400/30 hover:text-red-400"
                    aria-label="Remover"
                  >
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/[0.07] px-6 py-5 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Total</span>
              <span className="font-nacelle text-lg font-semibold bg-gradient-to-r from-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">
                {brl(total)}
              </span>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 py-3.5 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(139,92,246,0.7)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_40px_-8px_rgba(139,92,246,0.85)]"
            >
              <span>Finalizar Compra</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>

            {/* Clear cart */}
            <button
              type="button"
              onClick={clearCart}
              className="w-full text-center text-xs text-gray-600 transition-colors hover:text-gray-400"
            >
              Esvaziar carrinho
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
