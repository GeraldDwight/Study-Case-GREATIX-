'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    event_date: '',
    banner_image: '',
    ticket_name: 'VIP Pass',
    ticket_price: '150000',
    ticket_stock: '100',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const eventRes = await fetchApi('/events', {
        method: 'POST',
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          location: form.location,
          event_date: form.event_date,
          banner_image: form.banner_image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000',
        }),
      });

      const eventId = eventRes.data.id;

      await fetchApi(`/events/${eventId}/tickets`, {
        method: 'POST',
        body: JSON.stringify({
          name: form.ticket_name,
          price: Number(form.ticket_price),
          available_quantity: Number(form.ticket_stock),
        }),
      });

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <div className="bg-slate-900/60 backdrop-blur-2xl p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <h1 className="text-2xl font-black text-white mb-2">Terbitkan Event Baru</h1>
        <p className="text-slate-400 text-sm mb-8">Isi detail informasi acara dan kembangkan kategori tiketnya.</p>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-xs mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-2">
              1. Detail Acara Utama
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nama Event / Konser</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                placeholder="Contoh: Soundwave Music Fest 2026"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Lokasi Arena</label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Stadion Gelora Bung Karno, Jakarta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tanggal & Waktu</label>
                <input
                  type="datetime-local"
                  required
                  value={form.event_date}
                  onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">URL Gambar Banner</label>
              <input
                type="url"
                value={form.banner_image}
                onChange={(e) => setForm({ ...form, banner_image: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                placeholder="https://images.unsplash.com/... (Opsional)"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Deskripsi Event</label>
              <textarea
                rows={4}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                placeholder="Jelaskan detail jalannya acara..."
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-2">
              2. Kategori Pass Bawaan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nama Tiket</label>
                <input
                  type="text"
                  required
                  value={form.ticket_name}
                  onChange={(e) => setForm({ ...form, ticket_name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  placeholder="VIP Pass / Early Bird"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Harga (Rp)</label>
                <input
                  type="number"
                  required
                  value={form.ticket_price}
                  onChange={(e) => setForm({ ...form, ticket_price: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  placeholder="150000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Stok Kuota</label>
                <input
                  type="number"
                  required
                  value={form.ticket_stock}
                  onChange={(e) => setForm({ ...form, ticket_stock: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  placeholder="100"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-90 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-300 text-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Menyimpan Event...' : 'Publikasikan Event Sekarang'}
          </button>
        </form>
      </div>
    </main>
  );
}