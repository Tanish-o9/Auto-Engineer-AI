import React from 'react';

export default function FeesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <header className="mb-8 flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Fees Portal</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time fees management for School Management ERP</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-xl transition shadow-lg">
          + Create Fees
        </button>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">id</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">student_id</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">invoice_number</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">amount_due</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">amount_paid</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            <tr className="hover:bg-slate-800/30 transition">
              <td className="px-4 py-4 text-sm font-medium text-slate-200">FEES-001</td>
              <td className="px-4 py-4 text-sm text-slate-300">Active Record</td>
              <td className="px-4 py-4 text-sm text-emerald-400">ACTIVE</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
