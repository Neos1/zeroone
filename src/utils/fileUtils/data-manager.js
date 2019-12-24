import {
  fs,
  path,
  PATH_TO_DATA,
} from '../../constants/windowModules';

/**
 * Method for creating directory with parents
 * if needed
 *
 * @see https://stackoverflow.com/a/40686853/9965627
 *
 * @param {string} targetDir target directory
 * @returns {string} directory
 */
const mkDirByPathSync = (targetDir, { isRelativeToScript = false } = {}) => {
  const { sep } = path;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') { // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (
        !caughtErr
        || (caughtErr && curDir === path.resolve(targetDir))
      ) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
};

/**
 * Method for write object data to file
 * with some name
 *
 * @param {object} param0 data for writing
 * @param {string} param0.name name to write to file
 * @param {object} param0.data data object to write to a file
 * @param {string} [param0.basicPath] basic path for write
 */
const writeDataToFile = async ({
  name,
  data,
  basicPath,
}) => {
  const dataPath = path.join(basicPath || PATH_TO_DATA);
  console.log('basicPath', basicPath);
  if (!fs.existsSync(path.join(PATH_TO_DATA))) {
    await mkDirByPathSync(path.join(PATH_TO_DATA), { recursive: true });
  }
  // Create folder for file, if folder does not exist
  if (!fs.existsSync(dataPath)) {
    await mkDirByPathSync(path.join(dataPath), { recursive: true });
  }
  fs.writeFileSync(
    path.join(basicPath || PATH_TO_DATA, `${name}.json`),
    JSON.stringify(data, null, '\t'),
    'utf8',
  );
};

/**
 * Method for reading file. In case error (file
 * does not exist) return empty object.
 *
 * @param {object} param0 data for method
 * @param {string} param0.name name file for reading
 * @returns {object} JSON parsed data
 * @param {string} [param0.basicPath] basic path for read
 */
const readDataFromFile = ({
  name,
  basicPath,
}) => {
  let dataFile;
  try {
    dataFile = fs.readFileSync(
      path.join(basicPath || PATH_TO_DATA, `./${name}.json`),
      'utf8',
    );
  } catch (err) {
    return {};
  }
  return JSON.parse(dataFile);
};

export default writeDataToFile;

export {
  writeDataToFile,
  readDataFromFile,
};
