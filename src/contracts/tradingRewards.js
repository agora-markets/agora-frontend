import { ChainId } from '@sushiswap/sdk';
import { TRADING_REWARDS_ABI } from './abi';
import { getHigherGWEI } from 'utils';
import useContract from 'hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

const TRADING_REWARDS = {
  [25]: '0x3A0d3b7FAAb7fc4bAADf9805992cE536099B98E8',
  [ChainId.ARBITRUM]: '',
};

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
const CHAIN = isMainnet ? 25 : ChainId.ARBITRUM;

export const tradingRewards = () => {
  const { getContract } = useContract();
  const { library } = useWeb3React();

  const tradingRewardsAddress = TRADING_REWARDS[CHAIN];

  const getAgoTradingRewards = async () =>
    await getContract(tradingRewardsAddress, TRADING_REWARDS_ABI);

  const claimTradingRewards = async (account, amount, merkleProof) => {
    const contract = await getAgoTradingRewards();
    const options = {
      from: account,
      gasPrice: getHigherGWEI(library),
    };

    return await contract.claim(amount, merkleProof, options);
  };

  const getUserTradingRewards = async (account, _claim) => {
    const contract = await getAgoTradingRewards();
    if (_claim)
      return await contract.canClaim(
        account,
        ethers.BigNumber.from(_claim.amount),
        _claim.proof
      );
    else return [false, 0];
  };

  return { claimTradingRewards, getUserTradingRewards };
};
