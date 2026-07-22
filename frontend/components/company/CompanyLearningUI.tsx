'use client';
import React, { useState } from 'react';
import { 
  Building2, BrainCircuit, RefreshCw, Cpu, Layers, HardDrive, 
  Sparkles, CheckCircle2, Bot, HelpCircle, Code2, Play, Activity
} from 'lucide-react';

export const CompanyLearningUI = () => {
  const [activeTab, setActiveTab] = useState<'company' | 'learning' | 'router' | 'translate' | 'marketplace'>('company');
  const [idea, setIdea] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const company = {
    squads: ["CEO & Product Manager", "Business Analyst", "Software Architect", "Fullstack Engineering Teams", "QA Testing Unit", "DevOps & Release Squad"],
    milestone: "Autonomous Software Company simulator live",
    learning: {
      confidence: 99.5,
      prompt_opts: 3,
      bottlenecks: 5,
      efficiency: "+34.2%"
    },
    routes: [
      { task: "Requirement & Spec Analysis", model: "Gemini 1.5 Pro", latency: "850ms", cost: "$0.002" },
      { task: "Incremental File Cache Check", model: "Gemini 1.5 Flash", latency: "320ms", cost: "$0.0005" },
      { task: "OWASP Vulnerability Audit", model: "Gemini 1.5 Pro", latency: "1100ms", cost: "$0.004" }
    ],
    marketplace: {
      templates: [
        { name: "CRM Client Portal", size: "340 downloads", ver: "v1.2.0" },
        { name: "ERP Accounting Hub", size: "180 downloads", ver: "v2.0.4" },
        { name: "Gym Fitness Suite", size: "56 downloads", ver: "v1.0.1" }
      ],
      plugins: [
        { name: "Stripe Billing Connect", status: "INSTALLED" },
        { name: "GitHub Pull Request reviewer", status: "INSTALLED" },
        { name: "AWS VPC Provisioner", status: "INSTALLED" }
      ]
    }
  };

  const handleRunCompany = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      
      {/* 3D Glassmorphic Header Banner */}
      <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              Autonomous Software Company & Self-Improvement Engine
            </span>
            <h2 className="text-2xl font-black text-white">Continuous Learning & Company Mode</h2>
          </div>
          <p className="text-xs text-slate-300 font-bold">
            CEO/CTO Simulator • Multi-Model Router • Multimodal Translators • Templates & Plugins Marketplace
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunCompany}
            disabled={isRunning || !idea}
            className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 text-black font-extrabold px-6 py-3 rounded-2xl text-xs shadow-xl transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isRunning ? <RefreshCw className="w-4 h-4 animate-spin text-black" /> : <Play className="w-4 h-4 text-black fill-black" />}
            {isRunning ? 'Spawning Company Squads...' : 'Launch Company Mode'}
          </button>
        </div>
      </div>

      {/* Navigation Subsystem Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 font-mono text-xs">
        <button
          onClick={() => setActiveTab('company')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'company' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Company Simulation</span>
        </button>

        <button
          onClick={() => setActiveTab('learning')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'learning' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          <span>Self-Improvement</span>
        </button>

        <button
          onClick={() => setActiveTab('router')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'router' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Multi-Model Router</span>
        </button>

        <button
          onClick={() => setActiveTab('translate')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'translate' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Multimodal Translators</span>
        </button>

        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'marketplace' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Marketplace</span>
        </button>
      </div>

      {/* TAB 1: COMPANY SIMULATION */}
      {activeTab === 'company' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              Autonomous Software Company Simulation Mode
            </h3>
            <p className="text-xs text-slate-400">Provide one startup idea; the entire simulated engineering division works automatically</p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g. Build an on-demand medical delivery SaaS with stripe billing..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono shadow-inner"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs mt-4">
              {company.squads.map((sq, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 shadow-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-cyan-300">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-white font-black block">{sq}</span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Active Simulated
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SELF-IMPROVEMENT */}
      {activeTab === 'learning' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-cyan-400" />
                Continuous Learning & Self-Improvement Telemetry
              </h3>
              <p className="text-xs text-slate-400">Saves code patterns, resolves prompt bottlenecks, and records successful compilation ratios</p>
            </div>
            <span className="text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400 px-3 py-1 rounded-full">
              LEARNING INDEX: {company.learning.confidence}%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Prompt Optimization Steps</span>
              <span className="text-2xl font-black text-cyan-300">{company.learning.prompt_opts}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Engineering Bottlenecks Fixed</span>
              <span className="text-2xl font-black text-emerald-400">{company.learning.bottlenecks}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Token Efficiency Gain</span>
              <span className="text-2xl font-black text-amber-300">{company.learning.efficiency}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MULTI-MODEL ROUTER */}
      {activeTab === 'router' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                Multi-Model Routing Engine Cost & Latency
              </h3>
              <p className="text-xs text-slate-400">Routes to optimal LLM based on task quality specifications, cost budgets, and latencies</p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {company.routes.map((rt, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-white font-bold">{rt.task}</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Routed to: <code className="text-cyan-300">{rt.model}</code></p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-indigo-300 block">Latency: {rt.latency}</span>
                  <span className="text-[9px] text-slate-400 mt-0.5 block">Cost: {rt.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MULTIMODAL TRANSLATORS */}
      {activeTab === 'translate' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Figma / Screenshot / Video Translator Engine
              </h3>
              <p className="text-xs text-slate-400">Convert layouts, screenshots, and walkthrough demo videos directly into Next.js/Tailwind specs</p>
            </div>
          </div>

          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 border-dashed text-center space-y-3 font-mono text-xs shadow-xl">
            <Bot className="w-10 h-10 text-cyan-400 mx-auto" />
            <h4 className="text-white font-black text-sm">Drag & Drop Figma Schema or App Screenshot</h4>
            <p className="text-xs text-slate-400">Parses typography, components, spacing, and forms directly to layout pages.</p>
          </div>
        </div>
      )}

      {/* TAB 5: TEMPLATE & PLUGIN MARKETPLACES */}
      {activeTab === 'marketplace' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Templates Card */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-cyan-300 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Sparkles className="w-4 h-4 text-cyan-300" /> Starter App Templates
              </h4>
              <div className="space-y-2">
                {company.marketplace.templates.map((temp, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center shadow">
                    <div>
                      <span className="text-white font-bold">{temp.name}</span>
                      <span className="text-[10px] text-slate-400 block">Version: {temp.ver}</span>
                    </div>
                    <span className="text-[10px] font-black text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full">{temp.size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plugins Card */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-cyan-300 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Layers className="w-4 h-4 text-cyan-300" /> Installed Integration Plugins
              </h4>
              <div className="space-y-2">
                {company.marketplace.plugins.map((plug, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center shadow">
                    <span className="text-white font-bold">{plug.name}</span>
                    <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-400/30 uppercase">{plug.status}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
