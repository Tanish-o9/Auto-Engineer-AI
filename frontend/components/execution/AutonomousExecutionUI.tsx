'use client';
import React, { useState } from 'react';
import { 
  Terminal, ShieldCheck, Cloud, Wifi, Cpu, Play, 
  CheckCircle2, RefreshCw, AlertCircle, Info, Landmark
} from 'lucide-react';

export const AutonomousExecutionUI = () => {
  const [activeTab, setActiveTab] = useState<'os' | 'cloud' | 'robotics' | 'incident' | 'safety'>('os');

  const exec = {
    os: {
      processes: 8,
      commands: [
        { cmd: "systemctl status uvicorn", env: "Ubuntu 22.04", status: "SAFE_RUN" }
      ],
      browser: [
        { url: "https://dashboard.acme.com", action: "Click login element", status: "VERIFIED" }
      ]
    },
    cloud: {
      servers: 14,
      balancers: 2,
      providers: [
        { name: "AWS", nodes: 8, region: "us-east-1", health: "HEALTHY" },
        { name: "GCP", nodes: 6, region: "us-central1", health: "HEALTHY" }
      ]
    },
    robotics: {
      node: "ONLINE",
      iot_count: 18,
      kinematics: {
        joints: 6,
        pose: "x: 1.42, y: -0.85, z: 0.12",
        trajectory: "OPTIMAL"
      }
    },
    incident: {
      alerts: 0,
      resolved: 1,
      logs: [
        { id: "inc-982", cause: "RDS Memory Threshold Outage", fix: "Automatic DB Replica Promotion", status: "RESOLVED" }
      ]
    },
    safety: {
      status: "SAFE",
      danger: "0.00%",
      envelope: "ENFORCED",
      approvals: [
        { action: "Robot arm trajectory change", officer: "Human Safety Officer", status: "GRANTED" }
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
              <Terminal className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              Autonomous Execution & Physical Intelligence Core
            </span>
            <h2 className="text-2xl font-black text-white">Autonomous OS, Cloud & Robotics Controls</h2>
          </div>
          <p className="text-xs text-slate-300 font-bold">
            OS Controller • Cloud Provisioner • ROS/ROS2 Robotics • IoT Node Controller • Incident Response
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Physical Safety</span>
            <span className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {exec.safety.status}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Subsystem Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 font-mono text-xs">
        <button
          onClick={() => setActiveTab('os')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'os' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>OS & Browser</span>
        </button>

        <button
          onClick={() => setActiveTab('cloud')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'cloud' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Cloud className="w-4 h-4" />
          <span>Cloud Controller</span>
        </button>

        <button
          onClick={() => setActiveTab('robotics')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'robotics' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Wifi className="w-4 h-4" />
          <span>Robotics & IoT</span>
        </button>

        <button
          onClick={() => setActiveTab('incident')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'incident' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Incident Ticker</span>
        </button>

        <button
          onClick={() => setActiveTab('safety')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'safety' ? 'bg-cyan-500 text-black shadow-lg font-extrabold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Safety Gates</span>
        </button>
      </div>

      {/* TAB 1: OS & BROWSER */}
      {activeTab === 'os' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              OS Commands & Browser Automation Execution Logs
            </h3>
            <p className="text-xs text-slate-400">Verifies system actions running inside sandboxed shell directories</p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 shadow">
              <span className="text-cyan-300 font-bold block">Shell Commands Logged:</span>
              {exec.os.commands.map((c, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px] border-b border-slate-900 pb-1">
                  <span className="text-slate-300"><code>{c.cmd}</code> ({c.env})</span>
                  <span className="text-emerald-400 font-black">{c.status}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 shadow">
              <span className="text-cyan-300 font-bold block">Browser Workflows Logged:</span>
              {exec.os.browser.map((b, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-300"><code>{b.action}</code> on <code>{b.url}</code></span>
                  <span className="text-emerald-400 font-black">{b.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLOUD CONTROLLER */}
      {activeTab === 'cloud' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Cloud className="w-5 h-5 text-cyan-400" />
                Cloud Infrastructure Provisioner & Node Scaler
              </h3>
              <p className="text-xs text-slate-400">AWS, GCP, and Azure compute resources and load balancer metrics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-800 pb-6">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Active Server Instances</span>
              <span className="text-lg font-black text-cyan-300">{exec.cloud.servers} Servers</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Load Balancers</span>
              <span className="text-lg font-black text-cyan-300">{exec.cloud.balancers} Load Balancers</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Active Providers</span>
              <span className="text-lg font-black text-emerald-400">{exec.cloud.providers.length} Providers</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-slate-400 font-bold block">Active Node Distribution:</span>
            {exec.cloud.providers.map((p, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-white font-bold block">{p.name} Compute Node ({p.region})</span>
                  <span className="text-[10px] text-slate-400 block">Instances: {p.nodes}</span>
                </div>
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-400/30 uppercase">{p.health}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ROBOTICS & IOT */}
      {activeTab === 'robotics' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Wifi className="w-5 h-5 text-cyan-400" />
                Robotics path Planning & IoT Telemetry (ROS/ROS2)
              </h3>
              <p className="text-xs text-slate-400">Kinematic joint indexes and smart IoT device sensors connections</p>
            </div>
            <span className="text-xs font-black bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full">
              ROS2 CORE: {exec.robotics.node}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Connected IoT Nodes</span>
              <span className="text-lg font-black text-cyan-300">{exec.robotics.iot_count} Sensors</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Robotic joint coordinates</span>
              <span className="text-[11px] font-black text-cyan-300 mt-1 block">{exec.robotics.kinematics.pose}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">ROS Trajectory optimization</span>
              <span className="text-lg font-black text-emerald-400">{exec.robotics.kinematics.trajectory}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INCIDENT TICKER */}
      {activeTab === 'incident' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-cyan-400" />
                Autonomous Incident Response Downtime Ticker
              </h3>
              <p className="text-xs text-slate-400">Traces auto-heals, system outages today, and db failover records</p>
            </div>
          </div>

          <div className="space-y-3">
            {exec.incident.logs.map((log) => (
              <div key={log.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center shadow">
                <div>
                  <span className="text-white font-bold block">{log.cause}</span>
                  <span className="text-[10px] text-slate-400 block">Incident ID: {log.id} • Resolution: {log.fix}</span>
                </div>
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-400/30 uppercase">{log.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SAFETY GATES */}
      {activeTab === 'safety' && (
        <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 space-y-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                Physical World Safety validation checkpoints
              </h3>
              <p className="text-xs text-slate-400">Restricts dangerous actions, robotic motions, and updates safety approvals</p>
            </div>
            <span className="text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400 px-3 py-1 rounded-full uppercase tracking-wider">
              ENVELOPE: {exec.safety.envelope}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-800 pb-6">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Danger/Accident Likelihood</span>
              <span className="text-lg font-black text-emerald-400">{exec.safety.danger}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
              <span className="text-slate-400 font-bold block">Physical Safety status</span>
              <span className="text-lg font-black text-emerald-400">{exec.safety.status} (OPTIMAL)</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-slate-400 font-bold block">Approvals Logged:</span>
            {exec.safety.approvals.map((app, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-white font-bold block">{app.action}</span>
                  <span className="text-[10px] text-slate-400 block">Approved by: {app.officer}</span>
                </div>
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-400/30 uppercase">{app.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
