const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const sampleQuestions = [
    {
        "id": "tka_bs_sample_01",
        "jenjang": "SMA",
        "mapel": "Bahasa Indonesia",
        "subtes": "Literasi",
        "tingkat": "Mudah",
        "topik": "Logika",
        "tipe": "BS",
        "stimulus": "Pernyataan Benar atau Salah sangat bergantung pada fakta dasar yang tidak terbantahkan.",
        "soal": "Matahari terbit dari sebelah barat dan tenggelam di sebelah timur.",
        "pilihan": [
            "Benar",
            "Salah"
        ],
        "jawaban": 1,
        "pembahasan": "Matahari selalu terbit dari sebelah timur dan tenggelam di sebelah barat. Oleh karena itu pernyataan di atas adalah Salah."
    },
    {
        "id": "tka_pgk_sample_01",
        "jenjang": "SMA",
        "mapel": "Matematika",
        "subtes": "Aritmatika Dasar",
        "tingkat": "Sedang",
        "topik": "Bilangan",
        "tipe": "PGK",
        "stimulus": "Dalam sistem bilangan riil, ada berbagai macam kategori bilangan seperti bilangan genap, ganjil, prima, dan rasional.",
        "soal": "Manakah di antara pilihan di bawah ini yang merupakan bilangan genap positif? (Pilih semua yang benar)",
        "pilihan": [
            "2",
            "7",
            "14",
            "-4",
            "9"
        ],
        "jawaban": [0, 2],
        "pembahasan": "Angka 2 dan 14 adalah bilangan genap dan juga bernilai positif. Sedangkan -4 genap tapi negatif, dan 7, 9 adalah bilangan ganjil."
    }
];

const qString = sampleQuestions.map(q => JSON.stringify(q, null, 4)).join(',\n    ') + ',';
html = html.replace('const DEFAULT_QUESTIONS = [', 'const DEFAULT_QUESTIONS = [\n    ' + qString);

fs.writeFileSync('index.html', html);
console.log("Added BS and PGK sample questions to DEFAULT_QUESTIONS.");
