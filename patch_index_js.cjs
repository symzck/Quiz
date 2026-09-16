const fs = require('fs');

const newQuestions = [
    {
        "id": "tka_smp_indo_tpm2_bromo",
        "jenjang": "SMP",
        "mapel": "Bahasa Indonesia",
        "subtes": "TPM 2 - Kota Yogyakarta",
        "tingkat": "Sedang",
        "topik": "Membaca Teks Informasi",
        "stimulus": "Kemegahan Taman Nasional Bromo Tengger Semeru\n\nKalian suka petualangan dan ingin merasakan suasana alam vulkanik yang menakjubkan? Jelajahi dan temukan pesona Bromo Tengger Semeru! Keindahan alamnya siap membuat perjalanan Kalian tak terlupakan.\n\nTaman Nasional Bromo Tengger Semeru adalah kawasan pegunungan di Jawa Timur yang terkenal sebagai rumah bagi flora dan fauna khas pegunungan. Hal ini disebabkan oleh adanya Gunung Semeru yang memiliki ketinggian 3.676 mdpl. Kawasan ini memiliki suhu udara antara 3—18°C pada malam hari. Selain itu, curah hujan yang tinggi membuat udaranya sejuk dan lembap.\n\nPemandangan menakjubkan di taman nasional siap memanjakan mata pengunjung. Lautan pasir yang luas di kaki Gunung Bromo, kawah aktif dengan asap putih yang mengepul, dan pemandangan matahari terbit merupakan daya tarik utama kawasan ini. Di beberapa bagian hutan, tumbuh cemara gunung dan pohon akasia. Selain itu, ada bunga edelweiss yang menjadi ikon alam pegunungan Bromo. Satwa seperti kijang, lutung budeng, dan berbagai burung endemik Jawa pun hidup di dalam kawasan hutan tersebut.\n\nAkses menuju kawasan taman nasional cukup mudah. Dari Malang atau Probolinggo, pengunjung dapat melanjutkan perjalanan menggunakan jeep. Ada beberapa titik wisata seperti Bromo, Bukit Teletubbies, dan Pasir Berbisik. Keindahan alam yang dramatis dan lanskap vulkanik yang khas membuat taman nasional ini menjadi salah satu destinasi alam memesona di Indonesia.",
        "stimulus_img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bromo-Semeru-Batok-Widodaren.jpg/800px-Bromo-Semeru-Batok-Widodaren.jpg",
        "soal": "Objek apakah yang menjadi ikon alam pegunungan Bromo?",
        "soal_img": "",
        "pilihan": [
            "Burung endemik.",
            "Bunga edelweiss.",
            "Lutung budeng.",
            "Cemara gunung."
        ],
        "jawaban": 1,
        "pembahasan": "Berdasarkan paragraf ketiga, disebutkan bahwa 'ada bunga edelweiss yang menjadi ikon alam pegunungan Bromo.'"
    },
    {
        "id": "tka_smp_indo_tpm2_bromo2",
        "jenjang": "SMP",
        "mapel": "Bahasa Indonesia",
        "subtes": "TPM 2 - Kota Yogyakarta",
        "tingkat": "Sulit / HOTS",
        "topik": "Membaca Teks Informasi",
        "stimulus": "Kemegahan Taman Nasional Bromo Tengger Semeru\n\nKalian suka petualangan dan ingin merasakan suasana alam vulkanik yang menakjubkan? Jelajahi dan temukan pesona Bromo Tengger Semeru! Keindahan alamnya siap membuat perjalanan Kalian tak terlupakan.\n\nTaman Nasional Bromo Tengger Semeru adalah kawasan pegunungan di Jawa Timur yang terkenal sebagai rumah bagi flora dan fauna khas pegunungan. Hal ini disebabkan oleh adanya Gunung Semeru yang memiliki ketinggian 3.676 mdpl. Kawasan ini memiliki suhu udara antara 3—18°C pada malam hari. Selain itu, curah hujan yang tinggi membuat udaranya sejuk dan lembap.\n\nPemandangan menakjubkan di taman nasional siap memanjakan mata pengunjung. Lautan pasir yang luas di kaki Gunung Bromo, kawah aktif dengan asap putih yang mengepul, dan pemandangan matahari terbit merupakan daya tarik utama kawasan ini. Di beberapa bagian hutan, tumbuh cemara gunung dan pohon akasia. Selain itu, ada bunga edelweiss yang menjadi ikon alam pegunungan Bromo. Satwa seperti kijang, lutung budeng, dan berbagai burung endemik Jawa pun hidup di dalam kawasan hutan tersebut.\n\nAkses menuju kawasan taman nasional cukup mudah. Dari Malang atau Probolinggo, pengunjung dapat melanjutkan perjalanan menggunakan jeep. Ada beberapa titik wisata seperti Bromo, Bukit Teletubbies, dan Pasir Berbisik. Keindahan alam yang dramatis dan lanskap vulkanik yang khas membuat taman nasional ini menjadi salah satu destinasi alam memesona di Indonesia.",
        "stimulus_img": "",
        "soal": "Berbagai flora dan fauna khas pegunungan tinggal di Bromo Tengger Semeru. Mengapa kawasan tersebut dapat menjadi habitat flora dan fauna?",
        "soal_img": "",
        "pilihan": [
            "Keindahan alam Bromo Tengger Semeru terasa dramatis karena lanskap vulkanik yang khas.",
            "Suhu udara di kawasan Bromo Tengger Semeru dapat mencapai 3°C karena curah hujan tinggi.",
            "Kawasan Bromo Tengger Semeru sejuk dan lembap karena suhu udara dingin serta curah hujan tinggi.",
            "Taman Nasional Bromo Tengger Semeru berada di ketinggian 3.676 mdpl sehingga terasa dingin dan basah."
        ],
        "jawaban": 2,
        "pembahasan": "Paragraf kedua menjelaskan bahwa kawasan ini menjadi rumah flora dan fauna khas karena memiliki suhu dingin (3-18 C) dan udaranya sejuk serta lembap akibat curah hujan tinggi."
    },
    {
        "id": "tka_smp_indo_tpm2_eco",
        "jenjang": "SMP",
        "mapel": "Bahasa Indonesia",
        "subtes": "TPM 2 - Kota Yogyakarta",
        "tingkat": "Sedang",
        "topik": "Teks Prosedur",
        "stimulus": "Bagaimana Cara Membuat Eco-Enzyme dari Limbah Kulit Buah?\n\nLimbah organik rumah tangga, terutama kulit buah, sering dibuang begitu saja sehingga menumpuk dan menghasilkan bau tidak sedap. Jika tidak dikelola, limbah ini dapat meningkatkan volume sampah dan mencemari lingkungan. Salah satu solusi ramah lingkungan untuk mengolah limbah kulit buah adalah membuat eco-enzyme. Eco-enzyme merupakan cairan hasil fermentasi limbah organik yang bermanfaat sebagai pembersih alami, penyubur tanaman, dan pengurang bau. Melalui proses sederhana, limbah kulit buah dapat diubah menjadi produk yang berguna.\n\nAlat dan Bahan\n• Kulit buah segar\n• Gula merah atau gula pasir\n• Air bersih\n\nLangkah-Langkah\n1. Takar gula, kulit buah, dan air menggunakan timbangan dengan perbandingan 1:3:10.\n2. Potong kulit buah dengan pisau menjadi bagian kecil agar proses fermentasi lebih cepat.\n3. Masukkan gula ke dalam botol plastik lalu tambahkan kulit buah.\n4. Tuang air bersih dengan corong sesuai komposisi dan sisakan sedikit ruang udara di bagian atas.\n5. Tutup botol dengan rapat lalu kocok perlahan selama beberapa detik untuk mencampurkan bahan.\n6. Fermentasikan selama 3 bulan di tempat teduh. Pada 1 minggu pertama, buka tutup botol setiap hari untuk mengeluarkan gas.\n7. Setelah 3 bulan, saring cairan dan simpan dalam botol bersih.\n8. Eco-enzyme siap digunakan.",
        "stimulus_img": "",
        "soal": "Apa makna kata limbah yang terdapat dalam teks tersebut?",
        "soal_img": "",
        "pilihan": [
            "Bahan sisa untuk proses fermentasi.",
            "Barang olahan sampah anorganik.",
            "Bahan yang menghasilkan bau.",
            "Barang yang harus diolah lagi."
        ],
        "jawaban": 0,
        "pembahasan": "Dalam konteks bacaan, limbah kulit buah digunakan sebagai bahan sisa yang difermentasi menjadi eco-enzyme."
    },
    {
        "id": "tka_smp_indo_tpm1_kulonprogo",
        "jenjang": "SMP",
        "mapel": "Bahasa Indonesia",
        "subtes": "TPM 1 - Kulonprogo",
        "tingkat": "Sedang",
        "topik": "Membaca Teks Berita",
        "stimulus": "Jalan Kaki: Solusi Sehat dengan Harga yang Murah\n\nJalan kaki merupakan jenis olahraga yang sangat sederhana, murah, dan mudah dilakukan oleh orang yang sehat jasmani serta rohani. Menurut American College of Sports Medicine (ACSM) aktivitas berjalan kaki merupakan bentuk aktivitas fisik yang direkomendasikan untuk dilakukan sehari-hari. Aktivitas berjalan kaki akan bermanfaat secara optimal apabila dilakukan sesuai rekomendasi ACSM, seperti bertelanjang kaki atau hanya dengan beralaskan sepatu bersol sangat tipis. Hal ini dapat membantu seseorang keluar dari pola hidup yang tidak aktif menjadi aktif.\n\nJalan kaki yang dilakukan dalam frekuensi tertentu dapat menurunkan risiko terkena penyakit metabolik, seperti diabetes melitus, kolesterol tinggi, hipertensi, dan penyakit jantung koroner. Aktivitas berjalan kaki akan menjadi efektif dan berguna bagi kesehatan jika dilakukan minimal 30 menit sebanyak 5 (lima) kali dalam seminggu (Isrofah, 2017).\n\nBerjalan kaki memiliki banyak manfaat terhadap kesehatan tubuh. Berjalan kaki berpengaruh terhadap kebugaran karena membantu menurunkan lemak dan memperkuat otot. Berjalan kaki 2 atau 3 kali dalam satu minggu dengan waktu paling sedikit 30 menit dapat meningkatkan ketahanan pembuluh jantung. Meningkatnya ketahanan jantung dan paru-paru dapat meningkatkan kemampuan untuk melaksanakan tugas-tugas harian tanpa merasa lelah.\n\nSelain itu, jalan kaki aman untuk semua umur dan dapat dilakukan di mana saja dan kapan saja tanpa meluangkan banyak waktu. Jalan kaki menyebabkan otot-otot jantung lebih kuat sehingga dapat memompa darah kembali menuju jantung dan menormalkan tekanan darah, yaitu saat terjadi tekanan darah tinggi. Olahraga jalan kaki juga aman bagi lansia karena kondisi lansia yang mengalami penurunan fungsi tubuh dan jalan kaki juga termasuk olahraga aman dan tidak terlalu berat (Harahap, 2023).\n\n(Dikutip dengan penyesuaian dari fkm.unair.ac.id)",
        "stimulus_img": "",
        "soal": "Kesimpulan yang tepat sesuai dengan teks tersebut adalah...",
        "soal_img": "",
        "pilihan": [
            "Jalan kaki merupakan olahraga yang bermanfaat dan praktis.",
            "Jalan kaki dapat mendukung kebugaran dan kekuatan tubuh.",
            "Jalan kaki dapat meningkatkan kesehatan jantung dan paru-paru.",
            "Jalan kaki aman dilakukan oleh semua orang di mana dan kapan saja."
        ],
        "jawaban": 0,
        "pembahasan": "Kesimpulan yang mencakup keseluruhan isi teks dari awal hingga akhir adalah jalan kaki merupakan olahraga yang sangat bermanfaat (menurunkan risiko penyakit, menguatkan otot, dll) dan praktis (sederhana, murah, dapat dilakukan kapan saja)."
    },
    {
        "id": "tka_smp_mat_tpm1_ubin",
        "jenjang": "SMP",
        "mapel": "Matematika",
        "subtes": "TPM 1 - Sleman",
        "tingkat": "Sulit / HOTS",
        "topik": "Aljabar",
        "stimulus": "Ubin Aljabar\nDalam matematika, ubin aljabar sering digunakan untuk memvisualisasikan perkalian polinomial dan faktorisasi. Susunan ubin di bawah ini merepresentasikan perkalian dari (ax + 2)(x - b).",
        "stimulus_img": "",
        "soal": "Perhatikan ubin aljabar berikut ini.\nUbin aljabar di atas dapat diuraikan menjadi (ax + 2)(x - b) = 3x² + cx - 6.\nPernyataan yang benar adalah ….\n\n1. Nilai a = 3.\n2. Nilai b = -3\n3. Nilai c = -7\n4. Nilai 2a + b - c = 2",
        "soal_img": "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Crect x='20' y='20' width='100' height='100' fill='%233b82f6' stroke='white' stroke-width='2'/%3E%3Ctext x='70' y='75' fill='white' font-family='sans-serif' font-size='16' text-anchor='middle'%3Ex%C2%B2%3C/text%3E%3Crect x='120' y='20' width='100' height='100' fill='%233b82f6' stroke='white' stroke-width='2'/%3E%3Ctext x='170' y='75' fill='white' font-family='sans-serif' font-size='16' text-anchor='middle'%3Ex%C2%B2%3C/text%3E%3Crect x='220' y='20' width='100' height='100' fill='%233b82f6' stroke='white' stroke-width='2'/%3E%3Ctext x='270' y='75' fill='white' font-family='sans-serif' font-size='16' text-anchor='middle'%3Ex%C2%B2%3C/text%3E%3Crect x='320' y='20' width='30' height='100' fill='%2322c55e' stroke='white' stroke-width='2'/%3E%3Ctext x='335' y='75' fill='white' font-family='sans-serif' font-size='16' text-anchor='middle'%3Ex%3C/text%3E%3Crect x='350' y='20' width='30' height='100' fill='%2322c55e' stroke='white' stroke-width='2'/%3E%3Ctext x='365' y='75' fill='white' font-family='sans-serif' font-size='16' text-anchor='middle'%3Ex%3C/text%3E%3Crect x='20' y='120' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='70' y='138' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='120' y='120' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='170' y='138' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='220' y='120' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='270' y='138' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='320' y='120' width='30' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='335' y='138' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-1%3C/text%3E%3Crect x='350' y='120' width='30' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='365' y='138' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-1%3C/text%3E%3C!-- row 2 --%3E%3Crect x='20' y='145' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='70' y='163' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='120' y='145' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='170' y='163' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='220' y='145' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='270' y='163' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='320' y='145' width='30' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='335' y='163' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-1%3C/text%3E%3Crect x='350' y='145' width='30' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='365' y='163' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-1%3C/text%3E%3C!-- row 3 --%3E%3Crect x='20' y='170' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='70' y='188' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='120' y='170' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='170' y='188' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='220' y='170' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='270' y='188' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='320' y='170' width='30' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='335' y='188' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-1%3C/text%3E%3Crect x='350' y='170' width='30' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='365' y='188' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-1%3C/text%3E%3C/svg%3E",
        "pilihan": [
            "1 dan 2",
            "1 dan 4",
            "2 dan 3",
            "1 dan 3"
        ],
        "jawaban": 3,
        "pembahasan": "Dari ubin, hasil totalnya adalah: 3x² + 2x - 9x - 6 = 3x² - 7x - 6.\nArtinya cx = -7x, sehingga c = -7.\nDiketahui juga dari faktorisasi, a = 3 dan b = 3. Maka:\n1. Nilai a = 3 (Benar)\n2. Nilai b = 3, bukan -3 (Salah)\n3. Nilai c = -7 (Benar)\n4. 2a + b - c = 2(3) + 3 - (-7) = 6 + 3 + 7 = 16 (Salah)\nMaka pernyataan yang benar adalah 1 dan 3."
    }
];

let html = fs.readFileSync('index.html', 'utf8');

// Find the DEFAULT_QUESTIONS array and append
const qString = newQuestions.map(q => JSON.stringify(q, null, 4)).join(',\n    ') + ',';
html = html.replace('const DEFAULT_QUESTIONS = [', 'const DEFAULT_QUESTIONS = [\n    ' + qString);

fs.writeFileSync('index.html', html);
console.log("Successfully patched index.html with detailed text passages.");
