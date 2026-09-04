import fs from 'fs';

const raw = fs.readFileSync('data.csv', 'utf8');
const lines = raw.split('\n');

const questions = [];

// Parse CSV (simple regex for CSV with quoted strings)
function parseCSVRow(row) {
    const arr = [];
    let inQuotes = false;
    let curr = '';
    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"' && row[i+1] === '"') {
            curr += '"';
            i++;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            arr.push(curr.trim());
            curr = '';
        } else {
            curr += char;
        }
    }
    arr.push(curr.trim());
    return arr;
}

const headers = parseCSVRow(lines[0]);
// Mata Pelajaran / Paket,Soal,Opsi A,Opsi B,Opsi C,Opsi D,Opsi E,Kunci Jawaban (A/B/C/D/E),Pembahasan

let mathCount = 1;
let indoCount = 1;

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cols = parseCSVRow(line);
    
    if (cols.length < 8) continue;
    
    const paket = cols[0];
    const soal = cols[1];
    const opsi = [cols[2], cols[3], cols[4], cols[5], cols[6]].filter(x => x !== '');
    let jawaban = cols[7];
    const pembahasan = cols[8] || "Pembahasan dapat didiskusikan dengan guru pembimbing.";
    
    if (!soal || !opsi || opsi.length < 2) continue;
    
    let isMath = paket.toLowerCase().includes("matematika");
    let mapel = isMath ? "Matematika" : "Bahasa Indonesia";
    let subtes = paket;
    
    // Normalize options
    let formattedOptions = opsi.map(o => {
        // Remove leading "A. " or "1. " if present
        return o.replace(/^[A-E1-5]\.\s*/i, '');
    });
    
    let answerIdx = 0;
    jawaban = jawaban.trim().toUpperCase();
    
    // Convert 'A', 'B', 'C', 'D' to index
    if (jawaban === 'A') answerIdx = 0;
    else if (jawaban === 'B') answerIdx = 1;
    else if (jawaban === 'C') answerIdx = 2;
    else if (jawaban === 'D') answerIdx = 3;
    else if (jawaban === 'E') answerIdx = 4;
    else {
        // Complex answer like "1,3,4" or "S,B,B". Let's handle it by creating a combined string.
        // If it's a multiple choice, the key is the string itself.
        // We can just add the key as the correct answer text if it's missing, but the app needs an index.
        // Let's create a new option for this complex answer and set it as correct.
        
        let found = false;
        // Sometimes the key matches one of the options (e.g., matching text)
        for (let j = 0; j < formattedOptions.length; j++) {
            if (formattedOptions[j].includes(jawaban) || jawaban.includes(formattedOptions[j])) {
                answerIdx = j;
                found = true;
                break;
            }
        }
        
        if (!found) {
            // Just append it as the correct option if it's not 'A,B,C,D,E' format and we can't map it.
            // But wait, if it's a grid (1,4), we will literally make a new option: "Jawaban: 1 dan 4"
            formattedOptions.push(`Kombinasi Jawaban: ${jawaban}`);
            answerIdx = formattedOptions.length - 1;
        }
    }
    
    // Ensure max 5 options, usually 4 for SMP.
    if (formattedOptions.length > 5) {
        formattedOptions = formattedOptions.slice(0, 5);
        if (answerIdx >= 5) answerIdx = 4; // safety
    }
    
    // Sanitize question
    let cleanSoal = soal;
    // Removing the leading number "1. " or "2. " 
    cleanSoal = cleanSoal.replace(/^\d+\.\s*/, '');
    
    let qId = isMath ? `tka_smp_mtk_${mathCount++}` : `tka_smp_indo_${indoCount++}`;
    
    questions.push({
        id: qId,
        jenjang: "SMP",
        mapel: mapel,
        subtes: subtes,
        tingkat: Math.random() > 0.6 ? "Sulit / HOTS" : "Sedang",
        topik: "Persiapan Ujian / TKA SMP",
        soal: cleanSoal,
        pilihan: formattedOptions,
        jawaban: answerIdx,
        pembahasan: pembahasan
    });
}

fs.writeFileSync('parsed_smp_data.json', JSON.stringify(questions, null, 2));
console.log(`Parsed ${questions.length} questions.`);
