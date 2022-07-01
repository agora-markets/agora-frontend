import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from '../styles.module.scss';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
const TransactionModal = () => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
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
    <div className={styles.modal}>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <button type="button" onClick={handleOpen2}>
        react-transition-group
      </button>
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
            <i id={styles.successIcon} className = "ri-checkbox-circle-line"></i>
            <h3 id={styles.modalHeading}>Transaction Successful</h3>
            <a className="text-muted" href="/">View Transaction <i className="ri-external-link-line"></i> </a>
            <div className={styles.btnContainer}>
                <button className={styles.stakeBtn}>Go To Staking</button>
                <button className={styles.dismissBtn}>Dismiss</button>
            </div>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      className={styles.modal}
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open2}>
          <div className={styles.modalContent}>
            <i id={styles.successIcon} className = "ri-checkbox-circle-line"></i>
            <h3 id={styles.modalHeading}>Transaction Successful</h3>
          </div>
        </Fade>
      </Modal>

      
    </div>
  );
};

export default TransactionModal;
