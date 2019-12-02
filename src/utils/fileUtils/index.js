/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { SOL_IMPORT_REGEXP, SOL_VERSION_REGEXP } from '../../constants';
import getImports from './get-sol-imports';
import { fs, path } from '../../constants/windowModules';

const importedFiles = {};

const readSolFile = (src) => {
  let mainImport;
  if (!fs.existsSync(src)) throw new Error(`${src} - file not exist`);
  mainImport = fs.readFileSync(src, 'utf8');
  const importList = getImports(mainImport);
  const currentFolder = src.replace(/(((\.\/|\.\.\/)).{1,})*([a-zA-z0-9])*(\.sol)/g, '');
  importList.forEach((file) => {
    const pathToFile = path.join(currentFolder, file);
    if (!importedFiles[pathToFile] && (pathToFile !== src)) {
      const includedFile = (readSolFile(pathToFile)).replace(SOL_VERSION_REGEXP, '');
      if (mainImport.match(SOL_IMPORT_REGEXP)) {
        mainImport = mainImport.replace(mainImport.match(SOL_IMPORT_REGEXP)[0], includedFile);
      }
      importedFiles[pathToFile] = true;
    } else {
      mainImport = mainImport.replace(mainImport.match(SOL_IMPORT_REGEXP)[0], '');
    }
  });
  return mainImport;
};

export default readSolFile;
