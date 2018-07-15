import React, { Component } from 'react';
import { BeeLogoLarge } from '../logos';
import { ContentBox, List } from '../components';
import {findYears} from '../dataFunctions/api'
import '../styling/pages/HomePage.css';

class HomePage extends Component {

  state = {
    years: [],
    loading: true
  }

  componentDidMount () {
    return findYears()
    .then(({years}) => {
      this.setState({years, loading: false})
    })
    .catch(error => {
      this.props.history.push('/404');
    });
  }

  render() {
    return (
      <React.Fragment>
      <header><h1>Welcome to Spelling Bee!</h1></header>
      <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
   {
      this.state.loading ?   <p> Loading...</p>
    :
    <React.Fragment>
    <ContentBox/>
    <List items={this.state.years} page='home'/>
    </React.Fragment>
   }
   </React.Fragment>
      )

  }

}


export default HomePage;