import React from 'react';
import { shallow } from 'enzyme';
import FormBasic from './FormBasic';
import CreateQuestionBasicForm from '../../stores/FormsStore/CreateQuestionBasicForm';

describe('FormBasic', () => {
  let wrapper;
  let formBasic;

  beforeEach(() => {
    formBasic = new CreateQuestionBasicForm({
      hooks: {
        onSuccess: () => (Promise.resolve()),
      },
    });
    wrapper = shallow(
      <FormBasic formBasic={formBasic} />,
    ).dive();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });
});
