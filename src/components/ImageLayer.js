import React from "react";
import Closet from "./Closet";

const imageLayering = ({ images, baseImage }) => {
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

export default imageLayering;