import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VibePass — Get Access to the Coolest Events',
  description: 'Platform eksklusif pemesanan tiket konser, festival, dan acara paling bergengsi.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${jakarta.className} bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-cyan-500 selection:text-black`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}