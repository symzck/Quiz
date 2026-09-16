const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace f-stimulus-img with rich uploader
const oldFStimulusImg = `<input type="text" id="f-stimulus-img" placeholder="URL Gambar Wacana/Stimulus (Opsional)" class="w-full text-sm p-2 border border-slate-200 rounded-lg bg-slate-50 outline-none">`;
const newFStimulusImg = `
                        <div class="border border-dashed border-slate-300 rounded-xl p-2.5 bg-slate-50 relative group transition hover:border-indigo-400">
                            <div class="flex items-center gap-2">
                                <input type="text" id="f-stimulus-img" oninput="window.previewImgInput('f-stimulus')" placeholder="URL Gambar Wacana atau Tempel / Paste (Ctrl+V)..." class="flex-1 text-xs p-2 border border-slate-200 rounded-lg bg-white outline-none">
                                <label class="cursor-pointer px-2.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 transition flex items-center gap-1 shrink-0" title="Upload dari File">
                                    <i class="fa-solid fa-cloud-arrow-up"></i> Upload
                                    <input type="file" accept="image/*" class="hidden" onchange="window.handleImgUpload(event, 'f-stimulus')">
                                </label>
                            </div>
                            <div id="f-stimulus-preview-wrap" class="hidden mt-2 relative inline-block">
                                <img id="f-stimulus-preview" src="" class="max-h-28 rounded-lg border border-slate-200 shadow-sm object-contain bg-white">
                                <button type="button" onclick="window.clearImgInput('f-stimulus')" class="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow hover:bg-rose-700"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>`;

html = html.replace(oldFStimulusImg, newFStimulusImg);

// Replace f-soal-img with rich uploader
const oldFSoalImg = `<input type="text" id="f-soal-img" placeholder="URL Gambar Tambahan untuk Soal (Opsional)" class="w-full text-sm p-2 border border-slate-200 rounded-lg bg-slate-50 outline-none">`;
const newFSoalImg = `
                        <div class="border border-dashed border-slate-300 rounded-xl p-2.5 bg-slate-50 relative group transition hover:border-indigo-400">
                            <div class="flex items-center gap-2">
                                <input type="text" id="f-soal-img" oninput="window.previewImgInput('f-soal')" placeholder="URL Gambar Soal atau Tempel / Paste (Ctrl+V)..." class="flex-1 text-xs p-2 border border-slate-200 rounded-lg bg-white outline-none">
                                <label class="cursor-pointer px-2.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 transition flex items-center gap-1 shrink-0" title="Upload dari File">
                                    <i class="fa-solid fa-cloud-arrow-up"></i> Upload
                                    <input type="file" accept="image/*" class="hidden" onchange="window.handleImgUpload(event, 'f-soal')">
                                </label>
                            </div>
                            <div id="f-soal-preview-wrap" class="hidden mt-2 relative inline-block">
                                <img id="f-soal-preview" src="" class="max-h-28 rounded-lg border border-slate-200 shadow-sm object-contain bg-white">
                                <button type="button" onclick="window.clearImgInput('f-soal')" class="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow hover:bg-rose-700"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>`;

html = html.replace(oldFSoalImg, newFSoalImg);

// Replace edit-stimulus-img in modal
const oldEditStimulusImg = `<input type="text" id="edit-stimulus-img" class="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none" placeholder="https://example.com/image.jpg">`;
const newEditStimulusImg = `
                    <div class="border border-dashed border-slate-300 rounded-xl p-2.5 bg-slate-50 relative">
                        <div class="flex items-center gap-2">
                            <input type="text" id="edit-stimulus-img" oninput="window.previewImgInput('edit-stimulus')" class="flex-1 text-xs p-2.5 bg-white border border-slate-200 rounded-lg outline-none" placeholder="https://example.com/image.jpg atau Tempel (Ctrl+V)">
                            <label class="cursor-pointer px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 transition flex items-center gap-1 shrink-0">
                                <i class="fa-solid fa-cloud-arrow-up"></i> Upload
                                <input type="file" accept="image/*" class="hidden" onchange="window.handleImgUpload(event, 'edit-stimulus')">
                            </label>
                        </div>
                        <div id="edit-stimulus-preview-wrap" class="hidden mt-2 relative inline-block">
                            <img id="edit-stimulus-preview" src="" class="max-h-28 rounded-lg border border-slate-200 shadow-sm object-contain bg-white">
                            <button type="button" onclick="window.clearImgInput('edit-stimulus')" class="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow hover:bg-rose-700"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                    </div>`;

html = html.replace(oldEditStimulusImg, newEditStimulusImg);

