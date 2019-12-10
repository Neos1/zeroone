import React from 'react';
import { shallow } from 'enzyme';
import FormDynamic from './FormDynamic';
import CreateQuestionDynamicForm from '../../stores/FormsStore/CreateQuestionDynamicForm';

jest.mock('../../utils/Validator');

describe('FormDynamic', () => {
  let wrapper;
  let wrapperInstance;
  let formDynamic;

  beforeEach(() => {
    formDynamic = new CreateQuestionDynamicForm({
      hooks: {
        onSuccess: () => (Promise.resolve()),
      },
    });
    wrapper = shallow(
      <FormDynamic
        formDynamic={formDynamic}
        onToggle={() => {}}
      />,
    ).dive();
    wrapperInstance = wrapper.instance();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('addDynamicFields should add fields', () => {
    // Ignore error inside mobx (test work correctly!)
    console.error = jest.fn();
    expect(formDynamic.fields.size).toEqual(2);
    wrapperInstance.addDynamicFields();
    expect(formDynamic.fields.size).toEqual(4);
  });

  it('getFieldKey with some params should be correct', () => {
    let result = wrapperInstance.getFieldKey('select--id1');
    expect(result).toEqual('id1');
    result = wrapperInstance.getFieldKey('select-id1');
    expect(result).toEqual('');
    result = wrapperInstance.getFieldKey(undefined);
    expect(result).toEqual('');
    result = wrapperInstance.getFieldKey({});
    expect(result).toEqual('');
    result = wrapperInstance.getFieldKey(null);
    expect(result).toEqual('');
  });

  it('removeRowFields should remove fields', () => {
    // Ignore error inside mobx (test work correctly!)
    console.error = jest.fn();
    expect(formDynamic.fields.size).toEqual(2);
    wrapperInstance.removeRowFields('input--0');
    expect(formDynamic.fields.size).toEqual(0);
  });
});
