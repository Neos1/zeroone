/* eslint-disable react/button-has-type */
import React from 'react';
import propTypes from 'prop-types';
import styles from './Button.scss';


/*
 ? BUTTONS WITHOUT ICONS
*/

export const Button = ({
  children, type, disabled, className, onClick,
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${className}`}
    onClick={onClick}
  >
    <span className={styles.btn__text}>
      {children}
    </span>
  </button>
);

Button.propTypes = {
  children: propTypes.string.isRequired,
  className: propTypes.string.isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
Button.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};


export const BlackButton = ({
  children, type, disabled, onClick,
}) => (
  <Button
    type={type}
    disabled={disabled}
    className={`${styles['btn--default']} ${styles['btn--black']}`}
    onClick={onClick}
  >
    {children}
  </Button>
);

BlackButton.propTypes = {
  children: propTypes.string.isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
BlackButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};


export const BlackWideButton = ({
  children, type, disabled, onClick,
}) => (
  <Button
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${styles['btn--default']} ${styles['btn--black']} ${styles['btn--240']}`}
    onClick={onClick}
  >
    {children}
  </Button>
);

BlackWideButton.propTypes = {
  children: propTypes.string.isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
BlackWideButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};


export const BlackWidestButton = ({
  children, type, disabled, onClick,
}) => (
  <Button
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${styles['btn--default']} ${styles['btn--black']} ${styles['btn--310']}`}
    onClick={onClick}
  >
    {children}
  </Button>
);

BlackWidestButton.propTypes = {
  children: propTypes.string.isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
BlackWidestButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};


export const WhiteButton = ({
  children, type, disabled, onClick,
}) => (
  <Button
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${styles['btn--default']} ${styles['btn--white']}`}
    onClick={onClick}
  >
    {children}
  </Button>
);

WhiteButton.propTypes = {
  children: propTypes.string.isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
WhiteButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};


export const LinkButton = ({
  children, type, disabled, onClick,
}) => (
  <Button
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${styles['btn--text']} ${styles['btn--link']} ${styles['btn--noborder']}`}
    onClick={onClick}
  >
    {children}
  </Button>
);

LinkButton.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
LinkButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};

export const BorderedLinkButton = ({
  children, type, disabled, onClick,
}) => (
  <Button
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${styles['btn--text']} ${styles['btn--link']}`}
    onClick={onClick}
  >
    {children}
  </Button>
);

BorderedLinkButton.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
BorderedLinkButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};

export const ProjectButton = ({
  children, type, disabled, onClick,
}) => (
  <Button
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${styles['btn--big']} ${styles['btn--white']} ${styles['btn--project']}`}
    onClick={onClick}
  >
    {children}
  </Button>
);

ProjectButton.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
ProjectButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};


/*
 ? BUTTONS WITH ICONS
*/

export const IconButton = ({
  children, type, className, disabled, onClick,
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${className}`}
    onClick={onClick}
  >
    <p className={styles.btn__content}>
      {children[0]}
      <span className={styles.btn__text}>
        {children[1]}
      </span>
    </p>
  </button>
);

IconButton.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  className: propTypes.string.isRequired,
  type: propTypes.string,
};
IconButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};


export const IconBlackButton = ({
  children, type, disabled, onClick,
}) => (
  <IconButton
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${styles['btn--black']} ${styles['btn--240']}`}
    onClick={onClick}
  >
    {children}
  </IconButton>
);

IconBlackButton.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
IconBlackButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};


export const IconWhiteButton = ({
  children, type, disabled, onClick,
}) => (
  <IconButton
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${styles['btn--white']}`}
    onClick={onClick}
  >
    {children}
  </IconButton>
);

IconWhiteButton.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
IconWhiteButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};


export const IconTopWhiteButton = ({
  children, type, disabled, onClick,
}) => (
  <IconButton
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${styles['btn--big']} ${styles['btn--white']} ${styles['icon--top']}`}
    onClick={onClick}
  >
    {children}
  </IconButton>
);

IconTopWhiteButton.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
IconTopWhiteButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};


export const AddProjectButton = ({
  children, type, disabled, onClick,
}) => (
  <IconButton
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${styles['btn--big']} ${styles['btn--white']} ${styles['btn--dashed']} ${styles['btn--add-project']}`}
    onClick={onClick}
  >
    {children}
  </IconButton>
);

AddProjectButton.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
AddProjectButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};


export const SeedToggleButton = ({
  children, type, disabled, onClick,
}) => (
  <IconButton
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${styles['btn--white']} ${styles['btn--show-seed']}`}
    onClick={onClick}
  >
    {children}
  </IconButton>
);

SeedToggleButton.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
SeedToggleButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};

export const BackButton = ({
  children, type, disabled, onClick,
}) => (
  <IconButton
    type={type}
    disabled={disabled}
    className={`${styles.btn} ${styles['btn--text']} ${styles['btn--link']} ${styles['btn--noborder']} ${styles['btn--back']}`}
    onClick={onClick}
  >
    {children}
  </IconButton>
);

BackButton.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
BackButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};
