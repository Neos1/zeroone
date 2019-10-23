import React from 'react';
import Indicator from '.';

export default ({ title: 'Indicator' });

export const uncheckedIndicator = () => (
  <Indicator checked={false} />
);
export const checkedIndicator = () => (
  <Indicator checked />
);
