'use client';
import React, { useState } from 'react';
import { 
  Box, Layers, Calendar, CheckCircle2, ShieldCheck, ShieldAlert, Cpu, Server, 
  HardDrive, Zap, Copy, Check, Code2, Sparkles, Award, Globe2, Activity,
  Coins, Network, GitBranch, ArrowRight, Play, RefreshCw, X, Plus, Trash2, Key
} from 'lucide-react';

interface CloudProvider {
  name: string;
  region: string;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  latency: string;
  load: number;
}

interface K8sPod {
  name: string;
  status: 'Running' | 'Pending' | 'Failed';
  restarts: number;
  cpu: string;
}

export const DevOpsOrchestratorUI = () => {
  // Active Navigation Tab for Distributed Cloud Core
  const [activeTab, setActiveTab] = useState<'overview' | 'k8s_containers' | 'load_balancer' | 'database_storage' | 'iac_helm' | 'gpu_inference' | 'disaster_recovery'>('overview');

  // Multi-Cloud Providers State
  const [providers, setProviders] = useState<CloudProvider[]>([
    { name: 'AWS (us-east-1)', region: 'North Virginia', status: 'ONLINE', latency: '42ms', load: 45 },
    { name: 'GCP (europe-west3)', region: 'Frankfurt', status: 'ONLINE', latency: '28ms', load: 32 },
    { name: 'Azure (eastasia)', region: 'Hong Kong', status: 'ONLINE', latency: '85ms', load: 15 },
    { name: 'Hetzner (hel1-dc2)', region: 'Helsinki', status: 'ONLINE', latency: '34ms', load: 60 }
  ]);

  // Kubernetes Pods State
  const [k8sPods, setK8sPods] = useState<K8sPod[]>([
    { name: 'api-gateway-7df84', status: 'Running', restarts: 0, cpu: '12m' },
    { name: 'fastapi-ai-service-23cd8', status: 'Running', restarts: 1, cpu: '145m' },
    { name: 'django-backend-94bf2', status: 'Running', restarts: 0, cpu: '48m' },
    { name: 'redis-cache-0', status: 'Running', restarts: 0, cpu: '4m' },
    { name: 'celery-worker-88aef', status: 'Running', restarts: 3, cpu: '210m' }
  ]);

  // Load Balancer State
  const [lbRoutingPolicy, setLbRoutingPolicy] = useState<'Geo' | 'Latency' | 'Weighted' | 'Failover'>('Latency');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Disaster Recovery Drill state
  const [drStatus, setDrStatus] = useState<'stable' | 'active_drill' | 'failover_completed'>('stable');
  const [drLogs, setDrLogs] = useState<Array<{ time: string; msg: string; type: string }>>([
    { time: '13:30:00', msg: 'Global infrastructure synchronized. High Availability policies enforced.', type: 'ok' }
  ]);
  const [isSimulatingDR, setIsSimulatingDR] = useState(false);

  // Canary Deployment progress
  const [canaryWeight, setCanaryWeight] = useState<number>(10);

  // Dynamic cost configuration
  const [gpuCostPerHour, setGpuCostPerHour] = useState<number>(2.48);
  const [gpuInstanceCount, setGpuInstanceCount] = useState<number>(8);

  const handleCopyCode = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Trigger simulated region blackout and automatic multi-cloud failover
  const runDisasterRecoveryDrill = () => {
    if (isSimulatingDR) return;
    setIsSimulatingDR(true);
    setDrStatus('active_drill');
    const time1 = new Date().toTimeString().split(' ')[0];

    // Log step 1: Blackout simulated
    setDrLogs(prev => [
      ...prev,
      { time: time1, msg: '🚨 [DRILL CRITICAL] Simulated AWS (us-east-1) primary datacenter blackout.', type: 'fail' }
    ]);
    setProviders(prev => prev.map(p => p.name.includes('AWS') ? { ...p, status: 'OFFLINE' } : p));

    // Log step 2: Global Traffic redirection triggered
    setTimeout(() => {
      const time2 = new Date().toTimeString().split(' ')[0];
      setDrLogs(prev => [
        ...prev,
        { time: time2, msg: '🌐 Global Load Balancer DNS geo-routing policy overridden. Rerouting 100% traffic to GCP (europe-west3) / Hetzner.', type: 'warn' }
      ]);
    }, 1500);

    // Log step 3: Databases failover completed
    setTimeout(() => {
      const time3 = new Date().toTimeString().split(' ')[0];
      setDrLogs(prev => [
        ...prev,
        { time: time3, msg: '✓ PostgreSQL Shard replication promoted to primary database node. Point-in-time recovery confirmed.', type: 'ok' }
      ]);
    }, 3000);

    // Log step 4: System back to normal
    setTimeout(() => {
      const time4 = new Date().toTimeString().split(' ')[0];
      setDrLogs(prev => [
        ...prev,
        { time: time4, msg: '✓ Failover sequence completed successfully in 4.2 seconds. Operational uptime restored.', type: 'ok' }
      ]);
      setDrStatus('failover_completed');
      setIsSimulatingDR(false);
    }, 4500);
  };

  // Reset drill
  const resetDrill = () => {
    setDrStatus('stable');
    setProviders(prev => prev.map(p => p.name.includes('AWS') ? { ...p, status: 'ONLINE' } : p));
    setDrLogs([
      { time: new Date().toTimeString().split(' ')[0], msg: 'Global infrastructure synchronized. High Availability policies enforced.', type: 'ok' }
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6 font-mono text-xs text-slate-300">
      
      {/* 3D Glassmorphic Main Banner */}
      <div className="glass-panel-3d relative bg-slate-900/90 border border-slate-700/60 p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="absolute top-0 left-1/4 right-10 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
              <Globe2 className="w-3.5 h-3.5" />
              Module 29: Distributed Cloud & Multi-Region Infrastructure Core
            </span>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">Cloud Command Center</h2>
          </div>
          <p className="text-xs text-slate-400 font-bold max-w-xl">
            A visual multi-cloud operating layer managing global Kubernetes clusters, geo-routing DNS, container registries, and active disaster recovery drills.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 shadow-inner">
          <div className="text-center min-w-[100px]">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">HA Uptime</span>
            <span className="text-base font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              99.999%
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center min-w-[100px]">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Compliance</span>
            <span className="text-base font-black text-cyan-400 block mt-0.5">SOC 2 / GDPR</span>
          </div>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/80">
        {[
          { id: 'overview', label: 'Command Center', icon: Server },
          { id: 'k8s_containers', label: 'Kubernetes & Pods', icon: Layers },
          { id: 'load_balancer', label: 'Global Load Balancer', icon: Network },
          { id: 'database_storage', label: 'Storage & Geo-Replication', icon: HardDrive },
          { id: 'iac_helm', label: 'IaC Blueprints', icon: Code2 },
          { id: 'gpu_inference', label: 'Inference Clusters', icon: Cpu },
          { id: 'disaster_recovery', label: 'Disaster Recovery Drill', icon: ShieldAlert }
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

      {/* TAB CONTENT */}

      {/* 1. CLOUD COMMAND CENTER (OVERVIEW) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Main Provider Health Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {providers.map((p, idx) => (
              <div 
                key={idx} 
                className={`bg-slate-900/80 border p-5 rounded-2xl shadow-md flex items-start justify-between ${
                  p.status === 'ONLINE' ? 'border-slate-800 bg-slate-900' : 'border-rose-900/50 bg-rose-950/10'
                }`}
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">{p.name}</span>
                  <span className={`text-base font-black block ${p.status === 'ONLINE' ? 'text-cyan-400' : 'text-rose-400 animate-pulse'}`}>{p.status}</span>
                  <span className="text-[9px] text-slate-400 block">Region: {p.region} • RTT: {p.latency}</span>
                </div>
                <div className="text-right flex flex-col items-end gap-2.5">
                  <Globe2 className={`w-5 h-5 ${p.status === 'ONLINE' ? 'text-cyan-400' : 'text-rose-400'}`} />
                  <span className="text-[8px] bg-slate-950 px-2 py-0.5 rounded border border-slate-850 font-bold">Load: {p.load}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WAF Traffic & CDN Ingress logs */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 md:col-span-2">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  API Gateway WAF Traffic Ingress
                </h3>
                <span className="text-[10px] text-slate-400">GEO ROUTING ACTIVE</span>
              </div>
              
              <div className="w-full h-40 bg-slate-950/80 border border-slate-800 rounded-xl relative p-4 flex flex-col justify-between">
                <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 0 60 L 20 40 L 40 80 L 60 30 L 80 45 L 100 20" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <circle cx="60" cy="30" r="3" fill="#22d3ee" />
                </svg>
                <div className="flex justify-between w-full text-[9px] text-slate-500 z-10 font-bold">
                  <span>WAF Block Rate: 0.02%</span>
                  <span className="text-cyan-400">Total Throughput: 4,820 req/s</span>
                </div>
                <div className="flex justify-between w-full mt-auto text-[9px] text-slate-600 z-10 font-bold">
                  <span>13:20</span>
                  <span>13:25</span>
                  <span>13:30 (Now)</span>
                </div>
              </div>
            </div>

            {/* Compliance Report Status */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Security & Compliance Scorecard
                </h3>
              </div>

              <div className="space-y-3 font-mono text-[10px]">
                {[
                  { audit: 'SOC 2 Type II Validation', standard: 'Trust Services Criteria', status: 'PASSED' },
                  { audit: 'GDPR Data Residency', standard: 'EU Local Shards Enforced', status: 'PASSED' },
                  { audit: 'ISO 27001 ISMS', standard: 'Vulnerability scans active', status: 'PASSED' }
                ].map((audit, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex justify-between items-center font-bold">
                    <div>
                      <span className="text-white block font-bold">{audit.audit}</span>
                      <span className="text-[9px] text-slate-500 block mt-0.5">{audit.standard}</span>
                    </div>
                    <span className="text-[9px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">Passed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. KUBERNETES & CONTAINERS */}
      {activeTab === 'k8s_containers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active K8s Pods Monitor */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Kubernetes Pods Registry (Namespace: autoengineer-prod)
              </h3>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">ALL PODS HEALTHY</span>
            </div>

            <div className="space-y-2.5">
              {k8sPods.map(pod => (
                <div key={pod.name} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center justify-between shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-lg bg-slate-900 p-2.5 rounded-xl border border-slate-800">📦</span>
                    <div>
                      <h4 className="text-xs font-black text-white">{pod.name}</h4>
                      <p className="text-[9.5px] text-slate-500 font-bold mt-0.5">CPU Alloc: {pod.cpu} • Restarts: {pod.restarts}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-400/30 uppercase">{pod.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kubernetes Release Strategy controller */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                Release Orchestrator (Canary Rollout)
              </h3>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-3">
                <span className="text-[9px] font-bold text-slate-500 uppercase block tracking-widest border-b border-slate-900 pb-1.5">Canary Traffic Weight</span>
                
                <div className="flex justify-between font-bold text-[10px]">
                  <span className="text-slate-400">Canary (v2.1.0)</span>
                  <span className="text-cyan-400 font-black">{canaryWeight}%</span>
                </div>
                <div className="flex justify-between font-bold text-[10px]">
                  <span className="text-slate-400">Stable (v2.0.4)</span>
                  <span className="text-slate-300 font-black">{100 - canaryWeight}%</span>
                </div>

                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="5"
                  value={canaryWeight}
                  onChange={(e) => setCanaryWeight(Number(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-950 cursor-pointer h-1.5 rounded-lg"
                />
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2 text-slate-300">
                <strong className="text-white block border-b border-slate-900 pb-1.5 uppercase font-bold text-[9px]">Autoscaling (HPA) Bounds</strong>
                <p className="font-bold">Min Replicas: 3 Pods</p>
                <p className="font-bold">Max Replicas: 12 Pods</p>
                <p className="font-bold">Scale trigger: CPU usage &gt; 80%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. GLOBAL LOAD BALANCER & DNS */}
      {activeTab === 'load_balancer' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Geo Routing Config */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-6">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-400" />
                Global Load Balancer Geo-Routing Policy
              </h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-slate-400 font-bold block mb-1.5">Select DNS Routing Policy</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'Geo', name: 'Geo-Routing', desc: 'Nearest Node' },
                    { id: 'Latency', name: 'Lowest Latency', desc: 'Ping Optimization' },
                    { id: 'Weighted', name: 'Weighted Round Robin', desc: 'Ratio Alloc' },
                    { id: 'Failover', name: 'Active-Passive', desc: 'DR Standby' }
                  ].map(policy => (
                    <div 
                      key={policy.id}
                      onClick={() => setLbRoutingPolicy(policy.id as any)}
                      className={`p-4 rounded-xl border cursor-pointer text-center space-y-1 transition duration-200 ${
                        lbRoutingPolicy === policy.id 
                          ? 'bg-indigo-950/40 border-indigo-500/80 shadow-md text-white' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-black block">{policy.name}</span>
                      <span className="text-[8.5px] text-slate-500 font-bold block">{policy.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-3 font-mono text-[10px]">
                <span className="text-white font-bold block uppercase border-b border-slate-900 pb-1.5">DNS Edge Nodes Status</span>
                <div className="flex justify-between font-bold"><span>Edge Host: cdg-01 (Paris, EU)</span> <span className="text-emerald-400">14ms latency</span></div>
                <div className="flex justify-between font-bold"><span>Edge Host: nrt-04 (Tokyo, AP)</span> <span className="text-emerald-400">32ms latency</span></div>
                <div className="flex justify-between font-bold"><span>Edge Host: iad-02 (Virginia, US)</span> <span className="text-emerald-400">8ms latency</span></div>
              </div>
            </div>
          </div>

          {/* API Gateway Rate Limiter */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" />
                API Gateway Rate Limiter
              </h3>
            </div>
            
            <div className="space-y-4 text-[10.5px] leading-relaxed">
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1">
                <span className="text-white font-bold block uppercase text-[9px] border-b border-slate-900 pb-1.5">Global Rate Limit Limits</span>
                <p className="font-bold">Public APIs: 60 req / min</p>
                <p className="font-bold">Authenticated APIs: 2,500 req / min</p>
                <p className="font-bold">Status: <span className="text-emerald-400 font-black">ENFORCED (0 violations)</span></p>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1 text-slate-400">
                <span className="text-slate-300 font-bold block text-[9px]">Edge CDN Caching:</span>
                Cache hit ratio today is <strong>88.4%</strong>. Object storage static files are cached on Cloudflare globally with a 24h TTL policy.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. GLOBAL DATABASE & STORAGE */}
      {activeTab === 'database_storage' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Geo database sync metrics */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                Multi-Region Database Replication & Shards Sync
              </h3>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 font-mono text-[10px]">
              {[
                { db: 'PostgreSQL Shard US-Primary', syncOffset: '0 bytes', status: 'SYNCHRONIZED', region: 'us-east-1' },
                { db: 'PostgreSQL Shard EU-Replica', syncOffset: '128 bytes', status: 'SYNCHRONIZED', region: 'europe-west3' },
                { db: 'Neo4j Graph Graph Node', syncOffset: '0 bytes', status: 'SYNCHRONIZED', region: 'us-east-1' },
                { db: 'ClickHouse OLAP Log Cluster', syncOffset: '1.2 KB', status: 'SYNCING', region: 'europe-west3' }
              ].map((shard, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-slate-900 pb-2 last:border-b-0 font-bold">
                  <div>
                    <span className="text-white block">{shard.db}</span>
                    <span className="text-[9px] text-slate-500 font-bold">Region: {shard.region}</span>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                      shard.status === 'SYNCHRONIZED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-pulse'
                    }`}>{shard.status}</span>
                    <span className="text-[9.5px] text-slate-400 block mt-0.5">Offset: {shard.syncOffset}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backup Storage Snapshots */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                Object Storage Backups
              </h3>
            </div>

            <div className="space-y-3">
              {[
                { name: 'db_pitr_20260722_120000', size: '245 MB', retention: '30 Days' },
                { name: 'db_pitr_20260721_120000', size: '242 MB', retention: '30 Days' },
                { name: 'assets_backup_daily_v1.2', size: '1.8 GB', retention: '90 Days' }
              ].map((b, idx) => (
                <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 flex justify-between items-center font-bold">
                  <div>
                    <span className="text-white block font-bold text-xs">{b.name}</span>
                    <span className="text-[9px] text-slate-500 block mt-0.5">Size: {b.size} • Retention: {b.retention}</span>
                  </div>
                  <span className="text-[9px] font-black text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-400/30 font-mono">BACKUP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. IAC TERRAFORM & HELM BLUEPRINTS */}
      {activeTab === 'iac_helm' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* IAC blueprint code window */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                Infrastructure as Code (IaC) Terraform Deployment Blueprint
              </h3>
              <button 
                onClick={() => handleCopyCode(`provider "aws" {
  region = "us-east-1"
}

resource "aws_eks_cluster" "primary" {
  name     = "autoengineer-prod"
  role_arn = aws_iam_role.eks_role.arn

  vpc_config {
    subnet_ids = [aws_subnet.pub_1.id, aws_subnet.pub_2.id]
  }
}`, 'tf')}
                className="text-xs px-3.5 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer font-bold font-mono"
              >
                {copiedCode === 'tf' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-300" />}
                {copiedCode === 'tf' ? 'Copied' : 'Copy Terraform'}
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 shadow-inner">
              <pre className="text-indigo-300 text-[10.5px] leading-relaxed overflow-x-auto whitespace-pre font-bold">
{`provider "aws" {
  region = "us-east-1"
}

resource "aws_eks_cluster" "primary" {
  name     = "autoengineer-prod"
  role_arn = aws_iam_role.eks_role.arn

  vpc_config {
    subnet_ids = [aws_subnet.pub_1.id, aws_subnet.pub_2.id]
  }
}`}
              </pre>
            </div>
          </div>

          {/* Helm Deployments */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Helm Chart Deployments
              </h3>
              <span className="text-[10px] font-black text-emerald-400 uppercase">3 DEPLOYED</span>
            </div>

            <div className="space-y-3">
              {[
                { chart: 'nginx-ingress', ver: '4.8.0', namespace: 'kube-system' },
                { chart: 'redis-cluster', ver: '18.2.1', namespace: 'autoengineer-prod' },
                { chart: 'cert-manager', ver: '1.13.0', namespace: 'security' }
              ].map((helm, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1 font-bold">
                  <div className="flex justify-between items-center text-white">
                    <span>{helm.chart}</span>
                    <span className="text-[9px] text-slate-500 font-mono">Chart v{helm.ver}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Namespace: {helm.namespace}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. AI INFERENCE & GPU CLUSTERS */}
      {activeTab === 'gpu_inference' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GPU pool metrics */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-6">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                AI Inference GPU Node Pools & Allocations
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                <span className="text-white font-black block border-b border-slate-900 pb-1.5 uppercase">GPU Nodes Utilization</span>
                <div className="space-y-3 font-bold text-[10px]">
                  <div className="flex justify-between"><span>Node A100-01 (AWS)</span> <span className="text-emerald-400">82% Load (Active)</span></div>
                  <div className="flex justify-between"><span>Node A100-02 (AWS)</span> <span className="text-emerald-400">54% Load (Active)</span></div>
                  <div className="flex justify-between"><span>Node H100-01 (GCP)</span> <span className="text-emerald-400">12% Load (Optimal)</span></div>
                  <div className="flex justify-between"><span>Node RTX4090-01 (Local)</span> <span className="text-slate-500">0% Load (Standby)</span></div>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                <span className="text-white font-black block border-b border-slate-900 pb-1.5 uppercase">Model Cache status</span>
                <div className="space-y-2 text-[10.5px] leading-relaxed text-slate-300">
                  <p className="font-bold">Active Cached Models in GPU Memory:</p>
                  <p className="font-bold">- Claude-3.5-Sonnet: <strong className="text-cyan-300">Pre-loaded</strong> (Hot)</p>
                  <p className="font-bold">- Gemini-1.5-Pro: <strong className="text-cyan-300">Pre-loaded</strong> (Hot)</p>
                  <p className="font-bold">- DeepSeek-Coder: <strong className="text-slate-500">Unloaded</strong> (Cold Cache)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Inference cost details */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Coins className="w-4 h-4 text-cyan-400" />
                Inference GPU Pools Costs
              </h3>
            </div>

            <div className="space-y-4 font-mono text-[10px]">
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Instance Count</span>
                  <span className="text-white">{gpuInstanceCount} Nodes</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="32" 
                  step="2"
                  value={gpuInstanceCount}
                  onChange={(e) => setGpuInstanceCount(Number(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-950 cursor-pointer h-1.5 rounded-lg"
                />
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">Estimated GPU Bill</span>
                <span className="text-base font-black text-rose-400">${(gpuCostPerHour * gpuInstanceCount * 24 * 30).toFixed(2)} / mo</span>
                <span className="text-[8px] text-slate-500 block font-bold mt-0.5">Calculated at ${gpuCostPerHour}/hr per instance</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. DISASTER RECOVERY DRILL SIMULATOR */}
      {activeTab === 'disaster_recovery' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trace Logs console */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Disaster Recovery Trace Logs Console
              </h3>
              
              <div className="flex gap-2">
                {drStatus !== 'stable' && (
                  <button 
                    onClick={resetDrill}
                    className="bg-slate-950 border border-slate-700 hover:bg-slate-800 px-3 py-1.5 rounded-xl text-[10px] font-black cursor-pointer text-slate-300"
                  >
                    Reset System
                  </button>
                )}
                <button 
                  onClick={runDisasterRecoveryDrill}
                  disabled={isSimulatingDR || drStatus === 'failover_completed'}
                  className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 px-3.5 py-1.5 rounded-xl text-[10px] font-black transition cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5 animate-pulse text-rose-400" />
                  <span>Simulate Region Blackout</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 h-72 overflow-y-auto space-y-2 text-[10.5px]">
              {drLogs.map((log, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-850 p-3 rounded-xl flex flex-col gap-1 shadow-inner">
                  <div className="flex justify-between items-center text-[8.5px] font-bold text-slate-500">
                    <span>{log.time}</span>
                    <span className={`px-2 py-0.5 rounded uppercase ${
                      log.type === 'fail' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                      log.type === 'warn' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20 animate-pulse' : 
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

          {/* Recovery Strategy metrics */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                Disaster Recovery Policies
              </h3>
            </div>

            <div className="space-y-4 font-mono text-[10px] leading-relaxed">
              <span className="text-[9px] font-bold text-slate-500 uppercase block tracking-widest font-bold">DR Configuration Summary</span>
              
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2 text-slate-300">
                <p className="font-bold">Replication Target: Geo-redundant</p>
                <p className="font-bold">RTO (Recovery Time Objective): &lt; 5 seconds</p>
                <p className="font-bold">RPO (Recovery Point Objective): &lt; 100 ms</p>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1.5 text-slate-400 font-bold">
                🔒 Backup retention logs are stored securely with KMS key rotation and audited monthly for SOC 2 Type II compliance controls.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
