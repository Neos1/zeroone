import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import { CloseIcon } from '../Icons';
import DefaultDialogFooter from './DefaultDialogFooter';

import styles from './Dialog.scss';

/**
 * Dialog component
 */
@inject('dialogStore')
@observer
class Dialog extends React.Component {
  static propTypes = {
    size: PropTypes.oneOf([
      'sm',
      'md',
      'lg',
    ]),
    name: PropTypes.string.isRequired,
    header: PropTypes.string,
    dialogStore: PropTypes.shape({
      add: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
      closing: PropTypes.bool.isRequired,
      open: PropTypes.bool.isRequired,
      dialog: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
      ]),
      hide: PropTypes.func.isRequired,
    }).isRequired,
    footer: PropTypes.element,
    className: PropTypes.string,
    history: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onCancel: PropTypes.func,
    closeable: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    size: 'sm',
    className: '',
    header: null,
    footer: (<DefaultDialogFooter />),
    history: true,
    onOpen: null,
    onClose: null,
    onCancel: null,
    children: null,
    closeable: true,
  };

  componentDidMount() {
    const {
      name,
      history,
      onOpen,
      onClose,
      dialogStore,
    } = this.props;
    document.addEventListener('mousedown', this.handleClickOutside);
    dialogStore.add(name, {
      history,
      onOpen,
      onClose,
    });
  }

  componentWillUnmount() {
    const { name, dialogStore } = this.props;
    document.removeEventListener('mousedown', this.handleClickOutside);
    dialogStore.remove(name);
  }

  handleClickOutside = (e) => {
    e.stopPropagation();
    const { props: { name, dialogStore, closeable }, cancel } = this;
    if (dialogStore.closing) return;
    if (closeable === false || !dialogStore.open || (dialogStore.dialog !== name)) return;
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      dialogStore.hide();
      cancel();
    }
  }

  hideDialog = (e) => {
    if (e) e.preventDefault();
    const { props: { dialogStore }, cancel } = this;
    dialogStore.hide();
    cancel();
  }

  cancel = () => {
    const { onCancel } = this.props;
    if (onCancel && typeof onCancel === 'function') onCancel();
  }

  setWrapperRef = (node) => {
    if (!this.wrapperRef) this.wrapperRef = node;
  }

  render() {
    const { props } = this;
    const {
      size,
      name,
      header,
      footer,
      className,
      closeable,
    } = this.props;
    const store = props.dialogStore;
    const dialogSize = `dialog--${size}`;
    return (
      <Portal>
        <div
          className={`
              ${styles.dialog}
              ${store.open && store.dialog === name ? styles['dialog--open'] : ''}
              ${store.closing && store.dialog === name ? styles['dialog--close'] : ''}
              ${props.size ? styles[dialogSize] : ''}
          `}
          id={`dialog-${name}`}
        >
          <div className={`${styles.content}`} ref={this.setWrapperRef}>
            <div className={`${styles.content__inner} ${className}`}>
              {
                closeable !== false
                  ? (
                    <div className={styles.close__container}>
                      <div className={styles.close__inner}>
                        <button
                          className={styles.close}
                          onClick={this.hideDialog}
                          type="button"
                        >
                          <CloseIcon
                            width={16}
                            height={16}
                            fill="currentColor"
                          />
                        </button>
                      </div>
                    </div>
                  )
                  : null
              }
              {
                header
                  ? (
                    <div className={`${styles.dialog__header}`}>
                      <div className={styles.dialog__title}>{header}</div>
                    </div>
                  )
                  : null
              }
              {
                props.children
                  ? (
                    <div className={`${styles.dialog__body} ${footer ? styles['dialog__body--with-footer'] : ''}`}>
                      {props.children}
                    </div>
                  )
                  : null
              }
              {footer}
            </div>
          </div>
        </div>
      </Portal>
    );
  }
}

export default Dialog;
