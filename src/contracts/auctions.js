/* eslint-disable no-undef */
import { calculateGasMargin, getHigherGWEI } from 'utils';
import { Contracts } from 'constants/networks';
import useContract from 'hooks/useContract';

import { AUCTION_CONTRACT_ABI } from './abi';
import { useWeb3React } from '@web3-react/core';

// eslint-disable-next-line no-undef
const isMainnet = import.meta.env.VITE_ENV === 'MAINNET';
const CHAIN = isMainnet ? 1559 : 155;

export const useAuctionContract = () => {
  const { getContract } = useContract();
  const { library } = useWeb3React();

  const getAuctionContract = async () =>
    await getContract(Contracts[CHAIN].auction, AUCTION_CONTRACT_ABI);

  const getAuction = async (nftAddress, tokenId) => {
    const contract = await getAuctionContract();
    const res = await contract.getAuction(nftAddress, tokenId);
    const owner = res[0];
    const payToken = res[1];
    const reservePrice = res[2];
    const startTime = parseFloat(res[3].toString());
    const endTime = parseFloat(res[4].toString());
    const resulted = res[5];
    const minBid = res[6];
    return {
      owner,
      payToken,
      reservePrice,
      startTime,
      endTime,
      resulted,
      minBid,
    };
  };

  const cancelAuction = async (nftAddress, tokenId) => {
    const contract = await getAuctionContract();
    const options = {
      gasPrice: getHigherGWEI(library),
    };

    return await contract.cancelAuction(nftAddress, tokenId, options);
  };

  const createAuction = async (
    nftAddress,
    tokenId,
    payToken,
    reservePrice,
    startTimestamp,
    endTimestamp,
    minBidReserve
  ) => {
    const contract = await getAuctionContract();
    const options = {
      gasPrice: getHigherGWEI(library),
    };

    return await contract.createAuction(
      nftAddress,
      tokenId,
      payToken,
      reservePrice,
      startTimestamp,
      minBidReserve,
      endTimestamp,
      options
    );
  };

  const getHighestBidder = async (nftAddress, tokenId, tokenAddress) => {
    const contract = await getAuctionContract();
    const res = await contract.getHighestBidder(nftAddress, tokenId);
    const bidder = res[0];

    let bid;

    if (
      tokenAddress.toLowerCase() === import.meta.env.REACT_APP_USDC ||
      tokenAddress === import.meta.env.REACT_APP_FUSDT
    ) {
      bid = parseFloat(res[1].toString()) / 1e6;
    } else {
      bid = parseFloat(res[1].toString()) / 1e18;
    }

    const lastBidTime = parseFloat(res[2].toString());

    return {
      bidder,
      bid,
      lastBidTime,
    };
  };

  const placeBid = async (nftAddress, tokenId, payToken, value, from) => {
    const contract = await getAuctionContract();

    if (payToken === '') {
      const args = [nftAddress, tokenId];

      const options = {
        value,
        from,
        gasPrice: getHigherGWEI(library),
      };
      const gasEstimate = await contract.estimateGas[
        'placeBid(address,uint256)'
      ](...args, options);
      options.gasLimit = calculateGasMargin(gasEstimate);
      return await contract['placeBid(address,uint256)'](...args, options);
    } else {
      const options = {
        gasPrice: getHigherGWEI(library),
      };

      return await contract['placeBid(address,uint256,uint256)'](
        nftAddress,
        tokenId,
        value,
        options
      );
    }
  };

  const resultAuction = async (nftAddress, tokenId) => {
    const contract = await getAuctionContract();
    const options = {
      gasPrice: getHigherGWEI(library),
    };

    const tx = await contract.resultAuction(nftAddress, tokenId, options);
    await tx.wait();
  };

  const updateAuctionStartTime = async (nftAddress, tokenId, startTime) => {
    const contract = await getAuctionContract();
    const options = {
      gasPrice: getHigherGWEI(library),
    };

    const tx = await contract.updateAuctionStartTime(
      nftAddress,
      tokenId,
      startTime,
      options
    );
    await tx.wait();
  };

  const updateAuctionEndTime = async (nftAddress, tokenId, endTimestamp) => {
    const contract = await getAuctionContract();
    const options = {
      gasPrice: getHigherGWEI(library),
    };

    const tx = await contract.updateAuctionEndTime(
      nftAddress,
      tokenId,
      endTimestamp,
      options
    );
    await tx.wait();
  };

  const updateAuctionReservePrice = async (
    nftAddress,
    tokenId,
    reservePrice
  ) => {
    const contract = await getAuctionContract();
    const options = {
      gasPrice: getHigherGWEI(library),
    };

    const tx = await contract.updateAuctionReservePrice(
      nftAddress,
      tokenId,
      reservePrice,
      options
    );
    await tx.wait();
  };

  const withdrawBid = async (nftAddress, tokenId) => {
    const contract = await getAuctionContract();
    const options = {
      gasPrice: getHigherGWEI(library),
    };

    const tx = await contract.withdrawBid(nftAddress, tokenId, options);
    await tx.wait();
  };

  return {
    getAuctionContract,
    getAuction,
    cancelAuction,
    createAuction,
    getHighestBidder,
    placeBid,
    resultAuction,
    updateAuctionStartTime,
    updateAuctionEndTime,
    updateAuctionReservePrice,
    withdrawBid,
  };
};
