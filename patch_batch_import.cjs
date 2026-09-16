const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Upgrade admin-view-import UI with batch image uploader & format guide
const oldImportHeader = `<h2 class="font-bold text-lg text-slate-800 mb-4"><i class="fa-solid fa-file-excel text-emerald-600"></i> Import Soal dari Spreadsheet</h2>
                <p class="text-xs text-slate-500 mb-4">Pilih parameter default di bawah, lalu paste data dari Excel atau Google Sheets. Format kolom: <b>Soal [Tab] Opsi A [Tab] Opsi B [Tab] Opsi C [Tab] Opsi D [Tab] Opsi E (Opsional) [Tab] Kunci (A/B/C/D/E) [Tab] Pembahasan</b></p>`;

const newImportHeader = `<h2 class="font-bold text-lg text-slate-800 mb-2"><i class="fa-solid fa-file-excel text-emerald-600"></i> Import Massal Soal & Banyak Gambar Sekaligus</h2>
                <p class="text-xs text-slate-500 mb-4">Mendukung import puluhan soal sekaligus dari Excel/Google Sheets beserta wacana dan gambar.</p>

                <!-- Panduan 2 Langkah Instan -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <!-- Kotak 1: Batch Image Uploader -->
                    <div class="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                                <i class="fa-solid fa-images text-indigo-600"></i> 1. Upload Banyak Gambar Sekaligus
                            </h3>
                            <span id="batch-img-count" class="text-[11px] font-bold text-indigo-600 bg-white px-2 py-0.5 rounded-full shadow-xs">0 Gambar</span>
                        </div>
                        <p class="text-[11px] text-slate-600 mb-3">Tarik & lepas puluhan file gambar soal/diagram dari PDF Anda ke sini sekaligus.</p>
                        <label class="block border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-white rounded-xl p-4 text-center cursor-pointer transition">
                            <i class="fa-solid fa-cloud-arrow-up text-2xl text-indigo-500 mb-1"></i>
                            <div class="text-xs font-bold text-slate-700">Pilih / Tarik Banyak File Gambar</div>
                            <div class="text-[10px] text-slate-400">Bisa memilih 10, 20, 50 file .png / .jpg sekaligus</div>
                            <input type="file" id="batch-img-files" multiple accept="image/*" class="hidden" onchange="window.handleBatchImages(event)">
                        </label>
                        <!-- Grid Thumbnail Galeri Batch -->
                        <div id="batch-img-gallery" class="hidden mt-3 max-h-36 overflow-y-auto custom-scroll grid grid-cols-3 sm:grid-cols-4 gap-2 bg-white/80 p-2 rounded-xl border border-indigo-100"></div>
                    </div>

                    <!-- Kotak 2: Download Template & Petunjuk -->
                    <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                                    <i class="fa-solid fa-file-csv text-emerald-600"></i> 2. Format Tabel Soal & Gambar
                                </h3>
                                <button type="button" onclick="window.unduhTemplateImportCSV()" class="text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg transition shadow-xs flex items-center gap-1">
                                    <i class="fa-solid fa-download"></i> Unduh Format CSV
                                </button>
                            </div>
                            <p class="text-[11px] text-slate-600 mb-2">Mendukung format standar (7-8 kolom) maupun format lengkap dengan gambar (10-11 kolom):</p>
                            <div class="text-[10px] font-mono bg-white p-2 rounded-lg border border-emerald-200 text-slate-700 overflow-x-auto whitespace-nowrap">
                                [Wacana] [Tab] [URL/Nama Gambar] [Tab] [Soal] [Tab] [Opsi A] ... [Tab] [Kunci]
                            </div>
                        </div>
                        <div class="mt-3 text-[11px] text-emerald-800 bg-white/80 p-2 rounded-lg border border-emerald-100 flex items-center gap-2">
                            <i class="fa-solid fa-lightbulb text-amber-500"></i>
                            <span><b>Tips Praktis:</b> Anda juga bisa mengirimkan file PDF langsung di obrolan chat AI untuk ekstraksi 100% otomatis!</span>
                        </div>
                    </div>
                </div>`;

html = html.replace(oldImportHeader, newImportHeader);

