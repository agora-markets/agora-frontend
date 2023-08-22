import { LP_AGO_STAKING_ABI } from './abi';

import { getHigherGWEI } from 'utils';
import useContract from 'hooks/useContract';
import { useWeb3React } from '@web3-react/core';

const AGO_STAKING = {
  [25]: '0x6aa6D5447e4f904Eca62F45cDD1C01aE1dc05f02',
  [155]: '',
};

// eslint-disable-next-line no-undef
const isMainnet = import.meta.env.VITE_ENV === 'MAINNET';
const CHAIN = isMainnet ? 25 : 155;

export const useStakeContract = () => {
  const { getContract } = useContract();
  const { library } = useWeb3React();

  const agoStakeAddress = AGO_STAKING[CHAIN];

  const getAgoStakingContract = async () =>
    await getContract(agoStakeAddress, LP_AGO_STAKING_ABI);

  const desposit = async (amount, from) => {
    const contract = await getAgoStakingContract();
    const options = {
      from,
      gasPrice: getHigherGWEI(library),
    };

    return await contract.desposit([amount], options);
  };

  const withdraw = async (amount, from) => {
    const contract = await getAgoStakingContract();
    const options = {
      from,
      gasPrice: getHigherGWEI(library),
    };

    return await contract.withdraw([amount], options);
  };

  const harvest = async (amount, from) => {
    const contract = await getAgoStakingContract();
    const options = {
      from,
      gasPrice: getHigherGWEI(library),
    };

    return await contract.harvest([amount], options);
  };

  const calculatePendingRewards = async () => {
    const contract = await getAgoStakingContract();
    return await contract.calculatePendingRewards();
  };

  return {
    desposit,
    withdraw,
    harvest,
    calculatePendingRewards,
  };
};
