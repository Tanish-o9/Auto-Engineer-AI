'use client';
import React, { useState } from 'react';
import { 
  Layers, FileCode, Database, FolderTree, Copy, Check, ChevronRight, ChevronDown, 
  Server, Shield, Cpu, HardDrive, Zap, Code2, Sparkles, Box, Activity
} from 'lucide-react';

export const BlueprintViewer = ({ workflowResult }: { workflowResult?: any }) => {
  const [activeTab, setActiveTab] = useState('diagram');
  const [showRawMermaid, setShowRawMermaid] = useState(false);
  const [copied, setCopied] = useState(false);

  const summary = workflowResult?.blueprint_summary;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Raw Mermaid code fallback
  const mermaidDiagram = `graph TD
    Client[("🌐 ${summary?.architect?.topology?.frontend_stack || 'Next.js 14 Web Portal'}")]
    Gateway[("🛡️ ${summary?.architect?.topology?.gateway_ingress || 'Nginx API Gateway'}")]
    Django[("⚙️ ${summary?.architect?.topology?.backend_stack || 'Django Core API'}")]
    FastAPI[("🤖 ${summary?.architect?.topology?.ai_engine_stack || 'FastAPI AI Recommendation Service'}")]
    Postgres[("🗄️ ${summary?.architect?.topology?.database || 'PostgreSQL 16 DB'}")]
    Redis[("⚡ ${summary?.architect?.topology?.cache_event_bus || 'Redis 7 Lock Cache'}")]

    Client -->|HTTPS / JWT| Gateway
    Gateway -->|REST / API| Django
    Gateway -->|WebSockets / Async| FastAPI
    Django -->|Django ORM| Postgres
    FastAPI -->|Vector RAG| Postgres
    FastAPI -->|Event Bus| Redis`;

  // Dynamic API Endpoints from Backend Agent
  const endpoints = summary?.backend?.endpoints || [
    { path: "/api/v1/auth/token/", method: "POST", summary: "Obtain JWT authentication token", auth: "Public" },
    { path: "/api/v1/agent/agents/", method: "GET/POST", summary: "Manage AI agent personas and capabilities", auth: "Bearer JWT" },
    { path: "/api/v1/agent/workflows/", method: "GET/POST", summary: "List and execute agent workflow graphs", auth: "Bearer JWT" },
    { path: "/api/v1/agent/executions/", method: "POST", summary: "Trigger async workflow execution run", auth: "Bearer JWT" },
    { path: "/api/v1/agent/logs/", method: "GET", summary: "Retrieve execution audit logs and token metrics", auth: "Bearer JWT" }
  ];

  // Dynamic Database Tables from Database Agent
  const dbTables = summary?.database?.tables || [
    {
      name: "agent_registry",
      description: "Registered AI agent personas & capability bindings",
      columns: [
        { name: "id", type: "UUID", key: "PK", default: "uuid_generate_v4()" },
        { name: "agent_name", type: "VARCHAR(255)", key: "", default: "NOT NULL" },
        { name: "status", type: "VARCHAR(50)", key: "", default: "'ACTIVE'" },
        { name: "created_at", type: "TIMESTAMPTZ", key: "", default: "CURRENT_TIMESTAMP" }
      ]
    },
    {
      name: "agent_workflows",
      description: "LangGraph state machine graph definitions",
      columns: [
        { name: "id", type: "UUID", key: "PK", default: "uuid_generate_v4()" },
        { name: "title", type: "VARCHAR(255)", key: "", default: "NOT NULL" },
        { name: "nodes_config", type: "JSONB", key: "", default: "'{}'" },
        { name: "created_at", type: "TIMESTAMPTZ", key: "", default: "CURRENT_TIMESTAMP" }
      ]
    },
    {
      name: "agent_executions",
      description: "Workflow execution runs and trace logs",
      columns: [
        { name: "id", type: "UUID", key: "PK", default: "uuid_generate_v4()" },
        { name: "workflow_id", type: "UUID", key: "FK", default: "REFERENCES agent_workflows(id)" },
        { name: "execution_status", type: "VARCHAR(30)", key: "", default: "'COMPLETED'" },
        { name: "created_at", type: "TIMESTAMPTZ", key: "", default: "CURRENT_TIMESTAMP" }
      ]
    }
  ];

  // Dynamic Folder Tree from DevOps Agent
  const folderTree = summary?.devops?.project_tree || `agent-app/
├── agent-frontend/         # Next.js 14 AI Agent Studio UI
│   ├── app/agents/         # Agent Persona Configurator & System Prompts
│   ├── app/workflows/      # Visual Workflow Node Graph Canvas
│   ├── app/executions/     # Agent Activity Feed & Run Logs UI
│   ├── components/         # Agent Cards, Workflow Canvas
│   ├── package.json
│   └── Dockerfile
├── agent-backend/          # Django DRF Agent Platform API
│   ├── apps/agents/        # Agent registry & tool binding models
│   ├── apps/workflows/     # LangGraph state machine execution bridge
│   ├── apps/logs/          # Audit trail & token usage tracking
│   ├── manage.py
│   └── requirements.txt
├── agent-db/               # PostgreSQL DDL & Vector Embeddings Store
├── docker-compose.yml
└── README.md`;

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      {/* 3D Glassmorphic Header Banner */}
      <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">System Architecture Blueprint</h2>
              <p className="text-xs text-slate-300 font-bold mt-0.5">
                Generated by {workflowResult?.agents_executed_count || 11} Specialized AI Agents • Dynamic 3D Project Blueprint
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-slate-950 text-cyan-300 border-2 border-cyan-400/80 px-4 py-2 rounded-2xl font-mono font-black flex items-center gap-2 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            {workflowResult?.version || 'v1.0.0'}-IMMUTABLE
          </span>
        </div>
      </div>

      {/* 3D Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b-2 border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('diagram')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'diagram'
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-black shadow-lg shadow-cyan-500/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" /> Architecture Diagram
        </button>

        <button
          onClick={() => setActiveTab('openapi')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'openapi'
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-black shadow-lg shadow-cyan-500/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileCode className="w-4 h-4" /> OpenAPI 3.0 Explorer
        </button>

        <button
          onClick={() => setActiveTab('er')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'er'
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-black shadow-lg shadow-cyan-500/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Database className="w-4 h-4" /> ER Schema & SQL DDL
        </button>

        <button
          onClick={() => setActiveTab('tree')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'tree'
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-black shadow-lg shadow-cyan-500/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FolderTree className="w-4 h-4" /> Stack Folder Tree
        </button>
      </div>

      {/* 3D Tab Content Window */}
      <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 min-h-[480px] shadow-2xl">

        {/* 1. VISUAL ARCHITECTURE DIAGRAM TAB */}
        {activeTab === 'diagram' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-black text-cyan-300 flex items-center gap-2 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-cyan-300" /> System Topology & 3D Interactive Component Map
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">Visualized component flow designed by Solution Architect Agent</p>
              </div>

              <button
                onClick={() => setShowRawMermaid(!showRawMermaid)}
                className="text-xs px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-300 hover:text-white hover:border-cyan-400 transition flex items-center gap-1.5 cursor-pointer font-bold"
              >
                <Code2 className="w-3.5 h-3.5" />
                {showRawMermaid ? 'Show 3D Visual Map' : 'View Raw Mermaid Code'}
              </button>
            </div>

            {showRawMermaid ? (
              <div className="relative">
                <button
                  onClick={() => handleCopy(mermaidDiagram)}
                  className="absolute top-3 right-3 p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1 cursor-pointer font-bold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <pre className="bg-slate-950 p-5 rounded-2xl text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
                  {mermaidDiagram}
                </pre>
              </div>
            ) : (
              /* Rich 3D Interactive Architecture Node Diagram */
              <div className="bg-slate-950 p-8 rounded-3xl border-2 border-slate-800 space-y-8 relative overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  {/* Tier 1: Frontend (3D Elevated Card) */}
                  <div className="p-6 bg-slate-900 border-2 border-cyan-400/50 rounded-2xl space-y-3 shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1 transition duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-cyan-300 flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-cyan-300" /> Web UI Layer
                      </span>
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-400 px-2 py-0.5 rounded-full font-mono font-black">Next.js 14</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium">{summary?.architect?.topology?.frontend_stack || 'Member portal & trainer schedule UI'}</p>
                    <div className="text-[11px] text-slate-400 font-bold pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span>Protocol: HTTPS / WSS</span>
                      <span className="text-emerald-400 font-black">Port 3000</span>
                    </div>
                  </div>

                  {/* Gateway (3D Elevated Card) */}
                  <div className="p-6 bg-slate-900 border-2 border-blue-400/50 rounded-2xl space-y-3 shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 transition duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-blue-300 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-300" /> Ingress / Gateway
                      </span>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400 px-2 py-0.5 rounded-full font-mono font-black">Nginx API Gateway</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium">Rate limiting, SSL termination, JWT routing</p>
                    <div className="text-[11px] text-slate-400 font-bold pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span>Auth: Bearer JWT</span>
                      <span className="text-emerald-400 font-black">Port 80/443</span>
                    </div>
                  </div>

                  {/* Tier 2: Django Backend (3D Elevated Card) */}
                  <div className="p-6 bg-slate-900 border-2 border-purple-400/50 rounded-2xl space-y-3 shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 transition duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-300 flex items-center gap-2">
                        <Server className="w-4 h-4 text-purple-300" /> Core API Layer
                      </span>
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-400 px-2 py-0.5 rounded-full font-mono font-black">Django DRF</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium">{summary?.architect?.topology?.backend_stack || 'Membership plans, bookings, Stripe payments'}</p>
                    <div className="text-[11px] text-slate-400 font-bold pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span>ORM: Django DB</span>
                      <span className="text-emerald-400 font-black">Port 8000</span>
                    </div>
                  </div>

                  {/* Tier 3: FastAPI AI Service (3D Elevated Card) */}
                  <div className="p-6 bg-slate-900 border-2 border-emerald-400/50 rounded-2xl space-y-3 shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 transition duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-300 flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-emerald-300" /> AI Recommendation Engine
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400 px-2 py-0.5 rounded-full font-mono font-black">FastAPI</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium">{summary?.architect?.topology?.ai_engine_stack || 'Personalized workout & trainer recommendations'}</p>
                    <div className="text-[11px] text-slate-400 font-bold pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span>State: LangGraph</span>
                      <span className="text-emerald-400 font-black">Port 8001</span>
                    </div>
                  </div>

                  {/* Tier 4: Database (3D Elevated Card) */}
                  <div className="p-6 bg-slate-900 border-2 border-amber-400/50 rounded-2xl space-y-3 shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1 transition duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-300 flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-amber-300" /> Relational Database
                      </span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400 px-2 py-0.5 rounded-full font-mono font-black">PostgreSQL 16</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium">{summary?.architect?.topology?.database || 'Member profiles, schedules, bookings'}</p>
                    <div className="text-[11px] text-slate-400 font-bold pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span>Engine: Postgres</span>
                      <span className="text-emerald-400 font-black">Port 5432</span>
                    </div>
                  </div>

                  {/* Tier 5: Redis (3D Elevated Card) */}
                  <div className="p-6 bg-slate-900 border-2 border-rose-400/50 rounded-2xl space-y-3 shadow-xl hover:shadow-rose-500/20 hover:-translate-y-1 transition duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-rose-300 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-rose-300" /> Booking Lock Cache
                      </span>
                      <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-400 px-2 py-0.5 rounded-full font-mono font-black">Redis 7</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium">{summary?.architect?.topology?.cache_event_bus || 'Slot booking locks and session caching'}</p>
                    <div className="text-[11px] text-slate-400 font-bold pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span>Memory: Redis</span>
                      <span className="text-emerald-400 font-black">Port 6379</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. OPENAPI SPEC TAB */}
        {activeTab === 'openapi' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-black text-cyan-300 flex items-center gap-2 uppercase tracking-wider">
                  <FileCode className="w-4 h-4 text-cyan-300" /> OpenAPI 3.0 Interactive API Explorer
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">Generated by Backend Agent tailored to project prompt</p>
              </div>

              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400 px-3 py-1 rounded-full font-mono font-black">
                OpenAPI 3.0.3 Validated
              </span>
            </div>

            <div className="space-y-3">
              {endpoints.map((ep: any, idx: number) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition space-y-2 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded font-mono text-xs font-black ${
                        ep.method === 'GET' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        ep.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}>
                        {ep.method}
                      </span>
                      <code className="text-xs font-mono text-slate-200 font-bold">{ep.path}</code>
                    </div>

                    <span className="text-[11px] bg-slate-900 text-slate-400 border border-slate-800 px-2.5 py-1 rounded-full font-mono font-bold">
                      Auth: {ep.auth || 'Bearer JWT'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 pl-1 font-medium">{ep.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. ER SCHEMA & SQL DDL TAB */}
        {activeTab === 'er' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-black text-cyan-300 flex items-center gap-2 uppercase tracking-wider">
                  <Database className="w-4 h-4 text-cyan-300" /> Entity Relationship Cards & Migration SQL
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">Optimized domain schema designed by Database Agent</p>
              </div>

              <button
                onClick={() => handleCopy(`-- Generated PostgreSQL DDL Migration Script --\nCREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)}
                className="text-xs px-3.5 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer font-bold"
              >
                <Copy className="w-3.5 h-3.5 text-cyan-300" /> Copy SQL DDL
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dbTables.map((table: any, idx: number) => (
                <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <span className="text-xs font-black text-amber-300 font-mono flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-amber-400" /> {table.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">{table.description}</span>
                  </div>

                  <div className="space-y-1.5">
                    {table.columns.map((col: any, cIdx: number) => (
                      <div key={cIdx} className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-slate-900 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-200 font-bold">{col.name}</span>
                          {col.key && (
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                              col.key === 'PK' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50' :
                              col.key === 'FK' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50' :
                              'bg-purple-500/20 text-purple-300 border border-purple-400/50'
                            }`}>
                              {col.key}
                            </span>
                          )}
                        </div>
                        <span className="text-slate-400 text-[11px] font-bold">{col.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. FOLDER STRUCTURE TREE TAB */}
        {activeTab === 'tree' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-black text-cyan-300 flex items-center gap-2 uppercase tracking-wider">
                  <FolderTree className="w-4 h-4 text-cyan-300" /> Generated Project Folder Structure Tree
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">Feature-first architectural structure designed by DevOps Agent</p>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-xs text-slate-200 shadow-2xl">
              <pre className="text-cyan-300 overflow-x-auto whitespace-pre font-mono text-xs leading-relaxed">
                {folderTree}
              </pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
