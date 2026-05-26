import React, { useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';
import './ToggleTheme.css';

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="toggle-sun-icon"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M6.34 17.66l-1.41 1.41" />
    <path d="M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="toggle-moon-icon"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const ToggleTheme = ({
  theme,
  toggleTheme,
  duration = 500,
  animationType = "circle-spread",
  className = "",
  ...props
}) => {
  const isDark = theme === 'dark';
  const buttonRef = useRef(null);

  const handleToggle = useCallback(async () => {
    if (!buttonRef.current) return;

    // Fallback for browsers that don't support modern View Transitions
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    // Calculate dynamic spatial offsets for center of the ripple
    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    
    // Find absolute maximum radius needed to cover the entire screen viewport
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    // Sync theme toggle view updates inside browser's startViewTransition framework
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
      });
    });

    await transition.ready;

    // Trigger circular spread animation via clipPath on the view-transition pseudo element
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [toggleTheme, duration]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`navbar-toggle-theme-btn ${isDark ? 'is-dark' : 'is-light'} ${className}`}
        aria-label="Toggle Theme"
        type="button"
        {...props}
      >
        <div className="theme-toggle-icon-wrap">
          {isDark ? <SunIcon /> : <MoonIcon />}
        </div>
      </button>

      {/* Force CSS View Transition override so our custom JS clipPath animate is visible */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            ::view-transition-old(root),
            ::view-transition-new(root) {
              animation: none;
              mix-blend-mode: normal;
            }
          `,
        }}
      />
    </>
  );
};

export default ToggleTheme;
