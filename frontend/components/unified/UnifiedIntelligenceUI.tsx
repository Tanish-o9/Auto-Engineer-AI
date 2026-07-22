'use client';
import React, { useState } from 'react';
import { 
  Users, Wifi, Layers, Globe2, BrainCircuit, CheckCircle2, RefreshCw, 
  Box, AlertCircle, Info, Landmark, ShieldCheck, Activity, Coins, 
  Network, GitBranch, ArrowRight, Play, X, Plus, Trash2, ShieldAlert,
  BarChart3, Scale, Terminal
} from 'lucide-react';

interface HealthScore {
  category: string;
  score: number;
  status: 'Optimal' | 'Stable' | 'Critical';
}

interface Recommendation {
  id: string;
  title: string;
  rationale: string;
  confidence: string;
  impact: 'High' | 'Medium' | 'Low';
  approved: boolean;
}

export const UnifiedIntelligenceUI = () => {
  // Navigation Tabs for Unified Intelligence Core
  const [activeTab, setActiveTab] = useState<'overview' | 'orchestration' | 'knowledge_graph' | 'decision_engine' | 'predictive' | 'refactoring'>('overview');

  // Health Scores (Section 6)
  const [healthScores, setHealthScores] = useState<HealthScore[]>([
    { category: 'Platform Health', score: 99.8, status: 'Optimal' },
    { category: 'Agent Health', score: 98.4, status: 'Optimal' },
    { category: 'Repository Health', score: 94.0, status: 'Stable' },
    { category: 'Runtime Health', score: 99.9, status: 'Optimal' },
    { category: 'Cloud Infrastructure Health', score: 99.99, status: 'Optimal' },
    { category: 'Security & Compliance Health', score: 100, status: 'Optimal' }
  ]);

  // Decision Engine Topics (Section 5)
  const [decisionTopic, setDecisionTopic] = useState<'microservices' | 'rust_core' | 'geo_db'>('microservices');
  
  // Dynamic recommendations (Section 18)
  const [recs, setRecs] = useState<Recommendation[]>([
    { id: 'rec-01', title: 'Refactor circular model dependency in backend/users', rationale: 'Resolving circular imports will speed up Next.js hot-reload compilation time by 15%.', confidence: '98%', impact: 'Medium', approved: false },
    { id: 'rec-02', title: 'Migrate cache connection strings to IAM private links', rationale: 'Removes password credentials from configuration files, improving security compliance health to 100%.', confidence: '99%', impact: 'High', approved: false },
    { id: 'rec-03', title: 'Introduce Redis Query Caching on stats endpoints', rationale: 'Reduces database load by 35% during peak traffic spikes.', confidence: '94%', impact: 'Low', approved: false }
  ]);

  // Predictive Intelligence Timeline (Section 7)
  const [predictions] = useState([
    { time: 'In 2 days', event: 'Predicted Technical Debt Growth', desc: 'Django settings refactor debt will grow by 1.5 hours if views are not cleaned.', level: 'Low' },
    { time: 'In 5 days', event: 'Inference Cost Increase Alert', desc: 'Weekly API tokens usage projected to breach $150 budget limit due to agent retry loops.', level: 'Medium' },
    { time: 'In 2 weeks', event: 'Kubernetes Cluster Auto-Scaling Event', desc: 'Primary node memory load will breach 85% SLA due to scheduled end-of-month reporting scripts.', level: 'High' }
  ]);

  // Knowledge Graph nodes selection (Section 3)
  const [selectedGraphNode, setSelectedGraphNode] = useState<string>('SRS Requirements');

  const graphNodesMetadata: Record<string, { type: string; connections: string[]; value: string }> = {
    'SRS Requirements': {
      type: 'Specification Constraint',
      connections: ['Architect High-Level Design', 'Testing Playwright Suite'],
      value: 'User authentication credentials must be validated locally and bypass login Gate.'
    },
    'Architect High-Level Design': {
      type: 'Architecture Schema',
      connections: ['SRS Requirements', 'Django Views Source Code', 'Kubernetes Deployment Manifests'],
      value: 'Unified modular multi-agent operating registry on port 3000.'
    },
    'Django Views Source Code': {
      type: 'Implementation Code',
      connections: ['Architect High-Level Design', 'PostgreSQL DB schema'],
      value: 'Enforces JWT token validations and coordinates RAG memory queries.'
    },
    'PostgreSQL DB schema': {
      type: 'Database DDL',
      connections: ['Django Views Source Code'],
      value: 'Postgres pgvector table storing sharded session conversation indices.'
    },
    'Testing Playwright Suite': {
      type: 'E2E Testing',
      connections: ['SRS Requirements', 'Django Views Source Code'],
      value: 'Automates user flow checks and validates sandbox permission boundaries.'
    },
    'Kubernetes Deployment Manifests': {
      type: 'IaC Infrastructure',
      connections: ['Architect High-Level Design'],
      value: 'Container deployment pod spec limits allocated to 128MB RAM max.'
    }
  };

  // Toggle recommendation approval status
  const handleApproveRec = (id: string) => {
    setRecs(prev => prev.map(r => r.id === id ? { ...r, approved: !r.approved } : r));
  };

  // Calculate Decision Scores dynamically based on topic
  const getDecisionMetrics = () => {
    if (decisionTopic === 'microservices') {
      return { val: 88, sec: 75, lat: 60, cost: 45, risk: 65, text: 'Migrating to Microservices increases Scalability (88%) but raises network latency (60ms rtt offset) and Cloud Cost overheads.' };
    } else if (decisionTopic === 'rust_core') {
      return { val: 95, sec: 98, lat: 94, cost: 80, risk: 30, text: 'Implementing a Rust Core module yields sub-1ms processing speeds and safe memory bounds, lowering operating risk significantly.' };
    } else {
      return { val: 78, sec: 90, lat: 70, cost: 35, risk: 50, text: 'Adding Multi-Region Databases guarantees High Availability and compliance but shifts storage budgets up by 120%.' };
    }
  };

  const decisionMetrics = getDecisionMetrics();

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6 font-mono text-xs text-slate-300">
      
      {/* 3D Glassmorphic Main Banner */}
      <div className="glass-panel-3d relative bg-slate-900/90 border border-slate-700/60 p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="absolute top-0 left-1/4 right-10 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
              <BrainCircuit className="w-3.5 h-3.5" />
              Module 30: Unified Intelligence Core (UIC) Executive Brain
            </span>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">Supreme OS Intelligence Core</h2>
          </div>
          <p className="text-xs text-slate-400 font-bold max-w-xl">
            The governing execution brain coordinating multi-agent workflows, knowledge graph linkages, cross-module synchronization, and predictive risk indices.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 shadow-inner">
          <div className="text-center min-w-[100px]">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">System Awareness</span>
            <span className="text-base font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% SYNCED
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center min-w-[100px]">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Governing Layer</span>
            <span className="text-base font-black text-cyan-400 block mt-0.5">UIC v3.0</span>
          </div>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/80">
        {[
          { id: 'overview', label: 'Command Center', icon: Landmark },
          { id: 'orchestration', label: 'Master Orchestration', icon: Activity },
          { id: 'knowledge_graph', label: 'Global Knowledge Graph', icon: Network },
          { id: 'decision_engine', label: 'Global Decision Engine', icon: Scale },
          { id: 'predictive', label: 'Predictive Intelligence', icon: ShieldAlert },
          { id: 'refactoring', label: 'Self-Optimization Refactoring', icon: GitBranch }
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

      {/* TAB CONTENTS */}

      {/* 1. COMMAND CENTER (OVERVIEW) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* System Health Scores Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {healthScores.map((h, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-md flex items-center justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">{h.category}</span>
                  <span className="text-base font-black text-white block">{h.score}%</span>
                </div>
                <span className="text-[9px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {h.status}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Situational Awareness World Model Feed */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 md:col-span-2">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-cyan-400" />
                  Unified Situational Awareness Model Feed
                </h3>
                <span className="text-[10px] font-bold text-slate-400">UIC WORLD MODEL</span>
              </div>

              <div className="space-y-3 font-mono text-[10px] leading-relaxed">
                {[
                  { field: 'Active Repository Context', state: 'Stable (9 files matched in workspace)', type: 'system' },
                  { field: '13 Engineering Agents Thread Pool', state: 'Optimal (CPU load 12.4% overall)', type: 'agent' },
                  { field: 'Elastic Scaling Cluster Workers', state: 'Idle (HPA set to 3 base replicas)', type: 'infrastructure' },
                  { field: 'Developer Operations Activity', state: 'Bypassed login screen, injected Grand Master experience controls', type: 'developer' }
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 flex justify-between items-center font-bold">
                    <div>
                      <span className="text-white block font-bold">{s.field}</span>
                      <span className="text-[9.5px] text-slate-400 block mt-0.5">{s.state}</span>
                    </div>
                    <span className="text-[8px] bg-slate-900 text-slate-500 px-2 py-0.5 rounded border border-slate-800 uppercase font-black">{s.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Recommendations Card */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-cyan-400 animate-pulse" />
                  Executive Strategic Decision recommendations
                </h3>
              </div>

              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {recs.map(rec => (
                  <div key={rec.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 space-y-1.5 font-bold">
                    <div className="flex justify-between items-center text-white">
                      <span className="text-[11px] truncate block font-bold" title={rec.title}>{rec.title.split(' ').slice(0, 3).join(' ')}...</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                        rec.impact === 'High' ? 'bg-rose-500/20 text-rose-300' :
                        rec.impact === 'Medium' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>{rec.impact}</span>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-normal font-bold">{rec.rationale}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MASTER ORCHESTRATION */}
      {activeTab === 'orchestration' && (
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Master Orchestrator Global Workload Balancer
            </h3>
            <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">BALANCED STATE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[10px]">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 font-bold">
              <span className="text-white font-black block border-b border-slate-900 pb-1.5 uppercase">Resource Coordination Pools</span>
              <div className="space-y-2">
                <div className="flex justify-between"><span>Active LLM Model Router Channels</span> <span className="text-emerald-400 font-bold">Optimal Load</span></div>
                <div className="flex justify-between"><span>Celery Event Loops Execution queues</span> <span className="text-emerald-400 font-bold">0 Tasks pending</span></div>
                <div className="flex justify-between"><span>Distributed Cache nodes synchronization</span> <span className="text-emerald-400 font-bold">Fully Synced</span></div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2 text-slate-300">
              <span className="text-white font-black block border-b border-slate-900 pb-1.5 uppercase">Synchronization Controls</span>
              <p className="font-bold">
                The Master Orchestrator coordinates variables and schema outputs dynamically from Requirements (Module 2) to Docker manifests (Module 29).
              </p>
              <p className="font-bold">
                In case of pipeline parameters conflict, the scheduler automatically enforces schema rollbacks and triggers checkpoint failure fallbacks.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. GLOBAL KNOWLEDGE GRAPH */}
      {activeTab === 'knowledge_graph' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Interactive Knowledge Graph SVG */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-400" />
                Platform Knowledge Graph Linkages
              </h3>
              <span className="text-[10px] text-slate-500 font-bold">(Click node to inspect dependencies)</span>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 h-80 flex items-center justify-center relative">
              <svg className="w-full h-full" viewBox="0 0 500 220">
                {/* Connector lines */}
                <line x1="80" y1="110" x2="180" y2="50" stroke="#475569" strokeWidth="1.5" />
                <line x1="80" y1="110" x2="180" y2="160" stroke="#475569" strokeWidth="1.5" />
                <line x1="180" y1="50" x2="300" y2="50" stroke="#475569" strokeWidth="1.5" />
                <line x1="180" y1="160" x2="300" y2="160" stroke="#475569" strokeWidth="1.5" />
                <line x1="300" y1="50" x2="420" y2="110" stroke="#475569" strokeWidth="1.5" />
                <line x1="300" y1="160" x2="420" y2="110" stroke="#475569" strokeWidth="1.5" />
                <line x1="180" y1="50" x2="180" y2="160" stroke="#475569" strokeWidth="1.5" />

                {/* Nodes */}
                <g onClick={() => setSelectedGraphNode('SRS Requirements')} className="cursor-pointer">
                  <circle cx="80" cy="110" r="18" fill={selectedGraphNode === 'SRS Requirements' ? '#1e1b4b' : '#0f172a'} stroke={selectedGraphNode === 'SRS Requirements' ? '#22d3ee' : '#334155'} strokeWidth="2" />
                  <text x="80" y="113" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="6">SRS</text>
                </g>

                <g onClick={() => setSelectedGraphNode('Architect High-Level Design')} className="cursor-pointer">
                  <circle cx="180" cy="50" r="18" fill={selectedGraphNode === 'Architect High-Level Design' ? '#1e1b4b' : '#0f172a'} stroke={selectedGraphNode === 'Architect High-Level Design' ? '#22d3ee' : '#334155'} strokeWidth="2" />
                  <text x="180" y="53" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="6">HLD</text>
                </g>

                <g onClick={() => setSelectedGraphNode('Testing Playwright Suite')} className="cursor-pointer">
                  <circle cx="180" cy="160" r="18" fill={selectedGraphNode === 'Testing Playwright Suite' ? '#1e1b4b' : '#0f172a'} stroke={selectedGraphNode === 'Testing Playwright Suite' ? '#22d3ee' : '#334155'} strokeWidth="2" />
                  <text x="180" y="163" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="6">Tests</text>
                </g>

                <g onClick={() => setSelectedGraphNode('Django Views Source Code')} className="cursor-pointer">
                  <circle cx="300" cy="50" r="18" fill={selectedGraphNode === 'Django Views Source Code' ? '#1e1b4b' : '#0f172a'} stroke={selectedGraphNode === 'Django Views Source Code' ? '#22d3ee' : '#334155'} strokeWidth="2" />
                  <text x="300" y="53" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="6">Code</text>
                </g>

                <g onClick={() => setSelectedGraphNode('Kubernetes Deployment Manifests')} className="cursor-pointer">
                  <circle cx="300" cy="160" r="18" fill={selectedGraphNode === 'Kubernetes Deployment Manifests' ? '#1e1b4b' : '#0f172a'} stroke={selectedGraphNode === 'Kubernetes Deployment Manifests' ? '#22d3ee' : '#334155'} strokeWidth="2" />
                  <text x="300" y="163" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="6">IaC</text>
                </g>

                <g onClick={() => setSelectedGraphNode('PostgreSQL DB schema')} className="cursor-pointer">
                  <circle cx="420" cy="110" r="18" fill={selectedGraphNode === 'PostgreSQL DB schema' ? '#1e1b4b' : '#0f172a'} stroke={selectedGraphNode === 'PostgreSQL DB schema' ? '#22d3ee' : '#334155'} strokeWidth="2" />
                  <text x="420" y="113" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="6">DB DDL</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Graph Node Inspector */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                Knowledge Node Inspector
              </h3>
            </div>

            {selectedGraphNode && graphNodesMetadata[selectedGraphNode] ? (
              <div className="space-y-4 font-mono text-[10.5px]">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">Selected Knowledge Node</span>
                  <span className="text-xs font-black text-white block break-words font-bold">{selectedGraphNode}</span>
                </div>

                <div className="space-y-2 text-slate-300">
                  <p className="font-bold"><strong className="text-white uppercase font-black">Node Type:</strong> {graphNodesMetadata[selectedGraphNode].type}</p>
                  <p className="font-bold"><strong className="text-white uppercase font-black">Link Value:</strong> {graphNodesMetadata[selectedGraphNode].value}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-900 pb-1">Direct Relationships:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {graphNodesMetadata[selectedGraphNode].connections.map((conn, idx) => (
                      <span key={idx} className="bg-slate-950 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-850 text-slate-300">{conn}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 text-center py-20 font-bold">Select a node on the graph to audit trace metadata.</p>
            )}
          </div>
        </div>
      )}

      {/* 4. GLOBAL DECISION ENGINE */}
      {activeTab === 'decision_engine' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Decision criteria sliders */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-cyan-400" />
                Global Decision Engine Calculator
              </h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-slate-400 font-bold block mb-1.5">Select Strategic Option</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'microservices', name: 'Migrate to Microservices', cost: 'High Cloud Cost' },
                    { id: 'rust_core', name: 'Implement Rust Core Engine', cost: 'Low Risk, High Perf' },
                    { id: 'geo_db', name: 'Add Multi-Region Databases', cost: 'High Storage Cost' }
                  ].map(topic => (
                    <div 
                      key={topic.id}
                      onClick={() => setDecisionTopic(topic.id as any)}
                      className={`p-4 rounded-xl border cursor-pointer text-center space-y-1 transition duration-200 ${
                        decisionTopic === topic.id 
                          ? 'bg-indigo-950/40 border-indigo-500/80 shadow-md text-white' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-black block font-bold">{topic.name}</span>
                      <span className="text-[8.5px] text-slate-500 font-bold block">{topic.cost}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2 text-[10.5px]">
                <span className="text-white font-black block border-b border-slate-900 pb-1.5 uppercase text-[9px]">Decision Engine Rationale</span>
                <p className="text-slate-300 font-bold leading-normal">{decisionMetrics.text}</p>
              </div>
            </div>
          </div>

          {/* Decision Evaluation Scores */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Criteria Evaluation Scores
              </h3>
            </div>

            <div className="space-y-4 font-mono text-[10px]">
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold"><span>Business Value Contribution</span> <span>{decisionMetrics.val}%</span></div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: `${decisionMetrics.val}%` }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-bold"><span>Security Boundary Compliance</span> <span>{decisionMetrics.sec}%</span></div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: `${decisionMetrics.sec}%` }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-bold"><span>Latency Performance Speed</span> <span>{decisionMetrics.lat}%</span></div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: `${decisionMetrics.lat}%` }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-bold"><span>Budget Cost Efficiency</span> <span>{decisionMetrics.cost}%</span></div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: `${decisionMetrics.cost}%` }} />
                </div>
              </div>

              <div className="bg-indigo-950/30 p-4 border border-indigo-500/30 rounded-xl flex justify-between items-center shadow-inner font-bold">
                <span>Core Operating Risk Index:</span>
                <span className={`font-black ${decisionMetrics.risk > 50 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>{decisionMetrics.risk}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PREDICTIVE INTELLIGENCE */}
      {activeTab === 'predictive' && (
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400 animate-pulse" />
              UIC Predictive Intelligence Timeline & Warnings
            </h3>
            <span className="text-[10px] font-black text-rose-400 animate-pulse uppercase">3 Warnings Active</span>
          </div>

          <div className="space-y-3 font-mono text-[10.5px]">
            {predictions.map((p, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex justify-between items-start shadow-md">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-black block text-xs">{p.event}</span>
                    <span className="text-[9px] text-slate-500 font-bold block">{p.time}</span>
                  </div>
                  <p className="text-slate-400 leading-normal font-bold">{p.desc}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                  p.level === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                  p.level === 'Medium' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 
                  'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                }`}>{p.level} Risk</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SELF-OPTIMIZATION & REFACORING */}
      {activeTab === 'refactoring' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Autonomous Refactoring list */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                Autonomous Refactoring & Optimization Recommendations
              </h3>
              <span className="text-[10px] text-slate-500 font-bold block">(Requires developer approval)</span>
            </div>

            <div className="space-y-3">
              {recs.map(rec => (
                <div key={rec.id} className="bg-slate-950 p-4.5 rounded-xl border border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md font-bold text-[10px]">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5">
                      <h4 className="text-xs font-black text-white">{rec.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                        rec.impact === 'High' ? 'bg-rose-500/20 text-rose-300' :
                        rec.impact === 'Medium' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>{rec.impact} Impact</span>
                    </div>
                    <p className="text-slate-400 leading-normal font-bold">{rec.rationale}</p>
                    <span className="text-[9.5px] text-slate-500 font-bold block">Confidence Rationale: {rec.confidence}</span>
                  </div>

                  <button 
                    onClick={() => handleApproveRec(rec.id)}
                    className={`px-4 py-2.5 rounded-xl font-black text-[10px] transition cursor-pointer uppercase ${
                      rec.approved 
                        ? 'bg-emerald-500 text-black font-extrabold hover:bg-emerald-400' 
                        : 'bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold'
                    }`}
                  >
                    {rec.approved ? 'Approved ✓' : 'Approve'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt quality optimization details */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                Prompt & Model Self-Optimization
              </h3>
            </div>

            <div className="space-y-4 font-mono text-[10.5px] leading-relaxed">
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2 text-slate-300">
                <span className="text-white font-black block border-b border-slate-900 pb-1.5 uppercase text-[9px] font-bold">Collaboration Tuning</span>
                <p className="font-bold">Prompt template validation: <strong className="text-emerald-400">98% efficiency</strong></p>
                <p className="font-bold">RAG Memory parsing load: <strong className="text-cyan-300">-40% token cost</strong></p>
                <p className="font-bold">Average execution delay: <strong className="text-cyan-300">120ms saved</strong></p>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-855 rounded-xl space-y-1.5 text-slate-400 font-bold">
                💡 UIC dynamically reviews models benchmark outcomes every 24 hours, adjusting priority router indices for cost and latency bounds.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
