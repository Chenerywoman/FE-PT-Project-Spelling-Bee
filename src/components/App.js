import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import '../styling/components/App.css';

import {HomePage, YearPage, PartialsPage, PracticePage, NoMatchPage, WordsPage, IndividualPage} from '../pages';

class App extends Component {

  state = {username: ''}

  logUser = (username) => {
      this.setState({username})
  }

  componentDidMount(){
  
      if (localStorage.username) {
      const newUserName = localStorage.getItem('username')       
      this.setState({username: newUserName})
      }
  }

  componentDidUpdate(prevProps, prevState){
      if (prevState.username !== this.state.username) {
          return localStorage.setItem('username', this.state.username)
      }
  }


  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path = '/' render={props => (<HomePage username={this.state.username} logUser={this.logUser}{...props}/>)}/>
          <Route exact path = '/year:year' render={props => (<YearPage username={this.state.username}{...props}/>)}/>
          <Route exact path = '/year:year/prefixes' render={props => (<PartialsPage username={this.state.username} category='Prefixes' {...props}/>)}/>
          <Route exact path = '/year:year/prefixes/:letters' render={props => (<IndividualPage username={this.state.username} category='Prefixes'{...props}/>)}/>
          <Route exact path = '/year:year/prefixes/:letters/practice' render={props => (<PracticePage username={this.state.username} category='Prefixes'{...props}/>)}/>
          <Route exact path = '/year:year/suffixes' render={props => (<PartialsPage username={this.state.username} category='Suffixes' {...props}/>)}/>
          <Route exact path = '/year:year/suffixes/:letters' render={props => (<IndividualPage username={this.state.username} category='Suffixes'{...props}/>)}/>
          <Route exact path = '/year:year/suffixes/:letters/practice' render={props => (<PracticePage username={this.state.username} category='Suffixes'{...props}/>)}/>
          <Route exact path = '/year:year/medials' render={props => (<PartialsPage username={this.state.username} category='Medials'{...props}/>)}/>
          <Route exact path = '/year:year/medials/:letters' render={props => (<IndividualPage username={this.state.username} category='Medials' {...props}/>)}/>
          <Route exact path = '/year:year/medials/:letters/practice' render={props => (<PracticePage username={this.state.username} category='Medials' {...props}/>)}/>
          <Route exact path = '/year:year/homophones' render={props => (<WordsPage username={this.state.username} category='Homophones'{...props}/>)}/>
          <Route exact path = '/year:year/freestyle' render={props => (<WordsPage username={this.state.username} category='Freestyle' {...props}/>)}/>
          <Route exact path = '/year:year/words' render={props => (<WordsPage username={this.state.username} category='Words' {...props}/>)}/>  
          <Route component={NoMatchPage}/>
      </Switch>
      </React.Fragment>
      </BrowserRouter>  
    )
  }
}

export default App;
