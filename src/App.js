import React from 'react';
import {
  Button,
} from './components/Button';
import Input from './components/Input';
import {
  PasswordIcon, CreditCardIcon,
} from './components/Icons';
import LangSwitcher from './components/LangSwitcher';
import Dropdown from './components/Dropdown';
import Explanation from './components/Explanation';
import Logo from './components/Logo';
import Heading from './components/Heading';

const options = [
  { label: '0x295856bcf02b2017607e4f61cfc1573fd05d511f', value: '1' },
  { label: '0xfffffffffffffffffffffffffffffff', value: '2' },
  { label: '0x00000000000000000000000000', value: '3' },
];

const App = () => (
  <div>
    <h1>Прувет</h1>
    <Button className="btn--big btn--white">приувет</Button>

    <Input type="password" required={false} className="" placeholder="Введите пароль" errorText="Вы ошиблись, смиритесь и исправьтесь">
      <PasswordIcon />
    </Input>
    <LangSwitcher />


    <Dropdown options={options}><CreditCardIcon /></Dropdown>

    <Explanation>
      Sunt commodo ea est magna duis duis. Id exercitation minim duis nostrud anim
      non commodo labore aliquip est laborum.
      Aliqua non fugiat id consectetur.
      Amet reprehenderit exercitation adipisicing sint minim et mollit veniam duis
      et aliqua dolor sint.
      Dolore non non ea et id nostrud mollit do pariatur do aute consectetur fugiat sint.
      Laborum officia aliquip ut aliquip officia proident occaecat amet labore deserunt.
      Mollit voluptate ullamco exercitation aliquip enim ullamco est ad ex sit
      proident proident laborum.
    </Explanation>
    <Logo />

    <Heading>
      {'Заголовок'}
      {'Nulla sit minim laboris excepteur.'}
    </Heading>
  </div>
);
export default App;
