import React from 'react';
import { shallow } from 'enzyme';
import DefinetelyAgree from './DefinetelyAgree';

describe('DefinetelyAgree', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <DefinetelyAgree
        dialogStore={{
          show: () => {},
          hide: () => {},
          add: () => {},
          closing: false,
        }}
      />,
    ).dive().dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});
