import React from 'react';
import PropTypes from 'prop-types';
import '../styling/components/FlashWord.css'

const FlashWord = ({show, word}) => {
  const componentClasses = ['flashWord'];
  if (show) { componentClasses.push('show'); }
  console.log('componentClasses', componentClasses.join('-'))
  return (
    <span className={componentClasses.join('-')}>{word}</span>
  );
};

FlashWord.propTypes = {
  show: PropTypes.bool.isRequired,
  word: PropTypes.string.isRequired
};

export default FlashWord;