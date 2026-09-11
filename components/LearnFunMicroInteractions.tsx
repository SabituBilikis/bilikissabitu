"use client";

import React, { useState } from "react";

/* ------------------------------------------------------------------------- */
/* 1. INTERACTIVE PHONICS DEMO (Letter → Sound → Word with Web Audio / Speech) */
/* ------------------------------------------------------------------------- */
const phonicsData = [
  {
    letter: "A",
    word: "Apple",
    sound: "æ",
    emoji: "🍎",
    bg: "#FFF1F0",
    border: "#FFA39E",
    accent: "#F5222D",
    voiceText: "A is for Apple. Ah, ah, apple.",
  },
  {
    letter: "B",
    word: "Ball",
    sound: "b",
    emoji: "⚽",
    bg: "#E6F7FF",
    border: "#91D5FF",
    accent: "#1890FF",
    voiceText: "B is for Ball. Buh, buh, ball.",
  },
  {
    letter: "C",
    word: "Cat",
    sound: "k",
    emoji: "🐱",
    bg: "#FFFBE6",
    border: "#FFE58F",
    accent: "#FAAD14",
    voiceText: "C is for Cat. Kuh, kuh, cat.",
  },
  {
    letter: "D",
    word: "Duck",
    sound: "d",
    emoji: "🦆",
    bg: "#F6FFED",
    border: "#B7EB8F",
    accent: "#52C41A",
    voiceText: "D is for Duck. Duh, duh, duck.",
  },
];

