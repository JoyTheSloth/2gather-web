import React, { useState, useEffect, useCallback, useRef } from 'react';
import './ThreeDSlider.css';

// --- Sub-Component: SliderItem (Pure DOM, no Motion overhead) ---

// We use forwardRef to expose the DOM element to the parent for direct manipulation
const SliderItem = React.forwardRef(({ item, onClick }, ref) => {
    return (
        <div
            ref={ref}
            className="slider-item"
            style={{
                '--width': 'clamp(150px, 30vw, 300px)',
                '--height': 'clamp(200px, 40vw, 400px)',
                transition: 'none', // Critical: handle animation purely via JS
                display: 'block', // Ensure initial visibility
            }}
            onClick={onClick}
        >
            <div
                className="slider-item-content"
                style={{ opacity: 1 }} // Initial opacity
            >
                {/* Washi tape for scrapbook polaroid effect */}
                <div className="scrapbook-tape tape-slider" />

                {/* Overlay for gradient effect */}
                <div className="slider-item-overlay"></div>

                {/* Title */}
                <div className="slider-item-title">
                    {item.title}
                </div>

                {/* Number */}
                <div className="slider-item-number">
                    {item.num}
                </div>

                {/* Image */}
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="slider-item-image"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </div>
    );
});

SliderItem.displayName = 'SliderItem';

// --- Main Component: ThreeDSlider ---

const ThreeDSlider = ({
    items,
    speedWheel = 0.05,
    speedDrag = -0.15,
    containerStyle = {},
    onItemClick,
}) => {
    // Refs for state that updates 60fps without re-renders
    const progressRef = useRef(50);
    const targetProgressRef = useRef(50); // For smooth damping
    const isDownRef = useRef(false);
    const startXRef = useRef(0);
    const containerRef = useRef(null);
    const rafRef = useRef(null);

    // Array of refs to children elements
    const itemRefs = useRef([]);
    // Cache for DOM updates to prevent layout thrashing
    const cacheRef = useRef({});

    const numItems = items.length;

    // Ensure itemRefs.current is sized correctly
    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, numItems);
    }, [numItems]);

    // --- Animation Loop ---
    const update = useCallback(() => {
        if (!itemRefs.current.length) return;

        // Lerp for buttery smoothness
        progressRef.current += (targetProgressRef.current - progressRef.current) * 0.1;

        const progress = progressRef.current;
        const clamped = Math.max(0, Math.min(progress, 100));

        // Continuous index
        const activeFloat = clamped / 100 * (numItems - 1);

        itemRefs.current.forEach((el, index) => {
            if (!el) return;

            const denominator = numItems > 1 ? numItems - 1 : 1;
            const ratio = (index - activeFloat) / denominator; // -1 (leftmost) to 1 (rightmost)

            const tx = ratio * 800;
            const ty = ratio * 200;
            const rot = ratio * 120;

            const dist = Math.abs(index - activeFloat);
            const z = numItems - dist;

            const opacity = (z / numItems) * 3 - 2;

            const newTransform = `translate3d(${tx}%, ${ty}%, 0) rotate(${rot}deg)`;
            const newZIndex = Math.round(z * 10).toString();
            const newOpacity = Math.max(0, Math.min(1, opacity)).toString();

            if (!cacheRef.current[index]) {
                cacheRef.current[index] = { transform: '', zIndex: '', opacity: '' };
            }

            const cache = cacheRef.current[index];

            // Only update DOM if changed (prevents thrashing)
            if (cache.transform !== newTransform) {
                el.style.transform = newTransform;
                cache.transform = newTransform;
            }
            if (cache.zIndex !== newZIndex) {
                el.style.zIndex = newZIndex;
                cache.zIndex = newZIndex;
            }

            const inner = el.querySelector('.slider-item-content');
            if (inner && cache.opacity !== newOpacity) {
                inner.style.opacity = newOpacity;
                cache.opacity = newOpacity;
            }
        });
    }, [numItems]);

    // Start loop
    useEffect(() => {
        let active = true;

        const loop = () => {
            if (active) {
                update();
                rafRef.current = requestAnimationFrame(loop);
            }
        };

        // Initialize the loop
        rafRef.current = requestAnimationFrame(loop);

        return () => {
            active = false;
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [update]);

    // --- Interaction Handlers ---
    const handleWheel = useCallback((e) => {
        const wheelProgress = e.deltaY * speedWheel;
        const current = targetProgressRef.current;
        const next = current + wheelProgress;

        if ((next < 0 && e.deltaY < 0) || (next > 100 && e.deltaY > 0)) {
            return;
        }

        e.preventDefault();
        targetProgressRef.current = Math.max(0, Math.min(100, next));
    }, [speedWheel]);

    const getClientX = (e) => {
        if ('touches' in e && e.touches.length > 0) return e.touches[0].clientX;
        return e.clientX;
    };

    const handleMouseDown = useCallback((e) => {
        isDownRef.current = true;
        const x = getClientX(e);
        if (x !== undefined) startXRef.current = x;
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isDownRef.current) return;

        const x = getClientX(e);
        if (x === undefined) return;

        const diff = (x - startXRef.current) * speedDrag;
        const current = targetProgressRef.current;
        const next = Math.max(0, Math.min(100, current + diff));

        targetProgressRef.current = next;
        startXRef.current = x;
    }, [speedDrag]);

    const handleMouseUp = useCallback(() => {
        isDownRef.current = false;
    }, []);

    const handleClick = useCallback((item, index) => {
        const denominator = numItems > 1 ? numItems - 1 : 1;
        targetProgressRef.current = (index / denominator) * 100;

        if (onItemClick) onItemClick(item, index);
    }, [numItems, onItemClick]);

    // --- Listeners ---
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const wheelOpts = { passive: false };
        container.addEventListener('wheel', handleWheel, wheelOpts);
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('touchstart', handleMouseDown, { passive: true });

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleMouseMove, { passive: true });
        window.addEventListener('touchend', handleMouseUp);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('touchstart', handleMouseDown);

            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

    return (
        <div
            ref={containerRef}
            className="three-d-slider-container"
            style={containerStyle}
        >
            <div className="three-d-slider-relative-wrap">
                {items.map((item, index) => (
                    <SliderItem
                        key={`slider-item-${index}`}
                        ref={(el) => { itemRefs.current[index] = el; }}
                        item={item}
                        index={index}
                        onClick={() => handleClick(item, index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ThreeDSlider;
