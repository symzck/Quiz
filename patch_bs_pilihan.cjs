const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update simpanSoalCloud
const pilCloudOld = `if (jenjang === 'SMA') {
                const pilE = document.getElementById('f-pil-E').value.trim();
                if (!pilE) return window.showToast("Wajib mengisi opsi E untuk tingkat SMA!", "error");
                pilihan.push(pilE);
            }`;
const pilCloudNew = `if (tipe === 'BS') {
                pilihan.length = 2; // Hanya A dan B
            } else if (jenjang === 'SMA') {
                const pilE = document.getElementById('f-pil-E').value.trim();
                if (!pilE) return window.showToast("Wajib mengisi opsi E untuk tingkat SMA!", "error");
                pilihan.push(pilE);
            }`;
html = html.replace(pilCloudOld, pilCloudNew);

// Update simpanModalEdit
const pilEditOld = `if (jenjang === 'SMA' && editPil4) {
                pilihan.push(editPil4);
            }`;
const pilEditNew = `if (tipe === 'BS') {
                pilihan.length = 2; // Hanya A dan B
            } else if (jenjang === 'SMA' && editPil4) {
                pilihan.push(editPil4);
            }`;
html = html.replace(pilEditOld, pilEditNew);

fs.writeFileSync('index.html', html);
console.log('Fixed pilihan array for BS in simpan functions.');
