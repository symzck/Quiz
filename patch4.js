import fs from 'fs';
let code = fs.readFileSync('index.html', 'utf8');

const targetStr = `                    btnStart.innerHTML = '<i class="fa-solid fa-play text-amber-300"></i> Demo';
                } else {
                    btnStart.innerHTML = '<i class="fa-solid fa-play text-amber-300"></i> Demo';
                }`;

const replacementStr = `                    btnStart.innerHTML = '<i class="fa-solid fa-play text-amber-300"></i> Demo';
                } else {
                    btnStart.innerHTML = '<i class="fa-solid fa-play text-amber-300"></i> Mulai Ujian TKA (30 Soal Acak)';
                }`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('index.html', code);
