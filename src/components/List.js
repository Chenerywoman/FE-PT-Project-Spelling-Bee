import React from 'react';
// import PropTypes from 'prop-types';

import WordBox from './WordBox';

const List = ({ items, category }) => {

  return (
    <div>
      {items.map(item => <WordBox key={item._id} item={item} category={category}/>)}
    </div>
  )
}

export default List;