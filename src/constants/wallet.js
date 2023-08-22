import METAMASK_ICON_URL from 'assets/imgs/metamask.png';
import WALLETCONNECT_ICON from 'assets/imgs/walletconnect.png';
import { injected, walletconnect } from '../connectors';

export const SUPPORTED_WALLETS = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    icon: METAMASK_ICON_URL,
  },
  WALLETCONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    icon: WALLETCONNECT_ICON,
  },
};
