import React, { Component } from 'react';
import { BeeLogo100pxtoresize, BeeLogo250px } from '../logos';
import { ContentBox, List } from '../components';
import { findYears } from '../dataFunctions/api'
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
              <form onSubmit={this.handleSubmit} id='loginform'>
                <input id='addName' placeholder='...your name' type="text" value={this.state.value} onChange={this.handleChange} size='12'/>
                <span id={BeeLogo100pxtoresize}><input type="image" name="submit" src={BeeLogo100pxtoresize} alt="Submit" /></span>
              </form>
              </React.Fragment>
              :
              <React.Fragment>
               <h2 id='greeting' >{`Hi ${this.props.username}!`}</h2> 
               <button id='changeLogin' onClick={this.handleLoginChange} >change name</button> 
              <ContentBox description='Choose your school year:' page='homepage' />
              <List items={this.state.years} page='home' />
            </React.Fragment>
            }
             </React.Fragment>
        }
    
      </div>
    )

  }

}


export default HomePage;