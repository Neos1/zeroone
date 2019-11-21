import React from 'react';
import { shallow } from 'enzyme';
import { MembersPage } from '.';

describe('MembersPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MembersPage />);
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});
