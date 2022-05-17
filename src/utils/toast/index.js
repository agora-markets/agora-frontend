import React from 'react';
import toast from 'react-hot-toast';

import iconInfo from 'assets/svgs/info.svg';
import iconSuccess from 'assets/svgs/success.svg';
import iconError from 'assets/svgs/error.svg';
import iconWarning from 'assets/svgs/warning.svg';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const icons = {
  info: iconInfo,
  success: iconSuccess,
  error: iconError,
  warning: iconWarning,
};

export default (type, title, body = '', onClick = () => {}) => {
  return toast(
    (t) => (
      <div className={styles.toastInner} onClick={onClick}>
        <div className={styles.close} onClick={() => toast.dismiss(t.id)}>
          <FontAwesomeIcon icon={faTimes}/>
        </div>
        <div className={styles.header}>
          <img src={icons[type]} alt={type} className={styles.icon} />
          <span>{title}</span>
        </div>
        {body.length > 0 && <div className={styles.body}>{body}</div>}
      </div>
    ),
    {
      duration: 30000,
      className: styles.toast,
    }
  );
};
