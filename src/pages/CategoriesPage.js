import React from 'react';
import Link from 'react-router-dom';
import {BeeLogo100px, BeeLogo250px, BeeLogo500px, BeeLogoLarge, BeeLogoLargeBordered} from '../logos';
import '../styling/pages/CategoriesPage.css'

const CategoriesPage = props => {
    return (
      <React.Fragment>
    <h1>Welcome to Categories Page....</h1>
        <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
   </React.Fragment>
    );

}

export default CategoriesPage;