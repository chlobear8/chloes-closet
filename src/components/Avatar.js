import React from 'react';
import PropTypes from 'prop-types';
import ImageLayer from './ImageLayer';
import LastWornTimer from './LastWornTimer';

function Avatar(props) {
  const baseImage = '';
  const images = props.articles.map(article => article.image);
  const [isActive, timer, setIsActive] = LastWornTimer();
  
  return (
    <React.Fragment>
      <ImageLayer baseImage={baseImage} images={images} />
      {isActive ? <h1>{timer}</h1> : <h1>{props.lastWorn}</h1>}
      <button onClick={() => setIsActive(!isActive)}>Set as worn?</button>
    </React.Fragment>
  );
}

Avatar.propTypes = {
  articles: PropTypes.array,
  lastWorn: PropTypes.string
}

export default Avatar;
