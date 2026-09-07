'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetchApi('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));

      if (res.user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-2xl p-8 rounded-3xl border border-slate-800 shadow-2xl relative z-10">
        <h1 className="text-2xl font-black text-white mb-1">Masuk ke VibePass</h1>
        <p className="text-slate-400 text-sm mb-6">Akses tiket dan event eksklusif milikmu</p>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="nama@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-300 text-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Memverifikasi...' : 'Masuk Sekarang'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Belum punya akses?{' '}
          <Link href="/register" className="text-cyan-400 font-semibold hover:underline">
            Daftar VIP Member
          </Link>
        </p>
      </div>
    </main>
  );
}