import React from 'react';
import Input from './index';
import { PasswordIcon } from '../Icons';

export default ({ title: 'Input' });

export const simpleInput = () => (
  <Input type="password" required={false} placeholder="Введите пароль" errorText="Вы ошиблись, смиритесь и исправьтесь">
    <PasswordIcon />
  </Input>
);
export const inputError = () => (
  <Input type="password" required={false} placeholder="Введите пароль" errorText="Вы ошиблись, смиритесь и исправьтесь" className="field--error">
    <PasswordIcon />
  </Input>
);
