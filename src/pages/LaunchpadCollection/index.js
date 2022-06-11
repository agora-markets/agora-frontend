import React, { useState, useEffect } from 'react';
import Header from 'components/header';
import { Footer } from 'components/Footer';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function MintProgress(props) {
  const percent = Math.floor((props.value / props.supply) * 100);
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box width="100%">
        <LinearProgress variant="determinate" value={percent} />
      </Box>
      <Box width="100%">
        <div className="nft-stat">
          <span>Total Minted</span>
          <span>
            {`${percent}%`} ({props.value + '/' + props.supply})
          </span>
        </div>
      </Box>
    </Box>
  );
}

MintProgress.propTypes = {
  value: PropTypes.number.isRequired,
};

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

const LaunchpadCollection = () => {
  const [dark, setDark] = useState(false);
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [progress, setProgress] = useState(10);
  const nftSupply = 1000;
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress =>
        prevProgress <= nftSupply ? prevProgress + 1 : prevProgress
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="overflow-hidden">
      <div className={`${styles.container} ${styles.homepage}`}>
        <Header setDark={setDark} />
        <div className={styles.body}>
          <div className={styles.main}>
            <div className={styles.topSection}>
              <div className={styles.collectionInfo}>
                <h1>Share The Love</h1>
                <div className={styles.linksRow}>
                  <div className="items">
                    <p>
                      Total Items <strong>1000</strong>
                    </p>
                  </div>
                  <div className="price">
                    <p>
                      Price <strong >100 CRO</strong>
                    </p>
                  </div>
                  <div className="webIcons">
                    <a
                      href="https://discord.gg/XybunZQ3Cv "
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ri-discord-line"></i>
                    </a>
                    <a
                      href="https://twitter.com/AgoramarketNFT?t=apGMF4wizF_pCw-R0IQ04g&s=09"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ri-twitter-line"></i>
                    </a>
                    <a
                      href="https://twitter.com/AgoramarketNFT?t=apGMF4wizF_pCw-R0IQ04g&s=09"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ri-global-line"></i>
                    </a>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit esse consequatur deserunt blanditiis, reiciendis sit
                  ullam dolorem quas, nemo reprehenderit eaque exercitationem a
                  fuga dolorum officia quis architecto nam odit!
                </p>
                <div className={dark ? `${styles.collectionbtn} btn btn-primary`: `${styles.collectionbtnLight} btn btn-primary`}>
                  <Link to="/">Go To Collection</Link>
                </div>
              </div>
              <div className={styles.collectionImgContainer}>
                <div className={styles.collectionImg}>
                  <img src="/01.jpg" alt="" />
                </div>
                <div className={styles.progressRow}>
                  <MintProgress supply={nftSupply} value={progress} />
                </div>
              </div>
            </div>
            <hr />
            <div className={styles.bottomSection}>
              <div className={styles.description}>
                <h1>Share The Love</h1>
                <div className={styles.linksRow}>
                  <div className="d-flex align-items-center">
                    Discord{' '}
                    <a
                      href="https://discord.gg/XybunZQ3Cv "
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ri-discord-line"></i>
                    </a>
                  </div>
                  <div className="d-flex align-items-center">
                    Twitter
                    <a
                      href="https://twitter.com/AgoramarketNFT?t=apGMF4wizF_pCw-R0IQ04g&s=09"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ri-twitter-line"></i>
                    </a>
                  </div>
                  <div className="d-flex align-items-center">
                    Website
                    <a
                      href="https://twitter.com/AgoramarketNFT?t=apGMF4wizF_pCw-R0IQ04g&s=09"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ri-global-line"></i>
                    </a>
                  </div>
                  <div className="d-flex align-items-center">
                    Contract
                    <a
                      href="https://twitter.com/AgoramarketNFT?t=apGMF4wizF_pCw-R0IQ04g&s=09"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ri-newspaper-line"></i>
                    </a>
                  </div>
                </div>
                <div className="project-description">
                  <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Omnis, dicta ipsam labore aliquam totam temporibus fuga
                  doloremque obcaecati. Possimus ad cumque mollitia minus minima
                  tempora nulla ab enim? Saepe, animi. Lorem ipsum dolor sit,
                  amet consectetur adipisicing elit. Omnis, dicta ipsam labore
                  aliquam totam temporibus fuga doloremque obcaecati. Possimus
                  ad cumque mollitia minus minima tempora nulla ab enim? Saepe,
                  animi.Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Omnis, dicta ipsam labore aliquam totam temporibus fuga
                  doloremque obcaecati. Possimus ad cumque mollitia minus minima
                  tempora nulla ab enim? Saepe, animi.Lorem ipsum dolor sit,
                  amet consectetur adipisicing elit. Omnis, dicta ipsam labore
                  aliquam totam temporibus fuga doloremque obcaecati. Possimus
                  ad cumque mollitia minus minima tempora nulla ab enim? Saepe,
                  animi.
                  </p>
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
                    <Tab
                      value="two"
                      label="Team"
                      wrapped
                      {...a11yProps('two')}
                    />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index="one">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Omnis, dicta ipsam labore aliquam totam temporibus fuga
                  doloremque obcaecati. Possimus ad cumque mollitia minus minima
                  tempora nulla ab enim? Saepe, animi. Lorem ipsum dolor sit,
                  amet consectetur adipisicing elit. Omnis, dicta ipsam labore
                  aliquam totam temporibus fuga doloremque obcaecati. Possimus
                  ad cumque mollitia minus minima tempora nulla ab enim? Saepe,
                  animi.Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Omnis, dicta ipsam labore aliquam totam temporibus fuga
                  doloremque obcaecati. Possimus ad cumque mollitia minus minima
                  tempora nulla ab enim? Saepe, animi.Lorem ipsum dolor sit,
                  amet consectetur adipisicing elit. Omnis, dicta ipsam labore
                  aliquam totam temporibus fuga doloremque obcaecati. Possimus a
                </TabPanel>
                <TabPanel value={value} index="two">
                  <ul>
                    <li>
                      <div>
                        <h3 className="text-primary">Joe Knuckles</h3>
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Omnis, dicta ipsam labore aliquam totam
                          temporibus fuga
                        </p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h3 className="text-primary">Joe Knuckles</h3>
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Omnis, dicta ipsam labore aliquam totam
                          temporibus fuga
                        </p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h3 className="text-primary">Joe Knuckles</h3>
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Omnis, dicta ipsam labore aliquam totam
                          temporibus fuga
                        </p>
                      </div>
                    </li>
                  </ul>
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
        <Footer isDark={dark} />{' '}
      </div>
    </div>
  );
};

export default LaunchpadCollection;
