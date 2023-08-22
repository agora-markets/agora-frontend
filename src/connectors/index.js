import { InjectedConnector } from '@web3-react/injected-connector';
// import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
// import { DeFiWeb3Connector } from 'deficonnect';

import { NetworkConnector } from './NetworkConnector';

// import PIXELLY_LOGO_URL from '../assets/svgs/logo_blue.svg';

// eslint-disable-next-line no-undef
const isMainnet = import.meta.env.VITE_ENV === 'MAINNET';

const RPC = isMainnet
  ? {
      [1559]: 'https://rpc.tenet.org',
    }
  : {
      [155]: 'https://rpc.testnet.tenet.org',
    };

export const network = new NetworkConnector({
  defaultChainId: 1559,
  urls: RPC,
});

export const injected = new InjectedConnector({
  supportedChainIds: isMainnet
    ? [
        1559, // TENET Mainnet
      ]
    : [
        155, // TENET Testnet
      ],
});

/* export const walletlink = new WalletLinkConnector({
  url: 'https://rpc.tenet.org',
  appName: 'pixelly',
  appLogoUrl: PIXELLY_LOGO_URL,
}); */

export const walletconnect = new WalletConnectConnector({
  rpcUrl: 'https://rpc.tenet.org',
  chainId: 1559,
  networkId: 1559,
  rpc: {
    1559: 'https://rpc.tenet.org/',
  },
});
