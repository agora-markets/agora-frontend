import { ChainId } from '@sushiswap/sdk';

export const NETWORK_LABEL = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [25]: 'Cronos',
  [ChainId.ARBITRUM]: 'Arbitrum',
  [ChainId.MATIC]: 'Matic',
  [ChainId.MATIC_TESTNET]: 'Matic Testnet',
  [ChainId.XDAI]: 'xDai',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
  [ChainId.MOONBASE]: 'Moonbase',
  [ChainId.AVALANCHE]: 'Avalanche',
  [ChainId.FUJI]: 'Fuji',
  [ChainId.HECO]: 'HECO',
  [ChainId.HECO_TESTNET]: 'HECO Testnet',
  [ChainId.HARMONY]: 'Harmony',
  [ChainId.HARMONY_TESTNET]: 'Harmony Testnet',
};

export const Contracts = {
  [25]: {
    auction: '0xA84bf88521479A7c4565a0fa2Ca48c7Ce8Ffb404',
    sales: '0xa974469C8e1b339e54Ffc42e9e128b929707A10A',
    bundleSales: '0xe9391A3253625d0a06973e4Be11D9932ba4F788D',
    factory: '0xBBefe6432A7A772DB0F282361E3506764d8b8212', //AgoraNFTFactory
    privateFactory: '0x9FE47b52d17C574EDF4B7F5Aab558287e71bd6a1', //AgoraNFTFactoryPrivate
    artFactory: '0x3aD833eb7075B94517A969adff2B3e638c089B90', //AgoraArtFactory
    privateArtFactory: '0xE4B3f3E7B3a4AD76006E06B0424634CD7aE43cFb', //AgoraArtFactoryPrivate
    token: '0x383627CaeC2CE3b36793c34B576B2e97BEDA0466',
  },
  [ChainId.ARBITRUM]: {
    auction: '0xDC8e329b0bA326f7Fcdbb5d42B437FfC7EA7C7a8',
    sales: '0x35123486C0a742da0aA320d037e5226bA4F9bf21',
    bundleSales: '0x52352D4a5fB2a79722a875bBdF2a6D00A152a3C5',
    factory: '0x7C8a9F8D04d9f7601E04B4bd3f594F6aB42b1231', //AgoraNFTFactory
    privateFactory: '0x7d3bb8dD1f3b123C6DFEf882709Fadc007ee4532', //AgoraNFTFactoryPrivate
    artFactory: '0x980A2fAC219CD4e26033E82A44D6798F7488aDb2', //AgoraArtFactory
    privateArtFactory: '0x0106fe87F41BAa91D6fe52c508723e8cf5082c49', //AgoraArtFactoryPrivate
  },
};
