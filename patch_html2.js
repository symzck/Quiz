import fs from 'fs';
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(
    `const extra = await generateSoalAI(jenjang, mapel, jurusan, jumlahSoal - cocok.length, true); // Force Procedural
                        cocok = [...cocok, ...extra];
                        activeQuestions = extra;`,
    `const extra = await generateSoalAI(jenjang, mapel, jurusan, jumlahSoal - cocok.length, true); // Force Procedural
                        cocok = [...cocok, ...extra];
                        activeQuestions = cocok;`
);

fs.writeFileSync('index.html', code);
