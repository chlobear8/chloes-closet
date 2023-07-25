import React, { useState } from "react";

function ImageLayer(props) {

  const { images, baseImage } = props;
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleImageClick = (e, image) => {
    console.log("Image clicked", image.src);
  };

  const filterImagesByCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleAddImageToLayer = (image) => {
    console.log("Adding image to layer", image.src);
  };

  const clearCategoryFilter = () => {
    setSelectedCategory(null);
  };

  return (
    <div style = {{ position: 'relative' }}>
      <div>
        <button onClick = {() => filterImagesByCategory(null)}>All</button>
        {selectedCategory && <button onClick = {clearCategoryFilter}>Clear Filter</button>}
      </div>

      <img src = {baseImage} alt = "Avatar" />

      {images.map((image, index) => {
        if (!selectedCategory || image.category === selectedCategory) {
          return (
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
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default ImageLayer;

//z index