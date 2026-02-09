const fs = require('fs');
const pdf = require('pdf-parse');
const dataBuffer = fs.readFileSync('legal-chatbot/data/raw/Rules_of_Court_2012.pdf');
console.log('Type of pdf:', typeof pdf);
console.log('Keys of pdf:', Object.keys(pdf));
