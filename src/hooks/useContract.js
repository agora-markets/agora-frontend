import { useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

export default () => {
  const { chainId, library } = useWeb3React();

  const getContract = useCallback(
    async (address, abi) => {
      if (chainId) {
        // await window.ethereum.enable();
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = library.getSigner();

        return new ethers.Contract(address, abi, signer);
      } else {
        const provider = new ethers.providers.JsonRpcProvider(
          isMainnet
            ? ' https://gateway.nebkas.ro'
            : 'https://arb1.arbitrum.io/rpc',
          isMainnet ? 25 : 42161
        );

        return new ethers.Contract(address, abi, provider);
      }
    },
    [chainId]
  );

  return { getContract };
};
