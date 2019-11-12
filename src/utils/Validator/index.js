import validatorjs from 'validatorjs';


validatorjs.prototype.setAttributeNames = function setAttributeNames(attributes) {
  if (!attributes) return;
  const modified = { ...attributes };
  const keys = Object.keys(modified);
  for (let i = 0; i < keys.length; i += 1) {
    const attribute = keys[i];
    modified[attribute] = modified[attribute].toLowerCase();
  }
  this.messages._setAttributeNames(modified);
  // eslint-disable-next-line no-console
};

const rules = {
  password: {
    function: (value) => value.match(/(?=(?=.*[!&$%&? "])+(?=[a-z]*[A-Z])+(?=[^0-9]*[0-9])).{6,}/g),
    message: 'Пароль не соответствует требованиям',
  },
  address: {
    function: (value) => value.match(/(0x)+([0-9 a-f A-F]){40}/g),
    message: 'Введите валидный адрес',
  },
  required: {
    function: (value) => value !== '',
    message: 'Обязательное поле',
  },
  string: {
    function: (value) => typeof value === 'string',
    message: 'Поле должно быть строкой',
  },
  numeric: {
    // eslint-disable-next-line no-restricted-globals
    function: (value) => !isNaN(Number(value)),
    message: 'Значение должно быть числом',
  },
};

const plugins = {
  dvr: {
    package: validatorjs,
    extend: ({ validator }) => {
      Object.keys(rules).forEach(
        (key) => validator.register(key, rules[key].function, rules[key].message),
      );
      validator.stopOnError(true);
    },
  },
};

export default plugins;
