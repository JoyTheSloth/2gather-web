import React from 'react';

function Footer({ onDownload }) {
  return (
    <footer className="site-footer">

      {/* ── CTA Banner ─────────────────────────────── */}
      <div className="footer-cta-wrapper">
        <div className="footer-cta-banner">

          {/* Left */}
          <div className="footer-cta-left">
            <h2 className="footer-cta-heading">
              Download the 2gather<br />App Today for Free!
            </h2>
            <p className="footer-cta-sub">
              Join a community of&nbsp; listeners and discover your next podcast!
            </p>
            <button className="footer-cta-btn" onClick={onDownload}>
              Download App
            </button>
          </div>

          {/* Right – app mockup */}
          <div className="footer-cta-right">
            <div className="footer-mockup-card">
              {/* Tab row */}
              <div className="mockup-tab-row">
                <button className="mockup-tab mockup-tab--active">Quick join</button>
                <button className="mockup-tab">All events</button>
              </div>

              {/* Event card 1 */}
              <div className="mockup-event-card">
                <div className="mockup-avatar mockup-avatar--sarah" />
                <div className="mockup-event-meta">
                  <span className="mockup-username">Sarah Mitchell</span>
                  <span className="mockup-time">2 hours ago</span>
                </div>
                <div className="mockup-event-body">
                  <strong>Morning Yoga in Golden Gate Park</strong>
                  <p>Looking for 3–4 people to join morning yoga session. All levels welcome! Let's start the day with positive energy.</p>
                  <div className="mockup-event-stats">
                    <span>🕗 Tomorrow, 7:00 AM</span>
                    <span>👤 0/5 joined</span>
                  </div>
                  <button className="mockup-join-btn">Join Activity</button>
                </div>
              </div>

              {/* Event card 2 – partial */}
              <div className="mockup-event-card mockup-event-card--partial">
                <div className="mockup-avatar mockup-avatar--yogi" />
                <div className="mockup-event-meta">
                  <span className="mockup-username">Yogi Adityanath</span>
                  <span className="mockup-time">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Nav ─────────────────────────────── */}
      <div className="footer-nav-section">

        {/* Brand col */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            {/* Snowflake-style icon */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="16" y1="2"  x2="16" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="2"  y1="16" x2="30" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="5.4" y1="5.4" x2="26.6" y2="26.6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="26.6" y1="5.4" x2="5.4" y2="26.6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="16" cy="2"  r="1.5" fill="white"/>
              <circle cx="16" cy="30" r="1.5" fill="white"/>
              <circle cx="2"  cy="16" r="1.5" fill="white"/>
              <circle cx="30" cy="16" r="1.5" fill="white"/>
              <circle cx="5.4"  cy="5.4"  r="1.5" fill="white"/>
              <circle cx="26.6" cy="26.6" r="1.5" fill="white"/>
              <circle cx="26.6" cy="5.4"  r="1.5" fill="white"/>
              <circle cx="5.4"  cy="26.6" r="1.5" fill="white"/>
            </svg>
            <span className="footer-logo-text">2gather</span>
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
