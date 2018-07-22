import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styling/components/NavBar.css'
import { BeeLogo100pxtoresize } from '../logos';

class NavBar extends Component {

    render(){
    return (<nav>
        <ul className='flex-container-navbar'>
            <li ><Link className={this.props.year === '1' ? 'link-active' : 'link'}  to='/year1' ><button id='year1link'>Year 1</button></Link></li>
            <li ><Link className={this.props.year === '2' ? 'link-active' : 'link'}  to='/year2' ><button id='year2link'>Year 2</button></Link></li>
            <li ><Link className={this.props.year === '3' ? 'link-active' : 'link'}  to='/year3' ><button id='year3link'>Year 3</button></Link></li>
            <li ><Link className={this.props.year === '4' ? 'link-active' : 'link'}  to='/year4' ><button id='year4link'>Year 4</button></Link></li>
            <li ><Link className={this.props.year === '5' ? 'link-active' : 'link'}  to='/year5' ><button id='year5link'>Year 5</button></Link></li>
            <li ><Link className={this.props.year === '6' ? 'link-active' : 'link'}  to='/year6' ><button id='year6link'>Year 6</button></Link></li>
            <li ><Link to='/'><img src={BeeLogo100pxtoresize} alt="BeeLogo100px" /></Link></li>
        </ul>
        </nav>
    )
    }
}

NavBar.propTypes = {

    year: PropTypes.string.isRequired,

}

export default NavBar;