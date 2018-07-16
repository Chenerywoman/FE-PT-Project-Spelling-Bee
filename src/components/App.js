import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import '../styling/components/App.css';

import {HomePage, YearPage, PartialsPage, PracticePage, NoMatchPage, WordsPage} from '../pages';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path = '/' render={props => (<HomePage />)}/>
          <Route exact path = '/year:year' render={props => (<YearPage {...props}/>)}/>
          <Route exact path = '/year:year/prefixes' render={props => (<PartialsPage category='Prefixes' {...props}/>)}/>
          <Route exact path = '/year:year/prefixes/:prefix' render={props => (<PracticePage category='Prefixes'/>)}/>
          <Route exact path = '/year:year/suffixes' render={props => (<PartialsPage category='Suffixes' {...props}/>)}/>
          <Route exact path = '/year:year/suffixes/:suffix' render={props => (<PracticePage category='Suffixes'/>)}/>
          <Route exact path = '/year:year/medials' render={props => (<PartialsPage category='Medials'{...props}/>)}/>
          <Route exact path = '/year:year/medials/:medial' render={props => (<PracticePage category='Medials'/>)}/>
          <Route exact path = '/year:year/homophones' render={props => (<WordsPage category='Homophones'{...props}/>)}/>
          <Route exact path = '/year:year/homophones/:homophone' render={props => (<PracticePage category='Homophones'/>)}/>
          <Route exact path = '/year:year/freestyle' render={props => (<WordsPage category='Freestyle' {...props}/>)}/>
          <Route exact path = '/year:year/words' render={props => (<WordsPage category='Words' {...props}/>)}/>  
          <Route component={NoMatchPage}/>
      </Switch>
      </React.Fragment>
      </BrowserRouter>  
    )
  }
}

export default App;
