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
// import { useApi } from 'api';
import LaunchpadCollection from 'pages/LaunchpadCollection';

const App = () => {
  const dispatch = useDispatch();
  const { chainId, connector } = useWeb3React();

  const [priceInterval, setPriceInterval] = useState(null);

  const getPrice = async () => {
    try {
      if (chainId === 1559) {
        const web3provider = await connector.getProvider();
        const provider = new ethers.providers.Web3Provider(web3provider);
        const oracle = new ethers.Contract(
          '0xF9168ba694f5264DA7915563debeCF963C8fDeC7',
          [
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
              ],
              name: 'getCurrentPrice',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'price',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          provider
        );
        const wtenet = '0xd6cb8a253e12893b0cf39ca78f7d858652cca1fe';
        const _price = await oracle.getCurrentPrice(wtenet);
        const price = parseFloat(_price.toString()) / 10 ** 6;
        dispatch(PriceActions.updatePrice(price));
      } else if (chainId === 155) {
        const web3provider = await connector.getProvider();
        const provider = new ethers.providers.Web3Provider(web3provider);
        const oracle = new ethers.Contract(
          '0xF9168ba694f5264DA7915563debeCF963C8fDeC7',
          [
            {
              inputs: [
                {
                  internalType: 'address',
                  name: 'token',
                  type: 'address',
                },
              ],
              name: 'getCurrentPrice',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'price',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          provider
        );
        const wtenet = '0xd6cb8a253e12893b0cf39ca78f7d858652cca1fe';
        const _price = await oracle.getCurrentPrice(wtenet);
        const price = parseFloat(_price.toString()) / 10 ** 18;
        dispatch(PriceActions.updatePrice(price));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (priceInterval) {
      clearInterval(priceInterval);
    }

    getPrice();
    setPriceInterval(setInterval(getPrice, 1000 * 10));
  }, [chainId]);

  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
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
