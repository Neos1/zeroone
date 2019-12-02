import AddIcon from './entities/AddIcon';
import Address from './entities/AddressIcon';
import BackIcon from './entities/BackIcon';
import ChainIcon from './entities/ChainIcon';
import CloseIcon from './entities/CloseIcon';
import CompilingIcon from './entities/CompilingIcon';
import CreateToken from './entities/CreateTokenIcon';
import CreditCard from './entities/CreditCardIcon';
import CrossedEyeIcon from './entities/CrossedEyeIcon';
import DropdownArrow from './entities/DropdownArrowIcon';
import Ethereum from './entities/EthereumIcon';
import EyeIcon from './entities/EyeIcon';
import IconInfo from './entities/InfoIcon';
import Login from './entities/LoginIcon';
import Password from './entities/PasswordIcon';
import QuestionUploadingIcon from './entities/QuestionUploadingIcon';
import SendingIcon from './entities/SendingIcon';
import Stats from './entities/StatsIcon';
import TokenCount from './entities/TokenCountIcon';
import TokenSymbol from './entities/TokenSymbolIcon';
import TokenName from './entities/TokenNameIcon';
import TxHashIcon from './entities/TxHashIcon';
import TxRecieptIcon from './entities/TxRecieptIcon';
import VerifyIcon from './entities/VerifyIcon';

export {
  AddIcon,
  Address,
  BackIcon,
  ChainIcon,
  CloseIcon,
  CompilingIcon,
  CreateToken,
  CreditCard,
  CrossedEyeIcon,
  DropdownArrow,
  Ethereum,
  EyeIcon,
  IconInfo,
  Login,
  Password,
  QuestionUploadingIcon,
  SendingIcon,
  Stats,
  TokenCount,
  TokenName,
  TokenSymbol,
  TxHashIcon,
  TxRecieptIcon,
  VerifyIcon,
};

export const RejectIcon = ({
  width,
  height,
  color,
  strokeWidth,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 12L12 20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12L20 20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M16.0003 29.3337C23.3641 29.3337 29.3337 23.3641 29.3337 16.0003C29.3337 8.63653 23.3641 2.66699 16.0003 2.66699C8.63653 2.66699 2.66699 8.63653 2.66699 16.0003C2.66699 23.3641 8.63653 29.3337 16.0003 29.3337Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

RejectIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  strokeWidth: PropTypes.number,
  color: PropTypes.string,
};

RejectIcon.defaultProps = {
  width: 32,
  height: 32,
  strokeWidth: 2,
  color: '#000',
};
