import { argv } from 'node:process';
import { basename, dirname, join } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
const path = argv[2];

if (!path) {
  console.error(
    'Please add path and componentname in the format `path/componentName`',
  );
  process.exit(1);
}

const componentName = basename(path);

const completePath = `src/${path}`;

const projectFolder = join('src', path);
mkdirSync(projectFolder, { recursive: true });

const componentData = `export default const ${componentName} = ({}) => {return <p>${componentName}</p>}`;
const indexFileData = `import ${componentName} from './${componentName}'; export default ${componentName}`;

writeFileSync(join(completePath, `${componentName}.tsx`), componentData);
writeFileSync(join(completePath, "index.ts"), indexFileData);
writeFileSync(join(completePath, `${componentName}.css`), indexFileData);
