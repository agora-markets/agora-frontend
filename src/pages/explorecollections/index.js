import React, { useEffect, useState } from 'react';

import Header from 'components/header';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { makeStyles } from '@material-ui/core/styles';
import verified from 'assets/imgs/verified.png';

import { getRandomIPFS } from 'utils';

import nftIcon from 'assets/svgs/nft.svg';
import nftActiveIcon from 'assets/svgs/nft_active.svg';

import styles from './styles.module.scss';
import { useApi } from 'api';
import CollectionsActions from 'actions/collections.actions';
import BootstrapTooltip from 'components/BootstrapTooltip';
import logo from 'assets/imgs/logoblack.png';
import { FaDiscord, FaTwitter, FaTelegram } from 'react-icons/fa';

const useStyles = makeStyles(() => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  iconButton: {
    width: 22,
    height: 22,
    marginRight: 10,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  collectionsList: {
    overflowY: 'auto',
    marginTop: 20,
    maxHeight: 260,
  },
  collection: {
    '&:hover': {
      transform: 'translateY(-2px)',
    },
    height: 'webkit-fit-content',
    width: '300px',
    margin: '12px 0',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    borderRadius: '10px',
    minHeight: '300px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  withBorder: {
    boxSizing: 'border-box',
    border: '1px solid #D9E1EE',
  },
  statsWrapper: {
    marginTop: '10px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  name: {
    fontWeight: 700,
    fontSize: 20,
    color: '#000',
    marginRight: 4,
    textAlign: 'center',
  },
  volume: {
    fontWeight: 500,
    fontSize: 16,
    color: '#000',
    marginRight: 4,
    opacity: 0.6,
    textAlign: 'center',
  },
  checkIcon: {
    fontSize: 18,
    color: 'rgb(109, 186, 252)',
    marginLeft: 4,
  },
}));

const ExploreCollectionsPage = () => {
  const classes = useStyles();
  const [filter] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [allCollections, setAllCollections] = useState([]);
  const { fetchCollection, fetchCollections } = useApi();

  const { collections: collectionItems, collectionsLoading } = useSelector(
    state => state.Collections
  );
  const { collections } = useSelector(state => state.Filter);

  const [fetchInterval, setFetchInterval] = useState(null);

  const dispatch = useDispatch();

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

  const filteredCollections = async () => {
    const selected = [];
    let unselected = [];
    await Promise.all(
      collectionItems.map(async item => {
        const res = await fetchCollection(item.address);
        item.logoImageHash = res.data.logoImageHash;
        item.volume = res.data.volume || 0;
        if (collections.includes(item.address)) {
          selected.push(item);
        } else {
          unselected.push(item);
        }
      })
    );
    unselected = unselected.filter(
      item =>
        (item.name || item.collectionName || '')
          .toLowerCase()
          .indexOf(filter.toLowerCase()) > -1
    );
    return [...selected, ...unselected];
  };

  useEffect(() => {
    filteredCollections().then(d => setAllCollections(d));
  }, [collectionItems]);

  useEffect(() => {
    if (fetchInterval) {
      clearInterval(fetchInterval);
    }

    updateCollections();
    setFetchInterval(setInterval(updateCollections, 1000 * 60 * 10));
  }, []);

  const updateCollections = async () => {
    try {
      dispatch(CollectionsActions.fetchStart());
      const res = await fetchCollections();
      if (res.status === 'success') {
        const verified = [];
        const unverified = [];
        res.data.map(item => {
          if (item.isVerified) verified.push(item);
          else unverified.push(item);
        });
        dispatch(CollectionsActions.fetchSuccess([...verified, ...unverified]));
      }
    } catch {
      dispatch(CollectionsActions.fetchFailed());
    }
  };

  return (
    <>
      <Header border />
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.titleWrapper}>
            <div className={styles.aboutTitle}>Explore Collections</div>
            <div className={styles.aboutTitleBis}>Collections</div>
          </div>
          <div className={styles.collectionsWrapper}>
            {collectionsLoading &&
              new Array(10).fill(0).map((_, idx) => (
                <div
                  className={classes.collection}
                  style={{ justifyContent: 'center' }}
                  key={idx}
                >
                  <Skeleton
                    borderRadius="10px"
                    width="150px"
                    height="150px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    margin="auto"
                    style={{ background: 'var(--color-skel)' }}
                  />
                  <div
                    className={classes.statsWrapper}
                    style={{
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      width: '150px',
                    }}
                  >
                    <Skeleton
                      fontWeight="700"
                      fontSize="20"
                      width="150px"
                      color="#000"
                      marginRight="4"
                      textAlign="center"
                      style={{
                        background: 'var(--color-skel)',
                        margin: 'auto',
                      }}
                    />
                    <Skeleton
                      fontWeight="700"
                      fontSize="20"
                      width="150px"
                      color="#000"
                      marginRight="4"
                      textAlign="center"
                      margin="auto"
                      style={{ background: 'var(--color-skel)' }}
                    />
                  </div>
                </div>
              ))}
            {allCollections
              .sort((a, b) => b.volume - a.volume)
              .map((item, idx) => (
                <Link
                  to={`/collection/${item?.collectionName
                    ?.toLowerCase()
                    .replace(' ', '') ||
                    item?.name?.toLowerCase().replace(' ', '')}`}
                  style={{ textDecoration: 'none' }}
                  key={idx}
                >
                  <div className={classes.collection}>
                    <img
                      className={classes.logo}
                      src={
                        item.logoImageHash
                          ? `${getRandomIPFS('', true)}${item.logoImageHash}`
                          : collections.includes(item.address)
                          ? nftActiveIcon
                          : nftIcon
                      }
                    />
                    <div className={classes.statsWrapper}>
                      <span className={classes.name}>
                        <div className={styles.namet}>
                          {item.name || item.collectionName}

                          {item.isVerified && (
                            <BootstrapTooltip
                              title="Verified Collection"
                              placement="top"
                            >
                              <img
                                src={verified}
                                width={'17px'}
                                style={{ paddingLeft: '5px' }}
                              />
                            </BootstrapTooltip>
                          )}
                        </div>
                      </span>
                      <span className={classes.volume}>
                        <div className={styles.namet}>
                          <span style={{ fontWeight: '700' }}>
                            {Math.round(item.volume)}${' '}
                          </span>{' '}
                          total volume
                        </div>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          {footer(logo)}
        </div>
      </div>
    </>
  );
};

export default ExploreCollectionsPage;
