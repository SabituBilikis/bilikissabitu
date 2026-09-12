"use client";

import React, { useState } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------------- */
/* 1. AUTHENTIC LEARN FUN DESIGN TOKENS & DATA                                */
/* ------------------------------------------------------------------------- */
const LF = {
  navy: "#1A0050",
  yellow: "#FFD700",
  orange: "#FF9500",
  red: "#FF3B30",
  blue: "#007AFF",
  green: "#34C759",
  purple: "#AF52DE",
  pink: "#FF2D9B",
  teal: "#00C7BE",
  cream: "#F3EEFF",
  white: "#FFFFFF",
  muted: "#E8DFFF",
  mutedFg: "#6B4FA0",
};

const authenticCategories = [
  {
    id: "alphabet",
    emoji: "🔤",
    title: "Alphabet",
    subtitle: "A · B · C",
    lessons: 26,
    progress: 65,
    color: LF.red,
    dark: "#CC2A20",
    state: "active",
    deco: ["A", "B", "C"],
    preview: ["A · Apple 🍎", "B · Ball ⚽", "C · Cat 🐱", "D · Duck 🦆"],
  },
  {
    id: "numbers",
    emoji: "🔢",
    title: "Numbers",
    subtitle: "1 · 2 · 3",
    lessons: 20,
    progress: 40,
    color: LF.orange,
    dark: "#CC7600",
    state: "active",
    deco: ["1", "2", "3"],
    preview: ["1 · Star ⭐", "2 · Eyes 👀", "3 · Hearts 💖", "4 · Wheels 🚗"],
  },
  {
    id: "shapes",
    emoji: "🔷",
    title: "Shapes",
    subtitle: "○ △ □ ◇",
    lessons: 7,
    progress: 80,
    color: LF.blue,
    dark: "#0056CC",
    state: "active",
    deco: ["○", "△", "□"],
    preview: ["Circle 🔴", "Triangle 🔺", "Square 🟦", "Star ⭐"],
  },
  {
    id: "colors",
    emoji: "🎨",
    title: "Colors",
    subtitle: "Red · Blue · Gold",
    lessons: 8,
    progress: 100,
    color: LF.green,
    dark: "#28A046",
    state: "complete",
    deco: ["🔴", "🔵", "🟡"],
    preview: ["Red 🍎", "Blue 🌊", "Yellow ☀️", "Green 🌿"],
  },
  {
    id: "animals",
    emoji: "🐶",
    title: "Animals",
    subtitle: "Farm & Wild",
    lessons: 15,
    progress: 25,
    color: LF.purple,
    dark: "#8A3DB5",
    state: "active",
    deco: ["🐱", "🐮", "🐷"],
    preview: ["Puppy 🐶", "Kitty 🐱", "Lion 🦁", "Elephant 🐘"],
  },
  {
    id: "fruits",
    emoji: "🍎",
    title: "Fruits",
    subtitle: "Yummy & Sweet",
    lessons: 10,
    progress: 0,
    color: LF.pink,
    dark: "#CC1F7A",
    state: "new",
    deco: ["🍌", "🍇", "🍊"],
    preview: ["Apple 🍎", "Banana 🍌", "Grapes 🍇", "Orange 🍊"],
  },
  {
    id: "vehicles",
    emoji: "🚗",
    title: "Vehicles",
    subtitle: "Vroom vroom!",
    lessons: 8,
    progress: 0,
    color: LF.teal,
    dark: "#009B94",
    state: "new",
    deco: ["✈️", "🚂", "⛵"],
    preview: ["Car 🚗", "Bus 🚌", "Train 🚂", "Airplane ✈️"],
  },
  {
    id: "school",
    emoji: "🏫",
    title: "School",
    subtitle: "Learn & Play",
    lessons: 12,
    progress: 0,
    color: "#F5C518",
    dark: "#C9A200",
    state: "locked",
    deco: ["📚", "✏️", "📐"],
    preview: ["Book 📖", "Pencil ✏️", "Backpack 🎒", "Crayons 🖍️"],
  },
];

