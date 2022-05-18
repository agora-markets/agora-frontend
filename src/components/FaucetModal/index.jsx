import React, { useEffect, useState } from 'react';

import 'react-datetime/css/react-datetime.css';
import { ClipLoader } from 'react-spinners';

import useTokens from 'hooks/useTokens';
import ReCAPTCHA from 'react-google-recaptcha';
import showToast from 'utils/toast';
import { RaroinModal as Modal } from '../Modal/RaroinModal';
import axios from 'axios';
import WWAN_IMAGE from 'assets/imgs/wan.png';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

const FaucetModal = ({ account, visible, onClose, setFaucetModalVisible }) => {
  const { tokens } = useTokens();

  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [claiming, setClaiming] = useState(false);
  const [faucetBalance, setFaucetBalance] = useState(0);
  const {connector} = useWeb3React();
  
  useEffect(() => {}, [tokens]);

  const getBalance = async () => {

    const web3provider = await connector.getProvider();
    await web3provider.enable();
    let provider = new ethers.providers.Web3Provider(web3provider);
    let [wan] = await Promise.all([
      await provider.getBalance('0xEdf527D13B4Bc7E5C7da0f57474945a54C79444A'),
    ]);

    setFaucetBalance(parseFloat(wan.toString()) / 10 ** 18);
  }

  useEffect(() => {

    if (visible)
    {
      getBalance();
    }

    setRecaptchaValue(null);
    setClaiming(false);
  }, [visible]);

  function onRecaptchaSuccess(value) {
    console.log('Captcha value:', value);
    setRecaptchaValue(value);
  }

  function onRecaptchaError() {
    console.log('Failed captcha');
    setRecaptchaValue(null);
  }

  const handleMakeOffer = async () => {
    console.log('do something...');
    setClaiming(true);

    try {
      const { data } = await axios.get(
        `https://open-zoo-faucet.vercel.app/api/faucet?token=${recaptchaValue}&address=${account}`
      );
      if (data.success == true) {
        setFaucetModalVisible(false);
        showToast('success', '0.02 WAN transferred to your address!');
      } else {
        setClaiming(false);
        setRecaptchaValue(null);
        showToast('error', 'Please try again');
      }
    } catch (error) {
      setClaiming(false);
      setRecaptchaValue(null);
      showToast('error', 'Please try again');
    }
  };

  return (
    <Modal
      visible={visible}
      title="FIRST TIME WITH US?"
      onClose={onClose}
      submitDisabled={claiming || !recaptchaValue}
      submitLabel={claiming ? <ClipLoader color="#FFF" size={16} /> : 'CLAIM'}
      onSubmit={() => (!claiming && recaptchaValue ? handleMakeOffer() : null)}
    >
      <p className="faucetP">
        <span className="color_brand">CLAIM YOUR FREE WAN</span>
        <br />
        to begin your creative journey
        <br />
        with OpenZoo
      </p>

      <div className="faucetBalance">
        <div className="faucetBalanceTitle">
          Faucet
          <br />
          Balance
        </div>
        <div className="faucentBalanceAmount">
          <div className="faucentBalanceAmountIcon"><img
              className="wanImage"
              src={WWAN_IMAGE}
              alt=""
            />{faucetBalance}</div>
          <span>0.02 WAN per address</span>
        </div>
      </div>
      {!claiming && (
        <center>
        <ReCAPTCHA
          sitekey="6Le8yuUdAAAAAJfotzhCSA7_iT7-RAOPrkAz3dZv"
          onChange={onRecaptchaSuccess}
          onErrored={onRecaptchaError}
          size="normal"
        />
        </center>
      )}
    </Modal>
  );
};

export default FaucetModal;
