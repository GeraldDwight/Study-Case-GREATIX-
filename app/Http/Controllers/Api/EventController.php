<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EventController extends Controller
{
    // Get Semua Event
    public function index()
    {
        $events = Event::with(['organizer', 'tickets'])->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'List Data Event',
            'data'    => $events
        ], 200);
    }

    // Tambah Event Baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'description'  => 'required|string',
            'location'     => 'required|string',
            'event_date'   => 'required|date',
            'banner_image' => 'nullable|string',
            'organizer_id' => 'required|exists:users,id',
        ]);

        $validated['slug'] = Str::slug($request->title) . '-' . Str::random(5);

        $event = Event::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Event Berhasil Ditambahkan',
            'data'    => $event
        ], 201);
    }

    // Detail Event (Menggunakan Route Model Binding)
    public function show(Event $event)
    {
        $event->load(['organizer', 'tickets']);

        return response()->json([
            'success' => true,
            'message' => 'Detail Data Event',
            'data'    => $event
        ], 200);
    }

    // Update Event (Menggunakan Route Model Binding)
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title'        => 'sometimes|required|string|max:255',
            'description'  => 'sometimes|required|string',
            'location'     => 'sometimes|required|string',
            'event_date'   => 'sometimes|required|date',
            'banner_image' => 'nullable|string',
        ]);

        if ($request->has('title')) {
            $validated['slug'] = Str::slug($request->title) . '-' . Str::random(5);
        }

        $event->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Event Berhasil Diperbarui',
            'data'    => $event
        ], 200);
    }

    // Hapus Event (Menggunakan Route Model Binding)
    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event Berhasil Dihapus'
        ], 200);
    }
}