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
import RejectIcon from './entities/RejectIcon';

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
  RejectIcon,
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

export const QuestionIcon = ({
  width,
  height,
  opacity,
  color,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity={opacity}>
      <path
        d="M7.99992 14.6668C11.6818 14.6668 14.6666 11.6821 14.6666 8.00016C14.6666 4.31826 11.6818 1.3335 7.99992 1.3335C4.31802 1.3335 1.33325 4.31826 1.33325 8.00016C1.33325 11.6821 4.31802 14.6668 7.99992 14.6668Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.06006 5.99989C6.21679 5.55434 6.52616 5.17863 6.93336 4.93931C7.34056 4.7 7.81932 4.61252 8.28484 4.69237C8.75036 4.77222 9.1726 5.01424 9.47678 5.37558C9.78095 5.73691 9.94743 6.19424 9.94672 6.66656C9.94672 7.99989 7.94672 8.66656 7.94672 8.66656"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 11.3335H8.00667"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>

);

QuestionIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  opacity: PropTypes.number,
  color: PropTypes.string,
};

QuestionIcon.defaultProps = {
  width: 16,
  height: 16,
  opacity: 0.7,
  color: '#000',
};
