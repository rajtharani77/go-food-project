import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Carousal.css';

export default function Carousal({ search, setSearch }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessKey = 'IY6JhOSRC0Rbk42extcSJxHcT6nrVQXorK0XCOh9GVc';
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=food&per_page=5&client_id=${accessKey}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data.results);
      } catch (error) {
        console.error("Failed to fetch images from Unsplash:", error);
      } finally {
        setLoading(false);
      }
    };

    if (accessKey) {
      fetchImages();
    } else {
      console.error("Unsplash Access Key is missing.");
      setLoading(false);
    }
  }, [accessKey]);

  if (loading) {
    return <div>Loading images...</div>;
  }

  return (
    <Carousel fade indicators={false}>
      {images.map((image) => (
        <Carousel.Item key={image.id}>
          <img
            className="d-block w-100"
            src={image.urls.regular}
            alt={image.alt_description || 'Food slide'}
            style={{ objectFit: 'cover', height: '500px' }}
          />
          <Carousel.Caption>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
              <button className="btn btn-success" type="submit">Search</button>
            </form>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}