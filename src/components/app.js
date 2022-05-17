import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { ChainId } from '@sushiswap/sdk';
// import { Client } from '@bandprotocol/bandchain.js';

import ProtectedRoute from './ProtectedRoute';
import AccountModal from './AccountModal';
import WETHModal from './WETHModal';
import NotFound from './NotFound';
import PaintBoard from './PaintBoard';
import LandingPage from '../pages/landingpage';
import ExplorePage from '../pages/explorepage';
import ExploreCollectionsPage from '../pages/explorecollections';
import CollectionPage from '../pages/collectionpage';
import AccountDetails from '../pages/AccountDetails';
import NFTItem from '../pages/NFTItem';
import CollectionCreate from '../pages/Collection/Create';
import CollectionReview from '../pages/Collection/Review';
import NotificationSetting from '../pages/NotificationSetting';
import AuctionPage from '../pages/AuctionPage';
import PriceActions from 'actions/price.actions';
import { useApi } from 'api';
// import BetaModal from './BetaModal/index';
import { useCookies } from 'react-cookie';
import LaunchpadLanding from 'pages/LaunchpadLanding';
import staking from 'pages/Staking';

const App = () => {
  const dispatch = useDispatch();
  const { chainId } = useWeb3React();

  const [priceInterval, setPriceInterval] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [betaVisible, setBetaVisible] = useState(true);

  const [globalStats, setGlobalStats] = useState();

  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['no-show-beta-modal']);

  const { getLatestStats } = useApi();

  const getPrice = async () => {
    try {
      if (chainId === 25) {
        // const endpoint = 'https://rpc.bandchain.org';
        // const client = new Client(endpoint);
        // const resp = await client.getReferenceData(['ETH/USD', 'BTC/USD']);
        // console.log({ resp });
        // dispatch(PriceActions.updatePrice(resp.rate));
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const oracle = new ethers.Contract(
        //   '0xf4766552D15AE4d256Ad41B6cf2933482B0680dc',
        //   [
        //     {
        //       inputs: [],
        //       name: 'latestAnswer',
        //       outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
        //       stateMutability: 'view',
        //       type: 'function',
        //     },
        //   ],
        //   provider
        // );
        // const _price = await oracle.latestAnswer();
        // const price = parseFloat(_price.toString()) / 10 ** 8;
        const response = await axios.get(
          'https://api.mm.finance/api/tokens/0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23'
        );
        const _price = response.data['data']['price'];
        dispatch(PriceActions.updatePrice(_price));
      } else if (chainId === ChainId.ARBITRUM) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const oracle = new ethers.Contract(
          '0xe04676B9A9A2973BCb0D1478b5E1E9098BBB7f3D',
          [
            {
              inputs: [],
              name: 'latestAnswer',
              outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          provider
        );
        const _price = await oracle.latestAnswer();
        const price = parseFloat(_price.toString()) / 10 ** 8;
        dispatch(PriceActions.updatePrice(price));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchLatestStats = async () => {
      const _stats = await getLatestStats();
      setGlobalStats(_stats.data);
    };

    if (priceInterval) {
      clearInterval(priceInterval);
    }

    getPrice();
    setPriceInterval(setInterval(getPrice, 1000 * 10));

    fetchLatestStats();
  }, [chainId]);

  // useEffect(() => {
  //   if (cookies['no-show-beta-modal']) {
  //     setBetaVisible(false);
  //   }
  // }, [cookies]);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage globalStats={globalStats} />
          </Route>
          <Route exact path="/explore" component={ExplorePage} />
          <Route
            exact
            path="/explorecollections"
            component={ExploreCollectionsPage}
          />
          <Route exact path="/launchpad" component={LaunchpadLanding} />
          <Route path="/explore/:addr/:id" component={NFTItem} />
          <Route path="/auctions" component={AuctionPage} />
          <ProtectedRoute exact path="/create" component={PaintBoard} />
          {/* <Route path="/bundle/:bundleID" component={NFTItem} /> */}
          <Route path="/account/:uid" component={AccountDetails} />
          <Route path="/collection/:collection" component={CollectionPage} />
          <Route exact path="/staking" component={staking} />
          <ProtectedRoute
            path="/collections/create"
            component={() => <CollectionCreate isRegister={false} />}
          />
          <ProtectedRoute
            path="/collections/register"
            component={() => <CollectionCreate isRegister />}
          />
          <ProtectedRoute
            path="/collections/review"
            component={CollectionReview}
          />
          <ProtectedRoute
            path="/settings/notification"
            component={NotificationSetting}
          />
          <Route path="/404" component={NotFound} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
        <AccountModal />
        <WETHModal />
        <Toaster position="bottom-right" reverseOrder={false} />
      </Router>
      {/* <BetaModal
        visible={betaVisible}
        onClose={_notShowAgain => {
          setBetaVisible(false);
          _notShowAgain
            ? setCookie('no-show-beta-modal', true, { path: '/' })
            : null;
        }}
      /> */}
    </div>
  );
};

export default App;
