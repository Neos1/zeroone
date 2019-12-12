
import {
  fs,
  path,
  PATH_TO_DATA,
} from '../../constants/windowModules';

/**
 * Method for write object data to file
 * with some name
 *
 * @param {object} param0 data for writing
 * @param {string} param0.name name to write to file
 * @param {object} param0.data data object to write to a file
 * @param {string} [param0.basicPath] basic path for write
 */
const writeDataToFile = ({
  name,
  data,
  basicPath,
}) => {
  const dataPath = path.join(basicPath || PATH_TO_DATA);
  if (!fs.existsSync(path.join(PATH_TO_DATA))) {
    fs.mkdirSync(path.join(PATH_TO_DATA));
  }
  // Create folder for file, if folder does not exist
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
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
