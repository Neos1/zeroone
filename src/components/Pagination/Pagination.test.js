import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '.';

describe('Pagination', () => {
  let wrapper;
  let mockHandlePageChange;
  let wrapperInstance;

  beforeEach(() => {
    mockHandlePageChange = jest.fn();
    wrapper = shallow(
      <Pagination
        activePage={1}
        lastPage={10}
        handlePageChange={mockHandlePageChange}
        itemsCountPerPage={10}
        totalItemsCount={100}
        pageRangeDisplayed={5}
      />,
    ).dive();
    wrapperInstance = wrapper.instance();
  });

  it('should render without error & elements have correct prop', () => {
    expect(wrapper.length).toEqual(1);
    const inputElement = wrapper.find('input');
    expect(inputElement.prop('onChange')).toEqual(wrapperInstance.handleChange);
    expect(inputElement.prop('onFocus')).toEqual(wrapperInstance.handleFocus);
  });

  it('handleChange with value 11 should set value to 10', () => {
    // init state to equal activePage
    expect(wrapperInstance.state.value).toEqual(1);
    wrapperInstance.handleChange({ target: { value: 11, select: () => {} } });
    expect(wrapperInstance.state.value).toEqual(10);
  });

  it('handleChange with value 5 should set value to 5', () => {
    // init state to equal activePage
    expect(wrapperInstance.state.value).toEqual(1);
    wrapperInstance.handleChange({ target: { value: 5, select: () => {} } });
    expect(wrapperInstance.state.value).toEqual(5);
  });

  it('handleChange with value -5 should set value to 1', () => {
    // init state to equal activePage
    expect(wrapperInstance.state.value).toEqual(1);
    wrapperInstance.handleChange({ target: { value: -5, select: () => {} } });
    expect(wrapperInstance.state.value).toEqual(1);
  });

  it('handleButtonClick with 5 should call mockHandlePageChange with 5', () => {
    wrapperInstance.handleButtonClick(5);
    expect(mockHandlePageChange).toHaveBeenCalledWith(5);
  });

  it('onPageChange with 6 should call mockHandlePageChange with 6 & set value to 6', () => {
    // init state to equal activePage
    expect(wrapperInstance.state.value).toEqual(1);
    wrapperInstance.onPageChange(6);
    expect(mockHandlePageChange).toHaveBeenCalledWith(6);
    expect(wrapperInstance.state.value).toEqual(6);
  });

  it('handleFocus should call mockFocus', () => {
    const mockSelect = jest.fn();
    wrapperInstance.handleFocus({ target: { select: mockSelect } });
    expect(mockSelect).toHaveBeenCalled();
  });

  it('button onClick should call mockHandlePageChange with 1', () => {
    wrapper.find('button').prop('onClick')();
    expect(mockHandlePageChange).toHaveBeenCalledWith(1);
  });
});
