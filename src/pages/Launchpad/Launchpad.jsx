import React, { useState } from 'react';
import Header from 'components/header';
import { Footer } from 'components/Footer';
import styles from './styles.module.scss';
// import { Link } from 'react-router-dom';
import LaunchpadCard from 'components/LaunchpadCard';
// import UpcomingCard from 'components/LaunchpadCard/Upcoming';

export function LaunchpadPage() {
  const [dark, setDark] = useState(false);

  const collectionsLaunchpad = [
    {
      nameCollection: 'Cronos Shaggy Galaxy',
      sale: 'Public Sale',
      status: 'Live',
      description: (
        <p>
          CSG is a collection of 10,000 unique, cute and shaggy creatures living
          on the Cronos chain. Owning a Shaggy grants you access to the
          ShaggyDAO. We are building a sustainable community for NFT enthusiasts
          on Cronos chain. Shaggies allow you to create and vote on DAO Polls in
          order to make your voice heard. Get involved and actively choose the
          fate of the project!
        </p>
      ),
      maxSupply: 10000,
      price: 150,
      image: '/csg.png',
      maxMintAmount: 10,
      address: '0x6D2da5AE4ef3766c5E327Fe3aF32c07Ef3Facd4b',
      discord: 'https://discord.gg/xXsVphhtQQ',
      twitter: 'https://twitter.com/shaggy_dao',
      website: 'https://shaggygalaxy.club/',
      roadmap: (
        <div>
          <h2>Minting and DAO</h2>
          <p>
            Shaggies NFT minting and ShaggyDAO constitution. All the Shaggies
            immediately start counting to be eligible in the weekly CRO claim
            rounds.
          </p>
          <br></br>
          <h2>Governance decisions</h2>
          <p>
            Polls creation and voting by DAO members. We aim to create the
            strongest community! This is essential for the project best outcome.
          </p>
          <br></br>
          <h2>$COMB LP and Vesting</h2>
          <p>
            25% of $COMB total supply will be provided as liquidity
            collateralized by CRO on VVSFinance in order to set the initial
            price. 70% will be unlocked on a weekly basis and Shaggy hodlers can
            claim their share. The remaining 5% will be kept by the team as
            treasury.
          </p>
          <br></br>
          <h2>Further marketing actions</h2>
          <p>
            Once the main phases of the project are concluded we will (as a DAO)
            forge partnerships, create merchandise and undertake future
            marketing actions
          </p>
          <br></br>
        </div>
      ),
      teamMember1: <h2>0xMagio</h2>,
      teamMember2: <h2>GioM970</h2>,
      teamMember3: <h2>frse97</h2>,
      teamMemberDetails1: <p>Founder, Web3 Dev</p>,
      teamMemberDetails2: <p>Graphic Designer</p>,
      teamMemberDetails3: <p>Dev, Animator</p>,
    },
  ];

  {
    /* const upcoming = [
    {
        image: '/csg.png',
        title: 'Cronos Shaggy Galaxy',
        description:
        'CSG is a collection of 10,000 unique, cute and shaggy creatures living on the Cronos chain. Owning a shaggy grants you access to the ShaggyDAO',
        twitter: 'twitter.com/shaggy_dao',
        discord: 'discord.gg/xXsVphhtQQ',
        telegram: '',
        website: 'https://shaggygalaxy.club/',
        contractAddress: '0x6D2da5AE4ef3766c5E327Fe3aF32c07Ef3Facd4b',
        price: '150',
        maxSupply: '10000',
        launchDate: '2022-07-01T22:00',
        },
        
      ]; */
  }

  return (
    <div className="overflow-hidden">
      <div className={`${styles.container} ${styles.homepage}`}>
        <Header setDark={setDark} />
        <div className={styles.body}>
          <div className={styles.main}>
            <div className={styles.selectPool}>
              <a href="https://forms.gle/EUkxuCETSerjHTXN7">
                Apply to Launchpad
              </a>
            </div>
            <div className={styles.poolSection}>
              <h2>Ongoing Drops</h2>
              <div className={styles.cardRow}>
                {collectionsLaunchpad.map((collec, key) => (
                  <LaunchpadCard key={key} collection={collec} dark={dark} />
                ))}
              </div>
            </div>
            {/* <div className={styles.poolSection}>
              <h2>Upcoming Drops</h2>
              <div className={styles.cardRow}>
              {upcoming.map((upcoming, key) =>
              <UpcomingCard key={key} upcoming={upcoming} dark={dark} />
              )}
              </div> */}
            {/* <div className={styles.poolSection}>
              <h2>Finished Drops</h2>
              <div className={styles.cardRow}>
                <LaunchCard dark={dark} soldOut={true} />
                <LaunchCard dark={dark} soldOut={true} />
                <LaunchCard dark={dark} soldOut={true} />
              </div>
               </div>
          </div> */}
          </div>
        </div>
        <Footer isDark={dark} />
      </div>
    </div>
  );
}
