'use client';
import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, Key, BarChart3, GitFork, Sparkles, 
  CheckCircle2, RefreshCw, Box, AlertCircle, Layers
} from 'lucide-react';

export const EnterpriseCommandUI = () => {
  const [activeTab, setActiveTab] = useState<'workspace' | 'compliance' | 'billing' | 'repo' | 'identity'>('workspace');

  const ent = {
    workspaces: [
      { name: "Acme Global Corp (US-East)", projects: 12, teams: 8, status: "ISOLATED" },
      { name: "Beta Labs R&D (EU-West)", projects: 4, teams: 3, status: "ISOLATED" }
    ],
    compliance: {
      score: "100%",
      soc2: "VERIFIED SECURE",
      gdpr: "COMPLIANT ENFORCED",
      hipaa: "VERIFIED SECURE",
      pci: "COMPLIANT ENFORCED"
    },
    billing: {
      tokens: "$124.50",
      compute: "$48.00",
      storage: "$12.00",
      chargebacks: [
        { dept: "Core Engineering Division", cost: "$119.92", ratio: "65%" },
        { dept: "Fintech Integrations Group", cost: "$64.58", ratio: "35%" }
      ]
    },
    dependencies: [
      { repo: "acme-payment-gateway", dep: "acme-core-auth", ver: "MATCHED", status: "SECURE" },
      { repo: "acme-crm-portal", dep: "acme-payment-gateway", ver: "MATCHED", status: "SECURE" }
    ],
    identity: {
      provider: "Okta SAML 2.0 / OIDC",
      sessions: 42,
      alerts: 0,
      model: "RBAC/ABAC Hybrid Control"
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
              Enterprise Command Center & AI Operating System
            </span>
            <h2 className="text-2xl font-black text-white">AI Global OS & Governance Panel</h2>
          </div>
          <p className="text-xs text-slate-300 font-bold">
            Multi-Tenant Workspaces • SOC2/GDPR Compliance Auditor • SSO RBAC Governance • Multi-Repo Mapper
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Compliance Score</span>
            <span className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {ent.compliance.score} Compliant
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Subsystem Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 font-mono text-xs">
        <button
          onClick={() => setActiveTab('workspace')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'workspace' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Workspaces</span>
        </button>

        <button
          onClick={() => setActiveTab('compliance')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'compliance' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Compliance</span>
        </button>

        <button
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'billing' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Billing Chargeback</span>
        </button>

        <button
          onClick={() => setActiveTab('repo')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'repo' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <GitFork className="w-4 h-4" />
          <span>Multi-Repo Dependencies</span>
        </button>

        <button
          onClick={() => setActiveTab('identity')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'identity' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Identity & Access</span>
        </button>
      </div>

      {/* TAB 1: WORKSPACES */}
      {activeTab === 'workspace' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              Isolated Enterprise Workspace & Tenant Registry
            </h3>
            <p className="text-xs text-slate-400">Verifies data boundaries and organization isolation policies</p>
          </div>

          <div className="space-y-3">
            {ent.workspaces.map((ws, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center shadow">
                <div>
                  <span className="text-white font-bold block">{ws.name}</span>
                  <span className="text-[10px] text-slate-400 block">Projects: {ws.projects} • Teams: {ws.teams}</span>
                </div>
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-400/30 uppercase">{ws.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: COMPLIANCE */}
      {activeTab === 'compliance' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                Compliance Validation Auditing
              </h3>
              <p className="text-xs text-slate-400">Real-time check gates for SOC2, HIPAA, and GDPR certifications</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">SOC2 Scope</span>
              <span className="text-lg font-black text-emerald-400">{ent.compliance.soc2}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">GDPR Scope</span>
              <span className="text-lg font-black text-emerald-400">{ent.compliance.gdpr}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">HIPAA Scope</span>
              <span className="text-lg font-black text-emerald-400">{ent.compliance.hipaa}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">PCI DSS Compliance</span>
              <span className="text-lg font-black text-emerald-400">{ent.compliance.pci}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BILLING CHARGEBACK */}
      {activeTab === 'billing' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Department Billing Analytics & LLM Chargeback
              </h3>
              <p className="text-xs text-slate-400">Provisions infrastructure, token queries, and compute charges by department</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-800 pb-6">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">LLM Token Cost</span>
              <span className="text-lg font-black text-cyan-300">{ent.billing.tokens}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Compute Operations</span>
              <span className="text-lg font-black text-cyan-300">{ent.billing.compute}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Storage Assets</span>
              <span className="text-lg font-black text-cyan-300">{ent.billing.storage}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-slate-400 font-bold block">Department Chargeback Breakdowns:</span>
            {ent.billing.chargebacks.map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-white font-bold">{item.dept}</span>
                <span className="text-cyan-300 font-black">{item.cost} ({item.ratio})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MULTI-REPO DEPENDENCIES */}
      {activeTab === 'repo' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <GitFork className="w-5 h-5 text-cyan-400" />
                Cross-Repository Dependency Tree Maps
              </h3>
              <p className="text-xs text-slate-400">Maps API contracts, shared packages, and version compatibilities</p>
            </div>
          </div>

          <div className="space-y-3">
            {ent.dependencies.map((dep, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center shadow">
                <div>
                  <span className="text-white font-bold block">{dep.repo}</span>
                  <span className="text-[10px] text-slate-400 block">Depends on: <code className="text-cyan-300">{dep.dep}</code></span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-400/30 block">Version: {dep.ver}</span>
                  <span className="text-[9px] text-slate-400 mt-1 block">{dep.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: IDENTITY & ACCESS */}
      {activeTab === 'identity' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-cyan-400" />
                Identity Governance Access Checks
              </h3>
              <p className="text-xs text-slate-400">Audits SSO connections, SAML/OIDC tokens, and active user privileges</p>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <span className="text-white font-bold">Federated Identity Provider</span>
              <span className="text-cyan-300 font-black">{ent.identity.provider}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <span className="text-white font-bold">Active Sessions</span>
              <span className="text-emerald-400 font-black">{ent.identity.sessions} Sessions</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">Privilege Escalation Alerts</span>
              <span className="text-emerald-400 font-black">{ent.identity.alerts} Alerts</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
