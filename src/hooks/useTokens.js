// import iconETH from 'assets/imgs/eth.png';
//import iconWETH from 'assets/imgs/wwan.png';
import iconZOO from 'assets/imgs/Zoo_ticker.svg';
import iconVZOO from 'assets/imgs/vZoo_ticker.svg';
import iconWCRO from 'assets/imgs/CRO.png';
// import iconUSDT from 'assets/imgs/usdt.png';
import iconUSDC from 'assets/imgs/usdc.png';
// import iconDAI from 'assets/imgs/dai.png';
// import iconUSDT from 'assets/imgs/wanUSDT.png';
// import iconUSDC from 'assets/imgs/wanUSDC.png';
// import iconETH from 'assets/imgs/wanETH.png';
// import iconWASP from 'assets/imgs/wasp.png';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const Tokens = {
  1559: [
    {
      address: '',
      name: 'Wrapped Tenet',
      symbol: 'WTENET',
      decimals: 18,
      icon: iconWCRO,
    },
    {
      address: '',
      name: 'USDC',
      symbol: 'USDC',
      decimals: 6,
      icon: iconUSDC,
    },
  ],
  155: [
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
    {
      address: '0x821A1C06F2C9aAF9Eb4b80A2A7881ae69595Cb10',
      name: 'Wrapped Tenet',
      symbol: 'WTENET',
      decimals: 18,
      icon: iconWCRO,
    },
  ],
};

export default function useTokens() {
  const chain = isMainnet ? 1559 : 155;

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
