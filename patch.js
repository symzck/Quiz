import fs from 'fs';
let code = fs.readFileSync('server.js', 'utf8');

const startIdx = code.indexOf('function generateDynamicQuestions');
const endIdx = code.indexOf('function extractJsonFromText');

const newFunc = `function generateDynamicQuestions(jenjang, mapel, jurusan, topikTerpilih = [], riwayat = [], count = 10) {
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
        stimulus = \`Sebuah koperasi sekolah membeli \${a} lusin buku tulis dengan harga Rp\${b * 1000} per lusin. Kemudian buku tersebut dijual eceran dengan keuntungan \${c}%.\`;
        soal = \`Berapakah harga jual total seluruh buku tulis tersebut?\`;
        const modal = a * b * 1000;
        const untung = modal * (c / 100);
        const total = modal + untung;
        jawabanText = \`Rp\${total.toLocaleString('id-ID')}\`;
        pilihan = [jawabanText, \`Rp\${(total + 5000).toLocaleString('id-ID')}\`, \`Rp\${(total - 2000).toLocaleString('id-ID')}\`, \`Rp\${(modal).toLocaleString('id-ID')}\`, \`Rp\${(total + 12000).toLocaleString('id-ID')}\`];
        pembahasan = \`Modal = \${a} × \${b * 1000} = \${modal}. Keuntungan = \${c}% × \${modal} = \${untung}. Total = \${total}.\`;
      } else if (type === 1) {
        stimulus = \`Dalam sebuah eksperimen laboratorium, suatu zat kimia bermassa \${a}00 gram meluruh sebesar \${c}% setiap jam.\`;
        soal = \`Berapa sisa massa zat kimia tersebut setelah 1 jam?\`;
        const awal = a * 100;
        const sisa = awal * (1 - c / 100);
        jawabanText = \`\${sisa} gram\`;
        pilihan = [jawabanText, \`\${sisa + 10} gram\`, \`\${sisa - 5} gram\`, \`\${awal - (awal * (c+5)/100)} gram\`, \`\${sisa + 15} gram\`];
        pembahasan = \`Sisa = Massa Awal × (1 - persentase) = \${awal} × (1 - \${c / 100}) = \${sisa} gram.\`;
      } else if (type === 2) {
        stimulus = \`Sebuah bak penampungan air berbentuk balok memiliki panjang \${a} cm, lebar \${b} cm, dan tinggi \${c}0 cm.\`;
        soal = \`Berapakah volume maksimal air yang dapat ditampung dalam bak tersebut (dalam liter)?\`;
        const volCm = a * b * (c * 10);
        const volLiter = volCm / 1000;
        jawabanText = \`\${volLiter} liter\`;
        pilihan = [jawabanText, \`\${volLiter * 10} liter\`, \`\${volLiter / 10} liter\`, \`\${volLiter + 5} liter\`, \`\${volLiter + 12} liter\`];
        pembahasan = \`Volume = \${a} × \${b} × \${c * 10} = \${volCm} cm³ = \${volLiter} liter.\`;
      } else {
        stimulus = \`Fungsi pendapatan harian sebuah usaha dirumuskan dengan f(x) = \${a}x - \${b}, dengan x adalah jumlah unit barang yang terjual.\`;
        soal = \`Jika hari ini terjual sebanyak \${c} unit barang, berapakah pendapatan usaha tersebut?\`;
        const hasil = a * c - b;
        jawabanText = \`\${hasil}\`;
        pilihan = [jawabanText, \`\${hasil + 10}\`, \`\${hasil - a}\`, \`\${hasil + b}\`, \`\${hasil + 15}\`];
        pembahasan = \`Substitusi x = \${c} ke dalam fungsi: f(\${c}) = \${a}(\${c}) - \${b} = \${hasil}.\`;
      }
    } else {
      const subjek = ["Pemerintah", "Kementerian", "Sekolah", "Masyarakat", "Ilmuwan", "Peneliti"][Math.floor(Math.random() * 6)];
      const objek = ["program pelestarian lingkungan", "inovasi teknologi digital", "metode pembelajaran baru", "sistem daur ulang sampah", "kebijakan energi terbarukan"][Math.floor(Math.random() * 5)];
      const dampak = ["meningkatkan efisiensi sebesar", "mengurangi emisi karbon hingga", "mempercepat proses adaptasi sekitar", "menurunkan tingkat polusi sebesar"][Math.floor(Math.random() * 4)];
      
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        stimulus = \`Wacana Teks \${i + 1}:\nDalam laporan terbaru, \${subjek} telah menerapkan \${objek} yang diklaim dapat \${dampak} \${c}%. Kebijakan ini menuai respons positif, namun pelaksanaannya masih terhambat oleh kurangnya infrastruktur pendukung di wilayah pelosok.\`;
        soal = \`Berdasarkan wacana di atas, apa gagasan pokok (ide utama) dari paragraf tersebut?\`;
        jawabanText = \`Penerapan \${objek} oleh \${subjek} beserta dampak dan tantangannya.\`;
        pilihan = [jawabanText, \`Kurangnya infrastruktur di wilayah pelosok.\`, \`Klaim penurunan sebesar \${c}% yang diragukan.\`, \`Dukungan penuh tanpa syarat terhadap \${subjek}.\`, \`Tidak ada gagasan pokok yang jelas.\`];
        pembahasan = \`Gagasan pokok mencakup inti pembicaraan, yaitu inisiatif \${subjek} mengenai \${objek} dan tantangan infrastruktur yang menyertainya.\`;
      } else if (type === 1) {
        stimulus = \`Analisis Paragraf \${i + 1}:\n"Meskipun \${subjek} berhasil menginisiasi \${objek}, banyak ahli berpendapat bahwa persentase keberhasilan yang menyentuh \${c}% masih belum cukup untuk mengatasi masalah fundamental."\`;
        soal = \`Kata hubung (konjungsi) 'Meskipun' pada awal kalimat di atas menunjukkan makna hubungan...\`;
        jawabanText = \`Pertentangan atau konsesi (perlawanan kondisi).\`;
        pilihan = [jawabanText, \`Penambahan informasi (aditif).\`, \`Sebab-akibat (kausalitas).\`, \`Pemilihan alternatif (disjungtif).\`, \`Syarat mutlak (kondisional).\`];
        pembahasan = \`Konjungsi 'meskipun', 'walaupun', 'kendatipun' menyatakan hubungan pertentangan atau konsesif antara klausa utama dan anak kalimat.\`;
      } else {
        stimulus = \`Studi Kasus Kontekstual \${i + 1}:\nLaporan menunjukkan bahwa inisiatif \${objek} yang dipimpin \${subjek} mencatat \${b} kasus keberhasilan. Sayangnya, ada sekitar \${a} laporan kendala teknis.\`;
        soal = \`Kesimpulan logis yang paling tepat berdasarkan premis-premis di atas adalah...\`;
        jawabanText = \`Inisiatif tersebut menunjukkan hasil positif meskipun masih diwarnai oleh kendala teknis dalam pelaksanaannya.\`;
        pilihan = [jawabanText, \`Inisiatif tersebut sepenuhnya gagal dan harus dihentikan.\`, \`\${subjek} tidak kompeten dalam menjalankan \${objek}.\`, \`Kendala teknis sebanyak \${a} kasus adalah hal yang wajar dan diabaikan.\`, \`Tidak ada kesimpulan yang bisa ditarik secara pasti.\`];
        pembahasan = \`Kesimpulan yang seimbang mengakui adanya rasio keberhasilan sekaligus mencatat adanya kendala tanpa mengambil lompatan logika ekstrem.\`;
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
      soalFormatted = \`[STIMULUS WACANA KASUS]\n\${stimulus}\n\n[PERTANYAAN ANALITIS]\n\${soal}\`;
    }

    list.push({
      id: \`tka_dyn_\${Date.now()}_\${i}_\${Math.floor(Math.random()*1000)}\`,
      jenjang,
      mapel,
      jurusan: jurusan || undefined,
      subtes: \`TKA \${jenjang} - \${mapel}\`,
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

`;

const finalCode = code.substring(0, startIdx) + newFunc + code.substring(endIdx);
fs.writeFileSync('server.js', finalCode);
console.log('Patched server.js successfully.');
