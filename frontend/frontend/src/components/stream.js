import React, { useState, useEffect } from 'react';

function Stream() {
  const [imageUrl, setImageUrl] = useState("");
  const fetchLiveFeed = () => {

    setImageUrl("https://cameras.beehivemonitoringscu.lol");

  };

  useEffect(() => {
    fetchLiveFeed();
  }, []);

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Live Feed" />}
    </div>
  );
}export default Stream;
