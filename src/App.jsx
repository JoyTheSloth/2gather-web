import React, { useState, useEffect } from 'react';
import './App.css';
import WhatsAppCommunityPage, { StarBurst } from '../2gather-whatsapp-community.jsx';
import CircularGallery from './CircularGallery';
import ScrollFloat from './ScrollFloat';
import ShinyText from './ShinyText';
import MarqueeBanner from './MarqueeBanner';
import Footer from './Footer';
import TwoGatherSlides from '../2gather-slides.jsx';
import DomeGallery from './DomeGallery';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'howItWorks' | 'aboutUs' | 'events' | 'communities'
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const tribeMarqueeItems = [
    { text: 'DIGITAL NOMADS', icon: '🌍' },
    { text: 'TECH ENTHUSIASTS', icon: '💻' },
    { text: 'FITNESS JUNKIES', icon: '💪' },
    { text: 'CREATIVE SOULS', icon: '🎨' },
    { text: 'ENTREPRENEURS', icon: '🚀' },
    { text: 'NIGHT OWLS', icon: '🦉' },
    { text: 'FOODIES', icon: '🍕' },
    { text: 'ADVENTURERS', icon: '🧗' },
  ];

  const homeMarqueeItems = [
    { text: 'CONNECT', icon: '🤝' },
    { text: 'DISCOVER', icon: '🔍' },
    { text: 'GATHER', icon: '✨' },
    { text: 'EXPERIENCE', icon: '🎭' },
    { text: 'EVOLVE', icon: '📈' },
    { text: 'COLLABORATE', icon: '🤝' },
  ];

  // Parallax/interaction effect with mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
      setTimeout(() => {
        setTimeout(() => {
          setShowWaitlist(false);
          setSubmitted(false);
          setEmail('');
        }, 2000);
      }, 1500);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`app-container ${theme}${(activeTab === 'home' || activeTab === 'events') ? ' home-active' : ''}`}>


      {/* Background: clean white for home, ambient glow for other pages */}

      {/* Parallax ambient background for other pages */}
      {(activeTab !== 'home' && activeTab !== 'events') && (
        <div
          className="ambient-bg"
          style={{
            transform: `scale(1.03) translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        ></div>
      )}
      {(activeTab !== 'home' && activeTab !== 'events') && <div className="ambient-overlay"></div>}


      {/* Unified Navbar */}
      <header className="header" role="banner">
        <div className="navbar-container">
          {/* Left: Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}
            className="navbar-brand"
            aria-label="2gather Home"
          >
            <img
              src={theme === 'dark' ? '/logo_dark.png' : '/Color%20Logo.png'}
              alt="2gather"
              className="navbar-logo-img"
            />
          </a>

          {/* Center Nav */}
          <nav className="navbar-nav" aria-label="Main Navigation">
            <button type="button" className={`navbar-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>Home</button>
            <button type="button" className={`navbar-link ${activeTab === 'communities' ? 'active' : ''}`} onClick={() => setActiveTab('communities')}>Tribes</button>
            <button type="button" className={`navbar-link ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>Events</button>
            <button type="button" className={`navbar-link ${activeTab === 'tv' ? 'active' : ''}`} onClick={() => setActiveTab('tv')}>2gatherTV</button>
            <button type="button" className={`navbar-link ${activeTab === 'aboutUs' ? 'active' : ''}`} onClick={() => setActiveTab('aboutUs')}>About</button>
            <button type="button" className={`navbar-link ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>Contact</button>
          </nav>

          {/* Right: actions */}
          <div className="navbar-actions">
            <button
              type="button"
              className="download-pill-btn"
              onClick={() => setShowWaitlist(true)}
              id="download-app-btn"
            >
              Download App
              <span className="lightning-bolt-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </span>
            </button>
            
            {/* Subtle Theme Toggle */}
            <button
              type="button"
              className="navbar-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Main content body with floating texts and side developer anchors */}
      {/* Main content body with dynamic tab views powered by activeTab */}
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}>
        {/* Desktop Side Links */}
        <div className="desktop-only-socials">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="side-link left"
            id="github-anchor"
          >
            GITHUB
          </a>
          <a 
            href="https://discord.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="side-link right"
            id="discord-anchor"
          >
            DISCORD
          </a>
        </div>

        {/* Dynamic Animated Tab Container */}
        <div key={activeTab} className="animated-view">
          {activeTab === 'home' && (
          <div className="home-hero">
            {/* Background Video (now confined to Hero) */}
            <div className="home-bg-video-container">
              <video
                src="/home1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="home-bg-video"
              />
              <div className="home-bg-overlay"></div>
            </div>
            {/* Eyebrow badge */}
            <div className="home-hero-badge">
              <span className="home-hero-badge-dot" />
              Connect · Discover · Gather
            </div>

            <h1 className="home-hero-headline">
              Find plans, people,<br />
              and memories &mdash; all <ShinyText 
                text="2Gather." 
                disabled={false} 
                speed={3} 
                className="home-hero-highlight"
                color="#a5b4fc"
                shineColor="#ffffff"
                spread={100}
                direction="left"
              />
            </h1>

            <p className="home-hero-sub">
              Join city-based communities, discover local events,<br />
              and build real friendships — right from your phone.
            </p>

            {/* CTA row */}
            <div className="home-hero-ctas">
              <button
                type="button"
                className="home-cta-primary"
                onClick={() => setShowWaitlist(true)}
              >
                Download the App
              </button>
              <button
                type="button"
                className="home-cta-secondary"
                onClick={() => setActiveTab('communities')}
              >
                Browse Communities →
              </button>
            </div>

            {/* Scroll Down Indicator */}
            <div className="scroll-down-indicator" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
              <div className="mouse">
                <div className="wheel"></div>
              </div>
              <span className="scroll-text">SCROLL DOWN</span>
            </div>

            {/* Removed inline video as it is now in background */}
          </div>
          )}

          {activeTab === 'home' && (
            <>
              {/* Home Overlapping Marquees - Shifted up to overlap the video border */}
              <div className="home-marquees-wrapper" style={{ marginTop: '-100px', padding: '60px 0', overflow: 'hidden', position: 'relative', zIndex: 20 }}>
                <MarqueeBanner 
                  items={[
                    { text: 'JOIN YOUR TRIBE', icon: '✦' },
                    { text: 'CONNECT', icon: '✦' },
                    { text: 'DISCOVER', icon: '✦' },
                    { text: 'GATHER', icon: '✦' }
                  ]} 
                  speed={20} 
                  direction="left" 
                  color="#25D366" 
                  textColor="#064e3b"
                  tilt={3} 
                  style={{ zIndex: 9 }}
                />
                <MarqueeBanner 
                  items={[
                    { text: 'REAL FRIENDS', icon: '✦' },
                    { text: 'CITY COMMUNITIES', icon: '✦' },
                    { text: 'WHATSAPP GROUPS', icon: '✦' }
                  ]} 
                  speed={25} 
                  direction="right" 
                  color="#ffffff" 
                  textColor="#000000"
                  tilt={-3} 
                  style={{ marginTop: '-60px', zIndex: 10 }}
                />
              </div>
            </>
          )}

          {activeTab === 'home' && (
            <div style={{ width: '100%', background: '#ffffff', position: 'relative', zIndex: 10, padding: '60px 0' }}>
              <TwoGatherSlides />
            </div>
          )}

          {activeTab === 'home' && (
            <Footer onDownload={() => setShowWaitlist(true)} />
          )}

          {activeTab === 'howItWorks' && (
            <div className="inline-page-container">
              <h2 className="modal-main-title" style={{ textAlign: 'center', marginBottom: '12px' }}>HOW 2GATHER WORKS</h2>
              <p className="modal-desc" style={{ textAlign: 'center', marginBottom: '40px' }}>
                A high-performance convergence protocol engineered for advanced collaborative forces.
              </p>

              <div className="steps-container">
                <div className="step-card">
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <h4>CONVERGE</h4>
                    <p>Unite distributed top-tier minds into single-focus ambient workspaces tailored for deep synchronicity.</p>
                  </div>
                </div>

                <div className="step-card">
                  <div className="step-number">02</div>
                  <div className="step-content">
                    <h4>SYNCHRONIZE</h4>
                    <p>Harmonize technical and creative vectors in real-time using state-of-the-art visual alignment tools.</p>
                  </div>
                </div>

                <div className="step-card">
                  <div className="step-number">03</div>
                  <div className="step-content">
                    <h4>ACCELERATE</h4>
                    <p>Execute complex projects with unprecedented momentum, turning shared intelligence into immediate impact.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
                <button 
                  type="button" 
                  className="submit-btn start-exploring-btn" 
                  onClick={() => setActiveTab('communities')}
                >
                  EXPLORE COMMUNITIES →
                </button>
              </div>
            </div>
          )}

          {activeTab === 'aboutUs' && (
            <div className="inline-page-container">
              <h2 className="modal-main-title" style={{ textAlign: 'center', marginBottom: '12px' }}>About us</h2>
              <p className="modal-desc" style={{ fontStyle: 'italic', fontSize: '14px', color: '#ffffff', opacity: 0.9, textAlign: 'center', marginBottom: '36px', maxWidth: '640px', margin: '0 auto 36px' }}>
                "Making new friends can be hard, staying connected even harder. At 2gather, we turn digital handshakes into real-world hugs, because life is always better when people come together offline."
              </p>

              <div className="steps-container" style={{ gap: '24px', flexDirection: 'column' }}>
                {/* Mission */}
                <div className="step-card" style={{ flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="step-number">🎯</div>
                    <h4 style={{ margin: 0, fontSize: '16px' }}>Our Mission</h4>
                  </div>
                  <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: 0 }}>
                    At 2gather, our mission is simple: to make real-world connection effortlessly open and local. In a hyper-connected digital world, true friendships happen offline, and our platform is built to make sure you never have to gather alone.
                  </p>
                </div>

                {/* Vision */}
                <div className="step-card" style={{ flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="step-number">👁️</div>
                    <h4 style={{ margin: 0, fontSize: '16px' }}>Our Vision</h4>
                  </div>
                  <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: 0 }}>
                    To be the global network where communities discover common ground, creating lasting connections that go beyond screens. We envision a world where <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: '15px', letterSpacing: '0.2px', background: 'linear-gradient(90deg, #ff5e62, #ff9966, #ff007f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', padding: '0 3px', borderBottom: '1px dashed rgba(255,153,102,0.5)' }}>finding your next core friend or group</span> is as natural as stepping out your front door.
                  </p>
                </div>

                {/* Story */}
                <div className="step-card" style={{ flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="step-number">📖</div>
                    <h4 style={{ margin: 0, fontSize: '16px' }}>Our Story</h4>
                  </div>
                  <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: 0 }}>
                    It all started with a simple question: Why should meeting new people be so hard in the city you live in? After many app downloads that left us staring at screens, we realized we needed a tool that takes people off their devices and into life.
                  </p>
                  <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: 0, marginTop: '4px' }}>
                    From spontaneous meetups and gaming nights to local forums and community events, 2gather bridges the gap between digital discovery and authentic real-world presence.
                  </p>
                </div>

                {/* Values */}
                <div className="step-card" style={{ flexDirection: 'column', gap: '12px', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="step-number">💎</div>
                    <h4 style={{ margin: 0, fontSize: '16px' }}>Our Values</h4>
                  </div>
                  <p style={{ fontSize: '12px', color: '#ffffff', opacity: 0.8, margin: 0 }}>
                    These core principles guide everything we do at 2gather:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', marginTop: '6px' }}>
                    <div style={{ fontSize: '12px', lineHeight: '1.5' }}>
                      <strong style={{ color: '#ffffff' }}>❤️ Real Connections</strong>
                      <div style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>No superficial likes, just genuine shared human presence.</div>
                    </div>
                    <div style={{ fontSize: '12px', lineHeight: '1.5' }}>
                      <strong style={{ color: '#ffffff' }}>🛡️ Safety First</strong>
                      <div style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>Secure groups, verified users, and trusted community standards.</div>
                    </div>
                    <div style={{ fontSize: '12px', lineHeight: '1.5' }}>
                      <strong style={{ color: '#ffffff' }}>🌍 Inclusivity</strong>
                      <div style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>A welcoming space for every interest, culture, and background.</div>
                    </div>
                    <div style={{ fontSize: '12px', lineHeight: '1.5' }}>
                      <strong style={{ color: '#ffffff' }}>✨ Fun & Spontaneity</strong>
                      <div style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>Because the best memories are unplanned.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
                <button 
                  type="button" 
                  className="submit-btn start-exploring-btn" 
                  onClick={() => setActiveTab('communities')}
                >
                  EXPLORE COMMUNITIES →
                </button>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="inline-page-container">
              <h2 className="modal-main-title" style={{ textAlign: 'center', marginBottom: '12px' }}>GET IN TOUCH</h2>
              <p className="modal-desc" style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
                Have questions about our tribes or events? Our team is here to help you find your collective.
              </p>

              <div className="contact-grid">
                <div className="contact-form-side">
                  <form className="premium-contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent! We will get back to you soon.'); }}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>YOUR NAME</label>
                        <input type="text" placeholder="John Doe" required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>EMAIL ADDRESS</label>
                        <input type="email" placeholder="john@example.com" required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>MESSAGE</label>
                        <textarea placeholder="How can we help you?" rows="4" required></textarea>
                      </div>
                    </div>
                    <button type="submit" className="submit-btn contact-submit-btn">
                      SEND MESSAGE →
                    </button>
                  </form>
                </div>

                <div className="contact-info-side">
                  <div className="contact-info-card">
                    <div className="info-item">
                      <span className="info-emoji">📍</span>
                      <div className="info-text">
                        <strong>HEADQUARTERS</strong>
                        <p>Bangalore, Karnataka, India</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-emoji">✉️</span>
                      <div className="info-text">
                        <strong>EMAIL US</strong>
                        <p>hello@2gather.app</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-emoji">💬</span>
                      <div className="info-text">
                        <strong>WHATSAPP</strong>
                        <p>+91 98765 43210</p>
                      </div>
                    </div>
                  </div>

                  <div className="contact-socials">
                    <p>FOLLOW THE JOURNEY</p>
                    <div className="social-pills">
                      <a href="#" className="social-pill">INSTAGRAM</a>
                      <a href="#" className="social-pill">TWITTER</a>
                      <a href="#" className="social-pill">LINKEDIN</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="fullpage-dashboard-container" style={{ position: 'relative', width: '100%', margin: '0', zIndex: 5, overflow: 'hidden', minHeight: '100vh' }}>
              
              {/* Background Video Layer */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, overflow: 'hidden' }}>
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                  <source src="/eventsbg.mp4" type="video/mp4" />
                </video>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
              </div>
              
              {/* Scrolling Content Container */}
              <div style={{ position: 'relative', zIndex: 10, marginTop: '100vh', display: 'flex', flexDirection: 'column' }}>
                
                {/* Green Events Banner */}
                <div style={{ width: '100%', background: '#25D366' }}>
                  <MarqueeBanner 
                    items={[
                      { text: 'PUNE', icon: '🌸' },
                      { text: 'HYDERABAD', icon: '🍛' },
                      { text: 'MUMBAI', icon: '🌊' },
                      { text: 'DELHI', icon: '🏛️' },
                      { text: 'BANGALORE', icon: '🌸' }
                    ]} 
                    speed={20} 
                    direction="right" 
                    color="#25D366" 
                    textColor="#ffffff"
                    tilt={0} 
                  />
                </div>

                <Footer onDownload={() => setShowWaitlist(true)} />
              </div>
            </div>
          )}

          {activeTab === 'tv' && (
            <div className="fullpage-dashboard-container" style={{ position: 'relative', width: '100%', margin: '0', zIndex: 5, overflowY: 'auto', minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column' }}>
              
              {/* Background with Vignette */}
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                <img src="/2gathertvbg.png" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'blur(4px) brightness(0.6)', transform: 'scale(1.05)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)' }} />
              </div>

              <div style={{ position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: '60px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px', width: '100%', maxWidth: '600px', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src="/2gathertv.png" alt="2gatherTV" style={{ width: '100%', maxWidth: '480px', height: 'auto', objectFit: 'contain' }} />
                  <p style={{ color: '#aaa', marginTop: '0', fontSize: '1.15rem', fontFamily: 'Nunito, sans-serif', maxWidth: '85%', lineHeight: '1.5' }}>
                    Drag around the dome to explore galleries from past gatherings and memories shared by the community.
                  </p>
                </div>
                
                <div style={{ width: '100%', maxWidth: '900px', padding: '0 20px', margin: '0 auto' }}>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <img src="/frametv.png" alt="TV Frame" style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none', position: 'relative', zIndex: 10 }} />
                    <div style={{ position: 'absolute', inset: '6% 4% 10% 4%', borderRadius: '24px', overflow: 'hidden', background: '#000', zIndex: 5 }}>
                      <DomeGallery />
                    </div>
                  </div>
                </div>
              </div>
              <Footer onDownload={() => setShowWaitlist(true)} />
            </div>
          )}



          {activeTab === 'communities' && (
            <div className="tribes-view-container" style={{ width: '100%', position: 'relative', background: '#000', minHeight: '100vh', overflow: 'hidden' }}>
              
              {/* Layered Background System */}
              <div className="tribes-bg-layer" style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 0, pointerEvents: 'none' }}>
                {/* tribe.png at the top */}
                <div style={{ 
                  width: '100%', 
                  height: '0', 
                  paddingBottom: '56.25%', // Maintain aspect ratio
                  backgroundImage: 'url("/tribe.png")', 
                  backgroundSize: '100% auto', 
                  backgroundRepeat: 'no-repeat' 
                }} />
                
                {/* tribe1.png following tribe.png */}
                <div style={{ 
                  width: '100%', 
                  height: '0', 
                  paddingBottom: '65%', 
                  backgroundImage: 'url("/tribe1.png")', 
                  backgroundSize: '100% auto', 
                  backgroundRepeat: 'no-repeat',
                  marginTop: '-1px',
                  filter: 'brightness(1.2) contrast(1.05)'
                }} />

                {/* Unified dark overlay for the entire background stack */}
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.95) 100%)',
                  zIndex: 1
                }} />
              </div>

              {/* Content on top */}
              <div style={{ position: 'relative', zIndex: 5 }}>
                <WhatsAppCommunityPage hideHeader={true} hideTicker={true} />
              </div>
              {/* Footer */}
              <div style={{ position: 'relative', zIndex: 5 }}>
                <Footer onDownload={() => setShowWaitlist(true)} />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Social Links Overlay */}
        <div className="mobile-socials" style={{ display: 'none' }}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="side-link">
            GITHUB
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="side-link">
            DISCORD
          </a>
        </div>
      </main>

      {/* Waitlist Drawer / Glassmorphic Modal Overlay */}
      {showWaitlist && (
        <div className="waitlist-overlay" onClick={() => setShowWaitlist(false)}>
          <div 
            className="waitlist-modal" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            id="waitlist-modal"
          >
            <button 
              type="button" 
              className="modal-close" 
              onClick={() => setShowWaitlist(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            {!submitted ? (
              <form onSubmit={handleWaitlistSubmit} className="waitlist-form">
                <h2 id="modal-title">SECURE YOUR MEMBERSHIP</h2>
                <p className="modal-desc">
                  Enter your credentials to claim priority access to the 2gather unified collaboration ecosystem.
                </p>
                <div className="input-group">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL" 
                    required 
                    autoFocus
                    id="waitlist-email-input"
                  />
                  <button type="submit" className="submit-btn" id="waitlist-submit-btn">
                    ACCESS →
                  </button>
                </div>
                <div className="modal-footer-note">
                  STRICTLY SECURE ALLOCATION • ZERO SPAM GUARANTEE
                </div>
              </form>
            ) : (
              <div className="success-view">
                <div className="success-icon">✓</div>
                <h3>CREDENTIALS LOGGED</h3>
                <p>Your trajectory is set. Welcome to the collective.</p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/yournumber"
        className="whatsapp-fab"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

export default App;
