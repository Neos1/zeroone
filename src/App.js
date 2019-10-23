import React from 'react';
import {
  Button,
} from './components/Button';
import Input from './components/Input';
import {
  Password, CreditCard,
} from './components/Icons';
import LangSwitcher from './components/LangSwitcher';
import Dropdown from './components/Dropdown';

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
      <Password />
    </Input>
    <LangSwitcher />


    <Dropdown options={options}><CreditCard /></Dropdown>
  </div>
);
export default App;
