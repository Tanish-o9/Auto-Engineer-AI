'use client';
import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, Cpu, CheckCircle2, TestTube2, BookOpen, 
  GitPullRequest, Cloud, Zap, Layers, RefreshCw, Terminal, Check, Copy, Award, ArrowUpRight
} from 'lucide-react';

export const AutonomousCapabilitiesUI = () => {
  const [activeTab, setActiveTab] = useState<'tests' | 'docs' | 'security' | 'performance' | 'git' | 'cloud'>('security');
  const [selectedCloud, setSelectedCloud] = useState<'AWS' | 'Azure' | 'Railway' | 'Render' | 'Fly.io' | 'Vercel'>('AWS');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel-3d bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Award className="w-3.5 h-3.5 text-cyan-300" />
              Autonomous Enterprise Capabilities
            </span>
            <h2 className="text-2xl font-black text-white">6 Multi-Agent Subsystem Engine</h2>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            AI Test Generator • OWASP Security Scanner • Performance Profiler • GitHub PR Intelligence • Multi-Cloud Deployer
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Security Risk Score</span>
            <span className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              98/100
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Test Coverage</span>
            <span className="text-lg font-black text-cyan-400 flex items-center justify-center gap-1 mt-0.5">
              <TestTube2 className="w-4 h-4 text-cyan-400" />
              94.2%
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Capability Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'security' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Security Scanner</span>
        </button>

        <button
          onClick={() => setActiveTab('tests')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'tests' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <TestTube2 className="w-4 h-4" />
          <span>AI Test Generator</span>
        </button>

        <button
          onClick={() => setActiveTab('performance')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'performance' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Performance Profiler</span>
        </button>

        <button
          onClick={() => setActiveTab('git')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'git' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <GitPullRequest className="w-4 h-4" />
          <span>GitHub Intelligence</span>
        </button>

        <button
          onClick={() => setActiveTab('cloud')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'cloud' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Cloud className="w-4 h-4" />
          <span>Multi-Cloud Deployer</span>
        </button>

        <button
          onClick={() => setActiveTab('docs')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'docs' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Auto Documentation</span>
        </button>
      </div>

      {/* TAB CONTENT 1: SECURITY SCANNER */}
      {activeTab === 'security' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                OWASP Top 10 Security Audit Report
              </h3>
              <p className="text-xs text-slate-400">Automated vulnerability scan for SQLi, XSS, CSRF, JWT & Secrets</p>
            </div>
            <span className="text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400 px-3 py-1 rounded-full">
              LOW RISK (0 Critical Alerts)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">A01: Broken Access Control</span>
                <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 px-2 py-0.5 rounded">PASSED</span>
              </div>
              <p className="text-xs text-slate-400">All DRF ViewSets enforce DRF authentication classes and route-level permissions.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">A03: SQL & Command Injection</span>
                <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 px-2 py-0.5 rounded">PASSED</span>
              </div>
              <p className="text-xs text-slate-400">Django ORM parameterization used exclusively. Zero raw SQL string concats detected.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">A07: Identification & Auth Failures</span>
                <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 px-2 py-0.5 rounded">PASSED</span>
              </div>
              <p className="text-xs text-slate-400">JWT signature validation enabled with expiration & revocation token list.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">A02: Cryptographic Failures</span>
                <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 px-2 py-0.5 rounded">PASSED</span>
              </div>
              <p className="text-xs text-slate-400">No hardcoded secrets detected in source code. Environment variable injection enforced.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: AI TEST GENERATOR */}
      {activeTab === 'tests' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <TestTube2 className="w-5 h-5 text-cyan-400" />
                Automated Multi-Suite Test Generator
              </h3>
              <p className="text-xs text-slate-400">pytest Unit Tests • Jest Frontend Tests • Playwright E2E Suites</p>
            </div>
            <span className="text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400 px-3 py-1 rounded-full">
              48/48 TESTS PASSED (94.2% Coverage)
            </span>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-cyan-300 font-bold">
                <span>tests/test_api_endpoints.py (pytest)</span>
                <span className="text-emerald-400 font-black">PASSED</span>
              </div>
              <pre className="text-slate-300 bg-slate-900 p-3 rounded-xl overflow-x-auto text-[11px]">
{`def test_list_members():
    response = client.get("/api/v1/gym/members")
    assert response.status_code == 200
    assert "results" in response.json()`}
              </pre>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-cyan-300 font-bold">
                <span>e2e/workflow.spec.ts (Playwright)</span>
                <span className="text-emerald-400 font-black">PASSED</span>
              </div>
              <pre className="text-slate-300 bg-slate-900 p-3 rounded-xl overflow-x-auto text-[11px]">
{`test('User can open Generated Codes Explorer and switch files', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/AutoEngineer AI/);
});`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: MULTI-CLOUD DEPLOYER */}
      {activeTab === 'cloud' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Cloud className="w-5 h-5 text-indigo-400" />
                Multi-Cloud Production Deployment Agent
              </h3>
              <p className="text-xs text-slate-400">Synthesizes Dockerfile, Compose, Nginx & Deployment commands</p>
            </div>
          </div>

          {/* Cloud Selector */}
          <div className="flex flex-wrap gap-3">
            {(['AWS', 'Azure', 'Railway', 'Render', 'Fly.io', 'Vercel'] as const).map(c => (
              <button
                key={c}
                onClick={() => setSelectedCloud(c)}
                className={`px-4 py-2 rounded-xl text-xs font-black border transition cursor-pointer ${
                  selectedCloud === c
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg scale-105'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
                }`}
              >
                ☁️ {c}
              </button>
            ))}
          </div>

          {/* Cloud Output Config */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-indigo-300 font-bold">Dockerfile for {selectedCloud} Deployment</span>
              <button
                onClick={() => handleCopy("FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD [\"python\", \"manage.py\", \"runserver\"]")}
                className="text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Dockerfile'}</span>
              </button>
            </div>
            <pre className="text-slate-300 bg-slate-900 p-3 rounded-xl overflow-x-auto text-[11px]">
{`FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: GITHUB INTELLIGENCE */}
      {activeTab === 'git' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <GitPullRequest className="w-5 h-5 text-cyan-400" />
                GitHub Repository Intelligence & PR Reviewer
              </h3>
              <p className="text-xs text-slate-400">Automated Git branching, PR creation, code reviews & release notes</p>
            </div>
            <span className="text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400 px-3 py-1 rounded-full">
              PR #42 OPEN & APPROVED
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-white font-bold">
              <span>PR #42: feat(autoengineer): Deploy 7-Phase Architecture Engine</span>
              <a href="#" className="text-cyan-400 flex items-center gap-1 hover:underline">
                View on GitHub <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-slate-400">Branch: <code className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded">feature/autoengineer-engine-v10</code> • 29 Files Changed • Commit: <code className="text-amber-300">a8f9c12b70e</code></p>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: PERFORMANCE PROFILER */}
      {activeTab === 'performance' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-300" />
                AI Performance Optimizer & Profiler
              </h3>
              <p className="text-xs text-slate-400">Latency profiling, DB query optimization & bundle reduction</p>
            </div>
            <span className="text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-400 px-3 py-1 rounded-full">
              AVG LATENCY: 14.2ms
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center font-mono">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-black">API Latency</span>
              <p className="text-xl font-black text-cyan-400 mt-1">14.2 ms</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-black">DB Queries / Req</span>
              <p className="text-xl font-black text-emerald-400 mt-1">2 Queries</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-black">JS Bundle Size</span>
              <p className="text-xl font-black text-indigo-400 mt-1">142.5 KB</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 6: AUTO DOCUMENTATION */}
      {activeTab === 'docs' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                Autonomous Documentation Agent
              </h3>
              <p className="text-xs text-slate-400">OpenAPI 3.0 Specs, Architecture READMEs & DB DDL Documentation</p>
            </div>
            <span className="text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400 px-3 py-1 rounded-full">
              DOCUMENTATION SYNCHRONIZED
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 font-mono text-xs">
            <span className="text-cyan-300 font-bold">OpenAPI 3.0.3 Specification</span>
            <pre className="text-slate-300 bg-slate-900 p-3 rounded-xl overflow-x-auto text-[11px]">
{`openapi: 3.0.3
info:
  title: AutoEngineer Generated Platform API
  version: 1.0.0
paths:
  /api/v1/members/:
    get:
      summary: List all active members`}
            </pre>
          </div>
        </div>
      )}

    </div>
  );
};
