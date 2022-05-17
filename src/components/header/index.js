import React, { useEffect, useState, useRef } from 'react';
import { useHistory, withRouter, NavLink, Link } from 'react-router-dom';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { Menu } from '@material-ui/core';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useWeb3React } from '@web3-react/core';
import { ExpandMore, Search as SearchIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { Menu as MenuIcon } from '@material-ui/icons';

import WalletConnectActions from 'actions/walletconnect.actions';
import AuthActions from 'actions/auth.actions';
import ModalActions from 'actions/modal.actions';
import Setmode from 'actions/setmode.actions';
import { shortenAddress, getRandomIPFS } from 'utils';
import { useApi } from 'api';
import { NETWORK_LABEL } from 'constants/networks';
import { ADMIN_ADDRESS } from 'constants/index';
import WETHModal from 'components/WETHModal';
import ModModal from 'components/ModModal';
import BanCollectionModal from 'components/BanCollectionModal';
import BanItemModal from 'components/BanItemModal';
import BanUserModal from 'components/BanUserModal';
import BoostCollectionModal from 'components/BoostCollectionModal';
import ConnectWalletModal from 'components/ConnectWalletModal';
import Identicon from 'components/Identicon';

import logob from 'assets/imgs/logoblack.png';
import logow from 'assets/imgs/logowhite.png';
import iconUser from 'assets/imgs/user.png';
import iconNotification from 'assets/imgs/notification.png';
import iconAdd from 'assets/svgs/add.svg';
import iconEdit from 'assets/imgs/verify.png';
import iconSwap from 'assets/imgs/exchanging.png';
import trade from 'assets/imgs/exchange.png';

import styles from './styles.module.scss';

import { useCookies } from 'react-cookie';

const Header = ({ border }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    apiUrl,
    storageUrl,
    getAuthToken,
    getAccountDetails,
    getIsModerator,
  } = useApi();
  const { account, chainId, deactivate } = useWeb3React();

  const { user } = useSelector(state => state.Auth);
  let isSearchbarShown = useSelector(state => state.HeaderOptions.isShown);
  const { isModerator } = useSelector(state => state.ConnectWallet);
  const { wethModalVisible, connectWalletModalVisible } = useSelector(
    state => state.Modal
  );
  let darkTheme = useSelector(state => state.Setmode.darkmode);
  const [cookies, setCookie, removeCookie] = useCookies(['dark-mode']);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [modModalVisible, setModModalVisible] = useState(false);
  const [isBan, setIsBan] = useState(false);
  const [banCollectionModalVisible, setBanCollectionModalVisible] = useState(
    false
  );
  const [banItemModalVisible, setBanItemModalVisible] = useState(false);
  const [banUserModalVisible, setBanUserModalVisible] = useState(false);
  const [unbanUserModalVisible, setUnbanUserModalVisible] = useState(false);
  const [
    boostCollectionModalVisible,
    setBoostCollectionModalVisible,
  ] = useState(false);

  const [keyword, setKeyword] = useState('');
  const [cancelSource, setCancelSource] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [tokenDetailsLoading, setTokenDetailsLoading] = useState(false);
  // const [utils, setutils] = useState(false);
  const timer = useRef(null);

  const isMenuOpen = Boolean(anchorEl);
  const isUtilsOpen = Boolean(anchorEl2);

  const login = async () => {
    try {
      setLoading(true);
      const token = await getAuthToken(account);
      const isModerator = await getIsModerator(account);

      dispatch(WalletConnectActions.connectWallet(token, isModerator));
      dispatch(AuthActions.fetchStart());
      try {
        const { data } = await getAccountDetails(token);
        dispatch(AuthActions.fetchSuccess(data));
      } catch {
        dispatch(AuthActions.fetchFailed());
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const init = () => {
    login();
  };

  useEffect(() => {
    if (account) {
      init();
    } else {
      handleSignOut();
    }
  }, [account, chainId]);

  useEffect(() => {
    if (cookies['dark-mode']) {
      dispatch(Setmode.SetdarkmodeActions());
    } else {
      dispatch(Setmode.SetlightmodeActions());
    }
  }, []);

  useEffect(() => {
    // Accessing scss variable "--background-color"
    // and "--text-color" using plain JavaScript
    // and changing the same according to the state of "darkTheme"
    const root = document.documentElement;
    root?.style.setProperty(
      '--color-page-background',
      darkTheme ? '#221f20' : '#efedea'
    );
    root?.style.setProperty('--color-text', darkTheme ? '#efedea' : '#221f20');

    root?.style.setProperty('--color-skel', darkTheme ? '#141414' : '#efedea');

    root?.style.setProperty('--color-logo', darkTheme ? '100%' : '0%');

    root?.style.setProperty('--color-icon', darkTheme ? '0%' : '100%');

    root?.style.setProperty('--hover-menu', darkTheme ? '#15150e' : '#eaeaf1');

    root?.style.setProperty(
      '--border-box',
      darkTheme ? 'rgba(25, 25, 25, 1)' : 'rgba(235,235,235,1)'
    );

    root?.style.setProperty('--card-bg', darkTheme ? '#000' : '#fff');

    root?.style.setProperty(
      '--card-header',
      darkTheme
        ? 'linear-gradient(rgba(36, 33, 30, 0.392) 0%, rgb(0, 0, 0) 40%)'
        : 'linear-gradient(rgba(229, 232, 235, 0.392) 0%, rgb(255, 255, 255) 20%)'
    );

    root?.style.setProperty(
      '--icon-wrapper',
      darkTheme ? 'rgba(25,25,25,1)' : 'rgba(250,250,250,1)'
    );

    root?.style.setProperty(
      '--color-box',
      darkTheme ? 'rgba(21,21,21,.64)' : 'rgba(255,255,255,.64)'
    );
  }, [darkTheme]);

  const handleConnectWallet = () => {
    dispatch(ModalActions.showConnectWalletModal());
  };

  const resetResults = () => {
    setAccounts([]);
    setCollections([]);
    setTokens([]);
    setBundles([]);
  };

  useEffect(() => {
    resetResults();
  }, [isSearchbarShown]);

  const search = async word => {
    setKeyword(word);

    if (cancelSource) {
      cancelSource.cancel();
    }

    if (word.length === 0) {
      resetResults();

      return;
    }

    try {
      const cancelTokenSource = axios.CancelToken.source();
      setCancelSource(cancelTokenSource);

      const {
        data: {
          data: { accounts, collections, tokens, bundles },
        },
      } = await axios({
        method: 'post',
        url: `${apiUrl}/info/searchNames`,
        data: JSON.stringify({ name: word }),
        headers: {
          'Content-Type': 'application/json',
        },
        cancelToken: cancelTokenSource.token,
      });

      Promise.all(
        tokens.map(async token => {
          if (token.imageURL) {
            token.imageURL = getRandomIPFS(token.imageURL);
          }

          if (token.imageURL === '-') {
            const {
              data: { image },
            } = await axios.get(token.tokenURI);

            if (image) {
              // eslint-disable-next-line require-atomic-updates
              token.imageURL = getRandomIPFS(token.imageURL);
            }
          }
        })
      );

      setAccounts(accounts);
      setCollections(collections);
      setTokenDetailsLoading(true);
      setTokens(tokens);
      setBundles(bundles);
      setTokenDetailsLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setCancelSource(null);
    }
  };

  const handleSelectCollection = addr => {
    history.push(`/collection/${addr}`);
  };

  const handleSearch = word => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => search(word), 500);
  };

  const handleSignOut = () => {
    deactivate();
    dispatch(WalletConnectActions.disconnectWallet());
    dispatch(AuthActions.signOut());
    handleMenuClose();
  };

  const handleProfileMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleUtilsOpen = a => {
    setAnchorEl2(a.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUtilsClose = () => {
    setAnchorEl2(null);
  };

  const goToMyProfile = () => {
    history.push(`/account/${account}`);
    handleMenuClose();
  };

  const goToStaking = () => {
    history.push(`/staking`);
    handleMenuClose();
  };

  const goToNotificationSettings = () => {
    history.push(`/settings/notification`);
    handleMenuClose();
  };

  const handleCreateCollection = () => {
    history.push('/collections/create');
    handleMenuClose();
  };

  const handleRegisterCollection = () => {
    history.push('/collections/register');
    handleMenuClose();
  };

  const openWrapStation = () => {
    dispatch(ModalActions.showWETHModal());
    handleMenuClose();
  };

  const addMod = () => {
    setIsAdding(true);
    setModModalVisible(true);
    handleMenuClose();
  };

  const removeMod = () => {
    setIsAdding(false);
    setModModalVisible(true);
    handleMenuClose();
  };

  const reviewCollections = () => {
    history.push('/collections/review');
    handleMenuClose();
  };

  const banCollection = () => {
    setIsBan(true);
    setBanCollectionModalVisible(true);
    handleMenuClose();
  };

  const unbanCollection = () => {
    setIsBan(false);
    setBanCollectionModalVisible(true);
    handleMenuClose();
  };

  const banItems = () => {
    setBanItemModalVisible(true);
    handleMenuClose();
  };

  const banUser = () => {
    setBanUserModalVisible(true);
    handleMenuClose();
  };

  const unbanUser = () => {
    setUnbanUserModalVisible(true);
    handleMenuClose();
  };

  const boostCollection = () => {
    setBoostCollectionModalVisible(true);
    handleMenuClose();
  };

  const changeMode = () => {
    if (darkTheme) {
      removeCookie('dark-mode');
      dispatch(Setmode.SetlightmodeActions());
    } else {
      setCookie('dark-mode', true, { path: '/' });
      dispatch(Setmode.SetdarkmodeActions());
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      classes={{
        paper: styles.profilemenu,
        list: styles.menuList,
      }}
    >
      {account && (
        <div
          className={cx(styles.menuItem, styles.topItem)}
          onClick={goToMyProfile}
        >
          <img
            src={iconUser}
            className={styles.menuIcon}
            style={{ filter: 'invert(var(--color-logo))' }}
          />
          My Profile
        </div>
      )}
      <div className={styles.menuItem} onClick={goToStaking}>
        <img
          src={trade}
          className={styles.menuIcon}
          style={{ filter: 'invert(var(--color-logo))' }}
        />
        Staking
      </div>
      <div className={styles.menuItem} onClick={goToNotificationSettings}>
        <img
          src={iconNotification}
          className={styles.menuIcon}
          style={{ filter: 'invert(var(--color-logo))' }}
        />
        Notifications
      </div>
      <div className={styles.menuItem} onClick={handleCreateCollection}>
        <img
          src={iconAdd}
          className={styles.menuIcon}
          style={{ filter: 'invert(var(--color-logo))' }}
        />
        Create New Collection
      </div>
      <div className={styles.menuItem} onClick={openWrapStation}>
        <img
          src={iconSwap}
          className={styles.menuIcon}
          style={{ filter: 'invert(var(--color-logo))' }}
        />
        CRO / WCRO Station
      </div>
      <div className={styles.menuItem} onClick={handleRegisterCollection}>
        <img
          src={iconEdit}
          className={styles.menuIcon}
          style={{ filter: 'invert(var(--color-logo))' }}
        />
        Register Your Collection
      </div>

      <div className={styles.menuSeparator} />
      {account?.toLowerCase() === ADMIN_ADDRESS.toLowerCase()
        ? [
            <div key={0} className={styles.menuItem} onClick={addMod}>
              Add Mod
            </div>,
            <div key={1} className={styles.menuItem} onClick={removeMod}>
              Remove Mod
            </div>,
            <div
              key={2}
              className={styles.menuItem}
              onClick={reviewCollections}
            >
              Review Collections
            </div>,
            <div key={3} className={styles.menuItem} onClick={banCollection}>
              Ban Collection
            </div>,
            <div key={4} className={styles.menuItem} onClick={unbanCollection}>
              Unban Collection
            </div>,
            <div key={5} className={styles.menuItem} onClick={banItems}>
              Ban Items
            </div>,
            <div key={6} className={styles.menuItem} onClick={banUser}>
              Ban a user
            </div>,
            <div key={7} className={styles.menuItem} onClick={unbanUser}>
              Unban a user
            </div>,
            <div key={8} className={styles.menuItem} onClick={boostCollection}>
              Boost Collection
            </div>,
            <div key={9} className={styles.menuSeparator} />,
          ]
        : isModerator
        ? [
            <div key={1} className={styles.menuItem} onClick={banCollection}>
              Ban Collection
            </div>,
            <div key={2} className={styles.menuItem} onClick={banItems}>
              Ban Items
            </div>,
            <div key={3} className={styles.menuItem} onClick={banUser}>
              Ban a user
            </div>,
            <div key={6} className={styles.menuItem} onClick={unbanUser}>
              Unban a user
            </div>,
            <div key={4} className={styles.menuSeparator} />,
          ]
        : null}
      <div className={styles.signOut} onClick={handleSignOut}>
        Sign Out
      </div>
    </Menu>
  );

  const renderUtils = (
    <Menu
      anchorEl={anchorEl2}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isUtilsOpen}
      onClose={handleUtilsClose}
      classes={{
        paper: styles.profilemenu,
        list: styles.menuList,
      }}
    >
      <NavLink
        to="/launchpad"
        className={cx(styles.utilsItem, styles.topItem, styles.link)}
      >
        Launchpad
      </NavLink>
      <NavLink
        to="/explore"
        className={cx(styles.utilsItem, styles.topItem, styles.link)}
      >
        Explore
      </NavLink>
      <NavLink
        to="/explorecollections"
        className={cx(styles.utilsItem, styles.topItem, styles.link)}
      >
        Collections
      </NavLink>
      <NavLink
        to="/create"
        className={cx(styles.utilsItem, styles.topItem, styles.link)}
      >
        Create
      </NavLink>
    </Menu>
  );

  const renderSearchBox = () => (
    <div className={cx(styles.searchcont, searchBarActive && styles.active)}>
      <div className={styles.searchcontinner}>
        <div className={styles.searchbar}>
          <SearchIcon className={styles.searchicon} />
          <input
            placeholder="Search items, collections and accounts"
            className={styles.searchinput}
            onChange={e => handleSearch(e.target.value)}
            onFocus={() => setSearchBarActive(true)}
            onBlur={() => setTimeout(() => setSearchBarActive(false), 200)}
          />
        </div>
        {searchBarActive && (
          <div className={styles.resultcont}>
            {collections.length > 0 && (
              <div className={styles.resultsection}>
                <div className={styles.resultsectiontitle}>Collections</div>
                <div className={styles.separator} />
                <div className={styles.resultlist}>
                  {collections.map((collection, idx) => (
                    <div
                      key={idx}
                      className={styles.result}
                      onClick={() =>
                        handleSelectCollection(
                          collection?.collectionName
                            ?.toLowerCase()
                            .replace(' ', '') ||
                            collection?.name?.toLowerCase().replace(' ', '')
                        )
                      }
                    >
                      <img
                        className={styles.resultimg}
                        src={`${getRandomIPFS('', true)}${
                          collection.logoImageHash
                        }`}
                      />
                      <div className={styles.resulttitle}>
                        {collection.collectionName}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {accounts.length > 0 && (
              <div className={styles.resultsection}>
                <div className={styles.resultsectiontitle}>Accounts</div>
                <div className={styles.separator} />
                <div className={styles.resultlist}>
                  {accounts.map((account, idx) => (
                    <Link
                      to={`/account/${account.address}`}
                      key={idx}
                      className={styles.result}
                    >
                      {account.imageHash ? (
                        <img
                          className={styles.resultimg}
                          src={`https://cloudflare-ipfs.com/ipfs/${account.imageHash}`}
                        />
                      ) : (
                        <Identicon
                          className={styles.resultimg}
                          account={account.address}
                          size={40}
                        />
                      )}
                      <div className={styles.resulttitle}>{account.alias}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {tokens.length > 0 && (
              <div className={styles.resultsection}>
                <div className={styles.resultsectiontitle}>Items</div>
                <div className={styles.separator} />
                <div className={styles.resultlist}>
                  {tokens.map((tk, idx) => (
                    <Link
                      to={`/explore/${tk.contractAddress}/${tk.tokenID}`}
                      key={idx}
                      className={styles.result}
                    >
                      <div className={styles.resultimg}>
                        {tokenDetailsLoading ? (
                          <Skeleton
                            width={40}
                            height={40}
                            style={{ background: 'var(--color-skel)' }}
                          />
                        ) : (
                          tk.thumbnailPath &&
                          (tk.thumbnailPath.length > 10 ? (
                            <img
                              src={`${storageUrl}/image/${tk.thumbnailPath}`}
                            />
                          ) : tk.thumbnailPath === '.' ? (
                            <img src={tk.imageURL} />
                          ) : null)
                        )}
                      </div>
                      <div className={styles.resulttitle}>{tk.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {bundles.length > 0 && (
              <div className={styles.resultsection}>
                <div className={styles.resultsectiontitle}>Bundles</div>
                <div className={styles.separator} />
                <div className={styles.resultlist}>
                  {bundles.map((bundle, idx) => (
                    <Link
                      to={`/bundle/${bundle._id}`}
                      key={idx}
                      className={styles.result}
                    >
                      <div className={styles.resultimg}></div>
                      <div className={styles.resulttitle}>{bundle.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {keyword.length > 0 &&
              collections.length === 0 &&
              accounts.length === 0 &&
              tokens.length === 0 &&
              bundles.length === 0 && (
                <div className={styles.noResults}>No Results</div>
              )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={cx(styles.header, border && styles.hasBorder)}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          {darkTheme ? (
            <img src={logow} alt="logo" />
          ) : (
            <img src={logob} alt="logo" />
          )}
        </Link>

        {darkTheme ? (
          <MdLightMode
            color="white"
            style={{ marginLeft: '20px' }}
            className={styles.themeTrigger}
            onClick={() => changeMode()}
          />
        ) : (
          <MdDarkMode
            className={styles.themeTrigger}
            style={{ marginLeft: '20px' }}
            onClick={() => changeMode()}
          />
        )}
        <div
          className={styles.utils}
          style={{
            marginLeft: 'auto',
            marginRight: 'unset',
            position: 'absolute',
            right: '30px',
          }}
          onClick={handleUtilsOpen}
        >
          <MenuIcon />
        </div>
        {renderUtils}

        {isSearchbarShown && renderSearchBox()}
        <div className={styles.secondmenu}>
          <NavLink
            to="/launchpad"
            className={cx(styles.menuLink, styles.link)}
            activeClassName={styles.active}
            data-title="Launchpad"
          >
            Launchpad
          </NavLink>
          <NavLink
            to="/explore"
            className={cx(styles.menuLink, styles.link)}
            activeClassName={styles.active}
            data-title="Explore"
          >
            Explore
          </NavLink>
          <NavLink
            to="/explorecollections"
            className={cx(styles.menuLink, styles.link)}
            activeClassName={styles.active}
            data-title="Collections"
          >
            Collections
          </NavLink>
          <NavLink
            to="/create"
            className={cx(styles.menuLink, styles.link)}
            activeClassName={styles.active}
            data-title="Create"
          >
            Create
          </NavLink>
        </div>
      </div>
      <div className={styles.menu}>
        {isSearchbarShown && renderSearchBox()}
        <NavLink
          to="/launchpad"
          className={cx(styles.menuLink, styles.link)}
          activeClassName={styles.active}
          data-title="Launchpad"
        >
          Launchpad
        </NavLink>
        <NavLink
          to="/explore"
          className={cx(styles.menuLink, styles.link)}
          activeClassName={styles.active}
          data-title="Explore"
        >
          Explore
        </NavLink>
        <NavLink
          to="/explorecollections"
          className={cx(styles.menuLink, styles.link)}
          activeClassName={styles.active}
          data-title="Collections"
        >
          Collections
        </NavLink>
        <NavLink
          to="/create"
          className={cx(styles.menuLink, styles.link)}
          activeClassName={styles.active}
          data-title="Create"
        >
          Create
        </NavLink>
        {account ? (
          <div
            className={cx(styles.account, styles.menuUser)}
            onClick={handleProfileMenuOpen}
          >
            {loading ? (
              <Skeleton
                className={styles.avatar}
                style={{ background: 'var(--color-skel)' }}
              />
            ) : user?.imageHash ? (
              <img
                src={`https://cloudflare-ipfs.com/ipfs/${user?.imageHash}`}
                width="24"
                height="24"
                className={styles.avatar}
              />
            ) : (
              <Identicon
                account={account}
                size={36}
                className={styles.avatar}
              />
            )}
            <div className={styles.profile}>
              <div
                className={styles.address}
                data-title={user?.alias || shortenAddress(account)}
              >
                {loading ? (
                  <Skeleton
                    width={120}
                    style={{ background: 'var(--color-skel)' }}
                  />
                ) : (
                  user?.alias || shortenAddress(account)
                )}
              </div>
              <div className={styles.network}>
                {loading ? (
                  <Skeleton
                    width={80}
                    style={{ background: 'var(--color-skel)' }}
                  />
                ) : (
                  NETWORK_LABEL[chainId]
                )}
              </div>
            </div>

            <ExpandMore
              className={cx(styles.expand, isMenuOpen && styles.expanded)}
            />
          </div>
        ) : (
          <div className={cx(styles.connect)} onClick={handleConnectWallet}>
            Connect Wallet
          </div>
        )}
      </div>
      {renderMenu}
      <WETHModal
        visible={wethModalVisible}
        onClose={() => dispatch(ModalActions.hideWETHModal())}
      />
      <ModModal
        isAdding={isAdding}
        visible={modModalVisible}
        onClose={() => setModModalVisible(false)}
      />
      <BanCollectionModal
        visible={banCollectionModalVisible}
        isBan={isBan}
        onClose={() => setBanCollectionModalVisible(false)}
      />
      <BanItemModal
        visible={banItemModalVisible}
        onClose={() => setBanItemModalVisible(false)}
      />
      <BanUserModal
        visible={banUserModalVisible}
        onClose={() => setBanUserModalVisible(false)}
        isForBanning={true}
      />
      <BanUserModal
        visible={unbanUserModalVisible}
        onClose={() => setUnbanUserModalVisible(false)}
        isForBanning={false}
      />
      <BoostCollectionModal
        visible={boostCollectionModalVisible}
        onClose={() => setBoostCollectionModalVisible(false)}
      />
      <ConnectWalletModal
        visible={connectWalletModalVisible}
        onClose={() => dispatch(ModalActions.hideConnectWalletModal())}
      />
    </div>
  );
};

export default withRouter(Header);
