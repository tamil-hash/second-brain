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

const componentData = `const ${componentName} = () => {
  return <p>${componentName}</p>;
};

export default ${componentName};
`;

const indexFileData = `export { default } from './${componentName}';
`;

writeFileSync(join(completePath, `${componentName}.tsx`), componentData);
writeFileSync(join(completePath, "index.ts"), indexFileData);
writeFileSync(join(completePath, `${componentName}.css`), "");


console.log(`Created ${componentName} Component Successfully.`)