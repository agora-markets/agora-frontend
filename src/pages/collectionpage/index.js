import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import cx from 'classnames';
import { useWeb3React } from '@web3-react/core';
import { useResizeDetector } from 'react-resize-detector';
import Skeleton from 'react-loading-skeleton';
import { useHistory, useParams } from 'react-router-dom';

import StatusFilter from 'components/StatusFilter';
import ExploreFilterHeader from './Body/FilterHeader';
import NFTsGrid from 'components/NFTsGrid';
import Header from 'components/header';
import { useApi } from 'api';
import CollectionsActions from 'actions/collections.actions';
import TokensActions from 'actions/tokens.actions';
import HeaderActions from 'actions/header.actions';
import useWindowDimensions from 'hooks/useWindowDimensions';
import usePrevious from 'hooks/usePrevious';
// import ModalActions from 'actions/modal.actions';
// import Card from '../../components/NFTCard';

import verified from 'assets/imgs/verified.png';
import iconCollapse from 'assets/imgs/arrow.png';
import discordIcon from 'assets/svgs/discord.svg';
import telegramIcon from 'assets/svgs/telegram.svg';
import twitterIcon from 'assets/svgs/twitter.svg';
import mediumIcon from 'assets/svgs/medium.svg';
import webIcon from 'assets/svgs/web.svg';

// import Identicon from 'components/Identicon';
// import iconShare from 'assets/svgs/share.svg';
// import iconSettings from 'assets/svgs/settings.svg';
import { Edit as EditIcon } from '@material-ui/icons';

import styles from './styles.module.scss';
import FilterActions from 'actions/filter.actions';
import AttributesFilter from 'components/AttributesFilter';

