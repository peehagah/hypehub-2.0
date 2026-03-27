const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SQUADS_DIR = path.join(process.cwd(), 'data', 'squads');
console.log('SQUADS_DIR:', SQUADS_DIR);
console.log('Exists:', fs.existsSync(SQUADS_DIR));

if (fs.existsSync(SQUADS_DIR)) {
  const entries = fs.readdirSync(SQUADS_DIR);
  console.log('Entries:', entries);
  entries.forEach(code => {
    const file = path.join(SQUADS_DIR, code, 'squad.yaml');
    console.log(`Checking ${code}:`, fs.existsSync(file));
  });
}