// 2. Add JavaScript functions for Batch Image Uploader and Template Downloader
const batchImportJS = `
        // State for batch uploaded images
        window.batchImagesMap = {};

        window.handleBatchImages = function(event) {
            const files = event.target.files;
            if (!files || files.length === 0) return;

            const gallery = document.getElementById('batch-img-gallery');
            const countBadge = document.getElementById('batch-img-count');
            gallery.classList.remove('hidden');

            let processed = 0;
            const total = files.length;
            window.showToast(\`Memuat \${total} gambar...\`, "info");

            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const dataUrl = e.target.result;
                    const cleanName = file.name.trim();
                    window.batchImagesMap[cleanName] = dataUrl;

                    const item = document.createElement('div');
                    item.className = "relative group border border-slate-200 rounded-lg p-1 bg-white flex flex-col items-center";
                    item.innerHTML = \`
                        <img src="\${dataUrl}" class="h-16 w-full object-contain rounded mb-1 bg-slate-50">
                        <span class="text-[9px] font-bold text-slate-600 truncate w-full text-center" title="\${cleanName}">\${cleanName}</span>
                        <button type="button" onclick="window.salinLinkBatch('\${cleanName}')" class="text-[9px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-1 py-0.5 rounded font-bold mt-1 w-full text-center" title="Klik untuk salin">Salin</button>
                    \`;
                    gallery.appendChild(item);

                    processed++;
                    countBadge.innerText = \`\${Object.keys(window.batchImagesMap).length} Gambar\`;
                    if (processed === total) {
                        window.showToast(\`\${total} gambar siap digunakan!\`, "success");
                    }
                };
                reader.readAsDataURL(file);
            });
        };

        window.salinLinkBatch = function(name) {
            const dataUrl = window.batchImagesMap[name];
            if (!dataUrl) return;
            navigator.clipboard.writeText(dataUrl).then(() => {
                window.showToast(\`Gambar "\${name}" disalin ke clipboard!\`, "success");
            }).catch(() => {
                window.showToast("Gagal menyalin", "error");
            });
        };

        window.unduhTemplateImportCSV = function() {
            const header = "Wacana Stimulus\\tURL Gambar Wacana\\tPertanyaan Soal\\tURL Gambar Soal\\tOpsi A\\tOpsi B\\tOpsi C\\tOpsi D\\tOpsi E\\tKunci (A/B/C/D/E)\\tPembahasan\\n";
            const row1 = "Perhatikan grafik laju reaksi berikut...\\thttps://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400\\tBerdasarkan data di atas, laju reaksi tercepat terjadi pada menit ke...\\t\\tMenit ke-1\\tMenit ke-2\\tMenit ke-3\\tMenit ke-4\\tMenit ke-5\\tB\\tLaju reaksi mencapai nilai gradien tertinggi pada interval menit ke-2.\\n";
            const row2 = "\\t\\tSebuah mobil bergerak dengan kecepatan konstan 20 m/s selama 10 detik. Jarak yang ditempuh adalah...\\t\\t100 m\\t150 m\\t200 m\\t250 m\\t300 m\\tC\\tJarak = kecepatan x waktu = 20 x 10 = 200 m.\\n";
            const content = header + row1 + row2;
            
            const blob = new Blob([content], { type: 'text/tab-separated-values;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Template_Import_Soal_TKA_Lengkap.tsv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            window.showToast("Template format berhasil diunduh!", "success");
        };
`;

// Upgrade prosesImportSpreadsheet to handle both 7-8 column format AND 10-11 column format with images
const oldProsesImport = `            for (let barisData of baris) {
                const kolom = barisData.split('\\t');
                if (kolom.length < 5) continue; // Minimal Soal dan 4 Opsi

                const soalText = kolom[0].trim();
                const opsiA = kolom[1]?.trim();
                const opsiB = kolom[2]?.trim();
                const opsiC = kolom[3]?.trim();
                const opsiD = kolom[4]?.trim();

                let opsiE, kunciStr, pembahasan;

                if (jenjang === 'SMA') {
                    if (kolom.length < 7) continue; // Butuh Opsi E dan Kunci
                    opsiE = kolom[5]?.trim();
                    kunciStr = kolom[6]?.trim().toUpperCase();
                    pembahasan = kolom[7]?.trim() || '';
                } else {
                    kunciStr = kolom[5]?.trim().toUpperCase();
                    pembahasan = kolom[6]?.trim() || '';
                }
                if (!soalText || !opsiA || !kunciStr) continue;

                const pilihan = jenjang === 'SMA' ? [opsiA, opsiB, opsiC, opsiD, opsiE] : [opsiA, opsiB, opsiC, opsiD];

                let jawabanIdx = 0;
                if (kunciStr === 'A') jawabanIdx = 0;
                else if (kunciStr === 'B') jawabanIdx = 1;
                else if (kunciStr === 'C') jawabanIdx = 2;
                else if (kunciStr === 'D') jawabanIdx = 3;
                else if (kunciStr === 'E') jawabanIdx = 4;

                const data = {
                    jenjang, tingkat, mapel, jurusan, subtes,
                    soal: soalText,
                    pilihan,
                    jawaban: jawabanIdx,
                    pembahasan,
                    dibuatOleh: "Admin (Import)",
                    timestamp: new Date().toISOString()
                };`;

