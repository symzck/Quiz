import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side Gemini initialization
let aiClient = null;
function getAI() {
      if (req.body.useProceduralOnly) {
      const fallbackList = generateDynamicQuestions(jenjang, mapel, jurusan, topikTerpilih, riwayat, targetCount);
      return res.json({ 
        soal_list: fallbackList,
        source: 'dynamic_engine',
        message: `Kuis TKA berhasil dibuat (${fallbackList.length} butir soal penalaran prosedural).`
      });
    }
    
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
  const targetCount = Math.max(5, Math.min(30, parseInt(count) || 10));
  const list = [];
  
  for (let i = 0; i < targetCount; i++) {
    // Generate true randomness to avoid repetition
    const a = Math.floor(Math.random() * 50) + 10;
    const b = Math.floor(Math.random() * 50) + 10;
    const c = Math.floor(Math.random() * 20) + 2;
    const isMath = mapel.toLowerCase().includes("matematika") || mapel.toLowerCase().includes("kuantitatif") || mapel.toLowerCase().includes("fisika") || mapel.toLowerCase().includes("kimia");
    
    let soal = "";
    let stimulus = "";
    let jawabanText = "";
    let pilihan = [];
    let pembahasan = "";
    let topik = (topikTerpilih && topikTerpilih.length > 0) ? topikTerpilih[i % topikTerpilih.length] : "Analisis Akademik";

    if (isMath) {
      const type = Math.floor(Math.random() * 4);
      if (type === 0) {
        stimulus = `Sebuah koperasi sekolah membeli ${a} lusin buku tulis dengan harga Rp${b * 1000} per lusin. Kemudian buku tersebut dijual eceran dengan keuntungan ${c}%.`;
        soal = `Berapakah harga jual total seluruh buku tulis tersebut?`;
        const modal = a * b * 1000;
        const untung = modal * (c / 100);
        const total = modal + untung;
        jawabanText = `Rp${total.toLocaleString('id-ID')}`;
        pilihan = [jawabanText, `Rp${(total + 5000).toLocaleString('id-ID')}`, `Rp${(total - 2000).toLocaleString('id-ID')}`, `Rp${(modal).toLocaleString('id-ID')}`, `Rp${(total + 12000).toLocaleString('id-ID')}`];
        pembahasan = `Modal = ${a} × ${b * 1000} = ${modal}. Keuntungan = ${c}% × ${modal} = ${untung}. Total = ${total}.`;
      } else if (type === 1) {
        stimulus = `Dalam sebuah eksperimen laboratorium, suatu zat kimia bermassa ${a}00 gram meluruh sebesar ${c}% setiap jam.`;
        soal = `Berapa sisa massa zat kimia tersebut setelah 1 jam?`;
        const awal = a * 100;
        const sisa = awal * (1 - c / 100);
        jawabanText = `${sisa} gram`;
        pilihan = [jawabanText, `${sisa + 10} gram`, `${sisa - 5} gram`, `${awal - (awal * (c+5)/100)} gram`, `${sisa + 15} gram`];
        pembahasan = `Sisa = Massa Awal × (1 - persentase) = ${awal} × (1 - ${c / 100}) = ${sisa} gram.`;
      } else if (type === 2) {
        stimulus = `Sebuah bak penampungan air berbentuk balok memiliki panjang ${a} cm, lebar ${b} cm, dan tinggi ${c}0 cm.`;
        soal = `Berapakah volume maksimal air yang dapat ditampung dalam bak tersebut (dalam liter)?`;
        const volCm = a * b * (c * 10);
        const volLiter = volCm / 1000;
        jawabanText = `${volLiter} liter`;
        pilihan = [jawabanText, `${volLiter * 10} liter`, `${volLiter / 10} liter`, `${volLiter + 5} liter`, `${volLiter + 12} liter`];
        pembahasan = `Volume = ${a} × ${b} × ${c * 10} = ${volCm} cm³ = ${volLiter} liter.`;
      } else {
        stimulus = `Fungsi pendapatan harian sebuah usaha dirumuskan dengan f(x) = ${a}x - ${b}, dengan x adalah jumlah unit barang yang terjual.`;
        soal = `Jika hari ini terjual sebanyak ${c} unit barang, berapakah pendapatan usaha tersebut?`;
        const hasil = a * c - b;
        jawabanText = `${hasil}`;
        pilihan = [jawabanText, `${hasil + 10}`, `${hasil - a}`, `${hasil + b}`, `${hasil + 15}`];
        pembahasan = `Substitusi x = ${c} ke dalam fungsi: f(${c}) = ${a}(${c}) - ${b} = ${hasil}.`;
      }
    } else {
      const subjek = ["Pemerintah", "Kementerian", "Sekolah", "Masyarakat", "Ilmuwan", "Peneliti"][Math.floor(Math.random() * 6)];
      const objek = ["program pelestarian lingkungan", "inovasi teknologi digital", "metode pembelajaran baru", "sistem daur ulang sampah", "kebijakan energi terbarukan"][Math.floor(Math.random() * 5)];
      const dampak = ["meningkatkan efisiensi sebesar", "mengurangi emisi karbon hingga", "mempercepat proses adaptasi sekitar", "menurunkan tingkat polusi sebesar"][Math.floor(Math.random() * 4)];
      
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        stimulus = `Wacana Teks ${i + 1}:
Dalam laporan terbaru, ${subjek} telah menerapkan ${objek} yang diklaim dapat ${dampak} ${c}%. Kebijakan ini menuai respons positif, namun pelaksanaannya masih terhambat oleh kurangnya infrastruktur pendukung di wilayah pelosok.`;
        soal = `Berdasarkan wacana di atas, apa gagasan pokok (ide utama) dari paragraf tersebut?`;
        jawabanText = `Penerapan ${objek} oleh ${subjek} beserta dampak dan tantangannya.`;
        pilihan = [jawabanText, `Kurangnya infrastruktur di wilayah pelosok.`, `Klaim penurunan sebesar ${c}% yang diragukan.`, `Dukungan penuh tanpa syarat terhadap ${subjek}.`, `Tidak ada gagasan pokok yang jelas.`];
        pembahasan = `Gagasan pokok mencakup inti pembicaraan, yaitu inisiatif ${subjek} mengenai ${objek} dan tantangan infrastruktur yang menyertainya.`;
      } else if (type === 1) {
        stimulus = `Analisis Paragraf ${i + 1}:
"Meskipun ${subjek} berhasil menginisiasi ${objek}, banyak ahli berpendapat bahwa persentase keberhasilan yang menyentuh ${c}% masih belum cukup untuk mengatasi masalah fundamental."`;
        soal = `Kata hubung (konjungsi) 'Meskipun' pada awal kalimat di atas menunjukkan makna hubungan...`;
        jawabanText = `Pertentangan atau konsesi (perlawanan kondisi).`;
        pilihan = [jawabanText, `Penambahan informasi (aditif).`, `Sebab-akibat (kausalitas).`, `Pemilihan alternatif (disjungtif).`, `Syarat mutlak (kondisional).`];
        pembahasan = `Konjungsi 'meskipun', 'walaupun', 'kendatipun' menyatakan hubungan pertentangan atau konsesif antara klausa utama dan anak kalimat.`;
      } else {
        stimulus = `Studi Kasus Kontekstual ${i + 1}:
Laporan menunjukkan bahwa inisiatif ${objek} yang dipimpin ${subjek} mencatat ${b} kasus keberhasilan. Sayangnya, ada sekitar ${a} laporan kendala teknis.`;
        soal = `Kesimpulan logis yang paling tepat berdasarkan premis-premis di atas adalah...`;
        jawabanText = `Inisiatif tersebut menunjukkan hasil positif meskipun masih diwarnai oleh kendala teknis dalam pelaksanaannya.`;
        pilihan = [jawabanText, `Inisiatif tersebut sepenuhnya gagal dan harus dihentikan.`, `${subjek} tidak kompeten dalam menjalankan ${objek}.`, `Kendala teknis sebanyak ${a} kasus adalah hal yang wajar dan diabaikan.`, `Tidak ada kesimpulan yang bisa ditarik secara pasti.`];
        pembahasan = `Kesimpulan yang seimbang mengakui adanya rasio keberhasilan sekaligus mencatat adanya kendala tanpa mengambil lompatan logika ekstrem.`;
      }
    }

    // Shuffle options
    let rawOptions = [...pilihan];
    if (jenjang === 'SD' || jenjang === 'SMP') {
      rawOptions = rawOptions.slice(0, 4); // Maksimal 4 opsi
      if (!rawOptions.includes(jawabanText)) {
        rawOptions[3] = jawabanText;
      }
    }
    
    const shuffledOptions = [...rawOptions];
    for (let j = shuffledOptions.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [shuffledOptions[j], shuffledOptions[k]] = [shuffledOptions[k], shuffledOptions[j]];
    }
    
    let soalFormatted = soal;
    if (stimulus) {
      soalFormatted = `[STIMULUS WACANA KASUS]
${stimulus}

[PERTANYAAN ANALITIS]
${soal}`;
    }

    list.push({
      id: `tka_dyn_${Date.now()}_${i}_${Math.floor(Math.random()*1000)}`,
      jenjang,
      mapel,
      jurusan: jurusan || undefined,
      subtes: `TKA ${jenjang} - ${mapel}`,
      soal: soalFormatted,
      pilihan: shuffledOptions,
      jawaban: shuffledOptions.indexOf(jawabanText),
      pembahasan: pembahasan,
      topik: topik,
      tingkat: (i % 3 === 0 ? "Mudah" : (i % 3 === 1 ? "Sedang" : "Sulit / HOTS"))
    });
  }

  return list;
}

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
      console.log('GEMINI_API_KEY not configured, using rich dynamic TKA procedural engine.');
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
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.85,
        responseMimeType: "application/json"
      }
    });

    const rawText = response.text || '';
    const parsed = extractJsonFromText(rawText);

    if (!parsed || !parsed.soal_list || !Array.isArray(parsed.soal_list) || parsed.soal_list.length === 0) {
      console.log('AI output could not be parsed as JSON, falling back to dynamic procedural questions.');
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
      
      // Sesuaikan opsi jika AI berhalusinasi memberikan 5 opsi untuk SD/SMP
      if ((jenjang === 'SD' || jenjang === 'SMP') && choices.length > 4) {
        const correctText = choices[answerIdx];
        choices.splice(answerIdx, 1);
        choices = choices.slice(0, 3);
        choices.push(correctText);
        answerIdx = 3;
      }
      
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
    console.log('Gemini API quota exceeded or unavailable. Using fallback engine.');
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

// User status & system configuration endpoint
app.get('/api/user-status', (req, res) => {
  res.json({
    status: 'active',
    maxLimitPerDay: 5,
    serverTime: new Date().toISOString(),
    features: {
      aiGeneration: !!process.env.GEMINI_API_KEY,
      cloudDatabase: true
    }
  });
});

// Provide Firebase Config dynamically
app.get('/api/firebase-config', (req, res) => {
  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      const configRaw = fs.readFileSync(configPath, 'utf-8');
      const config = JSON.parse(configRaw);
      return res.json({ config, appId: "2bc4c10c-f0c1-41a6-a167-c736dab537e7" });
    }
    res.json({ config: null });
  } catch (err) {
    res.json({ config: null });
  }
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
