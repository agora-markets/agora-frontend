import { Tabs } from '@material-ui/core';
import { Footer } from 'components/Footer';
import Header from 'components/header';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import NFTCollection from './NFTCollection';
import StakeHistory from './StakeHistory';
import NFTVault from './NFTVault';
import styles from './styles.module.scss'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const NFTStaking = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="overflow-hidden">
      <div>
        <Header />
        <div className = "container">
          <div id= {styles.staking}>
            <div className={styles.heading}>
              <h2>NFT Staking</h2>
            </div>
            <AppBar position="static">
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
              >
                <LinkTab label="Collection" href="/drafts" {...a11yProps(0)} />
                <LinkTab label="My Stake" href="/trash" {...a11yProps(1)} />
                <LinkTab label="History" href="/spam" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <NFTCollection />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <NFTVault/>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <StakeHistory />
            </TabPanel>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default NFTStaking;
