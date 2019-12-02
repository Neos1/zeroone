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

export const PlayCircleIcon = ({
  width,
  height,
  color,
  opacity,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity={opacity}>
      <path
        d="M16.0003 29.3332C23.3641 29.3332 29.3337 23.3636 29.3337 15.9998C29.3337 8.63604 23.3641 2.6665 16.0003 2.6665C8.63653 2.6665 2.66699 8.63604 2.66699 15.9998C2.66699 23.3636 8.63653 29.3332 16.0003 29.3332Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 10.6665L21.333 15.9998L13.333 21.3332V10.6665Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

PlayCircleIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  opacity: PropTypes.number,
  color: PropTypes.string,
};

PlayCircleIcon.defaultProps = {
  width: 32,
  height: 32,
  opacity: 0.7,
  color: '#000',
};

export const Pudding = ({
  width,
  height,
  color,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 19 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.6476 6.3199H17.1011C16.5623 3.33355 14.2257 0.995907 11.2398 0.455456C9.95825 0.339206 9.2733 0.38457 8.67668 0.455456C5.69075 0.994655 3.35478 3.33334 2.81891 6.3199H2.26887C1.56092 6.3199 0.987305 6.89372 0.987305 7.60146C0.987305 8.3092 1.56092 8.88302 2.26887 8.88302H2.34959L3.70103 15.3036C3.91254 16.2902 4.78256 16.996 5.79129 16.9996H14.125C15.1337 16.996 16.0037 16.2902 16.2152 15.3036L17.5667 8.88302H17.6476C18.3554 8.88302 18.9292 8.3092 18.9292 7.60146C18.9292 6.89372 18.3554 6.3199 17.6476 6.3199ZM9.95825 1.19365C12.0022 1.19698 13.9222 2.17484 15.127 3.82602C14.8021 3.50396 14.3617 3.3252 13.9041 3.32959C13.4277 3.32792 12.9711 3.51982 12.6392 3.86148C12.4623 4.06632 12.2049 4.18417 11.9344 4.18417C11.6637 4.18417 11.4063 4.06632 11.2294 3.86148C10.8963 3.52128 10.4401 3.32979 9.96388 3.32979C9.48767 3.32979 9.0317 3.52128 8.69837 3.86148C8.52108 4.06653 8.26326 4.18438 7.9921 4.18438C7.72072 4.18438 7.46312 4.06653 7.28561 3.86148C6.95291 3.51982 6.4959 3.32792 6.01907 3.32959C5.55475 3.32583 5.10858 3.50834 4.78026 3.83666C5.98423 2.17839 7.90887 1.19594 9.95825 1.19365ZM4.08859 5.03583C4.54998 5.02582 4.98906 4.836 5.31258 4.50685C5.49009 4.30181 5.7479 4.18396 6.01927 4.18396C6.29065 4.18396 6.54846 4.30181 6.72597 4.50685C7.0595 4.84685 7.51589 5.03833 7.9921 5.03833C8.4683 5.03833 8.92448 4.84685 9.25802 4.50685C9.43511 4.30265 9.6923 4.18521 9.96283 4.18521C10.2334 4.18521 10.4906 4.30265 10.6677 4.50685C11.0008 4.84706 11.4565 5.03875 11.9325 5.03875C12.4085 5.03875 12.8645 4.84706 13.1974 4.50685C13.3745 4.30223 13.6317 4.18479 13.9024 4.18479C14.173 4.18479 14.4302 4.30223 14.6072 4.50685C14.9293 4.8358 15.3673 5.02582 15.8277 5.03625C16.0085 5.44842 16.145 5.87874 16.2349 6.3199H3.68497C3.77362 5.87874 3.90899 5.44842 4.08859 5.03583ZM4.53705 15.1277L3.22232 8.88302H4.89436L6.04076 16.1452H5.79129C5.18597 16.1431 4.66387 15.7195 4.53705 15.1277ZM12.0466 8.88302L11.2824 16.1452H10.3854V8.88302H12.0466ZM14.1573 8.88302L13.0109 16.1452H12.1415L12.9058 8.88302H14.1573ZM9.53106 16.1452H8.63392L7.86966 8.88302H9.53106V16.1452ZM7.01048 8.88302L7.77475 16.1452H6.90535L5.75896 8.88302H7.01048ZM15.3792 15.1277C15.2524 15.7195 14.7303 16.1431 14.125 16.1452H13.8755L15.0219 8.88302H16.694L15.3792 15.1277ZM17.6476 8.02865H2.26887C2.03275 8.02865 1.84168 7.83737 1.84168 7.60146C1.84168 7.36555 2.03275 7.17427 2.26887 7.17427H17.6476C17.8835 7.17427 18.0748 7.36555 18.0748 7.60146C18.0748 7.83737 17.8835 8.02865 17.6476 8.02865Z"
      fill={color}
    />
  </svg>
);

Pudding.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

Pudding.defaultProps = {
  width: 19,
  height: 17,
  color: '#000',
};

export const AdminIcon = ({
  width,
  height,
  color,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 10.6669L14 5.33359C13.9998 5.09978 13.938 4.87013 13.821 4.6677C13.704 4.46527 13.5358 4.29717 13.3333 4.18026L8.66667 1.51359C8.46397 1.39657 8.23405 1.33496 8 1.33496C7.76595 1.33496 7.53603 1.39657 7.33333 1.51359L2.66667 4.18026C2.46418 4.29717 2.29599 4.46527 2.17897 4.6677C2.06196 4.87013 2.00024 5.09978 2 5.33359L2 10.6669C2.00024 10.9007 2.06196 11.1304 2.17897 11.3328C2.29599 11.5353 2.46418 11.7034 2.66667 11.8203L7.33333 14.4869C7.53603 14.604 7.76595 14.6656 8 14.6656C8.23405 14.6656 8.46397 14.604 8.66667 14.4869L13.3333 11.8203C13.5358 11.7034 13.704 11.5353 13.821 11.3328C13.938 11.1304 13.9998 10.9007 14 10.6669Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 2.80664L8 4.53997L11 2.80664"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 13.1933L5 9.73333L2 8"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 8L11 9.73333V13.1933"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.18018 4.64014L8.00018 8.0068L13.8202 4.64014"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 14.72L8 8"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

AdminIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

AdminIcon.defaultProps = {
  width: 16,
  height: 16,
  color: '#000',
};


export const BorderArrowIcon = ({
  width,
  height,
  color,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="12.0205"
      y="0.707107"
      width="16"
      height="16"
      transform="rotate(45 12.0205 0.707107)"
      fill="white"
      stroke={color}
    />
    <path
      d="M16.3536 12.536C16.5488 12.1583 16.5488 11.8417 16.3536 11.6464L13.1716 8.46447C12.9763 8.2692 12.6597 8.2692 12.4645 8.46447C12.2692 8.65973 12.2692 8.97631 12.4645 9.17157L15.2929 12L12.4645 14.8284C12.2692 15.0237 12.2692 15.3403 12.4645 15.5355C12.6597 15.7308 12.9763 15.7308 13.1716 15.5355L16.3536 12.3536ZM8 12.5L16 12.5L16 11.5L8 11.5L8 12.5Z"
      fill={color}
    />
  </svg>
);

BorderArrowIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

BorderArrowIcon.defaultProps = {
  width: 25,
  height: 25,
  color: '#000',
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
