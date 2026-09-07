# 🎟️ GREATIX — Modern Event & Festival Ticketing Platform

<div align="center">
  <p><b>Platform pemesanan tiket event & festival digital berperforma tinggi dengan antarmuka futuristik bergaya cyberpunk-glassmorphism.</b></p>
</div>

---

## 📌 Studi Kasus & Latar Belakang
**GREATIX** dikembangkan sebagai solusi modern untuk mengatasi permasalahan pada sistem ticketing konvensional yang sering kali kaku, lambat, dan kurang menarik secara visual. Platform ini dirancang untuk memberikan pengalaman pengguna (*User Experience*) yang imersif, mulai dari eksplorasi event secara real-time, pencarian instan berbasis lokasi/judul, hingga kemudahan cetak tiket digital (*E-Pass*) yang ramah perangkat cetak.

### 💡 Mengapa Proyek Ini Dibuat?
- **Kecepatan & Responsivitas:** Memanfaatkan arsitektur Next.js App Router untuk *Server-Side Rendering* (SSR) yang optimal dan transisi halaman yang instan.
- **Estetika Modern:** Mengadopsi tren desain terkini dengan *Dark Mode*, *Ambient Neon Lighting*, dan *Glassmorphism UI* agar menarik minat audiens anak muda dan pencinta festival.
- **Fungsionalitas Siap Cetak:** Menyediakan *Print Media Query* khusus agar tiket digital dapat dicetak atau disimpan ke PDF dengan rapi tanpa elemen navigasi yang mengganggu.

---

## 🛠️ Tech Stack & Tools yang Digunakan
Proyek ini dibangun menggunakan teknologi modern kelas industri:
- **Frontend Framework:** [Next.js](https://nextjs.org/) (App Router & React Server Components)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) dengan custom utility dan animasi halus.
- **Language:** TypeScript
- **Backend API & Database:** Laravel REST API (PHP & PostgreSQL via Supabase) untuk pengelolaan data event, tiket, dan transaksi.
- **Version Control:** Git & GitHub
---

## 👨‍💻 Detail Kontribusi & Apa Saja yang Dilakukan
Dalam pengembangan platform ini, serangkaian tahapan teknis telah diselesaikan secara detail:

1. **Arsitektur & Konfigurasi Dasar:**
   - Melakukan konfigurasi struktur direktori proyek Next.js dengan TypeScript.
   - Menyiapkan integrasi koneksi API backend menggunakan *fetch mechanism* yang aman dengan penanganan *error handling* (`cache: 'no-store'`).
2. **Desain Antarmuka & Styling Global (`globals.css`):**
   - Merancang tema dasar *Dark Mode* dengan latar belakang gelap elegan (`bg-slate-950`).
   - Membuat custom *Glass Scrollbar* agar estetika UI tetap konsisten saat discroll.
   - Mengimplementasikan `@media print` custom style untuk menyembunyikan elemen navigasi/footer saat fitur cetak tiket digital diaktifkan.
3. **Pengembangan Fitur Pencarian Interaktif (*Live Search*):**
   - Memisahkan komponen interaktif dengan pendekatan *Client Component* (`'use client'`).
   - Membangun logika filter data secara *real-time* berdasarkan kata kunci judul event maupun lokasi secara responsif.
4. **Optimasi Kartu Event & Layout Responsif:**
   - Menyusun *Grid Layout* yang adaptif untuk berbagai ukuran layar (Mobile, Tablet, Desktop).
   - Menambahkan efek hover interaktif, *gradient borders*, dan efek pencahayaan neon ambient dinamis di latar belakang.
5. **Pengembangan Backend & Integrasi Database (Laravel & Supabase):**
   - Membangun REST API menggunakan Laravel untuk menangani manajemen *events*, *tickets*, dan sistem *bookings*.
   - Menghubungkan dan mengonfigurasi database **PostgreSQL di Supabase** agar terhubung optimal dengan Eloquent ORM Laravel.
   - Mengimplementasikan alur pemesanan tiket yang aman dari sisi klien (`/events/[id]`) hingga penyimpanan status transaksi di database.
---

## 🚀 Live Demo
🌐 *(Akan segera diperbarui besok)* - [Link Web Versi Gratis (Vercel / Netlify)]

---

## ⚙️ Cara Menjalankan Proyek Secara Lokal

1. **Clone repository ini:**
   ```bash
   git clone <url-repository-kamu>
   cd nama-folder-project
