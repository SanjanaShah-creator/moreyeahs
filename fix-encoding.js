const fs = require('fs');

// Win-1252 special range: byte -> Unicode code point
const cp1252Map = {
  0x80:0x20AC,0x82:0x201A,0x83:0x0192,0x84:0x201E,0x85:0x2026,
  0x86:0x2020,0x87:0x2021,0x88:0x02C6,0x89:0x2030,0x8A:0x0160,
  0x8B:0x2039,0x8C:0x0152,0x8E:0x017D,0x91:0x2018,0x92:0x2019,
  0x93:0x201C,0x94:0x201D,0x95:0x2022,0x96:0x2013,0x97:0x2014,
  0x98:0x02DC,0x99:0x2122,0x9A:0x0161,0x9B:0x203A,0x9C:0x0153,
  0x9E:0x017E,0x9F:0x0178
};

// Build reverse map: Unicode code point -> Win-1252 byte
const toW1252 = {};
for (let i = 0; i <= 0x7F; i++) toW1252[i] = i;
for (let i = 0xA0; i <= 0xFF; i++) toW1252[i] = i;
for (const [b,cp] of Object.entries(cp1252Map)) toW1252[cp] = parseInt(b);
// C1 control chars (undefined in Win-1252, pass byte through)
for (let i = 0x80; i <= 0x9F; i++) if (!(i in toW1252)) toW1252[i] = i;

function cpToByte(cp) { return toW1252[cp] !== undefined ? toW1252[cp] : null; }

function tryDecode3(b1, b2, b3) {
  if (b1 === null || b2 === null || b3 === null) return null;
  if (b2 < 0x80 || b2 > 0xBF || b3 < 0x80 || b3 > 0xBF) return null;
  const s = Buffer.from([b1, b2, b3]).toString('utf8');
  return s.includes('�') ? null : s;
}
function tryDecode2(b1, b2) {
  if (b1 === null || b2 === null) return null;
  if (b2 < 0x80 || b2 > 0xBF) return null;
  const s = Buffer.from([b1, b2]).toString('utf8');
  return s.includes('�') ? null : s;
}

function fixFile(content) {
  if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
  let out = '';
  let i = 0;
  while (i < content.length) {
    const cp1 = content.codePointAt(i);
    const b1 = cpToByte(cp1);

    // Try 3-byte sequences (lead byte E0-EF)
    if (b1 !== null && b1 >= 0xE0 && b1 <= 0xEF && i + 2 < content.length) {
      const cp2 = content.codePointAt(i + 1);
      const cp3 = content.codePointAt(i + 2);
      const b2 = cpToByte(cp2);
      const b3 = cpToByte(cp3);

      // All 3 bytes recoverable
      const d = tryDecode3(b1, b2, b3);
      if (d) { out += d; i += 3; continue; }

      // Third byte was 0x94 (U+201D) sanitized to ASCII " (0x22)
      if (b2 !== null && b2 >= 0x80 && b2 <= 0xBF && cp3 === 0x22) {
        const d2 = tryDecode3(b1, b2, 0x94);
        if (d2) { out += d2; i += 3; continue; }
      }
      // Second byte was 0x94 sanitized to ASCII " (0x22)
      if (cp2 === 0x22 && b3 !== null && b3 >= 0x80 && b3 <= 0xBF) {
        const d2 = tryDecode3(b1, 0x94, b3);
        if (d2) { out += d2; i += 3; continue; }
      }
    }

    // Try 2-byte sequences (lead byte C2-DF)
    if (b1 !== null && b1 >= 0xC2 && b1 <= 0xDF && i + 1 < content.length) {
      const cp2 = content.codePointAt(i + 1);
      const b2 = cpToByte(cp2);

      const d = tryDecode2(b1, b2);
      if (d) { out += d; i += 2; continue; }

      // Second byte was 0x94 sanitized to ASCII "
      if (cp2 === 0x22) {
        const d2 = tryDecode2(b1, 0x94);
        if (d2) { out += d2; i += 2; continue; }
      }
    }

    out += content.charAt(i);
    i++;
  }
  return out;
}

const base = 'c:/Users/user.MDEVPC-238/Desktop/MoreYeahs Website/moreyeahs-website/';
const files = [
  'src/app/solutions/web-app-development/page.tsx',
  'src/app/solutions/cloud-infrastructure/page.tsx',
  'src/app/solutions/data-science/page.tsx',
  'src/app/solutions/salesforce-services/page.tsx',
  'src/app/solutions/microsoft-services/page.tsx',
  'src/components/solutions/ServicePageTemplate.tsx',
];

for (const f of files) {
  const path = base + f;
  const original = fs.readFileSync(path, 'utf8');
  const before = [...original].filter(c => c.codePointAt(0) > 127).length;
  const fixed = fixFile(original);
  const after = [...fixed].filter(c => c.codePointAt(0) > 127).length;
  fs.writeFileSync(path, fixed, 'utf8');
  console.log(f.split('/').pop() + ': non-ASCII ' + before + ' -> ' + after);
}
console.log('Done.');
