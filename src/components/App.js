import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import '../styling/components/App.css';

import {HomePage, YearPage, CategoriesPage, PracticePage, NoMatchPage} from '../pages';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path = '/' render={props => (<HomePage />)}/>
          <Route exact path = '/year:year' render={props => (<YearPage {...props}/>)}/>
          <Route exact path = '/year:year/prefixes' render={props => (<CategoriesPage category='Prefixes'/>)}/>
          <Route exact path = '/year:year/prefixes/:prefix' render={props => (<PracticePage category='Prefixes'/>)}/>
          <Route exact path = '/year:year/suffixes' render={props => (<CategoriesPage category='Suffixes'/>)}/>
          <Route exact path = '/year:year/suffixes/:suffix' render={props => (<PracticePage category='Suffixes'/>)}/>
          <Route exact path = '/year:year/medials' render={props => (<CategoriesPage category='Medials'/>)}/>
          <Route exact path = '/year:year/medials/:medial' render={props => (<PracticePage category='Medials'/>)}/>
          <Route exact path = '/year:year/homophones' render={props => (<CategoriesPage category='Homophones'/>)}/>
          <Route exact path = '/year:year/homophones/:homophone' render={props => (<PracticePage category='Homophones'/>)}/>
          <Route exact path = '/year:year/freestyle' render={props => (<CategoriesPage category='Freestyle'/>)}/>
          <Route exact path = '/year:year/allwords' render={props => (<CategoriesPage category='Allwords'/>)}/>  
          <Route component={NoMatchPage}/>
      </Switch>
      </React.Fragment>
      </BrowserRouter>  
    )
  }
}

export default App;
