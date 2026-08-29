import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side Gemini initialization
let aiClient = null;
function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Kompilasi generator soal prosedural dinamis berstandar TKA (Tes Kemampuan Akademik & UTBK-SNBT)
function generateDynamicQuestions(jenjang, mapel, jurusan, topikTerpilih = [], riwayat = [], count = 10) {
  const seed = Date.now() + Math.floor(Math.random() * 100000);
  const targetCount = Math.max(5, Math.min(30, parseInt(count) || 10));

  const standardBank = {
    "Penalaran Matematika": [
      (s, idx) => {
        const tarifDasar = 10000 + (s % 5) * 2000;
        const tarifPerKm = 3000 + (s % 4) * 500;
        const diskonPersen = 20 + (s % 3) * 5;
        const jarak = 12 + (s % 8);
        const biayaAwal = tarifDasar + (jarak * tarifPerKm);
        const potongan = Math.round(biayaAwal * (diskonPersen / 100));
        const biayaAkhir = biayaAwal - potongan;
        return {
          subtes: "Penalaran Matematika",
          stimulus: `Sebuah platform transportasi online menerapkan skema tarif perjalanan: Tarif awal (buka pintu) sebesar Rp${tarifDasar.toLocaleString('id-ID')} dan tarif per kilometer sebesar Rp${tarifPerKm.toLocaleString('id-ID')}. Dalam rangka promosi hari pendidikan, diberikan voucher diskon sebesar ${diskonPersen}% dari total biaya perjalanan sebelum biaya layanan tambahan.`,
          soal: `Seorang siswa menempuh perjalanan sejauh ${jarak} km dari rumah menuju lokasi ujian TKA dengan menggunakan voucher promosi tersebut. Berapakah total biaya yang harus dibayar siswa setelah diskon?`,
          pilihan: [
            `Rp${biayaAkhir.toLocaleString('id-ID')}`,
            `Rp${biayaAwal.toLocaleString('id-ID')}`,
            `Rp${(biayaAkhir + 4000).toLocaleString('id-ID')}`,
            `Rp${(biayaAkhir - 3000).toLocaleString('id-ID')}`,
            `Rp${(biayaAwal - 10000).toLocaleString('id-ID')}`
          ],
          jawaban: 0,
          pembahasan: `Langkah 1: Biaya normal = Tarif Dasar + (Jarak × Tarif/km) = ${tarifDasar} + (${jarak} × ${tarifPerKm}) = Rp${biayaAwal.toLocaleString('id-ID')}.\nLangkah 2: Potongan diskon = ${diskonPersen}% × Rp${biayaAwal.toLocaleString('id-ID')} = Rp${potongan.toLocaleString('id-ID')}.\nLangkah 3: Biaya akhir = Rp${biayaAwal.toLocaleString('id-ID')} - Rp${potongan.toLocaleString('id-ID')} = Rp${biayaAkhir.toLocaleString('id-ID')}.`,
          topik: "Pemodelan Aljabar & Fungsi Tarif Linier",
          tingkat: "Sulit / HOTS"
        };
      },
      (s, idx) => {
        const kapasitas = 1200 + (s % 6) * 200;
        const debitMasuk = 40 + (s % 5) * 10;
        const debitKeluar = 15 + (s % 3) * 5;
        const netDebit = debitMasuk - debitKeluar;
        const waktuMenit = Math.round(kapasitas / netDebit);
        return {
          subtes: "Penalaran Matematika",
          stimulus: `Sebuah bak penampungan air cadangan di laboratorium sekolah berkapasitas ${kapasitas} liter mula-mula dalam keadaan kosong. Keran pengisi air dibuka dengan debit konstan ${debitMasuk} liter/menit, namun pada saat bersamaan terdapat pipa distribusi yang mengeluarkan air dengan debit ${debitKeluar} liter/menit.`,
          soal: `Berapakah waktu yang dibutuhkan agar bak penampungan tersebut terisi penuh sampai batas maksimum kapasitasnya?`,
          pilihan: [
            `${waktuMenit} menit`,
            `${Math.round(kapasitas / debitMasuk)} menit`,
            `${waktuMenit + 12} menit`,
            `${waktuMenit - 8} menit`,
            `${Math.round(kapasitas / debitKeluar)} menit`
          ],
          jawaban: 0,
          pembahasan: `Debit pengisian neto = Debit Masuk - Debit Keluar = ${debitMasuk} - ${debitKeluar} = ${netDebit} liter/menit.\nWaktu pengisian t = Kapasitas / Debit Neto = ${kapasitas} / ${netDebit} = ${waktuMenit} menit.`,
          topik: "Laju Perubahan & Perbandingan Terbalik",
          tingkat: "Sedang"
        };
      },
      (s, idx) => {
        const modal = 10000000;
        const marginUntung = 25;
        const hargaJualTotal = modal * (1 + marginUntung/100);
        const jumlahUnit = 50 + (s % 4) * 10;
        const hargaPerUnit = hargaJualTotal / jumlahUnit;
        return {
          subtes: "Penalaran Matematika",
          stimulus: `Koperasi unit produksi siswa mengeluarkan modal produksi sebesar Rp${modal.toLocaleString('id-ID')} untuk memproduksi ${jumlahUnit} buah seragam batik khas nusantara. Koperasi menargetkan perolehan keuntungan bersih sebesar ${marginUntung}% dari seluruh modal produksi yang telah dikeluarkan.`,
          soal: `Berapakah harga jual minimum untuk setiap satu stel seragam batik agar target laba tercapai jika seluruh produk terjual habis?`,
          pilihan: [
            `Rp${hargaPerUnit.toLocaleString('id-ID')}`,
            `Rp${(hargaPerUnit - 25000).toLocaleString('id-ID')}`,
            `Rp${(hargaPerUnit + 30000).toLocaleString('id-ID')}`,
            `Rp${(modal / jumlahUnit).toLocaleString('id-ID')}`,
            `Rp${(hargaPerUnit + 50000).toLocaleString('id-ID')}`
          ],
          jawaban: 0,
          pembahasan: `Total penerimaan yang diharapkan = Modal × (1 + 25%) = Rp${hargaJualTotal.toLocaleString('id-ID')}.\nHarga per unit = Rp${hargaJualTotal.toLocaleString('id-ID')} / ${jumlahUnit} = Rp${hargaPerUnit.toLocaleString('id-ID')}.`,
          topik: "Aritmatika Sosial & Target Titik Impas",
          tingkat: "Sedang"
        };
      },
      (s, idx) => {
        const pAwal = 80 + (s % 4) * 5;
        const pKenaikan = 10;
        const pPenurunan = 10;
        const pAkhir = pAwal * (1 + pKenaikan/100) * (1 - pPenurunan/100);
        return {
          subtes: "Penalaran Matematika",
          stimulus: `Pada kuartal I, nilai indeks kepuasan pelayanan perpustakaan digital tercatat sebesar ${pAwal} poin. Pada kuartal II indeks tersebut mengalami kenaikan sebesar ${pKenaikan}%, namun pada kuartal III mengalami penurunan sebesar ${pPenurunan}% dari posisi kuartal II akibat gangguan server.`,
          soal: `Pernyataan yang paling tepat mengenai perbandingan indeks kepuasan pada kuartal III terhadap kondisi awal kuartal I adalah...`,
          pilihan: [
            `Indeks pada kuartal III lebih rendah 1% dibanding nilai awal kuartal I (menjadi ${pAkhir.toFixed(2)} poin).`,
            `Indeks pada kuartal III tepat sama dengan nilai awal kuartal I karena kenaikan dan penurunan persentase bernilai sama (10%).`,
            `Indeks pada kuartal III lebih tinggi 1% dibanding nilai awal kuartal I.`,
            `Indeks pada kuartal III mengalami penurunan drastis sebesar 10% dari kuartal I.`,
            `Indeks pada kuartal III tidak dapat ditentukan tanpa data jumlah responden.`
          ],
          jawaban: 0,
          pembahasan: `Nilai Kuartal II = ${pAwal} × 1.10 = ${(pAwal * 1.1).toFixed(2)}.\nNilai Kuartal III = ${(pAwal * 1.1).toFixed(2)} × 0.90 = ${pAkhir.toFixed(2)}.\nSecara persentase: (1 + 0.10) × (1 - 0.10) = 1 - 0.01 = 99% dari nilai awal (turun 1%).`,
          topik: "Persentase Perubahan Kumulatif",
          tingkat: "Sulit / HOTS"
        };
      }
    ],
    "Literasi Bahasa Indonesia": [
      (s, idx) => ({
        subtes: "Literasi Bahasa Indonesia",
        stimulus: `Wacana:\n"Penerapan teknologi kecerdasan buatan generatif di lingkungan akademik perguruan tinggi di Indonesia menimbulkan perdebatan dikotomis. Di satu sisi, AI mempercepat sintesis riset pustaka, pemodelan data empiris, dan koreksi tata bahasa bagi mahasiswa. Namun, survei Asosiasi Akademisi 2025 menunjukkan 48% dosen mengkhawatirkan erosi integritas akademik dan matinya kemampuan berpikir kritis-orisinil akibat ketergantungan berlebih terhadap luaran otomatis mesin tanpa verifikasi silang."`,
        soal: `Berdasarkan kutipan teks di atas, sikap objektif yang paling tepat untuk menjembatani persoalan pemanfaatan kecerdasan buatan dalam dunia akademik adalah...`,
        pilihan: [
          "Menerapkan regulasi etika pemanfaatan AI yang mewajibkan transparansi deklarasi penggunaan serta pengujian penalaran orisinil mahasiswa secara lisan/analisis kritis.",
          "Melarang penggunaan kecerdasan buatan sepenuhnya di lingkungan kampus guna melindungi keaslian karya tulis.",
          "Membiarkan mahasiswa menggunakan AI secara bebas tanpa batasan karena tuntutan perkembangan industri 5.0.",
          "Menghapus tugas karya tulis ilmiah dan menggantinya hanya dengan ujian tertulis pilihan ganda.",
          "Menjadikan AI sebagai penilai tunggal seluruh tugas akademik tanpa melibatkan dosen."
        ],
        jawaban: 0,
        pembahasan: "Solusi yang menjembatani kedua sisi pro dan kontra adalah regulasi etis dan penguatan verifikasi penalaran orisinil tanpa mematikan kemajuan teknologi.",
        topik: "Evaluasi Argumen & Sikap Kritis Wacana",
        tingkat: "Sulit / HOTS"
      }),
      (s, idx) => ({
        subtes: "Literasi Bahasa Indonesia",
        stimulus: `Wacana:\n"Kajian Pusat Konservasi Keanekaragaman Hayati menemukan bahwa hilangnya 30% kanopi hutan hujan tropis di lereng pegunungan memicu lonjakan limpasan air hujan hingga 4 kali lipat, yang pada gilirannya menyebabkan erosi hara permukaan tanah dan sedimentasi di waduk pembangkit listrik tenaga air (PLTA) di bagian hilir."`,
        soal: `Hubungan sebab-akibat (kausalitas bertingkat) yang paling akurat dari fenomena lingkungan pada bacaan tersebut adalah...`,
        pilihan: [
          "Deforestasi kanopi hutan → Peningkatan debit limpasan air → Erosi tanah & sedimentasi waduk hilir.",
          "Sedimentasi waduk hilir → Kerusakan turbin PLTA → Penurunan curah hujan pegunungan.",
          "Erosi tanah pegunungan → Pertumbuhan kanopi hutan baru → Peningkatan efisiensi PLTA.",
          "Pembangunan waduk PLTA → Hilangnya kanopi hutan pegunungan → Terjadinya gempa bumi.",
          "Ketiadaan hara tanah → Kenaikan kanopi hutan → Penurunan daya tampung air."
        ],
        jawaban: 0,
        pembahasan: "Rantai kausalitas bertingkat: Pengurangan tutupan kanopi menyebabkan air hujan langsung menjadi limpasan permukaan, memicu erosi hara tanah, lalu mengendap di waduk hilir.",
        topik: "Analisis Logika Kausalitas Teks Sains",
        tingkat: "Sedang"
      }),
      (s, idx) => ({
        subtes: "Literasi Bahasa Indonesia",
        stimulus: `Kutipan Teks:\n"Meskipun pemerintah telah meluncurkan berbagai program subsidi pupuk, tetapi produktivitas sebagian petani padi di pedalaman masih belum optimal karena keterbatasan akses terhadap benih unggul tahan kekeringan dan sistem irigasi teknis."`,
        soal: `Perbaikan kalimat di atas agar menjadi kalimat baku dan efektif sesuai kaidah EYD V adalah...`,
        pilihan: [
          "Menghilangkan konjungsi 'tetapi' karena konjungsi intrakalimat pertentangan tidak boleh dirangkap dengan konjungsi subordinatif konsesif 'meskipun'.",
          "Mengganti kata 'meskipun' dengan kata 'walau bagaimanapun juga'.",
          "Menambahkan tanda koma setelah kata 'pemerintah' dan 'produktivitas'.",
          "Mengubah kata 'keterbatasan' menjadi 'dibatasi'.",
          "Menghapus kata 'karena' dan menggantinya dengan kata 'sehingga'."
        ],
        jawaban: 0,
        pembahasan: "Penggabungan 'Meskipun ... tetapi ...' merupakan kesalahan struktur sintaksis (anak kalimat ganda tanpa induk kalimat). Konjungsi 'tetapi' harus dihilangkan.",
        topik: "Sintaksis & Kalimat Efektif EYD V",
        tingkat: "Sedang"
      })
    ],
    "Literasi Bahasa Inggris": [
      (s, idx) => ({
        subtes: "Literasi Bahasa Inggris",
        stimulus: `Passage:\n"Global transitions toward circular economy models have prompted manufacturing giants to redesign consumer electronics for modularity and reparability. By creating standardized snap-in components and providing open-source schematics, companies reduce electronic waste (e-waste) by an estimated 35%. Nonetheless, commercial barriers persist, as planned obsolescence historically generated consistent repeat-purchase revenue streams."`,
        soal: `According to the passage, why do some electronic manufacturers hesitate to fully adopt circular modular designs?`,
        pilihan: [
          "Because legacy business models relied heavily on planned obsolescence to secure recurring sales revenues.",
          "Because open-source schematics are legally prohibited in international trade.",
          "Because modular components are scientifically proven to increase toxic e-waste volume.",
          "Because consumer demand for repaired electronics has completely vanished worldwide.",
          "Because snap-in components require rare metals that are currently unavailable."
        ],
        jawaban: 0,
        pembahasan: "The passage explicitly mentions 'commercial barriers persist, as planned obsolescence historically generated consistent repeat-purchase revenue streams.'",
        topik: "Reading Comprehension & Critical Inference",
        tingkat: "Sulit / HOTS"
      }),
      (s, idx) => ({
        subtes: "Literasi Bahasa Inggris",
        stimulus: `Passage:\n"Recent oceanic satellite telemetry indicates an unprecedented 1.8°C thermal anomaly across tropical coral reef belts. Marine biologists warn that sustained thermal stress induces mass expulsion of photosynthetic zooxanthellae endosymbionts, precipitating coral bleaching events and jeopardizing pelagic nursery habitats."`,
        soal: `The author's primary purpose in writing this paragraph is to...`,
        pilihan: [
          "Explain the scientific mechanism linking rising sea temperatures to coral ecosystem degradation.",
          "Criticize the engineering flaws of oceanic satellite telemetry systems.",
          "Promote commercial deep-sea tourism in coral reef belts.",
          "Argue that photosynthetic zooxanthellae are harmful parasites to coral organisms.",
          "Demonstrate that marine species easily adapt to abrupt thermal shifts."
        ],
        jawaban: 0,
        pembahasan: "The text explains how elevated temperatures (thermal stress) cause algae expulsion, leading to coral bleaching and habitat loss.",
        topik: "Author Purpose & Textual Function",
        tingkat: "Sedang"
      })
    ],
    "TPS - Penalaran Umum (PU)": [
      (s, idx) => ({
        subtes: "TPS - Penalaran Umum",
        stimulus: `Premis:\n1. Semua peserta seleksi yang memiliki sertifikat keahlian digital ATAU memenangkan olimpiade sains nasional berhak mengikuti wawancara tahap akhir.\n2. Sebagian mahasiswa berprestasi yang berhak mengikuti wawancara tahap akhir mendapatkan tawaran beasiswa ikatan dinas.\n3. Arya memenangkan medali emas olimpiade sains nasional bidang astronomi.`,
        soal: `Berdasarkan tiga premis di atas, simpulan logis yang PASTI BENAR adalah...`,
        pilihan: [
          "Arya berhak mengikuti wawancara tahap akhir seleksi.",
          "Arya pasti mendapatkan tawaran beasiswa ikatan dinas.",
          "Arya pasti memiliki sertifikat keahlian digital.",
          "Arya menolak tawaran wawancara tahap akhir.",
          "Semua mahasiswa berprestasi pasti memenangkan olimpiade sains."
        ],
        jawaban: 0,
        pembahasan: "Premis 1 menggunakan disjungsi (ATAU). Karena Arya menang olimpiade sains (Premis 3), syarat cukup terpenuhi, maka Arya PASTI berhak mengikuti wawancara tahap akhir. Mengenai beasiswa (Premis 2) hanya berlaku untuk 'sebagian', sehingga tidak pasti untuk Arya.",
        topik: "Logika Deduktif & Silogisme Disjungtif",
        tingkat: "Sulit / HOTS"
      }),
      (s, idx) => {
        const a1 = 3 + (s % 3);
        const a2 = a1 * 2 + 1;
        const a3 = a2 * 2 + 1;
        const a4 = a3 * 2 + 1;
        const a5 = a4 * 2 + 1;
        const a6 = a5 * 2 + 1;
        return {
          subtes: "TPS - Penalaran Umum",
          stimulus: `Perhatikan barisan pola bilangan berikut: ${a1}, ${a2}, ${a3}, ${a4}, ${a5}, ...`,
          soal: `Angka yang tepat untuk mengisi suku berikutnya pada pola barisan tersebut adalah...`,
          pilihan: [
            `${a6}`,
            `${a5 * 2}`,
            `${a6 + 2}`,
            `${a6 - 4}`,
            `${a5 + 32}`
          ],
          jawaban: 0,
          pembahasan: `Pola barisan adalah U(n) = 2 × U(n-1) + 1.\nSuku berikutnya = 2 × ${a5} + 1 = ${a6}.`,
          topik: "Penalaran Induktif & Deret Logika Angka",
          tingkat: "Sedang"
        };
      }
    ],
    "TPS - Pengetahuan Kuantitatif (PK)": [
      (s, idx) => {
        const xVal = 3 + (s % 4);
        const yVal = 2 + (s % 3);
        const eq1 = 2 * xVal + 3 * yVal;
        const eq2 = 3 * xVal - yVal;
        const targetVal = 4 * xVal + 2 * yVal;
        return {
          subtes: "TPS - Pengetahuan Kuantitatif",
          stimulus: `Diketahui sistem persamaan linier dua variabel:\n2x + 3y = ${eq1}\n3x - y = ${eq2}`,
          soal: `Berdasarkan sistem persamaan tersebut, berapakah nilai dari ekspresi aljabar 4x + 2y?`,
          pilihan: [
            `${targetVal}`,
            `${targetVal + 6}`,
            `${targetVal - 4}`,
            `${targetVal * 2}`,
            `${targetVal - 10}`
          ],
          jawaban: 0,
          pembahasan: `Dengan eliminasi/substitusi didapatkan x = ${xVal} dan y = ${yVal}.\nMaka 4x + 2y = 4(${xVal}) + 2(${yVal}) = ${4 * xVal} + ${2 * yVal} = ${targetVal}.`,
          topik: "Sistem Persamaan Linier Dua Variabel",
          tingkat: "Sedang"
        };
      },
      (s, idx) => ({
        subtes: "TPS - Pengetahuan Kuantitatif",
        stimulus: `Soal Kecukupan Data:\nApakah nilai x > y?\n(1) x + y = 14\n(2) x - y = 4`,
        soal: `Tentukan apakah informasi pada pernyataan (1) dan (2) cukup untuk menjawab pertanyaan tersebut!`,
        pilihan: [
          "Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup.",
          "Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup.",
          "DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup.",
          "Pernyataan (1) SAJA cukup dan pernyataan (2) SAJA cukup.",
          "Pernyataan (1) dan pernyataan (2) tidak cukup untuk menjawab pertanyaan."
        ],
        jawaban: 0,
        pembahasan: "Dari pernyataan (2): x - y = 4 → x = y + 4. Karena 4 > 0, maka x pasti lebih besar dari y (x > y terjawab PASTI YA). Pernyataan (2) SAJA sudah cukup tanpa perlu tahu nilai mutlak x dan y.",
        topik: "Analisis Kecukupan Data (Data Sufficiency)",
        tingkat: "Sulit / HOTS"
      })
    ],
    "TKA Saintek (Fisika, Kimia, Biologi)": [
      (s, idx) => ({
        subtes: "TKA Saintek - Fisika",
        stimulus: `Studi Kasus Fisika:\nSebuah balok bermassa 5 kg ditarik dengan gaya konstan F = 40 N yang membentuk sudut elevasi 37° terhadap lantai mendatar yang kasar. Koefisien gesek kinetik antara balok dan lantai adalah μk = 0,2. (Gunakan sin 37° = 0,6; cos 37° = 0,8; g = 10 m/s²)`,
        soal: `Berapakah besar percepatan yang dialami balok saat bergerak mendatar?`,
        pilihan: [
          "5,36 m/s²",
          "4,80 m/s²",
          "6,40 m/s²",
          "3,20 m/s²",
          "2,50 m/s²"
        ],
        jawaban: 0,
        pembahasan: `Fx = F cos 37° = 40 × 0,8 = 32 N.\nFy = F sin 37° = 40 × 0,6 = 24 N.\nGaya Normal N = W - Fy = (5 × 10) - 24 = 26 N.\nGaya Gesek f_k = μk × N = 0,2 × 26 = 5,2 N.\nPercepatan a = (Fx - f_k) / m = (32 - 5,2) / 5 = 26,8 / 5 = 5,36 m/s².`,
        topik: "Dinamika Gerak & Hukum II Newton Bidang Datar",
        tingkat: "Sulit / HOTS"
      }),
      (s, idx) => ({
        subtes: "TKA Saintek - Kimia",
        stimulus: `Studi Kasus Kimia Analitik:\nSebanyak 100 mL larutan CH3COOH 0,1 M (Ka = 10^-5) dicampurkan dengan 50 mL larutan NaOH 0,1 M hingga membentuk larutan penyangga (buffer).`,
        soal: `Berapakah nilai pH dari larutan penyangga yang terbentuk setelah reaksi sempurna?`,
        pilihan: [
          "5",
          "4",
          "6",
          "9",
          "8 - log 2"
        ],
        jawaban: 0,
        pembahasan: `Mol CH3COOH = 100 mL × 0,1 M = 10 mmol.\nMol NaOH = 50 mL × 0,1 M = 5 mmol.\nSisa asam lemah CH3COOH = 10 - 5 = 5 mmol.\nTerbentuk garam CH3COONa = 5 mmol.\n[H+] = Ka × (sisa asam / garam) = 10^-5 × (5 / 5) = 10^-5 M.\npH = -log(10^-5) = 5.`,
        topik: "Larutan Penyangga & Stoikiometri Asam-Basa",
        tingkat: "Sedang"
      }),
      (s, idx) => ({
        subtes: "TKA Saintek - Biologi",
        stimulus: `Fenomena Genetika Molekuler:\nPada proses transkripsi sintesis protein, sekuens rantai DNA antisense memiliki urutan basa: 3'- TAC - CGA - TTT - ACT - 5'.`,
        soal: `Urutan kodon pada mRNA hasil transkripsi dan antikodon pada tRNA yang membawa asam amino pertama secara berurutan adalah...`,
        pilihan: [
          "mRNA: 5'- AUG - GCU - AAA - UGA - 3' ; Antikodon tRNA pertama: 3'- UAC - 5'",
          "mRNA: 5'- UAC - GCU - AAA - UGA - 3' ; Antikodon tRNA pertama: 3'- AUG - 5'",
          "mRNA: 3'- AUG - GCU - AAA - UGA - 5' ; Antikodon tRNA pertama: 5'- TAC - 3'",
          "mRNA: 5'- ATG - GCT - AAA - TGA - 3' ; Antikodon tRNA pertama: 3'- UAC - 5'",
          "mRNA: 5'- TAC - CGA - TTT - ACT - 3' ; Antikodon tRNA pertama: 3'- ATG - 5'"
        ],
        jawaban: 0,
        pembahasan: `Transkripsi dari antisense (3' ke 5') menghasilkan mRNA komplementer (5' ke 3'):\nTAC → AUG, CGA → GCU, TTT → AAA, ACT → UGA.\nKodon pertama mRNA adalah 5'-AUG-3' (kodon start metionin). Antikodon komplementer pada tRNA adalah 3'-UAC-5'.`,
        topik: "Sintesis Protein & Dogma Sentral Biologi",
        tingkat: "Sulit / HOTS"
      })
    ]
  };

  // Pilih pool yang relevan berdasarkan mapel/jenjang
  let pool = [];
  if (mapel.includes("Matematika") || mapel.includes("Kuantitatif") || mapel.includes("Numerasi")) {
    pool = [...standardBank["Penalaran Matematika"], ...standardBank["TPS - Pengetahuan Kuantitatif (PK)"]];
  } else if (mapel.includes("Indonesia") || mapel.includes("Literasi")) {
    pool = [...standardBank["Literasi Bahasa Indonesia"]];
  } else if (mapel.includes("Inggris")) {
    pool = [...standardBank["Literasi Bahasa Inggris"]];
  } else if (mapel.includes("Fisika") || mapel.includes("Kimia") || mapel.includes("Biologi") || mapel.includes("IPA") || mapel.includes("IPAS")) {
    pool = [...standardBank["TKA Saintek (Fisika, Kimia, Biologi)"]];
  } else if (mapel.includes("Penalaran") || mapel.includes("TPS")) {
    pool = [...standardBank["TPS - Penalaran Umum (PU)"], ...standardBank["TPS - Pengetahuan Kuantitatif (PK)"]];
  } else {
    // Gabungan komprehensif
    pool = [
      ...standardBank["Penalaran Matematika"],
      ...standardBank["Literasi Bahasa Indonesia"],
      ...standardBank["Literasi Bahasa Inggris"],
      ...standardBank["TPS - Penalaran Umum (PU)"],
      ...standardBank["TPS - Pengetahuan Kuantitatif (PK)"],
      ...standardBank["TKA Saintek (Fisika, Kimia, Biologi)"]
    ];
  }

  const list = [];
  for (let i = 0; i < targetCount; i++) {
    const generatorFn = pool[(i + seed) % pool.length];
    const generated = generatorFn(seed + i * 43, i + 1);

    // Acak urutan pilihan jawaban
    const rawOptions = [...generated.pilihan];
    const correctAnswerText = rawOptions[generated.jawaban];

    const shuffledOptions = [...rawOptions];
    for (let j = shuffledOptions.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [shuffledOptions[j], shuffledOptions[k]] = [shuffledOptions[k], shuffledOptions[j]];
    }
    const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);

    // Format soal standar TKA dengan wacana/stimulus jelas
    let soalFormatted = generated.soal;
    if (generated.stimulus) {
      soalFormatted = `[STIMULUS WACANA KASUS]\n${generated.stimulus}\n\n[PERTANYAAN ANALITIS]\n${generated.soal}`;
    }

    list.push({
      id: `tka_${seed}_${i}`,
      jenjang,
      mapel,
      jurusan: jurusan || undefined,
      subtes: generated.subtes || `TKA ${mapel}`,
      soal: soalFormatted,
      pilihan: shuffledOptions,
      jawaban: newCorrectIndex !== -1 ? newCorrectIndex : 0,
      pembahasan: generated.pembahasan || "Pembahasan tertera pada konsep materi.",
      topik: (topikTerpilih && topikTerpilih[i % (topikTerpilih.length || 1)]) || generated.topik || "Penalaran TKA HOTS",
      tingkat: generated.tingkat || (i % 3 === 0 ? "Mudah" : (i % 3 === 1 ? "Sedang" : "Sulit / HOTS"))
    });
  }

  return list;
}

