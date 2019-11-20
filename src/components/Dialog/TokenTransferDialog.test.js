import React from 'react';
import { shallow } from 'enzyme';
import TokenTransferDialog from './TokenTransferDialog';

describe('TokenTransferDialog', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <TokenTransferDialog
        dialogStore={{
          show: () => {},
          hide: () => {},
          add: () => {},
          closing: false,
        }}
      />,
    ).dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});
