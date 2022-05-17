import React from 'react';
import styles from './styles.module.scss';
import Header from 'components/header';

import logob from 'assets/imgs/logoblack.png';
import { FaDiscord, FaTwitter, FaTelegram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
      <a href={'https://twitter.com/AgoramarketNFT'} style={{ color: 'black' }}>
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

const AuctionPage = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.landing}>
            <div className={styles.aboutTitle} style={{ paddingTop: '20px' }}>
              Charity Auction
            </div>
            <div className={styles.description}>
              3 exceptional items, auctioned to support the fight against hunger
              in the world, from February 3 to 5.
            </div>
            <div className={styles.imagesWrapper}>
              <img src="/assets/CCClog.png" className={styles.ccc} />
              <img src="/assets/cmb.png" className={styles.cmb} />
              <img
                src="/assets/AgoraBlack.png"
                className={styles.agora}
                style={{ filter: 'invert(var(--color-logo))' }}
              />
              <img src="/assets/mmb.png" className={styles.mm} />
            </div>
          </div>
          <div className={styles.auctionContainer}>
            <div className={styles.imageContainer}>
              <div className={styles.imageInside}>
                <img
                  src="/assets/CCC21.png"
                  style={{
                    borderRadius: '10px',
                    width: '-webkit-fill-available',
                  }}
                ></img>
              </div>
            </div>
            <div className={styles.textContainer}>
              <div className={styles.titleItem}>Cronos Chimp Club 21</div>
              <div className={styles.exploreButton}>
                <Link to="/explore/0x562f021423d75a1636db5be1c4d99bc005ccebfe/21">
                  <div className={styles.exploreButtonInside}>
                    Go to Auction
                  </div>
                </Link>
              </div>
              <div className={styles.rarity}>RANK 30</div>
              <div className={styles.attributesWrapper}>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    BODY: Solid Gold (0.32%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    EARRINGS: Caveman Bone (1.87%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    EYES: Dead (3.13%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    CLOTHES: Prisoner Uniform (3.63%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    HEADGEAR: Prisoner Uniform (7.4%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    MOUTH: Disco Smirk (9.12%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    BACKGROUND: Khaki (13.42%)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.auctionContainerMM}>
            <div className={styles.textContainerMM}>
              <div className={styles.titleItem}>Mad Meerkat 9789</div>
              <Link to="/explore/0x89dbc8bd9a6037cbd6ec66c4bf4189c9747b1c56/9789">
                <div className={styles.exploreButton}>
                  <div className={styles.exploreButtonInside}>
                    Go to Auction
                  </div>
                </div>
              </Link>
              <div className={styles.rarity}>RANK 125</div>
              <div className={styles.attributesWrapper}>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    FUR: Rainbow (0.85%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    HEADWEAR: Tricorn Hat (2.25%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    CLOTHES: Googly Eyed (2.68%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    MOUTH: Open Gold (2.87%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    EYES: Sunglasses Disdain (3.14%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    BACKGROUND: Green (10.15%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    EARRINGS: Ruby Steel (30.32%)
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.imageInside}>
                <img
                  src="/assets/MM9789.png"
                  style={{
                    borderRadius: '10px',
                    width: '-webkit-fill-available',
                  }}
                ></img>
              </div>
            </div>
          </div>
          <div className={styles.auctionContainer}>
            <div className={styles.imageContainer}>
              <div className={styles.imageInside}>
                <img
                  src="/assets/CMB351.png"
                  style={{
                    borderRadius: '10px',
                    width: '-webkit-fill-available',
                  }}
                ></img>
              </div>
            </div>
            <div className={styles.textContainer}>
              <div className={styles.titleItem}>Cronos Monkey Business 351</div>
              <Link to="/explore/0x939b90c529f0e3a2c187e1b190ca966a95881fde/351">
                <div className={styles.exploreButton}>
                  <div className={styles.exploreButtonInside}>
                    Go to Auction
                  </div>
                </div>
              </Link>
              <div className={styles.rarity}>RANK 30</div>
              <div className={styles.attributesWrapper}>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    SKIN: Old (2.4%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    EYES: Golden Sunglasses (2.4%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    MOUTH: Cigar (2.7%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    CLOTHING: Suit Bow (3.2%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    BACKGROUND: Grey (17%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    HELMET: Nothing (33.4%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    JEWELS: Nothing (90.6%)
                  </div>
                </div>
                <div className={styles.attributes}>
                  <div className={styles.attributesInside}>
                    SPECIAL: Nothing (96%)
                  </div>
                </div>
              </div>
            </div>
          </div>
          {footer(logob)}
        </div>
      </div>
    </>
  );
};

export default AuctionPage;