const newProsesImport = `            for (let barisData of baris) {
                const kolom = barisData.split('\\t');
                if (kolom.length < 5) continue;

                let stimulus = '';
                let stimulusImg = '';
                let soalText = '';
                let soalImg = '';
                let opsiA = '', opsiB = '', opsiC = '', opsiD = '', opsiE = '';
                let kunciStr = '';
                let pembahasan = '';

                // Cek apakah format lengkap dengan kolom gambar (>= 9 kolom)
                if (kolom.length >= 9) {
                    stimulus = kolom[0]?.trim() || '';
                    stimulusImg = kolom[1]?.trim() || '';
                    soalText = kolom[2]?.trim() || '';
                    soalImg = kolom[3]?.trim() || '';
                    opsiA = kolom[4]?.trim() || '';
                    opsiB = kolom[5]?.trim() || '';
                    opsiC = kolom[6]?.trim() || '';
                    opsiD = kolom[7]?.trim() || '';
                    if (jenjang === 'SMA') {
                        opsiE = kolom[8]?.trim() || '';
                        kunciStr = kolom[9]?.trim().toUpperCase() || 'A';
                        pembahasan = kolom[10]?.trim() || '';
                    } else {
                        kunciStr = kolom[8]?.trim().toUpperCase() || 'A';
                        pembahasan = kolom[9]?.trim() || '';
                    }
                } else {
                    // Format standar
                    soalText = kolom[0]?.trim() || '';
                    opsiA = kolom[1]?.trim() || '';
                    opsiB = kolom[2]?.trim() || '';
                    opsiC = kolom[3]?.trim() || '';
                    opsiD = kolom[4]?.trim() || '';
                    if (jenjang === 'SMA') {
                        opsiE = kolom[5]?.trim() || '';
                        kunciStr = kolom[6]?.trim().toUpperCase() || 'A';
                        pembahasan = kolom[7]?.trim() || '';
                    } else {
                        kunciStr = kolom[5]?.trim().toUpperCase() || 'A';
                        pembahasan = kolom[6]?.trim() || '';
                    }
                }

                if (!soalText || !opsiA || !kunciStr) continue;

                // Cek apakah gambar cocok dengan nama file di batchImagesMap
                if (stimulusImg && window.batchImagesMap && window.batchImagesMap[stimulusImg]) {
                    stimulusImg = window.batchImagesMap[stimulusImg];
                }
                if (soalImg && window.batchImagesMap && window.batchImagesMap[soalImg]) {
                    soalImg = window.batchImagesMap[soalImg];
                }

                const pilihan = (jenjang === 'SMA' && opsiE) ? [opsiA, opsiB, opsiC, opsiD, opsiE] : [opsiA, opsiB, opsiC, opsiD];

                let jawabanIdx = 0;
                if (kunciStr === 'A') jawabanIdx = 0;
                else if (kunciStr === 'B') jawabanIdx = 1;
                else if (kunciStr === 'C') jawabanIdx = 2;
                else if (kunciStr === 'D') jawabanIdx = 3;
                else if (kunciStr === 'E') jawabanIdx = 4;

                const data = {
                    jenjang, tingkat, mapel, jurusan, subtes,
                    soal: soalText,
                    stimulus: stimulus || undefined,
                    stimulus_img: stimulusImg || undefined,
                    soal_img: soalImg || undefined,
                    pilihan,
                    jawaban: jawabanIdx,
                    pembahasan,
                    dibuatOleh: "Admin (Import Batch)",
                    timestamp: new Date().toISOString()
                };`;

html = html.replace('window.prosesImportSpreadsheet = async function() {', batchImportJS + '\n        window.prosesImportSpreadsheet = async function() {');
html = html.replace(oldProsesImport, newProsesImport);

fs.writeFileSync('index.html', html);
console.log("Successfully added Batch Image Uploader & Comprehensive Spreadsheet Importer!");
