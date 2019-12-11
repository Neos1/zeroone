
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
 */
const writeDataToFile = ({
  name,
  data,
}) => {
  fs.writeFileSync(
    path.join(PATH_TO_DATA, `${name}.json`),
    JSON.stringify(data, null, '\t'),
    'utf8',
  );
};

/**
 * Method for reading file
 *
 * @param {object} param0 data for method
 * @param {string} param0.name name file for reading
 * @returns {object} JSON parsed data
 */
const readDataFromFile = ({
  name,
}) => (
  JSON.parse(
    fs.readFileSync(path.join(PATH_TO_DATA, `./${name}.json`), 'utf8'),
  )
);

export default writeDataToFile;

export {
  writeDataToFile,
  readDataFromFile,
};
