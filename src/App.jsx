import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import WhatsAppCommunityPage, { StarBurst } from '../2gather-whatsapp-community.jsx';
import CircularGallery from './CircularGallery';
import ScrollFloat from './ScrollFloat';
import ShinyText from './ShinyText';
import RotatingText from './RotatingText';
import MarqueeBanner from './MarqueeBanner';
import Footer from './Footer';
import TwoGatherSlides from '../2gather-slides.jsx';
import DomeGallery from './DomeGallery';
import FlowingFAQ from './FlowingFAQ';
import ScrollVideoBackground from './ScrollVideoBackground';
import Stack from './Stack';
import ThreeDSlider from './ThreeDSlider';
import ToggleTheme from './ToggleTheme';
import AboutBackgroundCarousel from './AboutBackgroundCarousel';
import ScrollReveal from './ScrollReveal';

function FeatureStepper({ theme }) {
  return (
    <div className={`feature-stepper-section ${theme}`}>
      <div className="feature-stepper-container">
        
        {/* Card 1 */}
        <div className="stepper-card">
          <div className="stepper-emoji-wrap">👥</div>
          <span className="stepper-label">Over</span>
          <span className="stepper-value">13k+ gatherers</span>
        </div>

        {/* Playful Loop Arrow 1 */}
        <div className="stepper-arrow-wrap">
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="stepper-svg-arrow loop-arrow">
            <path d="M10,22 C35,-2 20,48 38,40 C56,32 60,18 85,25" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path d="M72,20 L85,25 L80,12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>

        {/* Card 2 */}
        <div className="stepper-card">
          <div className="stepper-emoji-wrap">⛺</div>
          <span className="stepper-label">Across</span>
          <span className="stepper-value">12+ active tribes</span>
        </div>

        {/* Playful Curve Arrow 2 */}
        <div className="stepper-arrow-wrap">
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="stepper-svg-arrow curve-arrow">
            <path d="M15,40 C35,18 65,18 85,32" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path d="M72,30 L85,32 L78,44" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>

        {/* Card 3 */}
        <div className="stepper-card">
          <div className="stepper-emoji-wrap">🎉</div>
          <span className="stepper-label">Hosting</span>
          <span className="stepper-value">120+ plans /week</span>
        </div>

      </div>
    </div>
  );
}

