<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    // 1. Get Riwayat Pemesanan User yang Sedang Login
    public function index(Request $request)
    {
        $bookings = Booking::with(['ticket.event', 'user'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar Riwayat Pemesanan',
            'data'    => $bookings
        ], 200);
    }

    // 2. Buat Pemesanan Tiket Baru (Booking)
    public function store(Request $request)
    {
        $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
            'quantity'  => 'required|integer|min:1',
        ]);

        try {
            // Menggunakan DB Transaction agar stok terpotong & booking tersimpan secara atomic
            $booking = DB::transaction(function () use ($request) {
                // Lock row ticket untuk mencegah race condition (rebutan stok)
                $ticket = Ticket::lockForUpdate()->findOrFail($request->ticket_id);

                // Cek ketersediaan stok
                if ($ticket->available_quantity < $request->quantity) {
                    throw new \Exception('Stok tiket tidak mencukupi.');
                }

                // Kurangi stok tiket
                $ticket->decrement('available_quantity', $request->quantity);

                // Hitung total harga
                $totalPrice = $ticket->price * $request->quantity;

                // Buat record booking
                return Booking::create([
                    'booking_code' => 'BOOK-' . strtoupper(Str::random(8)),
                    'user_id'      => $request->user()->id,
                    'ticket_id'    => $ticket->id,
                    'quantity'     => $request->quantity,
                    'total_price'  => $totalPrice,
                    'status'       => 'confirmed', // atau 'pending' jika ada integrasi payment gateway
                ]);
            });

            // Load relasi ticket dan event untuk respon JSON
            $booking->load(['ticket.event', 'user']);

            return response()->json([
                'success' => true,
                'message' => 'Pemesanan tiket berhasil!',
                'data'    => $booking
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    // 3. Detail Pemesanan Tiket Spasifik
    public function show(Request $request, Booking $booking)
    {
        // Memastikan user hanya bisa melihat pemesanannya sendiri
        if ($booking->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki akses ke data pemesanan ini.'
            ], 403);
        }

        $booking->load(['ticket.event', 'user']);

        return response()->json([
            'success' => true,
            'message' => 'Detail Pemesanan',
            'data'    => $booking
        ], 200);
    }

    // 4. Get SELURUH Riwayat Pemesanan (Khusus Admin/Rekap)
    public function allBookings()
    {
        $bookings = Booking::with(['ticket.event', 'user'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar Seluruh Transaksi Admin',
            'data'    => $bookings
        ], 200);
    }

    public function pay(Request $request, Booking $booking)
{
    if ($booking->user_id !== $request->user()->id) {
        return response()->json(['success' => false, 'message' => 'Akses ditolak.'], 403);
    }

    $booking->update(['status' => 'paid']);

    return response()->json([
        'success' => true,
        'message' => 'Pembayaran berhasil disimulasikan!',
        'data'    => $booking
    ]);
}
}

