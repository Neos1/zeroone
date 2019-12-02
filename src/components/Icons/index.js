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
import PlayCircleIcon from './entities/PlayCircleIcon';
import Pudding from './entities/Pudding';
import QuestionUploadingIcon from './entities/QuestionUploadingIcon';
import SendingIcon from './entities/SendingIcon';
import Stats from './entities/StatsIcon';
import TokenCount from './entities/TokenCountIcon';
import TokenSymbol from './entities/TokenSymbolIcon';
import TokenName from './entities/TokenNameIcon';
import TxHashIcon from './entities/TxHashIcon';
import TxRecieptIcon from './entities/TxRecieptIcon';
import VerifyIcon from './entities/VerifyIcon';
import RejectIcon from './entities/RejectIcon';
import BorderArrowIcon from './entities/BorderArrowIcon';
import AdminIcon from './entities/AdminIcon';

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
  PlayCircleIcon,
  Pudding,
  QuestionUploadingIcon,
  SendingIcon,
  Stats,
  TokenCount,
  TokenName,
  TokenSymbol,
  TxHashIcon,
  TxRecieptIcon,
  VerifyIcon,
  RejectIcon,
  BorderArrowIcon,
  AdminIcon,
};

export const ThinArrow = ({
  width,
  height,
  color,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 5 9"
    fill={color}
  >
    <path
      d="M3.91967 8.80084L4.70264 7.861L2.13002 4.77295L4.70264 1.6849L3.91967 0.745055L0.564077 4.77295L3.91967 8.80084Z"
    />
  </svg>
);

ThinArrow.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

ThinArrow.defaultProps = {
  width: 5,
  height: 9,
  color: 'currentColor',
};
