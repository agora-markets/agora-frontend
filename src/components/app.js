import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
//import { axios } from 'axios';

import ProtectedRoute from './ProtectedRoute';
import AccountModal from './AccountModal';
import WETHModal from './WETHModal';
import NotFound from './NotFound';
import PaintBoard from './PaintBoard';
//import ExplorePage from '../pages/explorepage';
import AccountDetails from '../pages/AccountDetails';
//import NFTItem from '../pages/NFTItem';
import CollectionCreate from '../pages/Collection/Create';
import CollectionReview from '../pages/Collection/Review';
import NotificationSetting from '../pages/NotificationSetting';
import PriceActions from 'actions/price.actions';
import { HomePage } from 'pages/HomePage';
import { NewExplorePage } from 'pages/NewExplorePage';
import { ArtworkDetailPage } from 'pages/ArtworkDetailPage';
import { AccountProfilePage } from 'pages/AccountProfilePage';
import { CollectionsPage } from 'pages/CollectionsPage';
import { CollectionList } from 'pages/CollectionList';
import { LaunchpadPage } from 'pages/Launchpad';
import { useApi } from 'api';
import LaunchpadCollection from 'pages/LaunchpadCollection';

const App = () => {
  const dispatch = useDispatch();
  const { chainId } = useWeb3React();

  const [priceInterval, setPriceInterval] = useState(null);
  const [globalStats, setGlobalStats] = useState();
  const { getLatestStats } = useApi();

  const getPrice = async () => {
    try {
      if (chainId === 1559) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const oracle = new ethers.Contract(
          '0xF849C1ddd19f524c12A043556fAa5602a6B81F98',
          [
            {
              inputs: [],
              name: 'lastPrice',
              outputs: [
                { internalType: 'int256', name: '_lastPrice', type: 'int256' },
              ],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          provider
        );
        const _price = await oracle.lastPrice();
        const price = parseFloat(_price.toString()) / 10 ** 6;
        dispatch(PriceActions.updatePrice(price));
      } else if (chainId === 155) {
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

  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            component={HomePage}
            globalStats={globalStats}
          />
          <Route exact path="/home" component={HomePage} />
          {/*
          <Route exact path="/old-explore" component={ExplorePage} />
          <Route path="/old-explore/:addr/:id" component={NFTItem} />
           */}
          <Route exact path="/explore" component={NewExplorePage} />
          <Route exact path="/explore/:addr" component={NewExplorePage} />
          <Route
            exact
            path="/collection/:addr/:id"
            component={ArtworkDetailPage}
          />
          <ProtectedRoute exact path="/create" component={PaintBoard} />
          {/* <Route path="/bundle/:bundleID" component={NFTItem} /> */}
          <Route path="/account/:uid" component={AccountProfilePage} />
          <Route path="/old-account/:uid" component={AccountDetails} />
          <Route path="/collections" component={CollectionsPage} />

          <Route exact path="/launchpad" component={LaunchpadPage} />

          <Route
            exact
            path="/launchpad/:addr"
            component={LaunchpadCollection}
          />

          <ProtectedRoute
            path="/collection/create"
            component={() => <CollectionCreate isRegister={false} />}
          />
          <ProtectedRoute
            path="/collection/register"
            component={() => <CollectionCreate isRegister />}
          />
          <ProtectedRoute
            path="/collection/review"
            component={CollectionReview}
          />
          <ProtectedRoute
            path="/settings/notification"
            component={NotificationSetting}
          />

          <Route exact path="/collection/:addr" component={CollectionList} />

          <Route path="/404" component={NotFound} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
        <AccountModal />
        <WETHModal />
        <Toaster position="bottom-right" reverseOrder={false} />
      </Router>
    </div>
  );
};

export default App;
