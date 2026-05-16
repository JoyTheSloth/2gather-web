import React from 'react';
import { motion } from 'framer-motion';

const MarqueeBanner = ({ items, speed = 20, direction = 'left', color = '#22c55e', textColor = '#ffffff', tilt = -2, style = {} }) => {
  const marqueeItems = [...items, ...items, ...items, ...items]; // Repeat items for seamless loop

  return (
    <div 
      className="marquee-container" 
      style={{ 
        background: color, 
        transform: `rotate(${tilt}deg)`,
        width: '120vw',
        marginLeft: '-10vw',
        zIndex: 4,
        position: 'relative',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        ...style
      }}
    >
      <motion.div
        className="marquee-content"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity
        }}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          padding: '16px 0'
        }}
      >
        {marqueeItems.map((item, index) => (
          <span 
            key={index} 
            className="marquee-item"
            style={{ 
              color: textColor, 
              fontSize: '1.5rem', 
              fontWeight: '900',
              fontFamily: "'Syne', sans-serif",
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginRight: '60px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {item.icon} {item.text} <span style={{ opacity: 0.3, fontSize: '1rem' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;
