import React from 'react';
import PropTypes from 'prop-types';

import WordBox from './WordBox';

const List = ({ letters, category }) => {

  return (
    <div>
      {letters.map(letter => <WordBox key={letter} letter={letter} />)}
    </div>
  )
}

export default List;