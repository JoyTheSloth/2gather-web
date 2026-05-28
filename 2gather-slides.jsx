import { useState } from "react";
import AnimatedList from "./src/AnimatedList";
import ModelViewer from "./src/ModelViewer";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   STYLES
   ───────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Caveat:wght@600;700&family=Outfit:wght@800;900&display=swap');

  * { box-sizing: border-box; }

  .bk-wrap {
    width: 100%;
    min-height: 100vh;
    font-family: 'Nunito', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    position: relative;
    overflow: hidden;
    transition: background 0.3s ease;
  }

  .bk-title-above {
    font-family: 'Outfit', 'Inter', sans-serif;
    font-size: 2.8rem;
    margin-top: 0;
    margin-bottom: 28px;
    text-align: center;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s ease;
    text-transform: none; /* Keep natural case for cursive flow */
  }

  .bk-title-above .slogan-cursive {
    font-family: 'Caveat', cursive;
    font-size: 4.2rem;
    font-weight: 700;
    display: inline-block;
    transform: rotate(-3deg);
    margin-right: 4px;
  }

  .bk-title-above .slogan-bold {
    font-weight: 900;
    font-family: 'Outfit', 'Inter', sans-serif;
  }

  .bk-wrap.dark .bk-title-above .slogan-cursive {
    color: #ffffff;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
  }

  .bk-wrap.dark .bk-title-above .slogan-bold {
    color: #ffffff;
  }

  .bk-wrap.light .bk-title-above .slogan-cursive {
    color: #5B31CC;
    text-shadow: 0 0 15px rgba(91, 49, 204, 0.15);
  }

  .bk-wrap.light .bk-title-above .slogan-bold {
    color: #1a0933;
  }

  @media (max-width: 768px) {
    .bk-title-above {
      font-size: 2.5rem;
      margin-bottom: 16px;
    }
  }

  .bk-wrap.dark {
    background: radial-gradient(circle at 50% 50%, #150f30 0%, #07050d 100%);
  }

  .bk-wrap.light {
    background: #ffffff;
  }

  /* Grid overlay for ambient sci-fi depth */
  .bk-wrap::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .bk-wrap.dark::before {
    background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: center;
    opacity: 1;
  }

  .bk-wrap.light::before {
    background-image: linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: center;
    opacity: 1;
  }

  .bk-book {
    position: relative;
    width: 100%;
    max-width: 1150px;
    background: linear-gradient(135deg, #4f46e5 0%, #2e1065 100%);
    border-radius: 32px;
    padding: 20px 20px 84px 20px;
    box-shadow: 12px 12px 0px #000000;
    border: 4px solid #000000;
    transition: box-shadow 0.3s ease, border 0.3s ease;
  }

  .bk-wrap.light .bk-book {
    box-shadow: 12px 12px 0px #000000;
    border: 4px solid #000000;
  }

  /* Leather Texture on Book Cover */
  .bk-book::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 28px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 1;
  }

  /* Shiny Gold Corner Guards for premium leather-bound book aesthetic */
  .bk-corner {
    position: absolute;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #ffe066 0%, #cca300 50%, #997a00 100%);
    border: 3px solid #000000;
    box-shadow: 3px 3px 0px #000000;
    z-index: 10;
  }
  .bk-corner-tl { top: -4px; left: -4px; border-radius: 32px 0 24px 0; clip-path: polygon(0 0, 100% 0, 0 100%); }
  .bk-corner-tr { top: -4px; right: -4px; border-radius: 0 32px 0 24px; clip-path: polygon(0 0, 100% 0, 100% 100%); }
  .bk-corner-bl { bottom: -4px; left: -4px; border-radius: 0 24px 0 32px; clip-path: polygon(0 0, 0 100%, 100% 100%); }
  .bk-corner-br { bottom: -4px; right: -4px; border-radius: 24px 0 32px 0; clip-path: polygon(100% 0, 100% 100%, 0 100%); }

  .bk-pages {
    position: relative;
    border-radius: 16px;
    display: flex;
    overflow: visible;
    height: 600px;
    background: transparent;
    z-index: 2;
  }

  .bk-left {
    width: 50%;
    height: 100%;
    position: relative;
    background-color: #ffffff;
    border: 4px solid #000000;
    border-radius: 16px 28px 28px 16px;
    z-index: 2;
    box-sizing: border-box;
    background-image: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"),
      linear-gradient(to right, rgba(0,0,0,0.02) 0%, transparent 6%, transparent 94%, rgba(0,0,0,0.12) 100%);
  }

  /* Left Page Stack 1 (Middle Sheet) */
  .bk-left::before {
    content: '';
    position: absolute;
    inset: -4px;
    background: #ffffff;
    border: 4px solid #000000;
    border-radius: 16px 28px 28px 16px;
    transform: translate(-6px, 6px);
    z-index: -1;
    pointer-events: none;
    box-sizing: border-box;
  }

  /* Left Page Stack 2 (Bottom Sheet) */
  .bk-left::after {
    content: '';
    position: absolute;
    inset: -4px;
    background: #ffffff;
    border: 4px solid #000000;
    border-radius: 16px 28px 28px 16px;
    transform: translate(-12px, 12px);
    z-index: -2;
    pointer-events: none;
    box-sizing: border-box;
    box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.1);
  }

  .bk-right {
    width: 50%;
    height: 100%;
    position: relative;
    background-color: #ffffff;
    border: 4px solid #000000;
    border-radius: 28px 16px 16px 28px;
    z-index: 1;
    box-sizing: border-box;
    background-image: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"),
      linear-gradient(to left, rgba(0,0,0,0.02) 0%, transparent 6%, transparent 94%, rgba(0,0,0,0.15) 100%),
      repeating-linear-gradient(transparent, transparent 39px, rgba(0,0,0,0.025) 39px, rgba(0,0,0,0.025) 40px);
    background-position: top center;
    background-size: 200px 200px, 100% 100%, 100% 40px;
  }

  /* Right Page Stack 1 (Middle Sheet) */
  .bk-right::before {
    content: '';
    position: absolute;
    inset: -4px;
    background: #ffffff;
    border: 4px solid #000000;
    border-radius: 28px 16px 16px 28px;
    transform: translate(6px, 6px);
    z-index: -1;
    pointer-events: none;
    box-sizing: border-box;
  }

  /* Right Page Stack 2 (Bottom Sheet) */
  .bk-right::after {
    content: '';
    position: absolute;
    inset: -4px;
    background: #ffffff;
    border: 4px solid #000000;
    border-radius: 28px 16px 16px 28px;
    transform: translate(12px, 12px);
    z-index: -2;
    pointer-events: none;
    box-sizing: border-box;
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.15);
  }

  .bk-crease {
    position: absolute;
    left: 50%;
    top: 0; bottom: 0;
    width: 44px;
    transform: translateX(-50%);
    background: linear-gradient(to right, 
      transparent 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 70%, transparent 100%);
    z-index: 3;
    pointer-events: none;
  }

  .bk-rings {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 30px; bottom: 30px;
    z-index: 4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;
    height: calc(100% - 60px);
  }
  .bk-ring-group {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 28px;
  }
  .bk-hole {
    width: 10px; height: 18px;
    background: #000000;
    border-radius: 6px;
    box-shadow: inset 0 3px 6px rgba(0,0,0,0.8);
    position: absolute;
  }
  .bk-hole.left { left: -18px; }
  .bk-hole.right { right: -18px; }
  
  .bk-ring-twin {
    position: relative;
    width: 38px;
    height: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 5;
  }
  .bk-loop {
    width: 38px;
    height: 5px;
    background: linear-gradient(to right, 
      #8a6f27 0%, 
      #ffd700 30%, 
      #ffffff 50%, 
      #ffd700 70%, 
      #8a6f27 100%
    );
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,0.5);
    box-shadow: 0 3px 4px rgba(0,0,0,0.3);
  }

  .bk-tape {
    position: absolute;
    width: 90px; height: 26px;
    background: rgba(180, 150, 230, 0.45);
    backdrop-filter: blur(3px);
    box-shadow: 0 1px 4px rgba(0,0,0,0.12);
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
    top: -4px; left: -4px;
    background: linear-gradient(135deg, #4f46e5 0%, #3115a5 100%);
    color: white;
    padding: 14px 18px 18px 18px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 12px;
    z-index: 10;
    line-height: 1;
    border-right: 3px solid #000000;
    border-bottom: 3px solid #000000;
  }
  .bk-page-num::after {
    content: '';
    position: absolute;
    top: 0; right: -8px;
    width: 8px; height: 100%;
    background: #1e0b58;
    border-bottom-right-radius: 20px;
    clip-path: polygon(0 0, 0 100%, 100% 100%);
  }
  .bk-page-num .num { font-size: 2rem; font-weight: 900; letter-spacing: -1px; }
  .bk-page-num .of { font-size: 0.75rem; font-weight: 700; opacity: 0.85; margin-top: 3px; text-align: center; }

  .bk-bubble-top {
    position: relative;
    background: #3115A5;
    color: white;
    display: inline-block;
    padding: 10px 26px;
    border-radius: 50px;
    font-size: 1.8rem;
    font-weight: 900;
    border: 3px solid #000000;
    box-shadow: 4px 4px 0px #000000;
    white-space: nowrap;
    z-index: 2;
  }
  .bk-bubble-top::after {
    content: ''; position: absolute; bottom: -12px; right: 30px;
    width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 12px solid #000000;
  }
  .bk-bubble-top::before {
    content: ''; position: absolute; bottom: -8px; right: 32px;
    width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #3115A5; z-index: 1;
  }
  .bk-smiley {
    position: absolute; right: -24px; top: 50%; transform: translateY(-50%) rotate(10deg);
    width: 46px; height: 46px; border-radius: 50%; background: #FDE047; border: 3px solid #000000;
    display: flex; align-items: center; justify-content: center; font-size: 1.6rem;
    box-shadow: 3px 3px 0px #000000; z-index: 5; color: black;
  }

  /* Premium Neobrutalist Phone Mockup */
  .bk-phone-mockup {
    position: relative;
    width: 176px;
    height: 256px;
    background: #000000;
    border: 4px solid #000000;
    border-radius: 28px;
    box-shadow: 6px 6px 0px #000000;
    overflow: hidden;
    margin: 12px auto 0;
  }
  .bk-phone-screen {
    position: absolute;
    inset: 4px;
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .bk-phone-notch {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 62px;
    height: 12px;
    background: #000000;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    z-index: 10;
  }
  .bk-phone-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .bk-bubble-bottom {
    position: relative;
    background: #FF6B00; color: white; display: inline-block;
    padding: 10px 32px 14px 32px; border-radius: 40px; font-size: 4.4rem; font-weight: 900; line-height: 1;
    border: 4px solid #000000; box-shadow: 6px 6px 0px #000000;
    margin-top: 4px; margin-left: 16px; letter-spacing: -2px; z-index: 1;
  }
  .bk-bubble-bottom::after {
    content: ''; position: absolute; top: -14px; left: 36px;
    width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 14px solid #000000;
  }
  .bk-bubble-bottom::before {
    content: ''; position: absolute; top: -10px; left: 38px;
    width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 10px solid #FF6B00; z-index: 2;
  }

  .bk-polaroid {
    position: relative; transform: rotate(-2.5deg); background: white;
    padding: 12px 12px 42px 12px; box-shadow: 0 14px 30px rgba(0,0,0,0.12);
    border-radius: 6px; margin: 24px 24px 0 24px; z-index: 5;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  .bk-polaroid img { width: 100%; height: 210px; object-fit: cover; border-radius: 4px; display: block; }

  .bk-sticky {
    position: absolute; background: #ffe985; transform: rotate(3deg);
    padding: 14px 18px; border-radius: 2px; box-shadow: 2px 6px 18px rgba(0,0,0,0.12);
    font-family: 'Caveat', cursive; font-size: 1.5rem; font-weight: 700; color: #3a1168; line-height: 1.2;
    bottom: -32px; left: 48px; z-index: 6;
  }
  .bk-sticky::after {
    content: ""; position: absolute; bottom: 0; right: 0;
    border-width: 0 0 16px 16px; border-style: solid; border-color: transparent transparent #d4c16a #d4c16a;
    box-shadow: -2px -2px 4px rgba(0,0,0,0.06);
  }

  .bk-swipe-btn {
    background: #5B31CC; color: white; font-family: 'Nunito', sans-serif;
    font-size: 1.2rem; font-weight: 900; padding: 12px 28px; border-radius: 50px;
    border: 3px solid white; box-shadow: 0 6px 20px rgba(91,49,204,0.35);
    cursor: pointer; transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); white-space: nowrap; position: relative; z-index: 6;
  }
  .bk-swipe-btn:hover { transform: scale(1.05) translateY(-2px); box-shadow: 0 10px 24px rgba(91,49,204,0.5); }

  .bk-right-content {
    padding: 28px 36px; display: flex; flex-direction: column; gap: 12px; height: 100%; box-sizing: border-box;
  }

  .bk-def-card {
    background: white; border: 3px solid #000000; border-radius: 16px;
    padding: 14px 20px; position: relative; box-shadow: 5px 5px 0px #000000;
    transition: all 0.2s ease;
  }
  .bk-def-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0px #000000;
  }
  .bk-def-text { font-size: 1.18rem; font-weight: 800; color: #231942; line-height: 1.7; text-align: center; margin: 0; }

  .bk-think-card {
    background: #FFFbf4; border-radius: 14px; padding: 18px 24px;
    box-shadow: 5px 5px 0px #000000; position: relative; width: fit-content; align-self: center;
    border: 3px solid #000000;
    transition: all 0.2s ease;
  }
  .bk-think-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0px #000000;
  }
  .bk-think-label {
    position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
    background: #5B31CC; color: white; padding: 5px 18px; border-radius: 50px;
    font-size: 1rem; font-weight: 900; border: 2.5px solid #000000; box-shadow: 3px 3px 0px #000000; white-space: nowrap;
  }
  .bk-think-text { font-size: 1.1rem; font-weight: 700; color: #2a2255; line-height: 1.5; margin: 0; text-align: center; }

  .bk-chips { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
  .bk-chip {
    background: white; border: 2.5px solid #000000; border-radius: 50px; padding: 8px 18px;
    font-family: 'Nunito', sans-serif; font-size: 1rem; font-weight: 800; color: #3b2a54;
    box-shadow: 3px 3px 0px #000000; display: flex; align-items: center; gap: 6px; white-space: nowrap;
    cursor: default; transition: all 0.2s;
  }
  .bk-chip:hover { border-color: #5b31cc; background: #faf5ff; transform: translate(-2px, -2px); box-shadow: 5px 5px 0px #000000; }

  .bk-badges { display: flex; justify-content: center; gap: 20px; }
  .bk-badge { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .bk-badge-circle { 
    width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; box-shadow: 3px 3px 0px #000000; border: 3px solid #000000;
  }
  .bk-badge-text { font-size: 0.9rem; font-weight: 800; color: #5B31CC; }

  .bk-tribe-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 10px; }
  .bk-tribe-card { 
    background: white; border: 2.5px solid #000000; border-radius: 12px; padding: 12px;
    display: flex; align-items: center; gap: 12px; box-shadow: 4px 4px 0px #000000;
    transition: all 0.2s ease;
  }
  .bk-tribe-icon { font-size: 1.6rem; }
  .bk-tribe-info { display: flex; flex-direction: column; }
  .bk-tribe-title { font-size: 1.05rem; font-weight: 900; color: #1A1759; line-height: 1.2; }
  .bk-tribe-sub { font-size: 0.85rem; font-weight: 700; color: #888; }

  .bk-emojis { display: flex; gap: 18px; justify-content: center; margin-top: auto; font-size: 2.2rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.12)); }
  .bk-emojis span { display: inline-block; }

  /* Premium Multi-colored Jump Tabs on Right Edge */
  .bk-tabs {
    position: absolute;
    right: -54px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 6px;
    z-index: 5;
  }
  .bk-tab {
    width: 62px;
    height: 52px;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 12px;
    font-size: 1.3rem;
    box-shadow: 3px 3px 0px #000000;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    color: white;
    border: 3px solid #000000;
    border-left: none;
  }
  .bk-tab:hover {
    width: 74px;
    padding-right: 16px;
    filter: brightness(1.15);
    box-shadow: 4px 4px 0px #000000;
  }
  .bk-tab.active {
    width: 78px;
    padding-right: 18px;
    filter: brightness(1.2) saturate(1.1);
    box-shadow: 5px 5px 0px #000000;
  }

  .bk-nav-container {
    position: absolute;
    bottom: -36px;
    left: 50%;
    transform: translateX(-50%);
    background: #eeddff;
    padding: 8px 16px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 6px 6px 0px #000000;
    z-index: 20;
    border: 3px solid #000000;
  }
  .bk-nav-prev {
    background: transparent;
    border: none;
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    font-weight: 800;
    color: #5B31CC;
    cursor: pointer;
    padding: 8px 16px;
    transition: opacity 0.2s;
  }
  .bk-nav-prev:disabled { opacity: 0.35; cursor: not-allowed; }
  .bk-nav-next {
    background: #5B31CC;
    border: 2px solid #000000;
    border-radius: 50px;
    padding: 10px 24px;
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    font-weight: 900;
    color: white;
    cursor: pointer;
    box-shadow: 3px 3px 0px #000000;
    transition: all 0.2s;
  }
  .bk-nav-next:hover:not(:disabled) { transform: translate(-2px, -2px); box-shadow: 5px 5px 0px #000000; filter: brightness(1.1); }
  .bk-nav-next:disabled { background: #b0a5cc; cursor: not-allowed; box-shadow: none; border-color: rgba(0,0,0,0.25); }

  .bk-dots { display: flex; align-items: center; gap: 6px; }
  .bk-dot { height: 8px; border-radius: 50px; background: #C4B5FD; transition: all 0.3s; border: 1px solid #000000; cursor: pointer; padding: 0; }
  .bk-dot.on { width: 24px; background: #5B31CC; border: 1.5px solid #000000; }
  .bk-dot:not(.on) { width: 8px; }
  .bk-nav-text { font-family: 'Nunito', sans-serif; font-weight: 900; font-size: 1rem; color: #5B31CC; margin-left: 6px; }

  @keyframes bk-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  .bk-float { animation: bk-float 3s ease-in-out infinite; }
  @keyframes bk-floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-6px) rotate(8deg)} }
  .bk-floatB { animation: bk-floatB 4s ease-in-out infinite; }

  /* Visual improvements for custom slides */
  .slide-container {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .curator-stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 6px;
  }

  .curator-stat-card {
    background: #fbf9ff;
    border: 1.5px solid #ebe4ff;
    border-radius: 12px;
    padding: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0,0,0,0.01);
  }

  .curator-stat-num {
    font-size: 1.4rem;
    font-weight: 900;
    color: #e11d48;
    line-height: 1.1;
  }

  .curator-stat-label {
    font-size: 0.75rem;
    font-weight: 800;
    color: #5B31CC;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    margin-top: 2px;
  }

  .calendar-mix-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: white;
    border: 1.5px solid #eef2f6;
    border-radius: 12px;
    padding: 10px 14px;
    transition: all 0.2s;
  }
  .calendar-mix-item:hover {
    transform: translateX(4px);
    border-color: #c7d2fe;
    box-shadow: 0 4px 10px rgba(0,0,0,0.03);
  }

  .calendar-mix-date {
    background: #eef2f6;
    color: #334155;
    font-weight: 900;
    font-size: 0.85rem;
    padding: 4px 10px;
    border-radius: 8px;
    text-align: center;
    line-height: 1.1;
    min-width: 54px;
  }

  .calendar-mix-info {
    flex: 1;
  }

  .calendar-mix-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: #1e293b;
    line-height: 1.2;
  }
  
  .calendar-mix-time {
    font-size: 0.8rem;
    font-weight: 600;
    color: #64748b;
  }

  .waitlist-slide-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: white;
    border: 1.5px dashed #c7d2fe;
    border-radius: 16px;
    padding: 18px 22px;
    box-shadow: 0 6px 14px rgba(0,0,0,0.02);
  }

  .waitlist-slide-input {
    width: 100%;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    padding: 10px 14px;
    font-family: 'Nunito', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    outline: none;
    transition: border-color 0.2s;
  }
  .waitlist-slide-input:focus {
    border-color: #5B31CC;
  }

  .waitlist-slide-submit {
    background: linear-gradient(135deg, #5B31CC 0%, #3a1168 100%);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-family: 'Nunito', sans-serif;
    font-size: 0.95rem;
    font-weight: 900;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(91,49,204,0.3);
    transition: transform 0.2s;
  }
  .waitlist-slide-submit:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(91,49,204,0.4);
  }
`;

/* ─── Slide 1: What is 2gather? ─── */
function Slide1({ onNext }) {
  return (
    <div className="slide-container">
      {/* ── LEFT PAGE ── */}
      <div className="bk-left">
        <div className="bk-page-num">
          <div className="num">01</div>
          <div className="of">of 07</div>
        </div>

        {/* Brand Logo Integration inside book */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '24px' }}>
          <img src="/Color%20Logo.png" alt="2gather Logo" style={{ height: '36px', objectFit: 'contain' }} />
        </div>

        <div style={{ padding: '20px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', position: 'relative' }}>
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

          <div className="bk-sticky" style={{ bottom: -24, left: 28 }}>
            Good people · Great vibes · Real memories
          </div>

          <div style={{ position: 'absolute', bottom: -15, right: 20, zIndex: 10 }}>
            <button className="bk-swipe-btn" onClick={onNext} style={{ padding: '10px 24px', lineHeight: 1.2, textAlign: 'center' }}>
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
    <div className="slide-container">
      {/* ── LEFT PAGE ── */}
      <div className="bk-left">
        <div className="bk-page-num">
          <div className="num">02</div>
          <div className="of">of 07</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '24px' }}>
          <img src="/Color%20Logo.png" alt="2gather Logo" style={{ height: '36px', objectFit: 'contain' }} />
        </div>

        <div style={{ padding: '20px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 90, left: 28, fontSize: '0.9rem', color: '#FF6B00' }}>✦</div>
          <div style={{ position: 'absolute', top: 120, left: 60, fontSize: '1.4rem' }} className="bk-floatB">⭐</div>
          <div style={{ position: 'absolute', top: 60, right: 80, fontSize: '1rem', color: '#EC4899', transform: 'rotate(15deg)' }}>💕</div>
          <div style={{ position: 'absolute', top: 100, right: 60, fontSize: '0.6rem', color: '#5B31CC' }}>✦</div>

          <div style={{ position: 'relative', alignSelf: 'flex-start', marginLeft: '16px' }}>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }} className="bk-bubble-top">What is a</motion.div>
            <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 10 }} transition={{ type: 'spring', delay: 0.3 }} className="bk-smiley">😊</motion.div>
          </div>

          <motion.div initial={{ scale: 0.5, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }} className="bk-bubble-bottom" style={{ fontSize: '4.4rem', padding: '10px 42px 14px 42px' }}>Tribe?</motion.div>
        </div>

        <div style={{ padding: '14px 24px 0', position: 'relative' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="bk-tape" style={{ top: 14, left: 0, transform: 'rotate(-15deg)' }} />
          <motion.div initial={{ y: 50, opacity: 0, rotate: -20 }} animate={{ y: 0, opacity: 1, rotate: -3 }} transition={{ type: 'spring', damping: 14, delay: 0.4 }} className="bk-polaroid">
            <img src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=900&auto=format&fit=crop" alt="tribe gathering" />
          </motion.div>

          <motion.div initial={{ scale: 0, x: -20 }} animate={{ scale: 1, x: 0 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.6 }} className="bk-sticky" style={{ bottom: -24, left: 32 }}>
            Connected around what we love 💜
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PAGE ── */}
      <div className="bk-right">
        <div className="bk-right-content" style={{ padding: '30px 40px', gap: '16px' }}>
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
              { t: 'Discover', e: '✨', bg: '#FFEDD5', bc: '#FDBA74', c: '#EA580C' }
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
                { e: '🥾', t: 'Hikers Pune', s: '1.4K Members', c: '#10B981' },
                { e: '📚', t: 'Bookworms Pune', s: '876 Members', c: '#3B82F6' },
                { e: '🎮', t: 'Gamers Circle', s: '720 Members', c: '#8B5CF6' },
                { e: '🍜', t: 'Food Walkers Pune', s: '2.1K Members', c: '#EF4444' },
                { e: '📸', t: 'Photo Walkers', s: '920 Members', c: '#6B7280' },
                { e: '🎵', t: 'Jam Sessions', s: '430 Members', c: '#4F46E5' },
                { e: '🎨', t: 'Aesthetic Studio', s: '500 Members', c: '#EC4899' }
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
    <div className="slide-container">
      {/* ── LEFT PAGE ── */}
      <div className="bk-left">
        <div className="bk-page-num">
          <div className="num">03</div>
          <div className="of">of 07</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '24px' }}>
          <img src="/Color%20Logo.png" alt="2gather Logo" style={{ height: '36px', objectFit: 'contain' }} />
        </div>

        <div style={{ padding: '20px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', position: 'relative' }}>
          <div style={{ position: 'relative', alignSelf: 'flex-start', marginLeft: '16px' }}>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }} className="bk-bubble-top" style={{ padding: '10px 28px', background: '#EC4899', color: '#FFF' }}>The</motion.div>
            <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 10 }} transition={{ type: 'spring', delay: 0.3 }} className="bk-smiley" style={{ background: '#3B82F6' }}>📺</motion.div>
          </div>

          <motion.div initial={{ scale: 0.5, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }} className="bk-bubble-bottom" style={{ fontSize: '3.6rem', padding: '10px 32px 14px 32px', background: '#1a0b58', color: '#FFF' }}>2gatherTv</motion.div>
        </div>

        <div style={{ padding: '4px 24px 0', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: 'spring' }} className="bk-phone-mockup">
            <div className="bk-phone-notch" />
            <div className="bk-phone-screen">
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop" alt="Friends Gathering" className="bk-phone-img" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PAGE ── */}
      <div className="bk-right">
        <div className="bk-right-content" style={{ padding: '40px 48px', gap: '16px' }}>
          <div style={{ position: 'absolute', top: 20, right: 60, fontSize: '1.8rem', zIndex: 10 }}>📼</div>
          <div style={{ position: 'absolute', top: 280, left: 40, fontSize: '1.4rem' }}>🎬</div>
          
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', damping: 15, delay: 0.3 }} className="bk-def-card" style={{ padding: '24px 32px' }}>
            <div className="bk-tape" style={{ top: -10, left: -20, transform: 'rotate(-25deg)', width: '60px', height: '20px' }} />
            <p className="bk-def-text" style={{ fontSize: '1.15rem' }}>
              Tune into real-world <span style={{ color: '#FF6B00', fontWeight: 900 }}>events</span> happening around Pune and Mumbai. 
              Catch raw, visual highlights of happy friends joining together and making memories that last forever!
            </p>
          </motion.div>

          <div className="bk-think-card" style={{ marginTop: '10px' }}>
            <div className="bk-think-label">Friends & Join</div>
            <p className="bk-think-text" style={{ padding: '6px 0 0' }}>
              See local tribe meetups on the left<br />
              to explore offline connections<br />
              captured <span style={{ color: '#5B31CC', fontWeight: 900 }}>offline.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 4: Where We Gather ─── */
function Slide4() {
  return (
    <div className="slide-container">
      {/* ── LEFT PAGE ── */}
      <div className="bk-left">
        <div className="bk-page-num">
          <div className="num">04</div>
          <div className="of">of 07</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '24px' }}>
          <img src="/Color%20Logo.png" alt="2gather Logo" style={{ height: '36px', objectFit: 'contain' }} />
        </div>

        <div style={{ padding: '20px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', position: 'relative' }}>
          <div style={{ position: 'relative', alignSelf: 'flex-start', marginLeft: '16px' }}>
            <div className="bk-bubble-top" style={{ background: '#10B981' }}>Active in</div>
            <div className="bk-smiley" style={{ background: '#10B981', color: 'white' }}>📍</div>
          </div>
          <div className="bk-bubble-bottom" style={{ fontSize: '3.5rem', background: '#3b2a54', padding: '10px 28px' }}>Your City</div>
        </div>

        <div style={{ padding: '14px 24px 0', position: 'relative' }}>
          <div className="bk-tape" style={{ top: 14, left: 10, transform: 'rotate(10deg)' }} />
          <div className="bk-polaroid">
            <img src="https://images.unsplash.com/photo-1524813686514-a57563d77d61?q=80&w=900&auto=format&fit=crop" alt="Pune gathering spot" style={{ height: '210px' }} />
          </div>
          <div className="bk-sticky" style={{ bottom: -20, left: 40 }}>
            Curated mixers in your local spots!
          </div>
        </div>
      </div>

      {/* ── RIGHT PAGE ── */}
      <div className="bk-right">
        <div className="bk-right-content">
          <div style={{ position: 'absolute', top: 20, right: 60, fontSize: '1.8rem' }}>📌</div>
          
          <div className="bk-def-card" style={{ background: '#fcfcfc' }}>
            <p className="bk-def-text" style={{ fontSize: '1.1rem' }}>
              We orchestrate connection hubs globally, starting with vibrant spots across India. Wherever you are, we establish local tribe networks.
            </p>
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#5B31CC', margin: '10px 0 0', textAlign: 'center' }}>🏙️ Hubs & Communities</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '6px' }}>
            {[
              { city: 'PUNE', count: '12+ Tribes Active', color: '#10B981', icon: '🌸' },
              { city: 'MUMBAI', count: '8+ Tribes Active', color: '#3B82F6', icon: '🌊' },
              { city: 'BANGALORE', count: 'Coming June', color: '#8B5CF6', icon: '💻' },
              { city: 'DELHI NCR', count: 'Coming July', color: '#F59E0B', icon: '🏛️' }
            ].map(h => (
              <div key={h.city} style={{ background: 'white', border: '1.5px solid #eef2f6', borderRadius: '14px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.01)' }}>
                <span style={{ fontSize: '1.5rem' }}>{h.icon}</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 900, color: '#1A1759' }}>{h.city}</h4>
                  <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: h.color }}>{h.count}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: 'auto' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b', background: '#f1f5f9', padding: '6px 14px', borderRadius: '50px' }}>📍 Cafe Mixers</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b', background: '#f1f5f9', padding: '6px 14px', borderRadius: '50px' }}>🌲 Outdoor Treks</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 5: Tribal Curators ─── */
function Slide5() {
  return (
    <div className="slide-container">
      {/* ── LEFT PAGE ── */}
      <div className="bk-left">
        <div className="bk-page-num">
          <div className="num">05</div>
          <div className="of">of 07</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '24px' }}>
          <img src="/Color%20Logo.png" alt="2gather Logo" style={{ height: '36px', objectFit: 'contain' }} />
        </div>

        <div style={{ padding: '20px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', position: 'relative' }}>
          <div style={{ position: 'relative', alignSelf: 'flex-start', marginLeft: '16px' }}>
            <div className="bk-bubble-top" style={{ background: '#f59e0b' }}>Become a</div>
            <div className="bk-smiley" style={{ background: '#f59e0b', color: 'white' }}>👑</div>
          </div>
          <div className="bk-bubble-bottom" style={{ fontSize: '3.6rem', background: '#e11d48', padding: '10px 32px' }}>Curator</div>
        </div>

        <div style={{ padding: '14px 24px 0', position: 'relative' }}>
          <div className="bk-tape" style={{ top: 12, left: -10, transform: 'rotate(-8deg)' }} />
          <div className="bk-polaroid">
            <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=900&auto=format&fit=crop" alt="curator leading" style={{ height: '210px' }} />
          </div>
          <div className="bk-sticky" style={{ bottom: -20, left: 36 }}>
            Lead a community. Bring good folks together!
          </div>
        </div>
      </div>

      {/* ── RIGHT PAGE ── */}
      <div className="bk-right">
        <div className="bk-right-content">
          <div style={{ position: 'absolute', top: 20, right: 60, fontSize: '1.8rem' }}>👑</div>
          
          <div className="bk-def-card">
            <p className="bk-def-text" style={{ fontSize: '1.1rem', color: '#1A1759' }}>
              Are you passionate about hosting events, meeting creative minds, and uniting people? Apply to become a **2gather Tribal Curator**!
            </p>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#5B31CC', margin: '6px 0 0', textAlign: 'center' }}>🚀 curator Superpowers</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Create Official Mixers', desc: 'Host events featured on the platform calendar.', icon: '📅' },
              { title: 'Grow Your Collective', desc: 'Manage your own Tribe group and circles.', icon: '👥' },
              { title: 'Unparalleled Perks', desc: 'Get entry to exclusive curators-only meetups & cafes.', icon: '✨' }
            ].map(p => (
              <div key={p.title} style={{ background: '#fdfbfe', border: '1px solid #ebe4ff', borderRadius: '12px', padding: '10px 14px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '1.4rem' }}>{p.icon}</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 900, color: '#3b2a54' }}>{p.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="curator-stats-grid">
            <div className="curator-stat-card">
              <div className="curator-stat-num">15+</div>
              <div className="curator-stat-label">Hosts</div>
            </div>
            <div className="curator-stat-card" style={{ borderColor: '#ffe4e6' }}>
              <div className="curator-stat-num" style={{ color: '#25d366' }}>120+</div>
              <div className="curator-stat-label">Mixers</div>
            </div>
            <div className="curator-stat-card">
              <div className="curator-stat-num" style={{ color: '#3b82f6' }}>4.9★</div>
              <div className="curator-stat-label">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 6: Unified Calendar ─── */
function Slide6() {
  return (
    <div className="slide-container" style={{ width: '100%', height: '100%' }}>
      {/* ── LEFT PAGE ── */}
      <div className="bk-left" style={{ overflow: 'hidden', position: 'relative' }}>
        <div className="bk-page-num">
          <div className="num">06</div>
          <div className="of">of 08</div>
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
          <img src="/Color%20Logo.png" alt="2gather Logo" style={{ height: '32px', objectFit: 'contain' }} />
        </div>

        {/* Header Badges */}
        <div style={{ padding: '20px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', position: 'relative' }}>
          {/* ⭐ Star */}
          <div style={{
            position: 'absolute',
            top: '42px',
            left: '32px',
            fontSize: '1.6rem',
            zIndex: 5,
            transform: 'rotate(-15deg)',
            filter: 'drop-shadow(2px 2px 0px #000)'
          }}>⭐</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: 'center', position: 'relative' }}>
            {/* "Weekly" Badge */}
            <div style={{
              background: '#0084FF',
              color: '#FFFFFF',
              border: '3px solid #000000',
              borderRadius: '35px',
              padding: '6px 20px',
              boxShadow: '4px 4px 0px #000000',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: '1.45rem',
              lineHeight: 1
            }}>
              Weekly
              <div style={{
                background: '#FFFFFF',
                border: '2px solid #000000',
                borderRadius: '8px',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                boxShadow: '1.5px 1.5px 0 #000'
              }}>📅</div>
            </div>

            {/* "Mixers" Badge */}
            <div style={{
              background: '#7B55E8',
              color: '#FFFFFF',
              border: '3px solid #000000',
              borderRadius: '35px',
              padding: '8px 28px',
              boxShadow: '4px 4px 0px #000000',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: '2.1rem',
              lineHeight: 1,
              marginTop: '-2px',
              position: 'relative'
            }}>
              Mixers
            </div>
          </div>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: '0.82rem',
            fontWeight: 800,
            color: '#000000',
            margin: '12px 0 0 0',
            textAlign: 'center'
          }}>
            Great people. <span style={{ color: '#7B55E8' }}>Good vibes.</span> Unforgettable weekends.
          </p>
        </div>

        {/* Polaroid Area */}
        <div style={{ padding: '14px 24px 0', position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div className="bk-tape" style={{ top: -4, left: 85, transform: 'rotate(-5deg)', zIndex: 10, background: 'rgba(236, 72, 153, 0.4)' }} />
          <div className="bk-polaroid" style={{ transform: 'rotate(-4deg)', boxShadow: '4px 4px 0px #000', border: '2.5px solid #000', background: '#FFFFFF', padding: '12px 12px 28px 12px' }}>
            <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=900&auto=format&fit=crop" alt="social event" style={{ height: '170px', width: '220px', objectFit: 'cover' }} />
          </div>
          
          {/* Cursive Sticker Tape */}
          <div style={{
            position: 'absolute',
            bottom: '-12px',
            left: '48px',
            background: '#FDE047',
            border: '2.5px solid #000000',
            padding: '6px 14px',
            boxShadow: '3px 3px 0px #000000',
            transform: 'rotate(-2deg)',
            fontFamily: "'Caveat', cursive",
            fontWeight: 800,
            fontSize: '1.15rem',
            color: '#3115A5',
            zIndex: 10,
            whiteSpace: 'nowrap'
          }}>
            Never a dull weekend in the city! 💜
          </div>

          {/* 😍 Sticker */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '42px',
            background: '#7B55E8',
            border: '2px solid #000',
            borderRadius: '10px',
            width: '26px',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '2px 2px 0px #000',
            fontSize: '0.85rem',
            zIndex: 12,
            transform: 'rotate(12deg)'
          }}>😍</div>

          {/* Popper sticker */}
          <div style={{
            position: 'absolute',
            bottom: '-22px',
            right: '48px',
            fontSize: '2.5rem',
            zIndex: 10,
            transform: 'rotate(-20deg) scaleX(-1)',
            filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.15))'
          }}>
            🎉
          </div>
        </div>
      </div>

      {/* ── RIGHT PAGE ── */}
      <div className="bk-right" style={{ overflow: 'hidden' }}>
        <div className="bk-right-content" style={{ padding: '0', justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          {/* Header Announcement Block */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            alignItems: 'center', 
            background: '#FFFFFF', 
            border: '2.5px solid #000000', 
            borderRadius: '20px', 
            padding: '12px 16px', 
            boxShadow: '4px 4px 0px #000000', 
            margin: '10px 24px 12px 24px', 
            position: 'relative' 
          }}>
            <div style={{ fontSize: '2.5rem', transform: 'rotate(-10deg)', filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.1))' }}>📢</div>
            <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: '#334155', lineHeight: 1.35, fontFamily: "'Nunito', sans-serif" }}>
              Here is a look at what is happening this week on <strong style={{ color: '#5B31CC' }}>2gather</strong>. ✨ <br />
              Book your spots directly to connect.
            </p>
            {/* Flying purple plane */}
            <div style={{ position: 'absolute', right: '12px', bottom: '8px', fontSize: '1.2rem', transform: 'rotate(10deg)' }}>✈️</div>
          </div>

          {/* Upcoming Schedule Badge Banner */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 10px 0' }}>
            <div style={{
              background: '#7B55E8',
              color: 'white',
              padding: '6px 18px',
              borderRadius: '30px',
              border: '2.5px solid #000000',
              boxShadow: '3px 3px 0px #000000',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: '0.8rem',
              letterSpacing: '0.04em'
            }}>
              📅 UPCOMING SCHEDULE
            </div>
          </div>

          {/* Schedule List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 24px' }}>
            {/* Item 1 */}
            <div style={{
              background: '#FFFFFF',
              border: '2px solid #000000',
              borderRadius: '16px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              boxShadow: '3px 3px 0px #000000'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Date Badge */}
                <div style={{
                  background: '#EEF2F6',
                  border: '2px solid #000000',
                  borderRadius: '8px',
                  padding: '3px 8px',
                  textAlign: 'center',
                  minWidth: '48px'
                }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#3B82F6', display: 'block', lineHeight: 1 }}>MAY</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#3B82F6', display: 'block', lineHeight: 1.1 }}>30</span>
                </div>
                {/* Info */}
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: '#000000' }}>Pune Founders & Creators Mixer</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>
                    <span>⏰ Sat, 6:30 PM</span>
                    <span style={{ color: '#E11D48' }}>📍 KP Social</span>
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '1.4rem' }}>🥂</span>
            </div>

            {/* Item 2 */}
            <div style={{
              background: '#FFFFFF',
              border: '2px solid #000000',
              borderRadius: '16px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              boxShadow: '3px 3px 0px #000000'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Date Badge */}
                <div style={{
                  background: '#FFE4E6',
                  border: '2px solid #000000',
                  borderRadius: '8px',
                  padding: '3px 8px',
                  textAlign: 'center',
                  minWidth: '48px'
                }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#E11D48', display: 'block', lineHeight: 1 }}>MAY</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#E11D48', display: 'block', lineHeight: 1.1 }}>31</span>
                </div>
                {/* Info */}
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: '#000000' }}>Sunrise Trek & French Press</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>
                    <span>⏰ Sun, 5:30 AM</span>
                    <span style={{ color: '#E11D48' }}>📍 Sinhagad Fort</span>
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '1.4rem' }}>⛰️</span>
            </div>

            {/* Item 3 */}
            <div style={{
              background: '#FFFFFF',
              border: '2px solid #000000',
              borderRadius: '16px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              boxShadow: '3px 3px 0px #000000'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Date Badge */}
                <div style={{
                  background: '#FEF3C7',
                  border: '2px solid #000000',
                  borderRadius: '8px',
                  padding: '3px 8px',
                  textAlign: 'center',
                  minWidth: '48px'
                }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#D97706', display: 'block', lineHeight: 1 }}>JUN</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#D97706', display: 'block', lineHeight: 1.1 }}>03</span>
                </div>
                {/* Info */}
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: '#000000' }}>Board Games & Craft Beer</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>
                    <span>⏰ Wed, 7:00 PM</span>
                    <span style={{ color: '#E11D48' }}>📍 KP Pune</span>
                  </div>
                </div>
              </div>
              <span style={{ display: 'flex', gap: '2px', fontSize: '1.3rem' }}>🍺🎲</span>
            </div>
          </div>

          {/* Bottom Banner */}
          <div style={{
            background: '#ECFDF5',
            border: '2px solid #10B981',
            borderRadius: '14px',
            padding: '8px 14px',
            margin: '12px 24px 0 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              background: '#10B981',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem'
            }}>⭐</div>
            <p style={{
              margin: 0,
              fontSize: '0.74rem',
              fontWeight: 800,
              color: '#065F46',
              lineHeight: 1.3
            }}>
              Meet. Mingle. Make memories. <span style={{ color: '#047857' }}>That's the 2gather way!</span> 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 7: 3D Mascot Interactive Arena ─── */
function Slide7() {
  return (
    <div className="slide-container">
      {/* ── LEFT PAGE ── */}
      <div className="bk-left">
        <div className="bk-page-num">
          <div className="num">07</div>
          <div className="of">of 08</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '24px' }}>
          <img src="/Color%20Logo.png" alt="2gather Logo" style={{ height: '36px', objectFit: 'contain' }} />
        </div>

        <div style={{ padding: '20px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', position: 'relative' }}>
          <div style={{ position: 'relative', alignSelf: 'flex-start', marginLeft: '16px' }}>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }} className="bk-bubble-top" style={{ padding: '10px 28px', background: '#06b6d4', color: '#FFF' }}>3D</motion.div>
            <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 10 }} transition={{ type: 'spring', delay: 0.3 }} className="bk-smiley" style={{ background: '#0891b2' }}>🧸</motion.div>
          </div>

          <motion.div initial={{ scale: 0.5, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }} className="bk-bubble-bottom" style={{ fontSize: '3.6rem', padding: '10px 32px 14px 32px', background: '#111827', color: '#FFF' }}>Mascot</motion.div>
        </div>

        <div style={{ padding: '10px 24px 0', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} style={{ width: '100%', height: '270px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', overflow: 'hidden' }}>
            <ModelViewer
              url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
              width="100%"
              height="100%"
              autoFrame={true}
              fadeIn={true}
              autoRotate={true}
              showScreenshotButton={false}
              environmentPreset="forest"
            />
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PAGE ── */}
      <div className="bk-right">
        <div className="bk-right-content" style={{ padding: '36px 40px', gap: '14px' }}>
          <div style={{ position: 'absolute', top: 20, right: 60, fontSize: '1.8rem', zIndex: 10 }}>✨</div>
          <div style={{ position: 'absolute', top: 280, left: 40, fontSize: '1.4rem' }}>🎮</div>
          
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', damping: 15, delay: 0.3 }} className="bk-def-card" style={{ padding: '20px 24px' }}>
            <div className="bk-tape" style={{ top: -10, left: -20, transform: 'rotate(-25deg)', width: '60px', height: '20px' }} />
            <p className="bk-def-text" style={{ fontSize: '1.05rem' }}>
              Explore the <span style={{ color: '#06b6d4', fontWeight: 900 }}>3D Interactive Mascot</span> of the 2gather Pune Hub! 
              Click and drag to orbit, rotate, or pinch to zoom. We use advanced WebGL to design spatial hub maps and custom collectible cards for each Tribe!
            </p>
          </motion.div>

          <div className="bk-think-card" style={{ marginTop: '5px' }}>
            <div className="bk-think-label" style={{ background: '#0891b2' }}>WebGL Performance</div>
            <div className="bk-think-text" style={{ padding: '6px 0 0', fontSize: '0.9rem', color: '#334155', fontWeight: 700 }}>
              • Drag with mouse to orbit & rotate<br />
              • Mouse wheel to zoom in/out<br />
              • High-fidelity shadow map rendering
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 8: Join the Waitlist ─── */
function Slide8() {
  const [emailInput, setEmailInput] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setDone(true);
    }
  };

  return (
    <div className="slide-container" style={{ width: '100%', height: '100%' }}>
      {/* ── LEFT PAGE ── */}
      <div className="bk-left" style={{ overflow: 'hidden' }}>
        <div className="bk-page-num">
          <div className="num">08</div>
          <div className="of">of 08</div>
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
          <img src="/Color%20Logo.png" alt="2gather Logo" style={{ height: '32px', objectFit: 'contain' }} />
        </div>

        {/* Secure Priority Capsule Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #3115a5 100%)',
            color: 'white',
            padding: '6px 18px',
            borderRadius: '30px',
            border: '2.5px solid #000000',
            boxShadow: '3px 3px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 900,
            fontSize: '0.8rem',
            letterSpacing: '0.04em'
          }}>
            <span style={{
              background: '#FF8A00',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              border: '1.2px solid #000'
            }}>🔒</span>
            SECURE PRIORITY
          </div>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '2.1rem',
          fontWeight: 900,
          textAlign: 'center',
          color: '#000000',
          margin: '14px 0 4px 0',
          lineHeight: 1.15
        }}>
          You're on the <span style={{ color: '#5B31CC' }}>Priority List!</span>
        </h2>

        {/* Subheading */}
        <p style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#64748b',
          textAlign: 'center',
          margin: '0 20px 14px 20px',
          lineHeight: 1.35
        }}>
          Be among the first to experience 2gather. <br />Invites are <span style={{ color: '#5B31CC', fontWeight: 800 }}>released in batches</span>.
        </p>

        {/* Feature List Container Card */}
        <div style={{
          background: '#F5F3FF',
          border: '2.5px solid #000000',
          borderRadius: '16px',
          padding: '12px 16px',
          margin: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          boxShadow: '4px 4px 0px #000000'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#E0E7FF', border: '1.5px solid #000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>🛡️</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: '#1e1b4b', lineHeight: 1.1 }}>Early Access</h4>
              <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Get in before the crowd.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#EEF2F6', border: '1.5px solid #000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>🔒</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: '#1e1b4b', lineHeight: 1.1 }}>Secure & Private</h4>
              <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Your data and privacy are our top priority.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#F3F0FF', border: '1.5px solid #000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>👥</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: '#1e1b4b', lineHeight: 1.1 }}>Built for Communities</h4>
              <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Connect, collaborate, and grow together.</p>
            </div>
          </div>
        </div>

        {/* Absolute Floating Envelope */}
        <div style={{
          position: 'absolute',
          bottom: '22px',
          right: '20px',
          width: '120px',
          zIndex: 20,
          transform: 'rotate(6deg)'
        }}>
          <div style={{ position: 'relative' }}>
            {/* Card peaking out */}
            <div style={{
              background: '#FFFFFF',
              border: '2px solid #000000',
              borderRadius: '5px',
              padding: '6px 4px',
              textAlign: 'center',
              transform: 'translateY(-12px) rotate(-6deg)',
              boxShadow: '1.5px 1.5px 0px rgba(0,0,0,0.15)',
              position: 'relative',
              zIndex: 1
            }}>
              <span style={{
                fontFamily: "'Caveat', cursive",
                fontWeight: 700,
                fontSize: '1rem',
                color: '#5B31CC',
                display: 'block',
                lineHeight: 1
              }}>You're</span>
              <span style={{
                fontFamily: "'Caveat', cursive",
                fontWeight: 700,
                fontSize: '1rem',
                color: '#FF6B00',
                display: 'block',
                lineHeight: 1
              }}>Invited!</span>
            </div>
            {/* Envelope Pocket */}
            <div style={{
              background: '#7B55E8',
              border: '2.5px solid #000000',
              borderRadius: '6px',
              height: '60px',
              boxShadow: '2.5px 2.5px 0px #000000',
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '6px',
                left: '6px',
                background: '#FFFFFF',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                border: '1.5px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '1px 1px 0px #000'
              }}>
                <img src="/Color%20Logo.png" alt="2gather" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Vector Landscape Bottom Border */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '32px',
          background: '#F0EDFF',
          borderTop: '2px solid #000000',
          zIndex: 5,
          borderBottomLeftRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0 16px 2px 16px',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '16px', background: '#7B55E8', borderRadius: '50%', border: '1.2px solid #000' }} />
            <div style={{ width: '1.5px', height: '3px', background: '#000' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '12px', background: '#FF8A00', borderRadius: '50%', border: '1.2px solid #000' }} />
            <div style={{ width: '1.5px', height: '2px', background: '#000' }} />
          </div>
          <div style={{ width: '12px', height: '8px', background: '#10B981', border: '1.2px solid #000', borderRadius: '6px 6px 0 0' }} />
        </div>
      </div>

      {/* ── RIGHT PAGE ── */}
      <div className="bk-right" style={{ overflow: 'hidden' }}>
        <div className="bk-right-content" style={{ padding: '0', justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          {/* Rocket Header Illustration */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: '95px',
            marginTop: '10px'
          }}>
            <div className="bk-float" style={{ fontSize: '3.8rem', zIndex: 2 }}>🚀</div>
            <div style={{ position: 'absolute', top: 15, left: '34%', fontSize: '0.8rem', color: '#FF8A00' }}>✦</div>
            <div style={{ position: 'absolute', bottom: 5, left: '38%', fontSize: '1rem', color: '#CBD5E1' }}>☁️</div>
            <div style={{ position: 'absolute', top: 30, right: '32%', fontSize: '0.7rem', color: '#EC4899' }}>✦</div>
            <div style={{ position: 'absolute', bottom: 15, right: '36%', fontSize: '0.9rem', color: '#CBD5E1' }}>☁️</div>
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.75rem',
            fontWeight: 900,
            textAlign: 'center',
            color: '#000000',
            margin: '0 0 4px 0',
            lineHeight: 1.2
          }}>
            Gather with Purpose. <br /><span style={{ color: '#5B31CC' }}>Launch Together.</span>
          </h2>

          <AnimatePresence mode="wait">
            {!done ? (
              <>
                {/* Description */}
                <p style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#64748b',
                  textAlign: 'center',
                  margin: '0 24px 14px 24px',
                  lineHeight: 1.35
                }}>
                  Enter your email to secure your spot. <br />We'll notify you as soon as your invite is ready!
                </p>

                {/* Email Form */}
                <form onSubmit={handleSubmit} style={{
                  margin: '0 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ position: 'absolute', left: '14px', color: '#7B55E8', fontSize: '1rem' }}>✉️</span>
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your email address" 
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 38px',
                        border: '2.5px solid #000000',
                        borderRadius: '30px',
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        outline: 'none',
                        boxShadow: 'inset 0 1.5px 3px rgba(0,0,0,0.05)',
                        background: '#FFFFFF'
                      }}
                    />
                  </div>

                  <button type="submit" style={{
                    background: '#5B31CC',
                    color: 'white',
                    border: '2.5px solid #000000',
                    borderRadius: '30px',
                    padding: '10px',
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 900,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '3px 3px 0px #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'transform 0.2s'
                  }}>
                    🔒 Secure My Early Access ✦
                  </button>
                </form>

                {/* Trust Indicators */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  margin: '6px 0 12px 0',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#10B981'
                }}>
                  <span>✓ No spam</span>
                  <span>✓ Privacy first</span>
                  <span>✓ Easy unsubscribe</span>
                </div>
              </>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: 'center',
                  background: '#ECFDF5',
                  border: '2.5px solid #10B981',
                  borderRadius: '16px',
                  padding: '16px',
                  margin: '0 28px 12px 28px',
                  boxShadow: '3px 3px 0px #10B981'
                }}
              >
                <span style={{ fontSize: '2.2rem' }}>🎉</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#047857', margin: '4px 0 0', fontFamily: "'Outfit', sans-serif" }}>You're on the list!</h4>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#065F46', margin: '4px 0 0', fontFamily: "'Nunito', sans-serif", lineHeight: 1.3 }}>
                  Priority invite secured for:<br />
                  <strong style={{ color: '#047857', wordBreak: 'break-all' }}>{emailInput}</strong>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Member Perks Gift Box Card */}
          <div style={{
            background: '#ECFDF5',
            border: '2px solid #10B981',
            borderRadius: '14px',
            padding: '10px 14px',
            margin: '0 28px 10px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🎁</span>
            <p style={{
              margin: 0,
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#065F46',
              lineHeight: 1.3
            }}>
              As a priority member, you may receive <span style={{ color: '#047857', fontWeight: 800 }}>exclusive perks</span> and early updates!
            </p>
          </div>
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
  { id: 'where', component: Slide4 },
  { id: 'chief', component: Slide5 },
  { id: 'schedule', component: Slide6 },
  { id: 'model', component: Slide7 },
  { id: 'join', component: Slide8 },
];

/* ─────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────── */
export default function TwoGatherSlides({ theme = 'dark' }) {
  const [cur, setCur] = useState(0);
  const goTo = (n) => { if (n >= 0 && n < SLIDES.length) setCur(n); };
  const Comp = SLIDES[cur].component;

  return (
    <>
      <style>{CSS}</style>
      <div className={`bk-wrap ${theme}`}>
        <h2 className="bk-title-above">
          <span className="slogan-cursive">How</span>
          <span className="slogan-bold">it works ❓</span>
        </h2>
        <div className="bk-book">
          {/* Metallic Gold Corner Guards */}
          <div className="bk-corner bk-corner-tl" />
          <div className="bk-corner bk-corner-tr" />
          <div className="bk-corner bk-corner-bl" />
          <div className="bk-corner bk-corner-br" />

          <div className="bk-pages">
            <div className="bk-crease" />

            <div className="bk-rings">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bk-ring-group">
                  <div className="bk-hole left" />
                  <div className="bk-ring-twin">
                    <div className="bk-loop" />
                    <div className="bk-loop" />
                  </div>
                  <div className="bk-hole right" />
                </div>
              ))}
            </div>

            <Comp onNext={() => goTo(cur + 1)} />

            {/* Premium Interactive Edge Jump Tabs */}
            <div className="bk-tabs">
              {[
                { label: 'What is 2gather', index: 0, bg: '#7B55E8', e: '👥' },
                { label: 'Tribes & Clubs', index: 1, bg: '#FF8A00', e: '💖' },
                { label: '2gatherTV highlights', index: 2, bg: '#EC4899', e: '📺' },
                { label: 'Active Hub Cities', index: 3, bg: '#10B981', e: '📍' },
                { label: 'Chief Curator Perks', index: 4, bg: '#f59e0b', e: '👑' },
                { label: 'Weekly Mix Calendar', index: 5, bg: '#3B82F6', e: '📅' },
                { label: 'Interactive 3D Mascot', index: 6, bg: '#06b6d4', e: '🧸' },
                { label: 'Priority Access', index: 7, bg: '#00DF89', e: '🚀' },
              ].map((t) => (
                <div 
                  key={t.index} 
                  title={t.label}
                  className={`bk-tab${cur === t.index ? ' active' : ''}`} 
                  style={{ background: t.bg }}
                  onClick={() => goTo(t.index)}
                >
                  {t.e}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation on purple binding */}
          <div className="bk-nav-container" style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            borderRadius: '50px',
            padding: '8px 8px 8px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            boxShadow: '6px 6px 0px #000000',
            width: '460px',
            maxWidth: '95%',
            position: 'absolute',
            bottom: '-32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20
          }}>
            {/* Prev Trigger */}
            <button 
              className="bk-nav-prev" 
              onClick={() => goTo(cur - 1)} 
              disabled={cur === 0}
              style={{
                background: 'transparent',
                border: 'none',
                fontFamily: "'Nunito', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 900,
                color: cur === 0 ? '#cbd5e1' : '#5B31CC',
                cursor: cur === 0 ? 'not-allowed' : 'pointer',
                padding: '4px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              ← Prev
            </button>

            {/* Dynamic Step Text */}
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              color: '#3115A5',
              letterSpacing: '-0.01em',
              textAlign: 'center'
            }}>
              {cur === 7 ? 'Priority Access Step 8/8' : `${[
                'Introduction',
                'Tribes & Clubs',
                '2gatherTV Highlights',
                'Active Hub Cities',
                'Curator Perks',
                'Weekly Calendar',
                'Interactive Mascot'
              ][cur]} Step ${cur + 1}/8`}
            </span>

            {/* Next / Done Trigger */}
            {cur === 7 ? (
              <button 
                className="bk-nav-next" 
                onClick={() => alert("Welcome aboard 2gather! You have secured priority membership access.")}
                style={{
                  background: '#5B31CC',
                  border: '2.5px solid #000000',
                  borderRadius: '50px',
                  padding: '8px 20px',
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '3px 3px 0px #000000',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Done ✔
              </button>
            ) : (
              <button 
                className="bk-nav-next" 
                onClick={() => goTo(cur + 1)}
                style={{
                  background: '#5B31CC',
                  border: '2.5px solid #000000',
                  borderRadius: '50px',
                  padding: '8px 20px',
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '3px 3px 0px #000000'
                }}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
