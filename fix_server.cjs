const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const badBlock = `function getAI() {      if (req.body.useProceduralOnly) {      const fallbackList = generateDynamicQuestions(jenjang, mapel, jurusan, topikTerpilih, riwayat, targetCount);      return res.json({         soal_list: fallbackList,        source: 'dynamic_engine',        message: \`Kuis TKA berhasil dibuat (\${fallbackList.length} butir soal penalaran prosedural).\`      });    }    const apiKey = process.env.GEMINI_API_KEY;`;

const goodBlock = `function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;`;

if (code.includes(badBlock)) {
  code = code.replace(badBlock, goodBlock);
  fs.writeFileSync('server.js', code);
  console.log("Fixed getAI in server.js!");
} else {
  console.log("Pattern not matched directly, checking alternative replacement...");
  // regex replace
  code = code.replace(/function getAI\(\)\s*\{[\s\S]*?const apiKey = process\.env\.GEMINI_API_KEY;/, `function getAI() {\n  const apiKey = process.env.GEMINI_API_KEY;`);
  fs.writeFileSync('server.js', code);
  console.log("Regex replaced getAI in server.js!");
}
