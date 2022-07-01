import React, { useState } from 'react';
import Header from 'components/header';
import { Footer } from 'components/Footer';
import styles from './styles.module.scss';

import UpcomingDetails from 'pages/LaunchpadCollection/UpcomingDetails';


const LaunchpadCollection = () => {
  const [dark, setDark] = useState(false);

  const collectionsLaunchpad = [
    {
      id: 0,
      nameCollection: 'Cronos Shaggy Galaxy',
      sale: 'Public Sale',
      status: 'Upcoming',
      shortDesc: <p>CSG is a collection of 10,000 unique, cute and shaggy creatures living on the Cronos chain. 
                    Owning a Shaggy grants you access to the ShaggyDAO. We are building a sustainable community for NFT enthusiasts on Cronos chain. 
                    Shaggies allow you to create and vote on DAO Polls in order to make your voice heard. 
                    Get involved and actively choose the fate of the project!</p>,
      description: <div><p>CSG is a collection of 10,000 unique, cute and shaggy creatures living on the Cronos chain. 
                    Owning a Shaggy grants you access to the ShaggyDAO. We are building a sustainable community for NFT enthusiasts on Cronos chain. 
                    Shaggies allow you to create and vote on DAO Polls in order to make your voice heard. 
                    Get involved and actively choose the fate of the project!</p>
                    <br></br>
                    <h4>CRO Weekly Claims</h4>
                    <p>After being rescued each Shaggy automatically initiates a countdown which,
                        at the weekly expiry date, gives its hodler the right to make the claim from our CRO pool.</p>
                    <br></br>
                    <h4>$COMB Airdrop</h4>
                    <p>Upon reaching Phase 3 of our roadmap, $COMB token liquidity will be provided on VVSFinance.
                        $COMB serves as a utility token for the project and can be burned, reducing its total supply. 
                        Shaggy hodlers will be able to redeem their share on a weekly basis during one year.</p>
                        <br></br>
                    <h4>Marketplace Royalties</h4>
                    <p>As our main goal is to reward long-term hodlers, our marketplace charges a 7.5% commission on each Shaggy sold that will be redistributed.</p>
                    </div>,
      maxSupply: 10000,
      price: 150,
      image: '/csg.png',
      maxMintAmount: 10,
      address: '0x6D2da5AE4ef3766c5E327Fe3aF32c07Ef3Facd4b',
      discord: 'https://discord.gg/5yRc4MptnW',
      twitter: 'https://twitter.com/shaggy_dao',
      website: 'https://shaggygalaxy.club/',
      roadmap: <div><h2>Minting and DAO</h2>
      <p>Shaggies NFT minting and ShaggyDAO constitution. All the Shaggies immediately start counting to be eligible in the weekly CRO claim rounds.</p><br></br>
      <h2>Governance decisions</h2>
      <p>Polls creation and voting by DAO members. We aim to create the strongest community! This is essential for the project best outcome.</p><br></br>
      <h2>$COMB LP and Vesting</h2>
      <p>25% of $COMB total supply will be provided as liquidity collateralized by CRO on VVSFinance in order to set the initial price. 70% will be unlocked on a weekly basis and Shaggy hodlers can claim their share. The remaining 5% will be kept by the team as treasury.</p><br></br>
      <h2>Further marketing actions</h2>
      <p>Once the main phases of the project are concluded we will (as a DAO) forge partnerships, create merchandise and undertake future marketing actions</p><br></br></div>,
      teamMember1: <h2>0xMagio</h2>,
      teamMember2: <h2>GioM970</h2>,
      teamMember3: <h2>frse97</h2>,
      teamMemberDetails1: <p>Founder, Web3 Dev</p>,
      teamMemberDetails2: <p>Graphic Designer</p>,
      teamMemberDetails3: <p>Dev, Animator</p>,
      launchDate: '2022-07-01T22:00'
    },
  ];
  
  return (
    <div className="overflow-hidden">
      <div className={`${styles.container} ${styles.homepage}`}>
        <Header setDark={setDark} />
        {collectionsLaunchpad.map((collec, key) => (
          <UpcomingDetails key={key} collection={collec}/>
        ))}
        <Footer isDark={dark} />{' '}
      </div>
    </div>
  );
};

export default LaunchpadCollection;
