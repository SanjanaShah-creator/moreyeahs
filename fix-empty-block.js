const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'src/components/solutions/ServicePageTemplate.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the empty conditional block
const lines = content.split('\n');
const result = [];
let i = 0;
while (i < lines.length) {
  const line = lines[i];
  // Detect the empty block pattern: "{data.capabilities.length > 0 && (" followed by ")}"
  if (line.trim() === '{data.capabilities.length > 0 && (' && 
      i + 1 < lines.length && lines[i+1].trim() === ')}') {
    console.log(`Removing empty block at lines ${i+1}-${i+2}`);
    i += 2; // skip both lines
    continue;
  }
  result.push(line);
  i++;
}

fs.writeFileSync(filePath, result.join('\n'), 'utf8');
console.log('Done');
