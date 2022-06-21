import React, { useEffect } from 'react';
import styles from './styles.module.scss';
// import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LaunchpadCountdown from 'components/LaunchpadCard/LaunchpadCountdown';

import { useNFTContract } from 'contracts';
// import { useWeb3React } from '@web3-react/core';
// import showToast from 'utils/toast';
// import { ethers } from 'ethers';
// import { formatError } from 'utils';

const UpcomingDetails = ({ collection }) => {
  const [dark] = useState(false);
  const [value, setValue] = useState('one');

  // const [setMinting] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [mintAmount] = useState(1);
  const [totalSupply, setTotalSupply] = useState(0);
  // const [mintError] = useState(null);
  // const [items, setItems] = useState([]);
  // const [now, setNow] = useState(new Date());

  const { getERC721Contract } = useNFTContract();
  // const { account } = useWeb3React();

  useEffect(() => {
    if (!collection.address) return;
    const updateTotalSupply = async () => {
      const contract = await getERC721Contract(collection.address);
      const _total = await contract.totalSupply();
      setTotalSupply(Number(_total));
    };

    setInterval(() => {
      // setNow(new Date());
      updateTotalSupply();
    }, 1000);

    updateTotalSupply();
  }, [collection.address]);

  {
    /* const handleMint = async () => {
    setMinting(true);

    try {
      const tx = await mintNFT(
        collection.address,
        mintAmount,
        ethers.utils.parseEther((collection.price * mintAmount).toString()),
        account
      );
      await tx.wait();

      setMinting(false);
      showToast('success', 'NFT successfuly minted!');
    } catch (error) {
      console.error(error);
      showToast('error', formatError(error));
      setMinting(false);
    }
  }; */
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
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

  function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
  }

  const MintProgress = () => {
    const percent = Math.round((totalSupply / collection.maxSupply) * 100);
    return (
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box width="100%">
          <LinearProgress variant="determinate" value={percent} />
        </Box>
        <Box width="100%">
          <div className="nft-stat">
            <span>Total Minted</span>
            <span>
              {`${percent}%`} ({totalSupply + '/' + collection.maxSupply})
            </span>
          </div>
        </Box>
      </Box>
    );
  };

  MintProgress.propTypes = {
    value: PropTypes.number.isRequired,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <div className={styles.topSection}>
          <div className={styles.collectionInfo}>
            <h1>{collection.nameCollection}</h1>
            <div className={styles.linksRow}>
              <div className="items">
                <p>
                  Total Items <strong>{collection.maxSupply}</strong>
                </p>
              </div>
              <div className="price">
                <p>
                  Price <strong>{collection.price} CRO</strong>
                </p>
              </div>
              <div className="webIcons">
                <a
                  href={collection.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-discord-line"></i>
                </a>
                <a
                  href={collection.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-twitter-line"></i>
                </a>
                <a
                  href={collection.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-global-line"></i>
                </a>
              </div>
            </div>
            <p>{collection.shortDesc}</p>
            <div
              className={
                dark
                  ? `${styles.collectionbtn} btn btn-primary`
                  : `${styles.collectionbtnLight} btn btn-primary`
              }
            >
              <LaunchpadCountdown date={collection.launchDate} />
            </div>
          </div>
          <div className={styles.collectionImgContainer}>
            <div className={styles.collectionImg}>
              <img src={collection.image} alt="" />
            </div>
            <div className={styles.progressRow}>
              <MintProgress supply={collection.maxSupply} />
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.bottomSection}>
          <div className={styles.description}>
            <h1>{collection.nameCollection}</h1>
            <div className={styles.linksRow}>
              <div className="d-flex align-items-center">
                <a
                  href={collection.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialsLink}
                >
                  {' '}
                  Discord <i className="ri-discord-line"></i>
                </a>
              </div>
              <div className="d-flex align-items-center">
                <a
                  href={collection?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialsLink}
                >
                  Twitter
                  <i className="ri-twitter-line"></i>
                </a>
              </div>
              <div className="d-flex align-items-center">
                <a
                  href={collection.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialsLink}
                >
                  {' '}
                  Website
                  <i className="ri-global-line"></i>
                </a>
              </div>
              <div className="d-flex align-items-center">
                <a
                  href={`https://cronoscan.com/address/${collection.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialsLink}
                >
                  Contract
                  <i className="ri-newspaper-line"></i>
                </a>
              </div>
            </div>
            <div className="project-description">
              <p>{collection.description}</p>
            </div>
          </div>
          <div className={` ${styles.tabs}`}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
              >
                <Tab
                  value="one"
                  label="Roadmap"
                  wrapped
                  {...a11yProps('one')}
                />
                <Tab value="two" label="Team" wrapped {...a11yProps('two')} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index="one">
              {collection.roadmap}
            </TabPanel>
            <TabPanel value={value} index="two">
              <ul>
                <li>
                  <div>
                    <h3 className="text-primary">{collection.teamMember1}</h3>
                    <p>{collection.teamMemberDetails1}</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h3 className="text-primary">{collection.teamMember2}</h3>
                    <p>{collection.teamMemberDetails2}</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h3 className="text-primary">{collection.teamMember3}</h3>
                    <p>{collection.teamMemberDetails3}</p>
                  </div>
                </li>
              </ul>
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDetails;
