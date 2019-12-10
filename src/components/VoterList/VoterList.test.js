import React from 'react';
import { shallow } from 'enzyme';
import VoterList from './VoterList';

describe('VoterList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<VoterList />).dive();
  });

  it('should render without error', () => {
    console.log(wrapper.debug());
    expect(wrapper.length).toEqual(1);
  });
});
