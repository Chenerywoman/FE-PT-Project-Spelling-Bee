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
          <Route exact path = '/prefixes' render={props => (<CategoriesPage category='Prefixes'/>)}/>
          <Route exact path = '/prefixes/:prefix' render={props => (<PracticePage category='Prefixes'/>)}/>
          <Route exact path = '/suffixes' render={props => (<CategoriesPage category='Suffixes'/>)}/>
          <Route exact path = '/suffixes/:suffix' render={props => (<PracticePage category='Suffixes'/>)}/>
          <Route exact path = '/medials' render={props => (<CategoriesPage category='Medials'/>)}/>
          <Route exact path = '/medials/:medial' render={props => (<PracticePage category='Medials'/>)}/>
          <Route exact path = '/homophones' render={props => (<CategoriesPage category='Homophones'/>)}/>
          <Route exact path = '/homophones/:homophone' render={props => (<PracticePage category='Homophones'/>)}/>
          <Route exact path = '/freestyle' render={props => (<CategoriesPage category='Freestyle'/>)}/>
          <Route exact path = '/allwords' render={props => (<CategoriesPage category='Allwords'/>)}/>  
          <Route component={NoMatchPage}/>
      </Switch>
      </React.Fragment>
      </BrowserRouter>  
    )
  }
}

export default App;
