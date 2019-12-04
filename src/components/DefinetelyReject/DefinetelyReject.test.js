import React from 'react';
import { shallow } from 'enzyme';
import DefinetelyReject from '.';

describe('DefinetelyReject', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <DefinetelyReject />,
    ).dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});
