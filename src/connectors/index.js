// import { ChainId } from '@sushiswap/sdk';
import { InjectedConnector } from '@web3-react/injected-connector';
//import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
//import { Wallet } from 'ethers';
import { NetworkConnector } from './NetworkConnector';

//import ARTION_LOGO_URL from '../assets/svgs/logo_blue.svg';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const RPC = isMainnet
  ? {
    [25]: 'https://rpc.zookeeper.finance',
  }
  : {
    [999]: 'https://rpc.zookeeper.finance/testnet',
  };

export const network = new NetworkConnector({
  defaultChainId: 25,
  urls: RPC,
});

export const injected = new InjectedConnector({
  supportedChainIds: isMainnet
    ? [
      25, // fantom
    ]
    : [
      999, // fantom testnet
    ],
});

export const walletconnect = new WalletConnectConnector({
  infuraId: '326fb0397704475abffcfa9ca9c0ee5a',
  rpcUrl: 'https://rpc.zookeeper.finance',
  chainId: 25,
  networkId: 25,
  rpc: {
    25: 'https://rpc.zookeeper.finance',
    999: 'https://rpc.zookeeper.finance/testnet',
  }
});

// export const walletlink = new WalletLinkConnector({
//   url: 'https://rpc.zookeeper.finance',
//   appName: 'Agora',
//   appLogoUrl: ARTION_LOGO_URL,
// });
