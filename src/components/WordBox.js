import React from 'react';
import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types';

const WordBox = ({item, page, year}) => {
    console.log('item', item)
return (
    <React.Fragment>
    { page === 'home' ? <Link to={`/year${item.year}`}><button>{item.year}</button></Link> 
    :
    page === 'year' ? <Link to={`/year${year}/${item.name}`}><button>{item.name}</button></Link>
   : 
   page === 'categories' ? <Link to={`/year${year}/${item.categories[0].name}/${item.letters}`}><button>{item.letters}</button></Link>
   : <div></div>
    }
    </React.Fragment>
)
}

export default WordBox;
