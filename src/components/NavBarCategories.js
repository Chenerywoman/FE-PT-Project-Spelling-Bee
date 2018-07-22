import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styling/components/NavBarCategories.css'

class NavBarCategories extends Component {

    render(){
    return (<nav>
         <ul className='flex-container-navbar-categories'>
            <li ><Link  className={this.props.category === 'Prefixes' ? 'category-link-active' : 'category-link'} to={`/year${this.props.year}/prefixes`} ><span id='prefixesLink'>Prefixes</span></Link></li>
            <li ><Link  className={this.props.category === 'Suffixes' ? 'category-link-active' : 'category-link'} to={`/year${this.props.year}/suffixes`} ><span id='suffixesLink'>Suffixes</span></Link></li>
            <li ><Link  className={this.props.category === 'Medials' ? 'category-link-active' : 'category-link'} to={`/year${this.props.year}/medials`} ><span id='medialsLink'>Medials</span></Link></li>
            <li ><Link  className={this.props.category === 'Homophones' ? 'category-link-active' : 'category-link'} to={`/year${this.props.year}/homophones`} ><span id='homophonesLink'>Homophones</span></Link></li>
            <li ><Link  className={this.props.category === 'Freestyle' ? 'category-link-active' : 'category-link'} to={`/year${this.props.year}/freestyle`} ><span id='freestyleLink'>Freestyle</span></Link></li>
            <li ><Link  className={this.props.category === 'Words' ? 'category-link-active' : 'category-link'} to={`/year${this.props.year}/words`} ><span id='wordsLink'>Words</span></Link></li> 
            </ul> 
    </nav>
    )
    }
}

NavBarCategories.propTypes = {

    year: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,

}

export default NavBarCategories;