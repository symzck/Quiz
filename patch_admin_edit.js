import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the condition that hides the Edit button for hardcoded questions
const renderAdminOld = `                    \${q.id && !q.id.startsWith('tka_') ? \`<div class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button onclick="window.bukaEditSoal('\${q.id}')" class="text-indigo-400 hover:text-indigo-600" title="Edit Soal"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onclick="hapusSoalCloud('\${q.id}')" class="text-rose-400 hover:text-rose-600" title="Hapus Soal"><i class="fa-solid fa-trash-can"></i></button>
                    </div>\` : ''}`;

const renderAdminNew = `                    \${q.id ? \`<div class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button onclick="window.bukaEditSoal('\${q.id}')" class="text-indigo-400 hover:text-indigo-600" title="Edit Soal"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onclick="hapusSoalCloud('\${q.id}')" class="\${!q.id.startsWith('tka_') ? 'text-rose-400 hover:text-rose-600' : 'hidden'}" title="Hapus Soal"><i class="fa-solid fa-trash-can"></i></button>
                    </div>\` : ''}`;

if(html.includes(renderAdminOld)) {
    html = html.replace(renderAdminOld, renderAdminNew);
} else {
    console.log("Could not find renderAdminOld");
}

// 2. Fix renderAdminSoalList to show merged list
const renderListOld = `        function renderAdminSoalList() {
            const container = document.getElementById('admin-db-list');
            const list = bankSoalCloud.length > 0 ? bankSoalCloud : DEFAULT_QUESTIONS;`;

const renderListNew = `        function renderAdminSoalList() {
            const container = document.getElementById('admin-db-list');
            const overriddenIds = new Set(bankSoalCloud.map(q => q.id));
            const list = [...bankSoalCloud, ...DEFAULT_QUESTIONS.filter(q => !overriddenIds.has(q.id))];`;

if(html.includes(renderListOld)) {
    html = html.replace(renderListOld, renderListNew);
}

// 3. Update bukaEditSoal
const bukaEditOld = `        window.bukaEditSoal = function(id) {
            const q = bankSoalCloud.find(x => x.id === id);`;

const bukaEditNew = `        window.bukaEditSoal = function(id) {
            const overriddenIds = new Set(bankSoalCloud.map(x => x.id));
            const list = [...bankSoalCloud, ...DEFAULT_QUESTIONS.filter(x => !overriddenIds.has(x.id))];
            const q = list.find(x => x.id === id);`;

if(html.includes(bukaEditOld)) {
    html = html.replace(bukaEditOld, bukaEditNew);
}

// 4. Update simpanModalEdit to use setDoc and merge
const simpanEditOld = `            try {
                const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'soal_tka', id);
                await updateDoc(docRef, {
                    stimulus: document.getElementById('edit-stimulus').value.trim(),
                    stimulus_img: document.getElementById('edit-stimulus-img').value.trim(),
                    soal: soal,
                    pilihan: pil,
                    jawaban: jawaban,
                    pembahasan: document.getElementById('edit-pembahasan').value.trim(),
                    diupdatePada: new Date().toISOString()
                });`;

const simpanEditNew = `            try {
                const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'soal_tka', id);
                // Kita gunakan setDoc dengan merge: true agar soal bawaan (yang belum ada di db) bisa terbuat
                // Jika sudah ada, akan update.
                
                // Ambil data lama dari DEFAULT_QUESTIONS jika ini soal baru di cloud
                const qLama = DEFAULT_QUESTIONS.find(x => x.id === id) || {};
                
                await setDoc(docRef, {
                    jenjang: qLama.jenjang || document.getElementById('u-jenjang')?.value || 'SMP',
                    mapel: qLama.mapel || 'Mapel',
                    tingkat: qLama.tingkat || 'Sedang',
                    subtes: qLama.subtes || 'TKA',
                    stimulus: document.getElementById('edit-stimulus').value.trim(),
                    stimulus_img: document.getElementById('edit-stimulus-img').value.trim(),
                    soal: soal,
                    pilihan: pil,
                    jawaban: jawaban,
                    pembahasan: document.getElementById('edit-pembahasan').value.trim(),
                    diupdatePada: new Date().toISOString()
                }, { merge: true });`;

if(html.includes(simpanEditOld)) {
    html = html.replace(simpanEditOld, simpanEditNew);
    // Note: ensure setDoc is imported from firebase/firestore
}

// 5. Ensure setDoc is imported
const importFirestoreOld = `import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";`;
const importFirestoreNew = `import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";`;
html = html.replace(importFirestoreOld, importFirestoreNew);

// 6. Update mulaiKuis to filter properly
const mulaiKuisOld = `            const gabungan = [...DEFAULT_QUESTIONS, ...bankSoalCloud];`;
const mulaiKuisNew = `            const overriddenIds = new Set(bankSoalCloud.map(q => q.id));
            const gabungan = [...bankSoalCloud, ...DEFAULT_QUESTIONS.filter(q => !overriddenIds.has(q.id))];`;
html = html.replace(mulaiKuisOld, mulaiKuisNew);

// 7. Same for generateDraftSoalAI ? It uses TOPIK_MATERI, no need to touch gabungan there.


fs.writeFileSync('index.html', html);
console.log("Done patch_admin_edit.js");
