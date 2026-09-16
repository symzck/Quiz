const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const updateFormTipeJS = `
        window.updateFormTipe = function(prefix) {
            const tipe = document.getElementById(prefix + '-tipe').value;
            const isBS = (tipe === 'BS');
            const isPGK = (tipe === 'PGK');

            // Handle BS
            if (isBS) {
                if (prefix === 'f') {
                    document.getElementById('f-pil-A').value = 'Benar';
                    document.getElementById('f-pil-B').value = 'Salah';
                    document.getElementById('f-pil-C').classList.add('hidden');
                    document.getElementById('f-pil-D').classList.add('hidden');
                    document.getElementById('f-pil-E').classList.add('hidden');
                } else {
                    document.getElementById('edit-pil-0').value = 'Benar';
                    document.getElementById('edit-pil-1').value = 'Salah';
                    document.getElementById('edit-pil-2').parentElement.classList.add('hidden');
                    document.getElementById('edit-pil-3').parentElement.classList.add('hidden');
                    document.getElementById('edit-pil-4').parentElement.classList.add('hidden');
                }
            } else {
                if (prefix === 'f') {
                    document.getElementById('f-pil-C').classList.remove('hidden');
                    document.getElementById('f-pil-D').classList.remove('hidden');
                    document.getElementById('f-pil-E').classList.remove('hidden');
                } else {
                    document.getElementById('edit-pil-2').parentElement.classList.remove('hidden');
                    document.getElementById('edit-pil-3').parentElement.classList.remove('hidden');
                    document.getElementById('edit-pil-4').parentElement.classList.remove('hidden');
                }
            }

            // Handle Kunci
            const selectKunci = document.getElementById(prefix + '-kunci');
            const divKunciPGK = document.getElementById(prefix + '-kunci-pgk');
            
            if (isPGK) {
                selectKunci.classList.add('hidden');
                divKunciPGK.classList.remove('hidden');
            } else {
                selectKunci.classList.remove('hidden');
                divKunciPGK.classList.add('hidden');
                
                // If BS, only A and B are valid
                if (isBS) {
                    for (let i = 0; i < selectKunci.options.length; i++) {
                        selectKunci.options[i].hidden = (i > 1);
                    }
                    if (selectKunci.value > 1) selectKunci.value = '0';
                } else {
                    for (let i = 0; i < selectKunci.options.length; i++) {
                        selectKunci.options[i].hidden = false;
                    }
                }
            }
        }
`;

// Insert the function before simpanSoalCloud
html = html.replace('window.simpanSoalCloud = async function() {', updateFormTipeJS + '\n        window.simpanSoalCloud = async function() {');

// Update simpanSoalCloud to read Tipe and Jawaban correctly
const simpanSoalOld = `const jawaban = parseInt(document.getElementById('f-kunci').value);`;
const simpanSoalNew = `const tipe = document.getElementById('f-tipe') ? document.getElementById('f-tipe').value : 'PG';
            let jawaban = parseInt(document.getElementById('f-kunci').value);
            if (tipe === 'PGK') {
                const cbs = document.querySelectorAll('.f-kunci-cb:checked');
                jawaban = Array.from(cbs).map(cb => parseInt(cb.value));
            }`;
html = html.replace(simpanSoalOld, simpanSoalNew);

const objSoalOld = `topik: document.getElementById('f-mapel').selectedOptions[0]?.text || '',`;
const objSoalNew = `topik: document.getElementById('f-mapel').selectedOptions[0]?.text || '',
                tipe: tipe,`;
html = html.replace(objSoalOld, objSoalNew);

// Now update bukaEditSoal
const bukaEditOld = `document.getElementById('edit-kunci').value = q.jawaban || 0;`;
const bukaEditNew = `document.getElementById('edit-tipe').value = q.tipe || 'PG';
            window.updateFormTipe('edit');
            if (q.tipe === 'PGK' && Array.isArray(q.jawaban)) {
                const cbs = document.querySelectorAll('.edit-kunci-cb');
                cbs.forEach(cb => { cb.checked = q.jawaban.includes(parseInt(cb.value)); });
            } else {
                document.getElementById('edit-kunci').value = Array.isArray(q.jawaban) ? 0 : (q.jawaban || 0);
            }`;
html = html.replace(bukaEditOld, bukaEditNew);

// Now update simpanModalEdit
const simpanEditOld = `const jawaban = parseInt(document.getElementById('edit-kunci').value);`;
const simpanEditNew = `const tipe = document.getElementById('edit-tipe').value;
            let jawaban = parseInt(document.getElementById('edit-kunci').value);
            if (tipe === 'PGK') {
                const cbs = document.querySelectorAll('.edit-kunci-cb:checked');
                jawaban = Array.from(cbs).map(cb => parseInt(cb.value));
            }`;
html = html.replace(simpanEditOld, simpanEditNew);

const objEditOld = `pilihan: pilihan,`;
const objEditNew = `pilihan: pilihan,
                tipe: tipe,`;
html = html.replace(objEditOld, objEditNew);

fs.writeFileSync('index.html', html);
console.log('Admin JS patched for Tipe Soal.');
