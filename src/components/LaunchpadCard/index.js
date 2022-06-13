import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import LaunchpadCountdown from './LaunchpadCountdown';
import styles from './styles.module.scss';

const LaunchCard = ({ dark, soldOut, upcoming }) => {
  let launchDate = "06/16/2022"
  // const diff = launchDate - new Date().getTime();
  const [sale, setSale] = useState(false)
  return (
    <div className={dark ? styles.cardContainerDark : styles.cardContainer}>
      <Link to ="/launchpad/collection">
      <div className={styles.cardImg}>
        <img src="/01.jpg" alt="" />
      </div>
      <div className={styles.cardDesc}>
        <div className={styles.cardHeading}>
          <h3 className={styles.cardTitle}>share the love</h3>
          {
              sale ? (
                <div className={styles.cardStatus}>
                <span>Live</span>
              </div>
              ): ''
          }
        </div>
        <div className={styles.cardContent}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam iusto
          fugit alias dolorem odit qui!
        </div>
      </div>
      {
        (upcoming && !sale) ? (
          <div className="countdown-timer">
            <LaunchpadCountdown date={launchDate} setSale={setSale}/>
          </div>
        ): ''
      }
      <div >
        {soldOut ? (
          <div className={styles.soldoutBtn}>
            <button disabled="disabled">Sold Out</button>
          </div>
        ) : (
          <div className={dark ? styles.cardBtnsDark : styles.cardBtns}>
            <div className="supply">
              <label>Items:</label>
              <span> 300,000</span>
            </div>
            <div className={styles.price}>
              <label>Price:</label>
              <span> 65 CRO</span>
            </div>
          </div>
        )}
      </div>
      </Link>
    </div>
  );
};

export default LaunchCard;
