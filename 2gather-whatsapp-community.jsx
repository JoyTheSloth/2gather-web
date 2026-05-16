import { useState, useEffect, useRef } from "react";

const CITIES = [
  {
    name: "Mumbai",
    emoji: "🌊",
    tagline: "City of Dreams",
    members: "2.4K",
    color: "#4f46e5",
    glow: "rgba(79,70,229,0.35)",
    whatsapp: "https://chat.whatsapp.com/mumbai-2gather",
    vibes: ["Hiking", "Coffee Meets", "Nightlife", "Startups"],
    active: true,
  },
  {
    name: "Delhi",
    emoji: "🏛️",
    tagline: "Dil Walo Ki",
    members: "1.9K",
    color: "#f97316",
    glow: "rgba(249,115,22,0.35)",
    whatsapp: "https://chat.whatsapp.com/delhi-2gather",
    vibes: ["Photography", "Food Trails", "Comedy Nights", "Cycling"],
    active: true,
  },
  {
    name: "Bangalore",
    emoji: "🌸",
    tagline: "Garden City",
    members: "3.1K",
    color: "#10b981",
    glow: "rgba(16,185,129,0.35)",
    whatsapp: "https://chat.whatsapp.com/bangalore-2gather",
    vibes: ["Tech Meetups", "Yoga", "Indie Films", "Pub Crawls"],
    active: true,
  },
  {
    name: "Hyderabad",
    emoji: "🍛",
    tagline: "City of Pearls",
    members: "1.2K",
    color: "#db2777",
    glow: "rgba(219,39,119,0.35)",
    whatsapp: "https://chat.whatsapp.com/hyderabad-2gather",
    vibes: ["Heritage Walks", "Street Photo", "Book Clubs", "Biryani Trails"],
    active: true,
  },
  {
    name: "Pune",
    emoji: "📚",
    tagline: "Oxford of the East",
    members: "980",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.35)",
    whatsapp: "https://chat.whatsapp.com/pune-2gather",
    vibes: ["Book Clubs", "Trekking", "Live Music", "Artisan Coffee"],
    active: true,
  },
  {
    name: "Chennai",
    emoji: "🎵",
    tagline: "Cultural Capital",
    members: "870",
    color: "#0891b2",
    glow: "rgba(8,145,178,0.35)",
    whatsapp: "https://chat.whatsapp.com/chennai-2gather",
    vibes: ["Beach Runs", "Carnatic Jams", "Cycling", "Film Clubs"],
    active: true,
  },
  {
    name: "Kolkata",
    emoji: "🎨",
    tagline: "City of Joy",
    members: "760",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
    whatsapp: "https://chat.whatsapp.com/kolkata-2gather",
    vibes: ["Sketch Walks", "Food Trails", "Jazz Nights", "Startup Mixers"],
    active: true,
  },
  {
    name: "Ahmedabad",
    emoji: "🪁",
    tagline: "Manchester of India",
    members: "420",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.35)",
    whatsapp: "https://chat.whatsapp.com/ahmedabad-2gather",
    vibes: ["Kite Festivals", "Food Walks", "Garba Nights", "Entrepreneurs"],
    active: false,
  },
  {
    name: "Jaipur",
    emoji: "🏰",
    tagline: "Pink City",
    members: "310",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.35)",
    whatsapp: "https://chat.whatsapp.com/jaipur-2gather",
    vibes: ["Heritage Tours", "Artisan Markets", "Folk Music", "Desert Rides"],
    active: false,
  },
  {
    name: "Goa",
    emoji: "🏖️",
    tagline: "Pearl of the Orient",
    members: "540",
    color: "#14b8a6",
    glow: "rgba(20,184,166,0.35)",
    whatsapp: "https://chat.whatsapp.com/goa-2gather",
    vibes: ["Beach Parties", "Yoga Retreats", "Live Music", "Flea Markets"],
    active: true,
  },
  {
    name: "Surat",
    emoji: "💎",
    tagline: "Diamond City",
    members: "280",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.35)",
    whatsapp: "https://chat.whatsapp.com/surat-2gather",
    vibes: ["Food Festivals", "Textile Trails", "Cricket", "Dandiya"],
    active: false,
  },
  {
    name: "Kochi",
    emoji: "⛵",
    tagline: "Queen of Arabian Sea",
    members: "390",
    color: "#f97316",
    glow: "rgba(249,115,22,0.25)",
    whatsapp: "https://chat.whatsapp.com/kochi-2gather",
    vibes: ["Backwater Rides", "Art Walks", "Seafood Trails", "Startup Meets"],
    active: false,
  },
];

