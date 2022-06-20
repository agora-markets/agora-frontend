import React, { useState } from 'react';
import Header from 'components/header';
import { Footer } from 'components/Footer';
import styles from './styles.module.scss';
// import { Link } from 'react-router-dom';
import LaunchpadCard from 'components/LaunchpadCard';
import UpcomingCard from 'components/LaunchpadCard/Upcoming';


export function LaunchpadPage() {
  const [dark, setDark] = useState(false);

  const collectionsLaunchpad = [
    {
      id: 0,
      nameCollection: 'CronoGlyphs',
      sale: 'Public Sale',
      status: 'Live',
      description:
        'The very first generative art collection on Cronos. Cronoglyphs are 1111 unique 32x32 generative glyph-art compositions based on 6 different glyph sets. #CRO',
      maxSupply: 1111,
      price: 150,
      image: '/assets/glyphs.jpeg',
      maxMintAmount: 20,
      address: '0x1e7ec91be2063b002689f2357e356dfb4a40c3c5',
      discord: '',
      twitter: '',
      website: '',
      roadmap: '',
      teamMember1: '',
      teamMember2: '',
      teamMember3: '',
      teamMemberDetails1: '',
      teamMemberDetails2: '',
      teamMemberDetails3: '',
    },
    {
      id: 1,
      nameCollection: 'Share The Love',
      sale: 'Public Sale',
      status: 'Live',
      description:
        'This project will become something not done in this space yet. All holders will get a special surprise to share their love.',
      maxSupply: 2000,
      price: 65,
      image: '/sharethelove.jpeg',
      maxMintAmount: 20,
      address: '0x2D65Bc1A563554D57B17d7B28452488aBee6c528',
      discord: '',
      twitter: '',
      website: '',
      roadmap: '',
      teamMember1: '',
      teamMember2: '',
      teamMember3: '',
      teamMemberDetails1: '',
      teamMemberDetails2: '',
      teamMemberDetails3: '',
    },
  ];

  const upcoming = [
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
        launchDate: '07/01/22',
        },
        
      ];

  return (
    <div className="overflow-hidden">
      <div className={`${styles.container} ${styles.homepage}`}>
        <Header setDark={setDark} />
        <div className={styles.body}>
          <div className={styles.main}>
            <div className={styles.selectPool}>
              <a href="https://forms.gle/EUkxuCETSerjHTXN7" >Apply to Launchpad</a>
            </div>
            <div className={styles.poolSection}>
              <h2>Ongoing Drops</h2>
              <div className={styles.cardRow}>
               {collectionsLaunchpad.map((collec, key) => (
               <LaunchpadCard key={key} collection={collec} dark={dark}/>
                ))}
              </div>
            </div>
            <div className={styles.poolSection}>
              <h2>Upcoming Drops</h2>
              <div className={styles.cardRow}>
              {upcoming.map((upcoming, key) =>
              <UpcomingCard key={key} upcoming={upcoming} dark={dark} />
              )}
            </div>
            {/* <div className={styles.poolSection}>
              <h2>Finished Drops</h2>
              <div className={styles.cardRow}>
                <LaunchCard dark={dark} soldOut={true} />
                <LaunchCard dark={dark} soldOut={true} />
                <LaunchCard dark={dark} soldOut={true} />
              </div>
               </div> */}
          </div>
        </div>
        </div>
        <Footer isDark={dark} />
      </div>
    </div>
  );
}
