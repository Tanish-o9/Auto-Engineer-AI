'use client';
import React, { useState, useEffect } from 'react';
import { 
  Crown, Cpu, Network, GitBranch, Terminal, MessageSquare, Scale, HelpCircle, 
  Flame, BarChart3, Activity, Coins, Landmark, GitCompare, History, ListTodo, 
  AlertTriangle, PlayCircle, Settings, User, FileText, CheckCircle2, 
  ChevronRight, Play, Database, Server, RefreshCw, X, Plus, Trash2, ArrowRight, ShieldCheck
} from 'lucide-react';

// Define TS Interfaces for Dashboard state
interface Agent {
  name: string;
  role: string;
  icon: string;
  status: string;
  cpu: number;
  memory: string;
  tokens: string;
  confidence: string;
  task: string;
}

interface RepoFile {
  path: string;
  complexity: 'High' | 'Medium' | 'Low';
  risk: 'High' | 'Medium' | 'Low';
  coverage: string;
  churn: string;
  loc: number;
  debtHours: number;
}

export const GrandMasterUI = () => {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'agents' | 'heatmap' | 'workflow' | 'finance' | 'evolution'>('overview');

  // Architecture Graph state
  const [selectedArchNode, setSelectedArchNode] = useState<string>('Master AI Orchestrator');

  // Dependency Explorer state
  const [selectedDepFile, setSelectedDepFile] = useState<string>('backend/apps/users/models.py');

  // Agent tab state
  const [selectedAgent, setSelectedAgent] = useState<number>(0);
  const [chatInput, setChatInput] = useState<string>('');
  const [chatLogs, setChatLogs] = useState<Array<{ sender: string; text: string }>>([
    { sender: 'System', text: 'Secure channel initialized. You are connected to the Software Architect Agent.' }
  ]);
  const [debateTopic, setDebateTopic] = useState<string>('SQL vs pgvector for Memory Indexing');
  const [isDebating, setIsDebating] = useState<boolean>(false);
  const [debateLogs, setDebateLogs] = useState<Array<{ agent: string; text: string; role: string }>>([]);
  const [generatedADR, setGeneratedADR] = useState<string>('');

  // Heatmap state
  const [selectedHeatmapFile, setSelectedHeatmapFile] = useState<RepoFile | null>(null);

  // Workflow Pipeline Builder state
  const [pipelineSteps, setPipelineSteps] = useState<Array<{ id: string; name: string; agent: string; status: 'pending' | 'active' | 'completed' }>>([
    { id: '1', name: 'SRS Extraction', agent: 'Planner Agent', status: 'completed' },
    { id: '2', name: 'ADR & Database Schema Design', agent: 'Software Architect Agent', status: 'completed' },
    { id: '3', name: 'FastAPI Backend Core', agent: 'Backend Engineer Agent', status: 'active' },
    { id: '4', name: 'Next.js Interface Assembly', agent: 'Frontend Engineer Agent', status: 'pending' },
    { id: '5', name: 'Security Audit & Compliance', agent: 'Security Engineer Agent', status: 'pending' }
  ]);
  const [newStepName, setNewStepName] = useState<string>('');
  const [newStepAgent, setNewStepAgent] = useState<string>('Planner Agent');

  // Token & Cost Simulator state
  const [monthlyRequests, setMonthlyRequests] = useState<number>(500000);
  const [cacheHitRatio, setCacheHitRatio] = useState<number>(75);
  const [selectedModel, setSelectedModel] = useState<'gemini-1.5' | 'claude-3.5' | 'gpt-4o'>('gemini-1.5');

  // 13 Agents Mock Database
  const agents: Agent[] = [
    { name: "Planner Agent", role: "Requirement & Sprint Decomposition", icon: "🧑‍💼", status: "ONLINE", cpu: 4, memory: "45MB", tokens: "24.5k", confidence: "98%", task: "Evaluating user SRS constraints for next milestone." },
    { name: "Software Architect Agent", role: "HLD / LLD & ADR Generator", icon: "🏗️", status: "ONLINE", cpu: 8, memory: "82MB", tokens: "41.2k", confidence: "99%", task: "Analyzing modular microservices dependencies graph." },
    { name: "Backend Engineer Agent", role: "Django DRF & FastAPI Clean Architecture", icon: "⚙️", status: "ONLINE", cpu: 22, memory: "115MB", tokens: "98.4k", confidence: "95%", task: "Writing REST endpoint routes for unified state controller." },
    { name: "Frontend Engineer Agent", role: "Next.js 14 App Router & Tailwind 3D UI", icon: "🎨", status: "ONLINE", cpu: 12, memory: "94MB", tokens: "75.1k", confidence: "97%", task: "Hot-reloading CSS micro-animations on dashboard workspace." },
    { name: "Database Engineer Agent", role: "PostgreSQL DDL & IVFFlat Indexing", icon: "🗄️", status: "ONLINE", cpu: 15, memory: "78MB", tokens: "32.0k", confidence: "96%", task: "Optimizing pgvector indexing queries for memory search." },
    { name: "API Engineer Agent", role: "REST ViewSets & Swagger OpenAPI 3.0", icon: "⚡", status: "ONLINE", cpu: 6, memory: "52MB", tokens: "19.8k", confidence: "98%", task: "Generating Swagger docs for client-facing controller endpoint." },
    { name: "Testing Engineer Agent", role: "Pytest Backend & Playwright E2E (>90%)", icon: "🧪", status: "ONLINE", cpu: 18, memory: "128MB", tokens: "54.6k", confidence: "94%", task: "Running Playwright workflow automation scripts on staging." },
    { name: "Security Engineer Agent", role: "OWASP Top 10 Audit & Vulnerability Scanner", icon: "🛡️", status: "ONLINE", cpu: 9, memory: "64MB", tokens: "29.2k", confidence: "99%", task: "Validating JWT secret configurations against brute force." },
    { name: "Performance Engineer Agent", role: "Database Query Latency & Redis Cache", icon: "🚀", status: "ONLINE", cpu: 14, memory: "72MB", tokens: "38.7k", confidence: "96%", task: "Simulating cache hit ratio optimization models." },
    { name: "Documentation Engineer Agent", role: "OpenAPI Specs, README & Folder Guides", icon: "📚", status: "ONLINE", cpu: 3, memory: "38MB", tokens: "15.4k", confidence: "97%", task: "Refining markdown tutorials for environment onboarding." },
    { name: "DevOps Engineer Agent", role: "Docker Compose, K8s & CI/CD Pipelines", icon: "📦", status: "ONLINE", cpu: 11, memory: "86MB", tokens: "48.2k", confidence: "95%", task: "Assembling Kubernetes manifest deployments configuration." },
    { name: "Senior Code Reviewer Agent", role: "Architecture Compliance & SOLID Audit", icon: "🔍", status: "ONLINE", cpu: 7, memory: "58MB", tokens: "22.1k", confidence: "98%", task: "Performing syntax and DRY compliance audit checks." },
    { name: "AI Debugger Agent", role: "Log Analysis & Automated Error Recovery", icon: "🐞", status: "ONLINE", cpu: 16, memory: "90MB", tokens: "62.3k", confidence: "96%", task: "Monitoring runtime console reports for latency warnings." }
  ];

  // Repository files mock database
  const repoFiles: RepoFile[] = [
    { path: 'backend/apps/users/models.py', complexity: 'Medium', risk: 'Low', coverage: '94%', churn: 'Low', loc: 120, debtHours: 0.5 },
    { path: 'backend/apps/users/views.py', complexity: 'High', risk: 'Medium', coverage: '88%', churn: 'Medium', loc: 340, debtHours: 2.5 },
    { path: 'backend/config/settings.py', complexity: 'Medium', risk: 'High', coverage: '100%', churn: 'Low', loc: 210, debtHours: 1.0 },
    { path: 'ai-service/app/main.py', complexity: 'High', risk: 'High', coverage: '76%', churn: 'High', loc: 480, debtHours: 6.0 },
    { path: 'ai-service/app/core/orchestrator.py', complexity: 'High', risk: 'High', coverage: '82%', churn: 'High', loc: 650, debtHours: 8.5 },
    { path: 'frontend/components/Navbar.tsx', complexity: 'Low', risk: 'Low', coverage: '90%', churn: 'Medium', loc: 180, debtHours: 0.2 },
    { path: 'frontend/components/auth/LoginScreen.tsx', complexity: 'Medium', risk: 'Medium', coverage: '95%', churn: 'High', loc: 150, debtHours: 1.2 },
    { path: 'frontend/components/grandmaster/GrandMasterUI.tsx', complexity: 'High', risk: 'Medium', coverage: '85%', churn: 'High', loc: 500, debtHours: 3.0 },
    { path: 'infra/k8s/deployment.yaml', complexity: 'Low', risk: 'High', coverage: 'N/A', churn: 'Low', loc: 95, debtHours: 1.5 }
  ];

  // Architecture Nodes Details mock database
  const archNodes: Record<string, { owner: string; purpose: string; files: string[]; dependencies: string[]; complexity: string; health: string }> = {
    'Frontend UI': {
      owner: 'Frontend Engineer Agent',
      purpose: 'Renders the responsive dashboard workspace with real-time UI telemetry.',
      files: ['frontend/app/page.tsx', 'frontend/components/Navbar.tsx'],
      dependencies: ['Master AI Orchestrator', 'FastAPI AI Service'],
      complexity: 'Medium (Next.js & Tailwind CSS)',
      health: 'OPTIMAL (42ms responsiveness)'
    },
    'Master AI Orchestrator': {
      owner: 'Software Architect Agent',
      purpose: 'Coordinates work distribution, task scheduling, and state sync among the 13 agents.',
      files: ['backend/apps/orchestrator/service.py', 'ai-service/app/core/orchestrator.py'],
      dependencies: ['Django API Backend', 'FastAPI AI Service', 'Redis Cache'],
      complexity: 'Very High (13-agent coordination logic)',
      health: 'OPTIMAL (99.8% availability)'
    },
    'Django API Backend': {
      owner: 'Backend Engineer Agent',
      purpose: 'Serves REST API resources, enforces credentials validation, and handles persistence.',
      files: ['backend/apps/users/views.py', 'backend/config/settings.py'],
      dependencies: ['PostgreSQL DB', 'Redis Cache'],
      complexity: 'High (Authentication and relational persistence layers)',
      health: 'OPTIMAL (12ms query execution)'
    },
    'FastAPI AI Service': {
      owner: 'API Engineer Agent',
      purpose: 'Manages deep LLM requests, runs planning logic, and feeds log analysis.',
      files: ['ai-service/app/main.py'],
      dependencies: ['Redis Cache', 'OpenAI/Anthropic APIs'],
      complexity: 'High (Vector search and async response streaming)',
      health: 'OPTIMAL (98.2% accuracy rate)'
    },
    'PostgreSQL DB': {
      owner: 'Database Engineer Agent',
      purpose: 'Maintains core tables, user profiles, and logs history storage.',
      files: ['backend/db.sqlite3 (dev local/PostgreSQL in prod)'],
      dependencies: [],
      complexity: 'Medium (Vector schema indices)',
      health: 'OPTIMAL (99.9% sync rate)'
    },
    'Redis Cache': {
      owner: 'Performance Engineer Agent',
      purpose: 'Acts as cache storage and event bus broker for agent messages.',
      files: ['docker-compose.yml'],
      dependencies: [],
      complexity: 'Low (Key-value pub-sub storage)',
      health: 'OPTIMAL (1.2ms access speed)'
    }
  };

  // Trigger AI Debate Simulator
  const triggerDebate = () => {
    if (isDebating) return;
    setIsDebating(true);
    setDebateLogs([]);
    setGeneratedADR('');

    const debateLines = [
      { agent: "Software Architect Agent", role: "Architect", text: `I propose configuring ${debateTopic} because it enforces a clean architectural boundary and scales query lookups across nodes.` },
      { agent: "Performance Engineer Agent", role: "Performance", text: "I agree, but we must watch caching carefully. If the hit ratio drops below 70%, the latency will rise. We need Redis keys configured with a 300s TTL." },
      { agent: "Security Engineer Agent", role: "Security", text: "From an audit perspective, we also must restrict read permissions on these indexes. Every transaction must be validated against JWT scopes before processing." },
      { agent: "Software Architect Agent", role: "Architect", text: "Excellent points. I will write a new ADR specifying a hybrid cached index with strict claim validations. Let's record the consensus." }
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < debateLines.length) {
        setDebateLogs(prev => [...prev, debateLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsDebating(false);
        setGeneratedADR(`# Architecture Decision Record (ADR)
**Decision ID:** ADR-${Math.floor(100 + Math.random() * 900)}
**Subject:** Implementation of ${debateTopic}
**Status:** APPROVED (Consensus Reached)
**Date:** 2026-07-22

## Context
The AutoEngineer AI workspace requires highly scalable queries with minimum latency overhead.

## Decision
We will employ a hybrid model combining the proposed approach with Redis cache backing, and enforce strict JWT scope checking for authorization controls.

## Consequences
- Latency reduced below 20ms.
- 99.8% query verification guarantee.
- Added Redis caching memory footprint.`);
      }
    }, 1500);
  };

  // Add custom step to pipeline builder
  const handleAddPipelineStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStepName.trim()) return;
    const newStep = {
      id: String(pipelineSteps.length + 1),
      name: newStepName.trim(),
      agent: newStepAgent,
      status: 'pending' as const
    };
    setPipelineSteps(prev => [...prev, newStep]);
    setNewStepName('');
  };

  // Chat agent response simulation
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setChatLogs(prev => [...prev, { sender: 'Developer', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      const activeAgentName = agents[selectedAgent].name;
      const responses = [
        `I've analyzed the query. Regarding your task: "${userText}", I am currently busy with: "${agents[selectedAgent].task}". We are maintaining a confidence rating of ${agents[selectedAgent].confidence}.`,
        `Understood. I will verify if there are any circular dependencies in the repository matching your query. Let me look at the active schema files.`,
        `That suggestion makes sense. I have cached this parameter check in the memory registers for optimization checks. What would you like to review next?`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatLogs(prev => [...prev, { sender: activeAgentName, text: randomResponse }]);
    }, 1000);
  };

  // Calculate dynamic Token & Cost variables in real-time
  const getInferenceCost = () => {
    const rate = selectedModel === 'gemini-1.5' ? 0.0000012 : selectedModel === 'claude-3.5' ? 0.000003 : 0.0000025;
    const tokens = monthlyRequests * 1250;
    const rawCost = tokens * rate;
    const savings = rawCost * (cacheHitRatio / 100);
    return {
      tokens,
      rawCost: rawCost.toFixed(2),
      savings: savings.toFixed(2),
      finalCost: (rawCost - savings).toFixed(2)
    };
  };

  const costResult = getInferenceCost();

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6 font-mono text-xs text-slate-300">
      
      {/* 3D Glassmorphic Main Banner */}
      <div className="glass-panel-3d relative bg-slate-900/90 border border-slate-700/60 p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="absolute top-0 left-1/3 right-10 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
              <Crown className="w-3.5 h-3.5" />
              Module 26: Supreme Engineering Operating System
            </span>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">Grand Master Experience Layer</h2>
          </div>
          <p className="text-xs text-slate-400 font-bold max-w-xl">
            A visual, interactive command and control interface mapping repository code complexity, AI debates, dependency structures, and live cost simulations.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 shadow-inner">
          <div className="text-center min-w-[100px]">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">System Integrity</span>
            <span className="text-base font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              99.8% (A)
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center min-w-[100px]">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Agents Coordinated</span>
            <span className="text-base font-black text-cyan-400 block mt-0.5">13 / 13</span>
          </div>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/80">
        {[
          { id: 'overview', label: 'Command Center', icon: Landmark },
          { id: 'architecture', label: 'Arch & Dependencies', icon: Network },
          { id: 'agents', label: 'Agent Hub & Debate', icon: Cpu },
          { id: 'heatmap', label: 'Repo Heatmap & Debt', icon: Flame },
          { id: 'workflow', label: 'Workflow Designer', icon: ListTodo },
          { id: 'finance', label: 'Cost Simulator', icon: Coins },
          { id: 'evolution', label: 'Evolution & Recovery', icon: GitBranch }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-indigo-600 text-black shadow-lg font-black scale-[1.02]' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT SPACES */}
      
      {/* 1. OVERVIEW / COMMAND CENTER */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Main Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Repository Health', val: '94% (Grade A)', desc: '0 syntax bugs, 2 security warnings', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/5' },
              { label: 'Execution Latency', val: '42 ms', desc: 'Optimal Redis cache hit rate', icon: Activity, color: 'text-cyan-400', bg: 'bg-cyan-500/5' },
              { label: 'Active Pipeline Status', val: 'COMPILING /', desc: 'Phase 3: Code generation active', icon: PlayCircle, color: 'text-amber-400', bg: 'bg-amber-500/5' },
              { label: 'Inference Burn Rate', val: '$14.28 / day', desc: 'Cached query savings enabled', icon: Coins, color: 'text-purple-400', bg: 'bg-purple-500/5' }
            ].map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className={`bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl shadow-md ${m.bg} flex items-start justify-between`}>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">{m.label}</span>
                    <span className={`text-base font-black ${m.color} block`}>{m.val}</span>
                    <span className="text-[9px] text-slate-400 block">{m.desc}</span>
                  </div>
                  <Icon className={`w-5 h-5 ${m.color}`} />
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Burndown Graph & Sprint Intel */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 md:col-span-2">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  Sprint burndown & capacity telemetry
                </h3>
                <span className="text-[10px] font-black text-slate-400">MILESTONE v1.0.2</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-full h-40 bg-slate-950/80 border border-slate-800 rounded-xl relative p-4 flex flex-col justify-between">
                  {/* Fake Burndown Line drawing via SVG */}
                  <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="10" x2="100" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="4" />
                    <path d="M 0 12 L 20 25 L 40 20 L 60 45 L 80 40 L 100 80" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                    <circle cx="60" cy="45" r="3" fill="#22d3ee" />
                  </svg>
                  <div className="flex justify-between w-full text-[9px] text-slate-500 z-10">
                    <span>Target Ideal Burndown</span>
                    <span className="text-cyan-400 font-bold">Current Team Velocity</span>
                  </div>
                  <div className="flex justify-between w-full mt-auto text-[9px] text-slate-600 z-10 font-bold">
                    <span>Day 1</span>
                    <span>Day 4</span>
                    <span>Day 8</span>
                    <span>Day 10 (Target)</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-950 p-2.5 border border-slate-800 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">Total Points</span>
                  <span className="text-sm font-black text-white">48 SP</span>
                </div>
                <div className="bg-slate-950 p-2.5 border border-slate-800 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">Completed</span>
                  <span className="text-sm font-black text-emerald-400">32 SP</span>
                </div>
                <div className="bg-slate-950 p-2.5 border border-slate-800 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">Burndown Index</span>
                  <span className="text-sm font-black text-cyan-400">Stable</span>
                </div>
              </div>
            </div>

            {/* Live Logs & Incidents Feed */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
                  Live Failover & Recovery Monitor
                </h3>
              </div>
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {[
                  { time: '13:04:12', msg: 'Django database connection lost. Restoring socket link...', type: 'alert' },
                  { time: '13:04:15', msg: 'Failover socket instantiated. Connected to Backup Postgres Node.', type: 'ok' },
                  { time: '13:09:42', msg: 'Memory usage spike on Celery worker. Garbage collection triggered.', type: 'warn' },
                  { time: '13:10:02', msg: 'AI Debugger Agent applied memory cleanup. Overhead stable at 72MB.', type: 'ok' },
                  { time: '13:22:15', msg: 'Hot-reload state update registered on LoginScreen component.', type: 'info' }
                ].map((log, idx) => (
                  <div key={idx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 flex flex-col gap-1 text-[10px]">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-bold">{log.time}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                        log.type === 'alert' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                        log.type === 'warn' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 
                        log.type === 'ok' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                        'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                      }`}>
                        {log.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-300 font-bold leading-normal">{log.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ARCHITECTURE & DEPENDENCIES */}
      {activeTab === 'architecture' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SVG Live Architecture Graph */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-400" />
                Live system architecture topology
              </h3>
              <span className="text-[10px] text-slate-500 block">(Click node to inspect metadata)</span>
            </div>
            
            {/* Interactive Architecture SVG */}
            <div className="bg-slate-950/80 rounded-2xl border border-slate-800 relative h-96 flex items-center justify-center p-4">
              <svg className="w-full h-full" viewBox="0 0 500 350">
                {/* Connection lines */}
                <line x1="250" y1="50" x2="120" y2="150" stroke="#475569" strokeWidth="2" strokeDasharray="3" />
                <line x1="250" y1="50" x2="380" y2="150" stroke="#475569" strokeWidth="2" strokeDasharray="3" />
                <line x1="120" y1="150" x2="120" y2="280" stroke="#475569" strokeWidth="1.5" />
                <line x1="120" y1="150" x2="250" y2="280" stroke="#475569" strokeWidth="1.5" />
                <line x1="380" y1="150" x2="250" y2="280" stroke="#475569" strokeWidth="1.5" />
                <line x1="380" y1="150" x2="380" y2="280" stroke="#475569" strokeWidth="1.5" />
                <line x1="120" y1="280" x2="250" y2="280" stroke="#475569" strokeWidth="1.5" />

                {/* Nodes */}
                {/* Node 1: Master AI Orchestrator */}
                <g onClick={() => setSelectedArchNode('Master AI Orchestrator')} className="cursor-pointer group">
                  <rect x="175" y="20" width="150" height="50" rx="10" 
                    fill={selectedArchNode === 'Master AI Orchestrator' ? '#1e1b4b' : '#0f172a'} 
                    stroke={selectedArchNode === 'Master AI Orchestrator' ? '#22d3ee' : '#334155'} 
                    strokeWidth="2.5" className="transition duration-200 group-hover:stroke-cyan-400" />
                  <text x="250" y="48" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">Master Orchestrator</text>
                  <circle cx="250" cy="20" r="4" fill="#10b981" />
                </g>

                {/* Node 2: Frontend UI */}
                <g onClick={() => setSelectedArchNode('Frontend UI')} className="cursor-pointer group">
                  <rect x="45" y="125" width="150" height="50" rx="10" 
                    fill={selectedArchNode === 'Frontend UI' ? '#1e1b4b' : '#0f172a'} 
                    stroke={selectedArchNode === 'Frontend UI' ? '#22d3ee' : '#334155'} 
                    strokeWidth="2.5" className="transition duration-200 group-hover:stroke-cyan-400" />
                  <text x="120" y="153" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">Frontend Portal (Next.js)</text>
                  <circle cx="120" cy="125" r="4" fill="#10b981" />
                </g>

                {/* Node 3: FastAPI AI Service */}
                <g onClick={() => setSelectedArchNode('FastAPI AI Service')} className="cursor-pointer group">
                  <rect x="305" y="125" width="150" height="50" rx="10" 
                    fill={selectedArchNode === 'FastAPI AI Service' ? '#1e1b4b' : '#0f172a'} 
                    stroke={selectedArchNode === 'FastAPI AI Service' ? '#22d3ee' : '#334155'} 
                    strokeWidth="2.5" className="transition duration-200 group-hover:stroke-cyan-400" />
                  <text x="380" y="153" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">FastAPI AI service</text>
                  <circle cx="380" cy="125" r="4" fill="#10b981" />
                </g>

                {/* Node 4: Django API Backend */}
                <g onClick={() => setSelectedArchNode('Django API Backend')} className="cursor-pointer group">
                  <rect x="45" y="255" width="150" height="50" rx="10" 
                    fill={selectedArchNode === 'Django API Backend' ? '#1e1b4b' : '#0f172a'} 
                    stroke={selectedArchNode === 'Django API Backend' ? '#22d3ee' : '#334155'} 
                    strokeWidth="2.5" className="transition duration-200 group-hover:stroke-cyan-400" />
                  <text x="120" y="283" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">Django Backend</text>
                  <circle cx="120" cy="255" r="4" fill="#10b981" />
                </g>

                {/* Node 5: PostgreSQL DB */}
                <g onClick={() => setSelectedArchNode('PostgreSQL DB')} className="cursor-pointer group">
                  <rect x="220" y="275" width="60" height="40" rx="8" 
                    fill={selectedArchNode === 'PostgreSQL DB' ? '#1e1b4b' : '#0f172a'} 
                    stroke={selectedArchNode === 'PostgreSQL DB' ? '#22d3ee' : '#334155'} 
                    strokeWidth="2" className="transition duration-200 group-hover:stroke-cyan-400" />
                  <text x="250" y="299" textAnchor="middle" fill="#94a3b8" fontWeight="bold" fontSize="8">Postgres DB</text>
                </g>

                {/* Node 6: Redis Cache */}
                <g onClick={() => setSelectedArchNode('Redis Cache')} className="cursor-pointer group">
                  <rect x="350" y="275" width="60" height="40" rx="8" 
                    fill={selectedArchNode === 'Redis Cache' ? '#1e1b4b' : '#0f172a'} 
                    stroke={selectedArchNode === 'Redis Cache' ? '#22d3ee' : '#334155'} 
                    strokeWidth="2" className="transition duration-200 group-hover:stroke-cyan-400" />
                  <text x="380" y="299" textAnchor="middle" fill="#94a3b8" fontWeight="bold" fontSize="8">Redis Cache</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Metadata Inspector & Dependency Explorer */}
          <div className="space-y-6">
            {/* Metadata Inspector */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  Node Metadata Inspector
                </h3>
                <span className="text-[10px] font-black text-cyan-400 uppercase font-mono">{selectedArchNode ? 'Active' : 'No Node Selected'}</span>
              </div>
              {selectedArchNode && archNodes[selectedArchNode] ? (
                <div className="space-y-4">
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-bold text-slate-500 uppercase block">Node Name</span>
                    <span className="text-sm font-black text-white block">{selectedArchNode}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-300 leading-relaxed font-bold">{archNodes[selectedArchNode].purpose}</p>
                    <div className="h-px bg-slate-800/80 my-2" />
                    <p><strong className="text-white font-black">Agent Owner:</strong> {archNodes[selectedArchNode].owner}</p>
                    <p><strong className="text-white font-black">Complexity:</strong> {archNodes[selectedArchNode].complexity}</p>
                    <p><strong className="text-white font-black">Node Health:</strong> {archNodes[selectedArchNode].health}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Dependencies Linkage:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {archNodes[selectedArchNode].dependencies.length > 0 ? (
                        archNodes[selectedArchNode].dependencies.map((dep, idx) => (
                          <span key={idx} className="bg-slate-950 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-800 text-slate-300">{dep}</span>
                        ))
                      ) : (
                        <span className="text-slate-500 font-bold">None</span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 text-center">Click a node on the graph to inspect properties.</p>
              )}
            </div>

            {/* Dependency Explorer */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <GitCompare className="w-4 h-4 text-indigo-400" />
                  Code File Dependency Analyzer
                </h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Target File Path</label>
                  <select 
                    value={selectedDepFile}
                    onChange={(e) => setSelectedDepFile(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 p-2.5 rounded-xl outline-none"
                  >
                    {repoFiles.map((file, idx) => (
                      <option key={idx} value={file.path}>{file.path}</option>
                    ))}
                  </select>
                </div>
                
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <span className="text-slate-400 font-bold">Circular Dependencies</span>
                    <span className="text-emerald-400 font-bold uppercase text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">None Detected</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Impact Graph (Modifying file affects)</span>
                    <p className="text-[10px] text-slate-300 leading-relaxed font-bold">
                      {selectedDepFile.includes('users') ? 'User profiles views, credentials token validations, database migration parameters.' : 
                       selectedDepFile.includes('orchestrator') ? '13 engineering agents synchronization indexes, workflow task loops execution speed.' : 
                       'Local rendering component properties, hot-reload cache parameters.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. AGENT HUB & DEBATE */}
      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Agent Registry (13 Agents) */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                13-Agent Registry Index
              </h3>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">ALL ONLINE</span>
            </div>
            
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {agents.map((ag, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedAgent(idx)}
                  className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    selectedAgent === idx 
                      ? 'bg-slate-950 border-cyan-400 shadow-md' 
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl bg-slate-900 p-2.5 rounded-xl border border-slate-800">{ag.icon}</span>
                    <div>
                      <h4 className="text-white font-black text-xs">{ag.name}</h4>
                      <p className="text-[10px] text-slate-500 truncate max-w-[150px] font-medium">{ag.role}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${selectedAgent === idx ? 'text-cyan-400' : 'text-slate-600'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Selected Agent Inspector & Chat */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Agent Inspection Console
              </h3>
              <span className="text-[10px] text-slate-400 uppercase font-mono">{agents[selectedAgent].icon} {agents[selectedAgent].name}</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="bg-slate-950 p-2.5 border border-slate-800 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">CPU usage</span>
                  <span className="text-xs font-black text-white">{agents[selectedAgent].cpu}%</span>
                </div>
                <div className="bg-slate-950 p-2.5 border border-slate-800 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">Memory usage</span>
                  <span className="text-xs font-black text-white">{agents[selectedAgent].memory}</span>
                </div>
                <div className="bg-slate-950 p-2.5 border border-slate-800 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">Confidence</span>
                  <span className="text-xs font-black text-emerald-400">{agents[selectedAgent].confidence}</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Current Task:</span>
                <p className="text-[11px] font-bold text-slate-300 leading-normal">{agents[selectedAgent].task}</p>
              </div>

              <div className="border border-slate-800 rounded-xl bg-slate-950 overflow-hidden flex flex-col h-48">
                <div className="bg-slate-900/60 p-2 border-b border-slate-800 flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-300" />
                  Direct Agent Chat Channel
                </div>
                <div className="flex-1 p-3 overflow-y-auto space-y-2 text-[10px]">
                  {chatLogs.map((log, idx) => (
                    <div key={idx} className={`max-w-[85%] p-2 rounded-xl border ${
                      log.sender === 'Developer' 
                        ? 'ml-auto bg-cyan-950/40 border-cyan-800 text-cyan-200' 
                        : log.sender === 'System'
                        ? 'mx-auto text-center bg-slate-900 border-slate-800 text-slate-500'
                        : 'mr-auto bg-slate-900 border-slate-800 text-slate-300'
                    }`}>
                      <span className="font-black text-[8px] text-slate-400 block mb-0.5">{log.sender}</span>
                      <p className="leading-relaxed font-bold">{log.text}</p>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendChatMessage} className="border-t border-slate-800 p-2 bg-slate-900 flex gap-2">
                  <input 
                    type="text" 
                    placeholder={`Chat with ${agents[selectedAgent].name}...`}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2 text-[11px] outline-none text-white focus:border-cyan-500"
                  />
                  <button type="submit" className="bg-cyan-500 text-black px-3.5 py-1 rounded-lg font-black hover:bg-cyan-400 text-[10px] cursor-pointer">Send</button>
                </form>
              </div>
            </div>
          </div>

          {/* AI Debate Mode Component */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-400" />
                AI Debate Mode & ADR builder
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Select Debate Subject</label>
                <select 
                  value={debateTopic}
                  onChange={(e) => setDebateTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-300 p-2.5 rounded-xl outline-none"
                  disabled={isDebating}
                >
                  <option value="SQL vs pgvector for Memory Indexing">SQL vs pgvector for Memory Indexing</option>
                  <option value="REST ViewSets vs WebSockets for Live Logs">REST vs WebSockets for Logs</option>
                  <option value="Next.js App Router vs Pages Routing structure">Next.js Router structures</option>
                </select>
              </div>

              <button 
                onClick={triggerDebate} 
                disabled={isDebating}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white py-3.5 rounded-xl font-black flex items-center justify-center gap-2 border border-purple-500/20 shadow-md cursor-pointer"
              >
                {isDebating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Debate Simulation Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-white" />
                    <span>Trigger AI Debate</span>
                  </>
                )}
              </button>

              <div className="border border-slate-800 rounded-xl bg-slate-950 p-3 h-48 overflow-y-auto space-y-2 text-[10px]">
                {debateLogs.length === 0 ? (
                  <p className="text-slate-500 text-center mt-12 font-bold">Trigger a debate to simulate AI consensus process.</p>
                ) : (
                  debateLogs.map((log, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800/80 p-2.5 rounded-xl flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-cyan-400">{log.agent}</span>
                        <span className="text-[8px] bg-slate-950 text-slate-500 px-2 py-0.5 rounded border border-slate-800 uppercase font-black">{log.role}</span>
                      </div>
                      <p className="text-slate-300 leading-normal font-bold">{log.text}</p>
                    </div>
                  ))
                )}
              </div>

              {generatedADR && (
                <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 text-[10px] space-y-2 max-h-40 overflow-y-auto shadow-inner">
                  <span className="text-[8px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Consensus ADR Generated</span>
                  <pre className="text-slate-300 whitespace-pre-wrap leading-normal font-bold font-mono">{generatedADR}</pre>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* 4. REPOSITORY HEATMAP & DEBT */}
      {activeTab === 'heatmap' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Visual Interactive Heatmap Universe */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
                Repository Universe & Code Complexity Heatmap
              </h3>
              <span className="text-[10px] text-slate-500 block">(Hover or click files to inspect details)</span>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 min-h-96 flex flex-col justify-between">
              <div className="grid grid-cols-3 gap-4">
                {/* Visual Representation of folder boundaries */}
                {[
                  { name: 'backend/apps', files: repoFiles.filter(f => f.path.startsWith('backend/apps')) },
                  { name: 'ai-service/app', files: repoFiles.filter(f => f.path.startsWith('ai-service')) },
                  { name: 'frontend/components', files: repoFiles.filter(f => f.path.startsWith('frontend') || f.path.startsWith('infra')) }
                ].map((folder, folderIdx) => (
                  <div key={folderIdx} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl space-y-3">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block border-b border-slate-800 pb-1">{folder.name}</span>
                    <div className="grid grid-cols-2 gap-2">
                      {folder.files.map((file, fileIdx) => (
                        <div 
                          key={fileIdx} 
                          onClick={() => setSelectedHeatmapFile(file)}
                          className={`p-3 rounded-lg border cursor-pointer text-[9px] font-black flex flex-col justify-between transition-all duration-200 ${
                            selectedHeatmapFile?.path === file.path
                              ? 'border-white scale-[1.03] shadow-md'
                              : 'border-slate-800'
                          } ${
                            file.complexity === 'High' ? 'bg-rose-950/40 text-rose-300 border-rose-800/80 hover:bg-rose-950/60' :
                            file.complexity === 'Medium' ? 'bg-amber-950/40 text-amber-300 border-amber-800/80 hover:bg-amber-950/60' :
                            'bg-emerald-950/40 text-emerald-300 border-emerald-800/80 hover:bg-emerald-950/60'
                          }`}
                        >
                          <span className="truncate block font-bold" title={file.path}>{file.path.split('/').pop()}</span>
                          <div className="flex justify-between items-center mt-2 text-[8px] opacity-75">
                            <span>LOC: {file.loc}</span>
                            <span className={`px-1.5 py-0.5 rounded font-black ${
                              file.complexity === 'High' ? 'bg-rose-500/20 text-rose-300' :
                              file.complexity === 'Medium' ? 'bg-amber-500/20 text-amber-300' :
                              'bg-emerald-500/20 text-emerald-300'
                            }`}>{file.complexity[0]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Heatmap Legend */}
              <div className="flex gap-4 items-center border-t border-slate-900 pt-4 text-[9px] text-slate-400">
                <span className="font-bold uppercase tracking-widest">Complexity Index:</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-800" /> Low (LOC & Churn safe)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-500/20 border border-amber-800" /> Medium (Audit recommended)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-rose-500/20 border border-rose-800" /> High Complexity / Risk</span>
              </div>
            </div>
          </div>

          {/* Technical Debt Dashboard */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Landmark className="w-4 h-4 text-amber-400" />
                Technical Debt & Code Audit Info
              </h3>
            </div>

            {selectedHeatmapFile ? (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">Selected File</span>
                  <span className="text-xs font-black text-white block break-all font-bold">{selectedHeatmapFile.path}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-950 p-3 border border-slate-800 rounded-xl">
                    <span className="text-[9px] font-bold text-slate-500 uppercase block">Refactoring Debt</span>
                    <span className="text-sm font-black text-amber-300">{selectedHeatmapFile.debtHours} hours</span>
                  </div>
                  <div className="bg-slate-950 p-3 border border-slate-800 rounded-xl">
                    <span className="text-[9px] font-bold text-slate-500 uppercase block">Test Coverage</span>
                    <span className="text-sm font-black text-emerald-400">{selectedHeatmapFile.coverage}</span>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3 text-[11px] leading-relaxed">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-900 pb-1.5">Cleanup Priority Suggestions:</span>
                  <p className="text-slate-300 font-bold">
                    {selectedHeatmapFile.complexity === 'High' 
                      ? '⚠️ Code base exceeds standard cognitive complexity parameters. Decompose large functions into reusable modules and mock dependency classes.' 
                      : '✓ File adheres to SOLID design conventions. Continue monitoring for duplicate controller statements.'}
                  </p>
                  <p className="text-slate-300 font-bold">
                    {selectedHeatmapFile.risk === 'High' 
                      ? '🔒 HIGH SECURITY BOUNDARY: This file lies on crucial system boundaries. Ensure automated OWASP token verification tests cover >95% branches.' 
                      : '✓ Lower operational vulnerability risk index.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-500 space-y-3">
                <p className="font-bold">Select a file on the Heatmap Universe to view its technical debt analysis and recommendations.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. WORKFLOW DESIGNER */}
      {activeTab === 'workflow' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Interactive Workflow Builder Canvas */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-cyan-400" />
                Pipeline Workflow Builder Canvas
              </h3>
              <span className="text-[10px] text-slate-500 block">(Click step to edit status)</span>
            </div>

            {/* Pipeline Canvas Diagram */}
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 min-h-96 flex flex-col gap-6 items-center justify-center relative">
              <div className="flex flex-col gap-5 items-center w-full max-w-lg">
                {pipelineSteps.map((step, idx) => (
                  <React.Fragment key={step.id}>
                    <div 
                      onClick={() => {
                        const newStatus = step.status === 'pending' ? 'active' : step.status === 'active' ? 'completed' : 'pending';
                        setPipelineSteps(prev => prev.map(s => s.id === step.id ? { ...s, status: newStatus } : s));
                      }}
                      className={`w-full p-4 rounded-xl border cursor-pointer transition duration-200 flex items-center justify-between group hover:border-cyan-400/80 shadow-md ${
                        step.status === 'completed' ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300' :
                        step.status === 'active' ? 'bg-cyan-950/30 border-cyan-800 text-cyan-300 border-2' :
                        'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                          step.status === 'completed' ? 'bg-emerald-500 text-black' :
                          step.status === 'active' ? 'bg-cyan-500 text-black animate-pulse' :
                          'bg-slate-950 border border-slate-800 text-slate-500'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-xs font-black text-white">{step.name}</h4>
                          <span className="text-[9px] text-slate-400 font-bold">Assigned to: {step.agent}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                          step.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                          step.status === 'active' ? 'bg-cyan-500/20 text-cyan-300 animate-pulse' :
                          'bg-slate-950 text-slate-500 border border-slate-800'
                        }`}>
                          {step.status}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setPipelineSteps(prev => prev.filter(s => s.id !== step.id));
                          }}
                          className="text-slate-500 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {idx < pipelineSteps.length - 1 && (
                      <div className="flex items-center justify-center h-4">
                        <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Controls to Add Steps */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                Add Workflow Stage
              </h3>
            </div>

            <form onSubmit={handleAddPipelineStep} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-500 uppercase block">Task Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Docker Containerization"
                  value={newStepName}
                  onChange={(e) => setNewStepName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 outline-none text-white focus:border-cyan-500 text-xs font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-500 uppercase block">Assigned Engineering Agent</label>
                <select 
                  value={newStepAgent}
                  onChange={(e) => setNewStepAgent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl outline-none text-slate-300 text-xs"
                >
                  {agents.map((ag, idx) => (
                    <option key={idx} value={ag.name}>{ag.name}</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-cyan-500 text-black font-black text-xs py-3.5 rounded-xl shadow-lg transition hover:bg-cyan-400 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>Inject Stage into Canvas</span>
              </button>
            </form>

            <div className="h-px bg-slate-800/80 my-4" />

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-widest border-b border-slate-900 pb-1.5">Pipeline Replay & Control:</span>
              <div className="flex gap-2">
                <button className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 p-2.5 rounded-lg flex items-center justify-center gap-1 font-bold">
                  <Play className="w-3.5 h-3.5 text-cyan-400" /> Play
                </button>
                <button className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 p-2.5 rounded-lg flex items-center justify-center gap-1 font-bold">
                  <RefreshCw className="w-3.5 h-3.5 text-cyan-400" /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. TOKEN & COST SIMULATOR */}
      {activeTab === 'finance' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sliders Input Panel */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-6">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Coins className="w-4 h-4 text-cyan-400" />
                Model Inference & Caching Cost Simulator
              </h3>
            </div>

            <div className="space-y-6">
              {/* Slider 1: Monthly Requests */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Projected Monthly Requests</span>
                  <span className="text-white text-sm font-black">{monthlyRequests.toLocaleString()} reqs</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="5000000" 
                  step="10000"
                  value={monthlyRequests} 
                  onChange={(e) => setMonthlyRequests(Number(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-950 cursor-pointer h-1.5 rounded-lg"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                  <span>10k req/mo</span>
                  <span>5M req/mo</span>
                </div>
              </div>

              {/* Slider 2: Cache Hit Ratio */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Redis Cache Hit Ratio</span>
                  <span className="text-white text-sm font-black">{cacheHitRatio}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="5"
                  value={cacheHitRatio} 
                  onChange={(e) => setCacheHitRatio(Number(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-950 cursor-pointer h-1.5 rounded-lg"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                  <span>0% (No Caching)</span>
                  <span>100% (Fully Cached)</span>
                </div>
              </div>

              {/* Model Choice Selector */}
              <div className="space-y-2">
                <span className="text-slate-400 font-bold block mb-1">Target Engine Model</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'gemini-1.5', name: 'Gemini 1.5 Pro', rate: '$1.20 / M tokens' },
                    { id: 'gpt-4o', name: 'GPT-4o Engine', rate: '$2.50 / M tokens' },
                    { id: 'claude-3.5', name: 'Claude 3.5 Sonnet', rate: '$3.00 / M tokens' }
                  ].map(model => (
                    <div 
                      key={model.id}
                      onClick={() => setSelectedModel(model.id as any)}
                      className={`p-4 rounded-xl border cursor-pointer text-center space-y-1 transition duration-200 ${
                        selectedModel === model.id 
                          ? 'bg-indigo-950/40 border-indigo-500/80 shadow-md text-white' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-black block">{model.name}</span>
                      <span className="text-[9px] text-slate-500 font-bold block">{model.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Forecast Calculations */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Dynamic Financial Forecast
              </h3>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Raw Token Count</span>
                <span className="text-base font-black text-white">{(costResult.tokens / 1000000).toFixed(2)}M tokens / mo</span>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Baseline Cost</span>
                <span className="text-base font-black text-rose-400">${costResult.rawCost}</span>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Redis Cache Savings</span>
                <span className="text-base font-black text-emerald-400">-${costResult.savings}</span>
              </div>

              <div className="bg-indigo-950/30 p-5 border border-indigo-500/30 rounded-xl space-y-1 shadow-inner">
                <span className="text-[9px] font-bold text-indigo-400 uppercase block">Final Estimated Bill</span>
                <span className="text-lg font-black text-cyan-300">${costResult.finalCost} / mo</span>
              </div>

              <div className="text-[9.5px] text-slate-400 font-bold leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                💡 <span className="text-slate-300">Optimization Tip:</span> By raising cache ratio to 90%, you can save an extra <strong className="text-emerald-400">${(Number(costResult.rawCost) * 0.15).toFixed(2)}</strong> this month!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. EVOLUTION & RECOVERY */}
      {activeTab === 'evolution' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Self-Evolution Timeline */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                AI Self-Evolution & Prompt Tuning Timeline
              </h3>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 min-h-96 relative space-y-6">
              {[
                { version: 'v1.0.0 (Base)', date: '2026-07-20', improvements: 'Initial coordination loop configured across 13 agents.', result: '90.2% accuracy rate' },
                { version: 'v1.0.1 (Tuned)', date: '2026-07-21', improvements: 'Tuned API request retries sequence and optimized database schema structures.', result: '95.4% accuracy rate (+5.2%)' },
                { version: 'v1.0.2 (Optimal)', date: '2026-07-22 (Live)', improvements: 'Instantiated credentials validation caching and auto-fill components bypass.', result: '99.8% accuracy rate (+4.4%)' }
              ].map((ev, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-slate-950 flex items-center justify-center z-10" />
                    {idx < 2 && <div className="w-0.5 h-16 bg-slate-800" />}
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-black text-white text-xs">{ev.version}</span>
                      <span className="text-[9px] text-slate-500 font-bold">{ev.date}</span>
                    </div>
                    <p className="text-slate-300 leading-normal font-bold">{ev.improvements}</p>
                    <span className="text-[9.5px] font-black text-emerald-400 block">{ev.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recovery Checkpoint Failover */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                Failover Checkpoints
              </h3>
            </div>

            <div className="space-y-4">
              <span className="text-[9px] font-bold text-slate-500 uppercase block tracking-widest">Select Recovery Checkpoint</span>
              
              <div className="space-y-3">
                {[
                  { name: 'chk_v2_models_stable', date: '5 hours ago', size: '2.4 MB', active: true },
                  { name: 'chk_v1_auth_fallback', date: '1 day ago', size: '1.8 MB', active: false },
                  { name: 'chk_v1_base_schema', date: '2 days ago', size: '1.2 MB', active: false }
                ].map((chk, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border flex justify-between items-center transition ${
                    chk.active 
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}>
                    <div>
                      <span className="text-xs font-black block font-mono">{chk.name}</span>
                      <span className="text-[9px] text-slate-500 font-bold block mt-0.5">{chk.date} • {chk.size}</span>
                    </div>
                    {chk.active ? (
                      <span className="text-[9px] font-black bg-emerald-500/20 border border-emerald-400 px-2 py-0.5 rounded uppercase">Active</span>
                    ) : (
                      <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 px-2.5 py-1 rounded text-[9px] font-black text-slate-300 cursor-pointer">Restore</button>
                    )}
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-800/80 my-4" />

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[10px] leading-relaxed text-slate-400">
                <span className="text-[9px] font-bold text-slate-300 block mb-1">ℹ️ Recovery Protocol Notes:</span>
                Failover checkpoints automatically store vector indices, project manifest layouts, and LLM prompt logs. In case of fatal schema conflict, restore checks will rollback local file modifications within 4.2 seconds.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
