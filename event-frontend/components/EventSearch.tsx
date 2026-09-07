'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Ticket {
  id: number;
  name: string;
  price: string;
  available_quantity: number;
}

interface EventItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  event_date: string;
  banner_image: string;
  tickets: Ticket[];
}

export default function EventSearch({ initialEvents }: { initialEvents: EventItem[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Logika live search berdasarkan judul atau lokasi
  const filteredEvents = initialEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Input Pencarian */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
            🔍
          </span>
          <input
            type="text"
            placeholder="Cari nama event atau lokasi (contoh: Jakarta, Konser)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl pl-11 pr-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm shadow-xl"
          />
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800/60 backdrop-blur-xl max-w-xl mx-auto">
          <p className="text-slate-400">Tidak ada event yang cocok dengan pencarianmu.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800/80 overflow-hidden hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.banner_image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000'}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-slate-300">
                    📍 {event.location}
                  </span>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {event.title}
                  </h2>
                  <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed mb-4">
                    {event.description}
                  </p>
                  <p className="text-xs text-cyan-400 font-medium">
                    📅 {new Date(event.event_date).toLocaleDateString('id-ID', { dateStyle: 'full' })}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-800/50 mt-auto flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mt-4">
                  {event.tickets?.length || 0} Opsi Tiket
                </span>
                <Link
                  href={`/events/${event.id}`}
                  className="mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300"
                >
                  Get Pass →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}