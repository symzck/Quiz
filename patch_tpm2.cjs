const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let questionsJs = fs.readFileSync('tka_tpm2_data.js', 'utf8');

// The file tka_tpm2_data.js contains: const TPM2_QUESTIONS = [...];
// Let's parse the JSON part.
let jsonStr = questionsJs.replace('const TPM2_QUESTIONS = ', '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);

let questions = JSON.parse(jsonStr);

let qString = questions.map(q => JSON.stringify(q, null, 4)).join(',\n    ') + ',';

html = html.replace('const DEFAULT_QUESTIONS = [', 'const DEFAULT_QUESTIONS = [\n    ' + qString);

fs.writeFileSync('index.html', html);
console.log("Successfully patched index.html with new TPM2 questions");
