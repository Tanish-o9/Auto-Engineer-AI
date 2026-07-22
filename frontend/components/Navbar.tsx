'use client';
import React from 'react';
import { Cpu, GitBranch, Layers, ShieldCheck, DollarSign, Sparkles, History, Code, Award, Zap, FileText, Box, Eye, Play, Activity, ShieldAlert, Building2, Target, Briefcase, Network, Server, BrainCircuit, PlayCircle, Library, Landmark, Crown, Milestone } from 'lucide-react';

export const Navbar = ({ 
  activeTab, 
  setActiveTab,
  onOpenHistory,
  onLogout
}: { 
  activeTab: string; 
  setActiveTab: (t: string) => void;
  onOpenHistory?: () => void;
  onLogout?: () => void;
}) => {
  const row1 = [
    { id: 'intake', label: 'Idea Intake', icon: Cpu },
    { id: 'requirements', label: 'SRS & Rules', icon: FileText },
    { id: 'architect', label: 'HLD & LLD Architect', icon: Box },
    { id: 'repo', label: 'Repo Intelligence', icon: Eye },
    { id: 'orchestrator', label: 'Master Orchestrator', icon: Play },
    { id: 'ai-orchestrator', label: 'AI Health & Sync', icon: Activity },
    { id: 'devops', label: 'DevOps Suite', icon: Box },
    { id: 'cto', label: 'CTO Dashboard', icon: ShieldAlert },
  ];

  const row2 = [
    { id: 'company', label: 'Company Mode', icon: Building2 },
    { id: 'goal', label: 'Simulation Suite', icon: Target },
    { id: 'startup', label: 'Startup Builder', icon: Briefcase },
    { id: 'enterprise', label: 'Command Center', icon: Network },
    { id: 'kernel', label: 'AI OS Kernel', icon: Server },
    { id: 'evolution', label: 'Intelligence Core', icon: BrainCircuit },
    { id: 'execution', label: 'Execution Core', icon: PlayCircle },
    { id: 'knowledge', label: 'Knowledge Network', icon: Library },
  ];

  const row3 = [
    { id: 'company-ecosystem', label: 'Company Ecosystem', icon: Landmark },
    { id: 'grandmaster', label: 'Grand Master', icon: Crown },
    { id: 'unified', label: 'Unified OS', icon: Milestone },
    { id: 'blueprint', label: 'Blueprint Viewer', icon: Layers },
    { id: 'codes', label: 'Generated Codes', icon: Code },
    { id: 'advanced', label: 'Advanced Suite', icon: Zap },
    { id: 'capabilities', label: 'Capabilities', icon: Award },
    { id: 'timeline', label: 'Agent Activity', icon: GitBranch },
    { id: 'dashboard', label: 'Cost & Risk', icon: DollarSign },
    { id: 'github', label: 'GitHub PR Review', icon: ShieldCheck },
  ];

  return (
    <header className="relative z-50 glass-panel-3d border-b border-slate-700 bg-slate-900 px-6 py-2.5 flex flex-col gap-2.5">
      {/* Top Row: Brand Info & Control buttons */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300 animate-neon-glow" />
            <div className="relative bg-slate-950 p-2.5 rounded-xl text-cyan-400 font-bold flex items-center justify-center border border-cyan-400/50">
              <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-lg tracking-tight text-white">
                AutoEngineer AI
              </h1>
              <span className="text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                7-Phase Engine
              </span>
            </div>
            <p className="text-xs text-slate-200 font-medium">Autonomous Multi-Agent Architecture & Code Generation Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-2 border-amber-400 px-3.5 py-1.5 rounded-full text-xs font-black transition duration-200 shadow-md cursor-pointer"
            >
              <History className="w-4 h-4 text-amber-300" />
              <span>Idea History</span>
            </button>
          )}

          <span className="flex items-center gap-2 text-xs bg-emerald-950 text-emerald-300 border border-emerald-500 px-3.5 py-1.5 rounded-full font-mono font-bold shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            13 Agents Active
          </span>

          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/50 px-3.5 py-1.5 rounded-full text-xs font-black transition duration-200 cursor-pointer shadow-md"
            >
              <span>Log Out</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Rows (3 Layers) */}
      <div className="flex flex-col gap-1.5 bg-slate-950 p-2 rounded-2xl border border-slate-800 shadow-inner">
        {/* Layer 1: Core Loop */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
          <span className="text-xs font-black text-cyan-400 font-mono uppercase tracking-wider min-w-[140px] shrink-0 text-left border-r border-slate-800 pr-2">1. Core Loop:</span>
          <div className="flex items-center gap-1.5">
            {row1.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-300 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-black shadow-lg shadow-cyan-500/30 font-black'
                      : 'text-white hover:text-cyan-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-cyan-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Layer 2: Workspace & AI */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
          <span className="text-xs font-black text-indigo-400 font-mono uppercase tracking-wider min-w-[140px] shrink-0 text-left border-r border-slate-800 pr-2">2. Workspace & AI:</span>
          <div className="flex items-center gap-1.5">
            {row2.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-300 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-black shadow-lg shadow-cyan-500/30 font-black'
                      : 'text-white hover:text-cyan-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-cyan-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Layer 3: Advanced */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-black text-purple-400 font-mono uppercase tracking-wider min-w-[140px] shrink-0 text-left border-r border-slate-800 pr-2">3. Advanced OS:</span>
          <div className="flex items-center gap-1.5">
            {row3.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-300 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-black shadow-lg shadow-cyan-500/30 font-black'
                      : 'text-white hover:text-cyan-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-cyan-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

