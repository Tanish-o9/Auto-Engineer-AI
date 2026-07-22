'use client';
import React, { useState } from 'react';
import { GitPullRequest, GitBranch, Check, AlertTriangle, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const GitHubReviewUI = () => {
  const [repo, setRepo] = useState('autoengineer/core-platform');

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* 3D Repo Connection Status Header */}
      <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-slate-950 rounded-2xl border-2 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-950">
            <GitBranch className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">Connected GitHub Repository</h2>
            <p className="text-xs text-slate-300 font-mono font-bold mt-0.5">{repo}</p>
          </div>
        </div>

        <button className="bg-emerald-500/20 text-emerald-300 border-2 border-emerald-400 text-xs px-4 py-2 rounded-2xl font-black flex items-center gap-2 shadow-md">
          <Check className="w-4 h-4 text-emerald-400" /> App Integration Active
        </button>
      </div>

      {/* 3D Simulated PR Review Diff Inline Card */}
      <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-purple-400" />
            PR #42: Add JWT refresh token rotation & pgvector indexing
          </h3>
          <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-400 px-3.5 py-1 rounded-full font-mono font-black">
            AI AGENTS REVIEWED
          </span>
        </div>

        {/* Diff Code Container */}
        <div className="bg-slate-950 rounded-2xl border-2 border-slate-800 overflow-hidden font-mono text-xs shadow-xl">
          <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 text-slate-300 font-bold flex items-center justify-between">
            <span>backend/apps/organizations/permissions.py</span>
            <span className="text-emerald-400 font-black">+12 lines, -4 lines</span>
          </div>

          <div className="p-4 space-y-1.5 text-slate-300 leading-relaxed">
            <div className="text-slate-500 font-bold">@@ -15,4 +15,12 @@ class AgentExecutionBoundaryPermission:</div>
            <div className="bg-emerald-950/60 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/30">+ class AgentExecutionBoundaryPermission(permissions.BasePermission):</div>
            <div className="bg-emerald-950/60 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/30">+     def has_permission(self, request, view):</div>
            <div className="bg-emerald-950/60 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/30">+         if request.headers.get('X-Agent-Service-Token'):</div>
            <div className="bg-emerald-950/60 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/30">+             return not getattr(view, 'is_admin_only_view', False)</div>
          </div>
        </div>

        {/* AI Security Review Callout */}
        <div className="p-5 bg-slate-950 rounded-2xl border-2 border-cyan-400/50 space-y-2 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-black text-cyan-300">
            <ShieldCheck className="w-4 h-4 text-cyan-300" />
            <span>Security Agent Inline Review</span>
          </div>
          <p className="text-xs text-slate-200 font-medium leading-relaxed">
            "Verified human-vs-agent boundary check. The permission logic prevents agents from invoking administrative endpoints while allowing blueprint generation. Approved."
          </p>
        </div>
      </div>
    </div>
  );
};
