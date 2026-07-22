'use client';
import React, { useState } from 'react';
import { 
  Building2, Activity, Layers, Play, CheckCircle2, Sparkles, 
  Cpu, AlertCircle, RefreshCw, BookOpen, GraduationCap, ShieldCheck
} from 'lucide-react';

export const StartupBuilderUI = () => {
  const [activeTab, setActiveTab] = useState<'lean' | 'predict' | 'twin' | 'bugs' | 'mentor'>('lean');
  const [idea, setIdea] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);

  const startup = {
    lean: {
      problem: "Traditional software engineering is slow, expensive, and subject to coordination overhead.",
      solution: "Autonomous Multi-Agent architecture simulation executing planning, codebase scanned memory, and deployments in minutes.",
      uvp: "15x software engineering accelerator with zero architectural drift or technical debt."
    },
    competitors: ["Devin AI", "Cognition Labs", "Replit Agent"],
    predictions: {
      health: 98.0,
      completion_days: 14,
      risk: "LOW RISK",
      infra_cost: "$240 / mo",
      scalability: "EXCELLENT"
    },
    twin: {
      compile: "SUCCESS",
      tests: "PASSED (142 cases)",
      migration: "ZERO_ERRORS",
      status: "READY_TO_DEPLOY"
    },
    bugs: {
      count: 0,
      leaks: "NONE DETECTED",
      imports: "0 BROKEN",
      status: "CLEAN_PASS"
    },
    mentor: [
      { level: "Beginner Class", topic: "DTO Envelopes pattern", detail: "Data Transfer Objects act as packages. They bundle domain records safely to transfer across API routes without exposing persistence tables." },
      { level: "Advanced Class", topic: "Dependency Inversion Principle (DIP)", detail: "Domain models must remain abstract. mapper profiles bridge domain layers and database entities to enforce loose coupling." }
    ]
  };

  const handleBuildStartup = () => {
    setIsBuilding(true);
    setTimeout(() => setIsBuilding(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      
      {/* 3D Glassmorphic Header Banner */}
      <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              Autonomous Startup Builder & Advanced Simulation Engine
            </span>
            <h2 className="text-2xl font-black text-white">Startup Builder & Digital Twin Sandbox</h2>
          </div>
          <p className="text-xs text-slate-300 font-bold">
            Lean Canvas Creator • Project Prediction Engine • Digital Twin Sandbox • Bug Hunter Scanner • CTO Mentorship
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Health Score</span>
            <span className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {startup.predictions.health}% Optimal
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Subsystem Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 font-mono text-xs">
        <button
          onClick={() => setActiveTab('lean')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'lean' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Lean Canvas</span>
        </button>

        <button
          onClick={() => setActiveTab('predict')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'predict' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Timeline Forecast</span>
        </button>

        <button
          onClick={() => setActiveTab('twin')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'twin' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Digital Twin Twin</span>
        </button>

        <button
          onClick={() => setActiveTab('bugs')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'bugs' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Bug Hunter Scan</span>
        </button>

        <button
          onClick={() => setActiveTab('mentor')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'mentor' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>AI Mentor</span>
        </button>
      </div>

      {/* TAB 1: LEAN CANVAS */}
      {activeTab === 'lean' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              Autonomous Startup Blueprint Lean Canvas
            </h3>
            <p className="text-xs text-slate-400">Takes a raw business idea and details market fits and pricing layouts</p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g. Build an AI-driven hotel concierge and booking system..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono shadow-inner"
            />

            <button
              onClick={handleBuildStartup}
              disabled={isBuilding || !idea}
              className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-cyan-400 font-bold py-3.5 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isBuilding ? <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" /> : <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />}
              {isBuilding ? 'Generating Lean Canvas...' : 'Analyze Business Canvas & Competitor Layout'}
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs mt-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1 shadow">
                <span className="text-cyan-300 font-bold block">1. Problem Target</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{startup.lean.problem}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1 shadow">
                <span className="text-cyan-300 font-bold block">2. Solution Proposition</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{startup.lean.solution}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1 shadow">
                <span className="text-cyan-300 font-bold block">3. Unique Value (UVP)</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{startup.lean.uvp}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TIMELINE FORECAST */}
      {activeTab === 'predict' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Project Completion Forecasting & Risk Matrix
              </h3>
              <p className="text-xs text-slate-400">Forecasting monthly infrastructure charges, technical debts, and user scaling</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Estimated Build Time</span>
              <span className="text-lg font-black text-cyan-300">{startup.predictions.completion_days} Days</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Failure Likelihood</span>
              <span className="text-lg font-black text-emerald-400">{startup.predictions.risk}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Monthly Cloud Infra Cost</span>
              <span className="text-lg font-black text-cyan-300">{startup.predictions.infra_cost}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Scaling Availability</span>
              <span className="text-lg font-black text-emerald-400">{startup.predictions.scalability}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DIGITAL TWIN SANDBOX */}
      {activeTab === 'twin' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Engineering Digital Twin Sandbox
              </h3>
              <p className="text-xs text-slate-400">Verifies proposed updates inside a virtual twin compile before production push</p>
            </div>
            <span className="text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400 px-3 py-1 rounded-full uppercase tracking-wider">
              {startup.twin.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Twin Compilation Check</span>
              <span className="text-lg font-black text-emerald-400">{startup.twin.compile}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Twin Test Coverage</span>
              <span className="text-lg font-black text-cyan-300">{startup.twin.tests}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Database Migrations Audit</span>
              <span className="text-lg font-black text-emerald-400">{startup.twin.migration}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BUG HUNTER SCAN */}
      {activeTab === 'bugs' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-cyan-400" />
                Autonomous Bug Hunter Diagnostic Scanner
              </h3>
              <p className="text-xs text-slate-400">Inspects logic errors, imports, and deadlocks in the background</p>
            </div>
            <span className="text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400 px-3 py-1 rounded-full uppercase tracking-wider">
              {startup.bugs.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Active Bug Detections</span>
              <span className="text-lg font-black text-emerald-400">{startup.bugs.count} Bugs</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Memory Leak Scan</span>
              <span className="text-lg font-black text-emerald-400">{startup.bugs.leaks}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Broken Import Audits</span>
              <span className="text-lg font-black text-emerald-400">{startup.bugs.imports}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AI MENTOR */}
      {activeTab === 'mentor' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                AI Engineering Mentorship & Tutorial Guide
              </h3>
              <p className="text-xs text-slate-400">Concept breakdown explanations suitable for beginner and expert scopes</p>
            </div>
          </div>

          <div className="space-y-4">
            {startup.mentor.map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
                <span className="text-cyan-300 font-black block">{item.level}: {item.topic}</span>
                <p className="text-slate-300 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
