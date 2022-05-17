// import COINBASE_ICON_URL from 'assets/svgs/coinbase.svg';
import METAMASK_ICON_URL from 'assets/imgs/metamask.png';
import CRYPTO_COM_ICON from 'assets/imgs/CRO.png';
import WALLETCONNECT_ICON from 'assets/imgs/walletconnect.png';
import { defiwallet, injected, walletconnect } from '../connectors';

export const SUPPORTED_WALLETS = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    icon: METAMASK_ICON_URL,
  },
  DEFI_WALLET: {
    connector: defiwallet,
    name: 'Crypto.com DeFi Wallet',
    icon: CRYPTO_COM_ICON,
  },
  WALLETCONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    icon: WALLETCONNECT_ICON,
  },
};