function ExploreInterestsSection({ theme }) {
  const interestCards = [
    {
      title: "Sports & Athletics",
      emoji: "🏸",
      image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=500&auto=format&fit=crop",
      desc: "From badminton matches to weekend trekking, find your fit!",
      color: "#ff8a3d"
    },
    {
      title: "Tech & Startups",
      emoji: "🚀",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=500&auto=format&fit=crop",
      desc: "Hackathons, founder mixers, and cutting-edge ideas.",
      color: "#3b82f6"
    },
    {
      title: "Music & Jamming",
      emoji: "🎵",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop",
      desc: "Unplugged acoustic jams, concerts, and music tribes.",
      color: "#ec4899"
    },
    {
      title: "Cafes & Socials",
      emoji: "☕",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=500&auto=format&fit=crop",
      desc: "Sunday brunch, cafe hops, and casual warm chats.",
      color: "#10b981"
    },
    {
      title: "Arts & Creative",
      emoji: "🎨",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=500&auto=format&fit=crop",
      desc: "Painting meetups, pottery workshops, and design review clubs.",
      color: "#a855f7"
    }
  ];

  return (
    <section className={`interests-section ${theme}`}>
      <div className="interests-intro">
        <h3 className="interests-subtitle">Find Your Vibe</h3>
        <h2 className="interests-title">Explore your interest</h2>
        <p className="interests-desc">
          Drag or click the interactive card stack to cycle through Pune's most active interest tribes. Whether you're into athletics, software development, unplugged jamming, coffee hops, or creative painting sessions—there's a tribe waiting for you.
        </p>
        <div className="interests-callout">
          <span>💡</span>
          <span>Tip: Drag or click the cards to swipe!</span>
        </div>
      </div>
      
      <div className="interests-stack-wrapper">
        <div className="interests-stack-container">
          <Stack
            randomRotation={true}
            sensitivity={140}
            sendToBackOnClick={true}
            autoplay={true}
            autoplayDelay={3500}
            pauseOnHover={true}
            cards={interestCards.map((card, i) => (
              <div 
                key={i} 
                className="interest-stack-card" 
                style={{ '--card-accent': card.color }}
              >
                <img src={card.image} alt={card.title} className="interest-card-bg" />
                <div className="interest-card-overlay" />
                <div className="interest-card-badge">
                  <span>{card.emoji}</span>
                  <span>{card.title}</span>
                </div>
                <div className="interest-card-content">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          />
        </div>
      </div>
    </section>
  );
}



const faqItems = [
  {
    question: 'What is 2gather?',
    answer: '2gather is a hyper-local social app to discover and host real-world meetups—sports, jamming sessions, coffee hangouts, workshops, and more! Find people around you who share your interests and make plans in minutes.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=200&h=200',
    marqueeBgColor: '#fbcfe8',
    marqueeTextColor: '#000000'
  },
  {
    question: 'How do I find events nearby?',
    answer: 'Simply open the Events tab and select your city to browse live, curated, in-person meetups near you! Filter by categories like Tech, Creative, Wellness, or Social to match your current vibe.',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=200&h=200',
    marqueeBgColor: '#fef08a',
    marqueeTextColor: '#000000'
  },
  {
    question: 'Is it free?',
    answer: 'Yes! 2gather is completely free to download, browse, and join tribes. We want to make it as easy as possible for everyone to connect and build meaningful real-world communities.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=200&h=200',
    marqueeBgColor: '#bfdbfe',
    marqueeTextColor: '#000000'
  },
  {
    question: 'Can anyone host events?',
    answer: 'Absolutely! Whether you want to host a cozy coffee meetup, a tech hackathon, a tennis game, or a music jam session, you can create and publish your event directly to the platform for others to join.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=200&h=200',
    marqueeBgColor: '#bbf7d0',
    marqueeTextColor: '#000000'
  },
  {
    question: 'How do I join a tribe?',
    answer: 'Navigate to the Tribes tab, find an interest group that calls out to you (such as our Tech VECTORS, Creative MUSE, or Wellness AMBIENT cohorts), and join in! Regular hangouts are scheduled weekly.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=200&h=200',
    marqueeBgColor: '#fed7aa',
    marqueeTextColor: '#000000'
  },
  {
    question: 'How does chat work?',
    answer: 'Once you RSVP to an event or join a community tribe, you are instantly added to a dedicated group chat with the other participants. It makes coordinating timing and meeting spots super seamless!',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200&h=200',
    marqueeBgColor: '#ddd6fe',
    marqueeTextColor: '#000000'
  },
  {
    question: 'How do you ensure safety?',
    answer: 'We prioritize safety. 2gather relies on verified profiles, and community guidelines are strictly enforced. Hosts also have moderation controls to ensure all in-person spaces are warm and welcoming.',
    image: 'https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?auto=format&fit=crop&q=80&w=200&h=200',
    marqueeBgColor: '#fed7d7',
    marqueeTextColor: '#000000'
  }
];

const galleryMemories = [
  { image: '/tribe.png', text: 'Social Badminton 🏸' },
  { image: '/tribe1.png', text: 'Sunset Café Walk ☕' },
  { image: '/adventure_banner.png', text: 'Midnight Hike 🥾' },
  { image: '/creative_banner.png', text: 'Acoustic Jam Sessions 🎸' },
  { image: '/tech_banner.png', text: 'Co-Working Sync 💻' },
  { image: '/social_banner.png', text: 'Board Games Night 🎲' },
  { image: '/wellness_banner.png', text: 'Morning Jog & Yoga 🏃‍♂️' },
  { image: '/a (3).png', text: 'Strangers to Friends 🙌' },
  { image: '/a (1).png', text: 'Pizza & Chill Mixer 🍕' },
  { image: '/a (5).png', text: 'City Night Photo Walk 📸' }
];



/* const getVibeRecommendation = (interest, battery) => {
  if (interest === 'adventure') {
    if (battery === 'full') {
      return {
        title: 'Wellness & Adventure Tribe 🏃‍♂️🥾',
        desc: 'You are charged up and ready to move! Your match is the Wellness & Adventure tribe. From scenic weekend hikes to high-intensity badminton mixers, you will find active gatherers who love trading screen time for sweat and views.',
        badge: '98% Match',
        emoji: '🏃‍♂️',
        accentColor: '#25d366'
      };
    } else if (battery === 'medium') {
      return {
        title: 'Sunset Café Walkers ☕🌲',
        desc: 'You want to get outside but keep it casual. Your match is the Café Walking crew! Meet local gatherers for a steady walk through the city’s green spaces, ending at a gorgeous café for sunset drinks.',
        badge: '94% Match',
        emoji: '☕',
        accentColor: '#ffd700'
      };
    } else {
      return {
        title: 'Morning Yoga & Meditation 🧘‍♀️✨',
        desc: 'Your energy is quiet and reflective. The Morning Yoga & Mindful Breathing group is perfect. A low-energy outdoor gathering to start the day with peaceful vibes, fresh air, and absolute calm.',
        badge: '91% Match',
        emoji: '🧘‍♀️',
        accentColor: '#38bdf8'
      };
    }
  } else if (interest === 'creative') {
    if (battery === 'full') {
      return {
        title: 'Acoustic Jam & Open Mic 🎸🎤',
        desc: 'You want to express yourself and vibe with a crowd! Join the Acoustic Jam & Open Mic tribe. Bring your guitar, vocals, or just your clapping hands for an evening of shared music and electric talent.',
        badge: '97% Match',
        emoji: '🎸',
        accentColor: '#ff5c00'
      };
    } else if (battery === 'medium') {
      return {
        title: 'Clay & Paint Workshop 🎨🏺',
        desc: 'A perfectly balanced creative release. Join the Clay Painting and Sketching gathering. Good tunes, warm lighting, and hands-on art in a relaxing, chatter-friendly workshop.',
        badge: '95% Match',
        emoji: '🎨',
        accentColor: '#ffd700'
      };
    } else {
      return {
        title: 'Zine Making & Sketching 📝🎨',
        desc: 'A quiet, focused creative bubble. Bring your sketchbook or journal and gather at a quiet gallery café. Exchange ideas, draw, or make zines alongside fellow gentle creatives.',
        badge: '92% Match',
        emoji: '📝',
        accentColor: '#ec4899'
      };
    }
  } else if (interest === 'tech') {
    if (battery === 'full') {
      return {
        title: 'Lightning Hack-Syncs 💻⚡',
        desc: 'Energy is high and you want to build fast! Join the Hack-Sync tribe. Bring your laptops, showcase your current builds, and brainstorm new hacks with local developers in high-intensity coffee shop sessions.',
        badge: '96% Match',
        emoji: '💻',
        accentColor: '#38bdf8'
      };
    } else {
      return {
        title: 'Silent Co-working & Chai ☕💻',
        desc: 'Looking for gentle, productive presence. Silent Co-working & Chai is your vibe. Sit together, crush your tasks in absolute focus, and share great conversations during tea breaks.',
        badge: '95% Match',
        emoji: '☕',
        accentColor: '#25d366'
      };
    }
  } else if (interest === 'cozy') {
    if (battery === 'low') {
      return {
        title: 'Silent Reading Circle 📖🤫',
        desc: 'Your social battery is low, but you still want companionship. The Silent Reading Circle is perfect. Gather at a quiet nook, read your favorite book in peaceful silence for an hour, followed by a warm tea chat.',
        badge: '98% Match',
        emoji: '📖',
        accentColor: '#ec4899'
      };
    } else {
      return {
        title: 'Café & Warm Conversations ☕💬',
        desc: 'You want deep, authentic conversations with fresh faces. Gather at local boutique cafés for curated question cards, warm lattes, and stories that go way beyond the typical small talk.',
        badge: '96% Match',
        emoji: '💬',
        accentColor: '#ffd700'
      };
    }
  } else { // gaming
    if (battery === 'full') {
      return {
        title: 'Playful Board Game Arena 🎲🔥',
        desc: 'High energy, high competition, high fun! Join the Board Game Arena. From intensive strategy games like Settlers of Catan to rapid party games, you will match with lively players ready for game night.',
        badge: '99% Match',
        emoji: '🎲',
        accentColor: '#25d366'
      };
    } else {
      return {
        title: 'Cozy Retro Gaming Vibe 👾🎮',
        desc: 'A laidback gaming session. Swap stories over classic arcade games, retro console setups, or cooperative indie games. Relaxed fun, low pressure, maximum nostalgic comfort.',
        badge: '93% Match',
        emoji: '👾',
        accentColor: '#38bdf8'
      };
    }
  }
}; */

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'howItWorks' | 'aboutUs' | 'events' | 'communities'
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [selectedCity, setSelectedCity] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHostModal, setShowHostModal] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const [waitlistTitle, setWaitlistTitle] = useState('SECURE YOUR MEMBERSHIP');
  const [waitlistDesc, setWaitlistDesc] = useState('Enter your credentials to claim priority access to the 2gather unified collaboration ecosystem.');
  
  // Contact Us page states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactCategory, setContactCategory] = useState('General Inquiry');
  const [contactPriority, setContactPriority] = useState('Medium');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [mapZone, setMapZone] = useState('📍 HQ Office: Coffee is always on us!');
  const [slothDialogue, setSlothDialogue] = useState("Hi! I'm Joy the Sloth. Fill out the form and I'll sail your message across the sea! 🦥");
  const [isScrolled, setIsScrolled] = useState(false);
  
  const initialEvents = [
    // Pune
    {
      id: 1,
      title: 'High-Performance Founders Mixer',
      city: 'PUNE',
      category: 'TECH',
      date: 'Sat, May 30',
      time: '6:30 PM',
      location: 'Koregaon Park Social, Pune',
      spotsTotal: 40,
      spotsFilled: 28,
      hostName: 'Rohan K.',
      hostAvatar: '🌸',
      description: 'An exclusive networking evening for Pune-based startup founders, developers, and tech builders to sync on AI, Web3, and growth.',
      gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      price: 'Free'
    },
    {
      id: 2,
      title: 'Sunrise Trek & French Press',
      city: 'PUNE',
      category: 'ADVENTURE',
      date: 'Sun, May 31',
      time: '5:30 AM',
      location: 'Sinhagad Fort, Pune',
      spotsTotal: 15,
      spotsFilled: 12,
      hostName: 'Amit P.',
      hostAvatar: '🧗',
      description: 'Early morning hike up Sinhagad Fort. We will reach the top for sunrise and brew fresh French press coffee overlooking the valleys.',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      price: '₹200'
    },
    {
      id: 3,
      title: 'Acoustic Rooftop Jam & Dinner',
      city: 'PUNE',
      category: 'CREATIVE',
      date: 'Wed, Jun 03',
      time: '7:30 PM',
      location: 'The Sassy Spoon, Pune',
      spotsTotal: 25,
      spotsFilled: 18,
      hostName: 'Neha S.',
      hostAvatar: '🎨',
      description: 'Bring your instruments, your voice, or just your love for good music. A cozy evening of acoustic covers, singing, and dinner under the stars.',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      price: '₹500'
    },
    // Bangalore
    {
      id: 4,
      title: 'Indiranagar Tech & AI Roundtable',
      city: 'BANGALORE',
      category: 'TECH',
      date: 'Thu, May 28',
      time: '7:00 PM',
      location: 'WeWork Galaxy, Bangalore',
      spotsTotal: 50,
      spotsFilled: 42,
      hostName: 'Karthik M.',
      hostAvatar: '💻',
      description: 'Deep-dive discussion into LLM optimizations, agentic systems, and local deployment pipelines. Pizza and drinks on us!',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      price: 'Free'
    },
    {
      id: 5,
      title: 'Sunset Roof Hatha Yoga',
      city: 'BANGALORE',
      category: 'WELLNESS',
      date: 'Sat, May 30',
      time: '5:00 PM',
      location: 'Koramangala Club, Bangalore',
      spotsTotal: 20,
      spotsFilled: 11,
      hostName: 'Elena D.',
      hostAvatar: '🧘',
      description: 'Unwind your week with a mindful Hatha yoga flow during sunset. Followed by high-protein acai bowls and refreshing herbal tea.',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      price: '₹400'
    },
    {
      id: 6,
      title: 'Cubbon Park Writers\' Circle',
      city: 'BANGALORE',
      category: 'CREATIVE',
      date: 'Sun, May 31',
      time: '10:00 AM',
      location: 'Cubbon Park (Near Bandstand), Bangalore',
      spotsTotal: 15,
      spotsFilled: 9,
      hostName: 'Aditi V.',
      hostAvatar: '✒️',
      description: 'A cozy gathering for creative writers. Bring your journals, notebooks, or laptops. We will do writing prompts and friendly sharing.',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      price: 'Free'
    },
    // Mumbai
    {
      id: 7,
      title: 'Late Night Marine Drive Midnight Run',
      city: 'MUMBAI',
      category: 'WELLNESS',
      date: 'Fri, May 29',
      time: '11:00 PM',
      location: 'Nariman Point, Mumbai',
      spotsTotal: 30,
      spotsFilled: 19,
      hostName: 'Rahul G.',
      hostAvatar: '🏃',
      description: 'Beat the Mumbai heat! Join us for a midnight running flow along Marine Drive, finishing with ice cream at Chowpatty.',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      price: 'Free'
    },
    {
      id: 8,
      title: 'Colaba Art Walk & Sketching Session',
      city: 'MUMBAI',
      category: 'CREATIVE',
      date: 'Sat, May 30',
      time: '4:00 PM',
      location: 'Jehangir Art Gallery, Mumbai',
      spotsTotal: 18,
      spotsFilled: 14,
      hostName: 'Priya S.',
      hostAvatar: '🎨',
      description: 'Let\'s explore the local art galleries in Colaba, find inspiration, and sit down at a cafe for a collaborative sketching session.',
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
      price: 'Free'
    },
    {
      id: 9,
      title: 'Venture Capital Networking Lounge',
      city: 'MUMBAI',
      category: 'TECH',
      date: 'Tue, Jun 02',
      time: '6:30 PM',
      location: 'Soho House, Mumbai',
      spotsTotal: 60,
      spotsFilled: 55,
      hostName: 'Kabir S.',
      hostAvatar: '💼',
      description: 'An premium evening bringing together Mumbai VC associates, angel investors, and pre-seed founders for meaningful collaboration.',
      gradient: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
      price: '₹1200'
    },
    // Delhi
    {
      id: 10,
      title: 'Hauz Khas Boardgames & Brews',
      city: 'DELHI',
      category: 'SOCIAL',
      date: 'Sat, May 30',
      time: '3:00 PM',
      location: 'The Boardroom Cafe, HKV',
      spotsTotal: 25,
      spotsFilled: 22,
      hostName: 'Divya R.',
      hostAvatar: '🎲',
      description: 'Catan, Ticket to Ride, Secret Hitler, and more. A fun, lighthearted social afternoon to meet new friends over artisan iced lattes.',
      gradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
      price: '₹350'
    },
    {
      id: 11,
      title: 'Cyber City PM Sync',
      city: 'DELHI',
      category: 'TECH',
      date: 'Wed, Jun 03',
      time: '7:00 PM',
      location: 'Cyber Hub Social, Gurugram',
      spotsTotal: 30,
      spotsFilled: 18,
      hostName: 'Kunal K.',
      hostAvatar: '🚀',
      description: 'Share your PM war stories, talk PM alignment, frameworks, and network with product managers from top high-growth tech firms.',
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      price: 'Free'
    },
    // Hyderabad
    {
      id: 12,
      title: 'Jubilee Hills Startup Pitch Night',
      city: 'HYDERABAD',
      category: 'SOCIAL',
      date: 'Fri, May 29',
      time: '7:30 PM',
      location: 'Heart Cup Coffee, Hyderabad',
      spotsTotal: 40,
      spotsFilled: 32,
      hostName: 'Sneha P.',
      hostAvatar: '🍛',
      description: 'Informal startup pitches, peer feedback, and networking over Hyderabad\'s legendary authentic biryani.',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      price: '₹600'
    },
    {
      id: 13,
      title: 'Gachibowli AI Hack & Coffee',
      city: 'HYDERABAD',
      category: 'TECH',
      date: 'Sat, May 30',
      time: '9:00 AM',
      location: 'Third Wave Coffee, Gachibowli',
      spotsTotal: 20,
      spotsFilled: 16,
      hostName: 'Vikas Y.',
      hostAvatar: '🤖',
      description: 'A 6-hour collaborative AI hacking session. Group up, build a mini demo using API credits, and showcase to peers over caffeine.',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      price: 'Free'
    }
  ];

  const [events, setEvents] = useState(initialEvents);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    city: 'PUNE',
    category: 'TECH',
    date: '',
    time: '',
    location: '',
    spotsTotal: 20,
    description: '',
    price: 'Free'
  });

  const openWaitlist = (title, desc) => {
    setWaitlistTitle(title || 'SECURE YOUR MEMBERSHIP');
    setWaitlistDesc(desc || 'Enter your credentials to claim priority access to the 2gather unified collaboration ecosystem.');
    setShowWaitlist(true);
  };

  const handleHostSubmit = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.location && newEvent.date) {
      const addedEvent = {
        ...newEvent,
        id: Date.now(),
        spotsFilled: 1,
        hostName: 'You (Host)',
        hostAvatar: '👑',
        gradient: getCategoryGradient(newEvent.category)
      };
      setEvents([addedEvent, ...events]);
      setShowHostModal(false);
      setNewEvent({
        title: '',
        city: 'PUNE',
        category: 'TECH',
        date: '',
        time: '',
        location: '',
        spotsTotal: 20,
        description: '',
        price: 'Free'
      });
      setTimeout(() => {
        scrollToEvents();
      }, 100);
    }
  };

  const getCategoryGradient = (cat) => {
    switch (cat) {
      case 'TECH': return 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)';
      case 'WELLNESS': return 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)';
      case 'CREATIVE': return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      case 'ADVENTURE': return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      case 'SOCIAL': return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      default: return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
    }
  };

  const getCategoryImg = (cat) => {
    if (!cat) return '/tech_banner.png';
    const cleanCat = cat.trim().toUpperCase();
    switch (cleanCat) {
      case 'TECH': return '/tech_banner.png';
      case 'WELLNESS': return '/wellness_banner.png';
      case 'CREATIVE': return '/creative_banner.png';
      case 'ADVENTURE': return '/adventure_banner.png';
      case 'SOCIAL': return '/social_banner.png';
      default: return '/tech_banner.png';
    }
  };

  const scrollToEvents = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const filteredEvents = events.filter((event) => {
    const matchesCity = selectedCity === 'ALL' || event.city === selectedCity;
    const matchesCategory = selectedCategory === 'ALL' || event.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (event.hostName && event.hostName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCity && matchesCategory && matchesSearch;
  });

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

  // Passive scroll progress listener to update GPU-accelerated CSS scroll variables
  useEffect(() => {
    if (activeTab !== 'contact') {
      document.documentElement.style.setProperty('--contact-scroll-percent', '0');
      document.documentElement.classList.remove('scrolled-past');
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = 300;
      const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));
      
      document.documentElement.style.setProperty('--contact-scroll-percent', progress.toString());
      
      if (progress > 0.6) {
        document.documentElement.classList.add('scrolled-past');
      } else {
        document.documentElement.classList.remove('scrolled-past');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [activeTab]);



  // Global scrolled state to morph the unified header navbar into a floating glass pill
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactSubject || !contactMessage) return;
    setIsSubmittingContact(true);
    // Premium animated simulated network sync
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSuccess(true);
    }, 2000);
  };

  const resetContactForm = () => {
    setContactName('');
    setContactEmail('');
    setContactSubject('');
    setContactCategory('General Inquiry');
    setContactPriority('Medium');
    setContactMessage('');
    setContactSuccess(false);
  };

  return (
    <div className={`app-container ${theme}${(activeTab === 'home' || activeTab === 'events') ? ' home-active' : ''}`}>
      {activeTab === 'contact' && <ScrollVideoBackground theme={theme} />}

      {/* Background: clean white for home, ambient glow for other pages */}

      {/* Parallax ambient background for other pages */}
      {(activeTab !== 'home' && activeTab !== 'events' && activeTab !== 'contact') && (
        <div
          className="ambient-bg"
          style={{
            transform: `scale(1.03) translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        ></div>
      )}
      {(activeTab !== 'home' && activeTab !== 'events' && activeTab !== 'contact') && <div className="ambient-overlay"></div>}


      {/* Unified Navbar */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`} role="banner">
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
            
            {/* Circular Theme Toggle with Cinematic Circle-Spread View Transition */}
            <ToggleTheme theme={theme} toggleTheme={toggleTheme} />
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
              and memories &mdash; all <RotatingText
                texts={['2gather.', 'together.', 'to gather.']}
                mainClassName="home-hero-rotating-text"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
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
            <div 
              className="home-details-container"
              style={{ 
                width: '100%', 
                background: theme === 'dark' ? '#07050d' : '#ffffff', 
                position: 'relative', 
                zIndex: 10, 
                padding: '0 0 60px 0',
                transition: 'background 0.3s ease'
              }}
            >
              <FeatureStepper theme={theme} />
              <TwoGatherSlides theme={theme} />
              <ExploreInterestsSection theme={theme} />

               {/* Premium Neobrutalism Landscape Testimonials Section with Infinite Scrolling Track */}
              <div className="home-testimonials-section">
                <div className="testimonials-container">
                  <h2 className="testimonials-main-title">What the Tribe Says</h2>
                  <p className="testimonials-subtitle">Hear from our members who traded screen time for real connections</p>
                  
                  <div className="testimonials-viewport">
                    <div className="testimonials-track">
                      {/* Set 1 of cards */}
                      {/* Testimonial Card 1 */}
                      <div className="testimonial-card-wrapper">
                        <div className="testimonial-shadow" style={{ backgroundColor: '#FFD23F' }} />
                        <div className="testimonial-card">
                          <div className="testimonial-left-col">
                            <img src="/a (1).png" alt="Michael Souris" className="testimonial-avatar" />
                            <h3 className="testimonial-name">Michael Souris</h3>
                            <span className="testimonial-role">Content Creator</span>
                            <div className="testimonial-stars">★★★★★</div>
                          </div>
                          <div className="testimonial-right-col">
                            <p className="testimonial-quote">
                              "As a big fan of meeting local people, I joined 2gather to satisfy my social battery. One of the finest communities in the city—their events are the perfect place to connect in a warm, welcoming vibe!"
                            </p>
                            <div className="testimonial-thumbnails">
                              <img src="/a (1).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (2).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (3).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (4).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (5).png" alt="experience" className="testimonial-thumb" />
                              <div className="testimonial-thumb-more">15+</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Card 2 */}
                      <div className="testimonial-card-wrapper">
                        <div className="testimonial-shadow" style={{ backgroundColor: '#4CC9F0' }} />
                        <div className="testimonial-card">
                          <div className="testimonial-left-col">
                            <img src="/a (4).png" alt="Sarah Jenkins" className="testimonial-avatar" />
                            <h3 className="testimonial-name">Sarah Jenkins</h3>
                            <span className="testimonial-role">Product Designer</span>
                            <div className="testimonial-stars">★★★★★</div>
                          </div>
                          <div className="testimonial-right-col">
                            <p className="testimonial-quote">
                              "I was super hesitant about going to offline events alone, but 2gather changed everything! The hosts are incredibly welcoming, the venues are stunning, and I made close friends in my first week."
                            </p>
                            <div className="testimonial-thumbnails">
                              <img src="/a (3).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (4).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (5).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (1).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (2).png" alt="experience" className="testimonial-thumb" />
                              <div className="testimonial-thumb-more">8+</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Card 3 */}
                      <div className="testimonial-card-wrapper">
                        <div className="testimonial-shadow" style={{ backgroundColor: '#25D366' }} />
                        <div className="testimonial-card">
                          <div className="testimonial-left-col">
                            <img src="/a (5).png" alt="Rohan Malhotra" className="testimonial-avatar" />
                            <h3 className="testimonial-name">Rohan Malhotra</h3>
                            <span className="testimonial-role">Software Architect</span>
                            <div className="testimonial-stars">★★★★★</div>
                          </div>
                          <div className="testimonial-right-col">
                            <p className="testimonial-quote">
                              "Absolutely top-tier curation. The mixers and board game nights are organized to absolute perfection. No awkward standing around—just great people, amazing vibes, and unforgettable experiences!"
                            </p>
                            <div className="testimonial-thumbnails">
                              <img src="/a (2).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (1).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (3).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (4).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (5).png" alt="experience" className="testimonial-thumb" />
                              <div className="testimonial-thumb-more">12+</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Set 2 (Exact duplicate for seamless looping animation) */}
                      {/* Testimonial Card 1 (Duplicate) */}
                      <div className="testimonial-card-wrapper">
                        <div className="testimonial-shadow" style={{ backgroundColor: '#FFD23F' }} />
                        <div className="testimonial-card">
                          <div className="testimonial-left-col">
                            <img src="/a (1).png" alt="Michael Souris" className="testimonial-avatar" />
                            <h3 className="testimonial-name">Michael Souris</h3>
                            <span className="testimonial-role">Content Creator</span>
                            <div className="testimonial-stars">★★★★★</div>
                          </div>
                          <div className="testimonial-right-col">
                            <p className="testimonial-quote">
                              "As a big fan of meeting local people, I joined 2gather to satisfy my social battery. One of the finest communities in the city—their events are the perfect place to connect in a warm, welcoming vibe!"
                            </p>
                            <div className="testimonial-thumbnails">
                              <img src="/a (1).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (2).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (3).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (4).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (5).png" alt="experience" className="testimonial-thumb" />
                              <div className="testimonial-thumb-more">15+</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Card 2 (Duplicate) */}
                      <div className="testimonial-card-wrapper">
                        <div className="testimonial-shadow" style={{ backgroundColor: '#4CC9F0' }} />
                        <div className="testimonial-card">
                          <div className="testimonial-left-col">
                            <img src="/a (4).png" alt="Sarah Jenkins" className="testimonial-avatar" />
                            <h3 className="testimonial-name">Sarah Jenkins</h3>
                            <span className="testimonial-role">Product Designer</span>
                            <div className="testimonial-stars">★★★★★</div>
                          </div>
                          <div className="testimonial-right-col">
                            <p className="testimonial-quote">
                              "I was super hesitant about going to offline events alone, but 2gather changed everything! The hosts are incredibly welcoming, the venues are stunning, and I made close friends in my first week."
                            </p>
                            <div className="testimonial-thumbnails">
                              <img src="/a (3).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (4).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (5).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (1).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (2).png" alt="experience" className="testimonial-thumb" />
                              <div className="testimonial-thumb-more">8+</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Card 3 (Duplicate) */}
                      <div className="testimonial-card-wrapper">
                        <div className="testimonial-shadow" style={{ backgroundColor: '#25D366' }} />
                        <div className="testimonial-card">
                          <div className="testimonial-left-col">
                            <img src="/a (5).png" alt="Rohan Malhotra" className="testimonial-avatar" />
                            <h3 className="testimonial-name">Rohan Malhotra</h3>
                            <span className="testimonial-role">Software Architect</span>
                            <div className="testimonial-stars">★★★★★</div>
                          </div>
                          <div className="testimonial-right-col">
                            <p className="testimonial-quote">
                              "Absolutely top-tier curation. The mixers and board game nights are organized to absolute perfection. No awkward standing around—just great people, amazing vibes, and unforgettable experiences!"
                            </p>
                            <div className="testimonial-thumbnails">
                              <img src="/a (2).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (1).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (3).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (4).png" alt="experience" className="testimonial-thumb" />
                              <img src="/a (5).png" alt="experience" className="testimonial-thumb" />
                              <div className="testimonial-thumb-more">12+</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Curated Flowing FAQ Section */}
              <div className="home-faq-wrapper">
                <FlowingFAQ 
                  items={faqItems} 
                  textColor={theme === 'dark' ? '#ffffff' : '#000000'} 
                  borderColor={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 
                  marqueeBgColor="#25D366"
                  marqueeTextColor="#000000"
                  isGameTheme={false} 
                />
              </div>
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
            <div className="about-page-wrap" style={{ position: 'relative' }}>
              <AboutBackgroundCarousel />
              <div className="about-page-container" style={{ position: 'relative', zIndex: 1 }}>
                
                {/* Sleek Hero Section (Home page-like) */}
                <div className="about-hero">
                  <div className="about-hero-badge">
                    <span className="about-hero-badge-dot" />
                    Who We Are · Our Mission · Our Story
                  </div>

                  <h1 className="about-hero-headline">
                    We build real-world<br />
                    connections, not <ShinyText 
                      text="algorithms." 
                      disabled={false} 
                      speed={3} 
                      className="about-hero-highlight"
                      color="#ffffff"
                      shineColor="#b2c5ff"
                      spread={100}
                      direction="left"
                    />
                  </h1>

                  <p className="about-hero-sub">
                    2Gather is a growing movement of people choosing active, offline memories<br />
                    over endless scrolling feeds. Simple, authentic, and completely real.
                  </p>

                  <div className="about-hero-ctas">
                    <button
                      type="button"
                      className="about-cta-primary"
                      onClick={() => setShowWaitlist(true)}
                    >
                      Download the App
                    </button>
                    <button
                      type="button"
                      className="about-cta-secondary"
                      onClick={() => setActiveTab('communities')}
                    >
                      Browse Communities →
                    </button>
                  </div>
                </div>                {/* Curated About Video Section matching the mockup */}
                <div className="about-video-section">
                  <div className="about-video-wrapper">
                    <video 
                      src="/about.mp4" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="about-video-player"
                    />
                  </div>
                </div>

                {/* Our Story Section (Word-by-Word Scroll Reveal) */}
                <div className="about-story-section">
                  <h2 className="about-story-header">
                    Our Story
                  </h2>
                  <div className="about-story-content">
                    <ScrollReveal
                      baseOpacity={0.15}
                      enableBlur={true}
                      baseRotation={2}
                      blurStrength={8}
                      wordAnimationEnd="bottom bottom-=15%"
                    >
                      2gather started with a simple idea: Why should meeting new people be so hard in the digital age? While most apps keep people behind screens, we wanted to create something that encourages face-to-face interactions.
                    </ScrollReveal>
                    <ScrollReveal
                      baseOpacity={0.15}
                      enableBlur={true}
                      baseRotation={2}
                      blurStrength={8}
                      wordAnimationEnd="bottom bottom-=15%"
                    >
                      From casual coffee meetups and gaming nights to fitness sessions and community events, 2gather helps people find their crowd and live in the moment.
                    </ScrollReveal>
                  </div>
                </div>

                {/* 3D Curved Memories Centerpiece (ThreeDSlider) */}
                <div className="about-gallery-section" style={{ marginTop: '60px' }}>
                  <h2 className="about-section-header">
                    Our Tribe Memories
                  </h2>
                  <p className="about-section-subheader">
                    Drag, swipe, or use your scroll wheel to spin through our active real-world meetups.
                  </p>
                  <ThreeDSlider
                    items={galleryMemories.map((item, index) => ({
                      title: item.text,
                      num: (index + 1).toString().padStart(2, '0'),
                      imageUrl: item.image
                    }))}
                  />
                </div>
                <FlowingFAQ 
                  items={faqItems} 
                  textColor={theme === 'dark' ? '#ffffff' : '#0f172a'} 
                  borderColor={theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e2e8f0'} 
                />
              </div>
              
              <Footer onDownload={() => setShowWaitlist(true)} />
            </div>
          )}

          {activeTab === 'contact' && (
            <div className={`game-contact-page ${theme}`}>
              <div className="game-contact-container">
                
                {/* 1. Centered Big Cartoon Title */}
                <div className="game-contact-header">
                  <h1 className="game-contact-title">Contact Us</h1>
                  <p className="game-contact-subtitle">
                    Step out of your screen and sync with our tribe!
                  </p>
                </div>

                {/* 2. Details Section - Cute Cartoon Info Boxes */}
                <div className="game-info-cards-row">
                  <div className="game-info-card yellow" onClick={() => setSlothDialogue("Dialing 2gather... ring ring! 📞")}>
                    <span className="game-info-emoji">📞</span>
                    <h3>Phone</h3>
                    <p>+123 456 7890</p>
                  </div>
                  <div className="game-info-card pink" onClick={() => setSlothDialogue("Send me an email, my mailbox is ready! ✉️")}>
                    <span className="game-info-emoji">✉️</span>
                    <h3>Email</h3>
                    <p>hello@2gather.app</p>
                  </div>
                  <div className="game-info-card blue" onClick={() => setSlothDialogue("We live in Paradise Cove! Come check it out! 🌴")}>
                    <span className="game-info-emoji">📍</span>
                    <h3>HQ Location</h3>
                    <p>123 Island Way, Paradise Cove</p>
                  </div>
                  <div className="game-info-card green" onClick={() => setSlothDialogue("Monday to Friday. Weekends are for beach chill! 🕒")}>
                    <span className="game-info-emoji">🕒</span>
                    <h3>Sync Hours</h3>
                    <p>Mon - Fri | 9am - 5pm</p>
                  </div>
                </div>

                {/* 3. The Cartoon Form Panel */}
                <div className="game-form-section">
                  {/* Header matching screenshot exactly (placed OUTSIDE the card) */}
                  <div className="game-form-header">
                    <div className="game-ticket-badge">
                      <span className="game-ticket-badge-icon">📬</span> Get in Touch
                    </div>
                    <h2 className="game-ticket-title">Submit a Support Ticket</h2>
                  </div>

                  <div className="game-form-card">
                    {/* Left Column - Pure Cinematic Loop Video Panel */}
                    <div className="game-form-sloth-panel">
                      <video 
                        src="/contact.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="sloth-panel-video"
                      />
                    </div>

                    {/* Right Column - The Interactive Support Form */}
                    <div className="game-form-fields-panel">
                      {contactSuccess ? (
                        <div className="game-form-success">
                          <div className="game-success-badge">🎉 TICKET SUBMITTED!</div>
                          <h2>Your support ticket has been logged!</h2>
                          <p>Our help squad has received your signal and will connect back within 24 hours. Keep vibing! ☀️</p>
                          <button 
                            type="button" 
                            className="game-form-reset-btn" 
                            onClick={() => {
                              resetContactForm();
                              setSlothDialogue("Welcome back! Need to submit another support ticket? 🦥");
                            }}
                          >
                            Submit Another Ticket
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={(e) => {
                          handleContactSubmit(e);
                          setSlothDialogue("Anchors aweigh! Support ticket successfully dispatched! 🚀💥");
                        }} className="game-contact-form">
                          
                          <div className="game-form-grid">
                            <div className="game-field-group">
                              <label>
                                <svg className="field-label-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                Your Name *
                              </label>
                              <input 
                                type="text" 
                                placeholder="Enter your full name" 
                                value={contactName} 
                                onChange={(e) => setContactName(e.target.value)} 
                                onFocus={() => setSlothDialogue(`A spectacular name! Can't wait to help you, ${contactName || 'gatherer'}! 📝`)}
                                onBlur={() => setSlothDialogue("Excellent! Let's fill out your email address next! 🦥")}
                                required 
                              />
                            </div>
                            
                            <div className="game-field-group">
                              <label>
                                <svg className="field-label-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                Email Address *
                              </label>
                              <input 
                                type="email" 
                                placeholder="your@email.com" 
                                value={contactEmail} 
                                onChange={(e) => setContactEmail(e.target.value)} 
                                onFocus={() => setSlothDialogue("I will safely transmit my support signal to this mailbox! ✉️")}
                                onBlur={() => setSlothDialogue("Got the email! Now let's specify what subject we are addressing. 🦥")}
                                required 
                              />
                            </div>
                          </div>

                          <div className="game-field-group full-width-field">
                            <label>
                              <svg className="field-label-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                              Subject *
                            </label>
                            <input 
                              type="text" 
                              placeholder="What is this about?" 
                              value={contactSubject} 
                              onChange={(e) => setContactSubject(e.target.value)} 
                              onFocus={() => setSlothDialogue("Give it a clear, concise subject so we can route it instantly! 🎯")}
                              onBlur={() => setSlothDialogue("Excellent subject line! Now choose a category and priority level. 🦥")}
                              required 
                            />
                          </div>

                          <div className="game-form-grid">
                            <div className="game-field-group">
                              <label>
                                <svg className="field-label-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                                Category
                              </label>
                              <select 
                                value={contactCategory} 
                                onChange={(e) => setContactCategory(e.target.value)}
                                onFocus={() => setSlothDialogue("Select the category that best fits your inquiry! 📂")}
                              >
                                <option value="General Inquiry">General Inquiry</option>
                                <option value="Bug Report">Bug Report</option>
                                <option value="Feature Request">Feature Request</option>
                                <option value="Collaboration">Collaboration</option>
                              </select>
                            </div>

                            <div className="game-field-group">
                              <label>
                                <svg className="field-label-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                                Priority *
                              </label>
                              <select 
                                value={contactPriority} 
                                onChange={(e) => setContactPriority(e.target.value)}
                                onFocus={() => setSlothDialogue("How urgent is this? Low, Medium, or High priority? ⚡")}
                              >
                                <option value="Low">🟢 Low</option>
                                <option value="Medium">🟡 Medium</option>
                                <option value="High">🔴 High</option>
                              </select>
                            </div>
                          </div>

                          <div className="game-field-group full-width-field message-field-wrapper">
                            <label>
                              <svg className="field-label-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                              Message * <span className="char-count-label">({contactMessage.length}/500 characters)</span>
                            </label>
                            <div className="textarea-relative-container">
                              <textarea 
                                placeholder="Tell us more about how we can help you..." 
                                rows="4" 
                                maxLength={500}
                                value={contactMessage} 
                                onChange={(e) => setContactMessage(e.target.value)} 
                                onFocus={() => setSlothDialogue("Describe your situation in detail. Joy the Sloth is listening! 💬")}
                                onBlur={() => setSlothDialogue(`Sweet details! ${contactMessage.length} characters of perfect feedback. 🦥`)}
                                required
                              ></textarea>
                              <span className="textarea-char-counter">{contactMessage.length}/500</span>
                            </div>
                          </div>

                          <button 
                            type="submit" 
                            className={`game-form-submit-btn ${isSubmittingContact ? 'is-loading' : ''}`} 
                            disabled={isSubmittingContact}
                            onMouseEnter={() => setSlothDialogue("Ready to submit the support ticket? Press it! 🚀")}
                            onMouseLeave={() => setSlothDialogue("Awaiting your ticket transmission, captain! ⚓")}
                          >
                            <span className="submit-btn-icon" style={{ marginRight: '8px', display: 'inline-flex', alignItems: 'center' }}>
                              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                            </span>
                            {isSubmittingContact ? 'Submitting...' : 'Submit ticket'}
                          </button>

                          <div className="form-secure-footer">
                            <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            <span>Secure & encrypted</span>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
 
                {/* 📍 Our Office Real-World Location Section 📍 */}
                <div className="game-office-section">
                  <div className="game-office-card">
                    
                    {/* Left details */}
                    <div className="game-office-details">
                      <div className="game-office-header-row">
                        <span className="game-office-icon">📍</span>
                        <h2 className="game-office-title-text">Our Office</h2>
                      </div>
                      
                      <div className="game-office-content">
                        <h3>GEETBIH TECH LLP</h3>
                        <p className="game-office-parent-label">(Parent Company of 2gather)</p>
                        
                        <div className="game-office-info-item">
                          <span className="info-emoji">🏢</span>
                          <p>Prabhat Residency 3rd floor</p>
                        </div>
                        
                        <div className="game-office-info-item">
                          <span className="info-emoji">📍</span>
                          <p>Mangal Pandey Road, Siliguri, West Bengal 734001, India</p>
                        </div>
                        
                        <div className="game-office-info-item">
                          <span className="info-emoji">✉️</span>
                          <p><a href="mailto:support@2gather.in">support@2gather.in</a></p>
                        </div>
                        
                        <div className="game-office-info-item">
                          <span className="info-emoji">📞</span>
                          <p><a href="tel:+919876543210">+91 98765 43210</a></p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Google Map iframe embed matching the exact Siliguri location */}
                    <div className="game-office-map-frame">
                      <iframe 
                        title="Geetbih Tech Siliguri Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.269155799981!2d88.4239857!3d26.7198757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441bdf0d9fcd9%3A0xc3b839e441bdf0d9!2sMangal%20Pandey%20Rd%2C%20Siliguri%2C%20West%20Bengal%20734001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>

                  </div>
                </div>

                <FlowingFAQ 
                  items={faqItems} 
                  textColor="#000000" 
                  borderColor="#000000" 
                  isGameTheme={true} 
                />
              </div>
              <Footer onDownload={() => setShowWaitlist(true)} />
            </div>
          )}

          {activeTab === 'events' && (
            <div className="fullpage-dashboard-container" style={{ position: 'relative', width: '100%', margin: '0', zIndex: 5, minHeight: '100vh' }}>
              
              {/* Static Fixed Day Background */}
              <div className="events-fixed-bg" />

              {/* FIRST FOLD: Hero Section */}
              <div className="events-hero-fold">
                <div className="events-hero-content">
                  <div className="events-hero-badge">
                    <span className="events-hero-badge-dot" />
                    Live Curated Gatherings
                  </div>
                  <h1 className="events-hero-title">
                    Discover Curated<br />In-Person Events
                  </h1>
                  <p className="events-hero-sub">
                    Meet incredible people, share memorable experiences, and find your local collective in Pune, Bangalore, Mumbai, Delhi, and Hyderabad.
                  </p>
                  
                  <div className="events-hero-city-pills">
                    {['ALL', 'PUNE', 'BANGALORE', 'MUMBAI', 'DELHI', 'HYDERABAD'].map((city) => (
                      <button
                        key={city}
                        type="button"
                        className="events-hero-pill"
                        onClick={() => {
                          setSelectedCity(city);
                          scrollToEvents();
                        }}
                      >
                        {city === 'ALL' ? 'Explore All Cities' : city}
                      </button>
                    ))}
                  </div>

                  <div className="events-scroll-indicator" onClick={scrollToEvents}>
                    <span className="events-scroll-arrow">↓</span>
                    <span className="events-scroll-text">EXPLORE EVENTS</span>
                  </div>
                </div>
              </div>
              
              {/* SECOND FOLD onwards: Scrolling Content Container */}
              <div className="events-dashboard-wrap">
                
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

                {/* Explore your City Search Hero fold exactly like the mockup */}
                <div className="events-search-hero">
                  <h1 className="events-search-hero-title">Explore your City</h1>
                  <p className="events-search-hero-subtitle">
                    Your city is full of stories, adventures, and like-minded people. Step outside, explore together, and make real memories offline.
                  </p>
                  
                  <div className="events-search-hero-wrap">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="custom-search-magnifier">
                      {/* Handle */}
                      <path d="M21 21L28 28" stroke="#87CEEB" strokeWidth="3" strokeLinecap="round"/>
                      <path d="M21 21L24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      {/* Outer ring of glass */}
                      <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" fill="rgba(135, 206, 235, 0.25)"/>
                      {/* Glass reflection */}
                      <path d="M10 10C11 9 13.5 8.5 15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="events-search-hero-input"
                      placeholder="Search gatherings, vibes, cities."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    
                    {searchQuery && (
                      <button 
                        className="search-hero-clear-btn" 
                        onClick={() => setSearchQuery('')}
                        title="Clear search"
                        type="button"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Interactive sticky filter bar */}
                <div className="events-filters-bar">
                  <div className="events-filters-inner">
                    <div className="events-filter-row">
                      <span className="events-filter-label">CITY</span>
                      <div className="events-filter-buttons-wrap">
                        {['ALL', 'PUNE', 'BANGALORE', 'MUMBAI', 'DELHI', 'HYDERABAD'].map((city) => (
                          <button
                            key={city}
                            type="button"
                            className={`events-filter-btn ${selectedCity === city ? 'active-green' : ''}`}
                            onClick={() => setSelectedCity(city)}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="events-filter-row">
                      <span className="events-filter-label">CATEGORY</span>
                      <div className="events-filter-buttons-wrap">
                        {['ALL', 'TECH', 'SOCIAL', 'WELLNESS', 'CREATIVE', 'ADVENTURE'].map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            className={`events-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Events list section */}
                <div className="events-section-container">
                  <div className="events-section-header">
                    <div className="events-section-title-wrap">
                      <h3>
                        {selectedCity === 'ALL' ? 'All Gatherings' : `${selectedCity} Events`}
                      </h3>
                      <p>
                        Showing {filteredEvents.length} open {selectedCategory !== 'ALL' ? selectedCategory.toLowerCase() + ' ' : ''} gatherings. Tap to secure your spot.
                      </p>
                    </div>

                    <button 
                      type="button" 
                      className="host-event-trigger-btn"
                      onClick={() => setShowHostModal(true)}
                    >
                      <span>➕</span> Host a Gathering
                    </button>
                  </div>

                  {filteredEvents.length > 0 ? (
                    <div className="events-grid">
                      {filteredEvents.map((event) => {
                        const spotsLeft = event.spotsTotal - event.spotsFilled;
                        const fillPercent = (event.spotsFilled / event.spotsTotal) * 100;
                        const isFull = spotsLeft <= 0;

                        return (
                          <div className="event-card" key={event.id}>
                            <div 
                              className="event-card-header"
                              style={{ 
                                backgroundImage: `url(${getCategoryImg(event.category)})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            >
                              <div className="event-card-header-overlay" />
                              <div className="event-card-tags">
                                <span className="event-tag-city">{event.city}</span>
                                <span className="event-tag-cat">{event.category}</span>
                              </div>
                              <div className="event-card-datetime">
                                <div className="event-card-date">{event.date}</div>
                                <div className="event-card-time">🕗 {event.time}</div>
                              </div>
                            </div>

                            <div className="event-card-body">
                              <h4 className="event-card-title">{event.title}</h4>
                              <p className="event-card-desc">{event.description}</p>
                              
                              <div className="event-card-meta">
                                <div className="event-meta-item">
                                  <span className="event-meta-icon">📍</span>
                                  <span>{event.location}</span>
                                </div>
                                <div className="event-meta-item">
                                  <span className="event-meta-icon">💰</span>
                                  <span>{event.price}</span>
                                </div>

                                <div className="event-spots-wrap">
                                  <div className="event-spots-text">
                                    <span>Spots Filled</span>
                                    <span>{event.spotsFilled}/{event.spotsTotal} filled</span>
                                  </div>
                                  <div className="event-spots-bar-bg">
                                    <div 
                                      className="event-spots-bar-fill" 
                                      style={{ 
                                        width: `${fillPercent}%`,
                                        background: isFull ? '#ef4444' : (spotsLeft <= 5 ? '#f59e0b' : '#25d366')
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="event-card-footer">
                              <div className="event-host-info">
                                <span className="event-host-avatar">{event.hostAvatar}</span>
                                <div className="event-host-name-wrap">
                                  <span className="event-host-label">Hosted by</span>
                                  <span className="event-host-name">{event.hostName}</span>
                                </div>
                              </div>

                              <button 
                                type="button" 
                                className={`event-join-btn ${isFull ? 'spots-full' : ''}`}
                                disabled={isFull}
                                onClick={() => {
                                  if (!isFull) {
                                    openWaitlist(
                                      `SECURE SPOT AT ${event.title.toUpperCase()}`,
                                      `Submit your email to join the waitlist for this gathering in ${event.city}. Host ${event.hostName} will approve your request shortly.`
                                    );
                                  }
                                }}
                              >
                                {isFull ? 'Spots Full' : 'Join Activity'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="events-empty-state">
                      <span className="events-empty-icon">🔍</span>
                      <h4 className="events-empty-title">No Gatherings Found</h4>
                      <p className="events-empty-desc">
                        There are currently no {selectedCategory !== 'ALL' ? selectedCategory.toLowerCase() + ' ' : ''} events listed in {selectedCity === 'ALL' ? 'any city' : selectedCity}. Why not host one yourself?
                      </p>
                      <button 
                        type="button" 
                        className="host-event-trigger-btn"
                        onClick={() => setShowHostModal(true)}
                      >
                        ➕ Host the First Event
                      </button>
                    </div>
                  )}
                </div>

                <Footer onDownload={() => openWaitlist()} />
              </div>

              {/* Host an Event Modal */}
              {showHostModal && (
                <div className="host-modal-overlay" onClick={() => setShowHostModal(false)}>
                  <div className="host-modal" onClick={(e) => e.stopPropagation()}>
                    <button 
                      type="button" 
                      className="host-modal-close"
                      onClick={() => setShowHostModal(false)}
                    >
                      ✕
                    </button>
                    <h3 className="host-modal-title">Host a Local Gathering</h3>
                    <p className="host-modal-desc">
                      Create an event, gather interesting people in your city, and make new friends in the real world.
                    </p>

                    <form onSubmit={handleHostSubmit}>
                      <div className="host-form-group full-width" style={{ marginBottom: '16px' }}>
                        <label>EVENT TITLE</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Founders Morning Coffee or Boardgames Night"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                          required
                        />
                      </div>

                      <div className="host-form-grid">
                        <div className="host-form-group">
                          <label>CITY</label>
                          <select 
                            value={newEvent.city}
                            onChange={(e) => setNewEvent({ ...newEvent, city: e.target.value })}
                          >
                            {['PUNE', 'BANGALORE', 'MUMBAI', 'DELHI', 'HYDERABAD'].map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="host-form-group">
                          <label>CATEGORY</label>
                          <select 
                            value={newEvent.category}
                            onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                          >
                            {['TECH', 'SOCIAL', 'WELLNESS', 'CREATIVE', 'ADVENTURE'].map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="host-form-grid">
                        <div className="host-form-group">
                          <label>DATE</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Sat, May 30"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            required
                          />
                        </div>
                        
                        <div className="host-form-group">
                          <label>TIME</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 6:30 PM"
                            value={newEvent.time}
                            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="host-form-grid">
                        <div className="host-form-group">
                          <label>EXACT VENUE / LOCATION</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Third Wave Coffee, KP"
                            value={newEvent.location}
                            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                            required
                          />
                        </div>
                        
                        <div className="host-form-group">
                          <label>MAX SPOTS AVAILABLE</label>
                          <input 
                            type="number" 
                            min="2"
                            max="100"
                            value={newEvent.spotsTotal}
                            onChange={(e) => setNewEvent({ ...newEvent, spotsTotal: parseInt(e.target.value) || 20 })}
                            required
                          />
                        </div>
                      </div>

                      <div className="host-form-group full-width" style={{ marginBottom: '16px' }}>
                        <label>PRICE (Optional)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Free or ₹200 for coffee"
                          value={newEvent.price}
                          onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
                        />
                      </div>

                      <div className="host-form-group full-width" style={{ marginBottom: '16px' }}>
                        <label>DESCRIPTION</label>
                        <textarea 
                          placeholder="Tell people what this gathering is about, who should join, and what you will do."
                          rows="3"
                          value={newEvent.description}
                          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                          required
                        />
                      </div>

                      <button type="submit" className="host-submit-btn">
                        LAUNCH GATHERING 🚀
                      </button>
                    </form>
                  </div>
                </div>
              )}

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

      {/* Download App Drawer / Glassmorphic Modal Overlay */}
      {showWaitlist && (
        <div className="waitlist-overlay" onClick={() => setShowWaitlist(false)}>
          <div 
            className="download-app-modal" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            id="download-app-modal"
          >
            <button 
              type="button" 
              className="modal-close" 
              onClick={() => setShowWaitlist(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <h2 id="modal-title" className="download-modal-title">Get 2gather App</h2>
            <p className="download-modal-desc">
              Your offline social circle is waiting. Scan to download or jump straight to the app stores.
            </p>

            <div className="download-modal-grid">
              {/* Left Column: QR Code Scan */}
              <div className="download-qr-box">
                <div className="qr-container-outer">
                  {/* Brutalist Scan QR Mock */}
                  <svg className="brutalist-qr-svg" viewBox="0 0 100 100" width="140" height="140">
                    {/* Corners */}
                    <rect x="10" y="10" width="20" height="20" fill="none" stroke="#000" strokeWidth="3" />
                    <rect x="14" y="14" width="12" height="12" fill="#000" />
                    
                    <rect x="70" y="10" width="20" height="20" fill="none" stroke="#000" strokeWidth="3" />
                    <rect x="74" y="14" width="12" height="12" fill="#000" />
                    
                    <rect x="10" y="70" width="20" height="20" fill="none" stroke="#000" strokeWidth="3" />
                    <rect x="14" y="74" width="12" height="12" fill="#000" />

                    {/* QR Code Dots & Patterns */}
                    <rect x="40" y="10" width="6" height="6" fill="#000" />
                    <rect x="50" y="15" width="6" height="12" fill="#000" />
                    <rect x="45" y="30" width="12" height="6" fill="#000" />
                    <rect x="10" y="45" width="18" height="6" fill="#000" />
                    <rect x="20" y="55" width="6" height="12" fill="#000" />
                    
                    <rect x="70" y="40" width="6" height="12" fill="#000" />
                    <rect x="80" y="45" width="10" height="6" fill="#000" />
                    <rect x="75" y="55" width="6" height="6" fill="#000" />
                    
                    <rect x="40" y="70" width="12" height="6" fill="#000" />
                    <rect x="50" y="80" width="6" height="10" fill="#000" />
                    <rect x="40" y="85" width="18" height="6" fill="#000" />
                    <rect x="70" y="70" width="6" height="18" fill="#000" />
                    <rect x="80" y="80" width="10" height="10" fill="#000" />

                    {/* Core Brand Accent center pixel */}
                    <rect x="44" y="44" width="12" height="12" fill="#25D366" stroke="#000" strokeWidth="1.5" />
                  </svg>
                </div>
                <span className="qr-scan-label">SCAN TO DOWNLOAD</span>
                <span className="qr-scan-sub">Works on iOS & Android camera</span>
              </div>

              {/* Right Column: App Store Links */}
              <div className="download-links-box">
                <a 
                  href="https://apps.apple.com/app/2gather" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="store-badge-neobrutal iOS-badge"
                >
                  <svg className="store-badge-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/>
                  </svg>
                  <div className="badge-text-wrap">
                    <span className="badge-micro-top">Download on the</span>
                    <span className="badge-main-bot">App Store</span>
                  </div>
                </a>

                <a 
                  href="https://play.google.com/store/apps/details?id=com.twogether" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="store-badge-neobrutal android-badge"
                >
                  <svg className="store-badge-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M5.25 2.25c-.15 0-.3.03-.44.09l11.4 11.4 3.49-3.49c.82-.82.82-2.15 0-2.97L13.8 1.38c-.85-.85-2.23-.85-3.08 0L5.91 6.19c-.19-.11-.42-.19-.66-.19zm11.39 12.82L5.24 3.67c-.24 0-.47.08-.66.19l4.79 4.79 1.54 1.54 5.73 4.88zM3.48 5.69c-.06.14-.09.29-.09.44v11.75c0 .15.03.3.09.44l6.32-6.32-6.32-6.31zM4.81 21.66c.14.06.29.09.44.09.24 0 .47-.08.66-.19l4.79-4.79-6.33-6.32-6.32 6.32c.19.11.42.19.66.19z"/>
                  </svg>
                  <div className="badge-text-wrap">
                    <span className="badge-micro-top">GET IT ON</span>
                    <span className="badge-main-bot">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="download-modal-footer">
              ⚡ Join 13,000+ tribe members meeting daily!
            </div>
          </div>
        </div>
      )}

      {/* Premium Mobile Bottom Navigation Bar (App-like thumb-reachable deck) */}
      <div className="mobile-bottom-nav">
        <button 
          className={`mobile-nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <svg viewBox="0 0 24 24" className="mobile-nav-icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Home</span>
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'communities' ? 'active' : ''}`}
          onClick={() => setActiveTab('communities')}
        >
          <svg viewBox="0 0 24 24" className="mobile-nav-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Tribes</span>
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <svg viewBox="0 0 24 24" className="mobile-nav-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Events</span>
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'aboutUs' ? 'active' : ''}`}
          onClick={() => setActiveTab('aboutUs')}
        >
          <svg viewBox="0 0 24 24" className="mobile-nav-icon"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>About</span>
        </button>
        <button 
          className={`mobile-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <svg viewBox="0 0 24 24" className="mobile-nav-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Contact</span>
        </button>
      </div>

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
