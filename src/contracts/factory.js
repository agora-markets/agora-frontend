import { calculateGasMargin } from 'utils';
import useConnectionUtils from 'hooks/useConnectionUtils';
import { Contracts } from 'constants/networks';
import useContract from 'hooks/useContract';

import { FACTORY_ABI } from './abi';
// import { useWeb3React } from '@web3-react/core';

// eslint-disable-next-line no-undef
const isMainnet = import.meta.env.VITE_ENV === 'MAINNET';
const CHAIN = isMainnet ? 1559 : 155;

export const useFactoryContract = () => {
  const { getContract } = useContract();
  // const { library } = useWeb3React();

  const { getHigherGWEI } = useConnectionUtils();
  const getFactoryContract = async () =>
    await getContract(Contracts[CHAIN].factory, FACTORY_ABI);

  const getPrivateFactoryContract = async () =>
    await getContract(Contracts[CHAIN].privateFactory, FACTORY_ABI);

  const getArtFactoryContract = async () =>
    await getContract(Contracts[CHAIN].artFactory, FACTORY_ABI);

  const getPrivateArtFactoryContract = async () =>
    await getContract(Contracts[CHAIN].privateArtFactory, FACTORY_ABI);

  const createNFTContract = async (contract, name, symbol, value, from) => {
    const args = [name, symbol];

    const options = {
      value,
      from,
      gasPrice: getHigherGWEI(),
    };

    const gasEstimate = await contract.estimateGas.createNFTContract(
      ...args,
      options
    );
    options.gasLimit = calculateGasMargin(gasEstimate);
    return await contract.createNFTContract(...args, options);
  };

  return {
    getFactoryContract,
    getPrivateFactoryContract,
    getArtFactoryContract,
    getPrivateArtFactoryContract,
    createNFTContract,
  };
};
