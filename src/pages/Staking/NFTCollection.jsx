import React from 'react';
import styles from './styles.module.scss'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import NFTStakeCard from './NFTStakeCard';
import TransactionModal from './Modals/TransactionModal';
// import StakingSidebar from 'components/StakingSidebar';

const NFTCollection = () => {
  const [state, setState] = React.useState(true);

  const handleChange2 = () => {
    setState(!state);
  };
  return (
    <div id={styles.collection}>
      <div className={styles.tabHeading}>
        <h3>13 Items</h3>
        <div className={styles.tabHeadingCheckbox}>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state}
                  onChange={handleChange2}
                  name="checkedB"
                  color="primary"
                />
              }
              label={`Select all (0)`}
            />
          </div>
          <div>
            <i className="ri-layout-grid-fill"></i>
          </div>
        </div>
      </div>
      <div className={styles.tabCards}>
        <NFTStakeCard />
        {/* <StakingSidebar/> */}
        <NFTStakeCard />
        <NFTStakeCard />
        <NFTStakeCard />
        <NFTStakeCard />
        <NFTStakeCard />
        <NFTStakeCard />
        <NFTStakeCard />
        <NFTStakeCard />
        <NFTStakeCard />
        <TransactionModal/>
      </div>
    </div>
  );
};

export default NFTCollection;
