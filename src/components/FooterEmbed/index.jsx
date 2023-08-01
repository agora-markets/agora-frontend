import React from 'react';
import logoSmallBlue from 'assets/imgs/CRO.png';
import styles from "./styles.module.scss";

export function FooterEmbed() {
  return (
    <footer className={styles.footerEmbed}>
      <span>Powered by Pixelly</span>
      <img src={logoSmallBlue} alt='logo' style={{ width: "24px", height: "24px" }} />
    </footer>);
}
