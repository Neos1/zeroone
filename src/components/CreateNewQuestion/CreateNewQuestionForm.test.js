import React from 'react';
import { shallow } from 'enzyme';
import CreateNewQuestionForm from './CreateNewQuestionForm';
import FormBasic from './FormBasic';
import FormDynamic from './FormDynamic';

jest.mock('../../utils/Validator');

describe('CreateNewQuestionForm', () => {
  describe('With activeTab 0', () => {
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

    it('should render without error with correct form', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find(FormBasic).length).toEqual(1);
      expect(wrapper.find(FormDynamic).length).toEqual(0);
    });

    it('onBasicSubmit should call mockOnToggle with 1', () => {
      wrapperInstance.onBasicSubmit();
      expect(mockOnToggle).toHaveBeenCalledWith(1);
    });
  });

  describe('With activeTab 1', () => {
    let wrapper;
    let mockOnToggle;
    let wrapperInstance;

    beforeEach(() => {
      mockOnToggle = jest.fn();
      wrapper = shallow(
        <CreateNewQuestionForm
          activeTab={1}
          onToggle={mockOnToggle}
        />,
      ).dive();
      wrapperInstance = wrapper.instance();
    });

    it('should render without error with correct form', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find(FormBasic).length).toEqual(0);
      expect(wrapper.find(FormDynamic).length).toEqual(1);
    });

    it('onBasicSubmit should call mockOnToggle with 1', () => {
      wrapperInstance.onBasicSubmit();
      expect(mockOnToggle).toHaveBeenCalledWith(1);
    });
  });
});
