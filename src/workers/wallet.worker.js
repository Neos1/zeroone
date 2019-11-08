
const ejsWallet = require('ethereumjs-wallet');
const hdKey = require('ethereumjs-wallet/hdkey');
const bip39 = require('bip39');

const walletHdPath = "m/44'/60'/0'/0/0";

const createWallet = ({ id, payload: { mnemonic, password = '', action } }) => {
  try {
    const wallet = hdKey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic))
      .derivePath(walletHdPath)
      .deriveChild(0)
      .getWallet();

    const privateKey = wallet.getPrivateKeyString();
    const v3wallet = wallet.toV3(password);

    const payload = {
      action,
      privateKey,
      wallet,
      v3wallet,
      mnemonic,
    };
    return { id, payload };
  } catch (e) {
    return { id, payload: { e } };
  }
};

const readWallet = ({ id, payload: { input, password } }) => {
  try {
    const data = {
      privateKey: ejsWallet.fromV3(input, password).getPrivateKey(),
    };
    return { id, payload: data };
  } catch (e) {
    return { id, payload: e };
  }
};


onmessage = (e) => {
  const { payload } = e.data;
  const { action } = payload;
  let response;

  switch (action) {
    case 'create':
      response = createWallet(e.data);
      break;
    case 'read':
      response = readWallet(e.data);
      break;
    case 'recover':
      response = createWallet(e.data);
      break;
    default:
      response = null;
      break;
  }


  if (response instanceof Error) {
    response = null;
  }

  self.postMessage(response);
};
