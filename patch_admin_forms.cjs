const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Inject f-tipe and edit-tipe
const fJenjangDiv = '<div class="grid grid-cols-2 gap-2">\n                            <select id="f-jenjang"';
const fTipeHtml = `<div class="grid grid-cols-3 gap-2">
                            <select id="f-tipe" onchange="window.updateFormTipe('f')" class="text-sm p-2.5 border border-slate-200 rounded-lg bg-indigo-50 outline-none font-bold text-indigo-700">
                                <option value="PG">Pilihan Ganda</option>
                                <option value="PGK">Pilihan Ganda Kompleks</option>
                                <option value="BS">Benar / Salah</option>
                            </select>
                            <select id="f-jenjang"`;

html = html.replace(fJenjangDiv, fTipeHtml);

// 2. Inject edit-tipe
const editSoalImg = '<input type="text" id="edit-soal-img"';
const editTipeHtml = `<select id="edit-tipe" onchange="window.updateFormTipe('edit')" class="w-full text-sm p-3 bg-indigo-50 border border-indigo-200 rounded-lg outline-none font-bold text-indigo-700 mb-3">
                        <option value="PG">Pilihan Ganda</option>
                        <option value="PGK">Pilihan Ganda Kompleks</option>
                        <option value="BS">Benar / Salah</option>
                    </select>\n                    <input type="text" id="edit-soal-img"`;

html = html.replace(editSoalImg, editTipeHtml);

// 3. Inject PGK Checkboxes for Add Form
const fKunciSelect = '<select id="f-kunci"';
const fKunciPGK = `<div id="f-kunci-pgk" class="hidden flex gap-2 items-center">
                                <label class="text-xs font-bold text-slate-600">Kunci:</label>
                                <label><input type="checkbox" value="0" class="f-kunci-cb"> A</label>
                                <label><input type="checkbox" value="1" class="f-kunci-cb"> B</label>
                                <label><input type="checkbox" value="2" class="f-kunci-cb"> C</label>
                                <label><input type="checkbox" value="3" class="f-kunci-cb"> D</label>
                                <label><input type="checkbox" value="4" class="f-kunci-cb"> E</label>
                            </div>\n                            <select id="f-kunci"`;

html = html.replace(fKunciSelect, fKunciPGK);

// 4. Inject PGK Checkboxes for Edit Form
const editKunciSelect = '<select id="edit-kunci"';
const editKunciPGK = `<div id="edit-kunci-pgk" class="hidden flex gap-2 items-center mb-3">
                            <label class="text-xs font-bold text-slate-600">Kunci Kompleks:</label>
                            <label><input type="checkbox" value="0" class="edit-kunci-cb"> A</label>
                            <label><input type="checkbox" value="1" class="edit-kunci-cb"> B</label>
                            <label><input type="checkbox" value="2" class="edit-kunci-cb"> C</label>
                            <label><input type="checkbox" value="3" class="edit-kunci-cb"> D</label>
                            <label><input type="checkbox" value="4" class="edit-kunci-cb"> E</label>
                        </div>\n                        <select id="edit-kunci"`;

html = html.replace(editKunciSelect, editKunciPGK);

fs.writeFileSync('index.html', html);
console.log('HTML patched for Admin UI Forms.');
