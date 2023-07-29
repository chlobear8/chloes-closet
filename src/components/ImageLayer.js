import React, { useState } from "react";

function ImageLayer(props) {

  const { images, baseImage } = props;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedIndex, setDisplayedIndex] = useState(0);

  const handleImageClick = (e, image) => {
    console.log("Image clicked", image.src);
  };

  const filterImagesByCategory = (category) => {
    setSelectedCategory(category);
    setDisplayedIndex(0);
  };

  const handleAddImageToLayer = (image) => {
    console.log("Adding image to layer", image.src);
  };

  const handleScrollLeft = () => {
    if (displayedIndex > 0) {
      setDisplayedIndex(displayedIndex -1);
    }
  };

  const handleScrollRight = () => {
    if (displayedIndex < images.length - 1) {
      setDisplayedIndex(displayedIndex +1);
    }
  };

  const clearCategoryFilter = () => {
    setSelectedCategory(null);
  };

  let displayedImages = images;
  if (selectedCategory) {
    displayedImages = images.filter(image => image.category === selectedCategory);
  }
  return (
    <div style = {{ position: 'relative' }}>
      <div>
        <button onClick={handleScrollLeft}>&lt;</button>
        <button onClick={handleScrollRight}>&gt;</button>
        <button onClick = {() => filterImagesByCategory(null)}>All</button>
        {selectedCategory && <button onClick = {clearCategoryFilter}>Clear Filter</button>}
      </div>

      <img src = {baseImage} alt = "Avatar" />
      {displayedImages.map((image, index) => {
          return (
            <a key = {index} href = '#' onClick = {(e) => handleImageClick(e, image)}>
              <img
                key={index}
                src={image.src}
                alt={index}
                style={{
                  position: 'absolute',
                  top: image.position.top,
                  left: image.position.left,
                }}
              />
              <button onClick={() => handleAddImageToLayer(image)}>Add</button>
            </a>
          );
      })}
    </div>
  );
};

export default ImageLayer;

//z index