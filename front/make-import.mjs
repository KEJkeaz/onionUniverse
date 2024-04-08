import path from 'node:path' 
import fs from 'fs/promises'
import fg from 'fast-glob'
import * as CC from "change-case"
import { fileURLToPath } from 'url';

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
// console.log(fg)
async function make() {
  var files, lines, src;
  let loc = path.join(__dirname, './src/views/**/*.vue');
  console.log({loc})
  files = await fg([ loc ]);
  console.log({files})
  lines = files.map(function(fp) {

    let relativePath = '../../' + path.relative(__dirname, fp)
    var module_name;
    module_name = CC.pascalCase(path.basename(fp, path.extname(fp)));
    return `import ${module_name} from "${relativePath}" \nexport { ${module_name} }`
    // return "import " + module_name + " from \"" + relativePath + "\"\nexport { " + module_name + " }";
  });
  lines = [
    `/* * * * * * * * * * * * * * * * * * * * * * * * * * *`,
    `* ! IMPORTANT ! Auto-Geneated by following commands.`,
    `* cd ${__dirname}`,
    `* yarn esm ./make-import.mjs`,
    `* * * * * * * * * * * * * * * * * * * * * * * * * * */`
  ].concat(lines)
  src = lines.join('\n');
  console.log(src);
  
  return await fs.writeFile("./src/router/import-ui.js", src);
};

make();
