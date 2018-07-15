import React from 'react';
// import PropTypes from 'prop-types';

import WordBox from './WordBox';

const List = ({ items }) => {

  return (
    <div>
      {items.map(item => <WordBox key={item._id} item={item} />)}
    </div>
  )
}

export default List;