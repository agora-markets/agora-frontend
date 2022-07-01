import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import agoLogo from '../../assets/imgs/logos/logo_8.png';
import PropTypes from 'prop-types';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const StakingSidebar = () => {
  const [dateEnded, setTotalSupply] = useState(new Date().getTime());

  useEffect(() => {
    const updateTotalSupply = async () => {
      setTotalSupply(Number(20));
    };

    setInterval(() => {
      // setNow(new Date());
      updateTotalSupply();
    }, 1000);

    updateTotalSupply();
  }, []);
  const MintProgress = () => {
    const month = 262
    const percent = parseFloat((dateEnded / (dateEnded+month)) * 100).toFixed(2);
    return (
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box width="100%">
          <LinearProgress variant="determinate" value={percent} />
        </Box>
        <Box width="100%">
          <div className="nft-stat">
            <span>Time Left Until Subscription Ends</span>
            <span>{/* {`${percent}%`} ({'2' + '/' + 1000}) */}{dateEnded} {percent}/ 30 Days</span>
          </div>
        </Box>
      </Box>
    );
  };

  MintProgress.propTypes = {
    value: PropTypes.number.isRequired,
  };

  // const list = anchor => (
  //   <div
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <div className="header">
  //       <div>
  //         <h2>Stake NFT</h2>
  //         <span>Stake your NFT. Earn AGO Tokens</span>
  //       </div>
  //     </div>
  //     <div className="NFT-accordion"></div>
  //     <div className="infographic">
  //       <i className="ri-question-fill"></i>
  //       <p>
  //         You are exchanging X Shaggy NFT for X AGO token. This token can earn
  //         yield and is able to claim NFTs.
  //       </p>
  //     </div>
  //     <div className="stats">
  //       <div>
  //         <span>APR</span>
  //         <span>22.23%</span>
  //       </div>
  //       <div>
  //         <span>APR</span>
  //         <span>22.23%</span>
  //       </div>
  //     </div>

  //     <button className="stakeBtn">Stake</button>

  //     <span>
  //       Please ensure you <a href="/">understand the risk</a> before staking
  //     </span>
  //   </div>
  // );
  // const title = 'Horror Story';
  return (
    <div className={styles.sidebar}>
      {/* {sidebar && ( */}
      <React.Fragment>
        <div role="presentation">
          <div className="header">
            <div className={styles.sidebarHeading}>
              <div>
                <h2>Stake NFT</h2>
                <span>Stake your NFT. Earn AGO Tokens</span>
              </div>

              <i  className="ri-close-line"></i>
            </div>
          </div>
          <div className={styles.sidebarContent}>
            <div className={styles.NFTcontainer}>
              <div>
                <h3>Horror Squad(1)</h3>
                <hr />
                <div className={styles.nftId}>
                  <img src="/02.jpg" alt="" />
                  <div>
                    <strong>#2343</strong>
                    <span>Horror Squad(1)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.collectionContainer}>
              <div className={styles.collectionImg}>
                <img src="/02.jpg" alt="" />
              </div>
              <div className={styles.progressRow}>
                <MintProgress supply={1000} />
              </div>
            </div>
            <div className={styles.stats}>
              <div>
                <span>APR</span>
                <span>22.23%</span>
              </div>
              <div>
                <span>Your Stake</span>
                <span>3/23 </span>
              </div>
              <div>
                <span>Total Stake</span>
                <span>23</span>
              </div>
              <div>
                <span>Earned</span>
                <span>
                  <img src={agoLogo} alt="AGO Token Logo" />
                  20
                </span>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <button className={styles.dismissBtn}>Unstake</button>
              <button className={styles.stakeBtn}>Claim Reward</button>
            </div>
          </div>
        </div>
      </React.Fragment>
      {/* )} */}
    </div>
  );
};

export default StakingSidebar;

// <div className={styles.sidebar}>
// <React.Fragment>
//   <div role="presentation">
//     <div className="header">
//       <div className={styles.sidebarHeading}>
//         <div>
//           <h2>Stake NFT</h2>
//           <span>Stake your NFT. Earn AGO Tokens</span>
//         </div>

//         <i className="ri-close-line"></i>
//       </div>
//     </div>
//     <div className={styles.sidebarContent}>
//       <div className={styles.NFTaccordion}>
//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-label="Expand"
//             aria-controls="additional-actions3-content"
//             id="additional-actions3-header"
//           >
//             <label htmlFor="NFT Title">{title}</label>
//           </AccordionSummary>
//           <AccordionDetails>
//             <div className={styles.accordionRow}>
//               <div>
//                 <img src="/02.jpg" alt="" />
//                 #2345
//               </div>
//               <div>
//                 <img src="/02.jpg" alt="" />
//                 #2345
//               </div>
//               <div>
//                 <img src="/02.jpg" alt="" />
//                 #2345
//               </div>
//             </div>
//           </AccordionDetails>
//         </Accordion>
//       </div>
//       <div className={styles.infographic}>
//         <i className="ri-question-line"></i>
//         <p>
//           You are exchanging X Shaggy NFT for X AGO token. This token can
//           earn yield and is able to claim NFTs.
//         </p>
//       </div>
//       <div className={styles.stats}>
//         <div>
//           <span>APR</span>
//           <span>22.23%</span>
//         </div>
//         <div>
//           <span>Total Supply</span>
//           <span>23/23 Points</span>
//         </div>
//       </div>

//       <button className={styles.stakeBtn}>Stake</button>

//       <span className={styles.warningText}>
//         Please ensure you <a href="/">understand the risk</a> before
//         staking
//       </span>
//     </div>
//   </div>
// </React.Fragment>
// </div>
