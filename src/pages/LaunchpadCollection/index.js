import React, { useState } from 'react';
import Header from 'components/header';
import { Footer } from 'components/Footer';
import styles from './styles.module.scss';

import LaunchpadDetails from 'pages/LaunchpadCollection/LaunchpadDetails';


const LaunchpadCollection = () => {
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
  
  return (
    <div className="overflow-hidden">
      <div className={`${styles.container} ${styles.homepage}`}>
        <Header setDark={setDark} />
        {collectionsLaunchpad.map((collec, key) => (
          <LaunchpadDetails key={key} collection={collec}/>
        ))}
        <Footer isDark={dark} />{' '}
      </div>
    </div>
  );
};

export default LaunchpadCollection;
