import fs from 'fs';
let code = fs.readFileSync('index.html', 'utf8');

const targetStr = `            if (jenjang === 'SMA') {`;
const insertStr = `            const uMapelWrap = document.getElementById('u-mapel-wrap');
            if (prefix === 'u' && uMapelWrap) {
                if (jenjang === 'SMP') {
                    uMapelWrap.classList.remove('hidden');
                } else {
                    uMapelWrap.classList.add('hidden');
                }
            }
`;
code = code.replace(targetStr, insertStr + targetStr);
fs.writeFileSync('index.html', code);
