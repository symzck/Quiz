const fs = require('fs');

const moreQuestions = [
    // --- BAHASA INDONESIA TPM 2 KOTA YOGYAKARTA PAKET A ---
    {
        "id": "tpm2_jogja_indo_a_01",
        "jenjang": "SMP",
        "mapel": "Bahasa Indonesia",
        "subtes": "TPM 2 Kota Yogyakarta - Bahasa Indonesia Paket A",
        "tingkat": "Mudah",
        "topik": "Teks Deskripsi",
        "tipe": "PG",
        "stimulus": "Kemegahan Taman Nasional Bromo Tengger Semeru\n\nKalian suka petualangan dan ingin merasakan suasana alam vulkanik yang menakjubkan? Jelajahi dan temukan pesona Bromo Tengger Semeru! Keindahan alamnya siap membuat perjalanan Kalian tak terlupakan.\nTaman Nasional Bromo Tengger Semeru adalah kawasan pegunungan di Jawa Timur yang terkenal sebagai rumah bagi flora dan fauna khas pegunungan. Hal ini disebabkan oleh adanya Gunung Semeru yang memiliki ketinggian 3.676 mdpl. Kawasan ini memiliki suhu udara antara 3—18°C pada malam hari. Selain itu, curah hujan yang tinggi membuat udaranya sejuk dan lembap.\nPemandangan menakjubkan di taman nasional siap memanjakan mata pengunjung. Lautan pasir yang luas di kaki Gunung Bromo, kawah aktif dengan asap putih yang mengepul, dan pemandangan matahari terbit merupakan daya tarik utama kawasan ini. Di beberapa bagian hutan, tumbuh cemara gunung dan pohon akasia. Selain itu, ada bunga edelweiss yang menjadi ikon alam pegunungan Bromo. Satwa seperti kijang, lutung budeng, dan berbagai burung endemik Jawa pun hidup di dalam kawasan hutan tersebut.",
        "soal": "Objek apakah yang menjadi ikon alam pegunungan Bromo?",
        "pilihan": [
            "A. Burung endemik",
            "B. Bunga edelweiss",
            "C. Lutung budeng",
            "D. Cemara gunung"
        ],
        "jawaban": 1,
        "pembahasan": "Berdasarkan teks paragraf ketiga kalimat keempat: 'Selain itu, ada bunga edelweiss yang menjadi ikon alam pegunungan Bromo.' (Kunci Jawaban: B)"
    },
    {
        "id": "tpm2_jogja_indo_a_04",
        "jenjang": "SMP",
        "mapel": "Bahasa Indonesia",
        "subtes": "TPM 2 Kota Yogyakarta - Bahasa Indonesia Paket A",
        "tingkat": "Mudah",
        "topik": "Makna Kata / Istilah",
        "tipe": "PG",
        "stimulus": "Bagaimana Cara Membuat Eco-Enzyme dari Limbah Kulit Buah?\n\nLimbah organik rumah tangga, terutama kulit buah, sering dibuang begitu saja sehingga menumpuk dan menghasilkan bau tidak sedap. Jika tidak dikelola, limbah ini dapat meningkatkan volume sampah dan mencemari lingkungan. Salah satu solusi ramah lingkungan untuk mengolah limbah kulit buah adalah membuat eco-enzyme. Eco-enzyme merupakan cairan hasil fermentasi limbah organik yang bermanfaat sebagai pembersih alami, penyubur tanaman, dan pengurang bau.",
        "soal": "Apa makna kata limbah yang terdapat dalam teks tersebut?",
        "pilihan": [
            "A. Bahan sisa untuk proses fermentasi.",
            "B. Barang olahan sampah anorganik.",
            "C. Bahan yang menghasilkan bau.",
            "D. Barang yang harus diolah lagi."
        ],
        "jawaban": 0,
        "pembahasan": "Dalam konteks bacaan pembuatan eco-enzyme dari kulit buah sisa rumah tangga, kata limbah bermakna bahan sisa yang dimanfaatkan untuk proses fermentasi. (Kunci Jawaban: A)"
    },
    {
        "id": "tpm2_jogja_indo_a_05",
        "jenjang": "SMP",
        "mapel": "Bahasa Indonesia",
        "subtes": "TPM 2 Kota Yogyakarta - Bahasa Indonesia Paket A",
        "tingkat": "Sedang",
        "topik": "Teks Prosedur",
        "tipe": "PGK",
        "stimulus": "Langkah-Langkah Pembuatan Eco-Enzyme:\n1. Takar gula, kulit buah, dan air menggunakan timbangan dengan perbandingan 1:3:10.\n2. Potong kulit buah dengan pisau menjadi bagian kecil agar proses fermentasi lebih cepat.\n3. Masukkan gula ke dalam botol plastik lalu tambahkan kulit buah.\n4. Tuang air bersih dengan corong sesuai komposisi dan sisakan sedikit ruang udara di bagian atas.",
        "soal": "Apa yang akan terjadi jika kulit buah dipotong dalam ukuran besar? (Pilihlah jawaban yang benar lebih dari satu)",
        "pilihan": [
            "1. Proses fermentasi membutuhkan waktu yang lama.",
            "2. Ruang udara dalam botol akan dipenuhi kulit buah.",
            "3. Bahan-bahan lain sulit tercampur dengan merata.",
            "4. Sulit memasukkan kulit buah dalam botol plastik."
        ],
        "jawaban": [0, 3],
        "pembahasan": "Langkah ke-2 menyatakan 'Potong kulit buah dengan pisau menjadi bagian kecil agar proses fermentasi lebih cepat.' Jika dipotong besar, fermentasi memakan waktu lebih lama dan lebih sulit dimasukkan melalui mulut botol plastik. (Kunci: 1 dan 4)"
    },
    {
        "id": "tpm2_jogja_indo_a_10",
        "jenjang": "SMP",
        "mapel": "Bahasa Indonesia",
        "subtes": "TPM 2 Kota Yogyakarta - Bahasa Indonesia Paket A",
        "tingkat": "Sedang",
        "topik": "Teks Eksplanasi",
        "tipe": "PG",
        "stimulus": "Awan Mammatus: Awan Unik Seperti Busa Sabun\nAwan mammatus adalah jenis awan yang memiliki ciri khas menyerupai kantung-kantung berbentuk bulat atau menonjol ke bawah seperti busa sabun. Awan ini terbentuk akibat adanya perbedaan suhu dan tekanan di lapisan udara atas dan bawah. Bentuknya yang unik membedakannya dari awan lainnya.",
        "soal": "Deretan kata yang menunjukkan karakteristik awan mammatus adalah ....",
        "pilihan": [
            "A. angin kencang, kantung-kantung bulat, menyerupai busa sabun",
            "B. cuaca ekstrem, menyerupai busa sabun, kantung-kantung bulat",
            "C. kantung-kantung bulat, udara dingin, menyerupai busa sabun",
            "D. menyerupai busa sabun, bentuk unik, kantung-kantung bulat"
        ],
        "jawaban": 3,
        "pembahasan": "Karakteristik fisik awan mammatus menurut teks meliputi: menyerupai busa sabun, bentuk unik, dan kantung-kantung bulat. (Kunci: D)"
    },
    {
        "id": "tpm2_jogja_indo_a_13",
        "jenjang": "SMP",
        "mapel": "Bahasa Indonesia",
        "subtes": "TPM 2 Kota Yogyakarta - Bahasa Indonesia Paket A",
        "tingkat": "Mudah",
        "topik": "Teks Ulasan (Resensi)",
        "tipe": "PG",
        "stimulus": "Mengulas Novel Dompet Ayah, Sepatu Ibu\nNovel Dompet Ayah, Sepatu Ibu merupakan karya dari J.S. Khairen yang diterbitkan oleh Grasindo pada tahun 2023. Novel ini terdiri atas 219 halaman dan sudah mencapai cetak ulang ke-38 hingga September 2025 ini. Oleh sebab itu, novel ini termasuk novel best seller.",
        "soal": "Kalimat fakta yang tepat berdasarkan teks tersebut adalah …",
        "pilihan": [
            "A. Novel Dompet Ayah, Sepatu Ibu merupakan karya dari J.S. Khairen yang diterbitkan oleh Grasindo.",
            "B. Novel ini memiliki alur cerita yang mengalir karena didukung kata-kata mutiara bermakna pada tiap episode.",
            "C. Novel ini direkomendasikan bagi remaja karena kisahnya inspiratif dan memotivasi untuk tidak menyerah dalam kesulitan.",
            "D. Novel Dompet Ayah, Sepatu Ibu disajikan dengan bahasa ringan dan mudah dipahami sehingga “renyah” untuk dibaca."
        ],
        "jawaban": 0,
        "pembahasan": "Kalimat A merupakan fakta objektif mengenai pengarang, penerbit, dan tahun terbit yang dapat diverifikasi secara empiris. Opsi B, C, dan D memuat penilaian/opini subjektif. (Kunci: A)"
    },

    // --- BAHASA INDONESIA SLEMAN & KULON PROGO ---
    {
        "id": "tkad_sleman_indo_01",
        "jenjang": "SMP",
        "mapel": "Bahasa Indonesia",
        "subtes": "TKAD SMP Sleman - Bahasa Indonesia",
        "tingkat": "Mudah",
        "topik": "Teks Berita & Suasana",
        "tipe": "PG",
        "stimulus": "(1) Ratusan mahasiswa dari berbagai perguruan tinggi berbondong-bondong menuju gedung parlemen untuk menyampaikan aspirasi mereka mengenai kebijakan baru pemerintah.\n(2) Aparat keamanan telah bersiaga sejak pagi, mengantisipasi terjadinya aksi anarkis para demonstran. Mereka berjaga dengan sikap siaga penuh waspada.\n(3) Namun, kekhawatiran aparat tidak terjadi. Suasana di depan gedung tampak sangat kondusif. Aksi massa ini berjalan dengan tertib dan terkendali. Tidak ada yel-yel provokatif. Mereka justru melantunkan lagu nasional untuk mengiringi orasi yang disampaikan secara bergantian.\n(4) Bahkan, perwakilan pengunjuk rasa berhasil melakukan dialog terbuka dengan anggota dewan. Mereka berkomitmen untuk menjaga ketenangan agar pesan mereka tersampaikan dengan baik.",
        "soal": "Bagian teks tersebut yang menggambarkan suasana damai adalah nomor ….",
        "pilihan": [
            "A. 1 dan 2",
            "B. 1 dan 3",
            "C. 2 dan 4",
            "D. 3 dan 4"
        ],
        "jawaban": 3,
        "pembahasan": "Kalimat (3) dan (4) menjelaskan suasana sangat kondusif, tertib, terkendali, melantunkan lagu nasional, dan komitmen menjaga ketenangan (suasana damai). (Kunci: D)"
    },
    {
        "id": "tkad_sleman_mat_01",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKAD SMP Sleman - Literasi Numerasi",
        "tingkat": "Mudah",
        "topik": "Operasi Hitung Campuran",
        "tipe": "PG",
        "stimulus": "Operasi hitung: 30 − 2 × 5 + 50 ÷ 5\nLangkah penyelesaian beberapa murid:\n- Murid 1: 30 - 10 + 10 = 30 + 40:5 = 70:5 = 14\n- Murid 2: 30 - 10 + 10 = 30 - 40:5 = 30 - 8 = 22\n- Murid 3: 30 - 10 + 10 = 30 + 40:5 = 30 + 8 = 38\n- Murid 4: 30 - 10 + 10 = 30 - 0 = 30 (atau 30 - 10 = 20 + 10 = 30)",
        "soal": "Murid yang menjawab dengan tepat urutan operasi hitung matematika adalah ….",
        "pilihan": [
            "A. Murid 1",
            "B. Murid 2",
            "C. Murid 3",
            "D. Murid 4"
        ],
        "jawaban": 3,
        "pembahasan": "Prioritas operasi: perkalian dan pembagian dikerjakan lebih dulu.\n2 x 5 = 10\n50 ÷ 5 = 10\nMaka: 30 - 10 + 10 = 20 + 10 = 30. Langkah murid 4 memberikan hasil akhir 30. (Kunci: D)"
    },
    {
        "id": "tkad_sleman_mat_02",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKAD SMP Sleman - Literasi Numerasi",
        "tingkat": "Sedang",
        "topik": "Bilangan Bulat & Suhu",
        "tipe": "PG",
        "stimulus": "Suhu awal freezer:\n- Merek A: -23°C\n- Merek B: -21°C\n- Merek C: -20°C\n- Merek D: -19°C\nListrik padam dari pukul 08.20 hingga 12.00 (total 3 jam 40 menit = 220 menit). Suhu naik 4°C setiap 20 menit. Kenaikan suhu = (220 / 20) x 4°C = 11 x 4°C = 44°C. Suhu normal ruangan = 25°C.",
        "soal": "Apabila suhu normal ruangan sebesar 25°C, maka lemari es yang akan mencapai suhu normal ruangan selama pemadaman listrik adalah ….",
        "pilihan": [
            "A. Lemari es merek A",
            "B. Lemari es merek B",
            "C. Lemari es merek C",
            "D. Lemari es merek D"
        ],
        "jawaban": 3,
        "pembahasan": "Suhu akhir setelah pemadaman:\n- Merek A: -23 + 44 = 21°C\n- Merek B: -21 + 44 = 23°C\n- Merek C: -20 + 44 = 24°C\n- Merek D: -19 + 44 = 25°C (Tepat mencapai suhu normal 25°C). (Kunci: D)"
    },
    {
        "id": "tka_kulonprogo_mat_a_01",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TKA Tahap 2 Kulon Progo - Paket A",
        "tingkat": "Mudah",
        "topik": "Sistem Skor Pertandingan",
        "tipe": "BS",
        "stimulus": "Sistem penilaian liga sepak bola: Menang 3 poin, Seri 1 poin, Kalah 0 poin.\n- Klub P: Menang 11, Seri 1, Kalah 3 (Poin = 11x3 + 1 = 34 poin)\n- Klub Q: Menang 9, Seri 5, Kalah 1 (Poin = 9x3 + 5 = 32 poin)\n- Klub R: Menang 10, Seri 1, Kalah 4 (Poin = 10x3 + 1 = 31 poin)",
        "soal": "Pernyataan: 'Jumlah poin yang tertinggi adalah klub P'. Tentukan Benar atau Salah!",
        "pilihan": ["Benar", "Salah"],
        "jawaban": 0,
        "pembahasan": "Poin Klub P = 34, Klub Q = 32, Klub R = 31. Poin tertinggi memang diraih oleh klub P (34 poin). Pernyataan Benar."
    }
];

let html = fs.readFileSync('index.html', 'utf8');
const qString = moreQuestions.map(q => JSON.stringify(q, null, 4)).join(',\n    ') + ',';

html = html.replace('const DEFAULT_QUESTIONS = [', 'const DEFAULT_QUESTIONS = [\n    ' + qString);
fs.writeFileSync('index.html', html);
console.log(`Successfully added additional ${moreQuestions.length} official questions from TPM/TKAD DIY!`);
