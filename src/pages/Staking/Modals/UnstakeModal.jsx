import React from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from '../styles.module.scss';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
const UnstakeModal = () => {
  const [open, setOpen] = React.useState(true);

//   const handleOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen(false);
  };
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={styles.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={styles.modalContent}>
            <div className={styles.modalHead}>
              <h3 id={styles.modalHeading}>Unstake Horror Squad</h3>
              <span>Unstaking your position will return HORROR SQUAD (1).</span>
            </div>

            <span className={styles.amount}>
              Amount available to unstake: 0.546734 AGO
            </span>

            <div className={styles.warnContainer}>
              <div className={styles.warn}>
                <i className="ri-error-warning-line"></i>
                <span>Unstaking any NFT will claim all rewards.</span>
              </div>
              <FormControl variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={values.weight}
                  onChange={handleChange('weight')}
                  endAdornment={
                    <InputAdornment position="end">MAX</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id="outlined-weight-helper-text">
                  NFTs to withdraw (max: 4)
                </FormHelperText>
              </FormControl>
            </div>
            <div className={styles.btnContainer}>
              <button className={styles.stakeBtn}>Unstake</button>
              <button className={styles.dismissBtn}>Cancel</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default UnstakeModal;
