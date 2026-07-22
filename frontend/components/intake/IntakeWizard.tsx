'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Sliders, AlertCircle, Cpu, Database, FolderCheck, ShieldCheck, Terminal, Layers, RefreshCw, CheckCircle2, Zap, Server, History, Clock, BookOpen, ExternalLink, X } from 'lucide-react';

interface HistoryItem {
  id: str;
  title: str;
  domain: str;
  prompt: str;
  timestamp: str;
  filesCount: number;
  scale: str;
}

export const IntakeWizard = ({ 
  onComplete, 
  showHistoryModal, 
  setShowHistoryModal 
}: { 
  onComplete: (data: any) => void;
  showHistoryModal?: boolean;
  setShowHistoryModal?: (show: boolean) => void;
}) => {
  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [scale, setScale] = useState('Medium (10k-100k DAU)');
  const [budget, setBudget] = useState('Standard ($500-$2000/mo)');
  const [deployment, setDeployment] = useState('AWS EKS / Containerized');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initial Pre-loaded History Items
  const defaultHistory: HistoryItem[] = [
    {
      id: 'hist-1',
      title: 'School Management ERP Platform',
      domain: 'School',
      prompt: 'Build a comprehensive School Management System with Student attendance, Teacher schedules, Exams & Gradebooks, Fee collection, and Parent notification portal.',
      timestamp: '2026-07-21 17:15',
      filesCount: 25,
      scale: 'Medium (10k-100k DAU)'
    },
    {
      id: 'hist-2',
      title: 'Enterprise Hospital EHR & Pharmacy',
      domain: 'Hospital',
      prompt: 'Build an Enterprise Hospital Management ERP with Patient registration, Doctor appointments, ICU bed allocation, Electronic Health Records, and Pharmacy inventory.',
      timestamp: '2026-07-21 17:25',
      filesCount: 25,
      scale: 'Enterprise (1M+ DAU)'
    },
    {
      id: 'hist-3',
      title: 'Gym & Fitness Member Portal',
      domain: 'Gym',
      prompt: 'Build a Gym & Fitness Management platform with Member subscriptions, Trainer workout scheduling, Locker management, QR Check-ins, and Payment processing.',
      timestamp: '2026-07-21 17:35',
      filesCount: 29,
      scale: 'Medium (10k-100k DAU)'
    },
    {
      id: 'hist-4',
      title: 'Commerce E-Business Platform',
      domain: 'E-Commerce',
      prompt: 'Build an E-Commerce Management Platform with Product catalog, Customer shopping carts, Stripe payments, Inventory tracking, and Order fulfillment.',
      timestamp: '2026-07-21 17:45',
      filesCount: 26,
      scale: 'Enterprise (1M+ DAU)'
    }
  ];

  const [historyList, setHistoryList] = useState<HistoryItem[]>(defaultHistory);

  // Load persistent history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('autoengineer_idea_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHistoryList(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading history from localStorage:', e);
    }
  }, []);

  const saveHistoryItem = (newPrompt: str) => {
    const domainMatch = newPrompt.match(/(School|Hospital|Gym|Food|Commerce|AI|Finance|CRM)/i);
    const domain = domainMatch ? domainMatch[0] : 'General';
    const title = `${domain.toUpperCase()} Application Platform`;

    const newItem: HistoryItem = {
      id: `hist-${Date.now()}`,
      title: title,
      domain: domain,
      prompt: newPrompt,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      filesCount: 25,
      scale: scale
    };

    const updated = [newItem, ...historyList];
    setHistoryList(updated);
    try {
      localStorage.setItem('autoengineer_idea_history', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving history to localStorage:', e);
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setPrompt(item.prompt);
    setScale(item.scale || 'Medium (10k-100k DAU)');
    setStep(1);
    if (setShowHistoryModal) setShowHistoryModal(false);
  };

  const quickPresets = [
    { label: '🏫 School Management System', prompt: 'Build a comprehensive School Management System with Student attendance, Teacher schedules, Exams & Gradebooks, Fee collection, and Parent notification portal.' },
    { label: '🏥 Hospital EHR & Pharmacy', prompt: 'Build an Enterprise Hospital Management ERP with Patient registration, Doctor appointments, ICU bed allocation, Electronic Health Records, and Pharmacy inventory.' },
    { label: '🏋️ Gym & Fitness Portal', prompt: 'Build a Gym & Fitness Management platform with Member subscriptions, Trainer workout scheduling, Locker management, QR Check-ins, and Payment processing.' },
    { label: '🍔 Food Delivery Platform', prompt: 'Build a multi-vendor Food Delivery Application with Restaurant dashboards, Rider GPS routing, Customer cart checkout, and Real-time order status tracking.' },
  ];

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
      setErrorMessage('');
    } else {
      setIsSubmitting(true);
      setErrorMessage('');

      saveHistoryItem(prompt || 'Build a full-stack web application platform');

      try {
        const response = await fetch('http://localhost:8001/api/v1/agents/intake', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Service-Token': 'dev-service-secret',
          },
          body: JSON.stringify({
            idea_id: `idea-${Date.now()}`,
            prompt: prompt || 'Build a full-stack web application platform',
            target_scale: scale,
          }),
        });

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const data = await response.json();
        setIsSubmitting(false);
        onComplete(data.workflow_result);
      } catch (err: any) {
        console.error('Workflow API Error:', err);
        setIsSubmitting(false);
        setErrorMessage('Could not connect to FastAPI AI Service. Ensure http://localhost:8001 is active.');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-16">
      
      {/* ======================================================== */}
      {/* HISTORY MODAL / DRAWER (WHEN TRIGGERED FROM NAVBAR)      */}
      {/* ======================================================== */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
            <div className="p-6 border-b border-slate-700 bg-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <History className="w-6 h-6 text-amber-300" />
                <h3 className="text-xl font-black text-white">Idea History & Generated Blueprints</h3>
                <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-400">
                  {historyList.length} Saved
                </span>
              </div>
              <button 
                onClick={() => setShowHistoryModal && setShowHistoryModal(false)}
                className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-xl border border-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 divide-y divide-slate-800">
              {historyList.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 hover:border-amber-400 transition">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/50 px-2.5 py-0.5 rounded-md">
                        {item.domain}
                      </span>
                      <h4 className="text-base font-black text-white">{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-200 font-bold line-clamp-2 leading-relaxed">{item.prompt}</p>
                    <div className="flex items-center gap-4 text-[11px] font-bold text-slate-300">
                      <span className="flex items-center gap-1 text-cyan-300">
                        <FolderCheck className="w-3.5 h-3.5" />
                        {item.filesCount} Files Generated on Disk
                      </span>
                      <span>🕒 {item.timestamp}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectHistoryItem(item)}
                    className="shrink-0 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-black text-xs px-5 py-3 rounded-xl transition duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Load Idea Prompt</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MAIN 3D WIZARD HERO CONTAINER                           */}
      {/* ======================================================== */}
      <div>
        <div className="glass-panel-3d p-8 md:p-10 rounded-3xl border-2 border-slate-700 bg-slate-900 shadow-2xl relative overflow-hidden">
          
          {/* Glowing Ambient Backdrop Spheres */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

          {/* 3D Header Step Navigation */}
          <div className="flex items-center justify-between mb-10 bg-slate-950 p-4 rounded-2xl border-2 border-slate-700 shadow-inner">
            <div className={`flex items-center gap-3 ${step >= 1 ? 'text-cyan-300 font-black' : 'text-white font-bold'}`}>
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-300 ${
                step >= 1 ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/50' : 'bg-slate-800 text-white border-2 border-slate-500'
              }`}>1</span>
              <span className="text-base font-bold text-white">Describe Idea</span>
            </div>
            <div className="w-12 h-1 bg-slate-600 hidden md:block" />
            <div className={`flex items-center gap-3 ${step >= 2 ? 'text-cyan-300 font-black' : 'text-white font-bold'}`}>
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-300 ${
                step >= 2 ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/50' : 'bg-slate-800 text-white border-2 border-slate-500'
              }`}>2</span>
              <span className="text-base font-bold text-white">Scale & Constraints</span>
            </div>
            <div className="w-12 h-1 bg-slate-600 hidden md:block" />
            <div className={`flex items-center gap-3 ${step >= 3 ? 'text-cyan-300 font-black' : 'text-white font-bold'}`}>
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-300 ${
                step >= 3 ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/50' : 'bg-slate-800 text-white border-2 border-slate-500'
              }`}>3</span>
              <span className="text-base font-bold text-white">PM Clarifications</span>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-900 border-2 border-red-500 text-white rounded-2xl text-sm flex items-center gap-3 shadow-lg font-bold">
              <AlertCircle className="w-6 h-6 text-red-300 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Describe Business Idea */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-500/30 border-2 border-cyan-400 rounded-2xl text-cyan-300 shadow-lg">
                    <Sparkles className="w-7 h-7 animate-spin text-cyan-300" style={{ animationDuration: '8s' }} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Describe Your Business Idea</h2>
                    <p className="text-base text-slate-100 font-bold mt-1">AutoEngineer's 11 LangGraph AI Agents will convert your prompt into a complete production project on disk.</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowHistoryModal && setShowHistoryModal(true)}
                  className="hidden md:flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-2 border-amber-400 px-4 py-2 rounded-xl text-xs font-black transition shadow-md cursor-pointer"
                >
                  <History className="w-4 h-4 text-amber-300" />
                  <span>View Idea History ({historyList.length})</span>
                </button>
              </div>

              {/* Quick Presets */}
              <div className="space-y-2.5">
                <span className="text-xs font-black text-amber-300 uppercase tracking-widest block">Quick Presets:</span>
                <div className="flex flex-wrap gap-2.5">
                  {quickPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPrompt(preset.prompt)}
                      className="text-xs font-bold bg-slate-950 hover:bg-slate-800 text-white hover:text-cyan-300 border-2 border-slate-600 hover:border-cyan-400 px-4 py-2.5 rounded-xl transition duration-200 cursor-pointer flex items-center gap-2 shadow-lg"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={5}
                  className="w-full bg-slate-950 border-2 border-slate-600 rounded-2xl p-4 text-base text-white font-bold focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition duration-300 placeholder:text-slate-300 shadow-inner"
                  placeholder="Describe your software system (e.g., Build a School ERP System with Students, Teachers, Exams, Fees, Attendance, and Parent Portal)..."
                />
              </div>
            </div>
          )}

          {/* STEP 2: Scale & Constraints */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-500/30 border-2 border-indigo-400 rounded-2xl text-indigo-300 shadow-lg">
                  <Sliders className="w-7 h-7 text-indigo-300" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Target Scale & Infrastructure Constraints</h2>
                  <p className="text-base text-slate-100 font-bold mt-1">Constrain the Solution Architect, Database Engineer, and DevOps agents.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-700">
                  <label className="text-xs font-black text-cyan-300 block mb-2">Target Active Users</label>
                  <select
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    className="w-full bg-slate-900 border-2 border-slate-600 rounded-xl p-3 text-sm text-white font-bold outline-none focus:border-cyan-400"
                  >
                    <option>Startup (&lt;10k DAU)</option>
                    <option>Medium (10k-100k DAU)</option>
                    <option>Enterprise (1M+ DAU)</option>
                  </select>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-700">
                  <label className="text-xs font-black text-cyan-300 block mb-2">Monthly Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-slate-900 border-2 border-slate-600 rounded-xl p-3 text-sm text-white font-bold outline-none focus:border-cyan-400"
                  >
                    <option>Bootstrap (&lt;$200/mo)</option>
                    <option>Standard ($500-$2000/mo)</option>
                    <option>Enterprise ($5000+/mo)</option>
                  </select>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-700">
                  <label className="text-xs font-black text-cyan-300 block mb-2">Deployment Target</label>
                  <select
                    value={deployment}
                    onChange={(e) => setDeployment(e.target.value)}
                    className="w-full bg-slate-900 border-2 border-slate-600 rounded-xl p-3 text-sm text-white font-bold outline-none focus:border-cyan-400"
                  >
                    <option>AWS EKS / Containerized</option>
                    <option>Vercel + Supabase</option>
                    <option>On-Premises Kubernetes</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PM Clarification Questions */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/30 border-2 border-purple-400 rounded-2xl text-purple-300 shadow-lg">
                  <Cpu className="w-7 h-7 text-purple-300" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Product Manager Agent — Architectural Alignment</h2>
                  <p className="text-base text-slate-100 font-bold mt-1">PM Agent verified business requirements before graph execution.</p>
                </div>
              </div>

              <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border-2 border-slate-700">
                <div>
                  <p className="text-sm font-black text-cyan-300 mb-2">Q1: Should record mutations enforce soft-delete compliance auditing?</p>
                  <input
                    type="text"
                    defaultValue="Yes, soft-delete with timestamp audit log."
                    className="w-full bg-slate-900 border-2 border-slate-600 rounded-xl p-3 text-sm text-white font-bold outline-none"
                  />
                </div>

                <div>
                  <p className="text-sm font-black text-cyan-300 mb-2">Q2: Should physical code files be written directly under generated_projects/?</p>
                  <input
                    type="text"
                    defaultValue="Yes, 25+ files (Backend models, routers, Next.js pages, SQL schema, Docker)."
                    className="w-full bg-slate-900 border-2 border-slate-600 rounded-xl p-3 text-sm text-white font-bold outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-3 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 text-black font-black text-base px-10 py-4 rounded-2xl transition duration-300 shadow-2xl shadow-cyan-400/50 cursor-pointer border-2 border-white"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-3 text-black">
                  <RefreshCw className="w-6 h-6 animate-spin text-black" />
                  Executing 11 LangGraph Agents...
                </span>
              ) : (
                <>
                  <span>{step === 3 ? 'Execute 7-Phase Core Engine' : 'Continue'}</span>
                  <ArrowRight className="w-6 h-6 text-black stroke-[3]" />
                </>
              )}
            </button>
          </div>

        </div>
      </div>


      {/* ======================================================== */}
      {/* PREVIOUS IDEA HISTORY INLINE GRID                        */}
      {/* ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 border-2 border-amber-400 rounded-xl text-amber-300 shadow-md">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Previous Idea History & Generated Blueprints</h3>
              <p className="text-sm text-slate-100 font-bold">Select any previously generated idea to reload its prompt and blueprint.</p>
            </div>
          </div>
          <span className="text-xs bg-amber-500/20 text-amber-300 font-black border-2 border-amber-400 px-3 py-1 rounded-full shadow-sm">
            {historyList.length} Ideas Saved
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {historyList.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleSelectHistoryItem(item)}
              className="glass-panel-3d bg-slate-900 p-6 rounded-2xl border-2 border-slate-700 hover:border-amber-400 transition cursor-pointer space-y-3 group shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/50 px-2.5 py-0.5 rounded-md">
                  {item.domain}
                </span>
                <span className="text-[11px] font-bold text-slate-300">🕒 {item.timestamp}</span>
              </div>

              <h4 className="text-lg font-black text-white group-hover:text-amber-300 transition">{item.title}</h4>
              <p className="text-xs text-slate-100 font-bold line-clamp-2 leading-relaxed">{item.prompt}</p>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs font-bold">
                <span className="text-cyan-300 flex items-center gap-1">
                  <FolderCheck className="w-4 h-4" />
                  {item.filesCount} Files on Disk
                </span>
                <span className="text-amber-300 group-hover:translate-x-1 transition flex items-center gap-1 font-black">
                  Load Prompt ➔
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ======================================================== */}
      {/* ABOUT AUTOENGINEER AI SECTION (MAX CONTRAST INFORMATIVE) */}
      {/* ======================================================== */}
      <section className="space-y-12 pt-8 border-t-2 border-slate-800">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-cyan-300 bg-cyan-500/30 border-2 border-cyan-400 px-4 py-1.5 rounded-full inline-block shadow-md">
            ⚡ Platform Intelligence
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            About AutoEngineer AI Engine
          </h2>
          <p className="text-base text-slate-100 font-bold leading-relaxed">
            AutoEngineer AI is an autonomous, production-grade multi-agent software engineering engine powered by LangGraph, FastAPI, Next.js 14, and PostgreSQL vector memory. It converts natural language prompts into complete, working, production-ready codebases on disk.
          </p>
        </div>

        {/* 4 Core Capability Cards (High Contrast 3D) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="glass-panel-3d bg-slate-900 p-6 rounded-2xl border-2 border-slate-700 space-y-4 hover:border-cyan-400 transition group shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/30 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition duration-300 shadow-md">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition">11 Autonomous AI Agents</h3>
            <p className="text-sm text-slate-100 leading-relaxed font-semibold">
              LangGraph orchestrates Supervisor Router, Planner, Solution Architect, Backend, Frontend, DB, Security, Code Reviewer, QA, DevOps & Documentation agents in parallel.
            </p>
          </div>

          <div className="glass-panel-3d bg-slate-900 p-6 rounded-2xl border-2 border-slate-700 space-y-4 hover:border-indigo-400 transition group shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/30 border-2 border-indigo-400 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition duration-300 shadow-md">
              <FolderCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white group-hover:text-indigo-300 transition">Physical Code Writer on Disk</h3>
            <p className="text-sm text-slate-100 leading-relaxed font-semibold">
              Generates 25+ real source code files directly under <code className="text-cyan-300 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-600">generated_projects/</code> (FastAPI routers, Next.js pages, SQL schema, Docker, CI/CD).
            </p>
          </div>

          <div className="glass-panel-3d bg-slate-900 p-6 rounded-2xl border-2 border-slate-700 space-y-4 hover:border-purple-400 transition group shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-purple-500/30 border-2 border-purple-400 flex items-center justify-center text-purple-300 group-hover:scale-110 transition duration-300 shadow-md">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white group-hover:text-purple-300 transition">Persistent Memory & pgvector</h3>
            <p className="text-sm text-slate-100 leading-relaxed font-semibold">
              Maintains Short-Term and Long-Term memory across application restarts with PostgreSQL vector search and disk JSON fallback.
            </p>
          </div>

          <div className="glass-panel-3d bg-slate-900 p-6 rounded-2xl border-2 border-slate-700 space-y-4 hover:border-emerald-400 transition group shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition duration-300 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition">AI Debugger & 6-D Code Review</h3>
            <p className="text-sm text-slate-100 leading-relaxed font-semibold">
              Parses stack traces, finds root cause line numbers, generates diff fixes, and evaluates code across Security, Performance, Scalability, and Clean Code standards.
            </p>
          </div>

        </div>

        {/* 7-Phase Execution Engine Timeline Grid */}
        <div className="glass-panel-3d bg-slate-900 p-8 rounded-3xl border-2 border-slate-700 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <Zap className="w-7 h-7 text-cyan-300" />
            <h3 className="text-2xl font-black text-white">The 7-Phase Core Implementation Lifecycle</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 text-center">
            {[
              { num: '01', title: 'Requirements', desc: 'Infers roles, APIs & DB models' },
              { num: '02', title: 'Architecture', desc: 'System topology & tech stack' },
              { num: '03', title: 'Manifest', desc: 'Maps every required file' },
              { num: '04', title: 'Code Gen', desc: 'Zero TODOs, 100% logic' },
              { num: '05', title: 'Integration', desc: 'Hooks APIs, DB & env files' },
              { num: '06', title: 'Validation', desc: 'Scans & repairs broken code' },
              { num: '07', title: 'Build Verify', desc: 'Compiles & verifies 0 errors' },
            ].map((p, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-700 space-y-2 hover:border-cyan-400 transition shadow-md">
                <span className="text-xs font-black text-cyan-300 bg-cyan-500/30 px-2 py-0.5 rounded border border-cyan-400">{p.num}</span>
                <h4 className="text-xs font-extrabold text-white">{p.title}</h4>
                <p className="text-[10px] text-slate-200 font-bold leading-tight">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono font-black text-white">
          <span className="px-4 py-2 rounded-full bg-slate-950 border-2 border-slate-700 text-cyan-300 shadow-md">⚛️ Next.js 14 App Router</span>
          <span className="px-4 py-2 rounded-full bg-slate-950 border-2 border-slate-700 text-indigo-300 shadow-md">⚡ FastAPI Python 3.11</span>
          <span className="px-4 py-2 rounded-full bg-slate-950 border-2 border-slate-700 text-purple-300 shadow-md">🦜 LangGraph Multi-Agent</span>
          <span className="px-4 py-2 rounded-full bg-slate-950 border-2 border-slate-700 text-emerald-300 shadow-md">🐘 PostgreSQL + pgvector</span>
          <span className="px-4 py-2 rounded-full bg-slate-950 border-2 border-slate-700 text-rose-300 shadow-md">🔴 Redis Cache</span>
          <span className="px-4 py-2 rounded-full bg-slate-950 border-2 border-slate-700 text-amber-300 shadow-md">🐳 Docker Multi-Stage</span>
        </div>

      </section>

    </div>
  );
};
