import React from 'react';
import Link from 'react-router-dom';
import {BeeLogo100px, BeeLogo250px, BeeLogo500px, BeeLogoLarge, BeeLogoLargeBordered} from '../logos';
import '../styling/pages/PracticePage.css'

const PracticePage = props => {
    return (
      <React.Fragment>
    <h1>Welcome to Practice Page</h1>
        <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
   </React.Fragment>
    );

}

export default PracticePage;