const phonicsLessons = [
  {
    letter: "A",
    lower: "a",
    word: "Apple",
    sound: "æ",
    emoji: "🍎",
    color: LF.red,
    dark: "#CC2A20",
    bg: "#FFF1F0",
    voiceText: "A is for Apple. Ah, ah, apple!",
  },
  {
    letter: "B",
    lower: "b",
    word: "Ball",
    sound: "b",
    emoji: "⚽",
    color: LF.orange,
    dark: "#CC7600",
    bg: "#FFF7E6",
    voiceText: "B is for Ball. Buh, buh, ball!",
  },
  {
    letter: "C",
    lower: "c",
    word: "Cat",
    sound: "k",
    emoji: "🐱",
    color: LF.blue,
    dark: "#0056CC",
    bg: "#E6F7FF",
    voiceText: "C is for Cat. Kuh, kuh, cat!",
  },
  {
    letter: "D",
    lower: "d",
    word: "Duck",
    sound: "d",
    emoji: "🦆",
    color: LF.green,
    dark: "#28A046",
    bg: "#F6FFED",
    voiceText: "D is for Duck. Duh, duh, duck!",
  },
];

/* ------------------------------------------------------------------------- */
/* 2. AUTHENTIC TABLET INTERACTIVE APP CANVAS                                 */
/* ------------------------------------------------------------------------- */
export function TabletInteractiveCanvas() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedCat, setSelectedCat] = useState(authenticCategories[0]);

  return (
    <div className="lf-tablet-container">
      {/* ── Top Bar with Authentic Logo & Pills ────────────────────────── */}
      <div className="lf-topnav">
        <div className="lf-brand">
          <div className="lf-logo-wrapper">
            <Image
              src="/images/learn-fun/logo.png"
              alt="Learn Fun — Play. Learn. Grow."
              width={130}
              height={44}
              unoptimized
              style={{ objectFit: "contain", height: "auto" }}
            />
          </div>
          <span className="lf-tagline-badge">Play · Learn · Grow</span>
        </div>

        <div className="lf-top-actions">
          <button type="button" className="lf-pill-btn lf-pwa-btn">
            <span>📥</span>
            <span className="lf-btn-text">Install App</span>
          </button>
          <button type="button" className="lf-pill-btn lf-parent-btn">
            <span>👨‍👩‍👧</span>
            <span className="lf-btn-text">Parent Zone</span>
          </button>
        </div>
      </div>

      {/* ── Greeting Banner ────────────────────────────────────────────── */}
      <div className="lf-greeting-row">
        <div className="lf-mascot-greeting">
          <span className="lf-fox-avatar" aria-hidden="true">🦊</span>
          <div>
            <p className="lf-greeting-sub">☀️ Good day!</p>
            <h4 className="lf-greeting-main">Little Explorer, what shall we learn? ✨</h4>
          </div>
        </div>

        <div className="lf-stats-group">
          <div className="lf-stat-card">
            <span className="lf-stat-icon">🎯</span>
            <div>
              <p className="lf-stat-val" style={{ color: LF.blue }}>5/12</p>
              <p className="lf-stat-lbl">Unlocked</p>
            </div>
          </div>
          <div className="lf-stat-card">
            <span className="lf-stat-icon">🔥</span>
            <div>
              <p className="lf-stat-val" style={{ color: LF.orange }}>3 Days</p>
              <p className="lf-stat-lbl">Streak</p>
            </div>
          </div>
          <div className="lf-stat-card">
            <span className="lf-stat-icon">⭐</span>
            <div>
              <p className="lf-stat-val" style={{ color: "#D48806" }}>42</p>
              <p className="lf-stat-lbl">Stars</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Carousel & Preview Area ─────────────────────────── */}
      <div className="lf-main-content">
        <div className="lf-carousel-header">
          <div className="lf-carousel-title">
            <span className="lf-sparkle">✨</span>
            <h5>Choose Your Adventure!</h5>
          </div>
          <span className="lf-counter-tag">Tap to explore modules</span>
        </div>

        {/* Carousel Cards Grid */}
        <div className="lf-cards-scroller">
          {authenticCategories.map((c) => {
            const isSelected = selectedCat.id === c.id;
            const isComplete = c.state === "complete";
            const isNew = c.state === "new";
            const isLocked = c.state === "locked";

            return (
              <div
                key={c.id}
                role="button"
                tabIndex={0}
                className={`lf-card ${isSelected ? "selected" : ""} ${isLocked ? "locked" : ""}`}
                style={{
                  borderColor: isSelected ? LF.navy : "rgba(26,0,80,0.18)",
                  boxShadow: isSelected ? `4px 6px 0 ${LF.navy}` : "2px 3px 0 rgba(26,0,80,0.12)",
                }}
                onClick={() => !isLocked && setSelectedCat(c)}
              >
                {/* Visual Top Illustration Area */}
                <div
                  className="lf-card-art"
                  style={{
                    background: isLocked
                      ? "linear-gradient(135deg, #C8BDE0 0%, #A89AC8 100%)"
                      : `linear-gradient(135deg, ${c.color} 0%, ${c.dark} 100%)`,
                  }}
                >
                  <span className="lf-card-emoji">{c.emoji}</span>
                  {isComplete && <span className="lf-badge-check">✓</span>}
                  {isNew && <span className="lf-badge-new">✨ NEW!</span>}
                  {isLocked && <span className="lf-badge-lock">🔒</span>}
                  <span className="lf-lessons-pill">{c.lessons} lessons</span>
                </div>

                {/* Info Area */}
                <div className="lf-card-info">
                  <div className="lf-card-meta">
                    <h6>{c.title}</h6>
                    <p>{c.subtitle}</p>
                  </div>
                  <div className="lf-card-progress">
                    <div className="lf-progress-bar">
                      <div
                        className="lf-progress-fill"
                        style={{ width: `${c.progress}%`, background: c.color }}
                      />
                    </div>
                    <span className="lf-progress-text">{c.progress}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Module Live Activities */}
        <div
          className="lf-active-panel"
          style={{ borderColor: selectedCat.color }}
        >
          <div className="lf-active-header" style={{ background: `${selectedCat.color}15` }}>
            <div className="lf-active-title">
              <span className="lf-panel-emoji">{selectedCat.emoji}</span>
              <div>
                <strong>{selectedCat.title} Lessons</strong>
                <span>{selectedCat.subtitle} · Touch to preview</span>
              </div>
            </div>
            <span className="lf-active-badge" style={{ background: selectedCat.color }}>
              Interactive
            </span>
          </div>

          <div className="lf-active-grid">
            {selectedCat.preview.map((item, idx) => (
              <div
                key={idx}
                className="lf-lesson-chip"
                style={{ borderColor: `${selectedCat.color}50` }}
              >
                <span className="lf-chip-text">{item}</span>
                <span className="lf-tap-cue">👆</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Authentic Bottom Navigation Bar ────────────────────────────── */}
      <div className="lf-bottomnav">
        {[
          { id: "home", label: "Home", icon: "🏠", color: LF.red },
          { id: "learn", label: "Learn", icon: "📚", color: LF.blue },
          { id: "games", label: "Games", icon: "🎮", color: LF.green },
          { id: "rewards", label: "Rewards", icon: "🏆", color: LF.yellow },
          { id: "parent", label: "Parent", icon: "👨‍👩‍👧", color: LF.purple },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`lf-nav-tab ${isActive ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div
                className="lf-tab-icon"
                style={{
                  background: isActive ? tab.color : LF.muted,
                  color: isActive ? "#FFFFFF" : LF.mutedFg,
                  borderColor: isActive ? LF.navy : "transparent",
                }}
              >
                {tab.icon}
              </div>
              <span style={{ color: isActive ? LF.navy : LF.mutedFg, fontWeight: isActive ? 700 : 500 }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 3. AUTHENTIC PHONICS LESSON DEMO (Web Speech API)                         */
/* ------------------------------------------------------------------------- */
export function PhonicsDemo() {
  const [selected, setSelected] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const current = phonicsLessons[selected];

  const playVoice = (index: number) => {
    setSelected(index);
    setIsPlaying(true);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const item = phonicsLessons[index];
      const utter = new SpeechSynthesisUtterance(item.voiceText);
      utter.rate = 0.75;
      utter.pitch = 1.25;
      utter.onend = () => setIsPlaying(false);
      utter.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utter);
    } else {
      setTimeout(() => setIsPlaying(false), 1400);
    }
  };

  return (
    <div className="lf-phonics-shell">
      <div className="lf-phonics-top">
        <div className="lf-phonics-badge">
          <span>🔊 Sound & Phonics Architecture</span>
        </div>
        <span className="mono lf-phonics-sub">Web Speech API · Pitch 1.25x for Toddler Ear</span>
      </div>

      {/* Main Flashcard Container */}
      <div
        className="lf-flashcard"
        style={{
          background: current.bg,
          borderColor: LF.navy,
          boxShadow: `4px 6px 0 ${LF.navy}`,
        }}
      >
        <div className="lf-card-mascot-cue">
          <span className="lf-mini-fox">🦊</span>
          <span className="lf-speech-bubble">Hear how {current.letter} sounds!</span>
        </div>

        <div className={`lf-giant-display ${isPlaying ? "bounce-pop" : ""}`}>
          <div className="lf-emoji-badge" aria-hidden="true">{current.emoji}</div>
          <div className="lf-giant-letters" style={{ color: current.color }}>
            <span className="lf-upper">{current.letter}</span>
            <span className="lf-lower">{current.lower}</span>
          </div>
          <div className="lf-word-phoneme">
            <span className="lf-word">{current.word}</span>
            <span className="lf-phoneme">/{current.sound}/ sound</span>
          </div>
        </div>

        <button
          type="button"
          className="lf-hear-btn"
          style={{
            background: current.color,
            borderColor: LF.navy,
            boxShadow: `3px 4px 0 ${LF.navy}`,
          }}
          onClick={() => playVoice(selected)}
          aria-label={`Play sound for letter ${current.letter}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          <span>{isPlaying ? "Pronouncing..." : `Hear "${current.letter}" Sound`}</span>
        </button>
      </div>

      {/* Letter Selector Tabs */}
      <div className="lf-phonics-selector">
        {phonicsLessons.map((item, idx) => (
          <button
            key={item.letter}
            type="button"
            className={`lf-phonics-tab ${selected === idx ? "active" : ""}`}
            style={{
              borderColor: selected === idx ? LF.navy : "rgba(26,0,80,0.2)",
              background: selected === idx ? item.bg : "#FFFFFF",
              boxShadow: selected === idx ? `3px 4px 0 ${LF.navy}` : "none",
            }}
            onClick={() => playVoice(idx)}
          >
            <span className="lf-tab-char" style={{ color: item.color }}>{item.letter}{item.lower}</span>
            <span className="lf-tab-icon">{item.emoji}</span>
          </button>
        ))}
      </div>
      <p className="lf-phonics-caption">
        Tested with toddlers: Multisensory feedback (Visual Letter + Picture + Audio Phoneme) increases concept retention by over 3× compared to static flashcards.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 4. PERRY WANG-STYLE COMPARISON CHAIN                                      */
/* ------------------------------------------------------------------------- */
export type ComparisonProps = {
  feedback: {
    kicker: string;
    quote: string;
  };
  decision: {
    kicker: string;
    action: string;
  };
  before: {
    label: string;
    title: string;
    desc: string;
    items?: string[];
  };
  after: {
    label: string;
    title: string;
    desc: string;
    items?: string[];
  };
};

export function FeedbackDecisionComparison({ feedback, decision, before, after }: ComparisonProps) {
  const [view, setView] = useState<"after" | "before">("after");

  return (
    <div className="f-chain">
      {/* 1. Feedback Step */}
      <div className="f-node f-feedback">
        <span className="mono f-kicker">{feedback.kicker}</span>
        <blockquote className="f-quote">“{feedback.quote}”</blockquote>
      </div>

      {/* Down arrow connector */}
      <div className="f-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>

      {/* 2. Product Decision Step */}
      <div className="f-node f-decision">
        <span className="mono f-kicker">{decision.kicker}</span>
        <h4 className="f-title">{decision.action}</h4>
      </div>

      {/* Down arrow connector */}
      <div className="f-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>

      {/* 3. Interactive Before / After Result */}
      <div className="f-compare-card">
        <div className="f-toggle-bar">
          <span className="mono">Design Iteration</span>
          <div className="f-switch">
            <button
              type="button"
              className={view === "before" ? "on" : ""}
              onClick={() => setView("before")}
            >
              Before
            </button>
            <button
              type="button"
              className={view === "after" ? "on" : ""}
              onClick={() => setView("after")}
            >
              After (Shipped)
            </button>
          </div>
        </div>

        <div className="f-preview-area">
          {view === "before" ? (
            <div className="f-pane before">
              <span className="mono tag-before">{before.label}</span>
              <h5>{before.title}</h5>
              <p>{before.desc}</p>
              {before.items && (
                <div className="f-item-list">
                  {before.items.map((item, i) => (
                    <div key={i} className="f-item before">{item}</div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="f-pane after">
              <span className="mono tag-after">{after.label}</span>
              <h5>{after.title}</h5>
              <p>{after.desc}</p>
              {after.items && (
                <div className="f-item-list">
                  {after.items.map((item, i) => (
                    <div key={i} className="f-item after">{item}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 5. BEFORE & AFTER PHONE MOCKUP COMPARISON (UXBrainy Reference Style)      */
/* ------------------------------------------------------------------------- */
export function BeforeAfterComparisonMockup() {
  return (
    <div className="f-side-by-side-comparison">
      {/* Header with Centered Context Tag, Before/After Targets & Arched Directional Arrow */}
      <div className="f-comparison-header-wrap">
        <span className="f-comparison-top-caption">Eliminating Visual Noise</span>
        <div className="f-comparison-flow-row">
          <div className="f-comparison-flow-col before">
            <h4 className="f-comparison-heading">Before</h4>
            <span className="f-comparison-pill before">Initial Prototype</span>
          </div>

          <div className="f-comparison-arrow-bridge">
            <svg
              className="f-comparison-arc-svg"
              viewBox="0 0 180 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Elegant cubic bezier curve arching from Before to After */}
              <path
                d="M 14 42 C 50 6, 130 6, 166 36"
                stroke="#475569"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Arrowhead angled precisely along the arrival trajectory */}
              <path
                d="M 151 26 L 167 37 L 163 20"
                stroke="#475569"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="f-comparison-flow-col after">
            <h4 className="f-comparison-heading">After</h4>
            <span className="f-comparison-pill after">Refined &amp; Focused</span>
          </div>
        </div>
      </div>

      {/* Two Phone Mockups Side-by-Side */}
      <div className="f-comparison-columns">
        {/* Before Mockup */}
        <div className="f-comparison-col">
          <div className="f-comparison-frame">
            <div className="f-comparison-screen">
              <img
                src="/images/learn-fun/letters-learned-before.png"
                alt="Before testing: Extraneous decorative sparkles, border stars, and multiple non-functional buttons"
              />
            </div>
          </div>
          <p className="f-comparison-notes">
            <strong>Decorative Clutter:</strong> Extraneous stars and non-functional buttons created false affordances, distracting 3–5-year-olds from the primary learning task.
          </p>
        </div>

        {/* After Mockup */}
        <div className="f-comparison-col">
          <div className="f-comparison-frame">
            <div className="f-comparison-screen">
              <img
                src="/images/learn-fun/letters-learned-after.png"
                alt="After simplification: Removed decorative stars, direct focus to letter and large sound button"
              />
            </div>
          </div>
          <p className="f-comparison-notes">
            <strong>Clean Focus:</strong> Stripped non-essential ornaments. Retained only the letter card and prominent audio button, increasing task completion and child focus.
          </p>
        </div>
      </div>
    </div>
  );
}

