<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Akun Admin
        $admin = User::create([
            'name'     => 'Admin GREA',
            'email'    => 'admin@greatix.com',
            'password' => Hash::make('password123'),
            'role'     => 'admin',
        ]);

        // 2. Akun Customer
        $customer = User::create([
            'name'     => 'Budi Customer',
            'email'    => 'customer@greatix.com',
            'password' => Hash::make('password123'),
            'role'     => 'user',
        ]);

        // 3. List Data 15 Event
        $eventsData = [
            [
                'title'        => 'Tech Conference Bogor 2026',
                'slug'         => Str::slug('Tech Conference Bogor 2026') . '-demo1',
                'description'  => 'Konferensi teknologi terbesar untuk developer dan pegiat IT di Bogor.',
                'location'     => 'IPB International Convention Center, Bogor',
                'event_date'   => now()->addDays(14),
                'banner_image' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
                'tickets'      => [
                    ['name' => 'Early Bird Pass', 'price' => 150000, 'quantity' => 50],
                    ['name' => 'Regular Pass', 'price' => 250000, 'quantity' => 100],
                ],
            ],
            [
                'title'        => 'Bogor Music Fest 2026',
                'slug'         => Str::slug('Bogor Music Fest 2026') . '-demo2',
                'description'  => 'Festival musik outdoor terbesar menghadirkan band-band nasional terfavorit.',
                'location'     => 'Stadion Pakansari, Bogor',
                'event_date'   => now()->addDays(30),
                'banner_image' => 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
                'tickets'      => [
                    ['name' => 'VIP Front Stage', 'price' => 500000, 'quantity' => 30],
                    ['name' => 'Festival Pass', 'price' => 200000, 'quantity' => 200],
                ],
            ],
            [
                'title'        => 'Cyber Hackathon & DevFest 2026',
                'slug'         => Str::slug('Cyber Hackathon DevFest 2026') . '-demo3',
                'description'  => 'Kompetisi coding 24 jam dan pameran proyek inovasi AI & Web Development.',
                'location'     => 'Gedung Alumni IPB, Bogor',
                'event_date'   => now()->addDays(20),
                'banner_image' => 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
                'tickets'      => [
                    ['name' => 'Participant Pass', 'price' => 100000, 'quantity' => 80],
                    ['name' => 'Observer Ticket', 'price' => 50000, 'quantity' => 40],
                ],
            ],
            [
                'title'        => 'Jakarta Soundscape Night 2026',
                'slug'         => Str::slug('Jakarta Soundscape Night 2026') . '-demo4',
                'description'  => 'Malam konser musik EDM & Indie termegah di tengah gemerlap kota Jakarta.',
                'location'     => 'GBK Senayan, Jakarta',
                'event_date'   => now()->addDays(45),
                'banner_image' => 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
                'tickets'      => [
                    ['name' => 'VVIP Lounge Access', 'price' => 1200000, 'quantity' => 20],
                    ['name' => 'GA Standing', 'price' => 350000, 'quantity' => 150],
                ],
            ],
            [
                'title'        => 'Indie & Creative Expo 2026',
                'slug'         => Str::slug('Indie Creative Expo 2026') . '-demo5',
                'description'  => 'Pameran karya seni digital, desain UI/UX, dan bazar brand lokal pilihan.',
                'location'     => 'Botani Square Mall, Bogor',
                'event_date'   => now()->addDays(10),
                'banner_image' => 'https://images.unsplash.com/photo-1531058020387-3be344556be6',
                'tickets'      => [
                    ['name' => 'Day 1 Entry', 'price' => 35000, 'quantity' => 300],
                    ['name' => '2-Day All Access', 'price' => 60000, 'quantity' => 100],
                ],
            ],
            [
                'title'        => 'National Esports Arena Championship',
                'slug'         => Str::slug('National Esports Arena Championship') . '-demo6',
                'description'  => 'Turnamen esport nasional kategori Valorant, Mobile Legends, dan PUBG Mobile.',
                'location'     => 'Sentul International Convention Center (SICC), Bogor',
                'event_date'   => now()->addDays(60),
                'banner_image' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
                'tickets'      => [
                    ['name' => 'Spectator Pass', 'price' => 75000, 'quantity' => 250],
                    ['name' => 'VIP Player Support Pass', 'price' => 250000, 'quantity' => 50],
                ],
            ],
            [
                'title'        => 'Jabodetabek Volleyball Cup 2026',
                'slug'         => Str::slug('Jabodetabek Volleyball Cup 2026') . '-demo7',
                'description'  => 'Turnamen bola voli terfavorit se-Jabodetabek memperebutkan piala bergengsi.',
                'location'     => 'GOR Pajajaran, Bogor',
                'event_date'   => now()->addDays(25),
                'banner_image' => 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1',
                'tickets'      => [
                    ['name' => 'Tribun Utara/Selatan', 'price' => 40000, 'quantity' => 120],
                    ['name' => 'VIP Court Side', 'price' => 150000, 'quantity' => 30],
                ],
            ],
            [
                'title'        => 'Bogor Culinary & Food Truck Carnival',
                'slug'         => Str::slug('Bogor Culinary Food Truck Carnival') . '-demo8',
                'description'  => 'Surga kuliner legendaris dan kreasi modern dari puluhan chef serta food truck terbaik.',
                'location'     => 'Taman Sempur, Bogor',
                'event_date'   => now()->addDays(8),
                'banner_image' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
                'tickets'      => [
                    ['name' => 'Voucher Fast Pass Entry', 'price' => 25000, 'quantity' => 500],
                ],
            ],
            [
                'title'        => 'AI & Cloud Architecture Summit 2026',
                'slug'         => Str::slug('AI Cloud Architecture Summit 2026') . '-demo9',
                'description'  => 'Diskusi mendalam bersama praktisi AI, Machine Learning, dan Cloud System Architecture.',
                'location'     => 'Ritz-Carlton Pacific Place, Jakarta',
                'event_date'   => now()->addDays(40),
                'banner_image' => 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
                'tickets'      => [
                    ['name' => 'Professional Pass', 'price' => 850000, 'quantity' => 60],
                    ['name' => 'Executive VIP Pass', 'price' => 1750000, 'quantity' => 20],
                ],
            ],
            [
                'title'        => 'Sunda Cultural Night & Acoustic Harmonies',
                'slug'         => Str::slug('Sunda Cultural Night Acoustic') . '-demo10',
                'description'  => 'Pagelaran seni kebudayaan Sunda dipadukan dengan pertunjukan musik akustik hangat.',
                'location'     => 'Gedung Kesenian Bogor',
                'event_date'   => now()->addDays(18),
                'banner_image' => 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
                'tickets'      => [
                    ['name' => 'Reguler Seating', 'price' => 60000, 'quantity' => 150],
                    ['name' => 'VIP Front Seating', 'price' => 120000, 'quantity' => 40],
                ],
            ],
            [
                'title'        => 'Startup Pitch & Venture Fair 2026',
                'slug'         => Str::slug('Startup Pitch Venture Fair 2026') . '-demo11',
                'description'  => 'Ajang pertemuannya para founder startup potensial dengan investor dan venture capital.',
                'location'     => 'CoHive Telkomsel Smart Office, Jakarta',
                'event_date'   => now()->addDays(50),
                'banner_image' => 'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
                'tickets'      => [
                    ['name' => 'Founder Pass', 'price' => 300000, 'quantity' => 40],
                    ['name' => 'General Visitor Pass', 'price' => 100000, 'quantity' => 100],
                ],
            ],
            [
                'title'        => 'Anime & Pop Culture Con Bogor 2026',
                'slug'         => Str::slug('Anime Pop Culture Con Bogor 2026') . '-demo12',
                'description'  => 'Gathering komunitas anime, cosplay competition, merchandise booth, dan J-Music performance.',
                'location'     => 'Boxies 123 Mall, Bogor',
                'event_date'   => now()->addDays(12),
                'banner_image' => 'https://images.unsplash.com/photo-1578632767115-351597cf2477',
                'tickets'      => [
                    ['name' => '1-Day Ticket', 'price' => 50000, 'quantity' => 300],
                    ['name' => 'Cosplayer VIP Access', 'price' => 85000, 'quantity' => 80],
                ],
            ],
            [
                'title'        => 'Run & Fitness Night Marathon 2026',
                'slug'         => Str::slug('Run Fitness Night Marathon 2026') . '-demo13',
                'description'  => 'Lari malam 10K melintasi landmark kota Bogor dengan hiburan lampu neon dan DJ set.',
                'location'     => 'Kebun Raya Bogor Entrance',
                'event_date'   => now()->addDays(35),
                'banner_image' => 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3',
                'tickets'      => [
                    ['name' => 'Runner Jersey + Slot', 'price' => 225000, 'quantity' => 400],
                ],
            ],
            [
                'title'        => 'UI/UX & Product Design Masterclass',
                'slug'         => Str::slug('UIUX Product Design Masterclass') . '-demo14',
                'description'  => 'Workshop intensif merancang produk digital skala industri bersama Lead Designer agency top.',
                'location'     => 'Online via Zoom Meeting VIP',
                'event_date'   => now()->addDays(15),
                'banner_image' => 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e',
                'tickets'      => [
                    ['name' => 'Workshop Access + E-Certificate', 'price' => 175000, 'quantity' => 50],
                ],
            ],
            [
                'title'        => 'Sunset Jazz & Chill at Puncak',
                'slug'         => Str::slug('Sunset Jazz Chill Puncak') . '-demo15',
                'description'  => 'Konser jazz syahdu di alam terbuka berlatar belakang matahari terbenam dan pegunungan.',
                'location'     => 'Agrowisata Gunung Mas, Puncak',
                'event_date'   => now()->addDays(55),
                'banner_image' => 'https://images.unsplash.com/photo-1511192336575-5a79af67a629',
                'tickets'      => [
                    ['name' => 'Early Bird VIP', 'price' => 350000, 'quantity' => 50],
                    ['name' => 'Regular Entry', 'price' => 200000, 'quantity' => 150],
                ],
            ],
        ];

        foreach ($eventsData as $data) {
            $event = Event::create([
                'title'        => $data['title'],
                'slug'         => $data['slug'],
                'description'  => $data['description'],
                'location'     => $data['location'],
                'event_date'   => $data['event_date'],
                'banner_image' => $data['banner_image'],
                'organizer_id' => $admin->id,
            ]);

            foreach ($data['tickets'] as $ticketData) {
                Ticket::create([
                    'event_id'           => $event->id,
                    'name'               => $ticketData['name'],
                    'price'              => $ticketData['price'],
                    'quantity'           => $ticketData['quantity'],
                    'available_quantity' => $ticketData['quantity'],
                ]);
            }
        }
    }
}