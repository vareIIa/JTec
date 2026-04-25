"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

export type CheckoutCustomer = {
  email: string;
  name: string;
  google_id?: string;
  google_picture?: string;
};

interface AuthStepProps {
  onComplete: (customer: CheckoutCustomer) => void;
}

export default function AuthStep({ onComplete }: AuthStepProps) {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  function handleGoogleSignIn() {
    setGoogleLoading(true);
    signIn("google", { callbackUrl: "/checkout" });
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    onComplete({ email: email.trim().toLowerCase(), name: name.trim() });
  }

  // If authenticated via Google, show confirmation card
  if (status === "authenticated" && session?.user?.email) {
    const user = session.user;
    return (
      <div className="animate-[introFade_0.4s_ease-out_forwards]">
        <div className="mb-8 rounded-3xl border border-emerald-400/20 bg-emerald-500/5 p-6">
          <div className="flex items-center gap-4">
            {user.image ? (
              <img src={user.image} alt={user.name ?? ""} className="h-12 w-12 rounded-full ring-2 ring-emerald-400/30" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-lg font-bold text-white">
                {(user.name ?? user.email ?? "?")[0].toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-emerald-300">{user.email}</p>
            </div>
            <svg className="h-5 w-5 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onComplete({
              email: user.email!,
              name: user.name ?? "",
              google_id: (user as { google_id?: string }).google_id,
              google_picture: user.image ?? undefined,
            })
          }
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 py-4 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(139,92,246,0.7)] transition-all hover:scale-[1.01]"
        >
          Continuar como {user.name?.split(" ")[0]}
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/checkout" })}
          className="mt-3 w-full text-center text-xs text-gray-500 transition-colors hover:text-gray-400"
        >
          Usar outra conta Google
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Google */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={googleLoading || status === "loading"}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 text-sm font-medium text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.07] disabled:opacity-50"
      >
        {googleLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        )}
        {googleLoading ? "Redirecionando…" : "Continuar com Google"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-white/[0.07]" />
        <span className="text-xs text-gray-600">ou continue com e-mail</span>
        <div className="h-px flex-1 bg-white/[0.07]" />
      </div>

      {/* Email form */}
      <form onSubmit={handleEmailSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome (opcional)"
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-gray-600 backdrop-blur-xl outline-none transition-all focus:border-indigo-400/40 focus:bg-white/[0.06]"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail *"
          required
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-gray-600 backdrop-blur-xl outline-none transition-all focus:border-indigo-400/40 focus:bg-white/[0.06]"
        />
        <button
          type="submit"
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 py-3.5 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(139,92,246,0.6)] transition-all hover:scale-[1.01]"
        >
          Continuar para pagamento
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </form>

      <p className="text-center text-xs text-gray-600">
        Seus dados são usados apenas para entrega do produto e nunca são compartilhados.
      </p>
    </div>
  );
}
