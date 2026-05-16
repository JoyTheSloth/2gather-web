import { useState } from "react";
import AnimatedList from "./src/AnimatedList";
import DomeGallery from "./src/DomeGallery";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

  * { box-sizing: border-box; }

  .bk-wrap {
    width: 100%;
    min-height: 100vh;
    font-family: 'Nunito', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    background: #ffffff;
  }

  .bk-book {
    position: relative;
    width: 100%;
    max-width: 1100px;
    background: #5B31CC;
    border-radius: 24px;
    padding: 16px 16px 72px 16px;
    box-shadow: 
      inset 0 6px 12px rgba(255,255,255,0.2),
      inset 0 -6px 12px rgba(0,0,0,0.2),
      0 20px 50px rgba(0,0,0,0.15);
  }

  .bk-pages {
    position: relative;
    border-radius: 12px;
    display: flex;
    overflow: visible;
    min-height: 480px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }

  .bk-left {
    width: 50%;
    position: relative;
    background-color: #FDF4F8;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    z-index: 2;
    background-image: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E"),
      linear-gradient(to right, rgba(0,0,0,0.02) 0%, transparent 5%, transparent 95%, rgba(0,0,0,0.08) 100%);
  }

  .bk-right {
    width: 50%;
    position: relative;
    background-color: #FCF8F5;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    z-index: 1;
    background-image: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E"),
      linear-gradient(to left, rgba(0,0,0,0.02) 0%, transparent 5%, transparent 95%, rgba(0,0,0,0.1) 100%),
      repeating-linear-gradient(transparent, transparent 39px, rgba(0,0,0,0.03) 39px, rgba(0,0,0,0.03) 40px);
    background-position: top center;
    background-size: 200px 200px, 100% 100%, 100% 40px;
  }

  .bk-crease {
    position: absolute;
    left: 50%;
    top: 0; bottom: 0;
    width: 40px;
    transform: translateX(-50%);
    background: linear-gradient(to right, 
      transparent 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 60%, transparent 100%);
    z-index: 3;
    pointer-events: none;
  }

  .bk-rings {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 60px; bottom: 60px;
    z-index: 4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;
  }
  .bk-ring-group {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .bk-hole {
    width: 14px; height: 14px;
    background: #333;
    border-radius: 50%;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.8);
    position: absolute;
  }
  .bk-hole.left { left: -18px; }
  .bk-hole.right { right: -18px; }
  .bk-ring {
    width: 36px; height: 12px;
    background: linear-gradient(to bottom, #f0f0f0 0%, #b0b0b0 40%, #e0e0e0 60%, #808080 100%);
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.8);
    z-index: 5;
  }

  .bk-tape {
    position: absolute;
    width: 80px; height: 24px;
    background: rgba(180, 150, 230, 0.5);
    backdrop-filter: blur(2px);
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    z-index: 15;
    clip-path: polygon(
      0% 5%, 5% 0%, 10% 8%, 15% 0%, 20% 5%, 25% 0%, 30% 8%, 35% 0%, 40% 5%, 45% 0%, 50% 8%, 
      55% 0%, 60% 5%, 65% 0%, 70% 8%, 75% 0%, 80% 5%, 85% 0%, 90% 8%, 95% 0%, 100% 5%,
      100% 95%, 95% 100%, 90% 92%, 85% 100%, 80% 95%, 75% 100%, 70% 92%, 65% 100%, 60% 95%, 55% 100%,
      50% 92%, 45% 100%, 40% 95%, 35% 100%, 30% 92%, 25% 100%, 20% 95%, 15% 100%, 10% 92%, 5% 100%, 0% 95%
    );
  }

  .bk-page-num {
    position: absolute;
    top: 0; left: 0;
    background: #5B31CC;
    color: white;
    padding: 16px 20px 20px 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 12px;
    z-index: 10;
    line-height: 1;
    box-shadow: 4px 4px 10px rgba(0,0,0,0.15);
  }
  .bk-page-num::after {
    content: '';
    position: absolute;
    top: 0; right: -8px;
    width: 8px; height: 100%;
    background: #3A1B8C;
    border-bottom-right-radius: 20px;
    clip-path: polygon(0 0, 0 100%, 100% 100%);
  }
  .bk-page-num .num { font-size: 2.2rem; font-weight: 900; }
  .bk-page-num .of { font-size: 0.8rem; font-weight: 700; opacity: 0.8; margin-top: 4px; text-align: center; }

  .bk-bubble-top {
    position: relative;
    background: #3115A5;
    color: white;
    display: inline-block;
    padding: 10px 28px;
    border-radius: 50px;
    font-size: 2rem;
    font-weight: 900;
    border: 6px solid white;
    box-shadow: 0 8px 24px rgba(49,21,165,0.3);
    white-space: nowrap;
    z-index: 2;
  }
  .bk-bubble-top::after {
    content: ''; position: absolute; bottom: -18px; right: 32px;
    width: 0; height: 0; border-left: 14px solid transparent; border-right: 14px solid transparent; border-top: 18px solid white;
  }
  .bk-bubble-top::before {
    content: ''; position: absolute; bottom: -11px; right: 34px;
    width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 13px solid #3115A5; z-index: 1;
  }
  .bk-smiley {
    position: absolute; right: -24px; top: 50%; transform: translateY(-50%) rotate(10deg);
    width: 48px; height: 48px; border-radius: 50%; background: #FDE047; border: 4px solid white;
    display: flex; align-items: center; justify-content: center; font-size: 1.8rem;
    box-shadow: 0 6px 16px rgba(0,0,0,0.15); z-index: 5; color: black;
  }

  .bk-bubble-bottom {
    position: relative;
    background: #FF6B00; color: white; display: inline-block;
    padding: 10px 36px 14px 36px; border-radius: 40px; font-size: 4.8rem; font-weight: 900; line-height: 1;
    border: 8px solid white; box-shadow: 0 12px 30px rgba(255,107,0,0.3);
    margin-top: 4px; margin-left: 20px; letter-spacing: -2px; z-index: 1;
  }
  .bk-bubble-bottom::after {
    content: ''; position: absolute; top: -22px; left: 40px;
    width: 0; height: 0; border-left: 16px solid transparent; border-right: 16px solid transparent; border-bottom: 22px solid white;
  }
  .bk-bubble-bottom::before {
    content: ''; position: absolute; top: -12px; left: 42px;
    width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-bottom: 14px solid #FF6B00; z-index: 1;
  }

  .bk-polaroid {
    position: relative; transform: rotate(-3deg); background: white;
    padding: 12px 12px 44px 12px; box-shadow: 0 16px 36px rgba(0,0,0,0.15);
    border-radius: 4px; margin: 24px 24px 0 24px; z-index: 5;
  }
  .bk-polaroid img { width: 100%; height: 200px; object-fit: cover; border-radius: 2px; display: block; }

  .bk-sticky {
    position: absolute; background: #FFF8D6; transform: rotate(2deg);
    padding: 16px 20px; border-radius: 2px; box-shadow: 2px 8px 20px rgba(0,0,0,0.1);
    font-size: 1.05rem; font-weight: 800; color: #4B2A7B; line-height: 1.6;
    bottom: -30px; left: 40px; z-index: 6;
  }
  .bk-sticky::after {
    content: ""; position: absolute; bottom: 0; right: 0;
    border-width: 0 0 16px 16px; border-style: solid; border-color: transparent transparent #e6ddb8 #e6ddb8;
    box-shadow: -2px -2px 4px rgba(0,0,0,0.05);
  }

  .bk-swipe-btn {
    background: #5B31CC; color: white; font-family: 'Nunito', sans-serif;
    font-size: 1.25rem; font-weight: 900; padding: 14px 32px; border-radius: 50px;
    border: 4px solid white; box-shadow: 0 8px 24px rgba(91,49,204,0.4);
    cursor: pointer; transition: transform 0.2s; white-space: nowrap; position: relative; z-index: 6;
  }
  .bk-swipe-btn:hover { transform: scale(1.04); }

  .bk-right-content {
    padding: 30px 48px 30px 48px; display: flex; flex-direction: column; gap: 20px; height: 100%;
  }

  .bk-def-card {
    background: white; border: 2px dashed #B8A8E0; border-radius: 20px;
    padding: 24px 28px; position: relative; box-shadow: 0 8px 24px rgba(0,0,0,0.04);
  }
  .bk-def-text { font-size: 1.25rem; font-weight: 800; color: #231942; line-height: 1.8; text-align: center; margin: 0; }

  .bk-think-card {
    background: #FFFaf2; border-radius: 12px; padding: 18px 24px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.06); position: relative; width: fit-content; align-self: center;
    border: 1px solid rgba(0,0,0,0.03);
  }
  .bk-think-label {
    position: absolute; top: -16px; left: 50%; transform: translateX(-50%);
    background: #5B31CC; color: white; padding: 6px 20px; border-radius: 50px;
    font-size: 1.1rem; font-weight: 900; box-shadow: 0 4px 12px rgba(91,49,204,0.3); white-space: nowrap;
  }
  .bk-think-text { font-size: 1.15rem; font-weight: 700; color: #2A2255; line-height: 1.6; margin: 0; text-align: center; }

  .bk-chips { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 8px; }
  .bk-chip {
    background: white; border: 2px solid #E5DCFF; border-radius: 50px; padding: 10px 20px;
    font-family: 'Nunito', sans-serif; font-size: 1.05rem; font-weight: 800; color: #444;
    box-shadow: 0 4px 12px rgba(0,0,0,0.04); display: flex; align-items: center; gap: 8px; white-space: nowrap;
  }
  .bk-chip:hover { border-color: #5B31CC; transform: translateY(-2px); transition: all 0.2s; }

  .bk-badges { display: flex; justify-content: center; gap: 20px; margin-top: 10px; }
  .bk-badge { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .bk-badge-circle { 
    width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 2px solid transparent;
  }
  .bk-badge-text { font-size: 0.95rem; font-weight: 800; color: #5B31CC; }

  .bk-tribe-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 10px; }
  .bk-tribe-card { 
    background: white; border: 2px solid #F0E8FF; border-radius: 12px; padding: 12px;
    display: flex; align-items: center; gap: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  }
  .bk-tribe-icon { font-size: 1.6rem; }
  .bk-tribe-info { display: flex; flex-direction: column; }
  .bk-tribe-title { font-size: 1.05rem; font-weight: 900; color: #1A1759; line-height: 1.2; }
  .bk-tribe-sub { font-size: 0.85rem; font-weight: 700; color: #888; }

  .bk-emojis { display: flex; gap: 20px; justify-content: center; margin-top: auto; font-size: 2.4rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15)); }
  .bk-emojis span { display: inline-block; }

  .bk-tabs {
    position: absolute; right: -48px; top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 8px; z-index: 0;
  }
  .bk-tab {
    width: 60px; height: 70px; border-top-right-radius: 20px; border-bottom-right-radius: 20px;
    display: flex; align-items: center; justify-content: center; font-size: 1.6rem;
    box-shadow: 6px 4px 12px rgba(0,0,0,0.2); cursor: pointer; transition: width 0.2s; color: white;
  }
  .bk-tab:hover { width: 70px; }

  .bk-nav-container {
    position: absolute; bottom: -32px; left: 50%; transform: translateX(-50%);
    background: #EEDDFF; padding: 8px 12px; border-radius: 50px;
    display: flex; align-items: center; gap: 24px; box-shadow: 0 8px 20px rgba(0,0,0,0.15); z-index: 20;
  }
  .bk-nav-prev { background: transparent; border: none; font-family: 'Nunito', sans-serif; font-size: 1rem; font-weight: 800; color: #5B31CC; cursor: pointer; padding: 8px 16px; }
  .bk-nav-next { background: #5B31CC; border: none; border-radius: 50px; padding: 10px 24px; font-family: 'Nunito', sans-serif; font-size: 1rem; font-weight: 900; color: white; cursor: pointer; box-shadow: 0 4px 12px rgba(91,49,204,0.3); transition: transform 0.15s; }
  .bk-nav-next:hover { transform: scale(1.05); }

  .bk-dots { display: flex; align-items: center; gap: 6px; }
  .bk-dot { height: 8px; border-radius: 50px; background: #C4B5FD; transition: all 0.3s; border: none; cursor: pointer; padding: 0; }
  .bk-dot.on { width: 24px; background: #5B31CC; }
  .bk-dot:not(.on) { width: 8px; }
  .bk-nav-text { font-family: 'Nunito', sans-serif; font-weight: 900; font-size: 1.05rem; color: #5B31CC; margin-left: 8px; }

  @keyframes bk-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  .bk-float { animation: bk-float 3s ease-in-out infinite; }
  @keyframes bk-floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-6px) rotate(8deg)} }
  .bk-floatB { animation: bk-floatB 4s ease-in-out infinite; }
`;

/* ─── Starburst SVG (2gather logo mark) ─── */
function StarBurst({ size = 18 }) {
  const n = 7;
  return (
    <svg width={size * 2.2} height={size * 2.2} viewBox={`${-size * 1.1} ${-size * 1.1} ${size * 2.2} ${size * 2.2}`} className="bk-starburst" style={{ display: 'block', flexShrink: 0 }}>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(a) * size * 0.82, y = Math.sin(a) * size * 0.82;
        return i === n - 1
          ? <rect key={i} x={x - size * 0.13} y={y - size * 0.13} width={size * 0.32} height={size * 0.32} rx={size * 0.06} fill="#f97316" transform={`rotate(${a * 180 / Math.PI + 45},${x},${y})`} />
          : <rect key={i} x={x - size * 0.13} y={y - size * 0.28} width={size * 0.27} height={size * 0.56} rx={size * 0.07} fill="#5B31CC" transform={`rotate(${a * 180 / Math.PI},${x},${y})`} />;
      })}
    </svg>
  );
}

/* ─── Slide 1: What is 2gather? ─── */
function Slide1() {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      {/* ── LEFT PAGE ── */}
      <div className="bk-left">
        <div className="bk-page-num">
          <div className="num">01</div>
          <div className="of">of 07</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '24px' }}>
          <StarBurst size={18} />
          <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1A1759', letterSpacing: '-0.5px' }}>2gather</span>
        </div>

        <div style={{ padding: '20px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', position: 'relative' }}>
          {/* Decorations */}
          <div style={{ position: 'absolute', top: 90, left: 28, fontSize: '0.9rem', color: '#FF6B00' }}>✦</div>
          <div style={{ position: 'absolute', top: 120, left: 60, fontSize: '1.4rem' }} className="bk-floatB">⭐</div>
          <div style={{ position: 'absolute', top: 60, right: 80, fontSize: '1rem', color: '#EC4899', transform: 'rotate(15deg)' }}>💕</div>
          <div style={{ position: 'absolute', top: 100, right: 60, fontSize: '0.6rem', color: '#5B31CC' }}>✦</div>

          <div style={{ position: 'relative', alignSelf: 'flex-start', marginLeft: '16px' }}>
            <div className="bk-bubble-top">What is</div>
            <div className="bk-smiley">😊</div>
          </div>

          <div className="bk-bubble-bottom">2gather?</div>
        </div>

        <div style={{ padding: '14px 24px 0', position: 'relative' }}>
          <div className="bk-tape" style={{ top: 14, left: 0, transform: 'rotate(-15deg)' }} />
          <div className="bk-polaroid">
            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop" alt="friends gathering" />
          </div>

          <div className="bk-sticky" style={{ bottom: -20, left: 10 }}>
            Good people<br />Great vibes<br />Real memories <span style={{color: '#EC4899'}}>💕</span>
          </div>

          <div style={{ position: 'absolute', bottom: -15, right: 20, zIndex: 10 }}>
            <button className="bk-swipe-btn" style={{ padding: '10px 24px', lineHeight: 1.2, textAlign: 'center' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, display: 'block' }}>swipe to</span>
              know more →
            </button>
            <div style={{ position: 'absolute', bottom: 10, left: -30, fontSize: '1.4rem', color: '#EC4899', transform: 'rotate(-20deg)' }}>✨</div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PAGE ── */}
      <div className="bk-right">
        <div className="bk-right-content">
          {/* Decorations */}
          <div style={{ position: 'absolute', top: 20, right: 60, fontSize: '1.8rem' }}>📎</div>
          <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '1.6rem' }} className="bk-floatB">⭐</div>
          <div style={{ position: 'absolute', top: 180, right: 40, fontSize: '0.8rem', color: '#7B55E8' }}>✦</div>
          <div style={{ position: 'absolute', top: 260, left: 30, fontSize: '1.2rem', color: '#EC4899' }}>💕</div>
          <div style={{ position: 'absolute', top: 320, right: 50, fontSize: '1rem', color: '#3B82F6' }}>✈️</div>

          <div className="bk-def-card">
            <div className="bk-tape" style={{ top: -10, right: -20, transform: 'rotate(25deg)', width: '60px', height: '20px' }} />
            <div style={{ position: 'absolute', top: -16, left: 20, fontSize: '2rem' }}>⭐</div>
            <p className="bk-def-text">
              <span style={{ color: '#5B31CC', fontWeight: 900 }}>2gather</span> is an app where you can{' '}
              <span style={{ color: '#FF6B00', fontWeight: 900 }}>discover real-life events</span>,
              <br />join <span style={{ color: '#EC4899', fontWeight: 900 }}>Tribes</span> built around your hobbies,
              <br />meet <span style={{ color: '#10B981', fontWeight: 900 }}>like-minded people</span>,
              <br />and make <span style={{ color: '#7B55E8', fontWeight: 900 }}>memories</span> that last —
              <br />all offline.
            </p>
          </div>

          <div className="bk-think-card">
            <div className="bk-think-label">
              Think of it as...
              <span style={{ position: 'absolute', right: -16, top: -4, fontSize: '1.4rem', transform: 'rotate(15deg)' }}>💕</span>
            </div>
            <p className="bk-think-text">
              Your space to explore,<br />
              connect, and do what<br />
              you love — <span style={{ color: '#EC4899', fontStyle: 'italic', fontWeight: 900 }}>together.</span>
            </p>
          </div>

          <div className="bk-chips">
            {[
              { e: '☕', l: 'Coffee Meets' },
              { e: '🥾', l: 'Hiking' },
              { e: '🎮', l: 'Gaming' },
              { e: '📸', l: 'Photography' },
              { e: '🎵', l: 'Music' },
              { e: '🍜', l: 'Food Trails' },
            ].map(c => (
              <div key={c.l} className="bk-chip"><span>{c.e}</span> {c.l}</div>
            ))}
          </div>

          <div className="bk-emojis bk-float">
            <span>🧑‍🤝‍🧑</span><span>🎸</span><span>🔥</span><span>🎒</span><span>😃</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 2: What is a Tribe? ─── */
function Slide2() {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      {/* ── LEFT PAGE ── */}
      <div className="bk-left">
        <div className="bk-page-num">
          <div className="num">02</div>
          <div className="of">of 07</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '24px' }}>
          <StarBurst size={18} />
          <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1A1759', letterSpacing: '-0.5px' }}>2gather</span>
        </div>

        <div style={{ padding: '20px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', position: 'relative' }}>
          {/* Decorations */}
          <div style={{ position: 'absolute', top: 90, left: 28, fontSize: '0.9rem', color: '#FF6B00' }}>✦</div>
          <div style={{ position: 'absolute', top: 120, left: 60, fontSize: '1.4rem' }} className="bk-floatB">⭐</div>
          <div style={{ position: 'absolute', top: 60, right: 80, fontSize: '1rem', color: '#EC4899', transform: 'rotate(15deg)' }}>💕</div>
          <div style={{ position: 'absolute', top: 100, right: 60, fontSize: '0.6rem', color: '#5B31CC' }}>✦</div>

          <div style={{ position: 'relative', alignSelf: 'flex-start', marginLeft: '16px' }}>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }} className="bk-bubble-top" style={{ padding: '10px 28px' }}>What is a</motion.div>
            <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 10 }} transition={{ type: 'spring', delay: 0.3 }} className="bk-smiley">😊</motion.div>
          </div>

          <motion.div initial={{ scale: 0.5, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }} className="bk-bubble-bottom" style={{ fontSize: '4.4rem', padding: '10px 42px 14px 42px' }}>Tribe?</motion.div>
        </div>

        <div style={{ padding: '14px 24px 0', position: 'relative' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="bk-tape" style={{ top: 14, left: 0, transform: 'rotate(-15deg)' }} />
          <motion.div initial={{ y: 50, opacity: 0, rotate: -20 }} animate={{ y: 0, opacity: 1, rotate: -3 }} transition={{ type: 'spring', damping: 14, delay: 0.4 }} className="bk-polaroid">
            <img src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=900&auto=format&fit=crop" alt="tribe gathering" style={{ height: '200px' }} />
          </motion.div>

          <motion.div initial={{ scale: 0, x: -20 }} animate={{ scale: 1, x: 0 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.6 }} className="bk-sticky">
            Good people<br />Great vibes<br />Real memories 💜
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PAGE ── */}
      <div className="bk-right">
        <div className="bk-right-content" style={{ padding: '30px 40px', gap: '16px' }}>
          {/* Decorations */}
          <div style={{ position: 'absolute', top: 20, right: 60, fontSize: '1.8rem', zIndex: 10 }}>📎</div>
          <div style={{ position: 'absolute', top: 30, left: 20, fontSize: '1.6rem', zIndex: 10 }} className="bk-floatB">⭐</div>

          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', damping: 15, delay: 0.3 }} className="bk-def-card" style={{ padding: '24px 32px' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="bk-tape" style={{ top: -10, right: -20, transform: 'rotate(25deg)', width: '60px', height: '20px' }} />
            <p className="bk-def-text" style={{ fontSize: '1.15rem' }}>
              A <span style={{ color: '#FF6B00', fontWeight: 900 }}>Tribe</span> is a community built around a{' '}
              <span style={{ color: '#5B31CC', fontWeight: 900 }}>shared interest</span> like football,
              music, board games, hiking —
              where members <span style={{ color: '#EC4899', fontWeight: 900 }}>meet regularly</span> at{' '}
              <span style={{ color: '#FF8A00', fontWeight: 900 }}>real-world events.</span>
            </p>
          </motion.div>

          <div className="bk-badges">
            {[
              { t: 'Connect', e: '👥', bg: '#F0E8FF', bc: '#C4B5FD', c: '#5B31CC' },
              { t: 'Share', e: '❤️', bg: '#FFE4E6', bc: '#FDA4AF', c: '#E11D48' },
              { t: 'Create Memories', e: '📷', bg: '#FFEDD5', bc: '#FDBA74', c: '#EA580C' }
            ].map((b, i) => (
              <motion.div key={i} initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.5 + i * 0.1 }} className="bk-badge">
                <div className="bk-badge-circle" style={{ background: b.bg, borderColor: b.bc, color: b.c }}>{b.e}</div>
                <span className="bk-badge-text" style={{ color: b.c }}>{b.t}</span>
              </motion.div>
            ))}
          </div>

          <div style={{ flex: 1, minHeight: 0, marginTop: '10px' }}>
            <AnimatedList 
              items={[
                { e: '🥾', t: 'Hikers Club', s: '1.3K Members', c: '#10B981' },
                { e: '📚', t: 'Bookworms', s: '876 Members', c: '#3B82F6' },
                { e: '🍜', t: 'Foodies', s: '2.1K Members', c: '#EF4444' },
                { e: '🎮', t: 'Gamers Night', s: '654 Members', c: '#8B5CF6' },
                { e: '📸', t: 'Photo Walkers', s: '920 Members', c: '#6B7280' },
                { e: '🎵', t: 'Jam Sessions', s: '430 Members', c: '#4F46E5' },
                { e: '🏃', t: 'Runners', s: '1.1K Members', c: '#F59E0B' },
                { e: '🎬', t: 'Cinephiles', s: '890 Members', c: '#6366F1' },
                { e: '🎨', t: 'Art Studio', s: '500 Members', c: '#EC4899' },
                { e: '🍷', t: 'Wine Tasting', s: '320 Members', c: '#9333EA' }
              ]}
              showGradients={true}
              displayScrollbar={false}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── Slide 3: Events / 2gatherTv ─── */
function Slide3() {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      {/* ── LEFT PAGE ── */}
      <div className="bk-left">
        <div className="bk-page-num">
          <div className="num">03</div>
          <div className="of">of 07</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '24px' }}>
          <StarBurst size={18} />
          <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1A1759', letterSpacing: '-0.5px' }}>2gather</span>
        </div>

        <div style={{ padding: '20px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', position: 'relative' }}>
          <div style={{ position: 'relative', alignSelf: 'flex-start', marginLeft: '16px' }}>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }} className="bk-bubble-top" style={{ padding: '10px 28px', background: '#EC4899', color: '#FFF' }}>The</motion.div>
            <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 10 }} transition={{ type: 'spring', delay: 0.3 }} className="bk-smiley" style={{ background: '#3B82F6' }}>📺</motion.div>
          </div>

          <motion.div initial={{ scale: 0.5, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }} className="bk-bubble-bottom" style={{ fontSize: '3.6rem', padding: '10px 32px 14px 32px', background: '#1A1759', color: '#FFF' }}>2gatherTv</motion.div>
        </div>

        <div style={{ padding: '14px 24px 0', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: 'spring' }} style={{ width: '100%', height: '260px', position: 'relative', marginTop: '10px' }}>
            <div style={{ position: 'absolute', inset: '8% 6% 12% 6%', overflow: 'hidden', borderRadius: '16px', background: '#000' }}>
              <DomeGallery />
            </div>
            <img src="/frametv.png" alt="TV Frame" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none', objectFit: 'fill' }} />
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PAGE ── */}
      <div className="bk-right">
        <div className="bk-right-content" style={{ padding: '30px 40px', gap: '16px' }}>
          {/* Decorations */}
          <div style={{ position: 'absolute', top: 20, right: 60, fontSize: '1.8rem', zIndex: 10 }}>📼</div>
          
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', damping: 15, delay: 0.3 }} className="bk-def-card" style={{ padding: '24px 32px' }}>
            <div className="bk-tape" style={{ top: -10, left: -20, transform: 'rotate(-25deg)', width: '60px', height: '20px' }} />
            <p className="bk-def-text" style={{ fontSize: '1.15rem' }}>
              Tune into <span style={{ color: '#FF6B00', fontWeight: 900 }}>events</span> happening around you. 
              Drag around the dome to explore galleries from past gatherings and <span style={{ color: '#5B31CC', fontWeight: 900 }}>memories</span> shared by the community.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SLIDE REGISTRY
───────────────────────────────────────────────────────── */
const SLIDES = [
  { id: 'what', component: Slide1 },
  { id: 'tribe', component: Slide2 },
  { id: 'event', component: Slide3 },
  { id: 'where', component: () => <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', fontSize:'2rem', color:'#10B981', fontFamily:'Nunito,sans-serif', fontWeight:900 }}>📍 Where — Coming soon</div> },
  { id: 'chief', component: () => <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', fontSize:'2rem', color:'#f97316', fontFamily:'Nunito,sans-serif', fontWeight:900 }}>👑 Chief — Coming soon</div> },
  { id: 'join',  component: () => <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', fontSize:'2rem', color:'#EC4899', fontFamily:'Nunito,sans-serif', fontWeight:900 }}>🚀 Join — Coming soon</div> },
  { id: 'qa',    component: () => <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', fontSize:'2rem', color:'#7B55E8', fontFamily:'Nunito,sans-serif', fontWeight:900 }}>❓ Questions — Coming soon</div> },
];

/* ─────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────── */
export default function TwoGatherSlides() {
  const [cur, setCur] = useState(0);
  const goTo = (n) => { if (n >= 0 && n < SLIDES.length) setCur(n); };
  const Comp = SLIDES[cur].component;

  return (
    <>
      <style>{CSS}</style>
      <div className="bk-wrap">
        <div className="bk-book">
          <div className="bk-pages">
            <div className="bk-crease" />

            <div className="bk-rings">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bk-ring-group">
                  <div className="bk-hole left" />
                  <div className="bk-ring" />
                  <div className="bk-hole right" />
                </div>
              ))}
            </div>

            <Comp />

            <div className="bk-tabs">
              {[
                { bg: '#7B55E8', e: '👥' },
                { bg: '#FF8A00', e: '📅' },
                { bg: '#EC4899', e: '💖' },
                { bg: '#3B82F6', e: '🛡️' },
                { bg: '#10B981', e: '✨' },
              ].map((t, i) => (
                <div key={i} className="bk-tab" style={{ background: t.bg }}>{t.e}</div>
              ))}
            </div>
          </div>

          {/* Bottom Nav positioned on the purple cover */}
          <div className="bk-nav-container">
            <button className="bk-nav-prev" onClick={() => goTo(cur - 1)} disabled={cur === 0}>
              ← Prev
            </button>

            <div className="bk-dots">
              {SLIDES.map((_, i) => (
                <button key={i} className={`bk-dot${cur === i ? ' on' : ''}`} onClick={() => goTo(i)} />
              ))}
              <span className="bk-nav-text">
                {cur + 1} / {SLIDES.length}
              </span>
            </div>

            <button className="bk-nav-next" onClick={() => goTo(cur + 1)} disabled={cur === SLIDES.length - 1}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
