'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ events: 0, bookings: 0 });

  useEffect(() => {
    // UBAH '/bookings' MENJADI '/admin/bookings'
    Promise.all([fetchApi('/events'), fetchApi('/admin/bookings')])
      .then(([eventsRes, bookingsRes]) => {
        setStats({
          events: eventsRes.data?.length || 0,
          bookings: bookingsRes.data?.length || 0,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <main className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-white">Admin Control Center</h1>
          <p className="text-slate-400 text-sm mt-1">
            Kelola publikasi event, penentuan tiket, dan pantau rekap transaksi.
          </p>
        </div>

        <Link
          href="/admin/events/create"
          className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg shadow-indigo-600/25 text-sm hover:opacity-90 transition-all duration-300"
        >
          + Terbitkan Event Baru
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Total Event Aktif
          </p>
          <p className="text-4xl font-black text-white">{stats.events}</p>
          <Link href="/" className="inline-block mt-4 text-xs font-semibold text-cyan-400 hover:underline">
            Lihat Katalog Publik →
          </Link>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Total Transaksi Masuk
          </p>
          <p className="text-4xl font-black text-emerald-400">{stats.bookings}</p>
          <Link href="/admin/bookings" className="inline-block mt-4 text-xs font-semibold text-cyan-400 hover:underline">
            Buka Rekap Transaksi →
          </Link>
        </div>
      </div>
    </main>
  );
}