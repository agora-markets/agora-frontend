import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import HeaderActions from 'actions/header.actions';
import FilterActions from 'actions/filter.actions';
import Header from 'components/header';
import { FaDiscord, FaTwitter, FaMedium, FaTelegram } from 'react-icons/fa';
import Marquee from 'react-fast-marquee';
// import ReactPlayer from 'react-player';

import card1 from 'assets/imgs/global.png';
import card2 from 'assets/imgs/running.png';
import card3 from 'assets/imgs/hand.png';
import card4 from 'assets/imgs/checked.png';
import logob from 'assets/imgs/logoblack.png';
import token from 'assets/imgs/token.png';
import image1 from 'assets/imgs/image1.jpeg';
import image2 from 'assets/imgs/image2.png';
import image3 from 'assets/imgs/image3.png';
import image4 from 'assets/imgs/image4.png';

import chainlink from 'assets/imgs/Chainlink.png';
import offchain from 'assets/imgs/offchain.png';
import arbitrum from 'assets/imgs/arbitrum.png';
import alchemy from 'assets/imgs/alchemy.png';
import cronos from 'assets/imgs/cronos.png';
import graph from 'assets/imgs/coins.png';
import sale from 'assets/imgs/contract.png';
import skynet from 'assets/imgs/Skynet.png';
import mmf from 'assets/imgs/mmf.png';
import SkynetLogo from 'assets/imgs/SkynetLogo.png';
import arbitrumLogo from 'assets/imgs/arbitrumLogo.png';
// import winter from 'assets/imgs/Winter.jpeg';

import styles from './styles.module.scss';

const incoming = [
  {
    image: '/assets/cropet.jpg',
    title: 'Cropet',
    description:
      'A collection of 1500 CroPet NFTs on Cronos. Packed with utilities!🐕🐁',
    twitter: 'https://twitter.com/CroPetNFT',
    discord: 'https://discord.io/CroPetNFT',
    telegram: '',
    website: '',
  },
  {
    image: '/assets/Bee_Twitter_Banner.jpg',
    title: 'CroBees',
    description: '2,222 CROBEES Available on the Cronos Chain soon!',
    twitter: 'https://twitter.com/The_Crobees',
    discord: 'http://discord.gg/BdYExfEJ8v',
    telegram: 'https://medium.com/the-crobees-futur-ambition',
    website: 'https://www.crobees.com/',
  },
  {
    image: '/assets/croglyphs.jpeg',
    title: 'CroGlyphs',
    description:
      'Insipired by Ethereums original Autoglyphs, 1111 unique Cronoglyphs.',
    twitter: 'https://twitter.com/cronoglyphs',
    discord: '',
    telegram: '',
    website: '',
  },
];

const cards = [
  {
    icon: card1,
    title: 'Easy',
    secTitle: 'Connection',
    description:
      'We support Metamask, TrustWallet and DeFi wallet. Easy and fast access to our Marketplace.',
    path: '/',
  },
  {
    icon: card2,
    title: 'Blazing',
    secTitle: 'Fast',
    description:
      'Since Agora runs on the Arbitrum and Cronos Network, two fast networks.',
    path: '/',
  },
  {
    icon: card4,
    title: 'Permission',
    secTitle: 'less',
    description: 'Our Community and creators are central on Agora.',
    path: '/',
  },
  {
    icon: card3,
    title: 'Fees',
    secTitle: 'Redistribution',
    description:
      'Trade your NFTs on scalable Blockchains, with incredibly low fees.',
    path: '/',
  },
];

