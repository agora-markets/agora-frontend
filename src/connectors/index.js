import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { DeFiWeb3Connector } from 'deficonnect';

import { NetworkConnector } from './NetworkConnector';

import PIXELLY_LOGO_URL from '../assets/svgs/logo_blue.svg';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const RPC = isMainnet
  ? {
      [1559]: 'https://rpc.tenet.org',
    }
  : {
      [155]: 'https://rpc.testnet.tenet.org',
    };

export const network = new NetworkConnector({
  defaultChainId: 155,
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

export const walletlink = new WalletLinkConnector({
  url: 'https://rpc.testnet.tenet.org',
  appName: 'tenart',
  appLogoUrl: PIXELLY_LOGO_URL,
});

export const defiwallet = new DeFiWeb3Connector({
  supportedChainIds: [155],
  rpc: { [155]: 'https://rpc.testnet.tenet.org' },
  pollingInterval: 15000,
});

export const walletconnect = new WalletConnectConnector({
  rpc: 'https://rpc.testnet.tenet.org',
  chainId: 155,
});
