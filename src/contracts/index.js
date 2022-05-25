// import { ethers } from 'ethers';
// import { useWeb3React } from '@web3-react/core';

export * from './abi';
export * from './auctions';
export * from './sales';
export * from './bundleSales';
export * from './token';
export * from './weth';
export * from './factory';
export * from './staking';

export const getSigner = async library => {
  // const { library } = useWeb3React();

  // await window.ethereum.enable();
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = library.getSigner();
  return signer;
};
