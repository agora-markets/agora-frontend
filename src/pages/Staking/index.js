import Header from 'components/header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useSelector } from 'react-redux';

import styles from './styles.module.scss';
import logoRound from '../../assets/imgs/logoRound.png';
import exchange from '../../assets/imgs/exchange.png';
import cro from '../../assets/imgs/CRO.png';
import logoago from 'assets/imgs/logoblack.png';
import { FaDiscord, FaTwitter, FaTelegram } from 'react-icons/fa';
import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import './styles.css';
import cx from 'classnames';

// import { formatNumber } from 'utils';
import Skeleton from 'react-loading-skeleton';
import PriceInput from 'components/PriceInput';
import InputError from 'components/InputError';
import { useWeb3React } from '@web3-react/core';
import { useAgoContract } from 'contracts/agoStaking';
import { ClipLoader } from 'react-spinners';
import { ethers } from 'ethers';
import toast from 'utils/toast';
import { formatError } from 'utils';
import showToast from 'utils/toast';
import { useApi } from 'api';

import ago3D from 'assets/imgs/ago3d.png';
import BootstrapTooltip from 'components/BootstrapTooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { tradingRewards } from 'contracts/tradingRewards';
import JsonData from './airdrop1output.json';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const staking = () => {
  const [value, setValue] = React.useState(0);
  const [valueAPR, setValueAPR] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [stakedBalance, setStakedBalance] = React.useState(0);
  const [agoRewards, setAGORewards] = React.useState(0);
  const [userTradingRewards, setUserTradingRewards] = React.useState(0);
  const [TokenAgoPrice, setTokenAgoPrice] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [loadingRewards, setLoadingRewards] = React.useState(false);
  const [claimingTradingRewards, setClaimingTradingRewards] = React.useState(
    false
  );
  const [staking, setStaking] = React.useState(false);
  const [claiming, setClaiming] = React.useState(false);
  const [inputError, setInputError] = React.useState('');
  const [globalStats, setGlobalStats] = useState();
  // const { price } = useSelector(state => state.Price);
  const { getLatestStats } = useApi();

  const { explorerUrl } = useApi();

  const { chainId, account, library } = useWeb3React();

  useEffect(() => {
    const fetchLatestStats = async () => {
      const _stats = await getLatestStats();
      setGlobalStats(_stats.data);
    };
    getTokenAgoPrice();
    fetchLatestStats();
  }, []);

  const {
    getAGOBalance,
    stakeAGO,
    unstakeAGO,
    getPendingRewards,
    agoStakeAddress,
    getAgoTokenContract,
    getUserShares,
    harvest,
    getTotalAgoStaked,
  } = useAgoContract();

  const { claimTradingRewards, getUserTradingRewards } = tradingRewards();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = index => {
    setValue(index);
  };

  const parseBalance = bal => {
    return bal.toFixed(4);
  };
  const isMax = () => {
    return value === 0
      ? amount === (balance - 0.001).toString()
      : amount === stakedBalance.toString();
  };

  const onMax = () => {
    value === 0
      ? setAmount((balance - 0.001).toString())
      : setAmount(stakedBalance.toString());
  };

  const addToWallet = async () => {
    const tokenAddress = '0x383627CaeC2CE3b36793c34B576B2e97BEDA0466';
    const tokenSymbol = 'AGO';
    const tokenDecimals = 18;
    const tokenImage = 'https://agoracro.com/icon.png';

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await library.provider.sendAsync({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        showToast('success', 'Thanks for your interest!');
      } else {
        showToast('error', 'Not added.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTokenAgoPrice = () => {
    const func = async () => {
      try {
        let response;
        let _price;
        response = await axios.get(
          `https://api.mm.finance/api/tokens/0x383627CaeC2CE3b36793c34B576B2e97BEDA0466`
        );
        console.log(response.data.data.price);
        _price = parseFloat(response.data.data.price);
        console.log(_price);
        setTokenAgoPrice(_price);
      } catch {
        setTokenAgoPrice(null);
      }
    };
    func();
  };

  const getBalance = async (overrideLoading = false) => {
    if (!overrideLoading) {
      setLoading(true);
    }

    // await library.enable();
    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    let agoBalance = await getAGOBalance(account);
    let userShares = await getUserShares(account);
    let tradingRewards = await getUserTradingRewards(
      account,
      JsonData.claims[account.toLowerCase()]
    );
    console.log(account);
    console.log('TR', tradingRewards);

    setBalance(parseFloat(agoBalance.toString()) / 10 ** 18);
    setStakedBalance(parseFloat(userShares.toString()) / 10 ** 18);
    setUserTradingRewards(parseFloat(tradingRewards[1].toString()) / 10 ** 18);

    if (!overrideLoading) {
      setLoading(false);
    }

    return parseFloat(agoBalance.toString()) / 10 ** 18;
  };

  const pollBalanceChange = async initialAgoBal => {
    setLoading(true);
    let timeout;
    let updated = false;

    await new Promise(
      resolve =>
        (timeout = setTimeout(
          () =>
            getBalance(true).then(agoBal => {
              if (agoBal !== initialAgoBal) {
                updated = true;
              }
              resolve();
            }),
          200
        ))
    );

    if (!updated) {
      await pollBalanceChange(initialAgoBal);
    }

    clearTimeout(timeout);
    return setLoading(false);
  };

  const getRewards = async (overrideLoading = false) => {
    if (!overrideLoading) {
      setLoadingRewards(true);
    }

    // await library.enable();
    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    let agoBalance = await getPendingRewards(account);

    setAGORewards(parseFloat(agoBalance.toString()) / 10 ** 18);

    if (!overrideLoading) {
      setLoadingRewards(false);
    }

    return parseFloat(agoBalance.toString()) / 10 ** 18;
  };

  const totalstaked = async () => {
    let stk = await getTotalAgoStaked();
    // console.log(parseFloat(stk.toString()) / 10 ** 36);
    setValueAPR(parseFloat(stk.toString()) / 10 ** 36);
  };

  useEffect(() => {
    totalstaked();
    if (!chainId) return;

    const _intervalId = setInterval(() => getBalance(), 20000);

    getBalance();
    getRewards();
    return () => clearInterval(_intervalId);
  }, [chainId]);

  const handleStakeAGO = async () => {
    if (staking || loading) return;

    setStaking(true);
    try {
      const price = ethers.utils.parseEther(amount);

      const erc20 = await getAgoTokenContract();

      const allowance = await erc20.allowance(account, agoStakeAddress);
      if (allowance.lt(price)) {
        const tx = await erc20.approve(agoStakeAddress, price);
        await tx.wait();
      }

      const tx = await stakeAGO(price, account);
      await tx.wait();
      await pollBalanceChange(balance);
      const toastId = showToast(
        'success',
        'AGO Successfully staked!',
        '',
        () => {
          toast.dismiss(toastId);
          window.open(`${explorerUrl}/tx/${tx.hash}`, '_blank');
        }
      );

      setAmount('');
    } catch (err) {
      showToast('error', formatError(err));
      console.log(err);
    } finally {
      setStaking(false);
    }
    getBalance();
  };

  const handleHarvestTradingRewards = () => {
    const claim = JsonData.claims[account.toLowerCase()];
    if (claim) {
      harvestTradingRewards(claim);
    } else {
      showToast('error', 'you are not elegible to claim trading rewards');
    }
  };

  const harvestTradingRewards = async _claim => {
    if (claimingTradingRewards) return;
    setClaimingTradingRewards(true);
    try {
      const tx = await claimTradingRewards(
        account,
        _claim.amount,
        _claim.proof
      );
      await tx.wait();
      await pollBalanceChange(balance);
      const toastId = showToast(
        'success',
        'AGO Successfully claimed!',
        '',
        () => {
          toast.dismiss(toastId);
          window.open(`${explorerUrl}/tx/${tx.hash}`, '_blank');
        }
      );
    } catch (err) {
      showToast('error', formatError(err));
    } finally {
      setClaimingTradingRewards(false);
    }
  };

  const handleHarvest = async () => {
    if (claiming || loading) return;

    setClaiming(true);
    try {
      const tx = await harvest(account);
      await tx.wait();
      await pollBalanceChange(balance);
      const toastId = showToast(
        'success',
        'AGO Successfully harvested!',
        '',
        () => {
          toast.dismiss(toastId);
          window.open(`${explorerUrl}/tx/${tx.hash}`, '_blank');
        }
      );

      setAmount('');
    } catch (err) {
      showToast('error', formatError(err));
      console.log(err);
    } finally {
      setClaiming(false);
    }
    getBalance();
  };

  const handleUnstakeAGO = async () => {
    if (staking || loading) return;

    setStaking(true);
    try {
      const price = ethers.utils.parseEther(amount);

      const tx = await unstakeAGO(price, account);
      await tx.wait();
      await pollBalanceChange(balance);
      const toastId = showToast(
        'success',
        'AGO Successfully unstaked!',
        '',
        () => {
          toast.dismiss(toastId);
          window.open(`${explorerUrl}/tx/${tx.hash}`, '_blank');
        }
      );

      setAmount('');
    } catch (err) {
      showToast('error', formatError(err));
      console.log(err);
    } finally {
      setStaking(false);
    }
    getBalance();
  };

  return (
    <div className={styles.container}>
      <Header border />
      <div className={styles.body}>
        <div className={styles.leftItem}>
          <div className={styles.title}>Stake AGO earn up to</div>
          <div className={styles.apr}>
            <div className={styles.aprBis}>
              {Math.round(
                (32074576271.2 * TokenAgoPrice * 0.65 +
                  globalStats?.dailyVolume * 365 * 0.025) /
                  Math.round(valueAPR)
              )}
              %
            </div>
            {Math.round(
              (32074576271.2 * TokenAgoPrice * 0.65) / Math.round(valueAPR)
            ) +
              Math.round(
                (globalStats?.dailyVolume * 365 * 2.5) /
                  (valueAPR * TokenAgoPrice)
              )}
            % APR
          </div>
          <div className={styles.aprdetails}>
            {Math.round(
              (32074576271.2 * TokenAgoPrice * 0.65) / Math.round(valueAPR)
            )}
            % APRs in $AGO <p></p>
            {Math.round(
              (globalStats?.dailyVolume * 365 * 2.5) /
                (valueAPR * TokenAgoPrice)
            )}
            % APRs in $WCRO
          </div>
          <div className={styles.buttonsWrapper}>
            <a
              href="https://mm.finance/swap?outputCurrency=0x383627CaeC2CE3b36793c34B576B2e97BEDA0466"
              style={{ textDecoration: 'none' }}
            >
              <div className={styles.exploreButtonBis}>Buy AGO</div>{' '}
            </a>
            <div className={styles.exploreButton} onClick={addToWallet}>
              Add to wallet
            </div>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <img
            src={ago3D}
            width={'80%'}
            data-aos="fade-up"
            data-aos-duration="3000"
            style={{ margin: 'auto' }}
          />
        </div>
      </div>
      <div className={styles.stakingWrapper}>
        <div className={styles.titleWrapper}>
          <img
            className={styles.imageStaking}
            src={logoRound}
            style={{ filter: 'invert(var(--color-logo))' }}
          />
          <div className={styles.titleStaking}>AGO Staking</div>
        </div>
        <div className={styles.desc}>
          Stake <span style={{ color: 'rgba(255, 107, 199, 1)' }}>AGO</span>{' '}
          earn{' '}
          <span style={{ color: 'rgba(255, 107, 199, 1) ' }}>WCRO and AGO</span>
        </div>
        <div className={styles.stakeContainer}>
          <Tabs
            value={value}
            indicatorColor="rgba(255, 107, 199, 1)"
            onChange={handleChange}
          >
            <Tab label="Stake" />
            <Tab label="Unstake" />
          </Tabs>
          <SwipeableViews
            axis={'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={'x'}>
              <div className={styles.swapBoxInner}>
                <div className={styles.balance}>
                  Balance:{' '}
                  {loading ? (
                    <Skeleton
                      width={60}
                      height={20}
                      style={{ background: 'var(--color-skel)' }}
                    />
                  ) : (
                    parseBalance(balance)
                  )}
                  {!isMax() && !loading && balance > 0 && (
                    <div className={styles.max} onClick={onMax}>
                      (Max)
                    </div>
                  )}
                </div>
                <div className={styles.rightBox}>
                  <PriceInput
                    className={styles.input}
                    placeholder="0.0"
                    decimals={18}
                    value={'' + amount}
                    onChange={setAmount}
                    onInputError={setInputError}
                  />
                  {/* <div className={styles.usdVal}>
                    AGO {formatNumber((parseFloat(amount) || 0).toFixed(2))}
                  </div> */}
                  <InputError text={inputError} />
                </div>
              </div>
              <div
                className={styles.exploreButton}
                style={{ marginRight: 'auto', marginLeft: 'auto' }}
                onClick={() =>
                  amount.length &&
                  parseFloat(amount) > 0 &&
                  parseFloat(amount) <= balance &&
                  handleStakeAGO()
                }
              >
                {staking || loading ? (
                  <ClipLoader color="#FFF" size={16} />
                ) : (
                  'Stake'
                )}
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={'x'}>
              {/* <div className={styles.swapBoxInner}>
                <div className={styles.balance}>
                  Staked:{' '}
                  {loading ? (
                    <Skeleton
                      width={60}
                      height={20}
                      style={{ background: 'var(--color-skel)' }}
                    />
                  ) : (
                    parseBalance(stakedBalance)
                  )}
                  {!isMax() && !loading && stakedBalance > 0 && (
                    <div className={styles.max} onClick={onMax}>
                      (Max)
                    </div>
                  )}
                </div>
                <div className={styles.rightBox}>
                  <PriceInput
                    className={styles.input}
                    placeholder="0.0"
                    decimals={18}
                    value={'' + amount}
                    onChange={setAmount}
                    onInputError={setInputError}
                  />
                </div>
              </div> */}
              <div
                className={styles.exploreButton}
                style={{ marginRight: 'auto', marginLeft: 'auto' }}
                onClick={() =>
                  // amount.length &&
                  // parseFloat(amount) > 0 &&
                  // parseFloat(amount) <= stakedBalance &&
                  handleUnstakeAGO()
                }
              >
                {staking || loading ? (
                  <ClipLoader color="#FFF" size={16} />
                ) : (
                  'Unstake'
                )}
              </div>
            </TabPanel>
          </SwipeableViews>
          <div className={styles.stake}>
            Your Stake:{' '}
            {loading ? (
              <Skeleton
                width={60}
                height={20}
                style={{ background: 'var(--color-skel)' }}
              />
            ) : (
              parseBalance(stakedBalance)
            )}{' '}
            AGO{' '}
            <BootstrapTooltip
              title="Your AGO rewards are auto-compounded to your staked amount."
              placement="top"
            >
              <HelpOutlineIcon />
            </BootstrapTooltip>
          </div>
        </div>
        <div className={styles.stakeContainer}>
          <div className={styles.rewWrap}>
            <img
              src={cro}
              style={{ width: '20px', height: '20px', margin: 'auto' }}
            />
            <div className={styles.stake}>
              WCRO Rewards:{' '}
              {loadingRewards ? (
                <Skeleton
                  width={60}
                  height={20}
                  style={{ background: 'var(--color-skel)' }}
                />
              ) : (
                parseBalance(agoRewards)
              )}
            </div>
          </div>
          {/* <div className={styles.rewWrap}>
            <img
              src={logoRound}
              style={{ width: '20px', height: '20px', margin: 'auto' }}
            />
            <div className={styles.stake}>
              AGO Earned to date:{' '}
              {loadingRewards ? (
                <Skeleton
                  width={60}
                  height={20}
                  style={{ background: 'var(--color-skel)' }}
                />
              ) : (
                parseBalance(agoRewards)
              )}
            </div>
          </div> */}
          <div className={styles.exploreButton} onClick={handleHarvest}>
            {claiming || loading ? (
              <ClipLoader color="#FFF" size={16} />
            ) : (
              'Claim'
            )}
          </div>
        </div>
      </div>
      <div className={styles.stakingWrapper}>
        <div className={styles.titleWrapper}>
          <img
            className={styles.imageStaking}
            src={exchange}
            style={{ filter: 'invert(var(--color-logo))' }}
          />
          <div className={styles.titleStaking}>Trading Rewards</div>
        </div>
        <div className={styles.desc}>
          Earn trading rewards when you buy or sell verified collections on
          Agora. Rewards are calculated and distributed once daily. Trade NFTs
          and get rewarded.
        </div>
        <div className={styles.stakeContainer}>
          <div className={styles.rewWrap}>
            <img
              src={logoRound}
              style={{ width: '20px', height: '20px', margin: 'auto' }}
            />
            <div className={styles.stake}>
              AGO Rewards: {parseBalance(userTradingRewards)}{' '}
            </div>
          </div>
          <div
            className={cx(
              styles.exploreButton,
              parseBalance(userTradingRewards) <= 0.01 && styles.disabled
            )}
            onClick={handleHarvestTradingRewards}
          >
            {claimingTradingRewards ? (
              <ClipLoader color="#FFF" size={16} />
            ) : parseBalance(userTradingRewards) >= 0.01 ? (
              `Claim`
            ) : (
              'Nothing to claim'
            )}
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default staking;