const LandingPage = ({ globalStats }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(HeaderActions.toggleSearchbar(false));
    dispatch(FilterActions.updateCategoryFilter(null));
  }, []);

  const renderAboutCard = (key, icon, title, secTitle, path) => (
    <div className={styles.aboutCard} key={key}>
      <NavLink to={path} className={styles.aboutCardLink}>
        <div className={styles.cardIconWrapper}>
          <img src={icon} style={{ width: '40px', height: '40px' }} />
        </div>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardSecTitle}>{secTitle}</div>
      </NavLink>
    </div>
  );

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
        className={styles.footertext}
        style={{ padding: '20px', textAlign: 'center' }}
      >
        © 2020 BG Labs. All rights reserved
      </div>
      <div className={styles.socialwrapperbot}>
        <a
          href={'https://twitter.com/AgoramarketNFT'}
          style={{ color: 'black' }}
        >
          <div className={styles.socialbutton}>
            <FaTwitter
              color={'var(--color-text)'}
              size={'12px'}
              style={{ marginTop: '2px' }}
            />
          </div>
        </a>
        <a href={'https://discord.gg/2JJ3fKnbgh'} style={{ color: 'black' }}>
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

  const stats = () => (
    <div className={styles.statsWrapper} style={{ marginTop: '70px' }}>
      <div className={styles.statsCard}>
        <div className={styles.cardIconWrapper}>
          <img
            src={graph}
            style={{
              width: '30px',
              height: '30px',
              filter: 'invert(var(--color-icon))',
            }}
          />
        </div>
        <div className={styles.statsNumbers}>
          {Math.round(globalStats?.totalVolume) || 0} $
        </div>
        <div className={styles.statsTitle} style={{ paddingBottom: '20px' }}>
          Total <br /> Volume
        </div>
      </div>
      <div className={styles.statsCard}>
        <div className={styles.cardIconWrapper}>
          <img src={sale} style={{ width: '30px', height: '30px' }} />
        </div>
        <div className={styles.statsNumbers}>
          {Math.round(globalStats?.totalSales) || 0}
        </div>
        <div className={styles.statsTitle} style={{ paddingBottom: '20px' }}>
          Total <br /> Sales
        </div>
      </div>
      <div className={styles.statsCard}>
        <div className={styles.cardIconWrapper}>
          <img
            src={graph}
            style={{
              width: '30px',
              height: '30px',
              filter: 'invert(var(--color-icon))',
            }}
          />
        </div>
        <div className={styles.statsNumbers}>
          {Math.round(globalStats?.dailyVolume) || 0} $
        </div>
        <div className={styles.statsTitle} style={{ paddingBottom: '20px' }}>
          Daily <br /> Volume
        </div>
      </div>
      <div className={styles.statsCard}>
        <div className={styles.cardIconWrapper}>
          <img src={sale} style={{ width: '30px', height: '30px' }} />
        </div>
        <div className={styles.statsNumbers}>
          <div className="statsDesc">
            {Math.round(globalStats?.dailySales) || 0}
          </div>
        </div>
        <div className={styles.statsTitle} style={{ paddingBottom: '20px' }}>
          Daily <br /> Sales
        </div>
      </div>
    </div>
  );

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

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body} id="top">
        <div className={styles.landing}>
          <div className={styles.mobile}>
            <div className={styles.titleMobile}>
              Create, Trade, Earn and join the DAGO.
            </div>
            <div className={styles.buttonsWrapper}>
              <a href="/explore" style={{ textDecoration: 'none' }}>
                <div className={styles.exploreButtonBis}>Explore</div>{' '}
              </a>
              <a href="/create" style={{ textDecoration: 'none' }}>
                <div className={styles.exploreButtonTres}>Create</div>
              </a>
            </div>
          </div>
          <Link to="/staking" className={styles.linkImage}>
            <img
              src={image1}
              className={styles.imageLanding}
              style={{ top: '0px', left: '860px' }}
            />
          </Link>
          <Link to="/staking" className={styles.linkImage}>
            <img
              src={image2}
              className={styles.imageLanding}
              style={{ top: '300px', left: '900px' }}
            ></img>
          </Link>
          <Link to="/staking" className={styles.linkImage}>
            <img
              src={image3}
              className={styles.imageLanding}
              style={{ top: '200px', left: '400px' }}
            />
          </Link>
          <Link to="/staking" className={styles.linkImage}>
            <img
              src={image4}
              className={styles.imageLanding}
              style={{ top: '00px', left: '0px' }}
            />
          </Link>
          <div className={styles.agoLogo}>Agora</div>
          <div className={styles.agoLogoBis}>Agora</div>
        </div>
      </div>
      <div className={styles.aboutDesk}>
        <div className={styles.titleDesk}>
          Create, Trade, Earn and join the DAGO.
        </div>
        <div className={styles.buttonsWrapper}>
          <a href="/explore" style={{ textDecoration: 'none' }}>
            <div className={styles.exploreButtonBis}>Explore</div>{' '}
          </a>
          <a href="/staking" style={{ textDecoration: 'none' }}>
            <div className={styles.exploreButtonBis}>Earn</div>
          </a>
          <a href="/create" style={{ textDecoration: 'none' }}>
            <div className={styles.exploreButtonTres}>Create</div>
          </a>
        </div>
      </div>
      <div className={styles.aboutInner}>
        <div className={styles.aboutTitle}>Stats</div>
        <div className={styles.aboutTitleBis}>Stats</div>
        {stats()}
      </div>
      <div className={styles.aboutInner}>
        <div className={styles.aboutTitle}>$AGO Token</div>
        <div className={styles.aboutTitleBis}>$AGO</div>
        <div className={styles.tokenWrapper}>
          <div className={styles.leftTitle}>
            <div className={styles.earnUp}>Earn up to </div>
            <div className={styles.Apr}> 600%</div>
            <div className={styles.staking}>APR with $AGO staking</div>
            <div className={styles.descriptions}>
              Stake AGO tokens to earn a share of daily trading fees in WCRO, in
              addition to even more AGO. Easy, sustainable yield.
            </div>
            <Link to="/staking" className={styles.exploreButton}>
              Start Earning
            </Link>
          </div>
          <div className={styles.imageToken}>
            <img src={token} style={{ width: '100%' }} />
          </div>
        </div>
      </div>
      <div className={styles.about}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutTitle}>Why Agora</div>
          <div className={styles.aboutTitleBis}>Why </div>

          <div className={styles.aboutCards}>
            {cards.map((card, key) =>
              renderAboutCard(
                key,
                card.icon,
                card.title,
                card.secTitle,
                card.path
              )
            )}
          </div>
        </div>
        <div className={styles.aboutInner}>
          <div className={styles.aboutTitle}>Incoming collections</div>
          <div className={styles.aboutTitleBis}>Incoming </div>

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
      </div>
      <div className={styles.aboutInner}>
        <div className={styles.aboutTitle} style={{ paddingBottom: '200px' }}>
          Our partners
        </div>
        <div className={styles.aboutTitleBis} style={{ zIndex: '1' }}>
          Partners{' '}
        </div>
      </div>
      <Marquee
        gradient={false}
        style={{
          paddingBottom: '100px',
          backgroundColor: 'var(--color-page-background)',
          paddingTop: '100px',
          width: '100%',
        }}
      >
        <img
          src={chainlink}
          style={{
            height: '70px',
            paddingRight: '70px',
            filter: 'invert(var(--color-logo))',
          }}
        />
        <img
          src={offchain}
          style={{
            height: '100px',
            paddingRight: '70px',
            filter: 'invert(var(--color-logo))',
          }}
        />
        <img src={mmf} style={{ height: '100px', paddingRight: '70px' }} />
        <div>
          <img
            src={SkynetLogo}
            style={{
              height: '80px',
            }}
          />
          <img
            src={skynet}
            style={{
              height: '80px',
              paddingRight: '70px',
              filter: 'invert(var(--color-logo))',
              transform: 'translateY(9px)',
            }}
          />
        </div>
        <div>
          <img
            src={arbitrumLogo}
            style={{
              height: '100px',
            }}
          />
          <img
            src={arbitrum}
            style={{
              height: '100px',
              paddingRight: '70px',
              filter: 'invert(var(--color-logo))',
            }}
          />
        </div>
        <img
          src={alchemy}
          style={{
            height: '60px',
            paddingRight: '70px',
            filter: 'invert(var(--color-logo))',
          }}
        />
        <img
          src={cronos}
          style={{
            height: '70px',
            paddingRight: '70px',
            filter: 'invert(var(--color-logo))',
          }}
        />
      </Marquee>
      {footer(logob)}
    </div>
  );
};

export default LandingPage;
