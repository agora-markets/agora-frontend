import { ChainId } from '@sushiswap/sdk';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { DeFiWeb3Connector } from 'deficonnect';

import { NetworkConnector } from './NetworkConnector';

import AGORA_LOGO_URL from '../assets/svgs/logo_blue.svg';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const RPC = isMainnet
  ? {
      [25]: ' https://gateway.nebkas.ro',
    }
  : {
      [ChainId.ARBITRUM]: 'https://arb1.arbitrum.io/rpc',
    };

export const network = new NetworkConnector({
  defaultChainId: 25,
  urls: RPC,
});

export const injected = new InjectedConnector({
  supportedChainIds: isMainnet
    ? [
        25, // Cronos
      ]
    : [
        42161, // Arbitrum
      ],
});

export const walletlink = new WalletLinkConnector({
  url: ' https://gateway.nebkas.ro',
  appName: 'Agora',
  appLogoUrl: AGORA_LOGO_URL,
});

export const defiwallet = new DeFiWeb3Connector({
  supportedChainIds: [25],
  rpc: { [25]: ' https://gateway.nebkas.ro' },
  pollingInterval: 15000,
});

export const walletconnect = new WalletConnectConnector({
  rpc: { [25]: ' https://gateway.nebkas.ro' },
  chainId: 25,
});
