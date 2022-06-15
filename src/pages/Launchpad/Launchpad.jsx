import React, { useState } from 'react';
import Header from 'components/header';
import { Footer } from 'components/Footer';
import styles from './styles.module.scss';
import LaunchCard from 'components/LaunchpadCard';


export function LaunchpadPage() {
  const [dark, setDark] = useState(false);

  const collectionsLaunchpad = [
    {
      id: 0,
      nameCollection: 'CronoGlyphs',
      sale: 'Public Sale',
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

  {/* const upcoming = [
    {
      image: '/assets/cronosdogs.jpeg',
      title: 'Cronos Dogs',
      description:
        'First dog NFT project on the Cronos Network. NFT Staking - Donations - Gaming - Airdops',
      twitter: 'https://twitter.com/cronosdogs',
      discord: 'https://discord.com/invite/ZwQ73W8XWW',
      telegram: '',
      website: 'https://cronosdogs.com/',
    },
    {
      image: '/assets/CronosLions.jpeg',
      title: 'Cronos Lions',
      description:
        'Cronos Lion is a very special NFT collection, with a wide projection and a fixed objective.',
      twitter: 'https://twitter.com/CronosLionNFT',
      discord: '',
      telegram: '',
      website: '',
    },
    {
      image: '/assets/CronosRocks.jpeg',
      title: 'Cronos Rocks',
      description:
        '100 unique Cronos Network Rocks designed and created by a team of Geologists.',
      twitter: 'https://twitter.com/CronosRocksNFT',
      discord: 'https://discord.com/invite/UtdADzxM6j',
      telegram: '',
      website: 'https://www.cronosrocks.com/',
    },
  ]; */}
  

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
               <LaunchCard key={key} collection={collec} dark={dark}/>
                ))}
              </div>
            </div>
            {/* <div className={styles.poolSection}>
              <h2>Upcoming Drops</h2>
              <div className={styles.cardRow}>
                <LaunchCard dark={dark} soldOut={false} upcoming={true} />
                <LaunchCard dark={dark} soldOut={false} upcoming={true} />
                <LaunchCard dark={dark} soldOut={false} upcoming={true} />
              </div>
            </div>
            <div className={styles.poolSection}>
              <h2>Finished Drops</h2>
              <div className={styles.cardRow}>
                <LaunchCard dark={dark} soldOut={true} />
                <LaunchCard dark={dark} soldOut={true} />
                <LaunchCard dark={dark} soldOut={true} />
              </div>
               </div> */}
          </div>
        </div>
        <Footer isDark={dark} />
      </div>
    </div>
  );
}
