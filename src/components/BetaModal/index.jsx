import React, { useState } from 'react';

import Modal from '../Modal';
import styles from './styles.module.scss';
import { FaTelegram } from 'react-icons/fa';
import { withStyles } from '@material-ui/styles';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import cx from 'classnames';

const BetaModal = ({ visible, onClose }) => {
  const [notShowAgain, setNotShowAgain] = useState(false);

  const CustomCheckbox = withStyles({
    root: {
      '&$checked': {
        color: '#6dbafc',
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

  return (
    <Modal
      visible={visible}
      onClose={() => onClose(notShowAgain)}
      title="Agora Beta"
    >
      <div>
        <p>Please note that Agora is still in Beta.</p>
        <div className={styles.socialwrapper}>
          If you have any issue let us know on our Telegram{' '}
          <a
            href="https://t.me/AgoraMarketNFT"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'black' }}
          >
            <div className={styles.socialbutton}>
              <FaTelegram />
            </div>
          </a>
        </div>
        <FormControlLabel
          className={cx(styles.formControl, styles.selected)}
          classes={{ label: styles.groupTitle }}
          control={
            <CustomCheckbox
              checked={notShowAgain}
              onChange={() => setNotShowAgain(prevState => !prevState)}
            />
          }
          label="I don't want to see this again."
        />
      </div>
    </Modal>
  );
};

export default BetaModal;
