'use client';

import { useEffect, useState } from 'react';

interface Booking {
  id: number;
  booking_code: string;
  total_price: number;
  quantity: number;
  status: string;
  created_at: string;
  user?: { name: string; email: string };
  ticket?: {
    name: string;
    event?: { title: string };
  };
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/admin/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setBookings(result.data); // Ambil dari result.data
      }
    } catch (error) {
      console.error('Gagal mengambil data rekap:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-slate-400">Memuat rekap transaksi...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-black text-white mb-6">Rekap Transaksi Masuk</h1>

      <div className="overflow-x-auto bg-slate-900/50 border border-slate-800 rounded-2xl">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-xs border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Kode Booking</th>
              <th className="px-6 py-4">Pembeli</th>
              <th className="px-6 py-4">Event</th>
              <th className="px-6 py-4">Tiket</th>
              <th className="px-6 py-4">Jumlah</th>
              <th className="px-6 py-4">Total Price</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {bookings.length > 0 ? (
              bookings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30">
                  <td className="px-6 py-4 font-mono font-bold text-rose-400">{item.booking_code}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{item.user?.name || 'Guest'}</div>
                    <div className="text-xs text-slate-500">{item.user?.email}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-200">{item.ticket?.event?.title || '-'}</td>
                  <td className="px-6 py-4">{item.ticket?.name || '-'}</td>
                  <td className="px-6 py-4 font-bold">{item.quantity}x</td>
                  <td className="px-6 py-4 font-semibold text-emerald-400">
                    Rp {Number(item.total_price).toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8 text-slate-500">
                  Belum ada transaksi yang masuk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}