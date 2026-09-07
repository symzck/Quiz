import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove u-jumlah-soal dropdown container
const dropdownHTML = `                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Jumlah Butir Soal</label>
                    <select id="u-jumlah-soal" class="w-full p-3 bg-slate-50 border border-indigo-200 rounded-xl text-sm font-bold text-indigo-700 outline-none">
                        <option value="5">5 Butir Soal (Latihan Cepat ⚡)</option>
                        <option value="10" selected>10 Butir Soal (Standar Simulasi TKA 📝)</option>
                        <option value="15">15 Butir Soal (Simulasi Menengah 🎯)</option>
                        <option value="20">20 Butir Soal (Tryout TKA Penuh 🏆)</option>
                        <option value="25">25 Butir Soal (Simulasi Marathon 🔥)</option>
                        <option value="30">30 Butir Soal (Ujian Intensif 🚀)</option>
                    </select>
                </div>`;

if (html.includes(dropdownHTML)) {
    html = html.replace(dropdownHTML, '');
} else {
    // try softer match
    const startIndex = html.indexOf('<label class="block text-xs font-bold text-slate-700 mb-1">Jumlah Butir Soal</label>');
    if (startIndex !== -1) {
        const divStart = html.lastIndexOf('<div>', startIndex);
        const selectEnd = html.indexOf('</select>', startIndex) + 9;
        const divEnd = html.indexOf('</div>', selectEnd) + 6;
        html = html.substring(0, divStart) + html.substring(divEnd);
    }
}

// 2. Remove AI button and fix Generator button
const buttonsHTML = `            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <button onclick="window.mulaiKuis(true)" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg text-sm flex items-center justify-center gap-2">
                    <i class="fa-brands fa-google text-amber-300"></i> Buat via AI + Riset Google Search
                </button>
                <button onclick="window.mulaiKuis(false)" class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-xl transition text-sm flex items-center justify-center gap-2">
                    <i class="fa-solid fa-infinity text-indigo-400"></i> Generator TKA (Tanpa Kuota AI)
                </button>
            </div>`;
const newButtonsHTML = `            <div class="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                <button onclick="window.mulaiKuis()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg text-sm flex items-center justify-center gap-2">
                    <i class="fa-solid fa-play text-amber-300"></i> Mulai Ujian TKA (30 Soal Acak)
                </button>
            </div>`;

if (html.includes(buttonsHTML)) {
    html = html.replace(buttonsHTML, newButtonsHTML);
} else {
    // Softer match for buttons
    const btnContainerStart = html.indexOf('<div class="flex flex-col sm:flex-row gap-3 justify-center">');
    const sectionEnd = html.indexOf('</section>', btnContainerStart);
    if (btnContainerStart !== -1 && sectionEnd !== -1) {
        html = html.substring(0, btnContainerStart) + newButtonsHTML + "\n        " + html.substring(sectionEnd);
    }
}

// 3. Update mulaiKuis function
const oldMulaiKuis = `        window.mulaiKuis = async function(pakaiAI) {
            if(!userProfileData) return;
            if((userProfileData.quizAttempts || 0) >= MAX_LIMIT_PER_DAY) return window.showToast("Kuota harian Anda telah habis!", "error");

            const jenjang = document.getElementById('u-jenjang').value;
            const mapel = document.getElementById('u-mapel').value;
            const jurusan = jenjang === 'SMA' ? document.getElementById('u-jurusan').value : null;
            const jumlahSoal = parseInt(document.getElementById('u-jumlah-soal').value || '10');

            document.getElementById('user-home').classList.add('hidden');
            document.getElementById('loading-section').classList.remove('hidden');

            if(pakaiAI) {
                try {
                    activeQuestions = await generateSoalAI(jenjang, mapel, jurusan, jumlahSoal);
                    simpanRiwayatSoal(mapel, activeQuestions);
                } catch(e) {
                    console.error("Gagal AI:", e);
                    window.showToast("Koneksi AI Sibuk, otomatis mengambil bank soal TKA.", "info");
                    pakaiAI = false;
                }
            }

            if(!pakaiAI) {
                const gabungan = [...DEFAULT_QUESTIONS, ...bankSoalCloud];
                let cocok = acakArray(gabungan.filter(q => q.mapel === mapel && q.jenjang === jenjang));
                if (cocok.length < jumlahSoal) {
                    try {
                        const extra = await generateSoalAI(jenjang, mapel, jurusan, jumlahSoal - cocok.length, true); // Force Procedural
                        cocok = [...cocok, ...extra];
                        activeQuestions = cocok;
                    } catch(err) {
                        activeQuestions = cocok.length > 0 ? cocok.slice(0, jumlahSoal) : DEFAULT_QUESTIONS.slice(0, jumlahSoal);
                    }
                } else {
                    activeQuestions = cocok.slice(0, jumlahSoal);
                }
            }`;

const newMulaiKuis = `        window.mulaiKuis = async function() {
            if(!userProfileData) return;
            if((userProfileData.quizAttempts || 0) >= MAX_LIMIT_PER_DAY) return window.showToast("Kuota harian Anda telah habis!", "error");

            const jenjang = document.getElementById('u-jenjang').value;
            const mapel = document.getElementById('u-mapel').value;
            const jurusan = jenjang === 'SMA' ? document.getElementById('u-jurusan').value : null;
            const jumlahSoal = 30; // Hardcoded to 30 as requested

            document.getElementById('user-home').classList.add('hidden');
            document.getElementById('loading-section').classList.remove('hidden');

            const gabungan = [...DEFAULT_QUESTIONS, ...bankSoalCloud];
            let cocok = acakArray(gabungan.filter(q => q.mapel === mapel && q.jenjang === jenjang));
            if (cocok.length < jumlahSoal) {
                try {
                    const extra = await generateSoalAI(jenjang, mapel, jurusan, jumlahSoal - cocok.length, true); // Force Procedural
                    cocok = [...cocok, ...extra];
                    activeQuestions = cocok;
                } catch(err) {
                    activeQuestions = cocok.length > 0 ? cocok.slice(0, jumlahSoal) : DEFAULT_QUESTIONS.slice(0, jumlahSoal);
                }
            } else {
                activeQuestions = cocok.slice(0, jumlahSoal);
            }`;

if (html.includes(oldMulaiKuis)) {
    html = html.replace(oldMulaiKuis, newMulaiKuis);
    console.log("Patched mulaiKuis successfully.");
} else {
    console.log("Could not find old mulaiKuis signature perfectly. Attempting regex.");
    // fallback with regex
    html = html.replace(/window\.mulaiKuis\s*=\s*async\s*function\(pakaiAI\)\s*\{[\s\S]*?(?=if\(!pakaiAI\))if\(!pakaiAI\)\s*\{([\s\S]*?activeQuestions\s*=\s*cocok\.slice\(0,\s*jumlahSoal\);\s*\})\s*\}/m, newMulaiKuis + "\n        }");
    console.log("Used Regex patch for mulaiKuis.");
}

fs.writeFileSync('index.html', html);
