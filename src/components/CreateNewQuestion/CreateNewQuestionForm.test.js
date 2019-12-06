import React from 'react';
import { shallow } from 'enzyme';
import CreateNewQuestionForm from './CreateNewQuestionForm';

jest.mock('../../utils/Validator');

describe('CreateNewQuestionForm', () => {
  let wrapper;
  let mockOnToggle;
  let wrapperInstance;

  beforeEach(() => {
    mockOnToggle = jest.fn();
    wrapper = shallow(
      <CreateNewQuestionForm
        activeTab={0}
        onToggle={mockOnToggle}
      />,
    ).dive();
    wrapperInstance = wrapper.instance();
  });

  it('should render without error', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('onBasicSubmit should call mockOnToggle with 1', () => {
    wrapperInstance.onBasicSubmit();
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it('addDynamicFields should add fields', () => {
    // Ignore error inside mobx (test work correctly!)
    console.error = jest.fn();
    expect(wrapperInstance.formDynamic.fields.size).toEqual(2);
    wrapperInstance.addDynamicFields();
    expect(wrapperInstance.formDynamic.fields.size).toEqual(4);
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
    expect(wrapperInstance.formDynamic.fields.size).toEqual(2);
    wrapperInstance.removeRowFields('input--0');
    expect(wrapperInstance.formDynamic.fields.size).toEqual(0);
  });
});
