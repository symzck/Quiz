import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. TKA_MAPEL Modification
const tkaMapelOld = `        const TKA_MAPEL = {
            SD: [
                "Bahasa Indonesia",
                "Matematika"
            ],
            SMP: [
                "Bahasa Indonesia",
                "Matematika"
            ],
            SMA: {
                Wajib: [
                    "Bahasa Indonesia",
                    "Matematika",
                    "Bahasa Inggris"
                ],
                Saintek: [
                    "Matematika Tingkat Lanjut",
                    "Fisika",
                    "Kimia",
                    "Biologi"
                ],
                Bahasa: [
                    "Sastra Indonesia",
                    "Sastra Inggris",
                    "Antropologi"
                ]
            }
        };`;

const tkaMapelNew = `        const TKA_MAPEL = {
            SD: ["Paket Demo (Contoh Perkiraan)"],
            SMP: [
                "Bahasa Indonesia",
                "Matematika"
            ],
            SMA: {
                Wajib: ["Paket Demo (Contoh Perkiraan)"],
                Saintek: ["Paket Demo (Contoh Perkiraan)"],
                Bahasa: ["Paket Demo (Contoh Perkiraan)"]
            }
        };`;
if (html.includes(tkaMapelOld)) {
    html = html.replace(tkaMapelOld, tkaMapelNew);
    console.log("Updated TKA_MAPEL.");
} else {
    console.log("Failed to update TKA_MAPEL.");
}

// 2. Remove Quota Limit for Logged-In Users
// `if((userProfileData.quizAttempts || 0) >= MAX_LIMIT_PER_DAY) return window.showToast("Kuota harian Anda telah habis!", "error");`
const limitRegex = /if\(\(userProfileData\.quizAttempts \|\| 0\) >= MAX_LIMIT_PER_DAY\) return window\.showToast\("Kuota harian Anda telah habis!", "error"\);/g;
html = html.replace(limitRegex, `// Kouta limit dihapus untuk pengguna (login)`);
console.log("Removed quota limit.");

// 3. Add Modal Edit HTML right before <div id="modal-pin">
const modalEditHtml = `
        <!-- Modal Edit Soal -->
        <div id="modal-edit" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] hidden flex items-center justify-center p-4">
            <div class="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
                <button onclick="window.tutupModalEdit()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center"><i class="fa-solid fa-xmark"></i></button>
                <h3 class="font-bold text-lg text-slate-800 mb-4"><i class="fa-solid fa-pen-to-square text-indigo-500"></i> Edit Soal</h3>
                
                <input type="hidden" id="edit-id">
                
                <div class="mb-3">
                    <label class="text-xs font-bold text-slate-600 block mb-1">Sumber Teks (Wacana/Stimulus) *Opsional</label>
                    <textarea id="edit-stimulus" rows="3" class="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none" placeholder="Teks stimulus atau wacana..."></textarea>
                </div>
                
                <div class="mb-3">
                    <label class="text-xs font-bold text-slate-600 block mb-1">URL Sumber Gambar (Wacana/Stimulus) *Opsional</label>
                    <input type="text" id="edit-stimulus-img" class="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none" placeholder="https://example.com/image.jpg">
                </div>

                <div class="mb-3">
                    <label class="text-xs font-bold text-slate-600 block mb-1">Soal / Pertanyaan *Wajib</label>
                    <textarea id="edit-soal" rows="3" class="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none" placeholder="Pertanyaan..."></textarea>
                </div>

                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <label class="text-xs font-bold text-slate-600 block mb-1">Opsi A</label>
                        <input type="text" id="edit-pil-0" class="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-slate-600 block mb-1">Opsi B</label>
                        <input type="text" id="edit-pil-1" class="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-slate-600 block mb-1">Opsi C</label>
                        <input type="text" id="edit-pil-2" class="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-slate-600 block mb-1">Opsi D</label>
                        <input type="text" id="edit-pil-3" class="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                    </div>
                    <div class="col-span-2">
                        <label class="text-xs font-bold text-slate-600 block mb-1">Opsi E (Hanya SMA/opsional)</label>
                        <input type="text" id="edit-pil-4" class="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3 mb-4">
                    <div>
                        <label class="text-xs font-bold text-slate-600 block mb-1">Kunci Jawaban</label>
                        <select id="edit-kunci" class="w-full text-sm p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-lg outline-none">
                            <option value="0">A</option><option value="1">B</option>
                            <option value="2">C</option><option value="3">D</option><option value="4">E</option>
                        </select>
                    </div>
                </div>
                
                <div class="mb-4">
                    <label class="text-xs font-bold text-slate-600 block mb-1">Pembahasan</label>
                    <textarea id="edit-pembahasan" rows="3" class="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none"></textarea>
                </div>

                <button onclick="window.simpanModalEdit()" class="w-full py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 transition">Simpan Perubahan</button>
            </div>
        </div>
`;
html = html.replace('<div id="modal-pin"', modalEditHtml + '\n        <div id="modal-pin"');

// 4. Inject Edit JS functions and update renderAdminSoalList
// We'll replace renderAdminSoalList so we can add the edit button
const renderAdminOld = `                    <p class="text-xs font-bold text-slate-800 line-clamp-3 pr-2">\${i+1}. \${q.soal}</p>
                    \${q.id && !q.id.startsWith('tka_') ? \`<button onclick="hapusSoalCloud('\${q.id}')" class="absolute top-2 right-2 text-rose-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition" title="Hapus Soal"><i class="fa-solid fa-trash-can"></i></button>\` : ''}
                </div>`;
