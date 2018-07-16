import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const WordBox = ({ item, page, year, category }) => {

    return (
        <React.Fragment>
            {page === 'home' ? <Link to={`/year${item.year}`}><button>{item.year}</button></Link>
                :
                page === 'year' ? <Link to={`/year${year}/${item.name}`}><button>{item.name}</button></Link>
                    :
                    page === 'partials' ? <Link to={`/year${year}/${category.toLowerCase()}/${item.letters}`}><button>{item.letters}</button></Link>
                        :
                        page === 'words' ? <div>{item.word}</div> // need inline html element or need to make wrap

                            : <span> {item.word} </span> // need inline html element or need to make wrap


            }
        </React.Fragment>
    )
}

export default WordBox;
