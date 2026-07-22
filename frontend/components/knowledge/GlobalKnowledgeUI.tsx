'use client';
import React, { useState } from 'react';
import { 
  Network, Search, BarChart3, Layers, ShieldCheck, 
  CheckCircle2, RefreshCw, Box, AlertCircle, Sparkles
} from 'lucide-react';

export const GlobalKnowledgeUI = () => {
  const [activeTab, setActiveTab] = useState<'research' | 'graph' | 'trends' | 'patterns' | 'validation'>('research');

  const kn = {
    research: {
      topic: "FastAPI Dependency Injection & Yield Scopes",
      confidence: "99.8%",
      findings: [
        { source: "FastAPI Official Documentation", rule: "Dependencies using yield are resolved correctly; resources are cleaned up during request teardown." }
      ]
    },
    graph: {
      nodes: 142,
      relations: [
        { from: "FastAPI", rel: "BUILT_ON", to: "Starlette" },
        { from: "FastAPI", rel: "USES", to: "Pydantic" },
        { from: "Pydantic", rel: "ENFORCES", to: "Type Validation" }
      ]
    },
    trends: [
      { tech: "Next.js App Router", growth: "+32% YoY", lifespan: "10+ Years" },
      { tech: "TailwindCSS v4", growth: "+45% YoY", lifespan: "8+ Years" }
    ],
    patterns: [
      { name: "CQRS Event-Driven Messaging", comp: "ADVANCED", files: 12 },
      { name: "Clean Architecture Persistence Layer", comp: "MEDIUM", files: 8 }
    ],
    validation: {
      sources: 5,
      conflicts: "NONE DETECTED",
      history: [
        { source: "OAuth 2.1 RFC 9068", result: "VERIFIED COMPLIANT" }
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      
      {/* 3D Glassmorphic Header Banner */}
      <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Network className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              Global Knowledge Network & Autonomous Research Core
            </span>
            <h2 className="text-2xl font-black text-white">AI Engineering Brain & Trend Forecaster</h2>
          </div>
          <p className="text-xs text-slate-300 font-bold">
            Documentation Research Agent • Semantic Knowledge Graph • Adoption Trend Index • Pattern Blueprints
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Research Confidence</span>
            <span className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {kn.research.confidence}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Subsystem Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 font-mono text-xs">
        <button
          onClick={() => setActiveTab('research')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'research' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Research Desk</span>
        </button>

        <button
          onClick={() => setActiveTab('graph')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'graph' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Knowledge Graph</span>
        </button>

        <button
          onClick={() => setActiveTab('trends')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'trends' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Trend Index</span>
        </button>

        <button
          onClick={() => setActiveTab('patterns')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'patterns' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Pattern Library</span>
        </button>

        <button
          onClick={() => setActiveTab('validation')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'validation' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Validation Logs</span>
        </button>
      </div>

      {/* TAB 1: RESEARCH DESK */}
      {activeTab === 'research' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-cyan-400" />
              Official Documentation & Standards Research Summaries
            </h3>
            <p className="text-xs text-slate-400">Verifies framework specifications, RFC updates, and design notes</p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
              <span className="text-cyan-300 font-bold block">Current Focus: {kn.research.topic}</span>
              {kn.research.findings.map((f, idx) => (
                <p key={idx} className="text-slate-300 leading-relaxed"><strong className="text-white">Source ({f.source}):</strong> {f.rule}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KNOWLEDGE GRAPH */}
      {activeTab === 'graph' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-cyan-400" />
                Global Engineering Semantic Knowledge Graph
              </h3>
              <p className="text-xs text-slate-400">Maps node relationships linking packages, coding standards, and libraries</p>
            </div>
            <span className="text-xs font-black bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 px-3 py-1 rounded-full">
              CONNECTIONS: {kn.graph.nodes}
            </span>
          </div>

          <div className="space-y-3">
            {kn.graph.relations.map((rel, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center shadow">
                <span className="text-white font-bold">{rel.from}</span>
                <span className="text-[10px] text-cyan-300 font-black px-3.5 py-1 bg-cyan-500/10 rounded-full border border-cyan-400/30 uppercase">{rel.rel}</span>
                <span className="text-white font-bold">{rel.to}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TREND INDEX */}
      {activeTab === 'trends' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Technology Growth Trends & Lifespan Forecasts
              </h3>
              <p className="text-xs text-slate-400">Audits developer adoption index, package releases, and future lifespans</p>
            </div>
          </div>

          <div className="space-y-3">
            {kn.trends.map((t, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center shadow">
                <div>
                  <span className="text-white font-bold block">{t.tech}</span>
                  <span className="text-[10px] text-slate-400 block">Estimated Lifespan: {t.lifespan}</span>
                </div>
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-400/30 uppercase">{t.growth}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PATTERN LIBRARY */}
      {activeTab === 'patterns' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Clean Architecture & Reusable Pattern Library
              </h3>
              <p className="text-xs text-slate-400">Reusable pattern blueprints minimizing redundant engineering efforts</p>
            </div>
          </div>

          <div className="space-y-3">
            {kn.patterns.map((p, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center shadow">
                <div>
                  <span className="text-white font-bold block">{p.name}</span>
                  <span className="text-[10px] text-slate-400 block">Template components: {p.files} files</span>
                </div>
                <span className="text-[10px] font-black text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-400/30 uppercase">{p.comp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: VALIDATION LOGS */}
      {activeTab === 'validation' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                Knowledge validation & Verification Reports
              </h3>
              <p className="text-xs text-slate-400">Validates documentation claims, rejecting conflicting assumptions</p>
            </div>
            <span className="text-xs font-black bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full">
              CONFLICTS: {kn.validation.conflicts}
            </span>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <span className="text-slate-400 font-bold block">Validated Specs Count</span>
              <span className="text-lg font-black text-emerald-400">{kn.validation.sources} Sources</span>
            </div>
            <span className="text-slate-400 font-bold block">Audits Logs:</span>
            {kn.validation.history.map((h, idx) => (
              <div key={idx} className="flex justify-between items-center text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-white">{h.source}</span>
                <span className="text-emerald-400 font-black">{h.result}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
