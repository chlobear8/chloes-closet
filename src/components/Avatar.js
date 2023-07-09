import React from 'react';
import PropTypes from 'prop-types';
import ImageLayer from './ImageLayer';

function Avatar(props) {
  const baseImage = '';
  const images = props.articles.map(article => article.image);

  return (
    <ImageLayer baseImage={baseImage} images={images} />
  );
}

Avatar.propTypes = {
  articles: PropTypes.array
}

export default Avatar;
