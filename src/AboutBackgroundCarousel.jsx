import React, { useState, useEffect } from 'react';
import './AboutBackgroundCarousel.css';

const images = [
  '/about/a (1).png',
  '/about/a (2).png',
  '/about/a (3).png',
  '/about/a (4).png',
  '/about/a (5).png',
  '/about/ChatGPT Image May 14, 2026, 05_09_42 PM.png'
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
