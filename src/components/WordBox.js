import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/components/WordBox.css';
// import PropTypes from 'prop-types';

const WordBox = ({ item, page, year, category, style }) => {

    return (
        <React.Fragment>
            {page === 'home' ? <Link to={`/year${item.year}`}><button id={`year${item.year}`} >{`Year ${item.year}`}</button></Link>
                :
                page === 'year' ? <Link to={`/year${year}/${item.name}`}><button id={item.name}>{item.name}</button></Link>
                    :
                    page === 'partials' ? <Link to={`/year${year}/${category.toLowerCase()}/${item.letters}`}><button>{item.letters}</button></Link>
                        :
                        page === 'words' ? <div>{item.word}</div> // need inline html element or need to make wrap
                            : 
                            page === 'practice' ? <span style={style} > {item.word} </span> 
                            :
                            <div> </div>
            }
        </React.Fragment>
    )
}

export default WordBox;
