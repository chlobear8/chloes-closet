import React from 'react';
import Header from './Header';
import './App.css';
import ClosetControl from './ClosetControl';
import ImageLayer from './ImageLayer';

function App() {
  const baseImage = '';
  const images = [
    {

    }
  ]
  return (
    <React.Fragment>
      <Header />
      <ClosetControl />
      <div>
        <ImageLayer baseImage={baseImage} images={images} />
      </div>
    </React.Fragment>
  );
}

export default App;
