import React from 'react';
import { shallow } from 'enzyme';
import DefinetelyReject from './DefinetelyReject';

describe('DefinetelyReject', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <DefinetelyReject
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
