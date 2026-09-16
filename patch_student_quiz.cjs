const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldRender = `const container = document.getElementById('options-container');
            container.innerHTML = q.pilihan.map((opsi, idx) => \`<button onclick="pilihOpsi(\${idx}, this)" class="w-full text-left p-3.5 rounded-xl border-2 border-slate-200 hover:border-indigo-500 font-semibold text-slate-700 text-sm transition"><span><strong class="mr-2 text-indigo-600">\${String.fromCharCode(65 + idx)}.</strong> \${opsi}</span></button>\`).join('');`;

const newRender = `const container = document.getElementById('options-container');
            if (q.tipe === 'PGK') {
                container.innerHTML = q.pilihan.map((opsi, idx) => \`<label class="w-full block text-left p-3.5 rounded-xl border-2 border-slate-200 hover:border-indigo-500 font-semibold text-slate-700 text-sm transition cursor-pointer flex items-center gap-3" id="lbl-pgk-\${idx}">
                    <input type="checkbox" value="\${idx}" class="pgk-checkbox w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500">
                    <span><strong class="text-indigo-600">\${String.fromCharCode(65 + idx)}.</strong> \${opsi}</span>
                </label>\`).join('');
                container.innerHTML += \`<button id="btn-jawab-pgk" onclick="window.submitPGK()" class="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow-md">Jawab</button>\`;
            } else {
                container.innerHTML = q.pilihan.map((opsi, idx) => \`<button onclick="pilihOpsi(\${idx}, this)" class="w-full text-left p-3.5 rounded-xl border-2 border-slate-200 hover:border-indigo-500 font-semibold text-slate-700 text-sm transition" id="btn-opt-\${idx}"><span><strong class="mr-2 text-indigo-600">\${String.fromCharCode(65 + idx)}.</strong> \${opsi}</span></button>\`).join('');
            }`;

html = html.replace(oldRender, newRender);

const submitPGKScript = `
        window.submitPGK = function() {
            if (userSelectedAnswer !== null) return;
            const cbs = document.querySelectorAll('.pgk-checkbox:checked');
            if (cbs.length === 0) {
                window.showToast("Pilih minimal satu jawaban", "error");
                return;
            }
            if (timerInterval) clearInterval(timerInterval);
            
            const selectedIdxs = Array.from(cbs).map(cb => parseInt(cb.value));
            userSelectedAnswer = selectedIdxs; // array
            
            const q = activeQuestions[currentIndex];
            let isCorrect = false;
            if (Array.isArray(q.jawaban)) {
                // Sort both arrays to compare
                const correctSorted = [...q.jawaban].sort();
                const userSorted = [...selectedIdxs].sort();
                isCorrect = JSON.stringify(correctSorted) === JSON.stringify(userSorted);
            }
            
            // UI Feedback
            document.querySelectorAll('.pgk-checkbox').forEach(cb => cb.disabled = true);
            document.getElementById('btn-jawab-pgk').classList.add('hidden');
            
            // Mark all correct answers with green
            let correctStr = '';
            if (Array.isArray(q.jawaban)) {
                q.jawaban.forEach(ans => {
                    const lbl = document.getElementById('lbl-pgk-' + ans);
                    if (lbl) lbl.className = "w-full block text-left p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 font-semibold text-emerald-900 text-sm flex items-center gap-3";
                });
                correctStr = q.jawaban.map(a => String.fromCharCode(65 + a)).join(', ');
            }
            
            // Mark wrong selections with red
            selectedIdxs.forEach(ans => {
                if (Array.isArray(q.jawaban) && !q.jawaban.includes(ans)) {
                    const lbl = document.getElementById('lbl-pgk-' + ans);
                    if (lbl) lbl.className = "w-full block text-left p-3.5 rounded-xl border-2 border-rose-500 bg-rose-50 font-semibold text-rose-900 text-sm flex items-center gap-3";
                }
            });

            if (isCorrect) {
                document.getElementById('feedback-msg').innerHTML = "<span class='text-emerald-600 font-bold'>✅ Benar!</span>";
                correctCount++;
            } else {
                document.getElementById('feedback-msg').innerHTML = \`<span class='text-rose-600 font-bold'>❌ Salah (Kunci: \${correctStr})</span>\`;
            }

            if(q.pembahasan) {
                document.getElementById('explanation-text').innerText = q.pembahasan;
                document.getElementById('explanation-box').classList.remove('hidden');
            }
            document.getElementById('btn-next').classList.remove('hidden');
        }
`;

// Insert submitPGK function right after pilihOpsi
html = html.replace('window.lanjutSoal = async function() {', submitPGKScript + '\n        window.lanjutSoal = async function() {');

// Fix bug in pilihOpsi where buttons array might include btn-jawab-pgk if we used children, but now we use getElementById
const pilihOpsiOld = `const buttons = document.getElementById('options-container').children;

            if (idx === q.jawaban) {
                element.className = "w-full text-left p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold text-sm";
                document.getElementById('feedback-msg').innerHTML = "<span class='text-emerald-600 font-bold'>✅ Benar!</span>";
                correctCount++;
            } else {
                element.className = "w-full text-left p-3.5 rounded-xl border-2 border-rose-500 bg-rose-50 text-rose-900 font-semibold text-sm";
                if (buttons[q.jawaban]) buttons[q.jawaban].className = "w-full text-left p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold text-sm";
                document.getElementById('feedback-msg').innerHTML = \`<span class='text-rose-600 font-bold'>❌ Salah (Kunci: \${String.fromCharCode(65 + q.jawaban)})</span>\`;
            }

            if(q.pembahasan) {
                document.getElementById('explanation-text').innerText = q.pembahasan;
                document.getElementById('explanation-box').classList.remove('hidden');
            }
            for(let b of buttons) b.style.pointerEvents = 'none';`;

const pilihOpsiNew = `const buttons = document.getElementById('options-container').querySelectorAll('button');

            if (idx === q.jawaban) {
                element.className = "w-full text-left p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold text-sm transition";
                document.getElementById('feedback-msg').innerHTML = "<span class='text-emerald-600 font-bold'>✅ Benar!</span>";
                correctCount++;
            } else {
                element.className = "w-full text-left p-3.5 rounded-xl border-2 border-rose-500 bg-rose-50 text-rose-900 font-semibold text-sm transition";
                const correctBtn = document.getElementById('btn-opt-' + q.jawaban);
                if (correctBtn) correctBtn.className = "w-full text-left p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold text-sm transition";
                document.getElementById('feedback-msg').innerHTML = \`<span class='text-rose-600 font-bold'>❌ Salah (Kunci: \${String.fromCharCode(65 + (q.jawaban || 0))})</span>\`;
            }

            if(q.pembahasan) {
                document.getElementById('explanation-text').innerText = q.pembahasan;
                document.getElementById('explanation-box').classList.remove('hidden');
            }
            for(let b of buttons) b.style.pointerEvents = 'none';`;

html = html.replace(pilihOpsiOld, pilihOpsiNew);

fs.writeFileSync('index.html', html);
console.log('Student Quiz JS patched for Tipe Soal PGK.');
