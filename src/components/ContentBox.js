import React from 'react';
import '../styling/components/ContentBox.css'
import PropTypes from 'prop-types';

const ContentBox = ({description, page}) => {
return (
    <p id={page}> {description}</p>
)
}

export default ContentBox

ContentBox.propTypes = {

    description: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,

}