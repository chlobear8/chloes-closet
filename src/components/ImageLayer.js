import React, { useState } from "react";

function ImageLayer(props) {

  const { images, baseImage } = props;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedIndex, setDisplayedIndex] = useState(0);

  const handleImageClick = (e, image) => {
    console.log("Clicked image ID:", image.id);
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
    displayedImages = images.filter(
      (image) => image.category === selectedCategory);
  }

  return (
    <div style = {{ position: 'relative' }}>
      <div>
        <button onClick={handleScrollLeft}>&lt;</button>
        <button onClick={handleScrollRight}>&gt;</button>
        <button onClick = {() => filterImagesByCategory(null)}>All</button>
        {selectedCategory && (<button onClick = {clearCategoryFilter}>Clear Filter</button>)}
      </div>

      <img src = {baseImage} alt = "Avatar" />
      {displayedImages.map((image, index) => {
        const shouldDisplay = index === displayedIndex;

          return (
            <div
              key = {image.id}
              style={{
                display: shouldDisplay ? "block" : "none",
                position: 'absolute',
                top: "20px",
                left: "10px"
              }}
            >
              <img src = {image.src} alt = {image.id} />
              <button onClick={() => handleAddImageToLayer(image)}>Add</button>
            </div>
          );
      })}
    </div>
  );
};

export default ImageLayer;