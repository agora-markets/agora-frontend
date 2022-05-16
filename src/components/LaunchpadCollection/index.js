/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { LinearProgress } from '@material-ui/core';
import './styles.css';
import { useState } from 'react';
import { useNFTContract } from 'contracts';
import { useWeb3React } from '@web3-react/core';
import showToast from 'utils/toast';
import { ethers } from 'ethers';
import { formatError, getRandomIPFS } from 'utils';

const LaunchpadCollection = ({ collection }) => {
  const [minting, setMinting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [totalSupply, setTotalSupply] = useState(0);
  const [mintError, setMintError] = useState(null);
  // const [items, setItems] = useState([]);
  const [now, setNow] = useState(new Date());

  const { mintNFT, getERC721Contract } = useNFTContract();
  const { account } = useWeb3React();

  const validateMintAmount = () => {
    if (mintAmount >= 1 && mintAmount <= collection.maxMintAmount) {
      setMintError(null);
    } else {
      setMintError('Invalid mint amount.');
    }
  };

  useEffect(() => {
    if (!collection.address) return;
    const updateTotalSupply = async () => {
      const contract = await getERC721Contract(collection.address);
      const _total = await contract.totalSupply();
      setTotalSupply(Number(_total));
    };

    setInterval(() => {
      setNow(new Date());
      updateTotalSupply();
    }, 1000);

    updateTotalSupply();
  }, [collection.address]);

  const handleMint = async () => {
    setMinting(true);

    try {
      const tx = await mintNFT(
        collection.address,
        mintAmount,
        ethers.utils.parseEther((collection.price * mintAmount).toString()),
        account
      );
      await tx.wait();

      setMinting(false);
      showToast('success', 'NFT successfuly minted!');
    } catch (error) {
      console.error(error);
      showToast('error', formatError(error));
      setMinting(false);
    }
  };

  return (
    <div className={styles.launchWrapper}>
      <div className={styles.infoWrapper}>
        <div className={styles.exploreButton}>{collection.sale}</div>
        <div className={styles.titleCollection}>
          {collection.nameCollection}
        </div>
        <div className={styles.descriptionCollection}>
          {collection.description}
        </div>
        <div className={styles.statswrapper}>
          <div className={styles.statsWrapBy2}>
            <div className={styles.statsElement1}>
              <div className={styles.textStats}>{collection.maxSupply}</div>
              <div className={styles.titleStats}>Items</div>
            </div>
            <div className={styles.statsElement2}>
              <div className={styles.textStats}>{collection.price} CRO</div>
              <div className={styles.titleStats}>Price</div>
            </div>
          </div>
        </div>
        <div className={styles.mintWrapper}>
          {account ? (
            <button
              className={styles.mintButton}
              onClick={handleMint}
              disabled={minting || mintError}
            >
              {minting ? 'Minting...' : 'Mint'}
            </button>
          ) : (
            <button className={styles.mintButton}>Connect Wallet</button>
          )}
          <input
            type="number"
            max={collection.maxMintAmount}
            step={1}
            min={1}
            className={styles.formInput}
            value={mintAmount}
            onChange={e => setMintAmount(e.target.value)}
            onBlur={validateMintAmount}
          />
        </div>
        <div className={styles.mintProgress}>
          <div className={styles.mintText}>Mint progress</div>
          <LinearProgress
            value={Math.round((totalSupply / collection.maxSupply) * 100)}
            variant="determinate"
            color="secondary"
            style={{ backgroundColor: 'rgba(255, 107, 199, 0.4) ' }}
          />
          <div className={styles.mintProgression}>
            {totalSupply}/{collection.maxSupply} (
            {Math.round((totalSupply / collection.maxSupply) * 100)}%)
          </div>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <img
          src={collection.image}
          style={{ width: '90%', borderRadius: '20px' }}
        />
      </div>
    </div>
  );
};

export default LaunchpadCollection;