// Helper to safely extract JSON from Gemini output
function extractJsonFromText(text) {
  if (!text) return null;
  let clean = text.trim();
  
  if (clean.includes('```json')) {
    clean = clean.split('```json')[1].split('```')[0].trim();
  } else if (clean.includes('```')) {
    clean = clean.split('```')[1].split('```')[0].trim();
  }
  
  try {
    return JSON.parse(clean);
  } catch (err) {
    const firstBrace = clean.indexOf('{');
    const lastBrace = clean.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(clean.substring(firstBrace, lastBrace + 1));
      } catch (e) {}
    }
    const firstBracket = clean.indexOf('[');
    const lastBracket = clean.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket > firstBracket) {
      try {
        const arr = JSON.parse(clean.substring(firstBracket, lastBracket + 1));
        return { soal_list: arr };
      } catch (e) {}
    }
    return null;
  }
}

app.post('/api/generate-soal', async (req, res) => {
  try {
    const { 
      jenjang = 'SMA', 
      mapel = 'Matematika', 
      jurusan = null, 
      topikTerpilih = [], 
      riwayat = [],
      count = 10,
      jumlahSoal = 10
    } = req.body;

    const targetCount = Math.max(5, Math.min(30, parseInt(jumlahSoal || count) || 10));
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY not configured, using rich dynamic TKA procedural engine.');
      const fallbackList = generateDynamicQuestions(jenjang, mapel, jurusan, topikTerpilih, riwayat, targetCount);
      return res.json({ 
        soal_list: fallbackList,
        source: 'dynamic_engine',
        message: `Kuis TKA berhasil dibuat (${fallbackList.length} butir soal penalaran standar SNBT/TKA).`
      });
    }

    const ai = getAI();
    const timestamp = Date.now();
    const randomNonce = Math.random().toString(36).substring(7);

    // Penyesuaian instruksi dan standar kurikulum resmi Kemendikdasmen per jenjang (SD, SMP, SMA)
    const isSD = jenjang === 'SD';
    const isSMP = jenjang === 'SMP';
    const isSMA = jenjang === 'SMA';

    let kurikulumInstruksi = '';
    if (isSD) {
      kurikulumInstruksi = `
- Jenjang Pendidikan: SD / MI (Murid Kelas 6)
- Konteks Ujian: Standar Tes Kemampuan Akademik (TKA) Kemendikdasmen untuk pemetaan mutu dan penyetaraan capaian (Skala 0-100). Sifat tes opsional / tidak wajib.
- Mata Uji: ${mapel} (Hanya Bahasa Indonesia atau Matematika).
- Format Pilihan: 4 pilihan jawaban (A, B, C, D) yang ramah anak, kontekstual, dan mudah dipahami.`;
    } else if (isSMP) {
      kurikulumInstruksi = `
- Jenjang Pendidikan: SMP / MTs (Murid Kelas 9)
- Konteks Ujian: Standar Tes Kemampuan Akademik (TKA) Kemendikdasmen untuk pemetaan mutu dan penyetaraan capaian (Skala 0-100). Sifat tes opsional / tidak wajib. Catatan: SMP tidak menggunakan UTBK/SNBT.
- Mata Uji: ${mapel} (Hanya Bahasa Indonesia atau Matematika).
- Format Pilihan: 4 pilihan jawaban (A, B, C, D) dengan stimulus wacana atau pemecahan masalah kontekstual.`;
    } else if (isSMA) {
      kurikulumInstruksi = `
- Jenjang Pendidikan: SMA / MA / SMK (Murid Kelas 12 & Kelas 13 SMK 4 tahun)
- Konteks Ujian: Standar Tes Kemampuan Akademik (TKA) Kemendikdasmen (Skala 200 hingga 800) sebagai pertimbangan seleksi ke jenjang berikutnya (seperti SNBP / Jalur Mandiri PTN/PTS). Sifat tes opsional.
- Kelompok Mata Uji: ${jurusan === 'Wajib' ? 'Mata Uji Wajib (Bahasa Indonesia, Matematika, Bahasa Inggris)' : (jurusan === 'Saintek' ? 'Mata Uji Pilihan Sains & Teknologi (Matematika Tingkat Lanjut, Fisika, Kimia, Biologi)' : 'Mata Uji Pilihan Bahasa & Budaya (Sastra & Bahasa Indonesia, Bahasa Inggris Lanjutan)')}
- Mata Uji Spesifik: ${mapel}
- Format Pilihan: 5 pilihan jawaban (A, B, C, D, E) dengan HOTS (C4-C6), analisis wacana kritis, atau pemodelan matematis/sains mendalam.`;
    } else {
      kurikulumInstruksi = `
- Jenjang Pendidikan: ${jenjang}
- Konteks Ujian: Standar TKA Kemendikdasmen untuk mata pelajaran ${mapel}.`;
    }

    // Prompt berstandar tinggi
    const prompt = `Anda adalah tim penyusun soal resmi asesmen pendidikan nasional di bawah Kemendikdasmen RI.
Lakukan riset mendalam dengan Google Search untuk menyusun soal studi kasus kontekstual berstandar resmi TKA:
${kurikulumInstruksi}
- Kategori / Mata Pelajaran: ${mapel}
- Topik Pembelajaran: ${Array.isArray(topikTerpilih) && topikTerpilih.length > 0 ? topikTerpilih.join(', ') : 'Materi Esensial Kisi-kisi Kurikulum'}
- Target Jumlah Soal: TEPAT ${targetCount} (Dilarang kurang atau lebih dari ${targetCount} butir)
${Array.isArray(riwayat) && riwayat.length > 0 ? '- Larangan: HINDARI mengulang wacana/soal berikut: ' + riwayat.slice(-15).join('; ') : ''}
- Unique Session Identifier: ${randomNonce}_${timestamp}

PEDOMAN BAKU PENULISAN SOAL STANDAR TKA:
1. Setiap butir soal WAJIB menyertakan:
   - "stimulus": Narasi wacana komprehensif, data grafik/tabel verbal, atau situasi kontekstual yang melatarbelakangi masalah.
   - "soal": Pertanyaan analitis berbasis nalar dan pemecahan masalah (menghindari hafalan mentah).
   - "pilihan": ${isSMA ? '5 pilihan jawaban (A, B, C, D, E) yang homogen dan logis.' : '4 pilihan jawaban (A, B, C, D) yang homogen dan logis.'}
   - "jawaban": Angka indeks pilihan benar (0 untuk opsi A, 1 untuk opsi B, dst).
   - "pembahasan": Langkah penyelesaian analitis, konsep materi, serta penjelasan mengapa opsi salah tereliminasi.
   - "tingkat": "Mudah", "Sedang", atau "Sulit / HOTS".
   - "subtes": "TKA ${jenjang} - ${mapel}".

2. Format Keluaran WAJIB JSON murni:
{
  "soal_list": [
    {
      "subtes": "TKA ${jenjang} - ${mapel}",
      "stimulus": "Narasi wacana studi kasus...",
      "soal": "Pertanyaan analitis...",
      "pilihan": ${isSMA ? '["Opsi A", "Opsi B", "Opsi C", "Opsi D", "Opsi E"]' : '["Opsi A", "Opsi B", "Opsi C", "Opsi D"]'},
      "jawaban": 0,
      "pembahasan": "Penjelasan konsep dan solusi langkah demi langkah...",
      "topik": "Nama Topik",
      "tingkat": "Sedang"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.85,
      }
    });

    const rawText = response.text || '';
    const parsed = extractJsonFromText(rawText);

    if (!parsed || !parsed.soal_list || !Array.isArray(parsed.soal_list) || parsed.soal_list.length === 0) {
      console.warn('AI output could not be parsed as JSON, falling back to dynamic procedural questions.');
      const fallbackList = generateDynamicQuestions(jenjang, mapel, jurusan, topikTerpilih, riwayat, targetCount);
      return res.json({ 
        soal_list: fallbackList, 
        source: 'dynamic_engine_recovery' 
      });
    }

    // Sanitasi dan format soal hasil AI
    const sanitizedList = parsed.soal_list.map((item, idx) => {
      let choices = Array.isArray(item.pilihan) && item.pilihan.length >= 4 ? item.pilihan : ["Opsi A", "Opsi B", "Opsi C", "Opsi D"];
      let answerIdx = typeof item.jawaban === 'number' && item.jawaban >= 0 && item.jawaban < choices.length ? item.jawaban : 0;
      
      let fullSoal = item.soal || `Soal HOTS ${idx + 1}`;
      if (item.stimulus && !fullSoal.includes(item.stimulus)) {
        fullSoal = `[STIMULUS WACANA KASUS]\n${item.stimulus}\n\n[PERTANYAAN ANALITIS]\n${fullSoal}`;
      }

      return {
        id: `tka_ai_${timestamp}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
        jenjang,
        mapel,
        jurusan: jurusan || undefined,
        subtes: item.subtes || `TKA ${mapel}`,
        soal: fullSoal,
        pilihan: choices,
        jawaban: answerIdx,
        pembahasan: item.pembahasan || "Pembahasan tersedia pada kunci jawaban konsep materi.",
        topik: item.topik || "Penalaran TKA",
        tingkat: item.tingkat || (idx % 3 === 0 ? "Mudah" : (idx % 3 === 1 ? "Sedang" : "Sulit / HOTS"))
      };
    });

    // Jika AI menghasilkan jumlah yang kurang dari target, lengkapi dengan varian dinamis
    let finalList = sanitizedList;
    if (finalList.length < targetCount) {
      const extra = generateDynamicQuestions(jenjang, mapel, jurusan, topikTerpilih, riwayat, targetCount - finalList.length);
      finalList = [...finalList, ...extra];
    } else if (finalList.length > targetCount) {
      finalList = finalList.slice(0, targetCount);
    }

    return res.json({ 
      soal_list: finalList, 
      source: 'gemini_search_grounded',
      groundingInfo: response.candidates?.[0]?.groundingMetadata ? 'Active Google Search Grounding' : undefined
    });

  } catch (error) {
    console.error('Error in /api/generate-soal with Gemini:', error);
    const { jenjang = 'SMA', mapel = 'Matematika', jurusan = null, topikTerpilih = [], riwayat = [], count = 10, jumlahSoal = 10 } = req.body || {};
    const targetCount = Math.max(5, Math.min(30, parseInt(jumlahSoal || count) || 10));
    const fallbackList = generateDynamicQuestions(jenjang, mapel, jurusan, topikTerpilih, riwayat, targetCount);
    return res.json({ 
      soal_list: fallbackList,
      source: 'dynamic_engine_fallback',
      warning: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    grounding: 'googleSearch'
  });
});

// Serve static files from root
app.use(express.static(process.cwd()));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Quiz TKA server with Google Search Grounding running on http://0.0.0.0:${PORT}`);
});
