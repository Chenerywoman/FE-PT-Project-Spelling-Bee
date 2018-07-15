import React from 'react';
// import PropTypes from 'prop-types';

import WordBox from './WordBox';

const List = ({ items, year, page}) => {
console.log('items in List', items)
  return (
    <div>
      {items.map(item => <WordBox key={item._id} item={item}  page={page}/>)}
    </div>
  )
}

export default List;