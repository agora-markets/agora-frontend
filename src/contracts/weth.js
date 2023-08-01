import { WETH_ABI } from './abi';
import { calculateGasMargin, getHigherGWEI } from 'utils';
import useContract from 'hooks/useContract';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

const WETH_ADDRESS = {
  [25]: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
  155: '0x821A1C06F2C9aAF9Eb4b80A2A7881ae69595Cb10',
};

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
const CHAIN = isMainnet ? 1559 : 155;
export const useWETHContract = () => {
  const { getContract } = useContract();
  const { library } = useWeb3React();

  const wethAddress = WETH_ADDRESS[CHAIN];

  const getWETHContract = async () => await getContract(wethAddress, WETH_ABI);

  const getWETHBalance = async address => {
    const contract = await getWETHContract();
    return await contract.balanceOf(address);
  };

  const wrapETH = async (value, from) => {
    const contract = await getWETHContract();

    const options = {
      value,
      from,
      gasPrice: getHigherGWEI(library),
    };

    const gasEstimate = await contract.estimateGas.deposit(options);
    options.gasLimit = calculateGasMargin(gasEstimate);

    return await contract.deposit(options);
  };

  const unwrapETH = async value => {
    const contract = await getWETHContract();

    const options = {
      gasPrice: getHigherGWEI(library),
    };

    return await contract.withdraw(value, options);
  };

  const getAllowance = async (owner, spender) => {
    const contract = await getWETHContract();
    return await contract.allowance(owner, spender);
  };

  const approve = async (address, value) => {
    const contract = await getWETHContract();
    const tx = await contract.approve(
      address,
      ethers.constants.MaxUint256 || value
    );
    await tx.wait();
  };

  return {
    wethAddress,
    getWETHBalance,
    wrapETH,
    unwrapETH,
    getAllowance,
    approve,
  };
};
