import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {BeeLogoLarge} from '../logos';
import {ContenBox, List} from '../components';
import '../styling/pages/YearPage.css';
import { NoMatchPage } from '.';

class YearPage extends Component {

    state = {
        year: '',
        // year?
        loading: true
    }

componentDidMount () {

}

componentDidUpdate () {


}

render(){
    console.log('this.props.match.params.year', this.props.match.params.year)
return (
    <React.Fragment>
    { !/^[1-6]$/.test(this.props.match.params.year) ? < NoMatchPage /> 
    :
    <header><p>Year {this.props.match.params.year} page</p></header>
    }
    </React.Fragment>
)
}
}

export default YearPage;


