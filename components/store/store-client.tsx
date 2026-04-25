"use client";

import { useMemo, useState } from "react";
import ProductCard from "./product-card";
import { categories, products, type ProductCategory } from "./products";
import { useCart } from "@/lib/cart-context";

type SortKey = "popular" | "new" | "price-asc" | "price-desc" | "rating";

export default function StoreClient() {
  const [category, setCategory] = useState<ProductCategory | "Todos">("Todos");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const { count, openDrawer } = useCart();

  const filtered = useMemo(() => {
    let list = products.slice();
    if (category !== "Todos") list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q)),
      );
    }
    switch (sort) {
      case "new":
        list.sort(
          (a, b) =>
            Number(b.badges.some((x) => x.tone === "new")) -
            Number(a.badges.some((x) => x.tone === "new")),
        );
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.sales - a.sales);
    }
    return list;
  }, [category, query, sort]);

  return (
    <>
      {/* Toolbar — filters + search + sort + cart */}
      <div className="sticky top-20 z-30 mb-10 rounded-3xl glass-heavy p-3 md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Category pills */}
          <div className="flex flex-1 flex-wrap items-center gap-1.5 overflow-x-auto">
            {categories.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_6px_20px_-6px_rgba(139,92,246,0.6)]"
                      : "border border-white/10 bg-white/[0.02] text-gray-300 hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar produto…"
                className="w-full rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-9 pr-3 text-xs text-white placeholder:text-gray-500 backdrop-blur-xl outline-none transition-all focus:border-indigo-400/40 focus:bg-white/[0.06] md:w-56"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-4 pr-8 text-xs text-white backdrop-blur-xl outline-none transition-all hover:bg-white/[0.06] focus:border-indigo-400/40"
              >
                <option value="popular">Mais populares</option>
                <option value="new">Novidades</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="rating">Melhor avaliados</option>
              </select>
              <svg
                className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Cart button */}
            <button
              type="button"
              onClick={openDrawer}
              className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.06]"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path d="M3 4h2l2.5 12h11L21 7H6" />
              </svg>
              <span className="font-mono tabular-nums">{count}</span>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-[9px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Meta bar */}
      <div className="mb-6 flex items-center justify-between text-xs text-gray-500">
        <div className="font-mono uppercase tracking-[0.2em]">
          <span className="text-white/80 tabular-nums">{filtered.length.toString().padStart(2, "0")}</span>
          <span className="ml-2 text-white/30">produtos disponíveis</span>
        </div>
        <div className="hidden items-center gap-3 font-mono uppercase tracking-[0.2em] md:flex">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-white/60">loja aberta</span>
          </span>
          <span className="text-white/20">·</span>
          <span className="text-white/50">Entrega digital imediata</span>
          <span className="text-white/20">·</span>
          <span className="text-white/50">Garantia 7 dias</span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-3xl glass p-16 text-center">
          <div className="font-nacelle text-xl text-white">Nenhum produto encontrado</div>
          <p className="text-sm text-gray-400">Tente outro termo de busca ou remova os filtros.</p>
          <button
            type="button"
            onClick={() => { setQuery(""); setCategory("Todos"); }}
            className="mt-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white hover:bg-white/[0.08]"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}
