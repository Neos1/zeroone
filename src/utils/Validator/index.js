import validatorjs from 'validatorjs';
import i18n from 'i18next';

validatorjs.prototype.setAttributeNames = function setAttributeNames(attributes) {
  if (!attributes) return;
  const modified = { ...attributes };
  const keys = Object.keys(modified);
  for (let i = 0; i < keys.length; i += 1) {
    const attribute = keys[i];
    modified[attribute] = modified[attribute].toLowerCase();
  }
  this.messages._setAttributeNames(modified);
};

const rules = {
  password: {
    function: (value) => value.match(/(?=.*[!@#$%^&*()_\-+=~])+(?=[a-z]*[A-Z]*[0-9]).{6,}/g),
  },
  address: {
    function: (value) => value.match(/(0x)+([0-9 a-f A-F]){40}/g),
  },
  uint: {
    // eslint-disable-next-line no-restricted-globals
    function: (value) => !isNaN(Number(value)),
  },
  bytes4: {
    function: (value) => value.match(/(0x)+([0-9 a-f A-F]){8}/g),
  },
  formula: {
    function: (value) => value.match(
      /\(\s*group\s*\(\s*[a-zA-Z0-9]{1,}\s*\) => condition\s*\(\s*(quorum (>=|<=) [0-9]{1,} %\)\)|positive (>=|<=) [0-9]{1,} % of (quorum|all)\s*\)\s*\))/,
    ),
  },
};

const plugins = {
  dvr: {
    package: validatorjs,
    extend: ({ validator }) => {
      const { language } = i18n;
      const languages = {
        RUS: 'ru',
        ENG: 'en',
      };
      Object.keys(rules).forEach(
        (key) => validator.register(key, rules[key].function, rules[key].message),
      );
      validator.useLang(languages[language]);
      validator.setMessages('en', {
        required: 'The field is required.',
        same: 'Fields must be same',
        password: 'Field value not valid',
        address: 'Enter valid address',
        numeric: 'Value is not numeric',
        uint: 'Value is not numeric',
        bytes4: 'Value is not bytes4 string',
        between: 'Between :min and :max signs',
        formula: 'Incorrect formula',
      });
      validator.setMessages('ru', {
        required: 'Обязательное поле',
        same: 'Поля должны содержать одинаковые значения',
        password: 'Пароль не соответствует требованиям',
        address: 'Введите валидный адрес',
        numeric: 'Значение не является числом',
        uint: 'Значение не является числом',
        bytes4: 'Значение не байтовая строка',
        between: 'Между :min и :max знаками',
        formula: 'Некорректная формула',
      });
      validator.stopOnError(true);
    },
  },
};

export default plugins;