export function StarBurst({ size = 16, color1 = "#4f46e5", color2 = "#f97316", count = 7 }) {
  const arms = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
    const isOrange = i === count - 1;
    const x2 = Math.cos(angle) * (size * 0.82);
    const y2 = Math.sin(angle) * (size * 0.82);
    if (isOrange) {
      return <rect key={i} x={x2 - size * 0.13} y={y2 - size * 0.13} width={size * 0.32} height={size * 0.32} rx={size * 0.06} fill={color2} transform={`rotate(${(angle * 180) / Math.PI + 45},${x2},${y2})`} />;
    }
    return <rect key={i} x={x2 - size * 0.13} y={y2 - size * 0.28} width={size * 0.27} height={size * 0.56} rx={size * 0.07} fill={color1} transform={`rotate(${(angle * 180) / Math.PI},${x2},${y2})`} />;
  });
  return (
    <svg width={size * 2.2} height={size * 2.2} viewBox={`${-size * 1.1} ${-size * 1.1} ${size * 2.2} ${size * 2.2}`} style={{ display: "block" }}>
      {arms}
    </svg>
  );
}

function WhatsAppIcon({ size = 20, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="none" />
      <path fill={color} d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.47 1.65 6.35L3 29l6.82-1.62A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.48l-.38-.23-4.05.96.98-3.93-.25-.4A10.57 10.57 0 0 1 5.4 16C5.4 9.65 10.65 4.4 16 4.4S26.6 9.65 26.6 16 21.35 26.6 16 26.6zm5.82-7.93c-.32-.16-1.88-.93-2.17-1.03-.29-.1-.5-.16-.71.16-.21.32-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54l-.6-.01c-.21 0-.55.08-.84.4-.29.32-1.1 1.07-1.1 2.61s1.13 3.03 1.28 3.24c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37z"/>
    </svg>
  );
}

function Particle({ style }) {
  return <div style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none", ...style }} />;
}

