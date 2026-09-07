import fs from 'fs';
let html = fs.readFileSync('index.html', 'utf8');

// Replace the UI element for quota
html = html.replace('<span class="font-semibold text-xs tracking-wide"> Sisa Kuis: <span id="sisa-kuota-text">5</span></span>', '<span class="font-semibold text-xs tracking-wide"><i class="fa-solid fa-crown text-amber-400"></i> Bebas Akses (Unlimited)</span>');

// Replace limit-info in modal
html = html.replace('Limit hari ini: <span id="limit-info" class="font-bold text-amber-600">5 / 5</span> kuis', 'Status Akun: <span id="limit-info" class="font-bold text-emerald-600">Premium / Bebas Batas</span>');

fs.writeFileSync('index.html', html);
