import React, {/*useState*/} from 'react';
import { Link } from 'react-router-dom';
import LaunchpadCountdown from './LaunchpadCountdown';
import styles from './styles.module.scss';


const UpcomingCard = ({ dark, upcoming }) => {
  
  // const [sale, setSale] = useState(false)
  return (
    <div className={dark ? styles.cardContainerDark : styles.cardContainer}>
      <Link to ={`/launchpad/upcoming/${upcoming.contractAddress}`}>
      <div className={styles.cardImg}>
        <img src={upcoming.image} alt="" />
      </div>
      <div className={styles.cardDesc}>
        <div className={styles.cardHeading}>
          <h3 className={styles.cardTitle}>{upcoming.title}</h3>
              <div className={styles.cardStatus}>
                <span>Upcoming</span>
              </div>
        </div>
        <div className={styles.cardContent}>
          {upcoming.description}</div>
      </div>
          <div className="countdown-timer">
            <LaunchpadCountdown date={upcoming.launchDate} />
          </div>
      <div >
          <div className={dark ? styles.cardBtnsDark : styles.cardBtns}>
            <div className="supply">
              <label>Items:</label>
              <span>{upcoming.maxSupply}</span>
            </div>
            <div className={styles.price}>
              <label>Price:</label>
              <span>{upcoming.price} CRO</span>
            </div>
          </div>
      </div>
      </Link>
    </div>
  );
};

export default UpcomingCard;
