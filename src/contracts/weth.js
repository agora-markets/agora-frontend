// import { ChainId } from '@sushiswap/sdk';

import { WETH_ABI } from './abi';
import { calculateGasMargin } from 'utils';
import useConnectionUtils from 'hooks/useConnectionUtils';
import useContract from 'hooks/useContract';
import { ethers } from 'ethers';

const WETH_ADDRESS = {
  888: '0xdabd997ae5e4799be47d6e69d9431615cba28f48',
  999: '0x916283cc60fdaf05069796466af164876e35d21f',
};

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
const CHAIN = isMainnet ? 888 : 999;
export const useWETHContract = () => {
  const { getContract } = useContract();
  const {getHigherGWEI} = useConnectionUtils();
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
      gasPrice: getHigherGWEI(),
    };

    const gasEstimate = await contract.estimateGas.deposit(options);
    options.gasLimit = calculateGasMargin(gasEstimate);

    return await contract.deposit(options);
  };

  const unwrapETH = async value => {
    const contract = await getWETHContract();

    const options = {
      gasPrice: getHigherGWEI(),
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
