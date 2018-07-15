import React from 'react';
import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types';

const WordBox = ({item}) => {
return (
   <Link to={`/${item.year}`}><button>{item.year}</button></Link> 
)
}

export default WordBox;
