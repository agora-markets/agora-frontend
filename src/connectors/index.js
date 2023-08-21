import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { NetworkConnector } from './NetworkConnector';

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
        1559, // fantom
      ]
    : [
        155, // fantom testnet
      ],
});

export const walletconnect = new WalletConnectConnector({
  infuraId: '326fb0397704475abffcfa9ca9c0ee5a',
  rpcUrl: 'https://rpc.tenet.org',
  chainId: 1559,
  networkId: 1559,
  rpc: {
    1559: 'https://rpc.tenet.org',
    155: 'https://rpc.testnet.tenet.org',
  },
});
