import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './FlowingFAQ.css';

function FlowingFAQ({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = 'transparent',
  marqueeBgColor = '#3b82f6',
  marqueeTextColor = '#ffffff',
  borderColor = 'rgba(255,255,255,0.1)',
  isGameTheme = false
}) {
  return (
    <div className={`flowing-faq-wrap ${isGameTheme ? 'game-theme' : ''}`} style={{ backgroundColor: bgColor }}>
      <div className="faq-container">
        <h2 className="faq-title-main">Frequently Asked Questions</h2>
        <nav className="faq-menu">
          {items.map((item, idx) => (
            <FlowingFAQItem
              key={idx}
              {...item}
              speed={speed}
              textColor={textColor}
              marqueeBgColor={item.marqueeBgColor || marqueeBgColor}
              marqueeTextColor={item.marqueeTextColor || marqueeTextColor}
              borderColor={borderColor}
              isGameTheme={isGameTheme}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}

function FlowingFAQItem({ question, answer, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, isGameTheme }) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: 0.5, ease: 'power2.out' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;

      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part');
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;

      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [question, answer, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;

      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part');
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };

    const timer = setTimeout(setupMarquee, 50);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [question, answer, repetitions, speed]);

  const handleMouseEnter = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <div className="flowing-faq-item" ref={itemRef} style={{ borderColor }}>
      <div
        className="flowing-faq-question-link"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor }}
      >
        <span className="flowing-faq-q-text">{question}</span>
        <span className="flowing-faq-arrow-indicator">➔</span>
      </div>
      
      <div className="flowing-faq-marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="flowing-faq-marquee-inner-wrap">
          <div className="flowing-faq-marquee-inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: marqueeTextColor }}>
                <span className="flowing-faq-a-text">{answer}</span>
                {image && (
                  <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingFAQ;
