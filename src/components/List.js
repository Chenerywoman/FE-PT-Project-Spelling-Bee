import React from 'react';
// import PropTypes from 'prop-types';

import WordBox from './WordBox';

const List = ({ items, year, page}) => {
  return (
    <div>
      {items.map(item => <WordBox key={item._id} item={item}  page={page} year={year}/>)}
    </div>
  )
}

export default List;