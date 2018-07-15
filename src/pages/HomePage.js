import React, { Component } from 'react';
import Link from 'react-router-dom';
import { BeeLogoLarge } from '../logos';
import { ContentBox, List } from '../components';
import '../styling/pages/HomePage.css';

class HomePage extends Component {

  state = {
    years: [],
    loading: true
  }

  render() {
    return (
      <React.Fragment>
      <header><h1>Welcome to Spelling Bee!</h1></header>
      <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
   {
      this.state.loading ?   <p> Loading...</p>
    :
    <p>page here</p>
   }
   </React.Fragment>
      )

  }

}


export default HomePage;