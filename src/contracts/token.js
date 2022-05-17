import { useWeb3React } from '@web3-react/core';
import useContract from 'hooks/useContract';
import { getHigherGWEI } from 'utils';

import {
  ERC20_CONTRACT_ABI,
  ERC721_CONTRACT_ABI,
  ERC1155_CONTRACT_ABI,
} from './abi';

export const useNFTContract = () => {
  const { getContract } = useContract();
  const { library } = useWeb3React();

  const getERC20Contract = async address =>
    await getContract(address, ERC20_CONTRACT_ABI);

  const getERC721Contract = async address =>
    await getContract(address, ERC721_CONTRACT_ABI);

  const getERC1155Contract = async address =>
    await getContract(address, ERC1155_CONTRACT_ABI);

  const mintNFT = async (address, amount, value, from) => {
    const contract = await getERC721Contract(address);
    const options = {
      value,
      from,
      gasPrice: getHigherGWEI(library),
    };

    return await contract.mint(amount, options);
  };

  return { mintNFT, getERC20Contract, getERC721Contract, getERC1155Contract };
};
