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
      });
      validator.setMessages('ru', {
        required: 'Обязательное поле',
        same: 'Поля должны содержать одинаковые значения',
        password: 'Пароль не соответствует требованиям',
        address: 'Введите валидный адрес',
      });
      validator.stopOnError(true);
    },
  },
};

export default plugins;