function CityCard({ city, index }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleJoin = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1200);
    window.open(city.whatsapp, "_blank");
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleJoin}
      style={{
        position: "relative",
        background: hovered ? `rgba(${hexToRgb(city.color)},0.08)` : "rgba(255,255,255,0.03)",
        border: hovered ? `1.5px solid ${city.color}55` : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: "24px 22px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        animationDelay: `${index * 0.07}s`,
        animation: "fadeUp 0.5s ease forwards",
        opacity: 0,
        overflow: "hidden",
      }}
    >
      {/* Glow blob on hover */}
      {hovered && (
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 120, height: 120, borderRadius: "50%",
          background: city.glow, filter: "blur(40px)",
          pointerEvents: "none", zIndex: 0,
        }} />
      )}

      {/* Active badge */}
      {city.active && (
        <div style={{
          position: "absolute", top: 14, right: 14,
          display: "flex", alignItems: "center", gap: 5,
          background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
          borderRadius: 50, padding: "3px 9px",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulse 1.8s infinite" }} />
          <span style={{ fontFamily: "'Lufga', sans-serif", fontSize: 11, fontWeight: 700, color: "#10b981" }}>Active</span>
        </div>
      )}

      {/* Body */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 38, lineHeight: 1, marginBottom: 12 }}>{city.emoji}</div>

        <h3 style={{ fontFamily: "'Lufga', sans-serif", fontWeight: 800, fontSize: 20, color: "#f1f0ff", marginBottom: 3, letterSpacing: -0.3 }}>{city.name}</h3>
        <p style={{ fontFamily: "'Lufga', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 14, letterSpacing: 0.3 }}>{city.tagline}</p>

        {/* Vibe chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
          {city.vibes.slice(0, 3).map(v => (
            <span key={v} style={{
              background: `rgba(${hexToRgb(city.color)},0.15)`,
              color: city.color,
              fontFamily: "'Lufga', sans-serif",
              fontSize: 11, fontWeight: 700,
              padding: "3px 9px", borderRadius: 20,
              letterSpacing: 0.2,
            }}>{v}</span>
          ))}
        </div>

        {/* Member count */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <div style={{ display: "flex" }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                width: 22, height: 22, borderRadius: "50%",
                background: `hsl(${parseInt(city.color.slice(1), 16) % 360 + i * 30}, 60%, 55%)`,
                border: "2px solid #0a0a0f",
                marginLeft: i > 0 ? -8 : 0,
              }} />
            ))}
          </div>
          <span style={{ fontFamily: "'Lufga', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
            <strong style={{ color: "#f1f0ff" }}>{city.members}</strong> gatherers
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleJoin}
          style={{
            width: "100%",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
            background: clicked ? "#25D366" : (hovered ? city.color : "rgba(255,255,255,0.07)"),
            border: `1.5px solid ${hovered ? city.color : "rgba(255,255,255,0.12)"}`,
            borderRadius: 12,
            padding: "11px 16px",
            color: "#fff",
            fontFamily: "'Lufga', sans-serif",
            fontWeight: 800,
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.25s",
            letterSpacing: 0.3,
          }}
        >
          <WhatsAppIcon size={16} color="#fff" />
          {clicked ? "Opening WhatsApp…" : `Join ${city.name} Group`}
        </button>
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export default function WhatsAppCommunityPage({ onClose, hideHeader, hideTicker }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    const total = CITIES.reduce((acc, c) => acc + parseFloat(c.members.replace("K", "")) * (c.members.includes("K") ? 1000 : 1), 0);
    setTotalMembers(total);
  }, []);

  const filtered = CITIES.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.vibes.some(v => v.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "all" || (filter === "active" ? c.active : !c.active);
    return matchSearch && matchFilter;
  });

  return (
    <>
      <link href="https://fonts.bunny.net/css?family=lufga:300,400,500,600,700,800,900&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes floatBob { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
        @keyframes ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes glow { 0%,100% { opacity:0.15; } 50% { opacity:0.3; } }
        input::placeholder { color: rgba(255,255,255,0.25); }
        ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-thumb { background:rgba(79,70,229,0.4); border-radius:10px; }
        .filter-btn { cursor:pointer; font-family:'Lufga',sans-serif; font-weight:700; font-size:13px; padding:8px 20px; border-radius:50px; border:1px solid; transition:all 0.2s; }
      `}</style>

      <div style={{
        minHeight: hideHeader ? "auto" : "100vh",
        background: hideHeader ? "transparent" : "#0a0a0f",
        position: (onClose && !hideHeader) ? "fixed" : "relative",
        top: (onClose && !hideHeader) ? 0 : "auto",
        left: (onClose && !hideHeader) ? 0 : "auto",
        width: (onClose && !hideHeader) ? "100vw" : "100%",
        height: (onClose && !hideHeader) ? "100vh" : "auto",
        zIndex: (onClose && !hideHeader) ? 10000 : 1,
        overflowY: (onClose && !hideHeader) ? "auto" : "visible",
        overflowX: "hidden",
        paddingBottom: hideHeader ? "40px" : "0"
      }}>

        {/* Background orbs */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "rgba(79,70,229,0.12)", filter: "blur(80px)", top: -200, right: -200, animation: "glow 4s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(37,211,102,0.08)", filter: "blur(80px)", bottom: -100, left: -100, animation: "glow 5s ease-in-out infinite 1s" }} />
          <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(249,115,22,0.1)", filter: "blur(70px)", top: "40%", left: "45%", animation: "glow 6s ease-in-out infinite 2s" }} />
        </div>

        {/* NAV */}
        {!hideHeader && (
          <nav style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 40px", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontFamily: "'Lufga', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}
                >
                  ← Workspace
                </button>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <StarBurst size={14} />
                <span style={{ fontFamily: "'Lufga', sans-serif", fontWeight: 800, fontSize: 20, color: "#f1f0ff", letterSpacing: -0.5 }}>2gather</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              {onClose ? (
                <button onClick={onClose} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.45)", fontFamily: "'Lufga', sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Home</button>
              ) : (
                <a href="https://www.2gather.in" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontFamily: "'Lufga', sans-serif", fontSize: 14, fontWeight: 600 }}>Home</a>
              )}
              <a href="#cities" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontFamily: "'Lufga', sans-serif", fontSize: 14, fontWeight: 600 }}>Cities</a>
              <a href="https://apps.apple.com/in/app/2gather/id6748943113" target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 7, background: "#25D366", color: "#fff", padding: "9px 18px", borderRadius: 50, fontFamily: "'Lufga', sans-serif", fontWeight: 800, fontSize: 13, textDecoration: "none" }}>
                <WhatsAppIcon size={14} /> Communities
              </a>
            </div>
          </nav>
        )}

        {/* TICKER */}
        {!hideTicker && (
          <div style={{ background: "#25D366", padding: "9px 0", overflow: "hidden", position: "relative", zIndex: 5 }}>
            <div style={{ display: "flex", gap: 0, animation: "ticker 28s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: "inline-flex", gap: 0 }}>
                  {CITIES.map((c, i) => (
                    <span key={i} style={{ fontFamily: "'Lufga', sans-serif", fontWeight: 700, fontSize: 13, color: "#064e3b", paddingRight: 40 }}>
                      {c.emoji} {c.name} · {c.members} gatherers &nbsp;✦&nbsp;
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* HERO */}
        <div style={{ position: "relative", zIndex: 5, textAlign: "center", padding: "140px 40px 50px", maxWidth: 760, margin: "0 auto" }}>
          {/* WA Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)", borderRadius: 50, padding: "8px 20px", marginBottom: 30, animation: "fadeUp 0.5s ease forwards" }}>
            <WhatsAppIcon size={16} color="#25D366" />
            <span style={{ fontFamily: "'Lufga', sans-serif", fontWeight: 700, fontSize: 13, color: "#25D366" }}>Official WhatsApp Communities</span>
          </div>

          <h1 style={{ fontFamily: "'Lufga', sans-serif", fontSize: 56, fontWeight: 800, color: "#f1f0ff", lineHeight: 1.1, marginBottom: 20, letterSpacing: -1.5, animation: "fadeUp 0.5s 0.1s ease forwards", opacity: 0 }}>
            Find your city,<br />
            <span style={{ background: "linear-gradient(90deg,#25D366,#128C7E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>join your tribe.</span>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Lufga', sans-serif", fontSize: 17, lineHeight: 1.7, marginBottom: 40, animation: "fadeUp 0.5s 0.2s ease forwards", opacity: 0 }}>
            One tap. That's all it takes to connect with thousands of gatherers<br />in your city — events, hangouts, and real friendships, on WhatsApp.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 50, animation: "fadeUp 0.5s 0.3s ease forwards", opacity: 0 }}>
            {[
              ["12", "Cities"],
              ["13K+", "Members"],
              ["150+", "Events/mo"],
            ].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Lufga', sans-serif", fontSize: 28, fontWeight: 800, color: "#f1f0ff" }}>{n}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Lufga', sans-serif", fontSize: 13, fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Search + Filter */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", animation: "fadeUp 0.5s 0.35s ease forwards", opacity: 0 }}>
            <div 
              className="search-container"
              style={{ 
                position: "relative", 
                width: "100%", 
                maxWidth: 440,
                transition: "transform 0.3s ease"
              }}
            >
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18, pointerEvents: "none", zIndex: 2 }}>🔍</span>
              <input
                type="text"
                placeholder="Search city or vibe (e.g. Hiking, Jazz…)"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 50,
                  padding: "16px 20px 16px 50px",
                  color: "#f1f0ff",
                  fontSize: 15,
                  fontFamily: "'Lufga', sans-serif",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
                }}
                onFocus={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.borderColor = "#25D366";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(37,211,102,0.3)";
                }}
                onBlur={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[["all", "All Cities"], ["active", "🟢 Active"], ["soon", "⏳ Coming Soon"]].map(([val, label]) => (
                <button
                  key={val}
                  className="filter-btn"
                  onClick={() => setFilter(val)}
                  style={{
                    background: filter === val ? (val === "active" ? "#25D366" : "#4f46e5") : "transparent",
                    borderColor: filter === val ? (val === "active" ? "#25D366" : "#4f46e5") : "rgba(255,255,255,0.15)",
                    color: filter === val ? "#fff" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* OVERLAPPING SLANTED MARQUEES */}
        <div style={{ 
          position: "relative", 
          height: "160px", 
          margin: "60px 0 80px", 
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible"
        }}>
          {/* Bottom Banner (Green, tilted -2deg) */}
          <div style={{ 
            position: "absolute",
            width: "120%",
            background: "#25D366",
            padding: "18px 0",
            transform: "rotate(-3.5deg)",
            zIndex: 1,
            borderTop: "3px solid #000",
            borderBottom: "3px solid #000",
            boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
            overflow: "hidden"
          }}>
            <div style={{ display: "flex", animation: "ticker 40s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
              {[...Array(6)].map((_, i) => (
                <span key={i} style={{ fontFamily: "'Lufga', sans-serif", fontWeight: 900, fontSize: 32, color: "#064e3b", textTransform: "uppercase", paddingRight: "40px" }}>
                  Join your tribe ✦ Connect ✦ Gather ✦ Discover ✦ 
                </span>
              ))}
            </div>
          </div>

          {/* Top Banner (Light Grey, tilted 2deg) */}
          <div style={{ 
            position: "absolute",
            width: "120%",
            background: "#f3f4f6",
            padding: "18px 0",
            transform: "rotate(2.5deg)",
            zIndex: 2,
            borderTop: "3px solid #000",
            borderBottom: "3px solid #000",
            boxShadow: "0 10px 50px rgba(0,0,0,0.5)",
            overflow: "hidden"
          }}>
            <div style={{ display: "flex", animation: "ticker 60s linear infinite reverse", whiteSpace: "nowrap", width: "max-content" }}>
              {[...Array(6)].map((_, i) => (
                <span key={i} style={{ fontFamily: "'Lufga', sans-serif", fontWeight: 900, fontSize: 32, color: "#000", textTransform: "uppercase", paddingRight: "40px" }}>
                  City Communities ✦ WhatsApp Groups ✦ Real Friends ✦ 
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CITY GRID */}
        <div id="cities" style={{ position: "relative", zIndex: 5, maxWidth: 1160, margin: "0 auto", padding: "0 40px 60px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.35)", fontFamily: "'Lufga', sans-serif", fontSize: 16 }}>
              😕 No cities found for "<strong style={{ color: "rgba(255,255,255,0.6)" }}>{search}</strong>"
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
              {filtered.map((city, i) => <CityCard key={city.name} city={city} index={i} />)}
            </div>
          )}
        </div>

        {/* REQUEST CITY BANNER */}
        <div style={{ position: "relative", zIndex: 5, maxWidth: 1160, margin: "0 auto 80px", padding: "0 40px" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.2), rgba(37,211,102,0.1))", border: "1px solid rgba(79,70,229,0.3)", borderRadius: 24, padding: "36px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div>
              <h3 style={{ fontFamily: "'Lufga', sans-serif", fontSize: 22, fontWeight: 800, color: "#f1f0ff", marginBottom: 8 }}>Don't see your city? 🙋</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Lufga', sans-serif", fontSize: 15, maxWidth: 480 }}>
                We're expanding fast. Drop us a message and we'll create a WhatsApp community for your city — usually within 48 hours!
              </p>
            </div>
            <a
              href="https://wa.me/91XXXXXXXXXX?text=Hey%202gather!%20I%27d%20love%20a%20WhatsApp%20community%20for%20my%20city%20%F0%9F%99%8F"
              target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", padding: "14px 28px", borderRadius: 14, fontFamily: "'Lufga', sans-serif", fontWeight: 800, fontSize: 15, textDecoration: "none", flexShrink: 0, transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <WhatsAppIcon size={18} /> Request My City
            </a>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div style={{ position: "relative", zIndex: 5, maxWidth: 1160, margin: "0 auto 80px", padding: "0 40px" }}>
          <h2 style={{ fontFamily: "'Lufga', sans-serif", fontSize: 30, fontWeight: 800, color: "#f1f0ff", textAlign: "center", marginBottom: 10 }}>How it works</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Lufga', sans-serif", fontSize: 15, textAlign: "center", marginBottom: 36 }}>Three steps to your next real-life hangout</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { n: "01", icon: "🏙️", title: "Pick Your City", desc: "Browse the list and find the community for your city. Active groups are marked in green." },
              { n: "02", icon: "📲", title: "Tap to Join", desc: "Hit the WhatsApp button. You'll be taken directly to the group link — no form, no wait." },
              { n: "03", icon: "🎉", title: "Meet & Gather", desc: "Get event updates, meet nearby people, and show up to your first hangout this weekend." },
            ].map(s => (
              <div key={s.n} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ color: "rgba(37,211,102,0.7)", fontFamily: "'Lufga', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, marginBottom: 8 }}>STEP {s.n}</div>
                <h3 style={{ fontFamily: "'Lufga', sans-serif", fontSize: 18, fontWeight: 800, color: "#f1f0ff", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Lufga', sans-serif", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 5, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <StarBurst size={10} />
            <span style={{ fontFamily: "'Lufga', sans-serif", fontWeight: 800, fontSize: 15, color: "rgba(255,255,255,0.5)" }}>2gather</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Lufga', sans-serif", fontSize: 13 }}>© 2025 2gather · Where Vibes Belong</span>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <a href="https://www.2gather.in" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Lufga', sans-serif", fontSize: 13, textDecoration: "none" }}>Website</a>
            <a href="https://www.2gather.in/community-guidelines" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Lufga', sans-serif", fontSize: 13, textDecoration: "none" }}>Guidelines</a>
          </div>
        </div>

      </div>
    </>
  );
}
