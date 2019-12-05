import React from 'react';
import { CreditCardIcon } from '../Icons';
import Dropdown from '.';

export default ({ title: 'Dropdown' });

let opened = true;

const toggle = () => {
  opened = !opened;
};

const options = [
  { label: '0x295856bcf02b2017607e4f61cfc1573fd05d511f', value: '1' },
  { label: '0xfffffffffffffffffffffffffffffff', value: '2' },
  { label: '0x00000000000000000000000000', value: '3' },
];

export const WalletDropdown = () => (
  <Dropdown
    options={options}
    toggleOptions={toggle}
    opened={opened}
  >
    <CreditCardIcon />
  </Dropdown>
);
