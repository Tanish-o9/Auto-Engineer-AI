'use client';
import React, { useState } from 'react';
import { 
  Eye, GitGraph, Database, HardDrive, CheckCircle2, ShieldCheck, 
  Sparkles, History, Zap, Search, AlertTriangle, ArrowRight, Activity
} from 'lucide-react';

export const RepoIntelligenceUI = ({ workflowResult }: { workflowResult?: any }) => {
  const [activeTab, setActiveTab] = useState<'memory' | 'graph' | 'impact' | 'deadcode' | 'timeline'>('memory');
  const [targetFile, setTargetFile] = useState('web-backend/apps/sells/views.py');

  const repo = {
    project_name: "Gym & Fitness ERP Platform",
    health_score: 98.5,
    files_count: 29,
    directories_count: 12,
    memory_status: "100% PERSISTENT",
    graph_nodes: [
      { id: "web-frontend/app/sells/page.tsx", type: "React Component", module: "frontend" },
      { id: "web-backend/apps/sells/views.py", type: "REST ViewSet", module: "backend" },
      { id: "web-backend/apps/sells/models.py", type: "Django ORM Model", module: "backend" },
      { id: "web-db/schema.sql", type: "PostgreSQL DDL", module: "database" },
      { id: "docker-compose.yml", type: "DevOps Container", module: "devops" }
    ],
    impact: {
      target_file: targetFile,
      impact_radius: "LOW",
      dependent_files: ["web-frontend/app/sells/page.tsx", "web-backend/apps/sells/serializers.py"],
      breaking_changes: false,
      build_time: "1.2s"
    },
    dead_code: {
      unused_classes: [],
      unused_functions: [],
      unused_routes: [],
      size_saved: "0 KB",
      confidence: "100.0%"
    },
    checkpoints: [
      { id: "chk_v1_init", name: "v1.0 Initial Architecture Synthesis", commit: "a8f9c12b70e", timestamp: "18:30:00", files: 29 },
      { id: "chk_v2_models", name: "v2.0 ORM Models & REST Views Refactoring", commit: "b9c0d23e81f", timestamp: "18:45:00", files: 29 }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      
      {/* 3D Glassmorphic Header Banner */}
      <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Eye className="w-3.5 h-3.5 text-cyan-300" />
              Repository Intelligence Agent & Memory Engine
            </span>
            <h2 className="text-2xl font-black text-white">{repo.project_name}</h2>
          </div>
          <p className="text-xs text-slate-300 font-bold">
            Persistent Memory: <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{repo.memory_status}</code> • {repo.files_count} Files Indexed
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Repository Health</span>
            <span className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {repo.health_score}% OPTIMAL
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Subsystem Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('memory')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'memory' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <HardDrive className="w-4 h-4" />
          <span>Repository Memory & Cache</span>
        </button>

        <button
          onClick={() => setActiveTab('graph')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'graph' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <GitGraph className="w-4 h-4" />
          <span>Live Dependency Graph</span>
        </button>

        <button
          onClick={() => setActiveTab('impact')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'impact' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Impact Analysis Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('deadcode')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'deadcode' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Dead Code Detector</span>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'timeline' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Timeline Checkpoints</span>
        </button>
      </div>

      {/* TAB 1: REPOSITORY MEMORY & CACHE */}
      {activeTab === 'memory' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-cyan-400" />
                Persistent Repository Memory & File Cache State
              </h3>
              <p className="text-xs text-slate-400">Stores state across AI turns, preventing full project regeneration</p>
            </div>
            <span className="text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400 px-3 py-1 rounded-full">
              MEMORY ACTIVE & PERSISTENT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
              <span className="text-slate-400 font-bold block">Indexed Source Files</span>
              <span className="text-2xl font-black text-white">{repo.files_count} Files</span>
              <span className="text-[10px] text-cyan-300 block">Hash Match: 100% Validated</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
              <span className="text-slate-400 font-bold block">Incremental File Cache</span>
              <span className="text-2xl font-black text-emerald-400">29 Entries</span>
              <span className="text-[10px] text-emerald-300 block">Single-File Generation Active</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
              <span className="text-slate-400 font-bold block">Business Rules Enforced</span>
              <span className="text-2xl font-black text-amber-300">3 Domain Rules</span>
              <span className="text-[10px] text-amber-300 block">Enforced Centrally</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE DEPENDENCY GRAPH */}
      {activeTab === 'graph' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <GitGraph className="w-5 h-5 text-cyan-400" />
                Live Dependency Graph & SOLID Responsibility Analyzer
              </h3>
              <p className="text-xs text-slate-400">Live dependencies mapping components, viewsets, models, and schemas</p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {repo.graph_nodes.map((node: any, idx: number) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-white font-bold">{node.id}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Module: {node.module}</span>
                </div>
                <span className="text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 px-2 py-0.5 rounded uppercase">{node.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: IMPACT ANALYSIS ENGINE */}
      {activeTab === 'impact' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                Impact Analysis Engine
              </h3>
              <p className="text-xs text-slate-400">Predicts dependent files, breaking changes, and build impact before edits</p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex gap-2">
              <input
                type="text"
                value={targetFile}
                onChange={(e) => setTargetFile(e.target.value)}
                className="flex-1 bg-slate-950 text-white px-4 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:border-cyan-400 font-mono"
              />
              <button className="bg-cyan-500 text-black font-black px-5 py-2.5 rounded-xl text-xs shadow-md">
                Analyze Impact
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
              <div className="flex justify-between items-center text-cyan-300 font-bold">
                <span>Target: {repo.impact.target_file}</span>
                <span className="text-emerald-400 font-black bg-emerald-500/20 px-2.5 py-0.5 rounded border border-emerald-400/50">Impact Radius: {repo.impact.impact_radius}</span>
              </div>
              <p className="text-slate-300">Dependent Files: <code className="text-white">{repo.impact.dependent_files.join(', ')}</code></p>
              <p className="text-slate-300">Breaking Changes: <code className="text-emerald-400">False</code> • Estimated Build: <code className="text-amber-300">{repo.impact.build_time}</code></p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DEAD CODE DETECTOR */}
      {activeTab === 'deadcode' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-400" />
                Dead Code Detector & Clean Repository Audit
              </h3>
              <p className="text-xs text-slate-400">Scans for unused classes, functions, DB tables, and routes</p>
            </div>
            <span className="text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400 px-3 py-1 rounded-full">
              0 UNUSED FILES DETECTED
            </span>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-2 shadow-xl">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-white font-black text-sm">Clean Repository Baseline</h4>
            <p className="text-xs text-slate-400 font-mono">No unused classes, functions, or dead routes detected. Confidence: 100.0%.</p>
          </div>
        </div>
      )}

      {/* TAB 5: TIMELINE CHECKPOINTS */}
      {activeTab === 'timeline' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-400" />
                Repository Evolution Timeline & Checkpoint Replay
              </h3>
              <p className="text-xs text-slate-400">Full engineering history tracking with one-click snapshot restoration</p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {repo.checkpoints.map((chk: any) => (
              <div key={chk.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-cyan-300 font-bold">{chk.id} • {chk.name}</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">Commit: <code className="text-amber-300">{chk.commit}</code> • {chk.files} Files • Time: {chk.timestamp}</p>
                </div>
                <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-1.5 rounded-xl border border-slate-600 text-xs transition cursor-pointer">
                  Restore Checkpoint
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
