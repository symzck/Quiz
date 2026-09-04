import fs from 'fs';
let code = fs.readFileSync('server.js', 'utf8');

const targetStr = "const apiKey = process.env.GEMINI_API_KEY;";
const insertStr = `    if (req.body.useProceduralOnly) {
      const fallbackList = generateDynamicQuestions(jenjang, mapel, jurusan, topikTerpilih, riwayat, targetCount);
      return res.json({ 
        soal_list: fallbackList,
        source: 'dynamic_engine',
        message: \`Kuis TKA berhasil dibuat (\${fallbackList.length} butir soal penalaran prosedural).\`
      });
    }
    
`;

if (code.includes(targetStr)) {
    code = code.replace(targetStr, insertStr + targetStr);
    fs.writeFileSync('server.js', code);
    console.log("Patched server.js for procedural bypass");
} else {
    console.log("Could not find target string in server.js");
}
