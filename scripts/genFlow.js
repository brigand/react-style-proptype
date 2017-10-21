const fs = require('fs');
let data;
try {
  data = require('../data/allCamel.json');
} catch (e) {
  console.error(`Must run scripts/scrape.js first`);
  process.exit(7);
}

let out = ``;
out += `// @flow\n`;
out += `// generated by scripts/getFlow\n\n`;
out += `export type Style = {\n`;
data.forEach((prop) => {
  out += `  ${prop}?: ?string | ?number,\n`;
});

out += `}\n`;

fs.writeFileSync('src/Style.flow.js', out);

console.log(out);

