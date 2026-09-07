'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('my_tickets') || '[]');
    setTickets(savedTickets);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen relative overflow-hidden py-16 px-6 text-slate-100">
      {/* Ambient Neon Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-violet-600/20 via-indigo-600/20 to-cyan-400/20 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 no-print">
          <div>
            <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors">
              ← Kembali ke Beranda
            </Link>
            <h1 className="text-3xl font-black text-white mt-2">E-Pass & Tiket Saya</h1>
            <p className="text-slate-400 text-sm">Tunjukkan QR Code / Kode Pass ini atau cetak fisik saat memasuki lokasi event.</p>
          </div>
          {tickets.length > 0 && (
            <button
              onClick={handlePrint}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
            >
              🖨️ Cetak E-Pass (PDF)
            </button>
          )}
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800/60 backdrop-blur-xl space-y-4">
            <p className="text-slate-400 text-sm">Kamu belum memiliki tiket tersimpan.</p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium text-xs px-6 py-3 rounded-xl shadow-lg"
            >
              Jelajahi Event Sekarang
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((t, idx) => (
              <div
                key={t.id || idx}
                id={`printable-ticket-${t.id || idx}`}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between gap-6"
              >
                {/* Neon Accent Side bar */}
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-500 to-indigo-600 no-print" />

                <div className="space-y-4 flex-1 pl-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                      {t.ticketName} ({t.quantity} Tiket)
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      ID: {t.uniqueCode}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white">{t.eventTitle}</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 pt-2">
                    <div>
                      <p className="text-slate-500 mb-0.5">Lokasi</p>
                      <p className="font-semibold text-white">📍 {t.location || 'Bogor / Jabodetabek'}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-0.5">Pemegang Tiket</p>
                      <p className="font-semibold text-white">👤 {t.customerName}</p>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 text-center">
                  <div className="bg-white p-3 rounded-2xl shadow-inner mb-2">
                    <div className="w-24 h-24 bg-slate-950 flex items-center justify-center text-white font-mono text-[10px] text-center p-1 rounded-lg leading-tight">
                      [ QR CODE ]
                      <br />
                      {t.uniqueCode}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Scan at Gate</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}