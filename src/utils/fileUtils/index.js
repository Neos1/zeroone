/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
import { SOL_IMPORT_REGEXP, SOL_VERSION_REGEXP, VM_IMPORT_REGEXP } from '../../constants';
import getImports from './get-sol-imports';
import { fs, path, ROOT_DIR } from '../../constants/windowModules';

const readSolFile = (src, importedFiles) => {
  let mainImport;
  if (VM_IMPORT_REGEXP.test(src)) {
    [src] = src.match(VM_IMPORT_REGEXP);
    src = path.resolve(ROOT_DIR, `../node_modules/${src}`);
  }

  if (!fs.existsSync(src)) throw new Error(`${src} - file not exist`);
  mainImport = fs.readFileSync(src, 'utf8');
  const importList = getImports(mainImport);
  const currentFolder = src.replace(/(((\.\/|\.\.\/)).{1,})*([a-zA-Z0-9])*(\.sol)/g, '');
  importList.forEach((file) => {
    const pathToFile = path.join(currentFolder, file);
    if (!importedFiles[pathToFile] && (pathToFile !== src)) {
      const includedFile = (readSolFile(pathToFile, importedFiles)).replace(SOL_VERSION_REGEXP, '');
      if (mainImport.match(SOL_IMPORT_REGEXP)) {
        mainImport = mainImport.replace(mainImport.match(SOL_IMPORT_REGEXP)[0], includedFile);
      }
      // eslint-disable-next-line no-param-reassign
      importedFiles[pathToFile] = true;
    } else {
      mainImport = mainImport.replace(mainImport.match(SOL_IMPORT_REGEXP)[0], '');
    }
  });
  return mainImport;
};

export default readSolFile;
