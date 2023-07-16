import React from 'react';
import PropTypes from 'prop-types';
import ImageLayer from './ImageLayer';
import LastWornTimer from './LastWornTimer';
import BaseImageForm from './BaseImageForm';

function Avatar(props) {
  const baseImage = props.baseImage;
  const images = props.articles.map(article => article.image);
  const [isActive, timer, setIsActive] = LastWornTimer();
  props.newAvatar = {baseImage, images};

  return (
    <React.Fragment>
      <ImageLayer newAvatar = {props.newAvatar} />
      {isActive ? <h1>{timer}</h1> : <h1>{props.lastWorn}</h1>}
      <button onClick={() => setIsActive(!isActive)}>Set as worn?</button>
    </React.Fragment>
  );
}

Avatar.propTypes = {
  articles: PropTypes.array,
  lastWorn: PropTypes.string,
  newAvatar: PropTypes.object
}

export default Avatar;
