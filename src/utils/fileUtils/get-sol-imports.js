import { SOL_PATH_REGEXP } from '../../constants';

const getImports = (file) => {
  const files = file.match(SOL_PATH_REGEXP);
  return files ? files.map((singleFile) => singleFile.replace(new RegExp(/('|")/g), '')) : [];
};
export default getImports;