const renderAdminNew = `                    <p class="text-xs font-bold text-slate-800 line-clamp-3 pr-2">\${i+1}. \${q.soal}</p>
                    \${q.id && !q.id.startsWith('tka_') ? \`<div class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button onclick="window.bukaEditSoal('\${q.id}')" class="text-indigo-400 hover:text-indigo-600" title="Edit Soal"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onclick="hapusSoalCloud('\${q.id}')" class="text-rose-400 hover:text-rose-600" title="Hapus Soal"><i class="fa-solid fa-trash-can"></i></button>
                    </div>\` : ''}
                </div>`;
if (html.includes(renderAdminOld)) {
    html = html.replace(renderAdminOld, renderAdminNew);
    console.log("Added edit button to renderAdminSoalList.");
}

// Edit logic injection
const editJsLogic = `
        window.bukaEditSoal = function(id) {
            const q = bankSoalCloud.find(x => x.id === id);
            if (!q) return;
            document.getElementById('edit-id').value = q.id;
            document.getElementById('edit-stimulus').value = q.stimulus || '';
            document.getElementById('edit-stimulus-img').value = q.stimulus_img || '';
            document.getElementById('edit-soal').value = q.soal || '';
            document.getElementById('edit-pil-0').value = q.pilihan[0] || '';
            document.getElementById('edit-pil-1').value = q.pilihan[1] || '';
            document.getElementById('edit-pil-2').value = q.pilihan[2] || '';
            document.getElementById('edit-pil-3').value = q.pilihan[3] || '';
            document.getElementById('edit-pil-4').value = q.pilihan[4] || '';
            document.getElementById('edit-kunci').value = q.jawaban || 0;
            document.getElementById('edit-pembahasan').value = q.pembahasan || '';
            document.getElementById('modal-edit').classList.remove('hidden');
        };

        window.tutupModalEdit = function() {
            document.getElementById('modal-edit').classList.add('hidden');
        };

        window.simpanModalEdit = async function() {
            const id = document.getElementById('edit-id').value;
            const soal = document.getElementById('edit-soal').value.trim();
            const pil = [
                document.getElementById('edit-pil-0').value.trim(),
                document.getElementById('edit-pil-1').value.trim(),
                document.getElementById('edit-pil-2').value.trim(),
                document.getElementById('edit-pil-3').value.trim(),
                document.getElementById('edit-pil-4').value.trim()
            ].filter(p => p !== '');
            const jawaban = parseInt(document.getElementById('edit-kunci').value);
            
            if(!soal || pil.length < 4) return window.showToast("Wajib isi soal dan min. 4 pilihan!", "error");

            try {
                const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'soal_tka', id);
                await updateDoc(docRef, {
                    stimulus: document.getElementById('edit-stimulus').value.trim(),
                    stimulus_img: document.getElementById('edit-stimulus-img').value.trim(),
                    soal: soal,
                    pilihan: pil,
                    jawaban: jawaban,
                    pembahasan: document.getElementById('edit-pembahasan').value.trim(),
                    diupdatePada: new Date().toISOString()
                });
                window.showToast("Soal berhasil diperbarui!", "success");
                window.tutupModalEdit();
            } catch(e) {
                window.showToast("Gagal update soal: " + e.message, "error");
            }
        };
`;
// inject right before function tambahSoalCloud()
if (html.includes('async function tambahSoalCloud() {')) {
    html = html.replace('async function tambahSoalCloud() {', editJsLogic + '\n        async function tambahSoalCloud() {');
    console.log("Injected edit JS functions.");
}

// 5. Update tampilkanSoalAktif to show image
const stimulusContainerHtml = `<p id="stimulus-text" class="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line"></p>`;
const stimulusContainerNewHtml = `<img id="stimulus-img" class="w-full mt-2 mb-3 rounded-lg object-cover hidden" alt="Stimulus Gambar">
                <p id="stimulus-text" class="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line"></p>`;
html = html.replace(stimulusContainerHtml, stimulusContainerNewHtml);

const tampilkanLogicOld = `            } else if (q.stimulus) {
                stimulusText.innerText = q.stimulus;
                stimulusContainer.classList.remove('hidden');
                questionText.innerText = fullText;
            } else {
                stimulusContainer.classList.add('hidden');
                questionText.innerText = fullText;
            }`;

const tampilkanLogicNew = `            } else if (q.stimulus || q.stimulus_img) {
                const imgEl = document.getElementById('stimulus-img');
                if (q.stimulus_img) {
                    imgEl.src = q.stimulus_img;
                    imgEl.classList.remove('hidden');
                } else {
                    imgEl.classList.add('hidden');
                }
                stimulusText.innerText = q.stimulus || '';
                stimulusContainer.classList.remove('hidden');
                questionText.innerText = fullText;
            } else {
                stimulusContainer.classList.add('hidden');
                questionText.innerText = fullText;
            }`;
if (html.includes(tampilkanLogicOld)) {
    html = html.replace(tampilkanLogicOld, tampilkanLogicNew);
    console.log("Updated tampilkanSoalAktif to handle images.");
} else {
    // Just in case it has [STIMULUS WACANA KASUS] parsing block
    console.log("Could not find the target string for tampilkanSoalAktif. Using regex replace.");
    html = html.replace(/\} else if \(q\.stimulus\) \{[\s\S]*?questionText\.innerText = fullText;\s*\}/, tampilkanLogicNew);
}


fs.writeFileSync('index.html', html);
console.log("Done patching index.html");
