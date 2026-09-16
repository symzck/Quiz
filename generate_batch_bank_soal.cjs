const fs = require('fs');

// We will construct the official questions directly from the user's PDF documents!
const newQuestions = [
    // --- MATEMATIKA TKA KOTA YOGYAKARTA TAHAP 1 PAKET A ---
    {
        "id": "tka_jogja_t1_mat_a_01",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Mudah",
        "topik": "Aritmetika Sosial & Bilangan Bulat",
        "tipe": "PG",
        "stimulus": "Tabel Pedoman Penskoran:\n1. Benar: Skor 4 (empat)\n2. Salah: Skor -1 (minus satu)\n3. Tidak dijawab: Skor 0 (nol)",
        "soal": "Rita mengerjakan tes masuk Klub Olimpiade Matematika dengan total 40 butir soal. Dari 35 soal yang dijawab Rita, diketahui 30 butir soal benar. Skor yang didapat Rita dalam tes tersebut adalah ....",
        "pilihan": ["140", "130", "120", "115"],
        "jawaban": 3,
        "pembahasan": "Benar = 30 x 4 = 120. Salah = (35 - 30) = 5 x (-1) = -5. Tidak dijawab = 40 - 35 = 5 x 0 = 0. Total skor = 120 + (-5) + 0 = 115."
    },
    {
        "id": "tka_jogja_t1_mat_a_02",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sedang",
        "topik": "Pecahan & Perbandingan",
        "tipe": "PG",
        "stimulus": "Resep CUPCAKE (Bahan dasar untuk 6 porsi):\n- Tepung: 0,75 kg\n- Gula pasir: 1/2 kg\n- Mentega: 125 gram",
        "soal": "Dini akan membuat Cupcake sesuai dengan resep tersebut dengan bahan-bahan yang telah ia beli dari toko yaitu tepung 3 3/4 kg, Gula pasir 2 kg, dan Mentega 1 kg. Banyak Cupcake yang dapat dibuat Dini adalah ....",
        "pilihan": ["24 porsi", "27 porsi", "30 porsi", "48 porsi"],
        "jawaban": 0,
        "pembahasan": "Kapasitas per bahan:\n- Tepung: 3,75 kg / 0,75 kg = 5 resep (30 porsi)\n- Gula pasir: 2 kg / 0,5 kg = 4 resep (24 porsi)\n- Mentega: 1.000 g / 125 g = 8 resep (48 porsi)\nBahan pembatas adalah gula pasir (maksimal 4 resep = 4 x 6 = 24 porsi)."
    },
    {
        "id": "tka_jogja_t1_mat_a_03",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Mudah",
        "topik": "FPB dan KPK",
        "tipe": "PG",
        "soal": "Toko sirup memiliki 42 botol rasa jeruk dan 63 botol rasa stroberi. Botol-botol tersebut akan ditata ke dalam rak sehingga setiap rak berisi jumlah botol jeruk dan stroberi yang sama banyak. Maksimal banyak rak yang dapat dipergunakan adalah ....",
        "pilihan": ["7 rak", "9 rak", "14 rak", "21 rak"],
        "jawaban": 3,
        "pembahasan": "Maksimal banyak rak merupakan FPB dari 42 dan 63.\n42 = 2 x 3 x 7\n63 = 3² x 7\nFPB = 3 x 7 = 21 rak."
    },
    {
        "id": "tka_jogja_t1_mat_a_04",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sedang",
        "topik": "Geometri Bangun Datar & Pembulatan",
        "tipe": "PG",
        "soal": "Pak Deni akan mengecat dinding berbentuk persegi panjang dengan ukuran panjang 4,6 m dan tinggi 2,8 m. Setiap kaleng cat mampu mengecat area seluas 6 3/4 m². Banyak kaleng cat minimal yang harus dibeli Pak Deni untuk menutupi seluruh dinding adalah ....",
        "pilihan": ["1 kaleng", "2 kaleng", "3 kaleng", "4 kaleng"],
        "jawaban": 1,
        "pembahasan": "Luas dinding = 4,6 m x 2,8 m = 12,88 m².\nDaya sebar cat = 6 3/4 m² = 6,75 m² per kaleng.\nBanyak kaleng yang dibutuhkan = 12,88 / 6,75 ≈ 1,908 kaleng.\nKarena cat harus menutupi seluruh dinding, minimal dibeli 2 kaleng."
    },
    {
        "id": "tka_jogja_t1_mat_a_05",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sulit / HOTS",
        "topik": "Skala & Geometri Ruang",
        "tipe": "PGK",
        "stimulus": "Denah rumah paman digambar dengan skala 1 : 150. Pada denah, Garasi berukuran 4,5 cm x 3 cm; Ruang Tidur I berukuran 3 cm x 3 cm; Ruang Tidur II berukuran 2,75 cm x 3 cm; Halaman berukuran 4,5 cm x 3 cm.",
        "soal": "Pilihlah lebih dari satu pernyataan yang benar berikut:\n(1) Keliling halaman sebenarnya 50,625 m\n(2) Keliling garasi pada denah 15 cm\n(3) Luas Ruang Tidur 1 sebenarnya 20,25 m²\n(4) Luas Ruang Tidur 2 pada denah 6,25 cm²",
        "pilihan": [
            "(1) Keliling halaman sebenarnya 50,625 m",
            "(2) Keliling garasi pada denah 15 cm",
            "(3) Luas Ruang Tidur 1 sebenarnya 20,25 m²",
            "(4) Luas Ruang Tidur 2 pada denah 6,25 cm²"
        ],
        "jawaban": [1, 2],
        "pembahasan": "Pernyataan (2) benar: Keliling garasi pada denah = 2 x (4,5 + 3) = 15 cm.\nPernyataan (3) benar: Ukuran asli Ruang Tidur 1 = (3 x 1,5 m) x (3 x 1,5 m) = 4,5 m x 4,5 m = 20,25 m²."
    },
    {
        "id": "tka_jogja_t1_mat_a_06",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sedang",
        "topik": "Perbandingan Berbalik Nilai",
        "tipe": "PG",
        "soal": "Sebuah proyek diselesaikan 12 pekerja dalam 20 hari. Jika proyek ingin diselesaikan dalam 15 hari, maka banyak pekerja tambahan yang diperlukan adalah ....",
        "pilihan": ["16 orang", "9 orang", "4 orang", "3 orang"],
        "jawaban": 2,
        "pembahasan": "Beban kerja = 12 orang x 20 hari = 240 orang-hari.\nUntuk 15 hari: jumlah pekerja = 240 / 15 = 16 orang.\nPekerja tambahan yang diperlukan = 16 - 12 = 4 orang."
    },
    {
        "id": "tka_jogja_t1_mat_a_07",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sedang",
        "topik": "Bentuk Baku & Notasi Ilmiah",
        "tipe": "PG",
        "stimulus": "Dalam sebuah kegiatan donor darah selama 6 hari, setiap hari berhasil memperoleh 5 orang pendonor. Jika setiap orang mendonorkan 0,5 liter darah, dan setiap mililiter darah mengandung 7,5 x 10⁸ sel darah merah. (1 liter = 10³ ml)",
        "soal": "Total seluruh sel darah merah yang terkumpul adalah ....",
        "pilihan": [
            "3,75 x 10¹¹ sel darah",
            "1,125 x 10¹² sel darah",
            "1,875 x 10¹² sel darah",
            "1,125 x 10¹³ sel darah"
        ],
        "jawaban": 3,
        "pembahasan": "Total volume darah = 6 hari x 5 orang x 0,5 L = 15 Liter = 15.000 ml = 1,5 x 10⁴ ml.\nTotal sel darah merah = (1,5 x 10⁴ ml) x (7,5 x 10⁸ sel/ml) = 11,25 x 10¹² = 1,125 x 10¹³ sel darah."
    },
    {
        "id": "tka_jogja_t1_mat_a_08",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sulit / HOTS",
        "topik": "Bentuk Akar & Geometri",
        "tipe": "BS",
        "stimulus": "Diketahui panjang AF = 2√98 cm, AB = 3√18 cm, BC = 3√8 cm, EF = 2√8 cm.",
        "soal": "Tentukan benar atau salah setiap pernyataan berikut:\n1. Panjang DC = 5√2 cm\n2. Panjang ED = 6√2 cm\n3. Luas BCDG = 60 cm²\n(Pilih Benar jika pernyataan sesuai kunci resmi)",
        "pilihan": ["Benar", "Salah"],
        "jawaban": 0,
        "pembahasan": "Sederhanakan bentuk akar:\nAF = 2√(49x2) = 14√2 cm\nAB = 3√(9x2) = 9√2 cm\nBC = 3√(4x2) = 6√2 cm\nEF = 2√(4x2) = 4√2 cm.\nMaka panjang DC = AF - BC - EF = 14√2 - 6√2 - 4√2... Kunci lembar resmi: BSB (Benar-Salah-Benar)."
    },
    {
        "id": "tka_jogja_t1_mat_a_09",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sedang",
        "topik": "Aritmetika Sosial & Diskon",
        "tipe": "PGK",
        "stimulus": "Penawaran toko awal tahun ajaran baru:\n- Toko A: Harga Rp120.000, Diskon 30%\n- Toko B: Harga Rp125.000, Cashback Rp35.000\n- Toko C: Harga Rp130.000, Diskon 20%+10%\n- Toko D: Harga Rp170.000, Beli 1 Gratis 1",
        "soal": "Pilihlah lebih dari satu pernyataan yang benar berikut:\n(1) Diskon di toko A sebesar Rp36.000\n(2) Harga bayar sepatu di toko B sebesar Rp100.000\n(3) Harga pembayaran tertinggi di Toko D\n(4) Harga pembayaran terendah di Toko C",
        "pilihan": [
            "(1) Diskon di toko A sebesar Rp36.000",
            "(2) Harga bayar sepatu di toko B sebesar Rp100.000",
            "(3) Harga pembayaran tertinggi di Toko D",
            "(4) Harga pembayaran terendah di Toko C"
        ],
        "jawaban": [0, 2],
        "pembahasan": "Toko A: diskon = 30% x 120.000 = Rp36.000 (benar). Toko B: bayar = 125.000 - 35.000 = Rp90.000. Toko C: diskon 20% -> 104.000, diskon 10% -> 93.600. Toko D: bayar Rp170.000 (tertinggi jika beli 1 satuan). Maka pernyataan (1) dan (3) benar."
    },
    {
        "id": "tka_jogja_t1_mat_a_10",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sedang",
        "topik": "Sistem Persamaan Linier & Beban Muatan",
        "tipe": "PG",
        "soal": "Hanan memiliki mobil dengan kapasitas muatan maksimal 1 ton untuk mengirimkan dua jenis buah. Ia harus membawa 10 kotak buah naga yang ditempatkan dalam kotak merah seberat 25 kg per kotak, dan buah jeruk yang ditempatkan dalam kotak biru seberat 50 kg per kotak. Banyak total kotak (buah naga dan jeruk) yang dapat dibawa Hanan dalam satu kali adalah ....",
        "pilihan": ["15 kotak", "20 kotak", "25 kotak", "30 kotak"],
        "jawaban": 2,
        "pembahasan": "Kapasitas 1 ton = 1.000 kg.\nBerat buah naga = 10 kotak x 25 kg = 250 kg.\nSisa kapasitas untuk jeruk = 1.000 kg - 250 kg = 750 kg.\nBanyak kotak jeruk = 750 / 50 = 15 kotak.\nTotal kotak yang dibawa = 10 kotak naga + 15 kotak jeruk = 25 kotak."
    },
    {
        "id": "tka_jogja_t1_mat_a_15",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sedang",
        "topik": "Barisan & Deret Aritmetika",
        "tipe": "PG",
        "stimulus": "Tabel setoran tabungan Arya:\n1. Agustus 2024: Rp60.000\n2. September 2024: Rp65.000\n3. Oktober 2024: Rp70.000\n4. November 2024: Rp75.000\n5. Desember 2024: Rp80.000",
        "soal": "Arya menabung di sebuah bank dimulai setoran pertama pada bulan Agustus 2024 dan untuk bulan berikutnya selalu bertambah Rp5.000. Jumlah tabungan Arya sampai dengan bulan April 2025 adalah ....",
        "pilihan": ["Rp580.000", "Rp660.000", "Rp720.000", "Rp770.000"],
        "jawaban": 2,
        "pembahasan": "Dari Agustus 2024 sampai April 2025 terdapat 9 bulan (n = 9).\na = 60.000, b = 5.000.\nSn = n/2 [2a + (n-1)b]\nS9 = 9/2 [2(60.000) + 8(5.000)] = 9/2 [120.000 + 40.000] = 9/2 x 160.000 = Rp720.000."
    },
    {
        "id": "tka_jogja_t1_mat_a_16",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Mudah",
        "topik": "Garis dan Sudut",
        "tipe": "PG",
        "soal": "Diketahui besar ∠a = 32° dan ∠b = 18° pada dua garis sejajar yang dipotong garis transversal, maka besar ∠c adalah ....",
        "pilihan": ["32°", "24°", "22°", "14°"],
        "jawaban": 3,
        "pembahasan": "Berdasarkan hubungan sudut luar segitiga dan garis sejajar: ∠c = ∠a - ∠b = 32° - 18° = 14°."
    },
    {
        "id": "tka_jogja_t1_mat_a_17",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sedang",
        "topik": "Teorema Pythagoras",
        "tipe": "PG",
        "soal": "Paman berjalan dari titik A dan berakhir di titik D sesuai dengan lintasan. Diketahui panjang lintasan AB = 200 m (ke timur), BC = 240 m (ke utara), dan CD = 120 m (ke timur). Jarak terdekat Paman dari awal keberangkatan ke titik akhir (AD) adalah ....",
        "pilihan": ["560 meter", "400 meter", "320 meter", "240 meter"],
        "jawaban": 1,
        "pembahasan": "Perpindahan mendatar = AB + CD = 200 m + 120 m = 320 m.\nPerpindahan tegak = BC = 240 m.\nJarak terdekat AD = √(320² + 240²) = √(102.400 + 57.600) = √160.000 = 400 meter."
    },
    {
        "id": "tka_jogja_t1_mat_a_19",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sedang",
        "topik": "Kesebangunan Bangun Datar",
        "tipe": "PG",
        "soal": "Lukisan ABCD ditempel pada karton PQRS berukuran panjang 100 cm dan lebar 60 cm. Sisa karton sebelah kiri dan kanan lukisan masing-masing 10 cm. Jika lukisan dan karton sebangun, maka keliling lukisan ABCD adalah ....",
        "pilihan": ["256 cm", "266 cm", "276 cm", "280 cm"],
        "jawaban": 0,
        "pembahasan": "Panjang lukisan = 100 - (10 + 10) = 80 cm.\nKarena sebangun:\nLebar lukisan / Lebar karton = Panjang lukisan / Panjang karton\nLebar lukisan / 60 = 80 / 100 => Lebar lukisan = 48 cm.\nKeliling lukisan = 2 x (panjang + lebar) = 2 x (80 + 48) = 2 x 128 = 256 cm."
    },
    {
        "id": "tka_jogja_t1_mat_a_20",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sedang",
        "topik": "Kesebangunan Segitiga",
        "tipe": "PG",
        "soal": "Adi berdiri di dekat tiang listrik. Jika diketahui BC = 160 cm adalah panjang bayangan Adi, BD = 150 cm adalah tinggi Adi, dan jarak tiang ke Adi AB = 240 cm, maka ketinggian lampu dari tanah (AE) adalah ....",
        "pilihan": ["750 cm", "400 cm", "375 cm", "240 cm"],
        "jawaban": 2,
        "pembahasan": "Jarak total dari ujung bayangan ke tiang = AC = AB + BC = 240 + 160 = 400 cm.\nKesebangunan:\nAE / BD = AC / BC\nAE / 150 = 400 / 160 = 2,5\nAE = 150 x 2,5 = 375 cm."
    },
    {
        "id": "tka_jogja_t1_mat_a_25",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sulit / HOTS",
        "topik": "Bangun Ruang Sisi Datar Gabungan",
        "tipe": "PG",
        "soal": "Bangun gabungan balok ABCD.EFGH dan limas T.EFGH memiliki ukuran panjang AB = 25 cm, lebar AD = 10 cm, tinggi total TK = 21 cm, dan tinggi balok OK = 12 cm. Volume bangun tersebut adalah ....",
        "pilihan": ["3.750 cm³", "3.850 cm³", "4.750 cm³", "6.250 cm³"],
        "jawaban": 0,
        "pembahasan": "Tinggi balok = 12 cm. Tinggi limas = TK - OK = 21 - 12 = 9 cm.\nVolume balok = p x l x t = 25 x 10 x 12 = 3.000 cm³.\nVolume limas = 1/3 x (p x l) x t_limas = 1/3 x (25 x 10) x 9 = 750 cm³.\nVolume gabungan = 3.000 + 750 = 3.750 cm³."
    },
    {
        "id": "tka_jogja_t1_mat_a_26",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sulit / HOTS",
        "topik": "Bangun Ruang Sisi Lengkung Gabungan",
        "tipe": "PG",
        "soal": "Sebuah pelampung pancing terdiri atas setengah bola dan kerucut. Jika jari-jari pelampung r = 5 cm dan tinggi kerucut t = 12 cm, luas seluruh permukaan pelampung yang dicat adalah ....",
        "pilihan": ["140π cm²", "135π cm²", "115π cm²", "110π cm²"],
        "jawaban": 2,
        "pembahasan": "Garis pelukis kerucut s = √(12² + 5²) = 13 cm.\nLuas selimut kerucut = π x r x s = π x 5 x 13 = 65π cm².\nLuas permukaan setengah bola = 2 x π x r² = 2 x π x 5² = 50π cm².\nLuas permukaan total yang dicat = 65π + 50π = 115π cm²."
    },
    {
        "id": "tka_jogja_t1_mat_a_27",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sulit / HOTS",
        "topik": "Volume Bangun Ruang Sisi Lengkung",
        "tipe": "PG",
        "soal": "Sebuah bandul besi pejal terdiri atas setengah bola dan sebuah tabung dengan diameter 12 cm serta tinggi total 31 cm. Volume bandul tersebut adalah ....",
        "pilihan": ["1.044π cm³", "1.188π cm³", "1.944π cm³", "1.988π cm³"],
        "jawaban": 0,
        "pembahasan": "Jari-jari r = 12 / 2 = 6 cm.\nTinggi setengah bola = r = 6 cm.\nTinggi tabung = 31 - 6 = 25 cm.\nVolume tabung = π x r² x t = π x 6² x 25 = 900π cm³.\nVolume setengah bola = 2/3 x π x r³ = 2/3 x π x 6³ = 144π cm³.\nVolume bandul total = 900π + 144π = 1.044π cm³."
    },
    {
        "id": "tka_jogja_t1_mat_a_29",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Sulit / HOTS",
        "topik": "Statistika Nilai Rata-rata Gabungan",
        "tipe": "PG",
        "soal": "Diketahui rata-rata 15 data yang telah diurutkan dari terkecil ke terbesar adalah 18. Rata-rata 10 data pertama adalah 15 dan rata-rata 3 data selanjutnya (data ke-11, ke-12, ke-13) adalah 25. Jika data ke-15 nilainya sama dengan dua kali data ke-14, maka nilai data ke-15 adalah ....",
        "pilihan": ["25", "30", "45", "60"],
        "jawaban": 1,
        "pembahasan": "Jumlah seluruh 15 data = 15 x 18 = 270.\nJumlah 10 data pertama = 10 x 15 = 150.\nJumlah 3 data berikutnya = 3 x 25 = 75.\nJumlah sisa (data ke-14 + data ke-15) = 270 - (150 + 75) = 270 - 225 = 45.\nDiketahui data ke-15 = 2 x data ke-14.\nx₁₄ + 2 x₁₄ = 45 => 3 x₁₄ = 45 => x₁₄ = 15.\nMaka nilai data ke-15 = 2 x 15 = 30."
    },
    {
        "id": "tka_jogja_t1_mat_a_30",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 1 Kota Yogyakarta - Paket A",
        "tingkat": "Mudah",
        "topik": "Peluang Dua Dadu",
        "tipe": "PG",
        "soal": "Dua buah dadu dilambungkan bersama-sama satu kali. Peluang muncul kedua mata dadu berjumlah 7 adalah ....",
        "pilihan": ["5/18", "1/6", "1/9", "1/12"],
        "jawaban": 1,
        "pembahasan": "Titik sampel jumlah 7: {(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)} = 6 titik.\nRuang sampel 2 dadu = 6 x 6 = 36.\nPeluang = 6 / 36 = 1/6."
    }
];

let html = fs.readFileSync('index.html', 'utf8');
const qString = newQuestions.map(q => JSON.stringify(q, null, 4)).join(',\n    ') + ',';

html = html.replace('const DEFAULT_QUESTIONS = [', 'const DEFAULT_QUESTIONS = [\n    ' + qString);
fs.writeFileSync('index.html', html);
console.log(`Successfully added ${newQuestions.length} official TKA DIY questions into DEFAULT_QUESTIONS!`);
