'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string; role?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-violet-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform duration-300">
            G
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tight leading-none">
              GREA<span className="text-rose-500">TIX</span>
            </span>
            <span className="text-[9px] font-semibold tracking-widest text-rose-400/80 uppercase">
              Ignite Your Experience
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-slate-300 hover:text-white transition-colors">
            Jelajah Event
          </Link>

          {isAdmin && (
            <>
              <Link href="/admin" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1">
                <span>⚡</span> Admin Center
              </Link>
              <Link href="/admin/events/create" className="text-slate-300 hover:text-white transition-colors">
                + Event Baru
              </Link>
              <Link href="/admin/bookings" className="text-slate-300 hover:text-white transition-colors">
                Rekap Transaksi
              </Link>
            </>
          )}

          {user && !isAdmin && (
            <Link href="/my-bookings" className="text-slate-300 hover:text-white transition-colors">
              Pass Saya
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4 pl-6 border-l border-slate-800">
              <div className="flex flex-col text-right">
                <span className="text-slate-200 font-semibold text-xs">{user.name}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400">
                  {user.role || 'MEMBER'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-rose-400 border border-slate-800 px-4 py-2 rounded-xl transition-all duration-300 text-xs font-semibold cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-slate-300 hover:text-white transition-colors">
                Masuk
              </Link>
              <Link
                href="/register"
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold text-white rounded-xl group bg-gradient-to-br from-amber-500 via-rose-500 to-violet-600 hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-300"
              >
                <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-slate-950 rounded-[10px] group-hover:bg-opacity-0">
                  Join Gelora Pass
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}