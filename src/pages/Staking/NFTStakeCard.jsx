import StakingSidebar from 'components/StakingSidebar';
import React, { useState } from 'react';
import styles from './styles.module.scss';

const NFTStakeCard = () => {
  const [sidebar, setSidebar] = useState(false);
  function showSidebar() {
    setSidebar(!sidebar);
  }

  return (
    <>
      {sidebar ? <StakingSidebar/> : ''}
      <div
        id={sidebar ? styles.nftCardActive : styles.nftCard}
        onClick={showSidebar}
      >
        <div className={styles.nftImage}>
          <img src="/01.jpg" alt="nft-collection-image" />
        </div>
        <div className={styles.nftInfo}>
          <span className={styles.nftId}>#2415</span>
          <span>Horror Squad</span>
        </div>
        <button className={styles.stakeBtn}>Stake</button>
      </div>
    </>
  );
};

export default NFTStakeCard;
