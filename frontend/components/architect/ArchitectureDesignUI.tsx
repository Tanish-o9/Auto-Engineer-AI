'use client';
import React, { useState } from 'react';
import { 
  Layers, Database, FileCode2, ShieldCheck, Sparkles, CheckCircle2, 
  Cpu, Server, HardDrive, Zap, Box, History, ArrowRight, Award
} from 'lucide-react';

export const ArchitectureDesignUI = ({ workflowResult }: { workflowResult?: any }) => {
  const archData = workflowResult?.blueprint_summary?.architect || workflowResult?.workflow_result?.blueprint_summary?.architect || {};
  const [activeTab, setActiveTab] = useState<'hld' | 'lld' | 'db' | 'api' | 'adrs'>('hld');

  const arch = {
    project_name: archData.project_name || "Gym & Fitness ERP Platform",
    validation_score: archData.architecture_validation_score || 100.0,
    hld: archData.hld || {
      system_overview: "Enterprise multi-tier architecture for Gym & Fitness ERP Platform supporting high throughput and low-latency response.",
      architecture_style: "Polyglot Monorepo (Next.js 14 Frontend + Django DRF Core API + FastAPI AI Service)",
      microservices_decision: "Modular Monolith with decoupled FastAPI AI microservice for computational isolation.",
      layer_separation: [
        { tier: "Tier 1: Presentation", tech: "Next.js 14 App Router + TailwindCSS", port: 3000 },
        { tier: "Tier 2: API Ingress", tech: "Nginx API Gateway + Rate Limiter", port: "80/443" },
        { tier: "Tier 3: Core API", tech: "Django REST Framework (DRF)", port: 8000 },
        { tier: "Tier 4: AI Engine", tech: "FastAPI + LangGraph + PyTorch", port: 8001 },
        { tier: "Tier 5: Relational DB", tech: "PostgreSQL 16 + pgvector", port: 5432 },
        { tier: "Tier 6: Event Cache", tech: "Redis 7 Lock & Session Cache", port: 6379 }
      ]
    },
    lld: archData.lld || [
      {
        module: "apps/sells/",
        controllers: ["SellingRecordViewSet"],
        services: ["SellingRecordService"],
        repositories: ["SellingRecordRepository"],
        dtos: ["CreateRecordDTO", "RecordResponseDTO"],
        design_patterns: ["Repository Pattern", "Dependency Injection", "DTO Pattern"]
      },
      {
        module: "apps/auth/",
        controllers: ["AuthTokenViewSet", "RefreshTokenViewSet"],
        services: ["JWTAuthService", "MFAVerificationService"],
        repositories: ["UserRepository"],
        dtos: ["LoginRequestDTO", "TokenResponseDTO"],
        design_patterns: ["Strategy Pattern", "Factory Pattern"]
      }
    ],
    database: archData.database_architecture || {
      entities: [
        { name: "selling_records", pk: "id (UUID)", fk: "user_id -> users(id)", index: "idx_status_created_at" },
        { name: "class_schedules", pk: "id (UUID)", fk: "member_id -> selling_records(id)", index: "idx_schedule_time" },
        { name: "users", pk: "id (UUID)", fk: "None", index: "idx_email_unique" }
      ],
      soft_delete_strategy: "is_deleted BOOLEAN DEFAULT FALSE, deleted_at TIMESTAMPTZ",
      audit_trail_strategy: "Central audit_logs table tracking user_id, action, timestamp, and json_diff"
    },
    api_resources: archData.api_resources || [
      { group: "/api/v1/auth/", endpoints: ["POST /token/", "POST /refresh/", "POST /verify/"], auth: "Public / Bearer JWT" },
      { group: "/api/v1/sells/", endpoints: ["GET /", "POST /", "GET /{id}/", "PUT /{id}/", "DELETE /{id}/"], auth: "Bearer JWT" },
      { group: "/api/v1/analytics/", endpoints: ["GET /metrics/", "GET /health/"], auth: "Bearer JWT" }
    ],
    adrs: archData.adrs || [
      {
        id: "ADR-001",
        title: "Selection of Modular Monolith Architecture",
        context: "Need high maintainability without premature distributed microservice complexity.",
        chosen_solution: "Polyglot Monorepo (Next.js + Django DRF + FastAPI)",
        consequences: "Simplified deployment with isolated AI compute bounds."
      },
      {
        id: "ADR-002",
        title: "PostgreSQL 16 with pgvector for Vector Search & Relational DB",
        context: "System requires unified relational storage and vector embedding search.",
        chosen_solution: "PostgreSQL 16 + pgvector IVFFlat indexing",
        consequences: "Single ACID compliant database reducing operational overhead."
      },
      {
        id: "ADR-003",
        title: "Redis Distributed Concurrency Locks",
        context: "Concurrent slot booking requests require atomic reservation locks.",
        chosen_solution: "Redis 7 Redlock algorithm for distributed locking",
        consequences: "Guarantees zero double-booking under heavy load."
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      
      {/* 3D Glassmorphic Header Banner */}
      <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-cyan-300" />
              Phase-2 AI Software Architect Agent
            </span>
            <h2 className="text-2xl font-black text-white">{arch.project_name}</h2>
          </div>
          <p className="text-xs text-slate-300 font-bold">
            Architecture Topology: <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{arch.hld.architecture_style}</code>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Architecture Scorecard</span>
            <span className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {arch.validation_score}% APPROVED
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Subsystem Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('hld')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'hld' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>High-Level Design (HLD)</span>
        </button>

        <button
          onClick={() => setActiveTab('lld')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'lld' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>Low-Level Design (LLD)</span>
        </button>

        <button
          onClick={() => setActiveTab('db')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'db' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Database Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'api' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileCode2 className="w-4 h-4" />
          <span>REST API Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab('adrs')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'adrs' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Architecture Decision Records (ADRs)</span>
        </button>
      </div>

      {/* TAB 1: HIGH-LEVEL DESIGN (HLD) */}
      {activeTab === 'hld' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                High-Level Design (HLD) & System Overview
              </h3>
              <p className="text-xs text-slate-400">System topology, layer boundaries, and monolith vs microservices strategy</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-black text-cyan-300 uppercase tracking-wider block">System Overview</span>
              <p className="text-xs text-slate-200 font-medium">{arch.hld.system_overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {arch.hld.layer_separation.map((layer: any, idx: number) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
                  <span className="text-cyan-300 font-black flex items-center gap-1.5">{layer.tier}</span>
                  <p className="text-slate-200 font-bold">{layer.tech}</p>
                  <span className="text-[10px] text-emerald-400 font-black block">Port: {layer.port}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LOW-LEVEL DESIGN (LLD) */}
      {activeTab === 'lld' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Box className="w-5 h-5 text-cyan-400" />
                Low-Level Design (LLD) & Component Boundaries
              </h3>
              <p className="text-xs text-slate-400">Controllers, services, repositories, DTOs, and software design patterns</p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {arch.lld.map((module: any, idx: number) => (
              <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <span className="text-cyan-300 font-black">Module: {module.module}</span>
                  <div className="flex items-center gap-1.5">
                    {module.design_patterns.map((pat: string, pIdx: number) => (
                      <span key={pIdx} className="text-[10px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/50 px-2 py-0.5 rounded">
                        {pat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-[11px]">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block font-bold">Controllers</span>
                    {module.controllers.map((c: string, i: number) => <div key={i} className="text-white font-semibold">{c}</div>)}
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block font-bold">Services</span>
                    {module.services.map((s: string, i: number) => <div key={i} className="text-white font-semibold">{s}</div>)}
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block font-bold">Repositories</span>
                    {module.repositories.map((r: string, i: number) => <div key={i} className="text-white font-semibold">{r}</div>)}
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block font-bold">DTOs</span>
                    {module.dtos.map((d: string, i: number) => <div key={i} className="text-cyan-300 font-semibold">{d}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DATABASE ARCHITECTURE */}
      {activeTab === 'db' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                Database Architecture & Entity Relationships
              </h3>
              <p className="text-xs text-slate-400">SQL-independent entity mapping, primary/foreign keys, and IVFFlat index</p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {arch.database.entities.map((ent: any, idx: number) => (
                <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
                  <span className="text-amber-300 font-black flex items-center gap-1.5">🗄️ {ent.name}</span>
                  <div className="text-slate-300 text-[11px] space-y-1 pt-1 border-t border-slate-900">
                    <div>PK: <code className="text-amber-300">{ent.pk}</code></div>
                    <div>FK: <code className="text-cyan-300">{ent.fk}</code></div>
                    <div>Index: <code className="text-emerald-400">{ent.index}</code></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1 text-slate-300">
              <span className="text-cyan-300 font-black">Soft Delete & Audit Trail Strategy:</span>
              <p>• Soft Delete: <code className="text-emerald-400">{arch.database.soft_delete_strategy}</code></p>
              <p>• Audit Trail: <code className="text-amber-300">{arch.database.audit_trail_strategy}</code></p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REST API ARCHITECTURE */}
      {activeTab === 'api' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-cyan-400" />
                REST API Endpoint Architecture
              </h3>
              <p className="text-xs text-slate-400">Resource groupings, HTTP methods, and authentication requirements</p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {arch.api_resources.map((res: any, idx: number) => (
              <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <span className="text-cyan-300 font-black">{res.group}</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/20 px-2.5 py-0.5 rounded border border-emerald-400/50">{res.auth}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {res.endpoints.map((ep: string, eIdx: number) => (
                    <span key={eIdx} className="bg-slate-900 text-white font-bold px-3 py-1 rounded-xl border border-slate-800">
                      {ep}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ARCHITECTURE DECISION RECORDS (ADRS) */}
      {activeTab === 'adrs' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-400" />
                Architecture Decision Records (ADRs)
              </h3>
              <p className="text-xs text-slate-400">Immutable architectural decisions documented for downstream code engines</p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {arch.adrs.map((adr: any) => (
              <div key={adr.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <span className="text-cyan-300 font-black">{adr.id} • {adr.title}</span>
                  <span className="text-emerald-400 font-black bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/50">ACCEPTED</span>
                </div>
                <p className="text-slate-300"><span className="text-slate-400 font-bold">Context:</span> {adr.context}</p>
                <p className="text-white font-bold"><span className="text-cyan-300 font-bold">Chosen Solution:</span> {adr.chosen_solution}</p>
                <p className="text-emerald-300"><span className="text-slate-400 font-bold">Consequences:</span> {adr.consequences}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