const CollectionPage = () => {
  const {
    fetchCollections,
    fetchCollection,
    fetchTokens,
    getItemsLiked,
    getUserAccountDetails,
    updateCollectionBanner,
  } = useApi();

  const dispatch = useDispatch();

  const { chainId, account } = useWeb3React();
  const { collection } = useParams();

  const fileInput = useRef();

  const { width: gridWidth, ref } = useResizeDetector();
  const { width } = useWindowDimensions();

  const conRef = useRef();
  const [collapsed, setCollapsed] = useState(true);
  const [fetchInterval, setFetchInterval] = useState(null);
  const [cancelSource, setCancelSource] = useState(null);
  const [likeCancelSource, setLikeCancelSource] = useState(null);
  const [prevNumPerRow, setPrevNumPerRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({});
  const [bannerHash, setBannerHash] = useState();
  const [collectionData, setCollectionData] = useState(null);
  const [floorPrice, setFloorPrice] = useState(null);
  const [nbOwners, setNbOwners] = useState(null);

  const [attributes, setAttributes] = useState([]);

  const { authToken } = useSelector(state => state.ConnectWallet);
  const { upFetching, downFetching, tokens, count, from, to } = useSelector(
    state => state.Tokens
  );
  const history = useHistory();
  const {
    collections,
    groupType,
    category,
    sortBy,
    statusBuyNow,
    statusHasBids,
    statusHasOffers,
    statusOnAuction,
  } = useSelector(state => state.Filter);

  const { collections: fullCollections } = useSelector(
    state => state.Collections
  );

  const prevAuthToken = usePrevious(authToken);

  const numPerRow = Math.floor(gridWidth / 240);
  // const className = cx(styles.nft, styles[`num${numPerRow / 6}`]);
  const fetchCount = numPerRow <= 3 ? 18 : numPerRow === 4 ? 16 : numPerRow * 3;

  useEffect(() => {
    dispatch(HeaderActions.toggleSearchbar(true));

    if (fetchInterval) {
      clearInterval(fetchInterval);
    }

    updateCollections();
    setFetchInterval(setInterval(updateCollections, 1000 * 60 * 10));
  }, []);

  // const openAccountSettings = () => {
  //   dispatch(ModalActions.showAccountModal());
  // };

  const selectBanner = () => {
    fileInput.current?.click();
  };

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

  const updateFloorPrice = async () => {
    const { data } = await fetchTokens(
      0,
      1,
      groupType,
      collections,
      category,
      'cheapest',
      [],
      null,
      null,
      attributes
    );

    setFloorPrice(data.tokens[0]?.priceInUSD);
    setNbOwners(data.nbOwners);
  };

  const getUserDetails = async _account => {
    setLoading(true);
    try {
      const { data } = await getUserAccountDetails(_account);
      setUser(data);
    } catch {
      setUser({});
    }
    setLoading(false);
  };

  const handleSelectFile = e => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();

      reader.onload = async function(e) {
        const { data } = await updateCollectionBanner(
          e.target.result,
          authToken,
          collectionData.erc721Address
        );
        setBannerHash(data);
      };

      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  const fetchNFTs = async dir => {
    if (cancelSource) {
      cancelSource.cancel();
    }
    if (isNaN(fetchCount)) return;

    try {
      const filterBy = [];
      if (statusBuyNow) filterBy.push('buyNow');
      if (statusHasBids) filterBy.push('hasBids');
      if (statusHasOffers) filterBy.push('hasOffers');
      if (statusOnAuction) filterBy.push('onAuction');

      const cancelTokenSource = axios.CancelToken.source();
      setCancelSource(cancelTokenSource);

      let start;
      let _count = fetchCount;
      if (dir !== 0) {
        _count -= tokens.length % numPerRow;
        start = Math.max(dir < 0 ? from - _count : to, 0);
      } else {
        start = from;
        _count = fetchCount * 2;
      }
      if (start === _count) {
        return;
      }

      dispatch(TokensActions.startFetching(dir));

      const { data } = await fetchTokens(
        start,
        _count,
        groupType,
        collections,
        category,
        sortBy,
        filterBy,
        null,
        cancelTokenSource.token,
        attributes
      );

      let newTokens =
        dir > 0
          ? [...tokens, ...data.tokens]
          : dir < 0
          ? [...data.tokens, ...tokens]
          : data.tokens;
      newTokens = newTokens.filter(
        (tk, idx) =>
          newTokens.findIndex(_tk =>
            tk.items
              ? tk._id === _tk._id
              : tk.contractAddress === _tk.contractAddress &&
                tk.tokenID === _tk.tokenID
          ) === idx
      );
      let _from = from;
      let _to = to;
      const newCount = newTokens.length - tokens.length;
      if (dir > 0) {
        _to += newCount;
      } else if (dir < 0) {
        _from -= newCount;
      } else {
        _to = _from + newTokens.length;
      }
      newTokens =
        dir > 0
          ? newTokens.slice(-fetchCount * 2)
          : newTokens.slice(0, fetchCount * 2);
      if (dir > 0) {
        _from = _to - newTokens.length;
      } else if (dir < 0) {
        _to = _from + newTokens.length;
      }
      dispatch(
        TokensActions.fetchingSuccess(data.total, newTokens, _from, _to)
      );
      if (dir === 0 && from) {
        // move scrollbar to middle
        const obj = width > 600 ? ref.current : conRef.current;
        obj.scrollTop = (obj.scrollHeight - obj.clientHeight) / 2;
      }
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch(TokensActions.fetchingFailed());
      }
    } finally {
      setCancelSource(null);
    }
  };

  const handleScroll = e => {
    if (upFetching || downFetching) return;

    const obj = e.target;
    if (obj.scrollHeight - obj.clientHeight - obj.scrollTop < 100) {
      fetchNFTs(1);
    } else if (obj.scrollTop < 100 && from > 0) {
      fetchNFTs(-1);
    }
  };

  useEffect(() => {
    setPrevNumPerRow(numPerRow);
    if (isNaN(numPerRow) || (prevNumPerRow && prevNumPerRow !== numPerRow))
      return;
    console.log('FETCHUIING');
    fetchNFTs(0);
  }, [
    collections,
    groupType,
    category,
    sortBy,
    statusBuyNow,
    statusHasBids,
    statusHasOffers,
    statusOnAuction,
    chainId,
    numPerRow,
    attributes,
  ]);

  const updateItems = async () => {
    try {
      if (!authToken) {
        if (prevAuthToken) {
          dispatch(
            TokensActions.updateTokens(
              tokens.map(tk => ({
                ...tk,
                isLiked: false,
              }))
            )
          );
        }
        return;
      }
      let missingTokens = tokens.map((tk, index) =>
        tk.items
          ? {
              index,
              isLiked: tk.isLiked,
              bundleID: tk._id,
            }
          : {
              index,
              isLiked: tk.isLiked,
              contractAddress: tk.contractAddress,
              tokenID: tk.tokenID,
            }
      );
      if (prevAuthToken) {
        missingTokens = missingTokens.filter(tk => tk.isLiked === undefined);
      }

      if (missingTokens.length === 0) return;

      const cancelTokenSource = axios.CancelToken.source();
      setLikeCancelSource(cancelTokenSource);
      const { data, status } = await getItemsLiked(
        missingTokens,
        authToken,
        cancelTokenSource.token
      );
      if (status === 'success') {
        const newTokens = [...tokens];
        missingTokens.map((tk, idx) => {
          newTokens[tk.index].isLiked = data[idx].isLiked;
        });
        dispatch(TokensActions.updateTokens(newTokens));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLikeCancelSource(null);
    }
  };

  useEffect(() => {
    setPrevNumPerRow(numPerRow);
    if (isNaN(numPerRow) || (prevNumPerRow && prevNumPerRow !== numPerRow))
      return;

    getUserDetails(collection);
    if (fullCollections.length > 0) {
      const _collection = fullCollections.filter(c => {
        return (
          c.collectionName?.toLowerCase().replace(' ', '') === collection ||
          c.name?.toLowerCase().replace(' ', '') === collection
        );
      })[0];
      const _address = _collection?.address;
      if (!_address) history.replace('/404');
      dispatch(FilterActions.updateCollectionsFilter([_address]));
      fetchCollection(_address).then(res => {
        setIsOwner(res.data.owner?.toLowerCase() === account?.toLowerCase());
        setCollectionData(res.data);
      });
    }
  }, [fullCollections, collection, chainId, numPerRow]);

  useEffect(() => {
    if (collectionData) updateFloorPrice();
  }, [collectionData]);

  useEffect(() => {
    if (likeCancelSource) {
      likeCancelSource.cancel();
    }
    if (tokens.length) {
      updateItems();
    }
  }, [tokens, authToken]);

  return (
    <div style={{ overflowX: 'hidden', width: '100vw' }}>
      <Header border />
      <div className={styles.profile}>
        <div className={styles.banner}>
          {loading ? (
            <Skeleton
              width="100%"
              height={200}
              style={{ background: 'var(--color-skel)' }}
            />
          ) : bannerHash || collectionData?.bannerImageHash ? (
            <img
              src={`https://cloudflare-ipfs.com/ipfs/${collectionData?.bannerImageHash ||
                bannerHash}`}
              className={styles.bannerImg}
            />
          ) : (
            <div className={styles.bannerPlaceholder} />
          )}
          {isOwner && (
            <div className={styles.editBanner} onClick={selectBanner}>
              <input
                ref={fileInput}
                hidden
                type="file"
                onChange={handleSelectFile}
                accept="image/*"
              />
              <EditIcon className={styles.editIcon} />
            </div>
          )}
        </div>
        {/* <div className={styles.buttonsWrapper}>
          {isOwner && (
            <div className={styles.settings} onClick={openAccountSettings}>
              <img src={iconSettings} className={styles.settingsIcon} />
            </div>
          )}
          <div
            className={styles.settings}
            // onClick={e => setAnchorEl(e.currentTarget)}
          >
            <img src={iconShare} className={styles.settingsIcon} />
          </div>
        </div> */}
        <div className={styles.wrapper}>
          <div
            className={styles.avatarWrapper}
            style={{
              backgroundImage: `url(${`https://agora.mypinata.cloud/ipfs/${collectionData?.logoImageHash}`})`,
              backgroundSize: 'cover',
            }}
          ></div>
          <div className={styles.usernameWrapper}>
            <div className={styles.aboutTitleBis}>
              {collectionData?.name ||
                collectionData?.collectionName ||
                'Unnamed'}
            </div>
            {loading ? (
              <Skeleton
                width={120}
                height={24}
                style={{ background: 'var(--color-skel)', margin: 'auto' }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gridGap: '10px',
                }}
              >
                <div className={styles.username} style={{ marginTop: 'unset' }}>
                  {collectionData?.name ||
                    collectionData?.collectionName ||
                    'Unnamed'}
                </div>
                {collection?.isVerified && (
                  <img className={styles.verifiedIcon} src={verified} />
                )}
              </div>
            )}
          </div>
          <div className={styles.bottomWrapper}>
            <div className={styles.statswrapper}>
              <div className={styles.statsWrapBy2}>
                <div className={styles.statsElement1}>
                  <div className={styles.textStats}>
                    {count ? (
                      count
                    ) : (
                      <Skeleton
                        width={120}
                        height={24}
                        style={{
                          background: 'var(--color-skel)',
                          margin: 'auto',
                        }}
                      />
                    )}
                  </div>
                  <div className={styles.titleStats}>Items</div>
                </div>
                <div className={styles.statsElement2}>
                  <div className={styles.textStats}>
                    {nbOwners ? (
                      `${Math.round(nbOwners)}`
                    ) : (
                      <Skeleton
                        width={120}
                        height={24}
                        style={{
                          background: 'var(--color-skel)',
                          margin: 'auto',
                        }}
                      />
                    )}
                  </div>
                  <div className={styles.titleStats}>Owners</div>
                </div>
              </div>
              <div className={styles.statsWrapBy2}>
                <div className={styles.statsElement3}>
                  <div className={styles.textStats}>
                    {floorPrice ? (
                      `${Math.round(floorPrice)} $`
                    ) : (
                      <Skeleton
                        width={120}
                        height={24}
                        style={{
                          background: 'var(--color-skel)',
                          margin: 'auto',
                        }}
                      />
                    )}
                  </div>
                  <div className={styles.titleStats}>Floor Price</div>
                </div>
                <div className={styles.statsElement4}>
                  <div className={styles.textStats}>
                    {collectionData?.volume ? (
                      `${Math.round(collectionData?.volume) || 0} $`
                    ) : (
                      <Skeleton
                        width={120}
                        height={24}
                        style={{
                          background: 'var(--color-skel)',
                          margin: 'auto',
                        }}
                      />
                    )}
                  </div>
                  <div className={styles.titleStats}>Volume</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bio}>{collectionData?.description || ''}</div>
          <div className={styles.itemMenu}>
            {collectionData?.siteUrl?.length > 0 && (
              <div className={styles.itemMenuBtn}>
                <a
                  href={collectionData?.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img
                    src={webIcon}
                    style={{ filter: 'invert(var(--color-logo))' }}
                  />
                </a>
              </div>
            )}
            {collectionData?.twitterHandle?.length > 0 && (
              <div className={styles.itemMenuBtn}>
                <a
                  href={collectionData?.twitterHandle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img
                    src={twitterIcon}
                    style={{ filter: 'invert(var(--color-logo))' }}
                  />
                </a>
              </div>
            )}
            {collectionData?.mediumHandle?.length > 0 && (
              <div className={styles.itemMenuBtn}>
                <a
                  href={collectionData?.mediumHandle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img
                    src={mediumIcon}
                    style={{ filter: 'invert(var(--color-logo))' }}
                  />
                </a>
              </div>
            )}
            {collectionData?.telegram?.length > 0 && (
              <div className={styles.itemMenuBtn}>
                <a
                  href={collectionData?.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img
                    src={telegramIcon}
                    style={{ filter: 'invert(var(--color-logo))' }}
                  />
                </a>
              </div>
            )}
            {collectionData?.discord?.length > 0 && (
              <div className={styles.itemMenuBtn}>
                <a
                  href={collectionData?.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img
                    src={discordIcon}
                    style={{ filter: 'invert(var(--color-logo))' }}
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ height: '80px' }} className={styles.spacebl} />
      <div
        ref={conRef}
        className={styles.container}
        onScroll={width <= 600 ? handleScroll : null}
      >
        <div className={cx(styles.sidebar, collapsed && styles.collapsed)}>
          <div className={styles.sidebarHeader}>
            {!collapsed && <div className={styles.sidebarTitle}>Filters</div>}
            <img
              src={iconCollapse}
              className={styles.iconCollapse}
              onClick={() => setCollapsed(!collapsed)}
              style={{ filter: 'invert(var(--color-logo))' }}
            />
          </div>
          <div className={styles.filterList}>
            <StatusFilter />
            <AttributesFilter
              address={collectionData?.erc721Address}
              onChange={_atts => setAttributes(_atts)}
            />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.filterHeader}>
            <ExploreFilterHeader
              loading={upFetching || downFetching}
              category={category}
            />
          </div>
          <div
            ref={ref}
            className={styles.exploreAll}
            onScroll={width > 600 ? handleScroll : null}
          >
            <NFTsGrid
              items={tokens}
              uploading={upFetching}
              loading={downFetching}
              numPerRow={numPerRow}
              category={category}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
