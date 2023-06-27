import React from 'react';
import './AlbumDetails.css'; 

const AlbumDetails = ({image,title}) => {
  return (
    <div className="image-with-title-container">
      <div className="image-with-title-content">
        <img
          src={image}
          alt="Image"
          className="image-with-title-img"
        />
        <div>
          <h2>{title}</h2>
          <p>Other details go here</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
