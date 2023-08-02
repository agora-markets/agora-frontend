import React from 'react';
import { Link } from 'react-router-dom';

// import LogoImage from 'assets/imgs/coin-removebg2.png';

export function HomePageStartOwnCollectionSection() {
  return (
    <div className="call2action is__light">
      <div className="container">
        <div
          className="row justify-content-between align-items-center
						sm:space-y-20"
        >
          <div className="col-md-6">
            <div className="space-y-20">
              <h1>Create your own collection today</h1>
              <p className="color_text section__text">
                Creating a collection on Pixelly is very easy. No need to know
                how to code, just provide the art and we will turn them to NFTs
                for you.
              </p>
              <Link to="/collection/create" className="btn btn-primary">
                Create Collection
              </Link>
            </div>
          </div>
          {/*<div className="col-md-4 token-logo">
            <img className="img-fluid img__logo" src={LogoImage} alt="..." />
  </div>*/}
        </div>
      </div>
    </div>
  );
}
