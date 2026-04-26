"use client";

type MockupType = "mycoach" | "ecom" | "landing" | "saas" | "dashboard" | "corporate";

export default function ProjectMockup({ type, gradient }: { type: MockupType; gradient: string }) {
  if (type === "mycoach") return <MyCoachMockup />;
  if (type === "dashboard") return <DashboardMockup gradient={gradient} />;
  if (type === "ecom") return <EcomMockup gradient={gradient} />;
  return <GenericMockup gradient={gradient} />;
}

function MyCoachMockup() {
  const messages = [
    { role: "user", text: "Crie um plano de aula sobre Revolução Industrial para o 8° ano" },
    { role: "ai", text: "Aqui está o Plano de Aula completo. Duração: 2h. Objetivos: compreender as causas e consequências..." },
  ];

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0d1117] flex text-[10px]">
      {/* Sidebar esquerda */}
      <div className="w-36 flex-shrink-0 bg-[#161b22] border-r border-white/5 flex flex-col">
        <div className="px-3 py-2.5 border-b border-white/5">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="h-4 w-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <span className="text-[6px] font-bold text-white">M</span>
            </div>
            <span className="font-semibold text-white text-[9px]">MyCoach IA</span>
          </div>
          <span className="text-emerald-400 text-[7px]">● Online</span>
        </div>
        <div className="flex-1 py-2 px-2 space-y-0.5">
          {["Início", "Novo Chat", "Histórico"].map((item, i) => (
            <div
              key={item}
              className={`rounded-md px-2 py-1 text-[8px] cursor-pointer transition-colors ${
                i === 0
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >
              {item}
            </div>
          ))}
          <div className="pt-2 border-t border-white/5 mt-1">
            <div className="text-[7px] text-gray-600 uppercase tracking-wider px-2 mb-1">Acadêmico</div>
            {["Plano de Aula", "Prova / Quiz", "Resumo PDF", "Exercícios", "Correção Auto"].map((item, i) => (
              <div
                key={item}
                className={`rounded-md px-2 py-1 text-[8px] cursor-pointer ${
                  i === 0 ? "text-teal-300 bg-teal-500/10" : "text-gray-500 hover:bg-white/5"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="p-2 border-t border-white/5">
          <div className="text-[7px] text-gray-600">Projeto Desenvolve</div>
          <div className="text-[7px] text-gray-500">PTEC · Itabira</div>
        </div>
      </div>

      {/* Chat principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-[#0d1117]">
          <div>
            <div className="text-[9px] font-medium text-white">Plano de Aula</div>
            <div className="text-[7px] text-gray-500">8° Ano · História · 2h</div>
          </div>
          <div className="flex gap-1">
            <div className="rounded px-1.5 py-0.5 bg-teal-500/20 text-teal-300 text-[7px]">PDF</div>
            <div className="rounded px-1.5 py-0.5 bg-white/5 text-gray-400 text-[7px]">⚙</div>
          </div>
        </div>

        {/* Mensagens */}
        <div className="flex-1 overflow-hidden px-3 py-2 space-y-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-1.5`}>
              {msg.role === "ai" && (
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <span className="text-[6px] text-white font-bold">IA</span>
                </div>
              )}
              <div
                className={`rounded-xl px-2 py-1.5 max-w-[80%] text-[8px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-emerald-600/40 text-emerald-100 rounded-tr-sm"
                    : "bg-white/[0.06] text-gray-200 rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* AI typing response */}
          <div className="flex justify-start gap-1.5">
            <div className="h-4 w-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex-shrink-0 mt-0.5 flex items-center justify-center">
              <span className="text-[6px] text-white font-bold">IA</span>
            </div>
            <div className="rounded-xl rounded-tl-sm px-2 py-1.5 bg-white/[0.06] text-gray-200 text-[8px] leading-relaxed max-w-[85%]">
              <div className="text-emerald-400 font-semibold mb-0.5">📚 Revolução Industrial — 8° Ano</div>
              <div className="text-[7px] space-y-0.5 text-gray-300">
                <div>✓ Objetivos de aprendizagem definidos</div>
                <div>✓ Conteúdo estruturado em 4 blocos</div>
                <div>✓ Atividades práticas incluídas</div>
                <div className="text-teal-300">⟳ Gerando exercícios e PDF...</div>
              </div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="px-3 pb-2">
          <div className="flex items-center gap-1.5 rounded-xl bg-white/[0.04] border border-white/10 px-2 py-1.5">
            <span className="text-[8px] text-gray-500 flex-1">Peça algo ao MyCoach…</span>
            <div className="h-4 w-4 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center cursor-pointer">
              <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardMockup({ gradient }: { gradient: string }) {
  const bars = [65, 42, 78, 55, 90, 38, 72];
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0d1117] flex flex-col text-[9px]">
      <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between bg-[#161b22]">
        <div className="flex items-center gap-1.5">
          <div className={`h-3.5 w-3.5 rounded bg-gradient-to-br ${gradient}`} />
          <span className="text-white font-medium text-[8px]">Analytics Dashboard</span>
        </div>
        <div className="flex gap-1">
          {["Dia", "Semana", "Mês"].map((t, i) => (
            <span key={t} className={`px-1.5 py-0.5 rounded text-[7px] ${i === 1 ? `bg-gradient-to-r ${gradient} text-white` : "text-gray-500"}`}>{t}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 px-3 py-2">
        {[["1.2k", "Usuários"], ["94%", "Uptime"], ["R$48k", "MRR"]].map(([v, l]) => (
          <div key={l} className="flex-1 rounded-lg bg-white/[0.04] border border-white/5 px-2 py-1.5">
            <div className="text-white font-semibold text-[10px]">{v}</div>
            <div className="text-gray-500 text-[7px]">{l}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 px-3 pb-2">
        <div className="h-full rounded-lg bg-white/[0.03] border border-white/5 p-2 flex flex-col">
          <div className="text-gray-500 text-[7px] mb-2">Atividade — últimos 7 dias</div>
          <div className="flex-1 flex items-end gap-1 pb-1">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className={`w-full rounded-t-sm bg-gradient-to-t ${gradient} opacity-80`}
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EcomMockup({ gradient }: { gradient: string }) {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0d1117] flex flex-col text-[9px]">
      <div className="px-3 py-2 border-b border-white/5 bg-[#161b22] flex items-center justify-between">
        <span className="text-white font-medium text-[8px]">🛒 Loja Online</span>
        <div className={`text-[7px] px-1.5 py-0.5 rounded-full bg-gradient-to-r ${gradient} text-white`}>3 itens</div>
      </div>
      <div className="flex-1 p-2 grid grid-cols-2 gap-1.5 overflow-hidden">
        {[
          { name: "Produto Premium", price: "R$ 297", badge: "🔥" },
          { name: "Pack Completo", price: "R$ 497", badge: "Novo" },
          { name: "Consultoria", price: "R$ 250", badge: null },
          { name: "Curso Pro", price: "R$ 197", badge: "−50%" },
        ].map((p, i) => (
          <div key={i} className="rounded-lg bg-white/[0.04] border border-white/5 p-2 flex flex-col gap-1">
            <div className={`h-10 rounded-md bg-gradient-to-br ${gradient} opacity-60 flex items-center justify-center text-[8px]`}>
              {p.badge && <span className="bg-black/30 rounded px-1 text-white">{p.badge}</span>}
            </div>
            <div className="text-white text-[7px] font-medium leading-tight">{p.name}</div>
            <div className="text-gray-300 text-[7px]">{p.price}</div>
          </div>
        ))}
      </div>
      <div className="px-2 pb-2">
        <div className={`w-full rounded-lg bg-gradient-to-r ${gradient} py-1.5 text-center text-[7px] font-medium text-white`}>Finalizar Compra · PIX</div>
      </div>
    </div>
  );
}

function GenericMockup({ gradient }: { gradient: string }) {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0d1117] flex flex-col text-[9px]">
      <div className="px-3 py-2 border-b border-white/5 bg-[#161b22] flex items-center gap-1.5">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-red-500/60" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
          <div className="h-2 w-2 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 rounded bg-white/5 h-2.5 mx-4" />
      </div>
      <div className="flex-1 flex flex-col gap-2 p-3">
        <div className={`h-20 rounded-xl bg-gradient-to-br ${gradient} opacity-30 flex items-center justify-center`}>
          <div className="text-center">
            <div className="h-3 w-24 rounded bg-white/30 mx-auto mb-1" />
            <div className="h-2 w-16 rounded bg-white/20 mx-auto" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg bg-white/[0.04] border border-white/5 p-2">
              <div className={`h-4 w-4 rounded bg-gradient-to-br ${gradient} opacity-70 mb-1`} />
              <div className="h-1.5 w-full rounded bg-white/10 mb-1" />
              <div className="h-1.5 w-2/3 rounded bg-white/5" />
            </div>
          ))}
        </div>
        <div className="flex gap-1.5">
          <div className="h-2 w-2/3 rounded bg-white/5" />
          <div className="h-2 w-1/3 rounded bg-white/5" />
        </div>
        <div className="h-2 w-full rounded bg-white/5" />
        <div className="h-2 w-4/5 rounded bg-white/5" />
      </div>
    </div>
  );
}
