import React from 'react';

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <header className="mb-8 flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Bookings Portal</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time bookings management for Gym & Fitness Management System</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-xl transition shadow-lg">
          + Create Bookings
        </button>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">id</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">booking_reference</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">scheduled_time</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">slot_number</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">booking_status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            <tr className="hover:bg-slate-800/30 transition">
              <td className="px-4 py-4 text-sm font-medium text-slate-200">BOOKINGS-001</td>
              <td className="px-4 py-4 text-sm text-slate-300">Active Record</td>
              <td className="px-4 py-4 text-sm text-emerald-400">ACTIVE</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
