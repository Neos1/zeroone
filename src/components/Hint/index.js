import React from 'react';
import propTypes from 'prop-types';

import { withTranslation } from 'react-i18next';
import styles from './Hint.scss';

const Hint = ({ children }) => (
  <div className={`${styles.hint}`}>
    <span className={styles.hint__icon} />
    <span className={styles.hint__text}>
      {children}
    </span>
  </div>
);

const SquareHint = ({ children }) => (
  <div className={`${styles.hint} ${styles['hint--square']}`}>
    <span className={styles.hint__icon} />
    <span className={styles.hint__text}>
      {children}
    </span>
  </div>
);

const FormulaHint = withTranslation()(() => (
  <div className={`${styles.hint} ${styles['hint--square']} ${styles['hint--formula']}`}>
    <span className={styles.hint__icon} />
    <div className={styles.hint__text}>
      <p>
        Формула голосования записывается в примерном виде:
        <br />
        <strong>{'erc20{0x123...EF}->exclude{0x234...FE}->conditions{quorum>50%, positive>50% of all}, где:'}</strong>
      </p>

      <p>
        <strong>{'1) erc20{0x123...EF} / custom{0x123...EF}'}</strong>
        {' '}
        - тип токенов и адрес токенов необходимой группы
      </p>
      <p>
        <strong>{'2) exclude{0x234...FE}'}</strong>
        {' '}
        – пользователи, которые не должны голосовать (опционально)
      </p>
      <p>
        <strong>{'3) conditions{quorum>50%, positive>50% of all}'}</strong>
        {' '}
        - условия для принятия решения по голосованию
      </p>
      <p>
        <strong>{'3.1) quorum>50%'}</strong>
        {' '}
        min% голосов в общем
      </p>
      <p>
        <strong>{'3.2) positive>50%'}</strong>
        {' '}
        min% голосов «ЗА»
      </p>
      <p>
        <strong>3.3 of quorum / of all</strong>
        {' '}
        – модификатор, от какого числа считать условие positive - от числа токенов,
        которые учавствовали в голосовании, или от всех токенов из контракта группы
      </p>
      <p>
        Вы можете связывать несколько групп пользователей, объединяя их формулы операторами
        <strong>and</strong>
        или
        <strong>or</strong>
        .Например:
        «Формула 1»
        <strong>or</strong>
        «Формула 2»
        <strong>and</strong>
        «Формула 3»
      </p>
    </div>
  </div>
));


const SelectorHint = () => (
  <div className={`${styles.hint} ${styles['hint--square']} ${styles['hint--formula']}`}>
    <span className={styles.hint__icon} />
    <span className={styles.hint__text}>
      <p>Выглядит как 4 байта Keccak хэша от сигнатуры функции в ASCII кодировке </p>
      <p>Пример:</p>
      <p>
        bytes4(keccak256(baz(uint32,bool))) =
        {' '}
        <strong>0xcdcd77c0</strong>
      </p>
    </span>
  </div>
);

Hint.propTypes = {
  children: propTypes.string.isRequired,
};

SquareHint.propTypes = {
  children: propTypes.string.isRequired,
};


export {
  Hint, SquareHint, FormulaHint, SelectorHint,
};
