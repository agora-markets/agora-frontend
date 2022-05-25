import { ChainId } from '@sushiswap/sdk';

// import iconETH from 'assets/imgs/eth.png';
//import iconWETH from 'assets/imgs/wwan.png';
import iconZOO from 'assets/imgs/Zoo_ticker.svg';
import iconVZOO from 'assets/imgs/vZoo_ticker.svg';
// import iconUSDT from 'assets/imgs/usdt.png';
// import iconUSDC from 'assets/imgs/usdc.png';
// import iconDAI from 'assets/imgs/dai.png';
// import iconUSDT from 'assets/imgs/wanUSDT.png';
// import iconUSDC from 'assets/imgs/wanUSDC.png';
// import iconETH from 'assets/imgs/wanETH.png';
// import iconWASP from 'assets/imgs/wasp.png';


// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const Tokens = {
  25: [
    // {
    //   address: '',
    //   name: 'Fantom',
    //   symbol: 'ETH',
    //   decimals: 18,
    //   icon: iconETH,
    // },
    {
      address: '0x6e11655d6aB3781C6613db8CB1Bc3deE9a7e111F',
      name: 'ZOO',
      symbol: 'ZOO',
      decimals: 18,
      icon: iconZOO,
    },
    /*
    {
      address: '0xdabd997ae5e4799be47d6e69d9431615cba28f48',
      name: 'Wrapped CRO',
      symbol: 'WCRO',
      decimals: 18,
      icon: iconWETH,
    },
    */
  ],
  [ChainId.ARBITRUM]: [
    // {
    //   address: '',
    //   name: 'Fantom',
    //   symbol: 'ETH',
    //   decimals: 18,
    //   icon: iconETH,
    // },
    {
      address: '0x890589dC8BD3F973dcAFcB02b6e1A133A76C8135',
      name: 'ZOO',
      symbol: 'ZOO',
      decimals: 18,
      icon: iconZOO,
    },
    {
      address: '0xcEEbf071CeFdD33364012a4A6BdC82105e754f53',
      name: 'vZOO',
      symbol: 'vZOO',
      decimals: 18,
      icon: iconVZOO,
    },
    // {
    //   address: '0x916283cc60fdaf05069796466af164876e35d21f',
    //   name: 'Wrapped CRO',
    //   symbol: 'WCRO',
    //   decimals: 18,
    //   icon: iconWETH,
    // },
    
    // {
    //   address: '0x3D5950287b45F361774E5fB6e50d70eEA06Bc167',
    //   name: 'wanUSDT',
    //   symbol: 'wanUSDT',
    //   decimals: 6,
    //   icon: iconUSDT,
    // },
  ],
};

export default function useTokens() {
  const chain = isMainnet ? 25 : ChainId.ARBITRUM;

  const tokens = Tokens[chain];

  const getTokenByAddress = addr => {
    const address =
      !addr ||
      addr === '0x0000000000000000000000000000000000000000' ||
      addr === 'eth'
        ? ''
        : addr;
    return (tokens || []).find(
      tk => tk.address.toLowerCase() === address.toLowerCase()
    );
  };

  return { getTokenByAddress, tokens };
}
