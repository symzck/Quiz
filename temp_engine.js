32:function generateDynamicQuestions(jenjang, mapel, jurusan, topikTerpilih = [], riwayat = [], count = 10) {
33-  const seed = Date.now() + Math.floor(Math.random() * 100000);
34-  const targetCount = Math.max(5, Math.min(30, parseInt(count) || 10));
35-
36-  const standardBank = {
37-    "Penalaran Matematika": [
38-      (s, idx) => {
39-        const tarifDasar = 10000 + (s % 5) * 2000;
40-        const tarifPerKm = 3000 + (s % 4) * 500;
41-        const diskonPersen = 20 + (s % 3) * 5;
42-        const jarak = 12 + (s % 8);
43-        const biayaAwal = tarifDasar + (jarak * tarifPerKm);
44-        const potongan = Math.round(biayaAwal * (diskonPersen / 100));
45-        const biayaAkhir = biayaAwal - potongan;
46-        return {
47-          subtes: "Penalaran Matematika",
48-          stimulus: `Sebuah platform transportasi online menerapkan skema tarif perjalanan: Tarif awal (buka pintu) sebesar Rp${tarifDasar.toLocaleString('id-ID')} dan tarif per kilometer sebesar Rp${tarifPerKm.toLocaleString('id-ID')}. Dalam rangka promosi hari pendidikan, diberikan voucher diskon sebesar ${diskonPersen}% dari total biaya perjalanan sebelum biaya layanan tambahan.`,
49-          soal: `Seorang siswa menempuh perjalanan sejauh ${jarak} km dari rumah menuju lokasi ujian TKA dengan menggunakan voucher promosi tersebut. Berapakah total biaya yang harus dibayar siswa setelah diskon?`,
50-          pilihan: [
51-            `Rp${biayaAkhir.toLocaleString('id-ID')}`,
52-            `Rp${biayaAwal.toLocaleString('id-ID')}`,
53-            `Rp${(biayaAkhir + 4000).toLocaleString('id-ID')}`,
54-            `Rp${(biayaAkhir - 3000).toLocaleString('id-ID')}`,
55-            `Rp${(biayaAwal - 10000).toLocaleString('id-ID')}`
56-          ],
57-          jawaban: 0,
58-          pembahasan: `Langkah 1: Biaya normal = Tarif Dasar + (Jarak × Tarif/km) = ${tarifDasar} + (${jarak} × ${tarifPerKm}) = Rp${biayaAwal.toLocaleString('id-ID')}.\nLangkah 2: Potongan diskon = ${diskonPersen}% × Rp${biayaAwal.toLocaleString('id-ID')} = Rp${potongan.toLocaleString('id-ID')}.\nLangkah 3: Biaya akhir = Rp${biayaAwal.toLocaleString('id-ID')} - Rp${potongan.toLocaleString('id-ID')} = Rp${biayaAkhir.toLocaleString('id-ID')}.`,
59-          topik: "Pemodelan Aljabar & Fungsi Tarif Linier",
60-          tingkat: "Sulit / HOTS"
61-        };
62-      },
63-      (s, idx) => {
64-        const kapasitas = 1200 + (s % 6) * 200;
65-        const debitMasuk = 40 + (s % 5) * 10;
66-        const debitKeluar = 15 + (s % 3) * 5;
67-        const netDebit = debitMasuk - debitKeluar;
68-        const waktuMenit = Math.round(kapasitas / netDebit);
69-        return {
70-          subtes: "Penalaran Matematika",
71-          stimulus: `Sebuah bak penampungan air cadangan di laboratorium sekolah berkapasitas ${kapasitas} liter mula-mula dalam keadaan kosong. Keran pengisi air dibuka dengan debit konstan ${debitMasuk} liter/menit, namun pada saat bersamaan terdapat pipa distribusi yang mengeluarkan air dengan debit ${debitKeluar} liter/menit.`,
72-          soal: `Berapakah waktu yang dibutuhkan agar bak penampungan tersebut terisi penuh sampai batas maksimum kapasitasnya?`,
73-          pilihan: [
74-            `${waktuMenit} menit`,
75-            `${Math.round(kapasitas / debitMasuk)} menit`,
76-            `${waktuMenit + 12} menit`,
77-            `${waktuMenit - 8} menit`,
78-            `${Math.round(kapasitas / debitKeluar)} menit`
79-          ],
80-          jawaban: 0,
81-          pembahasan: `Debit pengisian neto = Debit Masuk - Debit Keluar = ${debitMasuk} - ${debitKeluar} = ${netDebit} liter/menit.\nWaktu pengisian t = Kapasitas / Debit Neto = ${kapasitas} / ${netDebit} = ${waktuMenit} menit.`,
82-          topik: "Laju Perubahan & Perbandingan Terbalik",
83-          tingkat: "Sedang"
84-        };
85-      },
86-      (s, idx) => {
87-        const modal = 10000000;
88-        const marginUntung = 25;
89-        const hargaJualTotal = modal * (1 + marginUntung/100);
90-        const jumlahUnit = 50 + (s % 4) * 10;
91-        const hargaPerUnit = hargaJualTotal / jumlahUnit;
92-        return {
93-          subtes: "Penalaran Matematika",
94-          stimulus: `Koperasi unit produksi siswa mengeluarkan modal produksi sebesar Rp${modal.toLocaleString('id-ID')} untuk memproduksi ${jumlahUnit} buah seragam batik khas nusantara. Koperasi menargetkan perolehan keuntungan bersih sebesar ${marginUntung}% dari seluruh modal produksi yang telah dikeluarkan.`,
95-          soal: `Berapakah harga jual minimum untuk setiap satu stel seragam batik agar target laba tercapai jika seluruh produk terjual habis?`,
96-          pilihan: [
97-            `Rp${hargaPerUnit.toLocaleString('id-ID')}`,
98-            `Rp${(hargaPerUnit - 25000).toLocaleString('id-ID')}`,
99-            `Rp${(hargaPerUnit + 30000).toLocaleString('id-ID')}`,
100-            `Rp${(modal / jumlahUnit).toLocaleString('id-ID')}`,
101-            `Rp${(hargaPerUnit + 50000).toLocaleString('id-ID')}`
102-          ],
103-          jawaban: 0,
104-          pembahasan: `Total penerimaan yang diharapkan = Modal × (1 + 25%) = Rp${hargaJualTotal.toLocaleString('id-ID')}.\nHarga per unit = Rp${hargaJualTotal.toLocaleString('id-ID')} / ${jumlahUnit} = Rp${hargaPerUnit.toLocaleString('id-ID')}.`,
105-          topik: "Aritmatika Sosial & Target Titik Impas",
106-          tingkat: "Sedang"
107-        };
108-      },
109-      (s, idx) => {
110-        const pAwal = 80 + (s % 4) * 5;
111-        const pKenaikan = 10;
112-        const pPenurunan = 10;
113-        const pAkhir = pAwal * (1 + pKenaikan/100) * (1 - pPenurunan/100);
114-        return {
115-          subtes: "Penalaran Matematika",
116-          stimulus: `Pada kuartal I, nilai indeks kepuasan pelayanan perpustakaan digital tercatat sebesar ${pAwal} poin. Pada kuartal II indeks tersebut mengalami kenaikan sebesar ${pKenaikan}%, namun pada kuartal III mengalami penurunan sebesar ${pPenurunan}% dari posisi kuartal II akibat gangguan server.`,
117-          soal: `Pernyataan yang paling tepat mengenai perbandingan indeks kepuasan pada kuartal III terhadap kondisi awal kuartal I adalah...`,
118-          pilihan: [
119-            `Indeks pada kuartal III lebih rendah 1% dibanding nilai awal kuartal I (menjadi ${pAkhir.toFixed(2)} poin).`,
120-            `Indeks pada kuartal III tepat sama dengan nilai awal kuartal I karena kenaikan dan penurunan persentase bernilai sama (10%).`,
121-            `Indeks pada kuartal III lebih tinggi 1% dibanding nilai awal kuartal I.`,
122-            `Indeks pada kuartal III mengalami penurunan drastis sebesar 10% dari kuartal I.`,
123-            `Indeks pada kuartal III tidak dapat ditentukan tanpa data jumlah responden.`
124-          ],
125-          jawaban: 0,
126-          pembahasan: `Nilai Kuartal II = ${pAwal} × 1.10 = ${(pAwal * 1.1).toFixed(2)}.\nNilai Kuartal III = ${(pAwal * 1.1).toFixed(2)} × 0.90 = ${pAkhir.toFixed(2)}.\nSecara persentase: (1 + 0.10) × (1 - 0.10) = 1 - 0.01 = 99% dari nilai awal (turun 1%).`,
127-          topik: "Persentase Perubahan Kumulatif",
128-          tingkat: "Sulit / HOTS"
129-        };
130-      }
131-    ],
132-    "Literasi Bahasa Indonesia": [
133-      (s, idx) => ({
134-        subtes: "Literasi Bahasa Indonesia",
135-        stimulus: `Wacana:\n"Penerapan teknologi kecerdasan buatan generatif di lingkungan akademik perguruan tinggi di Indonesia menimbulkan perdebatan dikotomis. Di satu sisi, AI mempercepat sintesis riset pustaka, pemodelan data empiris, dan koreksi tata bahasa bagi mahasiswa. Namun, survei Asosiasi Akademisi 2025 menunjukkan 48% dosen mengkhawatirkan erosi integritas akademik dan matinya kemampuan berpikir kritis-orisinil akibat ketergantungan berlebih terhadap luaran otomatis mesin tanpa verifikasi silang."`,
136-        soal: `Berdasarkan kutipan teks di atas, sikap objektif yang paling tepat untuk menjembatani persoalan pemanfaatan kecerdasan buatan dalam dunia akademik adalah...`,
137-        pilihan: [
138-          "Menerapkan regulasi etika pemanfaatan AI yang mewajibkan transparansi deklarasi penggunaan serta pengujian penalaran orisinil mahasiswa secara lisan/analisis kritis.",
139-          "Melarang penggunaan kecerdasan buatan sepenuhnya di lingkungan kampus guna melindungi keaslian karya tulis.",
140-          "Membiarkan mahasiswa menggunakan AI secara bebas tanpa batasan karena tuntutan perkembangan industri 5.0.",
141-          "Menghapus tugas karya tulis ilmiah dan menggantinya hanya dengan ujian tertulis pilihan ganda.",
142-          "Menjadikan AI sebagai penilai tunggal seluruh tugas akademik tanpa melibatkan dosen."
143-        ],
144-        jawaban: 0,
145-        pembahasan: "Solusi yang menjembatani kedua sisi pro dan kontra adalah regulasi etis dan penguatan verifikasi penalaran orisinil tanpa mematikan kemajuan teknologi.",
146-        topik: "Evaluasi Argumen & Sikap Kritis Wacana",
147-        tingkat: "Sulit / HOTS"
148-      }),
149-      (s, idx) => ({
150-        subtes: "Literasi Bahasa Indonesia",
151-        stimulus: `Wacana:\n"Kajian Pusat Konservasi Keanekaragaman Hayati menemukan bahwa hilangnya 30% kanopi hutan hujan tropis di lereng pegunungan memicu lonjakan limpasan air hujan hingga 4 kali lipat, yang pada gilirannya menyebabkan erosi hara permukaan tanah dan sedimentasi di waduk pembangkit listrik tenaga air (PLTA) di bagian hilir."`,
152-        soal: `Hubungan sebab-akibat (kausalitas bertingkat) yang paling akurat dari fenomena lingkungan pada bacaan tersebut adalah...`,
153-        pilihan: [
154-          "Deforestasi kanopi hutan → Peningkatan debit limpasan air → Erosi tanah & sedimentasi waduk hilir.",
155-          "Sedimentasi waduk hilir → Kerusakan turbin PLTA → Penurunan curah hujan pegunungan.",
156-          "Erosi tanah pegunungan → Pertumbuhan kanopi hutan baru → Peningkatan efisiensi PLTA.",
157-          "Pembangunan waduk PLTA → Hilangnya kanopi hutan pegunungan → Terjadinya gempa bumi.",
158-          "Ketiadaan hara tanah → Kenaikan kanopi hutan → Penurunan daya tampung air."
159-        ],
160-        jawaban: 0,
161-        pembahasan: "Rantai kausalitas bertingkat: Pengurangan tutupan kanopi menyebabkan air hujan langsung menjadi limpasan permukaan, memicu erosi hara tanah, lalu mengendap di waduk hilir.",
162-        topik: "Analisis Logika Kausalitas Teks Sains",
163-        tingkat: "Sedang"
164-      }),
165-      (s, idx) => ({
166-        subtes: "Literasi Bahasa Indonesia",
167-        stimulus: `Kutipan Teks:\n"Meskipun pemerintah telah meluncurkan berbagai program subsidi pupuk, tetapi produktivitas sebagian petani padi di pedalaman masih belum optimal karena keterbatasan akses terhadap benih unggul tahan kekeringan dan sistem irigasi teknis."`,
168-        soal: `Perbaikan kalimat di atas agar menjadi kalimat baku dan efektif sesuai kaidah EYD V adalah...`,
169-        pilihan: [
170-          "Menghilangkan konjungsi 'tetapi' karena konjungsi intrakalimat pertentangan tidak boleh dirangkap dengan konjungsi subordinatif konsesif 'meskipun'.",
171-          "Mengganti kata 'meskipun' dengan kata 'walau bagaimanapun juga'.",
172-          "Menambahkan tanda koma setelah kata 'pemerintah' dan 'produktivitas'.",
173-          "Mengubah kata 'keterbatasan' menjadi 'dibatasi'.",
174-          "Menghapus kata 'karena' dan menggantinya dengan kata 'sehingga'."
175-        ],
176-        jawaban: 0,
177-        pembahasan: "Penggabungan 'Meskipun ... tetapi ...' merupakan kesalahan struktur sintaksis (anak kalimat ganda tanpa induk kalimat). Konjungsi 'tetapi' harus dihilangkan.",
178-        topik: "Sintaksis & Kalimat Efektif EYD V",
179-        tingkat: "Sedang"
180-      })
181-    ],
182-    "Literasi Bahasa Inggris": [
183-      (s, idx) => ({
184-        subtes: "Literasi Bahasa Inggris",
185-        stimulus: `Passage:\n"Global transitions toward circular economy models have prompted manufacturing giants to redesign consumer electronics for modularity and reparability. By creating standardized snap-in components and providing open-source schematics, companies reduce electronic waste (e-waste) by an estimated 35%. Nonetheless, commercial barriers persist, as planned obsolescence historically generated consistent repeat-purchase revenue streams."`,
186-        soal: `According to the passage, why do some electronic manufacturers hesitate to fully adopt circular modular designs?`,
187-        pilihan: [
188-          "Because legacy business models relied heavily on planned obsolescence to secure recurring sales revenues.",
189-          "Because open-source schematics are legally prohibited in international trade.",
190-          "Because modular components are scientifically proven to increase toxic e-waste volume.",
191-          "Because consumer demand for repaired electronics has completely vanished worldwide.",
192-          "Because snap-in components require rare metals that are currently unavailable."
193-        ],
194-        jawaban: 0,
195-        pembahasan: "The passage explicitly mentions 'commercial barriers persist, as planned obsolescence historically generated consistent repeat-purchase revenue streams.'",
196-        topik: "Reading Comprehension & Critical Inference",
197-        tingkat: "Sulit / HOTS"
198-      }),
199-      (s, idx) => ({
200-        subtes: "Literasi Bahasa Inggris",
201-        stimulus: `Passage:\n"Recent oceanic satellite telemetry indicates an unprecedented 1.8°C thermal anomaly across tropical coral reef belts. Marine biologists warn that sustained thermal stress induces mass expulsion of photosynthetic zooxanthellae endosymbionts, precipitating coral bleaching events and jeopardizing pelagic nursery habitats."`,
202-        soal: `The author's primary purpose in writing this paragraph is to...`,
203-        pilihan: [
204-          "Explain the scientific mechanism linking rising sea temperatures to coral ecosystem degradation.",
205-          "Criticize the engineering flaws of oceanic satellite telemetry systems.",
206-          "Promote commercial deep-sea tourism in coral reef belts.",
207-          "Argue that photosynthetic zooxanthellae are harmful parasites to coral organisms.",
208-          "Demonstrate that marine species easily adapt to abrupt thermal shifts."
209-        ],
210-        jawaban: 0,
211-        pembahasan: "The text explains how elevated temperatures (thermal stress) cause algae expulsion, leading to coral bleaching and habitat loss.",
212-        topik: "Author Purpose & Textual Function",
213-        tingkat: "Sedang"
214-      })
215-    ],
216-    "TPS - Penalaran Umum (PU)": [
217-      (s, idx) => ({
218-        subtes: "TPS - Penalaran Umum",
219-        stimulus: `Premis:\n1. Semua peserta seleksi yang memiliki sertifikat keahlian digital ATAU memenangkan olimpiade sains nasional berhak mengikuti wawancara tahap akhir.\n2. Sebagian mahasiswa berprestasi yang berhak mengikuti wawancara tahap akhir mendapatkan tawaran beasiswa ikatan dinas.\n3. Arya memenangkan medali emas olimpiade sains nasional bidang astronomi.`,
220-        soal: `Berdasarkan tiga premis di atas, simpulan logis yang PASTI BENAR adalah...`,
221-        pilihan: [
222-          "Arya berhak mengikuti wawancara tahap akhir seleksi.",
223-          "Arya pasti mendapatkan tawaran beasiswa ikatan dinas.",
224-          "Arya pasti memiliki sertifikat keahlian digital.",
225-          "Arya menolak tawaran wawancara tahap akhir.",
226-          "Semua mahasiswa berprestasi pasti memenangkan olimpiade sains."
227-        ],
228-        jawaban: 0,
229-        pembahasan: "Premis 1 menggunakan disjungsi (ATAU). Karena Arya menang olimpiade sains (Premis 3), syarat cukup terpenuhi, maka Arya PASTI berhak mengikuti wawancara tahap akhir. Mengenai beasiswa (Premis 2) hanya berlaku untuk 'sebagian', sehingga tidak pasti untuk Arya.",
230-        topik: "Logika Deduktif & Silogisme Disjungtif",
231-        tingkat: "Sulit / HOTS"
232-      }),
233-      (s, idx) => {
234-        const a1 = 3 + (s % 3);
235-        const a2 = a1 * 2 + 1;
236-        const a3 = a2 * 2 + 1;
237-        const a4 = a3 * 2 + 1;
238-        const a5 = a4 * 2 + 1;
239-        const a6 = a5 * 2 + 1;
240-        return {
241-          subtes: "TPS - Penalaran Umum",
242-          stimulus: `Perhatikan barisan pola bilangan berikut: ${a1}, ${a2}, ${a3}, ${a4}, ${a5}, ...`,
243-          soal: `Angka yang tepat untuk mengisi suku berikutnya pada pola barisan tersebut adalah...`,
244-          pilihan: [
245-            `${a6}`,
246-            `${a5 * 2}`,
247-            `${a6 + 2}`,
248-            `${a6 - 4}`,
249-            `${a5 + 32}`
250-          ],
251-          jawaban: 0,
252-          pembahasan: `Pola barisan adalah U(n) = 2 × U(n-1) + 1.\nSuku berikutnya = 2 × ${a5} + 1 = ${a6}.`,
253-          topik: "Penalaran Induktif & Deret Logika Angka",
254-          tingkat: "Sedang"
255-        };
256-      }
257-    ],
258-    "TPS - Pengetahuan Kuantitatif (PK)": [
259-      (s, idx) => {
260-        const xVal = 3 + (s % 4);
261-        const yVal = 2 + (s % 3);
262-        const eq1 = 2 * xVal + 3 * yVal;
263-        const eq2 = 3 * xVal - yVal;
264-        const targetVal = 4 * xVal + 2 * yVal;
265-        return {
266-          subtes: "TPS - Pengetahuan Kuantitatif",
267-          stimulus: `Diketahui sistem persamaan linier dua variabel:\n2x + 3y = ${eq1}\n3x - y = ${eq2}`,
268-          soal: `Berdasarkan sistem persamaan tersebut, berapakah nilai dari ekspresi aljabar 4x + 2y?`,
269-          pilihan: [
270-            `${targetVal}`,
271-            `${targetVal + 6}`,
272-            `${targetVal - 4}`,
273-            `${targetVal * 2}`,
274-            `${targetVal - 10}`
275-          ],
276-          jawaban: 0,
277-          pembahasan: `Dengan eliminasi/substitusi didapatkan x = ${xVal} dan y = ${yVal}.\nMaka 4x + 2y = 4(${xVal}) + 2(${yVal}) = ${4 * xVal} + ${2 * yVal} = ${targetVal}.`,
278-          topik: "Sistem Persamaan Linier Dua Variabel",
279-          tingkat: "Sedang"
280-        };
281-      },
282-      (s, idx) => ({
283-        subtes: "TPS - Pengetahuan Kuantitatif",
284-        stimulus: `Soal Kecukupan Data:\nApakah nilai x > y?\n(1) x + y = 14\n(2) x - y = 4`,
285-        soal: `Tentukan apakah informasi pada pernyataan (1) dan (2) cukup untuk menjawab pertanyaan tersebut!`,
286-        pilihan: [
287-          "Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup.",
288-          "Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup.",
289-          "DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup.",
290-          "Pernyataan (1) SAJA cukup dan pernyataan (2) SAJA cukup.",
291-          "Pernyataan (1) dan pernyataan (2) tidak cukup untuk menjawab pertanyaan."
292-        ],
293-        jawaban: 0,
294-        pembahasan: "Dari pernyataan (2): x - y = 4 → x = y + 4. Karena 4 > 0, maka x pasti lebih besar dari y (x > y terjawab PASTI YA). Pernyataan (2) SAJA sudah cukup tanpa perlu tahu nilai mutlak x dan y.",
295-        topik: "Analisis Kecukupan Data (Data Sufficiency)",
296-        tingkat: "Sulit / HOTS"
297-      })
298-    ],
299-    "TKA Saintek (Fisika, Kimia, Biologi)": [
300-      (s, idx) => ({
301-        subtes: "TKA Saintek - Fisika",
302-        stimulus: `Studi Kasus Fisika:\nSebuah balok bermassa 5 kg ditarik dengan gaya konstan F = 40 N yang membentuk sudut elevasi 37° terhadap lantai mendatar yang kasar. Koefisien gesek kinetik antara balok dan lantai adalah μk = 0,2. (Gunakan sin 37° = 0,6; cos 37° = 0,8; g = 10 m/s²)`,
303-        soal: `Berapakah besar percepatan yang dialami balok saat bergerak mendatar?`,
304-        pilihan: [
305-          "5,36 m/s²",
306-          "4,80 m/s²",
307-          "6,40 m/s²",
308-          "3,20 m/s²",
309-          "2,50 m/s²"
310-        ],
311-        jawaban: 0,
312-        pembahasan: `Fx = F cos 37° = 40 × 0,8 = 32 N.\nFy = F sin 37° = 40 × 0,6 = 24 N.\nGaya Normal N = W - Fy = (5 × 10) - 24 = 26 N.\nGaya Gesek f_k = μk × N = 0,2 × 26 = 5,2 N.\nPercepatan a = (Fx - f_k) / m = (32 - 5,2) / 5 = 26,8 / 5 = 5,36 m/s².`,
313-        topik: "Dinamika Gerak & Hukum II Newton Bidang Datar",
314-        tingkat: "Sulit / HOTS"
315-      }),
316-      (s, idx) => ({
317-        subtes: "TKA Saintek - Kimia",
318-        stimulus: `Studi Kasus Kimia Analitik:\nSebanyak 100 mL larutan CH3COOH 0,1 M (Ka = 10^-5) dicampurkan dengan 50 mL larutan NaOH 0,1 M hingga membentuk larutan penyangga (buffer).`,
319-        soal: `Berapakah nilai pH dari larutan penyangga yang terbentuk setelah reaksi sempurna?`,
320-        pilihan: [
321-          "5",
322-          "4",
323-          "6",
324-          "9",
325-          "8 - log 2"
326-        ],
327-        jawaban: 0,
328-        pembahasan: `Mol CH3COOH = 100 mL × 0,1 M = 10 mmol.\nMol NaOH = 50 mL × 0,1 M = 5 mmol.\nSisa asam lemah CH3COOH = 10 - 5 = 5 mmol.\nTerbentuk garam CH3COONa = 5 mmol.\n[H+] = Ka × (sisa asam / garam) = 10^-5 × (5 / 5) = 10^-5 M.\npH = -log(10^-5) = 5.`,
329-        topik: "Larutan Penyangga & Stoikiometri Asam-Basa",
330-        tingkat: "Sedang"
331-      }),
332-      (s, idx) => ({
333-        subtes: "TKA Saintek - Biologi",
334-        stimulus: `Fenomena Genetika Molekuler:\nPada proses transkripsi sintesis protein, sekuens rantai DNA antisense memiliki urutan basa: 3'- TAC - CGA - TTT - ACT - 5'.`,
335-        soal: `Urutan kodon pada mRNA hasil transkripsi dan antikodon pada tRNA yang membawa asam amino pertama secara berurutan adalah...`,
336-        pilihan: [
337-          "mRNA: 5'- AUG - GCU - AAA - UGA - 3' ; Antikodon tRNA pertama: 3'- UAC - 5'",
338-          "mRNA: 5'- UAC - GCU - AAA - UGA - 3' ; Antikodon tRNA pertama: 3'- AUG - 5'",
339-          "mRNA: 3'- AUG - GCU - AAA - UGA - 5' ; Antikodon tRNA pertama: 5'- TAC - 3'",
340-          "mRNA: 5'- ATG - GCT - AAA - TGA - 3' ; Antikodon tRNA pertama: 3'- UAC - 5'",
341-          "mRNA: 5'- TAC - CGA - TTT - ACT - 3' ; Antikodon tRNA pertama: 3'- ATG - 5'"
342-        ],
343-        jawaban: 0,
344-        pembahasan: `Transkripsi dari antisense (3' ke 5') menghasilkan mRNA komplementer (5' ke 3'):\nTAC → AUG, CGA → GCU, TTT → AAA, ACT → UGA.\nKodon pertama mRNA adalah 5'-AUG-3' (kodon start metionin). Antikodon komplementer pada tRNA adalah 3'-UAC-5'.`,
345-        topik: "Sintesis Protein & Dogma Sentral Biologi",
346-        tingkat: "Sulit / HOTS"
347-      })
348-    ]
349-  };
350-
351-  // Pilih pool yang relevan berdasarkan mapel/jenjang
352-  let pool = [];
353-  if (mapel.includes("Matematika") || mapel.includes("Kuantitatif") || mapel.includes("Numerasi")) {
354-    pool = [...standardBank["Penalaran Matematika"], ...standardBank["TPS - Pengetahuan Kuantitatif (PK)"]];
355-  } else if (mapel.includes("Indonesia") || mapel.includes("Literasi")) {
356-    pool = [...standardBank["Literasi Bahasa Indonesia"]];
357-  } else if (mapel.includes("Inggris")) {
358-    pool = [...standardBank["Literasi Bahasa Inggris"]];
359-  } else if (mapel.includes("Fisika") || mapel.includes("Kimia") || mapel.includes("Biologi") || mapel.includes("IPA") || mapel.includes("IPAS")) {
360-    pool = [...standardBank["TKA Saintek (Fisika, Kimia, Biologi)"]];
361-  } else if (mapel.includes("Penalaran") || mapel.includes("TPS")) {
362-    pool = [...standardBank["TPS - Penalaran Umum (PU)"], ...standardBank["TPS - Pengetahuan Kuantitatif (PK)"]];
363-  } else {
364-    // Gabungan komprehensif
365-    pool = [
366-      ...standardBank["Penalaran Matematika"],
367-      ...standardBank["Literasi Bahasa Indonesia"],
368-      ...standardBank["Literasi Bahasa Inggris"],
369-      ...standardBank["TPS - Penalaran Umum (PU)"],
370-      ...standardBank["TPS - Pengetahuan Kuantitatif (PK)"],
371-      ...standardBank["TKA Saintek (Fisika, Kimia, Biologi)"]
372-    ];
373-  }
374-
375-  const list = [];
376-  for (let i = 0; i < targetCount; i++) {
377-    const generatorFn = pool[(i + seed) % pool.length];
378-    const generated = generatorFn(seed + i * 43, i + 1);
379-
380-    // Ambil opsi dari generator
381-    let rawOptions = [...generated.pilihan];
382-    let correctIdx = generated.jawaban;
383-
384-    // Sesuaikan jumlah opsi untuk SD dan SMP (maks 4 opsi)
385-    if ((jenjang === 'SD' || jenjang === 'SMP') && rawOptions.length > 4) {
386-      const correctText = rawOptions[correctIdx];
387-      rawOptions.splice(correctIdx, 1); 
388-      rawOptions = rawOptions.slice(0, 3); // Ambil 3 distraktor
389-      rawOptions.push(correctText); // Kembalikan jawaban benar
390-      correctIdx = 3;
391-    }
392-
393-    // Acak urutan pilihan jawaban
394-    const correctAnswerText = rawOptions[correctIdx];
395-
396-    const shuffledOptions = [...rawOptions];
397-    for (let j = shuffledOptions.length - 1; j > 0; j--) {
398-      const k = Math.floor(Math.random() * (j + 1));
399-      [shuffledOptions[j], shuffledOptions[k]] = [shuffledOptions[k], shuffledOptions[j]];
400-    }
401-    const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);
402-
403-    // Format soal standar TKA dengan wacana/stimulus jelas
404-    let soalFormatted = generated.soal;
405-    if (generated.stimulus) {
406-      soalFormatted = `[STIMULUS WACANA KASUS]\n${generated.stimulus}\n\n[PERTANYAAN ANALITIS]\n${generated.soal}`;
407-    }
408-
409-    list.push({
410-      id: `tka_${seed}_${i}`,
411-      jenjang,
412-      mapel,
413-      jurusan: jurusan || undefined,
414-      subtes: generated.subtes || `TKA ${mapel}`,
415-      soal: soalFormatted,
416-      pilihan: shuffledOptions,
417-      jawaban: newCorrectIndex !== -1 ? newCorrectIndex : 0,
418-      pembahasan: generated.pembahasan || "Pembahasan tertera pada konsep materi.",
419-      topik: (topikTerpilih && topikTerpilih[i % (topikTerpilih.length || 1)]) || generated.topik || "Penalaran TKA HOTS",
420-      tingkat: generated.tingkat || (i % 3 === 0 ? "Mudah" : (i % 3 === 1 ? "Sedang" : "Sulit / HOTS"))
421-    });
422-  }
423-
424-  return list;
425-}
426-
427-// Helper to safely extract JSON from Gemini output
428-function extractJsonFromText(text) {
429-  if (!text) return null;
430-  let clean = text.trim();
431-  
432-  if (clean.includes('```json')) {
