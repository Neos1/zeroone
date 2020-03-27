import { fromWei } from 'web3-utils';

export default (value = '0', currency = 'ether', options = {}) => {
  const result = fromWei(value || '0', currency);
  const floatPoint = result.indexOf('.');
  const zeros = floatPoint > -1 ? result.slice(floatPoint + 1, result.length) : null;
  const maxFloats = {
    ether: 4,
    finney: 2,
    szabo: 0,
    ...options.maxFloats,
  };
  const round = maxFloats[currency] || 0;
  return zeros && zeros.length > round ? parseFloat(result).toFixed(round) : result;
};
