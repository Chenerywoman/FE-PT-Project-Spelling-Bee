import React from 'react';
// import PropTypes from 'prop-types';

import WordBox from './WordBox';

const List = ({ items, year, page, category}) => {
  console.log('category in List', category)
  return (
    <div>
      {items.map(item => <WordBox key={item._id} item={item}  page={page} year={year} category={category}/>)}
    </div>
  )
}

export default List;