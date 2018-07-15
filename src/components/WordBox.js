import React from 'react';
import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types';

const WordBox = ({item, category}) => {
return (
    <React.Fragment>
    { !category ? 
   <Link to={`/year${item.year}`}><button>{item.year}</button></Link> 
   : 
   <div></div>
    }
    </React.Fragment>
)
}

export default WordBox;
