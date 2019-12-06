import React from 'react';
import { shallow } from 'enzyme';
import CreateGroupQuestions from './CreateGroupQuestions';

jest.mock('../../utils/Validator');

describe('CreateGroupQuestions', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CreateGroupQuestions />,
    ).dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});