export function PhonicsDemo() {
  const [selected, setSelected] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPhonics = (index: number) => {
    setSelected(index);
    setIsPlaying(true);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const item = phonicsData[index];
      const utter = new SpeechSynthesisUtterance(item.voiceText);
      utter.rate = 0.85;
      utter.pitch = 1.15;
      utter.onend = () => setIsPlaying(false);
      utter.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utter);
    } else {
      setTimeout(() => setIsPlaying(false), 1200);
    }
  };

  const current = phonicsData[selected];

  return (
    <div className="phonics-widget">
      <div className="phonics-header">
        <span className="mono">Interactive Prototype · Tap any letter</span>
        <span className="phonics-badge">Letter → Sound → Word</span>
      </div>

      <div className="phonics-main" style={{ background: current.bg, borderColor: current.border }}>
        <div className={`phonics-display ${isPlaying ? "bounce-pop" : ""}`}>
          <div className="p-emoji" aria-hidden="true">{current.emoji}</div>
          <div className="p-letter" style={{ color: current.accent }}>
            {current.letter}
          </div>
          <div className="p-meta">
            <span className="p-word">{current.word}</span>
            <span className="p-sound">/{current.sound}/ sound</span>
          </div>
        </div>

        <button
          type="button"
          className="phonics-sound-btn"
          style={{ background: current.accent }}
          onClick={() => playPhonics(selected)}
          aria-label={`Play sound for letter ${current.letter}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          <span>{isPlaying ? "Playing..." : `Hear "${current.letter}"`}</span>
        </button>
      </div>

      <div className="phonics-selector">
        {phonicsData.map((item, idx) => (
          <button
            key={item.letter}
            type="button"
            className={`phonics-tab ${selected === idx ? "active" : ""}`}
            style={{ borderColor: selected === idx ? item.accent : undefined }}
            onClick={() => playPhonics(idx)}
          >
            <span className="tab-letter" style={{ color: item.accent }}>{item.letter}</span>
            <span className="tab-emoji">{item.emoji}</span>
          </button>
        ))}
      </div>
      <p className="phonics-footnote">
        Tap to experience the audio-visual feedback toddlers experience when connecting visual shapes to phonemes.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 2. PERRY WANG-STYLE BEFORE / AFTER COMPARISON CHAIN                        */
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
    html?: string;
  };
  after: {
    label: string;
    title: string;
    desc: string;
    items?: string[];
    html?: string;
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>

      {/* 2. Product Decision Step */}
      <div className="f-node f-decision">
        <span className="mono f-kicker">{decision.kicker}</span>
        <h4 className="f-title">{decision.action}</h4>
      </div>

      {/* Down arrow connector */}
      <div className="f-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
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
              {before.html && <div className="f-html" dangerouslySetInnerHTML={{ __html: before.html }} />}
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
              {after.html && <div className="f-html" dangerouslySetInnerHTML={{ __html: after.html }} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 3. INTERACTIVE TABLET LEARNING MODULES PREVIEW                            */
/* ------------------------------------------------------------------------- */
const categories = [
  { id: "letters", name: "Letters", color: "#FF5E00", icon: "🔤", desc: "Alphabet & Phonics", preview: ["A · Apple 🍎", "B · Ball ⚽", "C · Cat 🐱", "D · Duck 🦆"] },
  { id: "numbers", name: "Numbers", color: "#1890FF", icon: "🔢", desc: "Counting & Quantities", preview: ["1 · Star ⭐", "2 · Eyes 👀", "3 · Hearts 💖", "4 · Wheels 🚗"] },
  { id: "shapes", name: "Shapes", color: "#52C41A", icon: "🔷", desc: "Colors & Geometry", preview: ["Circle 🔴", "Triangle 🔺", "Square 🟦", "Star ⭐"] },
  { id: "animals", name: "Animals", color: "#FA8C16", icon: "🦁", desc: "Sounds & Creatures", preview: ["Lion 🦁", "Duck 🦆", "Elephant 🐘", "Dog 🐶"] },
  { id: "home", name: "Home", color: "#722ED1", icon: "🏡", desc: "Everyday Objects", preview: ["Bed 🛏️", "Clock ⏰", "Chair 🪑", "Door 🚪"] },
  { id: "school", name: "School", color: "#EB2F96", icon: "🎒", desc: "Classroom Basics", preview: ["Book 📖", "Pencil ✏️", "Bag 🎒", "Scissors ✂️"] },
];

export function TabletInteractiveCanvas() {
  const [activeCat, setActiveCat] = useState(categories[0]);

  return (
    <div className="tablet-canvas-wrapper">
      <div className="tablet-canvas-header">
        <div className="t-brand">
          <span className="t-logo-dot" />
          <span className="t-title">Learn Fun · Primary Tablet Experience</span>
        </div>
        <span className="mono t-tag">Touch-First · Min 64px hitboxes</span>
      </div>

      <div className="tablet-app-ui">
        {/* Navigation Sidebar inside the Tablet */}
        <div className="tablet-sidebar">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`tablet-cat-btn ${activeCat.id === c.id ? "active" : ""}`}
              style={{ borderLeftColor: activeCat.id === c.id ? c.color : "transparent" }}
              onClick={() => setActiveCat(c)}
            >
              <span className="cat-icon">{c.icon}</span>
              <span className="cat-name">{c.name}</span>
            </button>
          ))}
        </div>

        {/* Tablet Activity Canvas */}
        <div className="tablet-main">
          <div className="tablet-main-bar" style={{ borderColor: activeCat.color }}>
            <div>
              <h3>{activeCat.name}</h3>
              <p>{activeCat.desc}</p>
            </div>
            <div className="tablet-badge" style={{ background: activeCat.color }}>
              Touch to explore
            </div>
          </div>

          <div className="tablet-cards-grid">
            {activeCat.preview.map((item, i) => (
              <div
                key={i}
                className="tablet-learning-card"
                style={{ borderColor: activeCat.color }}
              >
                <span className="tl-card-text">{item}</span>
                <span className="tl-touch-cue">👆</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Annotations below */}
      <div className="tablet-annotations">
        <div className="t-anno">
          <span className="mono">01 · Big Touch Targets</span>
          <p>Hit targets exceeding 64px prevent frustration for developing motor skills.</p>
        </div>
        <div className="t-anno">
          <span className="mono">02 · Visual First</span>
          <p>Illustrations and shapes lead the interaction without demanding literacy.</p>
        </div>
        <div className="t-anno">
          <span className="mono">03 · Zero Dead Ends</span>
          <p>Every tap triggers playful sensory feedback or guided progression.</p>
        </div>
      </div>
    </div>
  );
}
