'use client';
import React, { useState } from 'react';
import { 
  Building2, LineChart, Megaphone, ShieldAlert, Briefcase, 
  CheckCircle2, RefreshCw, BarChart3, HelpCircle, Layers
} from 'lucide-react';

export const CompanyEcosystemUI = () => {
  const [activeTab, setActiveTab] = useState<'strategy' | 'finance' | 'marketing' | 'legal' | 'operations'>('strategy');

  const comp = {
    strategy: {
      vision: "Enforce multi-agent code accuracy limits to achieve 15x engineering velocity with zero architectural drift.",
      okrs: [
        { objective: "Increase system test coverage checks to 99.9%", target: "Q3 2026", status: "ON_TRACK" }
      ]
    },
    finance: {
      runway: 18,
      revenue: "$12,400 / mo",
      compute: "$1,450 / mo",
      assumptions: "Estimates assume fixed token pricing schedules and steady developer adoption thresholds."
    },
    marketing: {
      positioning: "Zero-Drift Autonomous Multi-Agent Engineering",
      seo: ["AI Software Engineer", "SOC2 compliance auto-heals", "AI OS Kernel"],
      persona: "Enterprise Engineering Directors & CTOs"
    },
    legal: {
      alerts: 0,
      policies: [
        { rule: "GDPR data segregation rules", status: "COMPLIANT" },
        { rule: "SOC2 change tracking compliance", status: "VERIFIED" }
      ],
      note: "Recommendations represent regulatory checklists, not definitive legal validation briefs."
    },
    operations: {
      alerts: 0,
      milestones: [
        { name: "Launch v11.0 Autonomous Multi-Agent Suite", deadline: "2026-08-15", status: "IN_PROGRESS" }
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
              <Building2 className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              Autonomous Company Ecosystem & Executive Intelligence Layer
            </span>
            <h2 className="text-2xl font-black text-white">AI Startup Company Operating Center</h2>
          </div>
          <p className="text-xs text-slate-300 font-bold">
            Executive Strategy • Financial Runway • Marketing & Sales • Legal Compliance • Business Operations
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Estimated Runway</span>
            <span className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {comp.finance.runway} Months
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Subsystem Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 font-mono text-xs">
        <button
          onClick={() => setActiveTab('strategy')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'strategy' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Strategic positioning</span>
        </button>

        <button
          onClick={() => setActiveTab('finance')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'finance' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <LineChart className="w-4 h-4" />
          <span>Runway Forecast</span>
        </button>

        <button
          onClick={() => setActiveTab('marketing')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'marketing' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Campaign briefs</span>
        </button>

        <button
          onClick={() => setActiveTab('legal')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'legal' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Legal Reviews</span>
        </button>

        <button
          onClick={() => setActiveTab('operations')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'operations' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Operations Timeline</span>
        </button>
      </div>

      {/* TAB 1: STRATEGY */}
      {activeTab === 'strategy' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              Executive Strategic positioning & OKR roadmap
            </h3>
            <p className="text-xs text-slate-400">Maps out company mission and target objectives status</p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Company Mission Vision</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">{comp.strategy.vision}</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
              <span className="text-slate-400 font-bold block">Quarterly Objectives:</span>
              {comp.strategy.okrs.map((okr, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px] bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-white">{okr.objective} ({okr.target})</span>
                  <span className="text-cyan-300 font-black">{okr.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RUNWAY FORECAST */}
      {activeTab === 'finance' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <LineChart className="w-5 h-5 text-cyan-400" />
                Financial runway models & Compute Estimator
              </h3>
              <p className="text-xs text-slate-400">Runway projections and monthly operational expenditures</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-800 pb-6">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Estimated Runway</span>
              <span className="text-lg font-black text-cyan-300">{comp.finance.runway} Months</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Estimated Revenue</span>
              <span className="text-lg font-black text-emerald-400">{comp.finance.revenue}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Compute Operations Cost</span>
              <span className="text-lg font-black text-cyan-300">{comp.finance.compute}</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300 block mb-1">Disclaimer & Assumptions:</strong>
            {comp.finance.assumptions}
          </div>
        </div>
      )}

      {/* TAB 3: CAMPAIGN BRIEFS */}
      {activeTab === 'marketing' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-cyan-400" />
                Marketing Brand Campaigns & Sales Target Personas
              </h3>
              <p className="text-xs text-slate-400">Positioning coordinates and target SEO keywords</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Brand Positioning</span>
              <p className="text-white font-black">{comp.marketing.positioning}</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
              <span className="text-slate-400 font-bold block">SEO Campaign Targets:</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {comp.marketing.seo.map((tag, idx) => (
                  <span key={idx} className="bg-slate-900 text-cyan-300 border border-slate-800 px-3 py-1 rounded-full text-[10px] font-bold">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LEGAL REVIEWS */}
      {activeTab === 'legal' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-cyan-400" />
                Legal Policy Checklists & Compliance Auditing
              </h3>
              <p className="text-xs text-slate-400">Validates corporate standards checklists (GDPR/SOC2) without rendering legal counsel</p>
            </div>
          </div>

          <div className="space-y-3">
            {comp.legal.policies.map((p, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center shadow">
                <span className="text-white font-bold">{p.rule}</span>
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-400/30 uppercase">{p.status}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[10px] text-slate-400">
            <strong className="text-slate-300 block mb-1">Notice:</strong>
            {comp.legal.note}
          </div>
        </div>
      )}

      {/* TAB 5: OPERATIONS TIMELINE */}
      {activeTab === 'operations' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                Business Operations Task Timelines & Roadmaps
              </h3>
              <p className="text-xs text-slate-400">Tracks corporate project deadlines, scheduling, and bottlenecks</p>
            </div>
          </div>

          <div className="space-y-3">
            {comp.operations.milestones.map((m, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center shadow">
                <div>
                  <span className="text-white font-bold block">{m.name}</span>
                  <span className="text-[10px] text-slate-400 block">Due Date: {m.deadline}</span>
                </div>
                <span className="text-[10px] font-black text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-400/30 uppercase">{m.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
