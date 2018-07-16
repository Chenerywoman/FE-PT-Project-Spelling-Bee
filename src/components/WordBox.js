import React from 'react';
import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types';

const WordBox = ({item, page, year, category}) => {
    console.log('item in wordbox', item)
    console.log('category in wordbox', category)
    console.log('year in wordbox', year)
return (
    <React.Fragment>
    { page === 'home' ? <Link to={`/year${item.year}`}><button>{item.year}</button></Link> 
    :
    page === 'year' ? <Link to={`/year${year}/${item.name}`}><button>{item.name}</button></Link>
   : 
   page === 'partials' ? <Link to={`/year${year}/${category}/${item.letters}`}><button>{item.letters}</button></Link>
   : 
   page === 'words' ? <Link to={`/year${year}/${category}`}><button>{item.word}</button></Link>
   
   :<div></div>


    }
    </React.Fragment>
)
}

export default WordBox;