// Replace edit-soal-img in modal
const oldEditSoalImg = `<input type="text" id="edit-soal-img" class="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none mb-3" placeholder="URL Gambar Tambahan untuk Soal (Opsional)">`;
const newEditSoalImg = `
                    <div class="border border-dashed border-slate-300 rounded-xl p-2.5 bg-slate-50 relative mb-3">
                        <div class="flex items-center gap-2">
                            <input type="text" id="edit-soal-img" oninput="window.previewImgInput('edit-soal')" class="flex-1 text-xs p-2.5 bg-white border border-slate-200 rounded-lg outline-none" placeholder="URL Gambar Soal atau Tempel (Ctrl+V)">
                            <label class="cursor-pointer px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 transition flex items-center gap-1 shrink-0">
                                <i class="fa-solid fa-cloud-arrow-up"></i> Upload
                                <input type="file" accept="image/*" class="hidden" onchange="window.handleImgUpload(event, 'edit-soal')">
                            </label>
                        </div>
                        <div id="edit-soal-preview-wrap" class="hidden mt-2 relative inline-block">
                            <img id="edit-soal-preview" src="" class="max-h-28 rounded-lg border border-slate-200 shadow-sm object-contain bg-white">
                            <button type="button" onclick="window.clearImgInput('edit-soal')" class="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow hover:bg-rose-700"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                    </div>`;

html = html.replace(oldEditSoalImg, newEditSoalImg);

// Add JavaScript helper functions for image uploading, previewing, and clipboard pasting
const imgHandlerJS = `
        // Image Upload, Paste (Ctrl+V) & Preview Helpers
        window.previewImgInput = function(prefix) {
            const input = document.getElementById(prefix + '-img');
            const wrap = document.getElementById(prefix + '-preview-wrap');
            const img = document.getElementById(prefix + '-preview');
            if (input && wrap && img) {
                if (input.value && input.value.trim()) {
                    img.src = input.value.trim();
                    wrap.classList.remove('hidden');
                } else {
                    img.src = '';
                    wrap.classList.add('hidden');
                }
            }
        };

        window.clearImgInput = function(prefix) {
            const input = document.getElementById(prefix + '-img');
            const wrap = document.getElementById(prefix + '-preview-wrap');
            const img = document.getElementById(prefix + '-preview');
            if (input) input.value = '';
            if (img) img.src = '';
            if (wrap) wrap.classList.add('hidden');
        };

        window.handleImgUpload = function(event, prefix) {
            const file = event.target.files && event.target.files[0];
            if (!file) return;
            if (file.size > 2 * 1024 * 1024) {
                return window.showToast("Ukuran gambar maksimal 2MB agar loading cepat", "error");
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Data = e.target.result;
                const input = document.getElementById(prefix + '-img');
                if (input) {
                    input.value = base64Data;
                    window.previewImgInput(prefix);
                    window.showToast("Gambar berhasil di-upload!", "success");
                }
            };
            reader.readAsDataURL(file);
        };

        // Attach clipboard paste handler globally for image inputs
        ['f-stimulus', 'f-soal', 'edit-stimulus', 'edit-soal'].forEach(prefix => {
            document.addEventListener('DOMContentLoaded', () => {
                const input = document.getElementById(prefix + '-img');
                if (!input) return;
                input.addEventListener('paste', (e) => {
                    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
                    for (let item of items) {
                        if (item.type.indexOf('image') !== -1) {
                            const blob = item.getAsFile();
                            const reader = new FileReader();
                            reader.onload = function(event) {
                                input.value = event.target.result;
                                window.previewImgInput(prefix);
                                window.showToast("Gambar dari Clipboard (Ctrl+V) berhasil ditempel!", "success");
                            };
                            reader.readAsDataURL(blob);
                            e.preventDefault();
                            break;
                        }
                    }
                });
            });
        });
`;

html = html.replace('window.updateFormTipe = function(prefix) {', imgHandlerJS + '\n        window.updateFormTipe = function(prefix) {');

// In bukaEditSoal, update preview
const bukaEditOldPreview = `document.getElementById('edit-stimulus-img').value = q.stimulus_img || '';`;
const bukaEditNewPreview = `document.getElementById('edit-stimulus-img').value = q.stimulus_img || '';
            window.previewImgInput('edit-stimulus');
            if (editSoalImg) {
                editSoalImg.value = q.soal_img || '';
                window.previewImgInput('edit-soal');
            }`;
html = html.replace(bukaEditOldPreview, bukaEditNewPreview);

fs.writeFileSync('index.html', html);
console.log("Successfully patched rich image uploader & Ctrl+V paste handlers into index.html!");
