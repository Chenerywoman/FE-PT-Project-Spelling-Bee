import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {BeeLogoLarge} from '../logos';
import {ContentBox, List} from '../components';
import '../styling/pages/YearPage.css';
import { findCategoriesByYear } from '../dataFunctions/api';

class YearPage extends Component {

    state = {
        categories:[],
        loading: true
    }

componentDidMount () {
    return findCategoriesByYear(this.props.match.params.year)
    .then(({categories}) =>  this.setState({categories, loading: false}))
    .catch(error => {
        this.props.history.push('/404');
      });
}

componentDidUpdate () {


}

render(){
    console.log('this.state.categories', this.state.categories)
return (
    <React.Fragment>
    { !/^[1-6]$/.test(this.props.match.params.year) ? < Redirect to='404' /> 
    :
    <React.Fragment>
    <header><p>Year {this.props.match.params.year} page</p></header>
    <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
    { !this.state.categories.length ? <p>We do not currently have data for year {`${this.props.match.params.year}`}</p>
    :
    <React.Fragment>
    <ContentBox/>
    <List items={this.state.categories} year={this.props.match.params.year} page='year'/> 
    </React.Fragment>
    }
    </React.Fragment>
    }
    </React.Fragment>
)
}
}

export default YearPage;


