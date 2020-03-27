import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from '.';

describe('ProgressBar', () => {
  describe('countIndicator 10, progress 21', () => {
    let wrapper;
    let wrapperInstance;

    beforeEach(() => {
      wrapper = shallow(
        <ProgressBar countIndicator={10} progress={21} />,
      );
      wrapperInstance = wrapper.instance();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('.progress-bar__indicator').length).toEqual(10);
      expect(wrapper.find('.progress-bar__indicator--filled').length).toEqual(2);
    });

    it('getDimensionIndicator should be equal 10', () => {
      expect(wrapperInstance.getDimensionIndicator()).toEqual(10);
    });

    it('indicatorIsFilled should be equal correct state', () => {
      // do not forget that the index counts from 0
      expect(wrapperInstance.indicatorIsFilled(0)).toEqual(true);
      expect(wrapperInstance.indicatorIsFilled(1)).toEqual(true);
      expect(wrapperInstance.indicatorIsFilled(2)).toEqual(false);
    });
  });

  describe('countIndicator 20, progress 49', () => {
    let wrapper;
    let wrapperInstance;

    beforeEach(() => {
      wrapper = shallow(
        <ProgressBar countIndicator={20} progress={49} />,
      );
      wrapperInstance = wrapper.instance();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('.progress-bar__indicator').length).toEqual(20);
      expect(wrapper.find('.progress-bar__indicator--filled').length).toEqual(9);
    });

    it('getDimensionIndicator should be equal 5', () => {
      expect(wrapperInstance.getDimensionIndicator()).toEqual(5);
    });

    it('indicatorIsFilled should be equal correct state', () => {
      // do not forget that the index counts from 0
      expect(wrapperInstance.indicatorIsFilled(0)).toEqual(true);
      expect(wrapperInstance.indicatorIsFilled(8)).toEqual(true);
      expect(wrapperInstance.indicatorIsFilled(9)).toEqual(false);
    });
  });
});
