/* eslint-disable no-undef */
import passwordValidation from './index';

describe('test for password validation', () => {
  test('password T3sting!', () => {
    const validity = passwordValidation('T3sting!');
    expect(validity.High).toBe(true);
    expect(validity.Low).toBe(true);
    expect(validity.Num).toBe(true);
    expect(validity.Char).toBe(true);
    expect(validity.Length).toBe(true);
  });
  test('password 123!@#qweQWE', () => {
    const validity = passwordValidation('123!@#qweQWE');
    expect(validity.High).toBe(true);
    expect(validity.Low).toBe(true);
    expect(validity.Num).toBe(true);
    expect(validity.Char).toBe(true);
    expect(validity.Length).toBe(true);
  });
  test('password T3st!ng', () => {
    const validity = passwordValidation('T3st!ng');
    expect(validity.High).toBe(true);
    expect(validity.Low).toBe(true);
    expect(validity.Num).toBe(true);
    expect(validity.Char).toBe(true);
    expect(validity.Length).toBe(true);
  });
  test('password t3sT!ng!', () => {
    const validity = passwordValidation('t3sT!ng!');
    expect(validity.High).toBe(true);
    expect(validity.Low).toBe(true);
    expect(validity.Num).toBe(true);
    expect(validity.Char).toBe(true);
    expect(validity.Length).toBe(true);
  });
  test('password T#st1ng', () => {
    const validity = passwordValidation('T#st1ng');
    expect(validity.High).toBe(true);
    expect(validity.Low).toBe(true);
    expect(validity.Num).toBe(true);
    expect(validity.Char).toBe(false);
    expect(validity.Length).toBe(true);
  });
  test('password !@#qwe123QWE', () => {
    const validity = passwordValidation('!@#qwe123QWE');
    expect(validity.High).toBe(true);
    expect(validity.Low).toBe(true);
    expect(validity.Num).toBe(true);
    expect(validity.Char).toBe(true);
    expect(validity.Length).toBe(true);
  });
  test('password qwe123QWE', () => {
    const validity = passwordValidation('qwe123QWE');
    expect(validity.High).toBe(true);
    expect(validity.Low).toBe(true);
    expect(validity.Num).toBe(true);
    expect(validity.Char).toBe(false);
    expect(validity.Length).toBe(true);
  });
  test('password QWE123QWE', () => {
    const validity = passwordValidation('QWE123QWE');
    expect(validity.High).toBe(true);
    expect(validity.Low).toBe(false);
    expect(validity.Num).toBe(true);
    expect(validity.Char).toBe(false);
    expect(validity.Length).toBe(true);
  });
  test('password testtin!', () => {
    const validity = passwordValidation('testtin!');
    expect(validity.High).toBe(false);
    expect(validity.Low).toBe(true);
    expect(validity.Num).toBe(false);
    expect(validity.Char).toBe(true);
    expect(validity.Length).toBe(true);
  });
  test('password !qwe1!2', () => {
    const validity = passwordValidation('!qwe1!2');
    expect(validity.High).toBe(false);
    expect(validity.Low).toBe(true);
    expect(validity.Num).toBe(true);
    expect(validity.Char).toBe(true);
    expect(validity.Length).toBe(true);
  });
  test('password !@Qq2', () => {
    const validity = passwordValidation('!@Qq2');
    expect(validity.High).toBe(true);
    expect(validity.Low).toBe(true);
    expect(validity.Num).toBe(true);
    expect(validity.Char).toBe(true);
    expect(validity.Length).toBe(false);
  });
});
