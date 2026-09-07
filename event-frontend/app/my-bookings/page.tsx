'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';

interface Booking {
  id: number;
  booking_code: string;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string;
  ticket?: {
    name: string;
    price: number;
    event?: {
      title: string;
      location: string;
      event_date: string;
    };
  };
}

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchMyBookings = async () => {
    try {
      const res = await fetchApi('/bookings');
      setBookings(res.data || []);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat pass.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchMyBookings();
  }, [router]);

  // Simulasi Bayar (Mengubah status jadi paid/confirmed)
  const handlePay = async (id: number) => {
    setActionLoading(id);
    try {
      await fetchApi(`/bookings/${id}/pay`, { method: 'POST' });
      await fetchMyBookings(); // Refresh data setelah bayar
    } catch (err: any) {
      alert(err.message || 'Gagal melakukan simulasi pembayaran.');
    } finally {
      setActionLoading(null);
    }
  };

  // Cetak E-Pass
  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 bg-slate-950">
        Memuat Digital Pass kamu...
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Digital Pass Saya</h1>
          <p className="text-slate-400 text-sm">
            Tunjukkan pass ini di lokasi event atau cetak sebagai bukti akses masuk.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-rose-500/15 border border-rose-500/30 text-rose-400 p-4 rounded-2xl mb-6 text-sm">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 p-12 text-center rounded-3xl text-slate-400">
          <p className="mb-4">Belum ada tiket yang diklaim.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold rounded-xl text-xs hover:opacity-95 transition-all cursor-pointer"
          >
            Jelajah Event Sekarang
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const isPaid = booking.status === 'paid' || booking.status === 'confirmed';
            return (
              <div
                key={booking.id}
                id={`printable-ticket-${booking.id}`}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between md:items-center gap-6 relative overflow-hidden group hover:border-cyan-500/40 transition-all"
              >
                {/* Background Glow Effect */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all"></div>

                <div className="space-y-3 relative z-10 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-black tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase font-mono">
                      CODE: {booking.booking_code}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        isPaid
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-white">
                    {booking.ticket?.event?.title || 'Event Spesial'}
                  </h2>

                  <div className="text-sm text-slate-300 space-y-1">
                    <p>
                      Kategori Tiket:{' '}
                      <span className="font-semibold text-white">{booking.ticket?.name}</span> ({booking.quantity}x)
                    </p>
                    <p className="text-xs text-slate-400">
                      📍 Lokasi: {booking.ticket?.event?.location || 'Bogor / Jabodetabek'}
                    </p>
                    <p className="text-xs text-slate-500">
                      Waktu Transaksi: {new Date(booking.created_at).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <div className="text-left md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-slate-800 relative z-10 flex flex-col items-start md:items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Total Biaya</p>
                    <p className="text-2xl font-black text-emerald-400">
                      Rp {Number(booking.total_price).toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                    {!isPaid && (
                      <button
                        onClick={() => handlePay(booking.id)}
                        disabled={actionLoading === booking.id}
                        className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:opacity-90 text-white font-semibold rounded-xl text-xs transition-all shadow-lg shadow-rose-500/25 cursor-pointer disabled:opacity-50"
                      >
                        {actionLoading === booking.id ? 'Memproses...' : '💳 Bayar Sekarang'}
                      </button>
                    )}

                    <button
                      onClick={handlePrint}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>🖨️</span> Cetak Pass
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}