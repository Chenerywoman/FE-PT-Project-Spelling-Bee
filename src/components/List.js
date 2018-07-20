import React from 'react';
import '../styling/components/List.css'
// import PropTypes from 'prop-types';

import WordBox from './WordBox';

const List = ({ items, year, page, category, style}) => {

  return (
    <div className='flex-container-list'>
      {items.map(item => <WordBox key={item._id} item={item}  page={page} year={year} category={category} style={style} />)}
    </div>
  )
}

export default List;

