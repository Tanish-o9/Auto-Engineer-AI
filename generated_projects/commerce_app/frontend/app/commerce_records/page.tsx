import React from 'react';

export default function Commerce_recordsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <header className="mb-8 flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Commerce records Portal</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time commerce records management for Commerce Management Platform</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-xl transition shadow-lg">
          + Create Commerce records
        </button>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">id</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">event_type</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">details_json</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">log_level</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">recorded_at</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            <tr className="hover:bg-slate-800/30 transition">
              <td className="px-4 py-4 text-sm font-medium text-slate-200">COMMERCE_RECORDS-001</td>
              <td className="px-4 py-4 text-sm text-slate-300">Active Record</td>
              <td className="px-4 py-4 text-sm text-emerald-400">ACTIVE</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
