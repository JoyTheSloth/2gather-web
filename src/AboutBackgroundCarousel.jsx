import React, { useState, useEffect } from 'react';
import './AboutBackgroundCarousel.css';

const images = [
  '/about/ChatGPT Image May 27, 2026, 12_55_01 AM.png',
  '/about/ChatGPT Image May 27, 2026, 12_55_08 AM.png',
  '/about/ChatGPT Image May 27, 2026, 12_55_11 AM.png',
  '/about/ChatGPT Image May 27, 2026, 12_55_16 AM.png',
  '/about/ChatGPT Image May 27, 2026, 12_56_10 AM.png',
  '/about/ChatGPT Image May 27, 2026, 12_57_43 AM.png'
];

export const AboutBackgroundCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 6 seconds interval for a slow, premium parallax breathing cycle
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="about-bg-carousel-container">
      {images.map((image, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={image}
            className={`about-bg-slide ${isActive ? 'active' : ''}`}
            style={{
              backgroundImage: `url("${image}")`,
            }}
          />
        );
      })}
      {/* Dynamic theme-aware color backdrop blur overlay */}
      <div className="about-bg-carousel-overlay" />
    </div>
  );
};

export default AboutBackgroundCarousel;
