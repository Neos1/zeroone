import React from 'react';
import { Provider } from 'mobx-react';
import { shallow, mount } from 'enzyme';
import Dialog from './Dialog';

describe('Dialog', () => {
  describe('with default props', () => {
    let element;
    let elementInstance;
    let wrapper;
    let mockDialogAdd;
    let mockDialogRemove;
    let mockOnCancel;
    let mockDialogHide;

    beforeEach(() => {
      mockDialogAdd = jest.fn();
      mockDialogRemove = jest.fn();
      mockOnCancel = jest.fn();
      mockDialogHide = jest.fn();
      element = shallow(
        <Dialog
          dialogStore={{
            add: mockDialogAdd,
            remove: mockDialogRemove,
            hide: mockDialogHide,
            open: false,
            closing: false,
            dialog: 'test',
          }}
          onCancel={mockOnCancel}
          header="TEST"
          name="test"
          size="sm"
          footer={<span className="footer--test">footer test content</span>}
        />,
      );
      wrapper = element.dive().dive();
      elementInstance = element.dive().instance();
    });

    it('should render without error', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('.dialog').hasClass('dialog--sm')).toEqual(true);
      expect(wrapper.find('.close__container').length).toEqual(1);
      expect(wrapper.find('.dialog__title').text()).toEqual('TEST');
      expect(wrapper.find('.dialog__header-icon').length).toEqual(0);
      expect(wrapper.find('.footer--test').length).toEqual(1);
      expect(wrapper.find('.footer--test').text()).toEqual('footer test content');
    });

    it('hideDialog should call mockDialogHide & mockOnCancel', () => {
      const closeButton = wrapper.find('.close');
      closeButton.prop('onClick')({ preventDefault: () => {} });
      expect(mockDialogHide).toHaveBeenCalled();
      expect(mockOnCancel).toHaveBeenCalled();
    });

    it('cancel should call mockOnCancel', () => {
      elementInstance.cancel();
      expect(mockOnCancel).toHaveBeenCalled();
    });

    it('Dialog unmount should call mockDialogRemove', () => {
      elementInstance.componentWillUnmount();
      expect(mockDialogRemove).toHaveBeenCalled();
    });
  });

  describe('mount component with mockDialogHide', () => {
    let wrapper;
    let outerNode;
    let mockDialogHide;

    beforeEach(() => {
      outerNode = document.createElement('div');
      mockDialogHide = jest.fn();
      wrapper = mount(
        <Provider
          dialogStore={{
            add: () => {},
            remove: () => {},
            dialog: 'test',
            open: true,
            hide: mockDialogHide,
            closing: false,
          }}
          appStore={{}}
        >
          <Dialog
            name="test"
            header="Test title"
            open
          />
        </Provider>,
        { attachTo: outerNode },
      );
    });

    it('click outside component should call mockDialogHide', () => {
      document.body.appendChild(outerNode);
      outerNode.dispatchEvent(new Event('mousedown', {
        bubbles: true,
        stopPropagation: () => {},
      }));
      expect(mockDialogHide).toHaveBeenCalled();
    });

    it('wrapperRef should be truthy', () => {
      const dialog = wrapper.find(Dialog.wrappedComponent);
      expect(dialog.instance().wrapperRef).toBeTruthy();
    });
  });

  describe('closeable=false', () => {
    let wrapper;
    let outerNode;
    let mockDialogHide;

    beforeEach(() => {
      outerNode = document.createElement('div');
      document.body.appendChild(outerNode);
      mockDialogHide = jest.fn();
      wrapper = mount(
        <Provider
          dialogStore={{
            add: () => {},
            remove: () => {},
            dialog: 'test',
            open: true,
            closing: false,
            hide: mockDialogHide,
          }}
          appStore={{}}
        >
          <Dialog
            name="test"
            header="header"
            closeable={false}
          />
        </Provider>,
        { attachTo: outerNode },
      );
    });

    it('should render correct with needed class', () => {
      expect(wrapper.find('.close__container').length).toEqual(0);
    });

    it('should not call mockDialogHide on outside click', () => {
      outerNode.dispatchEvent(new Event('mousedown', {
        bubbles: true,
        stopPropagation: () => {},
      }));
      expect(mockDialogHide).not.toHaveBeenCalled();
    });
  });

  describe('footer=null', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Dialog
          dialogStore={{
            add: () => {},
            remove: () => {},
            hide: () => {},
            open: false,
            closing: false,
            dialog: 'test',
          }}
          name="test"
          header="Test title"
          footer={null}
        />,
      ).dive().dive();
    });

    it('should render without footer', () => {
      expect(wrapper.find('.footer').length).toEqual(0);
    });
  });

  describe('open & closing', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Dialog
          dialogStore={{
            add: () => {},
            remove: () => {},
            hide: () => {},
            open: true,
            closing: true,
            dialog: 'test',
          }}
          name="test"
          header="Test title"
          size={null}
        />,
      ).dive().dive();
    });

    it('should has dialog--close class', () => {
      expect(wrapper.find('.dialog').hasClass('dialog--close')).toEqual(true);
    });

    it('should has dialog--open class', () => {
      expect(wrapper.find('.dialog').hasClass('dialog--open')).toEqual(true);
    });
  });
});
