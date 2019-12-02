const passwordValidation = (value) => {
  const regexHigh = new RegExp(/^(?=[^A-Z]*[A-Z]).{1,}$/g);
  const regexLow = new RegExp(/^(?=[^a-z]*[a-z]).{1,}$/g);
  const regexNum = new RegExp(/^(?=[^0-9]*[0-9]).{1,}$/g);
  const regexChar = new RegExp(/^(?=.*[!&$%&? "]).{1,}$/g);
  const regexLength = new RegExp(/^.{6,}$/g);

  const values = {
    High: regexHigh.test(value),
    Low: regexLow.test(value),
    Num: regexNum.test(value),
    Char: regexChar.test(value),
    Length: regexLength.test(value),
  };

  return values;
};

export default passwordValidation;
