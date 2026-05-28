import React from 'react';

function Footer({ onDownload }) {
  return (
    <footer className="site-footer">

      {/* ── CTA Banner ─────────────────────────────── */}
      <div className="footer-cta-wrapper">
        <div className="footer-cta-banner">

          {/* Left Content */}
          <div className="footer-cta-left">
            <h2 className="footer-cta-heading">
              Download the 2gather<br />App Today for Free!
            </h2>
            <p className="footer-cta-sub">
              Join a community of gatherers and discover your next hangout!
            </p>
            <div className="footer-cta-store-badges">
              {/* App Store Badge */}
              <a href="#" className="store-badge-link" aria-label="Download on the App Store" onClick={(e) => { e.preventDefault(); onDownload(); }}>
                <div className="store-badge app-store">
                  <svg className="store-badge-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
                  </svg>
                  <div className="store-badge-text">
                    <span className="badge-micro">Download on the</span>
                    <span className="badge-main">App Store</span>
                  </div>
                </div>
              </a>

              {/* Google Play Badge */}
              <a href="#" className="store-badge-link" aria-label="Get it on Google Play" onClick={(e) => { e.preventDefault(); onDownload(); }}>
                <div className="store-badge google-play">
                  <svg className="store-badge-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 5.27v13.46c0 .88.75 1.54 1.6 1.34l12.7-7.39c.6-.35.6-.96 0-1.31L4.6 3.93C3.75 3.73 3 4.39 3 5.27z"/>
                    <path d="M17.3 12L4.6 19.4c-.6.35-1 .12-1-.5V12.5L17.3 12z" opacity="0.15"/>
                    <path d="M17.3 12L3.6 4.6c-.6-.35-1-.12-1 .5V11.5L17.3 12z" opacity="0.15"/>
                  </svg>
                  <div className="store-badge-text">
                    <span className="badge-micro">GET IT ON</span>
                    <span className="badge-main">Google Play</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right – High-fidelity interactive app mockup */}
          <div className="footer-cta-right">
            <div className="footer-mockup-image-wrapper">
              <img src="/alllpng.png" alt="2gather App Screen" className="footer-mockup-screen-image" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Slanted Slogan Hero Section ── */}
      <div className="footer-slanted-hero">
        <div className="footer-slanted-content" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <h2 className="footer-slanted-heading">
            <span className="slogan-cursive">Reinventing</span>
            <span className="slogan-bold">community for a new generation</span>
          </h2>
        </div>
      </div>

      {/* ── Footer Nav ─────────────────────────────── */}
      <div className="footer-nav-section">

        {/* Brand col */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <img 
              src="/logo_dark.png" 
              alt="2gather" 
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }} 
            />
          </div>
          <p className="footer-tagline">Your life, your vibe, your people. All in real life.</p>
          <button className="footer-download-btn" onClick={onDownload}>Download App</button>
        </div>

        {/* Company */}
        <div className="footer-links-col">
          <h4>Company</h4>
          <a href="#">Our Mission</a>
          <a href="#">Our Vision</a>
          <a href="#">Our Story</a>
          <a href="#">Meet Our Team</a>
        </div>

        {/* Resources */}
        <div className="footer-links-col">
          <h4>Resources</h4>
          <a href="#">Blog</a>
          <a href="#">Case Studies</a>
          <a href="#">Whitepapers</a>
          <a href="#">eBooks</a>
        </div>

        {/* Features + Socials */}
        <div className="footer-links-col">
          <h4>Features</h4>
          <a href="#">Recommendations</a>
          <a href="#">Community Interaction</a>
          <a href="#">Business Partner</a>
          <div className="footer-social-icons">
            {/* Instagram */}
            <a href="#" className="footer-social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="#" className="footer-social-icon" aria-label="X">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className="footer-social-icon" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────── */}
      <div className="footer-bottom-bar">
        <span>© Copyright 2gather 2025</span>
        <div className="footer-bottom-links">
          <a href="#">FAQ</a>
          <a href="#">Terms of Condition</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Changelog</a>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
