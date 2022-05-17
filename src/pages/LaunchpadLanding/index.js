import React from 'react';
import Header from 'components/header';
import styles from './styles.module.scss';
import { FaDiscord, FaTwitter, FaTelegram, FaMedium } from 'react-icons/fa';
import logo from 'assets/imgs/logoblack.png';
import './styles.css';
import LaunchpadCollection from 'components/LaunchpadCollection';

const footer = logoago => (
  <div className={styles.footer}>
    <div className={styles.imgfootwraper}>
      <img
        src={logoago}
        height={'60px'}
        style={{ margin: 'auto', filter: 'invert(var(--color-logo))' }}
      />
    </div>
    <div className={styles.linkswrapper}>
      <a
        href="#top"
        style={{
          paddingRight: '15px',
          textDecoration: 'none',
        }}
        className={styles.footerlinks}
      >
        Home
      </a>
      <a
        href="https://docs.agoracro.com"
        style={{
          paddingRight: '15px',
          textDecoration: 'none',
        }}
        className={styles.footerlinks}
      >
        Docs
      </a>
      <a
        href="https://homescreen.hns.siasky.net/#/skylink/AQATzLn2zCUxz36Tn81UlH-3959yg3pLcHqZfT2ykNN5jg"
        style={{
          paddingRight: '15px',
          textDecoration: 'none',
        }}
        className={styles.footerlinks}
      >
        Add to Homescreen
      </a>
      <a
        href="https://t.me/AgoraMarketNFT"
        style={{
          textDecoration: 'none',
        }}
        className={styles.footerlinks}
      >
        Contact us
      </a>
    </div>
    <div
      style={{ padding: '20px', textAlign: 'center' }}
      className={styles.footertext}
    >
      © 2020 BG Labs. All rights reserved
    </div>
    <div className={styles.socialwrapper}>
      <a href={'https://twitter.com/AgoramarketNFT'} style={{ color: 'black' }}>
        <div className={styles.socialbutton}>
          <FaTwitter
            color={'var(--color-text)'}
            size={'12px'}
            style={{ marginTop: '2px' }}
          />
        </div>
      </a>
      <a href={'https://discord.gg/8Znx25QB '} style={{ color: 'black' }}>
        <div className={styles.socialbutton}>
          <FaDiscord
            color={'var(--color-text)'}
            size={'12px'}
            style={{ marginTop: '2px' }}
          />
        </div>
      </a>
      <a href={'https://t.me/AgoraMarketNFT'} style={{ color: 'black' }}>
        <div className={styles.socialbutton}>
          <FaTelegram
            color={'var(--color-text)'}
            size={'12px'}
            style={{ marginTop: '2px' }}
          />
        </div>
      </a>
    </div>
  </div>
);

const incoming = [
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
];

const incomingCards = (
  key,
  image,
  title,
  description,
  discord,
  twitter,
  telegram,
  website
) => (
  <a
    href={website}
    target={'_blank'}
    rel="noreferrer"
    style={{ textDecoration: 'none', color: 'black' }}
  >
    <div className={styles.incomingCollection}>
      <img
        src={`${image}`}
        className={styles.incomingImg}
        style={{
          width: '-webkit-fill-available',
          height: '180px',
        }}
      />
      <div
        className={styles.aboutTitle}
        style={{
          marginTop: '10px',
          fontSize: '28px',
          paddingBottom: '15px',
        }}
      >
        {title}
      </div>
      <div className={styles.desc} style={{ padding: '15px' }}>
        {description}
      </div>
      <div className={styles.soldOut}>SOLD OUT</div>
      <div className={styles.socialwrapper} style={{ paddingTop: '10px' }}>
        <a href={twitter} style={{ color: 'black' }}>
          <div className={styles.socialbutton}>
            <FaTwitter
              color={'var(--color-text)'}
              size={'12px'}
              style={{ marginTop: '2px' }}
            />
          </div>
        </a>
        <a href={discord} style={{ color: 'black' }}>
          <div className={styles.socialbutton}>
            <FaDiscord
              color={'var(--color-text)'}
              size={'12px'}
              style={{ marginTop: '2px' }}
            />
          </div>
        </a>
        <a href={telegram} style={{ color: 'black' }}>
          <div className={styles.socialbutton}>
            <FaMedium
              color={'var(--color-text)'}
              size={'12px'}
              style={{ marginTop: '2px' }}
            />
          </div>
        </a>
      </div>
    </div>
  </a>
);

const collectionsLaunchpad = [
  {
    nameCollection: 'CronoGlyphs',
    sale: 'Public Sale',
    description:
      'The very first generative art collection on Cronos. Cronoglyphs are 1111 unique 32x32 generative glyph-art compositions based on 6 different glyph sets. #CRO',
    maxSupply: 1111,
    price: 150,
    image: '/assets/glyphs.jpg',
    maxMintAmount: 20,
    address: '0x1e7ec91be2063b002689f2357e356dfb4a40c3c5',
  },
  {
    nameCollection: 'Share The Love',
    sale: 'Public Sale',
    description:
      'This project will become something not done in this space yet. All holders will get a special surprise to share their love.',
    maxSupply: 2000,
    price: 65,
    image: '/assets/sharethelove.jpg',
    maxMintAmount: 20,
    address: '0x2D65Bc1A563554D57B17d7B28452488aBee6c528',
  },
];

const LaunchpadLanding = () => {
  return (
    <>
      <Header border />
      <div className={styles.titleWrapper}>
        <div className={styles.aboutTitle}>Launchpad</div>
        <div className={styles.aboutTitleBis}>Launchpad</div>
      </div>
      <div className={styles.container}>
        <div className={styles.body}>
          {collectionsLaunchpad.map((collec, key) => (
            <LaunchpadCollection key={key} collection={collec} />
          ))}
        </div>
      </div>
      <div className={styles.aboutInner}>
        <div className={styles.aboutTitle}>Ended</div>
        <div className={styles.aboutTitleBis}>Ended </div>

        <div className={styles.incomingWrapper}>
          {incoming.map((incoming, key) =>
            incomingCards(
              key,
              incoming.image,
              incoming.title,
              incoming.description,
              incoming.discord,
              incoming.twitter,
              incoming.telegram,
              incoming.website
            )
          )}
        </div>
      </div>
      <div className={styles.spacer} />
      {footer(logo)}
    </>
  );
};

export default LaunchpadLanding;
