"use client";

import TiltCard from "@/components/tilt-card";
import type { Product } from "./products";
import { useCart } from "@/lib/cart-context";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <div key={i} className="relative h-3.5 w-3.5">
            <svg
              className="absolute inset-0 h-3.5 w-3.5 text-white/15"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.3l3 6.1 6.7.97-4.85 4.72 1.15 6.68L12 17.6l-6 3.17 1.15-6.68L2.3 9.37 9 8.4z" />
            </svg>
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <svg
                className="h-3.5 w-3.5 text-amber-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.3l3 6.1 6.7.97-4.85 4.72 1.15 6.68L12 17.6l-6 3.17 1.15-6.68L2.3 9.37 9 8.4z" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, items, openDrawer } = useCart();
  const inCart = items.some((i) => i.id === product.id);

  function handleAddToCart() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      gradient: product.gradient,
    });
    openDrawer();
  }

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100,
        )
      : null;

  return (
    <TiltCard max={5} scale={1.015}>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-heavy transition-all duration-500 hover:shadow-[0_30px_80px_-20px_rgba(139,92,246,0.35)]">
        {/* Top gradient cover */}
        <div
          className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${product.gradient}`}
        >
          {/* Animated grid overlay */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 80%)",
            }}
          />
          {/* Glossy highlight */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
          {/* Dark vignette bottom */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Big icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-black/30 text-white ring-1 ring-white/20 backdrop-blur-xl transition-all group-hover:scale-110 group-hover:ring-white/40">
              {product.icon}
            </div>
          </div>

          {/* Badges top-left */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.badges.map((b) => (
              <span
                key={b.label}
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider backdrop-blur-xl ${
                  b.tone === "new"
                    ? "border-emerald-300/40 bg-emerald-500/20 text-emerald-100"
                    : b.tone === "hot"
                      ? "border-fuchsia-300/40 bg-fuchsia-500/20 text-fuchsia-100"
                      : b.tone === "limited"
                        ? "border-amber-300/40 bg-amber-500/20 text-amber-100"
                        : "border-white/20 bg-white/10 text-white"
                }`}
              >
                {b.tone === "new" && <span className="h-1 w-1 rounded-full bg-emerald-300 animate-pulse" />}
                {b.label}
              </span>
            ))}
          </div>

          {/* Discount top-right */}
          {discount && (
            <div className="absolute right-3 top-3">
              <div className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-mono font-semibold text-amber-200 backdrop-blur-xl ring-1 ring-amber-300/30">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17l10-10M7 7h.01M17 17h.01" />
                </svg>
                -{discount}%
              </div>
            </div>
          )}

          {/* Category pill bottom-left */}
          <div className="absolute bottom-3 left-3">
            <span className="rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white/90 backdrop-blur-xl ring-1 ring-white/15">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Title */}
          <h3 className="mb-1.5 font-nacelle text-lg font-semibold leading-tight text-white">
            {product.name}
          </h3>
          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-400">
            {product.description}
          </p>

          {/* Rating + sales */}
          <div className="mb-4 flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Stars rating={product.rating} />
              <span className="font-mono text-gray-300">{product.rating.toFixed(1)}</span>
              <span className="text-gray-600">({product.reviews})</span>
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center gap-1">
              <svg className="h-3 w-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 7h-7m0 0l3-3m-3 3l3 3M4 17h7m0 0l-3-3m3 3l-3 3" />
              </svg>
              <span className="font-mono">
                {product.sales.toLocaleString("pt-BR")} vendas
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {product.features.slice(0, 3).map((f) => (
              <span
                key={f}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-gray-400"
              >
                {f}
              </span>
            ))}
            {product.features.length > 3 && (
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-gray-500">
                +{product.features.length - 3}
              </span>
            )}
          </div>

          {/* Price + CTA */}
          <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/5 pt-4">
            <div className="min-w-0">
              {product.originalPrice && (
                <div className="text-xs text-gray-500 line-through">
                  {brl(product.originalPrice)}
                </div>
              )}
              <div className="flex items-baseline gap-1">
                <span className="font-nacelle text-xl font-semibold bg-gradient-to-br from-white via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">
                  {brl(product.price)}
                </span>
                {product.billing && (
                  <span className="text-[11px] text-gray-500">/{product.billing}</span>
                )}
              </div>
              {product.stock !== undefined && product.stock <= 5 && (
                <div className="mt-1 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-amber-300/80">
                  <span className="h-1 w-1 rounded-full bg-amber-300 animate-pulse" />
                  Últimas {product.stock} unidades
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`group/btn relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full px-4 py-2 text-xs font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_6px_20px_-6px_rgba(139,92,246,0.6)] transition-all hover:scale-[1.04] ${
                inCart
                  ? "bg-emerald-500/20 border border-emerald-400/50 text-emerald-300"
                  : "bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500"
              }`}
            >
              {inCart ? (
                <>
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="relative z-10">No carrinho</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Adicionar</span>
                  <svg className="relative z-10 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M3 4h2l2.5 12h11L21 7H6" />
                  </svg>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Gradient border glow on hover */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
          style={{
            background: `linear-gradient(135deg, transparent, transparent), linear-gradient(135deg, rgba(99,102,241,0.5), rgba(236,72,153,0.3))`,
            maskImage:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskImage:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />
      </div>
    </TiltCard>
  );
}
