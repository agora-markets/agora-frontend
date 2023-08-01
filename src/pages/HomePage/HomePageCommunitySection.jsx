import React from 'react';

import TotalSales from 'assets/imgs/icons/total_sales.png';
import TotalVolume from 'assets/imgs/icons/total_volume.png';
import styles from './styles.module.scss';

export function HomePageCommunitySection({ globalStats }) {
  return (
    <div className="container">
      <div className="community">
        <div className="section__head space-y-20">
          <h3 className="section__title text-center">Global Stats</h3>
          <p className="section__text text-center">
            {/* Learn more about Pixelly, chat with the team, other people in the
            community, and express your opinion on the future development of
            Pixelly. */}
          </p>
        </div>

    <div className="community__items">
      <div className="row justify-content-center mb-20_reset">
      <div className="col-md-3">
        <div className="item space-y-10">
          <div className="logo">
          <img src={TotalVolume} alt="logo_community" className={styles.stats_logo} />
        </div>
        <div className={styles.stats}>
          $ {Math.round(globalStats?.dailyVolume) || 0}
        </div>
        <div className="text-center">
          Daily Volume
        </div>
      </div>
      </div>
      <div className="col-md-3">
        <div className="item space-y-10">
          <div className="logo">
          <img src={TotalSales} alt="logo_community" className={styles.stats_logo} />
        </div>
        <div>
          <div className={styles.stats}>
            {Math.round(globalStats?.dailySales) || 0}
          </div>
        </div>
        <div className="text-center">
          Daily Sales
        </div>
      </div>
      </div>
        <div className="col-md-3">
          <div className="item space-y-10">
            <div className="logo">
            <img src={TotalVolume} alt="logo_community" className={styles.stats_logo} />
        </div>
        <div className={styles.stats}>
          $ {Math.round(globalStats?.totalVolume) || 0}
        </div>
        <div className="text-center">
          Total Volume
        </div>
      </div>
      </div>
      <div className="col-md-3">
        <div className="item space-y-10">
          <div className="logo is_twitter">
          <img src={TotalSales} alt="logo_community" className={styles.stats_logo} />
        </div>
        <div className={styles.stats}>
          {Math.round(globalStats?.totalSales) || 0}
        </div>
        <div className="text-center">
          Total Sales
        </div>
      </div>
      </div>
    </div>
    </div>


      </div>
    </div>
  );
}
