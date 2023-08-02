/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import logoDark from 'assets/imgs/logos/pixelly.png';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer__1">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 space-y-20">
            <div className="footer__logo">
              <Link to="/" className="d-flex align-items-center space-x-10">
                <img src={logoDark} alt="logo" id="logo_js_f" />
              </Link>
            </div>
            <p className="footer__text">
              Pixelly is Tenet's First NFT Marketplace
            </p>
            <div>
              <ul className="footer__social space-x-10 mb-40">
                <li>
                  <a
                    href="https://twitter.com/pixelly_gg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-twitter-line"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/XybunZQ3Cv "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-discord-line"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/Pixelly_gg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-telegram-line"></i>
                  </a>
                </li>
                <li>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <i className="ri-medium-line"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-6">
            <h6 className="footer__title">Pixelly</h6>
            <ul className="footer__list">
              <li>
                <Link to="/home"> Home </Link>
              </li>
              <li>
                <Link to="/explore">Explore</Link>
              </li>
              <li></li>
            </ul>
          </div>
          <div className="col-lg-2 col-6">
            <h6 className="footer__title">Assets</h6>
            <ul className="footer__list">
              <li>
                <Link to="/"> Profile </Link>
              </li>
              <li>
                <Link to="/"> Creators </Link>
              </li>
              <li>
                <Link to="/"> Collections </Link>
              </li>
              <li></li>
            </ul>
          </div>
          {/* <div className="col-lg-2 col-6">
            <h6 className="footer__title">Company</h6>
            <ul className="footer__list">
              <li>
                <Link to="/"> Upload Types </Link>
              </li>
              <li></li>
              <li></li>
              <li>
                <Link to="/"> Item details </Link>
              </li>
            </ul>
         </div> */}
        </div>
      </div>
    </footer>
  );
}
