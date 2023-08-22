import { CROCOS_STAKING_ABI } from './abi';
import { getHigherGWEI } from 'utils';
import useContract from 'hooks/useContract';
import { useWeb3React } from '@web3-react/core';

const CROCOS_STAKING = {
  [25]: '0x6aa6D5447e4f904Eca62F45cDD1C01aE1dc05f02',
  [155]: '',
};
const CROCOS_XMAS_STAKING = {
  [25]: '0x2ee818b2dd3749d33943f8226e5a72d4d3b0c14b',
  [155]: '',
};

// eslint-disable-next-line no-undef
const isMainnet = import.meta.env.VITE_ENV === 'MAINNET';
const CHAIN = isMainnet ? 25 : 155;
export const useStakingContract = () => {
  const { getContract } = useContract();
  const { library } = useWeb3React();

  const crocosStakingAddress = CROCOS_STAKING[CHAIN];
  const crocosXmasStakingAddress = CROCOS_XMAS_STAKING[CHAIN];

  const getCrocosStakingContract = async () =>
    await getContract(crocosStakingAddress, CROCOS_STAKING_ABI);

  const getCrocosXmasStakingContract = async () =>
    await getContract(crocosXmasStakingAddress, CROCOS_STAKING_ABI);

  const stakeCrocos = async (tokenId, from) => {
    const contract = await getCrocosStakingContract();
    const options = {
      from,
      gasPrice: getHigherGWEI(library),
    };

    return await contract.batchStake([tokenId], options);
  };
  const stakeXmasCrocos = async (tokenId, from) => {
    const contract = await getCrocosXmasStakingContract();
    const options = {
      from,
      gasPrice: getHigherGWEI(library),
    };

    return await contract.batchStake([tokenId], options);
  };

  const unstakeCrocos = async (tokenId, from) => {
    const contract = await getCrocosStakingContract();
    const options = {
      from,
      gasPrice: getHigherGWEI(library),
    };

    return await contract.batchWithdraw([tokenId], options);
  };
  const unstakeXmasCrocos = async (tokenId, from) => {
    const contract = await getCrocosXmasStakingContract();
    const options = {
      from,
      gasPrice: getHigherGWEI(library),
    };

    return await contract.batchWithdraw([tokenId], options);
  };

  const isStakedCrocos = async (tokenId, from) => {
    const contract = await getCrocosStakingContract();
    const options = {
      from,
    };

    const _tokenIds = (
      await contract.stakeOfOwner(from, options)
    ).map(_tokenId => Number(_tokenId));

    const _isStaked = _tokenIds.filter(a => a === Number(tokenId)).length > 0;

    return _isStaked;
  };
  const isStakedXmasCrocos = async (tokenId, from) => {
    const contract = await getCrocosXmasStakingContract();
    const options = {
      from,
    };

    const _tokenIds = (
      await contract.stakeOfOwner(from, options)
    ).map(_tokenId => Number(_tokenId));

    const _isStaked = _tokenIds.filter(a => a === Number(tokenId)).length > 0;

    return _isStaked;
  };

  const getIdsStaked = async from => {
    const contract = await getCrocosStakingContract();

    const _tokenIds = (await contract.stakeOfOwner(from)).map(_tokenId =>
      Number(_tokenId)
    );

    return _tokenIds;
  };
  const getIdsStakedXmas = async from => {
    const contract = await getCrocosXmasStakingContract();
    const _tokenIds = (await contract.stakeOfOwner(from)).map(_tokenId =>
      Number(_tokenId)
    );

    return _tokenIds;
  };

  return {
    stakeCrocos,
    stakeXmasCrocos,
    unstakeCrocos,
    unstakeXmasCrocos,
    crocosStakingAddress,
    crocosXmasStakingAddress,
    isStakedCrocos,
    isStakedXmasCrocos,
    getIdsStaked,
    getIdsStakedXmas,
  };
};
