import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageLayer from './ImageLayer';
import LastWornTimer from './LastWornTimer';

function Avatar(props) {
  const baseImage = props.baseImage;
  const images = props.articles.map(article => article.image);
  const [isActive, timer, setIsActive] = LastWornTimer();
  const [newAvatar, setNewAvatar] = useState({ baseImage: '', images: []});

  return (
    <React.Fragment>
      <ImageLayer newAvatar = {newAvatar} />
      {isActive ? <h1>{timer}</h1> : <h1>{props.lastWorn}</h1>}
      <button onClick={() => {
        setIsActive(!isActive);
        setNewAvatar({ baseImage, images });
      }}>Set as worn?</button>
    </React.Fragment>
  );
}

Avatar.propTypes = {
  articles: PropTypes.array,
  lastWorn: PropTypes.string,
  newAvatar: PropTypes.object
};

export default Avatar;
