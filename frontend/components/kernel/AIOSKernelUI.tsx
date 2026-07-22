'use client';
import React, { useState, useEffect } from 'react';
import { 
  Cpu, Activity, Layers, Database, ShieldCheck, CheckCircle2, RefreshCw, 
  Box, AlertCircle, RefreshCcw, Server, PlayCircle, Settings, Play, 
  ArrowRight, Trash2, Plus, Terminal, Scale, MessageSquare, BarChart3, 
  Coins, Network, GitBranch, Key, ShieldAlert
} from 'lucide-react';

interface SchedulerTask {
  id: string;
  name: string;
  priority: 'High' | 'Medium' | 'Low';
  type: string;
  status: 'queued' | 'active' | 'completed';
  costEstimate: string;
  dependency: string;
}

interface RuntimeAgent {
  name: string;
  assignedTasks: number;
  workloadStatus: 'Idle' | 'Optimal' | 'Overloaded';
  aggregatedOutputsCount: number;
  model: string;
}

export const AIOSKernelUI = () => {
  // Navigation Tabs for Runtime Kernel Core
  const [activeTab, setActiveTab] = useState<'kernel' | 'workflow' | 'orchestrator' | 'state' | 'memory' | 'recovery' | 'resources'>('kernel');

  // Scheduler States
  const [schedulerPolicy, setSchedulerPolicy] = useState<'FIFO' | 'Priority' | 'Weighted' | 'Deadline' | 'Adaptive'>('Priority');
  const [schedulerTasks, setSchedulerTasks] = useState<SchedulerTask[]>([
    { id: 'task-01', name: 'Scan Repository Semantics', priority: 'High', type: 'Parallel', status: 'completed', costEstimate: '$0.04', dependency: 'None' },
    { id: 'task-02', name: 'Build Codebase Manifest schema', priority: 'High', type: 'Sequential', status: 'completed', costEstimate: '$0.02', dependency: 'task-01' },
    { id: 'task-03', name: 'Generate Django ORM Models code', priority: 'Medium', type: 'Sequential', status: 'active', costEstimate: '$0.15', dependency: 'task-02' },
    { id: 'task-04', name: 'Compile Webpack CSS assets', priority: 'Low', type: 'Parallel', status: 'queued', costEstimate: '$0.01', dependency: 'None' },
    { id: 'task-05', name: 'Verify Playwright E2E security rules', priority: 'High', type: 'Parallel', status: 'queued', costEstimate: '$0.08', dependency: 'task-03' }
  ]);

  // Model Router & Resource Limits
  const [selectedModelPolicy, setSelectedModelPolicy] = useState<'Speed' | 'Cost' | 'Balanced'>('Balanced');
  const [gpuLoad, setGpuLoad] = useState<number>(34);
  const [ramUsage, setRamUsage] = useState<number>(4.2);
  const [maxRam, setMaxRam] = useState<number>(8.0);
  const [isScalingActive, setIsScalingActive] = useState<boolean>(false);

  // Failure Simulator States
  const [simulatedFailureLog, setSimulatedFailureLog] = useState<Array<{ time: string; msg: string; type: string }>>([
    { time: '13:25:00', msg: 'System Kernel runtime initialized.', type: 'info' }
  ]);
  const [isSimulatingFailure, setIsSimulatingFailure] = useState(false);

  // Memory Synchronization Logs
  const [memorySyncState, setMemorySyncState] = useState<'synced' | 'syncing' | 'conflict'>('synced');
  const [memorySyncLogs, setMemorySyncLogs] = useState<string[]>([
    '✓ Short-term memory register synchronized with Local Redis cache.',
    '✓ Long-term semantic index synced with PostgreSQL pgvector DB.'
  ]);

  // Re-sort queue based on scheduling algorithm selection
  const handleSortQueue = (policy: typeof schedulerPolicy) => {
    setSchedulerPolicy(policy);
    setSchedulerTasks(prev => {
      const copy = [...prev];
      if (policy === 'Priority') {
        const priorityWeight = { High: 3, Medium: 2, Low: 1 };
        return copy.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
      } else if (policy === 'FIFO') {
        return copy.sort((a, b) => a.id.localeCompare(b.id));
      } else if (policy === 'Weighted') {
        // Sort by Cost/Weight
        return copy.sort((a, b) => Number(b.costEstimate.replace('$', '')) - Number(a.costEstimate.replace('$', '')));
      } else {
        return copy;
      }
    });
  };

  // Simulate AI Agent Failure and Trigger Recovery Loop
  const triggerSimulatedFailure = () => {
    if (isSimulatingFailure) return;
    setIsSimulatingFailure(true);
    const time = new Date().toTimeString().split(' ')[0];
    
    // Step 1: Log failure detection
    setSimulatedFailureLog(prev => [
      ...prev,
      { time, msg: '⚠️ [CRITICAL] Timeout detected on Backend Engineer Agent execution thread (task-03).', type: 'fail' }
    ]);

    // Step 2: Transition state to recovering
    setTimeout(() => {
      const time2 = new Date().toTimeString().split(' ')[0];
      setSimulatedFailureLog(prev => [
        ...prev,
        { time: time2, msg: '⚙️ Initiating failover check: Model routing fallback from Claude-3.5 to Gemini-1.5-Pro.', type: 'recovering' }
      ]);
    }, 1500);

    // Step 3: Apply rollback & retry success
    setTimeout(() => {
      const time3 = new Date().toTimeString().split(' ')[0];
      setSimulatedFailureLog(prev => [
        ...prev,
        { time: time3, msg: '✓ Checkpoint "chk_v2_models_stable" restored. Task-03 retry succeeded.', type: 'ok' }
      ]);
      setSchedulerTasks(prev => prev.map(t => t.id === 'task-03' ? { ...t, status: 'completed' as const } : t));
      setIsSimulatingFailure(false);
    }, 3200);
  };

  // Trigger memory sync execution
  const triggerMemorySync = () => {
    setMemorySyncState('syncing');
    setTimeout(() => {
      setMemorySyncState('synced');
      setMemorySyncLogs(prev => [
        ...prev,
        `✓ Manual sync trigger completed at ${new Date().toTimeString().split(' ')[0]}. 0 conflicts registered.`
      ]);
    }, 1000);
  };

  // Agents Orchestrator list
  const runagents: RuntimeAgent[] = [
    { name: 'Planner Agent', assignedTasks: 1, workloadStatus: 'Optimal', aggregatedOutputsCount: 14, model: 'Gemini 1.5 Pro' },
    { name: 'Software Architect Agent', assignedTasks: 0, workloadStatus: 'Idle', aggregatedOutputsCount: 22, model: 'Gemini 1.5 Pro' },
    { name: 'Backend Engineer Agent', assignedTasks: 1, workloadStatus: 'Optimal', aggregatedOutputsCount: 45, model: 'Claude 3.5 Sonnet' },
    { name: 'Frontend Engineer Agent', assignedTasks: 2, workloadStatus: 'Overloaded', aggregatedOutputsCount: 38, model: 'GPT-4o Core' },
    { name: 'Security Auditor Agent', assignedTasks: 1, workloadStatus: 'Optimal', aggregatedOutputsCount: 19, model: 'DeepSeek-V3 Coder' },
    { name: 'Testing Engineer Agent', assignedTasks: 0, workloadStatus: 'Idle', aggregatedOutputsCount: 29, model: 'Llama 3 70B' }
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6 font-mono text-xs text-slate-300">
      
      {/* 3D Glassmorphic Main Banner */}
      <div className="glass-panel-3d relative bg-slate-900/90 border border-slate-700/60 p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="absolute top-0 left-1/4 right-10 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
              <Server className="w-3.5 h-3.5" />
              Module 28: AI Runtime Kernel & Execution Engine Core
            </span>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">Runtime Kernel Monitor</h2>
          </div>
          <p className="text-xs text-slate-400 font-bold max-w-xl">
            A production-grade execution runtime monitoring concurrent task queues, model fallback routes, failover triggers, and isolated memory state loops.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 shadow-inner">
          <div className="text-center min-w-[100px]">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Kernel Engine</span>
            <span className="text-base font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              HEALTHY
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center min-w-[100px]">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Active Workflows</span>
            <span className="text-base font-black text-cyan-400 block mt-0.5">64 Concurrent</span>
          </div>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/80">
        {[
          { id: 'kernel', label: 'Task Scheduler', icon: Cpu },
          { id: 'workflow', label: 'Workflow DAG Engine', icon: Network },
          { id: 'orchestrator', label: 'Agent Orchestrator', icon: Box },
          { id: 'state', label: 'State & Artifacts', icon: Layers },
          { id: 'memory', label: 'Memory & Context Sync', icon: Database },
          { id: 'recovery', label: 'Failover & Recovery', icon: ShieldCheck },
          { id: 'resources', label: 'Resource Allocation', icon: Activity }
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

      {/* TAB SPACES */}

      {/* 1. TASK SCHEDULER */}
      {activeTab === 'kernel' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Scheduling Queue List */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Active Task Scheduler Thread Queue
              </h3>
              <span className="text-[10px] text-slate-500 font-bold">SCHEDULING ALGORITHM: {schedulerPolicy}</span>
            </div>

            <div className="space-y-2.5">
              {schedulerTasks.map((task, idx) => (
                <div key={task.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center justify-between shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-400">#{idx + 1}</span>
                    <div>
                      <h4 className="text-xs font-black text-white">{task.name}</h4>
                      <p className="text-[9.5px] text-slate-500 font-bold mt-0.5">
                        ID: {task.id} • Type: {task.type} • Dependency: <code className="text-indigo-400">{task.dependency}</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-400 block">{task.costEstimate} Est.</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      task.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>{task.priority} Priority</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      task.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' :
                      task.status === 'active' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 animate-pulse' :
                      'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}>{task.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduling Policy Configuration Panel */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                Scheduling Engine Policies
              </h3>
            </div>

            <div className="space-y-4">
              <span className="text-[9px] font-bold text-slate-500 uppercase block tracking-widest">Select Scheduling Strategy</span>
              
              <div className="space-y-2">
                {[
                  { id: 'FIFO', label: 'FIFO (First-In, First-Out Queue)', desc: 'Standard sequential queue execution.' },
                  { id: 'Priority', label: 'Priority-Queue Scheduler', desc: 'Tasks executed dynamically by priority levels.' },
                  { id: 'Weighted', label: 'Weighted Fair Queuing', desc: 'Balances thread shares based on cost limits.' }
                ].map(policy => (
                  <div 
                    key={policy.id}
                    onClick={() => handleSortQueue(policy.id as any)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      schedulerPolicy === policy.id 
                        ? 'bg-cyan-950/20 border-cyan-500/40 text-cyan-300' 
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-black block font-mono">{policy.label}</span>
                    <span className="text-[9px] text-slate-500 font-bold block mt-0.5">{policy.desc}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-800/80 my-4" />

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[10px] leading-relaxed text-slate-400">
                <span className="text-[9px] font-bold text-slate-300 block mb-1">ℹ️ Deadline Scheduling:</span>
                Adaptive schedulers compute SLA thresholds and automatically scale Celery threads if deadlines are compromised.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. WORKFLOW DAG ENGINE */}
      {activeTab === 'workflow' && (
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Network className="w-4 h-4 text-cyan-400" />
              Dynamic Execution Workflow Graph DAG
            </h3>
            <span className="text-[10px] text-slate-500 font-bold">STATUS: RUNNING</span>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 h-96 flex items-center justify-center relative">
            <svg className="w-full h-full max-w-xl" viewBox="0 0 500 200">
              {/* Connectors */}
              <line x1="80" y1="100" x2="180" y2="50" stroke="#10b981" strokeWidth="2.5" />
              <line x1="80" y1="100" x2="180" y2="150" stroke="#10b981" strokeWidth="2.5" />
              <line x1="180" y1="50" x2="280" y2="50" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="3" />
              <line x1="180" y1="150" x2="280" y2="150" stroke="#475569" strokeWidth="1.5" />
              <line x1="280" y1="50" x2="380" y2="100" stroke="#475569" strokeWidth="1.5" />
              <line x1="280" y1="150" x2="380" y2="100" stroke="#475569" strokeWidth="1.5" />

              {/* Nodes */}
              {/* Step 1 */}
              <g>
                <circle cx="80" cy="100" r="25" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="80" y="103" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="8">Start</text>
              </g>
              {/* Step 2 (Parallel branch 1) */}
              <g>
                <circle cx="180" cy="50" r="25" fill="#1e1b4b" stroke="#22d3ee" strokeWidth="2" className="animate-pulse" />
                <text x="180" y="53" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="7">Django API</text>
              </g>
              {/* Step 3 (Parallel branch 2) */}
              <g>
                <circle cx="180" cy="150" r="25" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="180" y="153" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="7">FastAPI</text>
              </g>
              {/* Step 4 */}
              <g>
                <circle cx="280" cy="50" r="25" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <text x="280" y="53" textAnchor="middle" fill="#94a3b8" fontWeight="bold" fontSize="7">React UI</text>
              </g>
              {/* Step 5 */}
              <g>
                <circle cx="280" cy="150" r="25" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <text x="280" y="153" textAnchor="middle" fill="#94a3b8" fontWeight="bold" fontSize="7">Docker</text>
              </g>
              {/* Step 6 */}
              <g>
                <circle cx="380" cy="100" r="25" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <text x="380" y="103" textAnchor="middle" fill="#94a3b8" fontWeight="bold" fontSize="7">Deploy</text>
              </g>
            </svg>

            <div className="absolute bottom-4 left-6 flex gap-4 text-[9px] text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Completed Stage</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" /> Active Process</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-800" /> Queued Pipeline Node</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. AGENT ORCHESTRATOR */}
      {activeTab === 'orchestrator' && (
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Box className="w-4 h-4 text-cyan-400" />
              Runtime Agent Orchestrator & Workload Allocations
            </h3>
            <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">ALL HEALTHY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {runagents.map((ag, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 flex flex-col justify-between shadow-md">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-white block">{ag.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${
                      ag.workloadStatus === 'Optimal' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      ag.workloadStatus === 'Idle' ? 'bg-slate-900 text-slate-500 border-slate-800' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse'
                    }`}>{ag.workloadStatus}</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 font-bold mt-1">AI Engine model: {ag.model}</p>
                </div>
                
                <div className="flex justify-between items-center border-t border-slate-900 pt-2 text-[9px] text-slate-500">
                  <span>Assigned Tasks: <strong>{ag.assignedTasks}</strong></span>
                  <span>Aggregated Outputs: <strong>{ag.aggregatedOutputsCount}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. STATE & ARTIFACTS */}
      {activeTab === 'state' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* State Variables Table */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Active Session Variables & State Variables
              </h3>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 font-mono text-[10px]">
              {[
                { key: 'session.id', val: 'sess_982c0df2e81fa2', scope: 'Global' },
                { key: 'project.name', val: 'Gym Management ERP Suite', scope: 'Global' },
                { key: 'active.sprint.id', val: 'milestone_v1.0.2', scope: 'Sprint' },
                { key: 'db.schema.dialect', val: 'PostgreSQL 16.2', scope: 'Database' },
                { key: 'last.checkpoint.ref', val: 'chk_v2_models_stable', scope: 'Recovery' }
              ].map((sv, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-slate-900 pb-2 last:border-b-0">
                  <span className="text-indigo-400 font-bold">{sv.key}</span>
                  <span className="text-white font-bold">{sv.val}</span>
                  <span className="text-slate-500 font-bold uppercase text-[9px]">{sv.scope}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Artifact Version Registry */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Box className="w-4 h-4 text-cyan-400" />
                Versioned Artifacts
              </h3>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {[
                { name: 'schema.sql', ver: 'v2.1', size: '12 KB', type: 'Database DDL' },
                { name: 'settings.py', ver: 'v1.4', size: '8 KB', type: 'Backend Config' },
                { name: 'LoginScreen.tsx', ver: 'v1.9', size: '6.7 KB', type: 'React Component' },
                { name: 'docker-compose.yml', ver: 'v1.1', size: '2.9 KB', type: 'DevOps Spec' }
              ].map((art, idx) => (
                <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 flex justify-between items-center font-bold">
                  <div>
                    <span className="text-white block font-bold text-xs">{art.name}</span>
                    <span className="text-[9px] text-slate-500 block mt-0.5">{art.type} • {art.size}</span>
                  </div>
                  <span className="text-[10px] font-black text-cyan-300 font-mono">Ver {art.ver}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. MEMORY & CONTEXT SYNC */}
      {activeTab === 'memory' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Semantic memory checks */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                Memory Sync & Context Optimization Loops
              </h3>
              <button 
                onClick={triggerMemorySync}
                disabled={memorySyncState === 'syncing'}
                className="bg-cyan-500 text-black px-3.5 py-1.5 rounded-xl font-black text-[10px] cursor-pointer hover:bg-cyan-400 uppercase shadow-md flex items-center gap-1.5"
              >
                {memorySyncState === 'syncing' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Syncing...</span>
                  </>
                ) : (
                  <>
                    <RefreshCcw className="w-3.5 h-3.5" />
                    <span>Sync Memory</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 min-h-64 flex flex-col justify-between">
              <div className="space-y-3 font-mono text-[10px]">
                {memorySyncLogs.map((log, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-slate-300 font-bold leading-normal">
                    {log}
                  </div>
                ))}
              </div>

              <div className="bg-slate-900/40 p-4 border border-slate-850 rounded-xl text-[9.5px] leading-relaxed text-slate-400">
                💡 <span className="text-slate-300">Context Engine Strategy:</span> Workspace context parsing uses pydantic token reduction indexes, filtering redundant files and minimizing context footprint by <strong className="text-cyan-400">42%</strong>.
              </div>
            </div>
          </div>

          {/* Memory Snapshots list */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                Index Memory Snapshots
              </h3>
            </div>

            <div className="space-y-3">
              {[
                { name: 'conversation_mem_v1', size: '42 KB', type: 'Conversation' },
                { name: 'repository_mem_v2', size: '112 KB', type: 'Repository' },
                { name: 'build_mem_v1', size: '8 KB', type: 'Build' }
              ].map((snap, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex justify-between items-center shadow">
                  <div>
                    <span className="text-white font-bold block">{snap.name}</span>
                    <span className="text-[10px] text-slate-500 block">Type: {snap.type}</span>
                  </div>
                  <span className="text-[10px] font-black text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-400/30">{snap.size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. FAILOVER & RECOVERY */}
      {activeTab === 'recovery' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recovery Log console */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Failover Checkpoints & Rollbacks Log Console
              </h3>
              <button 
                onClick={triggerSimulatedFailure}
                disabled={isSimulatingFailure}
                className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 px-3.5 py-1.5 rounded-xl text-[10px] font-black transition cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5 animate-pulse text-rose-400" />
                <span>Simulate Agent Timeout</span>
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 h-72 overflow-y-auto space-y-2 text-[10.5px]">
              {simulatedFailureLog.map((log, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-850 p-3 rounded-xl flex flex-col gap-1 shadow-inner">
                  <div className="flex justify-between items-center text-[8.5px] font-bold text-slate-500">
                    <span>{log.time}</span>
                    <span className={`px-2 py-0.5 rounded uppercase ${
                      log.type === 'fail' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                      log.type === 'recovering' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20 animate-pulse' : 
                      log.type === 'ok' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                    }`}>
                      {log.type}
                    </span>
                  </div>
                  <p className="text-slate-300 font-bold leading-relaxed">{log.msg}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fallback routing profiles */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                Fallback Model Routing Policy
              </h3>
            </div>

            <div className="space-y-4 font-mono text-[10px]">
              <span className="text-[9px] font-bold text-slate-500 uppercase block tracking-widest">Router Profile: {selectedModelPolicy}</span>
              
              <div className="grid grid-cols-3 gap-2">
                {['Speed', 'Cost', 'Balanced'].map(p => (
                  <button
                    key={p}
                    onClick={() => setSelectedModelPolicy(p as any)}
                    className={`py-2 rounded-lg border text-[9px] font-black uppercase transition ${
                      selectedModelPolicy === p 
                        ? 'bg-cyan-950/40 border-cyan-500 text-white' 
                        : 'bg-slate-950/80 border-slate-800 text-slate-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2 text-slate-300">
                <strong className="text-white block border-b border-slate-900 pb-1.5 uppercase font-bold text-[9px]">Routing Matrix</strong>
                <p className="font-bold">1st Option: Claude 3.5 Sonnet</p>
                <p className="font-bold">2nd Option (Fallback): Gemini 1.5 Pro</p>
                <p className="font-bold">3rd Option (Local): Llama 3 70B</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. RESOURCE ALLOCATION & AUTO-SCALING */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quotas utilization bars */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-6">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Active Hardware Quota & Token Budgets
              </h3>
            </div>

            <div className="space-y-4">
              {/* RAM Usage */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">RAM Allocation</span>
                  <span className="text-white">{ramUsage} GB / {maxRam} GB</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500" style={{ width: `${(ramUsage / maxRam) * 100}%` }} />
                </div>
              </div>

              {/* GPU Load */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">GPU Core Compute Load</span>
                  <span className="text-white">{gpuLoad}%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500" style={{ width: `${gpuLoad}%` }} />
                </div>
              </div>

              {/* API Token Limits */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">LLM Prompt Tokens Daily Budget</span>
                  <span className="text-white">412k / 1.0M tokens</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500" style={{ width: '41.2%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Auto Scaling triggers */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                Auto-Scaling Policies
              </h3>
            </div>

            <div className="space-y-4 font-mono text-[10px]">
              <span className="text-[9px] font-bold text-slate-500 uppercase block tracking-widest font-bold">Dynamic Scale Status</span>
              
              <div className="bg-slate-950 p-4 border border-slate-855 rounded-xl space-y-3 flex flex-col justify-between">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-300">Elastic Workers Pool</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black ${
                    isScalingActive ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 animate-pulse' : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}>{isScalingActive ? 'SCALING UP' : 'IDLE'}</span>
                </div>
                
                <p className="text-slate-400 font-bold leading-normal">
                  Runtimes automatically scale up workers horizontally when active task queue length exceeds 5 parallel threads or CPU threshold breaches 85% SLA.
                </p>

                <button
                  onClick={() => setIsScalingActive(prev => !prev)}
                  className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 py-2.5 rounded-lg text-xs font-black text-cyan-300 cursor-pointer"
                >
                  {isScalingActive ? 'Force Scale Idle' : 'Trigger Scaling Burst'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
