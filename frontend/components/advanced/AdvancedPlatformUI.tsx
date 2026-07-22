'use client';
import React, { useState } from 'react';
import { 
  History, Sparkles, Layers, CheckCircle2, ShieldCheck, ShieldAlert, ShoppingBag, 
  Map, FileCheck2, Bot, Play, RotateCcw, ArrowRight, Zap, Code, Terminal, Award,
  Copy, HelpCircle, AlertCircle, FileCode, Radio, Cpu, Network, Settings, Coins,
  Plus, Trash2, Key
} from 'lucide-react';

interface ModelInfo {
  name: string;
  provider: string;
  context: string;
  latency: string;
  pricing: string;
  benchmark: string;
}

export const AdvancedPlatformUI = () => {
  // Active Navigation Tab for Developer Platform Core
  const [activeTab, setActiveTab] = useState<'overview' | 'agent_plugin' | 'workflow_prompt' | 'memory_model' | 'tool_event' | 'ui_marketplace' | 'docs'>('overview');

  // Manifest Builder States
  const [manifestType, setManifestType] = useState<'agent' | 'plugin' | 'workflow' | 'memory' | 'model' | 'tool' | 'ui'>('agent');
  const [extName, setExtName] = useState('custom-security-auditor');
  const [extVersion, setExtVersion] = useState('1.0.0');
  const [extPerms, setExtPerms] = useState<string[]>(['read_repo', 'sandbox_execute']);
  const [generatedManifest, setGeneratedManifest] = useState<string>('');

  // Security Sandboxing States
  const [securityScanCode, setSecurityScanCode] = useState(`import { AgentSDK } from '@autoengineer/sdk';

const auditor = new AgentSDK.Agent({
  name: 'SecurityAuditor',
  permissions: ['read_filesystem']
});

auditor.onLifecycle('start', async (context) => {
  // Check for exposed credentials
  const env = await context.read('.env');
  if (env.includes('SECRET_KEY')) {
    context.log('Warning: Secret key exposed!');
  }
});`);
  const [securityReport, setSecurityReport] = useState<any | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Model SDK benchmark options
  const modelsList: ModelInfo[] = [
    { name: 'Gemini 1.5 Pro', provider: 'Google', context: '2.0M tokens', latency: '450ms', pricing: '$1.25 / M tokens', benchmark: '92.4% Reasoning' },
    { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', context: '200k tokens', latency: '580ms', pricing: '$3.00 / M tokens', benchmark: '93.1% Logic' },
    { name: 'GPT-4o Core', provider: 'OpenAI', context: '128k tokens', latency: '390ms', pricing: '$2.50 / M tokens', benchmark: '91.8% Multi-modal' },
    { name: 'DeepSeek-V3 Coder', provider: 'DeepSeek', context: '64k tokens', latency: '280ms', pricing: '$0.50 / M tokens', benchmark: '90.2% Syntax' },
    { name: 'Llama 3 70B (Local)', provider: 'Ollama / Local', context: '8k tokens', latency: '85ms', pricing: '$0.00 (Self-hosted)', benchmark: '84.2% Execution' }
  ];

  // Event SDK simulator
  const [eventSimulatorLogs, setEventSimulatorLogs] = useState<Array<{ time: string; type: string; details: string }>>([
    { time: '13:20:10', type: 'agent.lifecycle.created', details: 'Agent "SecurityAuditor" instantiated successfully.' },
    { time: '13:20:12', type: 'repository.event.commit', details: 'Commit detected: updated users auth middleware.' }
  ]);
  const [simEventType, setSimEventType] = useState('agent.lifecycle.event');
  const [simEventDetails, setSimEventDetails] = useState('Custom lifecycle callback fired.');

  // Toggle permissions in manifest builder
  const togglePermission = (perm: string) => {
    if (extPerms.includes(perm)) {
      setExtPerms(prev => prev.filter(p => p !== perm));
    } else {
      setExtPerms(prev => [...prev, perm]);
    }
  };

  // Compile JSON manifest based on selections
  const compileManifest = () => {
    const manifest = {
      manifest_version: 2,
      type: manifestType,
      name: extName.trim() || 'unnamed-extension',
      version: extVersion.trim() || '1.0.0',
      sdk_compatibility: '>=1.4.0',
      permissions: extPerms,
      entry_point: `./dist/index.js`,
      sandbox: {
        isolated_threads: true,
        max_memory_mb: 128,
        network_access: extPerms.includes('network_write') || extPerms.includes('network_read')
      },
      hooks: manifestType === 'agent' ? ['onStart', 'onTaskComplete', 'onFailure'] : ['onLoad', 'onUnload']
    };
    setGeneratedManifest(JSON.stringify(manifest, null, 2));
  };

  // Run Mock Security Sandbox Scanner
  const runSecurityScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setSecurityReport(null);

    setTimeout(() => {
      setIsScanning(false);
      const containsSystemAccess = securityScanCode.includes('fs.writeFileSync') || securityScanCode.includes('exec(') || securityScanCode.includes('process.exit');
      const containsEnvCheck = securityScanCode.includes('.env') || securityScanCode.includes('process.env');

      setSecurityReport({
        riskScore: containsSystemAccess ? 'High (82%)' : containsEnvCheck ? 'Medium (34%)' : 'Low (2%)',
        permissionsRequired: containsSystemAccess ? ['read_filesystem', 'write_filesystem', 'execute_binary'] : containsEnvCheck ? ['read_env'] : ['none'],
        status: containsSystemAccess ? 'WARNING' : 'PASSED',
        checks: [
          { name: 'Isolated Sandbox Environment Execution', passed: true },
          { name: 'System Calls Boundary Check', passed: !containsSystemAccess },
          { name: 'Secrets Leak Prevention Scan', passed: true },
          { name: 'Imports Dependency Audit', passed: true }
        ],
        recs: containsSystemAccess 
          ? 'CRITICAL WARNING: The agent imports execution commands that write to disk outside the sandbox path. Refactor code to run strictly within the isolated workspace boundary.'
          : containsEnvCheck 
          ? 'INFO: The agent requests access to env keys. Ensure JWT secret claims are signed and loaded securely.'
          : '✓ SDK Security Compliant. Extension matches all sandboxing rules.'
      });
    }, 1200);
  };

  // Inject Event into simulator
  const handlePublishEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simEventDetails.trim()) return;
    const time = new Date().toTimeString().split(' ')[0];
    setEventSimulatorLogs(prev => [
      ...prev,
      { time, type: simEventType, details: simEventDetails.trim() }
    ]);
    setSimEventDetails('');
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6 font-mono text-xs text-slate-300">
      
      {/* 3D Glassmorphic Main Banner */}
      <div className="glass-panel-3d relative bg-slate-900/90 border border-slate-700/60 p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="absolute top-0 left-1/4 right-10 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
              <Zap className="w-3.5 h-3.5" />
              Module 27: AI Agent SDK & Developer Platform Core
            </span>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">Developer Platform Center</h2>
          </div>
          <p className="text-xs text-slate-400 font-bold max-w-xl">
            A programmable gateway providing automated SDK sandboxing, schema manifest building, custom memory interfaces, and Model integration telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 shadow-inner">
          <div className="text-center min-w-[100px]">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">SDK Platform Health</span>
            <span className="text-base font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              99.9%
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center min-w-[100px]">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Compatibility Matrix</span>
            <span className="text-base font-black text-cyan-400 block mt-0.5">v1.4.x - v2.0.x</span>
          </div>
        </div>
      </div>

      {/* Navigation Subsystem Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/80">
        {[
          { id: 'overview', label: 'Developer Center', icon: Heart },
          { id: 'agent_plugin', label: 'Agent & Plugin SDK', icon: Cpu },
          { id: 'workflow_prompt', label: 'Workflow & Prompt SDK', icon: FileCheck2 },
          { id: 'memory_model', label: 'Memory & Model SDK', icon: Database },
          { id: 'tool_event', label: 'Tool & Event SDK', icon: Radio },
          { id: 'ui_marketplace', label: 'UI & Marketplace', icon: ShoppingBag },
          { id: 'docs', label: 'SDK API Documentation', icon: Code }
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

      {/* TAB 1: DEVELOPER CENTER (OVERVIEW) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Main SDK Health Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Sandboxed Extensions', val: '14 Active', desc: '0 system boundary violations', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/5' },
              { label: 'Event Publisher Load', val: '4,280 msgs / sec', desc: 'Pub-sub memory channels synchronized', icon: Radio, color: 'text-cyan-400', bg: 'bg-cyan-500/5' },
              { label: 'UI Component Registry', val: '9 Custom Widgets', desc: 'Loaded dynamically into panels', icon: Layers, color: 'text-amber-400', bg: 'bg-amber-500/5' },
              { label: 'SDK Security Status', val: 'SECURE', desc: 'Permissions validation active', icon: ShieldAlert, color: 'text-purple-400', bg: 'bg-purple-500/5' }
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
            {/* Dynamic Security Matrix Scan Panel */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 md:col-span-2">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  SDK Extension Security Sandbox Validator
                </h3>
                <span className="text-[10px] font-bold text-slate-500">SANDBOX v2</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Agent/Plugin SDK Source Code</label>
                  <textarea 
                    value={securityScanCode} 
                    onChange={(e) => setSecurityScanCode(e.target.value)}
                    className="w-full h-48 bg-slate-950/80 border border-slate-850 p-3.5 rounded-xl outline-none font-mono text-[10px] text-indigo-300 leading-normal"
                  />
                  <button 
                    onClick={runSecurityScan}
                    disabled={isScanning}
                    className="w-full bg-cyan-500 text-black py-3 rounded-xl font-black text-xs hover:bg-cyan-400 flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                        <span>Scanning Script In Sandbox...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-black" />
                        <span>Run Security Validation Scan</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex flex-col justify-between">
                  {securityReport ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-slate-500 uppercase block">Risk Assessment Score</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black border uppercase ${
                          securityReport.status === 'WARNING' 
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>{securityReport.riskScore}</span>
                      </div>
                      
                      <div className="space-y-2">
                        {securityReport.checks.map((c: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-300 font-bold">{c.name}</span>
                            <span className={c.passed ? 'text-emerald-400 font-black' : 'text-rose-400 font-black'}>
                              {c.passed ? '✓ PASSED' : '✗ FAILED'}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-850 text-[9.5px] leading-relaxed text-slate-300">
                        {securityReport.recs}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 text-slate-500 font-bold">
                      <HelpCircle className="w-10 h-10 mx-auto text-slate-700 mb-2" />
                      Paste code and trigger security audit validation.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Platform SDK Compliance Matrix */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  SDK Compatibility Matrix
                </h3>
              </div>
              <div className="space-y-3 font-mono text-[10px]">
                {[
                  { field: 'Agent Lifecycle Hooks', compat: 'v1.4.x - v2.0.x', status: 'STABLE' },
                  { field: 'Memory Provider Interfacing', compat: 'v1.8.x - v2.0.x', status: 'STABLE' },
                  { field: 'Prompt Templates Chaining', compat: 'v1.2.x - v2.0.x', status: 'STABLE' },
                  { field: 'UI Extension Sandbox', compat: 'v2.0.x Only', status: 'NEW FEATURE' }
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex justify-between items-center font-bold">
                    <div>
                      <span className="text-white block font-bold">{s.field}</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Compatible: {s.compat}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black ${
                      s.status === 'STABLE' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    }`}>{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AGENT & PLUGIN SDK */}
      {activeTab === 'agent_plugin' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Manifest Builder Configuration */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                Custom Agent & Plugin Manifest Schema Generator
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setManifestType('agent')}
                    className={`py-2 rounded-xl border text-[10px] font-black uppercase ${
                      manifestType === 'agent' ? 'bg-indigo-950/40 border-indigo-500 text-white' : 'bg-slate-950/50 border-slate-800 text-slate-400'
                    }`}
                  >
                    Custom Agent
                  </button>
                  <button 
                    onClick={() => setManifestType('plugin')}
                    className={`py-2 rounded-xl border text-[10px] font-black uppercase ${
                      manifestType === 'plugin' ? 'bg-indigo-950/40 border-indigo-500 text-white' : 'bg-slate-950/50 border-slate-800 text-slate-400'
                    }`}
                  >
                    Custom Plugin
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase block">Extension Name</label>
                  <input 
                    type="text" 
                    value={extName}
                    onChange={(e) => setExtName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-xl text-white outline-none focus:border-cyan-500 font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase block">Version</label>
                  <input 
                    type="text" 
                    value={extVersion}
                    onChange={(e) => setExtVersion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-xl text-white outline-none focus:border-cyan-500 font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase block">Sandbox Security Claims Matrix</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'read_repo', label: 'Read Repository' },
                      { key: 'write_repo', label: 'Modify Repository' },
                      { key: 'network_read', label: 'Network Outbound' },
                      { key: 'sandbox_execute', label: 'Local Execution' },
                      { key: 'env_vars', label: 'Read Env Secret' },
                      { key: 'event_pub', label: 'Publish API Events' }
                    ].map(p => (
                      <label key={p.key} className="flex items-center gap-2 bg-slate-950/80 border border-slate-850 p-2.5 rounded-xl cursor-pointer hover:border-slate-700">
                        <input 
                          type="checkbox" 
                          checked={extPerms.includes(p.key)}
                          onChange={() => togglePermission(p.key)}
                          className="accent-cyan-500"
                        />
                        <span className="text-[9px] font-bold text-slate-300">{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={compileManifest}
                  className="w-full bg-cyan-500 text-black py-3 rounded-xl font-black hover:bg-cyan-400 transition cursor-pointer shadow text-xs uppercase"
                >
                  Compile Extension Manifest
                </button>
              </div>

              {/* JSON Output Manifest */}
              <div className="flex flex-col h-full min-h-[300px]">
                <span className="text-[9px] font-bold text-slate-500 uppercase block tracking-widest mb-1.5">Generated Schema JSON</span>
                <div className="flex-1 bg-slate-950 border border-slate-850 rounded-xl p-4 overflow-auto font-mono text-[10px] text-emerald-400">
                  {generatedManifest ? (
                    <pre className="whitespace-pre font-bold">{generatedManifest}</pre>
                  ) : (
                    <p className="text-slate-500 text-center py-20 font-bold">Configure parameters and click Compile to generate manifest schema.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Life Cycle Hook Docs */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                Lifecycle Hooks & Hooks SDK
              </h3>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2">
                <span className="text-cyan-300 font-bold block">Agent Life Cycle Hooks</span>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                  Every custom agent schema supports hooking into the standard execution timeline. Insert hooks into index script:
                </p>
                <pre className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-amber-300 text-[9px] overflow-auto font-bold">
{`agent.onStart(async (task) => {
  // before reasoning loop
});

agent.onComplete(async (result) => {
  // on task completion
});`}
                </pre>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2">
                <span className="text-cyan-300 font-bold block">Plugin Integration Hooks</span>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed font-bold">
                  Hook custom listeners into event pipelines (e.g. GitHub merge checks, Jira webhook tickets).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WORKFLOW & PROMPT SDK */}
      {activeTab === 'workflow_prompt' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Workflow Execution Validation */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-400" />
                Workflow DAG Execution & Compiler Validation
              </h3>
            </div>
            
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 min-h-80 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[9px] font-bold text-slate-500 uppercase block tracking-widest">Workflow Schema Definition</span>
                <pre className="bg-slate-900/60 border border-slate-850 p-4 rounded-xl text-indigo-300 text-[10px] overflow-auto leading-relaxed font-bold">
{`{
  "workflow": "CustomDeployPipeline",
  "stages": [
    { "name": "Audit", "agent": "SecurityAgent", "type": "sequential" },
    { "name": "ParallelBuild", "branches": ["DjangoBuild", "NextJSBuild"], "type": "parallel" },
    { "name": "Gate", "type": "human_approval", "timeout_mins": 60 }
  ]
}`}
                </pre>
              </div>
              <div className="flex gap-4 items-center justify-between border-t border-slate-900 pt-4">
                <div className="flex gap-2">
                  <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">Consensus Reached</span>
                  <span className="text-[10px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 px-2 py-0.5 rounded">DAG Compiled</span>
                </div>
                <button className="bg-cyan-500 text-black px-4 py-2 rounded-xl font-black text-[10px] cursor-pointer hover:bg-cyan-400 uppercase shadow-md">
                  Verify DAG Schema
                </button>
              </div>
            </div>
          </div>

          {/* Prompt SDK Chaining */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-cyan-400" />
                Prompt Template Chaining
              </h3>
            </div>
            
            <div className="space-y-4 text-[10px] leading-relaxed">
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1.5">
                <span className="text-white font-bold block">Chained Prompt Template</span>
                <p className="text-slate-400 font-bold">
                  Enforces strict output schemas for agent system instructions using nested template variables.
                </p>
                <code className="text-[9px] bg-slate-900 p-2 rounded block text-amber-300 border border-slate-800 font-bold">
                  {'System: Analyze ${code} based on rules ${rules}'}
                </code>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1">
                <span className="text-slate-400 font-bold block">Prompt Quality Index</span>
                <span className="text-sm font-black text-emerald-400 block">Grade A+ (Optimal Context Limit)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MEMORY & MODEL SDK */}
      {activeTab === 'memory_model' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Custom Memory Providers */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                Memory Engines & Vector DB Integrations
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[10px]">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                <span className="text-white font-black block border-b border-slate-900 pb-1.5 uppercase">Registered Memory Providers</span>
                {[
                  { name: 'PGVector Memory', type: 'Vector Database', lat: '12ms', sync: '100%' },
                  { name: 'Neo4j Knowledge Graph', type: 'Graph Database', lat: '35ms', sync: '98%' },
                  { name: 'Redis Cache Register', type: 'Key-Value Memory', lat: '1.2ms', sync: '100%' }
                ].map((mem, idx) => (
                  <div key={idx} className="flex justify-between items-center font-bold">
                    <div>
                      <span className="text-slate-300 block">{mem.name}</span>
                      <span className="text-[8px] text-slate-500">{mem.type}</span>
                    </div>
                    <span className="text-[8px] text-cyan-400">{mem.lat} lookup</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                <span className="text-white font-black block border-b border-slate-900 pb-1.5 uppercase">Register Custom Provider</span>
                <div className="space-y-2">
                  <p className="text-slate-400 font-bold leading-normal">
                    Custom memory layers can be registered by extending the `MemoryEngine` prototype. Set configurations:
                  </p>
                  <pre className="bg-slate-900 p-2.5 rounded border border-slate-850 text-amber-300 text-[9px] font-bold overflow-auto">
{`class CustomDB extends MemoryEngine {
  async store(key, vector) {}
  async query(vector, limit) {}
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* AI Model SDK Benchmarks */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Coins className="w-4 h-4 text-cyan-400" />
                AI Model Integration Telemetry
              </h3>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {modelsList.map((model, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex justify-between items-center">
                  <div>
                    <span className="text-white font-black block text-xs">{model.name}</span>
                    <span className="text-[9px] text-slate-500 font-bold block mt-0.5">{model.provider} • Context: {model.context}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-cyan-300 block">{model.pricing}</span>
                    <span className="text-[8px] text-slate-400 font-bold block mt-0.5">{model.benchmark}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TOOL & EVENT SDK */}
      {activeTab === 'tool_event' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Event Publisher Simulator */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                Live Event Bus & Publisher SDK Simulator
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form onSubmit={handlePublishEvent} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase block">Event Type</label>
                  <select 
                    value={simEventType}
                    onChange={(e) => setSimEventType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-xl outline-none text-xs"
                  >
                    <option value="agent.lifecycle.event">agent.lifecycle.event</option>
                    <option value="repository.event.commit">repository.event.commit</option>
                    <option value="workflow.event.completed">workflow.event.completed</option>
                    <option value="security.event.violation">security.event.violation</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase block">Event Details / Payload</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Custom action loaded successfully"
                    value={simEventDetails}
                    onChange={(e) => setSimEventDetails(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500 text-xs font-bold"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-cyan-500 text-black py-3 rounded-xl font-black hover:bg-cyan-400 transition cursor-pointer text-xs uppercase shadow"
                >
                  Publish Event
                </button>
              </form>

              {/* Event Logs */}
              <div className="flex flex-col h-full min-h-[220px]">
                <span className="text-[9px] font-bold text-slate-500 uppercase block tracking-widest mb-1.5">Event Bus Stream</span>
                <div className="flex-1 bg-slate-950 border border-slate-850 rounded-xl p-4 overflow-y-auto space-y-2 text-[10px]">
                  {eventSimulatorLogs.map((log, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-850 p-2 rounded-lg space-y-1 flex flex-col">
                      <div className="flex justify-between items-center text-[8px] font-black text-slate-500">
                        <span>{log.time}</span>
                        <span className="text-cyan-400 uppercase">{log.type}</span>
                      </div>
                      <p className="text-slate-300 font-bold leading-normal">{log.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Custom Tool SDK & Sandboxing */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Custom Tool Sandboxing Rules
              </h3>
            </div>
            
            <div className="space-y-4 text-[10px] leading-relaxed font-mono">
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2">
                <span className="text-white font-bold block uppercase border-b border-slate-900 pb-1.5">Sandbox Permissions Matrix</span>
                <div className="space-y-1">
                  <div className="flex justify-between font-bold"><span>Filesystem: Read</span> <span className="text-emerald-400 font-black">ALLOWED</span></div>
                  <div className="flex justify-between font-bold"><span>Filesystem: Write</span> <span className="text-amber-400 font-black">RESTRICTED</span></div>
                  <div className="flex justify-between font-bold"><span>Terminal: Execute</span> <span className="text-rose-400 font-black">BLOCKED</span></div>
                  <div className="flex justify-between font-bold"><span>Outbound API Request</span> <span className="text-emerald-400 font-black">ALLOWED</span></div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1">
                <span className="text-slate-400 font-bold block">Security Audit Note</span>
                <p className="text-slate-300 font-bold leading-normal">
                  All third-party tools are executed inside an isolated WebAssembly sandbox. Attempts to compile or execute processes outside `/app/workspace` boundary will raise immediate `security.event.violation`.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: UI & MARKETPLACE */}
      {activeTab === 'ui_marketplace' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Custom UI Extension Preview */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Custom UI Extension Component Preview
              </h3>
            </div>
            
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 min-h-80 flex flex-col justify-between">
              <div className="border border-slate-800/80 bg-slate-900/50 rounded-xl p-5 relative overflow-hidden flex flex-col gap-3 max-w-md mx-auto w-full">
                {/* Simulated Custom Widget */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500" />
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">CUSTOM MODULE WIDGET</span>
                  <span className="text-slate-500 text-[8px] font-bold">Ver: 1.0.0</span>
                </div>
                <h4 className="text-white text-xs font-black">System Load & Vector Indices Latency</h4>
                <div className="flex gap-2 items-center">
                  <span className="text-lg font-black text-cyan-300">14.2ms</span>
                  <span className="text-[9px] text-emerald-400 font-bold">Optimal (92% cache hit)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500" style={{ width: '75%' }} />
                </div>
              </div>

              <div className="flex gap-4 items-center justify-between border-t border-slate-900 pt-4 text-[10px] text-slate-400">
                <span className="font-bold">Dynamic Widget Sandbox Preview (Renders inside custom dashboard layout)</span>
              </div>
            </div>
          </div>

          {/* Marketplace SDK extensions registry */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                Extension Marketplace Registry
              </h3>
            </div>

            <div className="space-y-3 font-mono text-[10px]">
              {[
                { name: 'Supabase Memory Hook', category: 'Memory Provider', rate: '★ 4.9', dl: '1.2k dl' },
                { name: 'Linear Workflow Ticket sync', category: 'Workflow Template', rate: '★ 4.8', dl: '840 dl' },
                { name: 'Stripe Payment Gateway', category: 'API Plugin', rate: '★ 4.7', dl: '2.1k dl' },
                { name: 'DeepSeek-V3 Coder Profile', category: 'Model Config', rate: '★ 4.9', dl: '420 dl' }
              ].map((ext, idx) => (
                <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-white block font-bold">{ext.name}</span>
                    <span className="text-slate-500 font-mono text-[9px]">{ext.dl}</span>
                  </div>
                  <div className="flex justify-between text-[8px] text-slate-400">
                    <span className="text-cyan-400 uppercase font-black">{ext.category}</span>
                    <span className="text-amber-400 font-bold">{ext.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SDK DOCUMENTATION & API REFERENCE */}
      {activeTab === 'docs' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SDK Developer API Guide */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400" />
                Platform SDK Core Developer API Reference
              </h3>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4 overflow-y-auto max-h-[420px] font-mono text-[10px] leading-relaxed">
              <div className="space-y-1">
                <h4 className="text-white font-black text-xs">1. Registering Custom Model Integration</h4>
                <p className="text-slate-400 font-bold">
                  Initialize and bind custom LLM endpoints by extending `ModelIntegrationCore` interface class.
                </p>
                <pre className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-amber-300 font-bold overflow-auto">
{`import { ModelSDK } from '@autoengineer/sdk';

const deepseekModel = new ModelSDK.Model({
  id: 'deepseek-v3',
  pricingPerMillionTokens: 0.50,
  contextWindow: 64000,
  endpoint: 'https://api.deepseek.com/v1/chat'
});`}
                </pre>
              </div>

              <div className="space-y-1">
                <h4 className="text-white font-black text-xs">2. Publishing Custom Events</h4>
                <p className="text-slate-400 font-bold">
                  Broadcast custom events across workspace channels to trigger parallel pipeline hooks.
                </p>
                <pre className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-amber-300 font-bold overflow-auto">
{`import { EventSDK } from '@autoengineer/sdk';

await EventSDK.publish('agent.lifecycle.event', {
  agentName: 'CustomReviewer',
  status: 'ACTIVE',
  payload: { auditPassed: true }
});`}
                </pre>
              </div>

              <div className="space-y-1">
                <h4 className="text-white font-black text-xs">3. Custom Memory retrieval schema</h4>
                <p className="text-slate-400 font-bold">
                  Write customized query methods for fetching RAG document chunks in parallel.
                </p>
              </div>
            </div>
          </div>

          {/* Platform Migration Guide & Sandbox constraints */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" />
                SDK v2 migration guide
              </h3>
            </div>

            <div className="space-y-4 font-mono text-[10px] leading-relaxed">
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2 text-slate-300">
                <strong className="text-white block border-b border-slate-900 pb-1.5 uppercase font-bold">Core API Changes:</strong>
                <p className="font-bold">- Deprecated direct file system imports. Use SDK `context.read` / `context.write` instead.</p>
                <p className="font-bold">- Enforced strict JWT authentication scope validation check on event bus subscribers.</p>
                <p className="font-bold">- All Custom Model responses must follow structured pydantic definitions validation.</p>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2 text-slate-300">
                <strong className="text-white block border-b border-slate-900 pb-1.5 uppercase font-bold">Sandbox Memory Limits:</strong>
                <p className="font-bold">Extensions are allocated a strict maximum boundary of 128MB. Thread allocation over limit raises failover sequence check.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
