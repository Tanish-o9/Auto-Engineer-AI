'use client';
import React from 'react';
import { DollarSign, ShieldAlert, TrendingUp, Server, Activity, CheckCircle2 } from 'lucide-react';

export const CostDashboard = () => {
  const costBreakdown = [
    { service: 'AWS EKS Cluster (2 Worker Nodes)', cost: '$145.00/mo' },
    { service: 'PostgreSQL RDS (db.t4g.medium + pgvector)', cost: '$68.00/mo' },
    { service: 'ElastiCache Redis (cache.t4g.micro)', cost: '$18.00/mo' },
    { service: 'Application Load Balancer & Data Transfer', cost: '$25.00/mo' },
    { service: 'LLM API Token Usage (Estimated 50k runs)', cost: '$120.00/mo' },
  ];

  const risks = [
    { severity: 'HIGH', title: 'pgvector IVFFlat Indexing Bottleneck', detail: 'At >5M embedding vectors, IVFFlat recall drops without re-indexing with HNSW.' },
    { severity: 'MEDIUM', title: 'FastAPI Agent Execution Timeout', detail: 'Long multi-agent reflection loops may exceed standard API gateway 30s timeouts.' },
    { severity: 'LOW', title: 'GitHub Webhook Burst Limits', detail: 'High-frequency PR pushes may trigger GitHub API rate limits.' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      {/* 3D Overview Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 flex items-center justify-between shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 transition duration-300">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Estimated Infra Cost</span>
            <div className="text-3xl font-black text-emerald-400 tracking-tight">$376.00 / mo</div>
            <span className="text-xs text-slate-300 font-bold bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800">Target Scale: 50k DAU</span>
          </div>
          <div className="p-3.5 bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 rounded-2xl shadow-lg shadow-emerald-500/20">
            <DollarSign className="w-7 h-7" />
          </div>
        </div>

        <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 flex items-center justify-between shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-1 transition duration-300">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Identified Architecture Risks</span>
            <div className="text-3xl font-black text-amber-300 tracking-tight">3 Flagged</div>
            <span className="text-xs text-slate-300 font-bold bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800">1 High, 1 Medium, 1 Low</span>
          </div>
          <div className="p-3.5 bg-amber-500/20 border-2 border-amber-400 text-amber-300 rounded-2xl shadow-lg shadow-amber-500/20">
            <ShieldAlert className="w-7 h-7" />
          </div>
        </div>

        <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 flex items-center justify-between shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-1 transition duration-300">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Max Simulated Throughput</span>
            <div className="text-3xl font-black text-cyan-300 tracking-tight">2,400 Req/sec</div>
            <span className="text-xs text-slate-300 font-bold bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800">HPA Scale: 2 - 10 Pods</span>
          </div>
          <div className="p-3.5 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 rounded-2xl shadow-lg shadow-cyan-500/20">
            <TrendingUp className="w-7 h-7" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 3D Cost Breakdown Panel */}
        <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 space-y-4 shadow-2xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-cyan-300 flex items-center gap-2 uppercase tracking-wider">
              <Server className="w-4 h-4 text-cyan-300" /> Cloud Cost Estimation Breakdown
            </h3>
          </div>
          <div className="space-y-3">
            {costBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs shadow-md">
                <span className="text-slate-200 font-bold">{item.service}</span>
                <span className="font-mono text-emerald-400 font-black">{item.cost}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Architectural Risks Panel */}
        <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 space-y-4 shadow-2xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-amber-300 flex items-center gap-2 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-300" /> Architectural Risks & Mitigations
            </h3>
          </div>
          <div className="space-y-3">
            {risks.map((r, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-xs shadow-md">
                <div className="flex items-center justify-between">
                  <span className="font-black text-white">{r.title}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                    r.severity === 'HIGH' ? 'bg-rose-500/20 text-rose-300 border border-rose-400' :
                    r.severity === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300 border border-amber-400' :
                    'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {r.severity}
                  </span>
                </div>
                <p className="text-slate-300 font-medium">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
