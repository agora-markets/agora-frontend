import React, { useState } from 'react';
import Header from 'components/header';
import { Footer } from 'components/Footer';
import styles from './styles.module.scss';
import LaunchCard from 'components/LaunchpadCard';

export function LaunchpadPage() {
  const [dark, setDark] = useState(false);

  return (
    <div className="overflow-hidden">
      <div className={`${styles.container} ${styles.homepage}`}>
        <Header setDark={setDark} />
        <div className={styles.body}>
          <div className={styles.main}>
            <div className={styles.selectPool}>
              <a href="/">Apply to Launchpad</a>
            </div>
            <div className={styles.poolSection}>
              <h2>Ongoing Pools</h2>
              <div className={styles.cardRow}>
                <LaunchCard dark={dark} />
                <LaunchCard dark={dark} />
                <LaunchCard dark={dark} />
              </div>
            </div>
            <div className={styles.poolSection}>
              <h2>Upcoming Pools</h2>
              <div className={styles.cardRow}>
                <LaunchCard dark={dark} soldOut={false} upcoming={true} />
                <LaunchCard dark={dark} soldOut={false} upcoming={true} />
                <LaunchCard dark={dark} soldOut={false} upcoming={true} />
              </div>
            </div>
            <div className={styles.poolSection}>
              <h2>Completed Pools</h2>
              <div className={styles.cardRow}>
                <LaunchCard dark={dark} soldOut={true} />
                <LaunchCard dark={dark} soldOut={true} />
                <LaunchCard dark={dark} soldOut={true} />
              </div>
            </div>
          </div>
        </div>
        <Footer isDark={dark} />
      </div>
    </div>
  );
}
