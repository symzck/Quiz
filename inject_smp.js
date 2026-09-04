import fs from 'fs';

const smpData = JSON.parse(fs.readFileSync('parsed_smp_data.json', 'utf8'));
const smpDataString = JSON.stringify(smpData, null, 4);

let html = fs.readFileSync('index.html', 'utf8');

// Find the declaration of DEFAULT_QUESTIONS
const target = 'const DEFAULT_QUESTIONS = [';
const replacement = `const DEFAULT_QUESTIONS = [\n...${smpDataString},\n`;

if (html.includes(target)) {
    html = html.replace(target, replacement);
    fs.writeFileSync('index.html', html);
    console.log("Successfully injected SMP data into index.html");
} else {
    console.log("Failed to find DEFAULT_QUESTIONS array in index.html");
}
