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
                    page === 'partials' ? <Link to={`/year${year}/${category.toLowerCase()}/${item.letters}`}><button className='partials' >{item.letters}</button></Link>
                        :
                        page === 'words' ? <span className='words'>{item.word}</span> 
                            : 
                            page === 'practice' ? <span className='words' style={style}> {item.word} </span> 
                            :
                            <div> </div>
            }
        </React.Fragment>
    )
}

export default WordBox;
