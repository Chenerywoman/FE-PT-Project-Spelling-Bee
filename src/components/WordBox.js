import React from 'react';
import PropTypes from 'prop-types';

const WordBox = ({letter}) => {
    console.log('letter in wordbox', letter)
return (
    <button>{letter}</button>
)
}

export default WordBox;
