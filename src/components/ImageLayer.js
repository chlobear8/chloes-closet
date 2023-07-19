import React from "react";
import PropTypes from 'prop-types';

function ImageLayer(props) {

  const { images, baseImage } = props;
  
  return (
    <div style = {{ position: 'relative' }}>
      <img src = {baseImage} alt = "Avatar" />

      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={`{$index}`}
          style={{
            position: 'absolute',
            top: image.position.top,
            left: image.position.left,
          }}
        />
      ))}
    </div>
  );
};


export default ImageLayer;