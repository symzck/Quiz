import fs from 'fs';
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(
    'async function generateSoalAI(jenjang, mapel, jurusan, jumlahSoal) {',
    'async function generateSoalAI(jenjang, mapel, jurusan, jumlahSoal, useProceduralOnly = false) {'
);

code = code.replace(
    `                    jumlahSoal
                })`,
    `                    jumlahSoal,
                    useProceduralOnly
                })`
);

code = code.replace(
    `const extra = await generateSoalAI(jenjang, mapel, jurusan, jumlahSoal);`,
    `const extra = await generateSoalAI(jenjang, mapel, jurusan, jumlahSoal - cocok.length, true); // Force Procedural
                        cocok = [...cocok, ...extra];`
);

code = code.replace(
    `                    <i class="fa-solid fa-database text-indigo-400"></i> Ambil dari Bank Soal TKA`,
    `                    <i class="fa-solid fa-infinity text-indigo-400"></i> Generator TKA (Tanpa Kuota AI)`
);

fs.writeFileSync('index.html', code);
console.log("Patched index.html for procedural engine.");
