'use client';
import React, { useState } from 'react';
import { Sparkles, Mail, Lock, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

export const LoginScreen = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Input Validation
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    // Simulate Network Latency
    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      if (cleanEmail === 'admin@autoengineer.ai' && cleanPassword === 'admin123') {
        localStorage.setItem('autoengineer_auth', 'true');
        onLoginSuccess();
      } else {
        setErrorMessage('Invalid credentials. Use admin@autoengineer.ai and admin123.');
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 font-mono relative overflow-hidden px-4">
      {/* Dynamic Background Glowing Circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 3D Glassmorphic Form Card */}
      <div className="glass-panel-3d relative w-full max-w-md bg-slate-900/80 border-2 border-slate-700/60 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-6 z-10 transition hover:border-slate-600 duration-300">
        
        {/* Glow Top Border Bar */}
        <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

        {/* Brand Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-2xl blur opacity-70 animate-neon-glow" />
            <div className="relative bg-slate-950 p-3.5 rounded-2xl border border-cyan-400/50 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-cyan-300 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">AutoEngineer AI</h2>
            <p className="text-[10px] text-cyan-400 font-bold uppercase mt-1 tracking-widest">Ultimate Autonomous OS Gate</p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          
          {/* Email input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="admin@autoengineer.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full bg-slate-950/80 border-2 border-slate-800 text-xs text-white pl-11 pr-4 py-3.5 rounded-xl outline-none transition focus:border-cyan-500/80 placeholder-slate-600 font-bold"
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Security Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full bg-slate-950/80 border-2 border-slate-800 text-xs text-white pl-11 pr-4 py-3.5 rounded-xl outline-none transition focus:border-cyan-500/80 placeholder-slate-600 font-bold"
              />
            </div>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-bold p-3 rounded-xl flex items-start gap-2 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-black text-xs py-4 rounded-xl shadow-lg transition duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Synchronizing Session...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Initialize Platform Session</span>
              </>
            )}
          </button>

        </form>

        {/* Demo Credentials Disclaimer Info */}
        <div 
          onClick={() => {
            setEmail('admin@autoengineer.ai');
            setPassword('admin123');
          }}
          className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 text-[10px] text-slate-400 text-center w-full leading-relaxed cursor-pointer hover:border-cyan-500/50 hover:bg-slate-900/50 transition duration-200"
        >
          <strong className="text-slate-300 block mb-0.5">🔑 Demo Security Credentials:</strong>
          Email: <code className="text-cyan-300">admin@autoengineer.ai</code> | Password: <code className="text-cyan-300">admin123</code>
          <span className="block text-[8px] text-slate-500 mt-1">(Click to autofill)</span>
        </div>

      </div>
    </div>
  );
};
