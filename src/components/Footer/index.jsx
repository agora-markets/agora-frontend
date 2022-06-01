import React from 'react';

import LogoSmallBlue from 'assets/imgs/logoRound.png';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer__1">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 space-y-20">
            <div className="footer__logo">
              <Link to="/" className="d-flex align-items-center space-x-10">
                <img src={LogoSmallBlue} alt="logo" id="logo_js_f" />
                <p className="color_black font-bold">Agora</p>
              </Link>
            </div>
            <p className="footer__text">
              Agora is Cronos No.1 Marketplace
            </p>
            <div>
              <ul className="footer__social space-x-10 mb-40">
                <li>
                  <Link to="/">
                    <i className="ri-facebook-line"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="ri-messenger-line"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="ri-whatsapp-line"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="ri-youtube-line"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-6">
            <h6 className="footer__title">Agora</h6>
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
          <div className="col-lg-2 col-6">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
