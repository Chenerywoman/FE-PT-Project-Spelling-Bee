import React, { Component } from 'react';
import { BeeLogo100pxtoresize, BeeLogo250px } from '../logos';
import { ContentBox, List } from '../components';
import { findYears } from '../dataFunctions/api'
import '../styling/pages/HomePage.css';
import PropTypes from 'prop-types';

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
    this.setState({value: '', userlogged: true})
  }

  handleLoginChange = event => {
    event.preventDefault();
    this.setState({userlogged: false})
  }

  componentDidMount() {
    return findYears()
      .then(({ years }) => {
        this.setState({ years, loading: false })
        if (localStorage.username) {
          this.setState({ userlogged: true })
        }
      })
      .catch(error => {
        this.props.history.push('/404');
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username) {
      this.setState({ userlogged: true })
    }

  }

  render() {
    return (
     <div id='homepage_container'>
          <h1>Welcome to Spelling Bee</h1>
        <img src={BeeLogo250px} id="BeeLogo250px" className="bee-logo" alt="BeeLogoLarge" />
        {
          this.state.loading ? <p> Loading...</p>
            :
            <React.Fragment>
            {!this.state.userlogged ? 
            <React.Fragment>
              <form onSubmit={this.handleSubmit} >
                <input id='addName' placeholder='...your name' type="text" value={this.state.value} onChange={this.handleChange} size='12' autocomplete='off'/>
                <span id={BeeLogo100pxtoresize}><input type="image" name="submit" src={BeeLogo100pxtoresize} alt="Submit" disabled={this.state.value.length === 0 ? true: false}/></span>
              </form>
              <p>Please input your name to play Spelling Bee.</p>
              </React.Fragment>
              :
              <React.Fragment>
               <h2 id='greeting' >{`Hi ${this.props.username}!`}</h2> 
              <ContentBox description='Choose your school year:' page='homepage' />
              <List items={this.state.years} page='home' />
              <button id='changeLogin' onClick={this.handleLoginChange} >{`Not ${this.props.username}? Click here to change to your name.`}</button> 
            </React.Fragment>
            }
             </React.Fragment>
        }
    
      </div>
    )

  }

}

HomePage.propTypes = {

  username: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,

}

export default HomePage;