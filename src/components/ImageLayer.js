import React from "react";

function ImageLayer(props) {

  const { images, baseImage } = props;

  const handleImageClick = (e, image) => {
    console.log("Image clicked", image.src);
  };

  return (
    <div style = {{ position: 'relative' }}>
      <img src = {baseImage} alt = "Avatar" />

      {images.map((image, index) => (
        <a key = {index} href = '#' onClick = {(e) => handleImageClick(e, image)}>
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
        </a>
      ))}
    </div>
  );
};

export default ImageLayer;

//z index