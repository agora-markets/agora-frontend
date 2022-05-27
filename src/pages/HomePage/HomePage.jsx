import React, { useEffect, useState } from 'react';
import Header from 'components/header';
import { Footer } from 'components/Footer';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';
import TxButton from 'components/TxButton';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import verifiedLogo from 'assets/imgs/verify.png';
import { HomePageCommunitySection } from './HomePageCommunitySection';
// import { HomePageArtistsSection } from './HomePageArtistsSection';
import { HomePageRecentlyListSection } from './HomePageRecentlyListSection';
import { HomePageStartOwnCollectionSection } from './HomePageStartOwnCollectionSection';
// import { HomePageTopArtworksSection } from './HomePageTopArtworksSection';
export function HomePage() {
  useEffect(() => {
    document.body.classList.add('homepage');
    return () => {
      document.body.classList.remove('homepage');
    };
  }, []);
  const [dark, setDark] = useState(false);
  const options = {
    type         : 'loop',
    gap          : '1rem',
    autoplay     : true,
    pauseOnHover : false,
    resetProgress: false,
  };
  return (
    <div className="overflow-hidden">
      <div className={`${styles.container} ${styles.homepage}`}>
        <Header setDark={setDark} />
        <div className={styles.body}>
          <div className={styles.main}>
            <div className={styles.slider}>
              <Splide 
              aria-label="My Favorite Images"
              options={options}
              >
                <SplideSlide>
                  <img src="/01.jpg" alt="Image 1" />
                </SplideSlide>
                <SplideSlide>
                  <img src="/02.jpg" alt="Image 2" />
                </SplideSlide>
                <SplideSlide>
                  <img src="/03.jpeg" alt="Image 2" />
                </SplideSlide>
              </Splide>
            </div>
            <div className={styles.heroContent}>
              <div>
                <div className={styles.nethkt}>NFT MARKETPLACE</div>
                <div className={styles.openzoo}>
                  AGORA <span>MARKET</span>
                </div>
                <div className={styles.subtitle}>
                  Create, Trade, Earn
                  <br />
                  and Join the DAGO
                </div>
              </div>
              <div
                className={`${styles.btnGroup} d-flex flex-wrap space-y-10 homepage-center-btn`}
              >
                <a></a>
                <Link to="/explore" className="btn btn-warning btn-sm home-btn">
                  EXPLORE
                </Link>
                <Link
                  to="/collections"
                  className="btn btn-primary btn-sm  home-btn"
                >
                  COLLECTIONS
                </Link>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://docs.openzoo.io"
                  className="btn btn-dark btn-sm home-btn"
                >
                  <FontAwesomeIcon icon={faBook} /> Docs
                </a>
              </div>
              <div className={styles.btnGroup}>
                <TxButton
                  className="btn btn-link btn-sm  home-btn"
                  style={{ marginLeft: -15 }}
                  onClick={() => {
                    window.location.href = '/create';
                  }}
                >
                  Create NFT &gt;
                </TxButton>
              </div>

              <div className={styles.contact}>
                <div className={styles.become}>
                  <div>
                    <img src={verifiedLogo} />
                  </div>
                  <div>
                    Become<span>verified</span>
                  </div>
                </div>
                <div className={styles.seperator}></div>
                <div className={styles.become2}>
                  <div>
                    On Telegram
                    <span>
                      <a
                        rel="noreferrer"
                        href="https://t.me/AgoraMarketNFT"
                        target="_blank"
                      >
                        here
                      </a>
                    </span>
                  </div>
                </div>
                <div className={styles.become2}>
                  <div>OR</div>
                </div>
                <div className={styles.become2}>
                  <div>
                    On Discord
                    <span>
                      <a
                        rel="noreferrer"
                        href="https://discord.gg/2JJ3fKnbgh"
                        target="_blank"
                      >
                        here
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!dark ? '' : ''}
        </div>
        {/* <HomePageArtistsSection /> */}
        <HomePageCommunitySection />
        <HomePageRecentlyListSection />
        <HomePageStartOwnCollectionSection />
        {/* <HomePageTopArtworksSection /> */}
        <Footer />
      </div>
    </div>
  );
}
