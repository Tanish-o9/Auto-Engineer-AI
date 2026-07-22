'use client';
import React from 'react';
import { CheckCircle2, Cpu, GitBranch, Sparkles, Activity, Layers, ArrowRight } from 'lucide-react';

export const AgentTimeline = ({ workflowResult }: { workflowResult?: any }) => {
  const events = workflowResult?.timeline || [
    { agent_name: 'Product Manager Agent', role_icon: '🧑‍💼', reasoning_summary: 'Decomposed prompt into 4 epics, 12 user stories, and a 3-sprint release backlog.', status: 'APPROVED' },
    { agent_name: 'Solution Architect Agent', role_icon: '🏗️', reasoning_summary: 'Selected Polyglot Monorepo architecture (Next.js + Django DRF + FastAPI + pgvector).', status: 'APPROVED' },
    { agent_name: 'Backend Agent', role_icon: '⚙️', reasoning_summary: 'Generated OpenAPI 3.0 specs for JWT Auth, Project persistence, and GitHub Webhooks.', status: 'APPROVED' },
    { agent_name: 'Frontend Agent', role_icon: '🎨', reasoning_summary: 'Designed Next.js App Router component tree with React Query state management.', status: 'APPROVED' },
    { agent_name: 'Database Agent', role_icon: '🗄️', reasoning_summary: 'Optimized schema with UUID keys and IVFFlat index on pgvector embeddings.', status: 'APPROVED' },
    { agent_name: 'Security Agent', role_icon: '🔐', reasoning_summary: 'Audited OWASP Top 10 checklist. Confirmed HMAC signature check on webhooks.', status: 'APPROVED' },
    { agent_name: 'QA Agent', role_icon: '🧪', reasoning_summary: 'Generated Pytest backend suite and Playwright intake wizard E2E specs.', status: 'APPROVED' },
    { agent_name: 'DevOps Agent', role_icon: '🚀', reasoning_summary: 'Emitted Docker compose setup, K8s manifests, and HPA autoscaler configs.', status: 'APPROVED' },
    { agent_name: 'Documentation Agent', role_icon: '📚', reasoning_summary: 'Synthesized production README, OpenAPI docs, and wrote source code files to disk.', status: 'APPROVED' }
  ];

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* 3D Glassmorphic Header Banner */}
      <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20">
              <Cpu className="w-6 h-6 text-cyan-300 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Agent Activity Timeline
              </h2>
              <p className="text-xs text-slate-300 font-bold mt-0.5">
                Live execution event stream from Autonomous Multi-Agent Graph Engine
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-slate-950 text-emerald-300 border-2 border-emerald-400 px-4 py-2 rounded-2xl font-mono font-black flex items-center gap-2 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            Graph Stream Connected ({events.length} Agents Executed)
          </span>
        </div>
      </div>

      {/* 3D Vertical Event Stream Cards */}
      <div className="space-y-4 relative">
        {/* Timeline thread line */}
        <div className="absolute left-8 top-6 bottom-6 w-1 bg-gradient-to-b from-cyan-500 via-indigo-500 to-purple-600 rounded-full opacity-30 pointer-events-none hidden sm:block" />

        {events.map((e: any, idx: number) => (
          <div 
            key={idx} 
            className="glass-panel-3d bg-slate-900 p-5 rounded-3xl border-2 border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-xl hover:shadow-cyan-500/15 hover:border-cyan-400/60 hover:-translate-y-1 transition duration-300 relative z-10"
          >
            {/* 3D Agent Icon Badge */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border-2 border-cyan-400/50 flex items-center justify-center text-2xl shadow-lg shadow-cyan-950">
                {e.role_icon || '🤖'}
              </div>
              <span className="text-[11px] font-mono font-black text-slate-400 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800 sm:hidden">
                Step {idx + 1}
              </span>
            </div>

            {/* Agent Info & Reasoning Details */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm text-white flex items-center gap-2">
                  {e.agent_name || e.agent}
                </h3>
                <span className="text-xs text-slate-400 font-mono font-bold hidden sm:inline-block bg-slate-950 px-3 py-0.5 rounded-full border border-slate-800">
                  Step {idx + 1}
                </span>
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {e.reasoning_summary || e.action}
              </p>
            </div>

            {/* Status Badge */}
            <div className="shrink-0">
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 px-3.5 py-1.5 rounded-full font-black flex items-center gap-1.5 shadow-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {e.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
