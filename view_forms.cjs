const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const addFormStart = html.indexOf('<div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6" id="add-form">');
console.log(html.substring(addFormStart, addFormStart + 2000));
