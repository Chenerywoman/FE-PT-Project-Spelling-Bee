import React, { Component } from 'react';
import { BeeLogo100pxtoresize, BeeLogo250px } from '../logos';
import { ContentBox, List } from '../components';
import {findYears} from '../dataFunctions/api'
import '../styling/pages/HomePage.css';

class HomePage extends Component {

  state = {
    years: [],
    loading: true,
    value: '',
    userlogged: false, 
        username: ''
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
}

handleSubmit = event => {
    event.preventDefault();
    this.props.logUser(this.state.value)
}

  componentDidMount () {
    return findYears()
    .then(({years}) => {
      this.setState({years, loading: false})
      if (localStorage.username) {
        this.setState({ userlogged: true })
  }
    })
    .catch(error => {
      this.props.history.push('/404');
    });
  }

  componentDidUpdate (prevProps) {
    if (this.props.username !== prevProps.username) {
      this.setState({ userlogged: true })
  }

  }

  render() {
    return (
      <React.Fragment>
      <header>
      <h1>Welcome to Spelling Bee!</h1></header>
      <img src={BeeLogo250px} id="BeeLogo250px" className="bee-logo" alt="BeeLogoLarge" />
   {
      this.state.loading ?   <p> Loading...</p>
    :
    <React.Fragment>
       <form onSubmit={this.handleSubmit} id='loginform'>
       <label>
        What is your name? <input id='inputName' type="text" value={this.state.value} onChange={this.handleChange} />
      </label>
      <input id={BeeLogo100pxtoresize} type="image" name="submit" src={BeeLogo100pxtoresize} border="0" alt="Submit" />
       </form>
    <ContentBox description='Choose your school year:' page='homepage' />
    <List items={this.state.years} page='home'/>
    </React.Fragment>
   }
   </React.Fragment>
      )

  }

}


export default HomePage;