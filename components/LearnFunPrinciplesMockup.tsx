"use client";

import React, { useState } from "react";

/* ------------------------------------------------------------------------- */
/* MOCKUP 1: "Learning should feel like play"                                */
/* Extracted directly from https://learnfunkids.vercel.app adventure cards   */
/* ------------------------------------------------------------------------- */
function AdventureCardsMockup() {
  const [activeId, setActiveId] = useState<string>("alphabet");
  const [feedback, setFeedback] = useState<string | null>(null);

  const cards = [
    {
      id: "alphabet",
      title: "Alphabet",
      subtitle: "A · B · C",
      lessons: "26 lessons",
      bg: "#ef4444",
      dark: "#b91c1c",
      iconText: "abc",
      isNew: false,
    },
    {
      id: "phonics",
      title: "Phonics",
      subtitle: "Learn letter sounds",
      lessons: "6 lessons",
      bg: "#f97316",
      dark: "#c2410c",
      iconText: "🗣️",
      isNew: true,
    },
    {
      id: "numbers",
      title: "Numbers",
      subtitle: "1 · 2 · 3",
      lessons: "20 lessons",
      bg: "#f59e0b",
      dark: "#b45309",
      iconText: "12 34",
      isNew: true,
    },
    {
      id: "shapes",
      title: "Shapes",
      subtitle: "○ △ □ ◇",
      lessons: "10 lessons",
      bg: "#3b82f6",
      dark: "#1d4ed8",
      iconText: "🔷",
      isNew: true,
    },
  ];

  const handleCardClick = (card: typeof cards[0]) => {
    setActiveId(card.id);
    setFeedback(`Selected ${card.title}! Action is immediate before text is read.`);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(card.title);
      utter.rate = 0.95;
      utter.pitch = 1.2;
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <div className="lf-principle-mockup play-mockup">
      <div className="mockup-header-bar">
        <div className="mockup-greeting">
          <span className="fox-avatar">🦊</span>
          <div>
            <span className="greeting-sub">Hello!</span>
            <h5 className="greeting-main">Child, what shall we learn?</h5>
          </div>
        </div>
        <span className="mockup-tag">Choose Your Adventure!</span>
      </div>

      <div className="adventure-cards-grid">
        {cards.map((c) => {
          const isSelected = activeId === c.id;
          return (
            <div
              key={c.id}
              className={`adventure-card ${isSelected ? "selected" : ""}`}
              style={{
                borderColor: isSelected ? c.dark : "transparent",
              }}
              onClick={() => handleCardClick(c)}
              role="button"
              tabIndex={0}
            >
              {/* Card visual banner */}
              <div className="adventure-card-top" style={{ background: c.bg }}>
                <span className="adventure-lessons-pill">{c.lessons}</span>
                {c.isNew && <span className="adventure-new-pill">NEW!</span>}
                <div className="adventure-3d-icon">
                  <span>{c.iconText}</span>
                </div>
              </div>

              {/* Card info */}
              <div className="adventure-card-body">
                <h6 className="adventure-card-title">{c.title}</h6>
                <p className="adventure-card-sub">{c.subtitle}</p>
                <button
                  type="button"
                  className="adventure-start-btn"
                  style={{ background: c.bg }}
                >
                  ▶ Start!
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {feedback && (
        <div className="mockup-live-feedback">
          <span className="feedback-sparkle">✨</span>
          <span>{feedback}</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* MOCKUP 2: "Reduce cognitive load"                                         */
/* Interactive demonstration of "One clear action → One clear response"       */
/* ------------------------------------------------------------------------- */
function CognitiveLoadMockup() {
  const [step, setStep] = useState<"ready" | "responding">("ready");
  const [stars, setStars] = useState(3);

  const handleTriggerAction = () => {
    setStep("responding");

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance("Ah! Apple!");
      utter.rate = 0.9;
      utter.pitch = 1.25;
      window.speechSynthesis.speak(utter);
    }

    setStars((s) => s + 1);
    setTimeout(() => {
      setStep("ready");
    }, 2200);
  };

  return (
    <div className="lf-principle-mockup cognitive-mockup">
      <div className="cognitive-flow-indicator">
        <div className="flow-badge action-badge">
          <span className="flow-step">1</span>
          <span>One Clear Action</span>
        </div>
        <span className="flow-arrow">➔</span>
        <div className="flow-badge response-badge">
          <span className="flow-step">2</span>
          <span>One Clear Response</span>
        </div>
      </div>

      <div className="single-action-tablet-screen">
        {/* Simplified Header */}
        <div className="single-action-header">
          <span className="screen-back-btn">‹ Back</span>
          <div className="screen-star-counter">
            <span>⭐</span>
            <strong>{stars} Stars</strong>
          </div>
        </div>

        {/* Big Single Focal Target */}
        <div className="single-action-canvas">
          <div className={`focused-letter-card ${step === "responding" ? "active-bounce" : ""}`}>
            <span className="letter-glyph">A</span>
            <span className="phoneme-pill">/æ/</span>
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            className={`massive-action-btn ${step === "responding" ? "pressed" : ""}`}
            onClick={handleTriggerAction}
          >
            <span className="action-sound-icon">🔊</span>
            <span>{step === "responding" ? "Playing: /æ/ · Apple!" : "Tap to hear sound"}</span>
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="single-action-bottom">
          <span className="rule-note">Zero nested menus · 64px hit target · Instant auditory feedback</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* MOCKUP 3: "Every visual element needs a job"                              */
/* Interactive Before vs After Purpose Audit Comparison                      */
/* ------------------------------------------------------------------------- */
function VisualElementJobMockup() {
  const [view, setView] = useState<"after" | "before">("after");

  return (
    <div className="lf-principle-mockup audit-mockup">
      {/* Toggle View */}
      <div className="audit-toggle-bar">
        <button
          type="button"
          className={`audit-toggle-btn ${view === "after" ? "active" : ""}`}
          onClick={() => setView("after")}
        >
          <span className="status-indicator shipped" />
          Shipped Design (Every Element Has a Job)
        </button>
        <button
          type="button"
          className={`audit-toggle-btn ${view === "before" ? "active" : ""}`}
          onClick={() => setView("before")}
        >
          <span className="status-indicator before" />
          Before Testing (Decorative Clutter)
        </button>
      </div>

      <div className="audit-comparison-canvas">
        {view === "after" ? (
          /* SHIPPED DESIGN: CLEAR PURPOSE FOR EVERY ELEMENT */
          <div className="audit-screen shipped-view">
            <div className="audit-annotation-pill top-right">
              <span className="job-label">Job: Reward feedback</span>
            </div>

            <div className="shipped-header">
              <span className="shipped-logo">Learn Fun 🦊</span>
              <span className="job-badge header-job">Job: Trusted brand anchor</span>
            </div>

            <div className="shipped-body">
              <div className="shipped-card-wrapper">
                <div className="shipped-activity-card">
                  <div className="shipped-icon-box">abc</div>
                  <div className="shipped-card-info">
                    <h6>Alphabet</h6>
                    <span>A · B · C · 26 lessons</span>
                  </div>
                  <button type="button" className="shipped-cta-btn">
                    ▶ Start!
                  </button>
                </div>
                <div className="audit-callout-tag">
                  <span className="check-icon">✓</span>
                  <span>100% functional: Visual focal point + large tactile hit target</span>
                </div>
              </div>
            </div>

            <div className="audit-summary-footer success">
              <strong>Result:</strong> Zero non-functional decorative icons. Toddlers navigate without accidental tap confusion.
            </div>
          </div>
        ) : (
          /* BEFORE TESTING: DECORATIVE NOISE */
          <div className="audit-screen cluttered-view">
            <div className="cluttered-header">
              <span className="cluttered-logo">Learn Fun</span>
              {/* Confusing decorative accessories */}
              <span className="clutter-dec dec-sparkle">✨</span>
              <span className="clutter-dec dec-heart">💖</span>
              <span className="clutter-dec dec-ribbon">🎀</span>
              <div className="audit-warning-pill">
                <span>⚠️ Distracted children tapped these</span>
              </div>
            </div>

            <div className="cluttered-body">
              <div className="cluttered-activity-card">
                <span className="clutter-dec dec-star-1">⭐</span>
                <span className="clutter-dec dec-star-2">⭐</span>
                <div className="cluttered-icon-box">abc</div>
                <div className="cluttered-card-info">
                  <h6>Alphabet</h6>
                </div>
                <button type="button" className="cluttered-cta-btn">
                  Play
                </button>
              </div>
              <div className="audit-callout-tag warning">
                <span className="cross-icon">✕</span>
                <span>Decorative stars & borders caused accidental taps and frustrated toddlers</span>
              </div>
            </div>

            <div className="audit-summary-footer failure">
              <strong>Observation:</strong> Toddlers expected every visual element to react. Removing decorative chrome improved completion by 35%.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* MAIN EXPORT: LearnFunPrinciplesMockup                                      */
/* ------------------------------------------------------------------------- */
export default function LearnFunPrinciplesMockup() {
  const principles = [
    {
      num: "01",
      title: "Learning should feel like play",
      desc: "Activities needed to encourage exploration rather than feel like traditional lessons. Large visual elements, recognizable illustrations, simple interactions, and predictable patterns make the learning action obvious before any text could be read.",
      component: <AdventureCardsMockup />,
    },
    {
      num: "02",
      title: "Reduce cognitive load",
      desc: "Young children have fewer mental models to rely on. Avoiding unnecessary choices and visual competition led to a strict rule: One clear action → one clear response. Navigation, activity selection, and learning interactions follow consistent patterns.",
      component: <CognitiveLoadMockup />,
    },
    {
      num: "03",
      title: "Every visual element needs a job",
      desc: "During testing, I discovered that some icons added decoration without improving understanding. If an element doesn't help a child understand, navigate, or learn, it doesn't belong on the screen. Removing decorative clutter proved far more impactful than adding decoration.",
      component: <VisualElementJobMockup />,
    },
  ];

  return (
    <div className="lf-principles-section-wrapper">
      {principles.map((p) => (
        <div className="lf-principle-card" key={p.num}>
          <div className="lf-principle-text">
            <span className="lf-principle-num">{p.num}</span>
            <div className="lf-principle-body">
              <h4 className="lf-principle-title">{p.title}</h4>
              <p className="lf-principle-desc">{p.desc}</p>
            </div>
          </div>

          <div className="lf-principle-component-slot">
            {p.component}
          </div>
        </div>
      ))}
    </div>
  );
}
