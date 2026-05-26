import { useEffect, useRef } from 'react';

function ScrollVideoBackground({ theme }) {
  const canvasRef = useRef(null);
  const images1Ref = useRef([]);
  const images2Ref = useRef([]);
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);

  // Preload all 240 images from contact1 and 240 images from contact2 for standard stutter-free animation
  useEffect(() => {
    const loaded1 = [];
    const loaded2 = [];
    
    for (let i = 1; i <= 240; i++) {
      const paddedIndex = String(i).padStart(3, '0');
      
      const img1 = new Image();
      img1.src = `/contact1/ezgif-frame-${paddedIndex}.jpg`;
      loaded1.push(img1);
      
      const img2 = new Image();
      img2.src = `/contact2/ezgif-frame-${paddedIndex}.jpg`;
      loaded2.push(img2);
    }
    
    images1Ref.current = loaded1;
    images2Ref.current = loaded2;
  }, []);

  // Window resize handler to scale canvas resolution to screen bounds (high-DPI / Retina optimized)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Ensure drawing contexts are sharp
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial trigger

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track window scroll position to compute mapped target frame, ending at the very bottom (footer)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) return;

      const scrollPercent = Math.min(1, Math.max(0, scrollTop / scrollHeight));
      // Map 0-1 percent across 480 frames total (1 to 240 is contact1, 241 to 480 is contact 2)
      const mappedFrame = Math.round(scrollPercent * 479) + 1;
      targetFrameRef.current = mappedFrame;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    
    // Initial calculations with timeouts to ensure DOM is fully painted
    setTimeout(handleScroll, 100);
    setTimeout(handleScroll, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  // Smooth frame interpolation (lerp) animation loop
  useEffect(() => {
    let animFrameId;

    const drawImageProp = (ctx, img, x, y, w, h, offsetX = 0.5, offsetY = 0.5) => {
      const iw = img.width;
      const ih = img.height;
      const r = Math.min(w / iw, h / ih);
      let nw = iw * r;
      let nh = ih * r;
      let cx, cy, cw, ch;
      let ar = 1;

      if (nw < w) ar = w / nw;
      if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
      nw *= ar;
      nh *= ar;

      cw = iw / (nw / w);
      ch = ih / (nh / h);

      cx = (iw - cw) * offsetX;
      cy = (ih - ch) * offsetY;

      cx = Math.max(0, cx);
      cy = Math.max(0, cy);
      cw = Math.min(iw, cw);
      ch = Math.min(ih, ch);

      ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    };

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animFrameId = requestAnimationFrame(animate);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animFrameId = requestAnimationFrame(animate);
        return;
      }

      // Lerping loop: currentFrame moves 12% closer to targetFrame per frame
      const diff = targetFrameRef.current - currentFrameRef.current;
      
      // If the difference is miniscule, snap to target
      if (Math.abs(diff) < 0.05) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        currentFrameRef.current += diff * 0.12; 
      }

      const activeFrameIndex = Math.min(480, Math.max(1, Math.round(currentFrameRef.current)));
      let activeImage;

      if (activeFrameIndex <= 240) {
        activeImage = images1Ref.current[activeFrameIndex - 1];
      } else {
        activeImage = images2Ref.current[activeFrameIndex - 241];
      }

      if (activeImage && activeImage.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImageProp(ctx, activeImage, 0, 0, canvas.width, canvas.height);
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animFrameId);
  }, []);

  return (
    <div className="scroll-canvas-bg-wrapper">
      <canvas ref={canvasRef} className="scroll-canvas-bg" />
      {/* Dynamic theme overlay for visual legibility and tinting */}
      <div className={`scroll-canvas-overlay ${theme}`} />
    </div>
  );
}

export default ScrollVideoBackground;
