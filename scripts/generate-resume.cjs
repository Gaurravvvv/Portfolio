const fs = require('fs');

const text = [
  'BT /F1 24 Tf 72 700 Td (Gaurav Vibhandik) Tj ET',
  'BT /F1 14 Tf 72 660 Td (Resume) Tj ET',
  'BT /F1 12 Tf 72 620 Td (Final version coming soon.) Tj ET',
  'BT /F1 10 Tf 72 580 Td (Replace this file with your actual resume before deployment.) Tj ET',
].join('\n');

const objects = [
  '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj',
  '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj',
  '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj',
  `4 0 obj\n<< /Length ${text.length} >>\nstream\n${text}\nendstream\nendobj`,
  '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj',
];

let body = '%PDF-1.4\n';
const offsets = [];
for (const obj of objects) {
  offsets.push(body.length);
  body += obj + '\n';
}

const xrefOffset = body.length;
let xref = 'xref\n0 6\n0000000000 65535 f \n';
for (const off of offsets) {
  xref += String(off).padStart(10, '0') + ' 00000 n \n';
}

const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

fs.writeFileSync('public/resume.pdf', body + xref + trailer);
console.log('Created public/resume.pdf');
