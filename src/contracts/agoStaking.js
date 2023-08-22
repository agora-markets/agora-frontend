import {
  FEE_SHARING_ABI,
  ERC20_CONTRACT_ABI,
  TOKEN_DISTRIBUTOR_ABI,
} from './abi';

import { getHigherGWEI } from 'utils';
import useContract from 'hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import { Contracts } from 'constants/networks';
// import { ethers } from 'ethers';

const FEE_SHARING_SYSTEM = {
  [25]: '0x2bDDBA3F7DD5Fd18da89CD7eD5BaA1da37FD4eE0',
  155: '',
};

const TOKEN_DISTRIBUTOR = {
  [25]: '0xE2a13d4398d87bbC310b6c3189fB950963a252C7',
  155: '',
};

// eslint-disable-next-line no-undef
const isMainnet = import.meta.env.VITE_ENV === 'MAINNET';
const CHAIN = isMainnet ? 1559 : 155;

export const useAgoContract = () => {
  const { getContract } = useContract();
  const { library } = useWeb3React();

  const agoStakeAddress = FEE_SHARING_SYSTEM[CHAIN];
  const tokenDistributorAddress = TOKEN_DISTRIBUTOR[CHAIN];
  const agoContractAddress = Contracts[25].token;

  const getAgoStakingContract = async () =>
    await getContract(agoStakeAddress, FEE_SHARING_ABI);

  // eslint-disable-next-line no-unused-vars
  const getTokenDistributorContract = async () =>
    await getContract(tokenDistributorAddress, TOKEN_DISTRIBUTOR_ABI);

  const getAgoTokenContract = async () =>
    await getContract(agoContractAddress, ERC20_CONTRACT_ABI);

  const stakeAGO = async (amount, from) => {
    const contract = await getAgoStakingContract();
    const options = {
      from,
      gasPrice: getHigherGWEI(library),
    };

    return await contract.deposit(amount, false, options);
  };

  const unstakeAGO = async (amount, from) => {
    const contract = await getAgoStakingContract();
    const options = {
      from,
      gasPrice: getHigherGWEI(library),
    };

    // const userInfo = await contract.userInfo(from);

    // const sharePriceAgo = await contract.calculateSharePriceInAGO();
    // console.log(sharePriceAgo, amount);

    // const sharesToUnstake = sharePriceAgo.div(amount);
    // console.log(sharesToUnstake);

    return await contract.withdrawAll(false, options);
  };

  const harvest = async from => {
    const contract = await getAgoStakingContract();
    const options = {
      from,
      gasPrice: getHigherGWEI(library),
    };

    return await contract.harvest(options);
  };

  const getPendingRewards = async account => {
    const contract = await getAgoStakingContract();
    return await contract.calculatePendingRewards(account);
  };
  const getUserShares = async account => {
    const contract = await getAgoStakingContract();
    return await contract.calculateSharesValueInAGO(account);
  };

  const getAGOBalance = async account => {
    const contract = await getAgoTokenContract();
    return await contract.balanceOf(account);
  };

  const getTotalAgoStaked = async () => {
    const contract = await getAgoStakingContract();
    const share = await contract.totalShares();
    const shareprice = await contract.calculateSharePriceInAGO();
    const result = share.mul(shareprice);
    return result;
  };

  return {
    stakeAGO,
    unstakeAGO,
    harvest,
    getPendingRewards,
    getAgoTokenContract,
    getAGOBalance,
    agoStakeAddress,
    getUserShares,
    getTotalAgoStaked,
  };
};
