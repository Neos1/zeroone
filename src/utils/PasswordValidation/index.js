const passwordValidation = (value) => {
  const regexHigh = new RegExp(/[A-Z]/);
  const regexLow = new RegExp(/[a-z]/);
  const regexNum = new RegExp(/\d/g);
  const regexChar = new RegExp(/[!&$%?"]/);
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
