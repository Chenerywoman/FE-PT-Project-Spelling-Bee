import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import '../styling/components/App.css';

import {HomePage, CategoriesPage, PracticePage, NoMatchPage} from '../pages';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path = '/' render={props => (<HomePage />)}/>
          {/* <Route exact path = '/prefixes' render={props => (<CategoriesPage />)}/>
          <Route exact path = '/prefixes/:prefix' render={props => (<PracticePage />)}/>
          <Route exact path = '/suffixes' render={props => (<CategoriesPage />)}/>
          <Route exact path = '/suffixes/:suffix' render={props => (<PracticePage />)}/>
          <Route exact path = '/medials' render={props => (<CategoriesPage />)}/>
          <Route exact path = '/medials/:medial' render={props => (<PracticePage />)}/>
          <Route exact path = '/homophones' render={props => (<CategoriesPage />)}/>
          <Route exact path = '/homophones/:homophone' render={props => (<PracticePage />)}/>
          <Route exact path = '/freestyle' render={props => (<CategoriesPage />)}/>
          <Route exact path = '/allwords' render={props => (<CategoriesPage />)}/> */}
          <Route component={<NoMatchPage/>}/>
      </Switch>
      </React.Fragment>
      </BrowserRouter>  
    )
  }
}

export default App;
