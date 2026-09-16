const fs = require('fs');

const questions = [
    {
        jenjang: "SMP",
        mapel: "Bahasa Indonesia",
        subtes: "TPM 2 - Kota Yogyakarta",
        tingkat: "Sedang",
        topik: "Membaca Teks Informasi",
        stimulus: "Kemegahan Taman Nasional Bromo Tengger Semeru\n\nKalian suka petualangan dan ingin merasakan suasana alam vulkanik yang menakjubkan? Jelajahi dan temukan pesona Bromo Tengger Semeru! Keindahan alamnya siap membuat perjalanan Kalian tak terlupakan.\n\nTaman Nasional Bromo Tengger Semeru adalah kawasan pegunungan di Jawa Timur yang terkenal sebagai rumah bagi flora dan fauna khas pegunungan. Hal ini disebabkan oleh adanya Gunung Semeru yang memiliki ketinggian 3.676 mdpl. Kawasan ini memiliki suhu udara antara 3—18°C pada malam hari. Selain itu, curah hujan yang tinggi membuat udaranya sejuk dan lembap.\n\nPemandangan menakjubkan di taman nasional siap memanjakan mata pengunjung. Lautan pasir yang luas di kaki Gunung Bromo, kawah aktif dengan asap putih yang mengepul, dan pemandangan matahari terbit merupakan daya tarik utama kawasan ini. Di beberapa bagian hutan, tumbuh cemara gunung dan pohon akasia. Selain itu, ada bunga edelweiss yang menjadi ikon alam pegunungan Bromo. Satwa seperti kijang, lutung budeng, dan berbagai burung endemik Jawa pun hidup di dalam kawasan hutan tersebut.\n\nAkses menuju kawasan taman nasional cukup mudah. Dari Malang atau Probolinggo, pengunjung dapat melanjutkan perjalanan menggunakan jeep. Ada beberapa titik wisata seperti Bromo, Bukit Teletubbies, dan Pasir Berbisik. Keindahan alam yang dramatis dan lanskap vulkanik yang khas membuat taman nasional ini menjadi salah satu destinasi alam memesona di Indonesia.",
        stimulus_img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bromo-Semeru-Batok-Widodaren.jpg/800px-Bromo-Semeru-Batok-Widodaren.jpg",
        soal: "Objek apakah yang menjadi ikon alam pegunungan Bromo?",
        soal_img: "",
        pil_a: "Burung endemik.",
        pil_b: "Bunga edelweiss.",
        pil_c: "Lutung budeng.",
        pil_d: "Cemara gunung.",
        jawaban: "1",
        pembahasan: "Berdasarkan paragraf ketiga, disebutkan bahwa 'ada bunga edelweiss yang menjadi ikon alam pegunungan Bromo.'"
    },
    {
        jenjang: "SMP",
        mapel: "Bahasa Indonesia",
        subtes: "TPM 2 - Kota Yogyakarta",
        tingkat: "Sulit",
        topik: "Membaca Teks Informasi",
        stimulus: "Kemegahan Taman Nasional Bromo Tengger Semeru\n\nKalian suka petualangan dan ingin merasakan suasana alam vulkanik yang menakjubkan? Jelajahi dan temukan pesona Bromo Tengger Semeru! Keindahan alamnya siap membuat perjalanan Kalian tak terlupakan.\n\nTaman Nasional Bromo Tengger Semeru adalah kawasan pegunungan di Jawa Timur yang terkenal sebagai rumah bagi flora dan fauna khas pegunungan. Hal ini disebabkan oleh adanya Gunung Semeru yang memiliki ketinggian 3.676 mdpl. Kawasan ini memiliki suhu udara antara 3—18°C pada malam hari. Selain itu, curah hujan yang tinggi membuat udaranya sejuk dan lembap.\n\nPemandangan menakjubkan di taman nasional siap memanjakan mata pengunjung. Lautan pasir yang luas di kaki Gunung Bromo, kawah aktif dengan asap putih yang mengepul, dan pemandangan matahari terbit merupakan daya tarik utama kawasan ini. Di beberapa bagian hutan, tumbuh cemara gunung dan pohon akasia. Selain itu, ada bunga edelweiss yang menjadi ikon alam pegunungan Bromo. Satwa seperti kijang, lutung budeng, dan berbagai burung endemik Jawa pun hidup di dalam kawasan hutan tersebut.\n\nAkses menuju kawasan taman nasional cukup mudah. Dari Malang atau Probolinggo, pengunjung dapat melanjutkan perjalanan menggunakan jeep. Ada beberapa titik wisata seperti Bromo, Bukit Teletubbies, dan Pasir Berbisik. Keindahan alam yang dramatis dan lanskap vulkanik yang khas membuat taman nasional ini menjadi salah satu destinasi alam memesona di Indonesia.",
        stimulus_img: "",
        soal: "Berbagai flora dan fauna khas pegunungan tinggal di Bromo Tengger Semeru. Mengapa kawasan tersebut dapat menjadi habitat flora dan fauna?",
        soal_img: "",
        pil_a: "Keindahan alam Bromo Tengger Semeru terasa dramatis karena lanskap vulkanik yang khas.",
        pil_b: "Suhu udara di kawasan Bromo Tengger Semeru dapat mencapai 3°C karena curah hujan tinggi.",
        pil_c: "Kawasan Bromo Tengger Semeru sejuk dan lembap karena suhu udara dingin serta curah hujan tinggi.",
        pil_d: "Taman Nasional Bromo Tengger Semeru berada di ketinggian 3.676 mdpl sehingga terasa dingin dan basah.",
        jawaban: "2",
        pembahasan: "Paragraf kedua menjelaskan bahwa kawasan ini menjadi rumah flora dan fauna khas karena memiliki suhu dingin (3-18 C) dan udaranya sejuk serta lembap akibat curah hujan tinggi."
    },
    {
        jenjang: "SMP",
        mapel: "Bahasa Indonesia",
        subtes: "TPM 2 - Kota Yogyakarta",
        tingkat: "Sedang",
        topik: "Teks Prosedur",
        stimulus: "Bagaimana Cara Membuat Eco-Enzyme dari Limbah Kulit Buah?\n\nLimbah organik rumah tangga, terutama kulit buah, sering dibuang begitu saja sehingga menumpuk dan menghasilkan bau tidak sedap. Jika tidak dikelola, limbah ini dapat meningkatkan volume sampah dan mencemari lingkungan. Salah satu solusi ramah lingkungan untuk mengolah limbah kulit buah adalah membuat eco-enzyme. Eco-enzyme merupakan cairan hasil fermentasi limbah organik yang bermanfaat sebagai pembersih alami, penyubur tanaman, dan pengurang bau. Melalui proses sederhana, limbah kulit buah dapat diubah menjadi produk yang berguna.\n\nAlat dan Bahan\n• Kulit buah segar\n• Gula merah atau gula pasir\n• Air bersih\n\nLangkah-Langkah\n1. Takar gula, kulit buah, dan air menggunakan timbangan dengan perbandingan 1:3:10.\n2. Potong kulit buah dengan pisau menjadi bagian kecil agar proses fermentasi lebih cepat.\n3. Masukkan gula ke dalam botol plastik lalu tambahkan kulit buah.\n4. Tuang air bersih dengan corong sesuai komposisi dan sisakan sedikit ruang udara di bagian atas.\n5. Tutup botol dengan rapat lalu kocok perlahan selama beberapa detik untuk mencampurkan bahan.\n6. Fermentasikan selama 3 bulan di tempat teduh. Pada 1 minggu pertama, buka tutup botol setiap hari untuk mengeluarkan gas.\n7. Setelah 3 bulan, saring cairan dan simpan dalam botol bersih.\n8. Eco-enzyme siap digunakan.",
        stimulus_img: "",
        soal: "Apa makna kata limbah yang terdapat dalam teks tersebut?",
        soal_img: "",
        pil_a: "Bahan sisa untuk proses fermentasi.",
        pil_b: "Barang olahan sampah anorganik.",
        pil_c: "Bahan yang menghasilkan bau.",
        pil_d: "Barang yang harus diolah lagi.",
        jawaban: "0",
        pembahasan: "Dalam konteks bacaan, limbah kulit buah digunakan sebagai bahan sisa yang difermentasi menjadi eco-enzyme."
    },
    {
        jenjang: "SMP",
        mapel: "Bahasa Indonesia",
        subtes: "TPM 1 - Kulonprogo",
        tingkat: "Sedang",
        topik: "Membaca Teks Berita",
        stimulus: "Jalan Kaki: Solusi Sehat dengan Harga yang Murah\n\nJalan kaki merupakan jenis olahraga yang sangat sederhana, murah, dan mudah dilakukan oleh orang yang sehat jasmani serta rohani. Menurut American College of Sports Medicine (ACSM) aktivitas berjalan kaki merupakan bentuk aktivitas fisik yang direkomendasikan untuk dilakukan sehari-hari. Aktivitas berjalan kaki akan bermanfaat secara optimal apabila dilakukan sesuai rekomendasi ACSM, seperti bertelanjang kaki atau hanya dengan beralaskan sepatu bersol sangat tipis. Hal ini dapat membantu seseorang keluar dari pola hidup yang tidak aktif menjadi aktif.\n\nJalan kaki yang dilakukan dalam frekuensi tertentu dapat menurunkan risiko terkena penyakit metabolik, seperti diabetes melitus, kolesterol tinggi, hipertensi, dan penyakit jantung koroner. Aktivitas berjalan kaki akan menjadi efektif dan berguna bagi kesehatan jika dilakukan minimal 30 menit sebanyak 5 (lima) kali dalam seminggu (Isrofah, 2017).\n\nBerjalan kaki memiliki banyak manfaat terhadap kesehatan tubuh. Berjalan kaki berpengaruh terhadap kebugaran karena membantu menurunkan lemak dan memperkuat otot. Berjalan kaki 2 atau 3 kali dalam satu minggu dengan waktu paling sedikit 30 menit dapat meningkatkan ketahanan pembuluh jantung. Meningkatnya ketahanan jantung dan paru-paru dapat meningkatkan kemampuan untuk melaksanakan tugas-tugas harian tanpa merasa lelah.\n\nSelain itu, jalan kaki aman untuk semua umur dan dapat dilakukan di mana saja dan kapan saja tanpa meluangkan banyak waktu. Jalan kaki menyebabkan otot-otot jantung lebih kuat sehingga dapat memompa darah kembali menuju jantung dan menormalkan tekanan darah, yaitu saat terjadi tekanan darah tinggi. Olahraga jalan kaki juga aman bagi lansia karena kondisi lansia yang mengalami penurunan fungsi tubuh dan jalan kaki juga termasuk olahraga aman dan tidak terlalu berat (Harahap, 2023).\n\n(Dikutip dengan penyesuaian dari fkm.unair.ac.id)",
        stimulus_img: "",
        soal: "Kesimpulan yang tepat sesuai dengan teks tersebut adalah...",
        soal_img: "",
        pil_a: "Jalan kaki merupakan olahraga yang bermanfaat dan praktis.",
        pil_b: "Jalan kaki dapat mendukung kebugaran dan kekuatan tubuh.",
        pil_c: "Jalan kaki dapat meningkatkan kesehatan jantung dan paru-paru.",
        pil_d: "Jalan kaki aman dilakukan oleh semua orang di mana dan kapan saja.",
        jawaban: "0",
        pembahasan: "Kesimpulan yang mencakup keseluruhan isi teks dari awal hingga akhir adalah jalan kaki merupakan olahraga yang sangat bermanfaat (menurunkan risiko penyakit, menguatkan otot, dll) dan praktis (sederhana, murah, dapat dilakukan kapan saja)."
    },
    {
        jenjang: "SMP",
        mapel: "Bahasa Indonesia",
        subtes: "TPM 1 - Kulonprogo",
        tingkat: "Sulit",
        topik: "Membaca Sastra / Cerpen",
        stimulus: "Bacalah kutipan cerita pendek berikut!\n\nLelaki jangkung berwajah terang yang membukakan pintu terlihat takjub begitu mengenali saya. Pastinya dia sama sekali tidak menyangka akan kedatangan saya yang tiba-tiba.\nKetika kemudian dengan keramahan yang tidak dibuat-buat dipersilakannya saya untuk masuk. Tanpa ragu-ragu saya memilih langsung menuju amben di seberang ruangan. Nikmat rasanya duduk di atas balai-balai bambu beralas tikar pandan itu. Dia pun lalu turut duduk, tetapi pandangannya justru diarahkan ke luar jendela, pada pohon-pohon cengkeh yang berderet seperti barisan murid kelas kami dahulu saat mengikuti upacara bendera setiap hari Senin. Saya paham, kejutan ini pastilah membuat hatinya diliputi keharuan yang tidak bisa diungkapkannya dengan kata-kata. Dia butuh untuk menetralisirnya sebentar.\nDia adalah sahabat masa kecil terbaik saya. Hampir 25 tahun lalu kami berpisah karena keluarga saya harus boyongan ke kota tempat kerja ayah yang baru di luar pulau hingga kembali beberapa tahun kemudian untuk menetap di kota kabupaten. Itu saya ceritakan padanya, sekaligus mengucapkan maaf karena sama sekali belum pernah menyambanginya sejak itu.\n”Jadi, apa yang membawamu kemari?”\n”Kenangan.”\n”Palsu! Kalau ini hanya soal kenangan, tidak perlu menunggu 10 tahun setelah keluargamu kembali dan menetap 30 kilometer saja dari sini.”\nSaya tersenyum. Hanya sebentar kecanggungan di antara kami sebelum kata-kata obrolan meluncur seperti peluru-peluru yang berebutan keluar dari magasin.\nBertemu dengannya, mau tidak mau mengingatkan kembali pada pengalaman kami dahulu. Pengalaman yang menjadikan dia, walau tidak setiap waktu, selalu lekat di ingatan saya. Tentu dia mengingatnya pula, bahkan saya yakin rasa yang diidapnya lebih besar efeknya. Karena sebagai seorang sahabat, dia jelas jauh lebih tulus dan setia daripada saya.\n\n(Dikutip dari cerpen “Seragam” Aris Kurniawan Basuki)",
        stimulus_img: "",
        soal: "Karakter tokoh lelaki jangkung yang tulus dalam bersahabat dalam kutipan cerita pendek tersebut diceritakan melalui ….",
        soal_img: "",
        pil_a: "dialog batiniah tokoh",
        pil_b: "diceritakan oleh tokoh lain",
        pil_c: "diceritakan langsung oleh pengarang",
        pil_d: "diceritakan melalui gambaran lingkungan tokoh",
        jawaban: "1",
        pembahasan: "Karakter tulus lelaki jangkung tersebut disampaikan oleh tokoh 'Saya' (tokoh lain) pada kalimat akhir: 'Karena sebagai seorang sahabat, dia jelas jauh lebih tulus dan setia daripada saya.'"
    },
    {
        jenjang: "SMP",
        mapel: "Matematika",
        subtes: "TPM 1 - Sleman",
        tingkat: "Sulit",
        topik: "Aljabar",
        stimulus: "Ubin Aljabar\nDalam matematika, ubin aljabar sering digunakan untuk memvisualisasikan perkalian polinomial dan faktorisasi. Susunan ubin di bawah ini merepresentasikan perkalian dari (ax + 2)(x - b).",
        stimulus_img: "",
        soal: "Perhatikan ubin aljabar berikut ini.\nUbin aljabar di atas dapat diuraikan menjadi (ax + 2)(x - b) = 3x² + cx - 6.\nPernyataan yang benar adalah ….\n\n1. Nilai a = 3.\n2. Nilai b = -3\n3. Nilai c = -7\n4. Nilai 2a + b - c = 2",
        soal_img: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Crect x='20' y='20' width='100' height='100' fill='%233b82f6' stroke='white' stroke-width='2'/%3E%3Ctext x='70' y='75' fill='white' font-family='sans-serif' font-size='16' text-anchor='middle'%3Ex%C2%B2%3C/text%3E%3Crect x='120' y='20' width='100' height='100' fill='%233b82f6' stroke='white' stroke-width='2'/%3E%3Ctext x='170' y='75' fill='white' font-family='sans-serif' font-size='16' text-anchor='middle'%3Ex%C2%B2%3C/text%3E%3Crect x='220' y='20' width='100' height='100' fill='%233b82f6' stroke='white' stroke-width='2'/%3E%3Ctext x='270' y='75' fill='white' font-family='sans-serif' font-size='16' text-anchor='middle'%3Ex%C2%B2%3C/text%3E%3Crect x='320' y='20' width='30' height='100' fill='%2322c55e' stroke='white' stroke-width='2'/%3E%3Ctext x='335' y='75' fill='white' font-family='sans-serif' font-size='16' text-anchor='middle'%3Ex%3C/text%3E%3Crect x='350' y='20' width='30' height='100' fill='%2322c55e' stroke='white' stroke-width='2'/%3E%3Ctext x='365' y='75' fill='white' font-family='sans-serif' font-size='16' text-anchor='middle'%3Ex%3C/text%3E%3Crect x='20' y='120' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='70' y='138' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='120' y='120' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='170' y='138' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='220' y='120' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='270' y='138' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='320' y='120' width='30' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='335' y='138' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-1%3C/text%3E%3Crect x='350' y='120' width='30' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='365' y='138' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-1%3C/text%3E%3C!-- row 2 --%3E%3Crect x='20' y='145' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='70' y='163' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='120' y='145' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='170' y='163' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='220' y='145' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='270' y='163' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='320' y='145' width='30' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='335' y='163' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-1%3C/text%3E%3Crect x='350' y='145' width='30' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='365' y='163' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-1%3C/text%3E%3C!-- row 3 --%3E%3Crect x='20' y='170' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='70' y='188' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='120' y='170' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='170' y='188' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='220' y='170' width='100' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='270' y='188' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-x%3C/text%3E%3Crect x='320' y='170' width='30' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='335' y='188' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-1%3C/text%3E%3Crect x='350' y='170' width='30' height='25' fill='%23ef4444' stroke='white' stroke-width='2'/%3E%3Ctext x='365' y='188' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'%3E-1%3C/text%3E%3C/svg%3E",
        pil_a: "1 dan 2",
        pil_b: "1 dan 4",
        pil_c: "2 dan 3",
        pil_d: "1 dan 3",
        jawaban: "1",
        pembahasan: "Dari ubin, hasil totalnya adalah: 3x² + 2x - 9x - 6 = 3x² - 7x - 6.\nArtinya cx = -7x, sehingga c = -7.\nDiketahui juga dari faktorisasi, a = 3 dan b = 3. Maka:\n1. Nilai a = 3 (Benar)\n2. Nilai b = 3, bukan -3 (Salah)\n3. Nilai c = -7 (Benar)\n4. 2a + b - c = 2(3) + 3 - (-7) = 6 + 3 + 7 = 16 (Salah)\nMaka pernyataan yang benar adalah 1 dan 3."
    },
    {
        jenjang: "SMP",
        mapel: "Matematika",
        subtes: "TPM 1 - Sleman",
        tingkat: "Sedang",
        topik: "Sistem Persamaan Linear",
        stimulus: "Sistem Persamaan Linear Dua Variabel sering digunakan untuk memecahkan masalah dalam kehidupan sehari-hari maupun soal analitis.",
        stimulus_img: "",
        soal: "Misalkan m dan n merupakan dua bilangan real sehingga sistem persamaan linear:\nmx + 3y = -1\n-x + ny = 14\nmempunyai penyelesaian (x, y) = (-4, 5).\n\nTentukan Benar atau Salah untuk pernyataan: 'm merupakan bilangan genap'!",
        soal_img: "",
        pil_a: "Benar",
        pil_b: "Salah",
        pil_c: "Informasi tidak cukup",
        pil_d: "Hanya berlaku jika n genap",
        jawaban: "1",
        pembahasan: "Substitusi x = -4 dan y = 5 ke persamaan pertama:\nm(-4) + 3(5) = -1\n-4m + 15 = -1\n-4m = -16\nm = 4 (genap). Jadi pernyataan m bilangan genap adalah Benar."
    }
];

const lines = ['jenjang,mapel,subtes,tingkat,topik,stimulus,stimulus_img,soal,soal_img,pil_a,pil_b,pil_c,pil_d,jawaban,pembahasan'];

questions.forEach(q => {
    const row = [
        q.jenjang,
        q.mapel,
        q.subtes,
        q.tingkat,
        q.topik,
        q.stimulus,
        q.stimulus_img,
        q.soal,
        q.soal_img,
        q.pil_a,
        q.pil_b,
        q.pil_c,
        q.pil_d,
        q.jawaban,
        q.pembahasan
    ].map(field => {
        if (field === null || field === undefined) return '""';
        let str = String(field);
        str = str.replace(/"/g, '""');
        if (str.search(/("|,|\n)/g) >= 0) str = `"${str}"`;
        return str;
    });
    lines.push(row.join(','));
});

fs.writeFileSync('Soal_Lengkap.csv', lines.join('\n'));
console.log('Soal_Lengkap.csv created.');
