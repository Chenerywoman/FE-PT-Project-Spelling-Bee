import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styling/components/NavBar.css'

class Navbar extends Component {

    render(){
        console.log('this.props.category', this.props.category)
    return (<nav>
        <ul id='list' className='flex-container-navbar'>
            {/* <li><Link className='link' to='/'><button id='home'>Home</button></Link></li>  */}
            <li ><Link className={this.props.year === '1' ? 'link-active' : 'link'}  to='/year1' ><button id='year1link'>Year 1</button></Link></li>
            <li ><Link className={this.props.year === '2' ? 'link-active' : 'link'}  to='/year2' ><button id='year2link'>Year 2</button></Link></li>
            <li ><Link className={this.props.year === '3' ? 'link-active' : 'link'}  to='/year3' ><button id='year3link'>Year 3</button></Link></li>
            <li ><Link className={this.props.year === '4' ? 'link-active' : 'link'}  to='/year4' ><button id='year4link'>Year 4</button></Link></li>
            <li ><Link className={this.props.year === '5' ? 'link-active' : 'link'}  to='/year5' ><button id='year5link'>Year 5</button></Link></li>
            <li ><Link className={this.props.year === '6' ? 'link-active' : 'link'}  to='/year6' ><button id='year6link'>Year 6</button></Link></li>
            <li ><Link  className={this.props.category === 'Prefixes' ? 'link-active' : 'link'} to={`/year${this.props.year}/prefixes`} ><button id='prefixesLink'>prefixes</button></Link></li>
            <li ><Link  className={this.props.category === 'Suffixes' ? 'link-active' : 'link'} to={`/year${this.props.year}/suffixes`} ><button id='suffixesLink'>suffixes</button></Link></li>
            <li ><Link  className={this.props.category === 'Medials' ? 'link-active' : 'link'} to={`/year${this.props.year}/medials`} ><button id='medialsLink'>medials</button></Link></li>
            <li ><Link  className={this.props.category === 'Homophones' ? 'link-active' : 'link'} to={`/year${this.props.year}/homophones`} ><button id='homophonesLink'>homophones</button></Link></li>
            <li ><Link  className={this.props.category === 'Freestyle' ? 'link-active' : 'link'} to={`/year${this.props.year}/freestyle`} ><button id='freestyleLink'>freestyle</button></Link></li>
            <li ><Link  className={this.props.category === 'Words' ? 'link-active' : 'link'} to={`/year${this.props.year}/words`} ><button id='wordsLink'>words</button></Link></li>
        </ul>
    </nav>
    )
    }
}

Navbar.propTypes = {

    username: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,

}

export default Navbar;