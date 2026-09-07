'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    fetchApi(`/events/${resolvedParams.id}`)
      .then((res) => {
        const eventData = res.data || res;
        setEvent(eventData);
        if (eventData?.tickets?.length > 0) {
          setSelectedTicket(eventData.tickets[0].id);
        }
      })
      .catch((err) => setError(err.message || 'Gagal memuat detail event.'));
  }, [resolvedParams.id]);

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    if (!selectedTicket) return;

    setLoading(true);
    setError('');

    try {
      await fetchApi('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          ticket_id: selectedTicket,
          quantity: quantity,
          status: 'paid',
        }),
      });

      setSuccessModal(true);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat memproses pemesanan.');
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Memuat detail event...
      </div>
    );
  }

  const activeTicketObj = event.tickets?.find((t: any) => t.id === selectedTicket);

  return (
    <main className="min-h-screen relative overflow-hidden py-12 px-6 text-slate-100">
      {/* Ambient Neon Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-violet-600/15 via-indigo-600/15 to-cyan-400/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors">
          ← Kembali ke Beranda
        </Link>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Sisi Kiri: Banner & Deskripsi */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src={event.banner_image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000'}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-cyan-300">
                  📍 {event.location}
                </span>
                <span className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 text-cyan-300">
                  📅 {event.event_date ? new Date(event.event_date).toLocaleDateString('id-ID', { dateStyle: 'full' }) : '-'}
                </span>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 space-y-6">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">{event.title}</h1>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-2">Tentang Event</h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">{event.description}</p>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Pilihan Kategori Pass */}
          <div className="space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl sticky top-6 space-y-6">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-4">
                Pilih Kategori Pass
              </h2>

              <div className="space-y-3">
                {event.tickets?.map((ticket: any) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      selectedTicket === ticket.id
                        ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                        : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white text-sm">{ticket.name}</h3>
                        <p className="text-xs text-slate-400 mt-1">Stok Kuota: {ticket.available_quantity}</p>
                      </div>
                      <span className="font-extrabold text-cyan-400 text-sm">
                        Rp {Number(ticket.price).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Jumlah Tiket
                </label>
                <input
                  type="number"
                  min="1"
                  max={activeTicketObj?.available_quantity || 1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Total Biaya</p>
                  <p className="text-xl font-black text-white">
                    Rp {activeTicketObj ? (activeTicketObj.price * quantity).toLocaleString('id-ID') : 0}
                  </p>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={loading || !activeTicketObj || activeTicketObj.available_quantity < 1}
                className="w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-90 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 text-sm transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Memproses...' : 'Klaim Pass Sekarang'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Sukses */}
      {successModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl text-center">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-2xl font-bold">
              ✓
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">Pendaftaran Pass Berhasil!</h3>
              <p className="text-xs text-slate-400">Tiket Anda telah terbit dan tersimpan di akun.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/my-bookings')}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs py-3 rounded-xl transition-all"
              >
                Lihat Tiket Saya
              </button>
              <button
                onClick={() => {
                  setSuccessModal(false);
                  router.push('/');
                }}
                className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-xs py-3 rounded-xl transition-all"
              >
                Ke Beranda
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}