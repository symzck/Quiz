const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetStr = `            if (jenjang === 'SMA') {`;
const insertStr = `
            const btnStart = document.querySelector('button[onclick="window.mulaiKuis()"]');
            if (prefix === 'u' && btnStart) {
                if (jenjang === 'SD' || jenjang === 'SMA') {
                    btnStart.innerHTML = '<i class="fa-solid fa-play text-amber-300"></i> Demo';
                } else {
                    btnStart.innerHTML = '<i class="fa-solid fa-play text-amber-300"></i> Mulai Ujian TKA (30 Soal Acak)';
                }
            }
`;
code = code.replace(targetStr, insertStr + targetStr);
fs.writeFileSync('index.html', code);
