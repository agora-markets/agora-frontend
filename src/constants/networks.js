import { ChainId } from '@sushiswap/sdk';

export const NETWORK_LABEL = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.FANTOM]: 'Fantom',
  [ChainId.FANTOM_TESTNET]: 'Fantom Testnet',
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
  25: 'Cronos Mainnet Beta',
  [ChainId.ARBITRUM]: 'Arbitrum',
};

export const Contracts = {
  25: {
    auction: '0xEaA55E4eF33511637c47Ba1AE5A4cA74c48f9d5b',
    sales: '0x6Ea4FfaAC3Efe8A12087C3A1f7c330F778D9f7d4',
    bundleSales: '0x9fEA1302412cF9799007e3bC3d5fa21351B99018',
    factory: '0xA1D134Bbfe42EdBF175E4cfc6698cFe412210eAB', //AgoraNFTFactory
    privateFactory: '0x59c848e2e7b975c62b8ae04dCBbb26d3301ebf05', //AgoraNFTFactoryPrivate
    artFactory: '0xAe0a4d1d01FB94d41895ff103a99c5464287e5a2', //AgoraArtFactory
    privateArtFactory: '0x0437a4589eC26578A60AB46BA154b76fB64B801f', //AgoraArtFactoryPrivate
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
