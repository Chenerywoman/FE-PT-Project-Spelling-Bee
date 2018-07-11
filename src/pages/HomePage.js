import React from 'react';
import Link from 'react-router-dom';
import {BeeLogo100px, BeeLogo250px, BeeLogo500px, BeeLogoLarge, BeeLogoLargeBordered} from '../logos';
import {ContentBox, List} from '../components';
import '../styling/pages/HomePage.css';

const HomePage = props => {
    return (
      <React.Fragment>
        <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
        <div className="wrapper">
        <header className="main-head"><h1>Welcome to Spelling Bee!</h1></header>
        <ContentBox className="content"/>
        <List className="list"/>

        




        </div>
   </React.Fragment>
    );

}

export default HomePage;