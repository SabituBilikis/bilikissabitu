"use client";

import React, { useState, useRef } from "react";

/* ------------------------------------------------------------------------- */
/* Authentic Learn Fun Design Tokens & Palette (extracted from live web app)  */
/* ------------------------------------------------------------------------- */
const LF_THEME = {
  navy: "#1A0050",
  red: "#FF3B30",
  redDark: "#CC2A20",
  orange: "#FF9500",
  orangeDark: "#CC7600",
  yellow: "#FFD700",
  green: "#34C759",
  greenDark: "#28A046",
  blue: "#007AFF",
  blueDark: "#0056CC",
  purple: "#AF52DE",
  purpleDark: "#8A3DB5",
  cream: "#F3EEFF",
  muted: "#E8DFFF",
  mutedFg: "#6B4FA0",
  white: "#FFFFFF",
};

/* ------------------------------------------------------------------------- */
/* 01: "Learning should feel like play"                                      */
/* Exact replica of the Adventure Carousel Component from learnfunkids.vercel.app */
/* ------------------------------------------------------------------------- */
function AdventureCardsMockup() {
  const [activeId, setActiveId] = useState<string>("alphabet");
  const [scrollIndex, setScrollIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: "alphabet",
      title: "Alphabet",
      subtitle: "A · B · C",
      lessons: 26,
      emoji: "🔤",
      color: LF_THEME.red,
      dark: LF_THEME.redDark,
      state: "active",
      progress: 100,
      deco: ["A", "B", "C"],
      isNew: false,
    },
    {
      id: "phonics",
      title: "Phonics",
      subtitle: "Learn letter sounds",
      lessons: 6,
      emoji: "🗣️",
      color: LF_THEME.orange,
      dark: LF_THEME.orangeDark,
      state: "new",
      progress: 0,
      deco: ["M", "🔊", "🐒"],
      isNew: true,
    },
    {
      id: "numbers",
      title: "Numbers",
      subtitle: "1 · 2 · 3",
      lessons: 20,
      emoji: "🔢",
      color: LF_THEME.orange,
      dark: LF_THEME.orangeDark,
      state: "new",
      progress: 0,
      deco: ["1", "2", "3"],
      isNew: true,
    },
    {
      id: "shapes",
      title: "Shapes",
      subtitle: "○ △ □ ◇",
      lessons: 10,
      emoji: "🔷",
      color: LF_THEME.blue,
      dark: LF_THEME.blueDark,
      state: "new",
      progress: 0,
      deco: ["○", "△", "□"],
      isNew: true,
    },
    {
      id: "colors",
      title: "Colors",
      subtitle: "Red · Blue · Gold",
      lessons: 12,
      emoji: "🎨",
      color: LF_THEME.green,
      dark: LF_THEME.greenDark,
      state: "locked",
      progress: 0,
      deco: ["🔴", "🔵", "🟡"],
      isNew: false,
    },
    {
      id: "animals",
      title: "Animals",
      subtitle: "Farm & Wild",
      lessons: 14,
      emoji: "🐶",
      color: LF_THEME.purple,
      dark: LF_THEME.purpleDark,
      state: "new",
      progress: 0,
      deco: ["🐱", "🐮", "🐷"],
      isNew: true,
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth = 236; // card width + gap
    const currentScroll = carouselRef.current.scrollLeft;
    const targetScroll = direction === "left" ? currentScroll - cardWidth : currentScroll + cardWidth;
    carouselRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
    const newIdx = Math.max(0, Math.min(categories.length - 1, Math.round(targetScroll / cardWidth)));
    setScrollIndex(newIdx);
  };

  const handleCardClick = (cat: typeof categories[0]) => {
    setActiveId(cat.id);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(
        cat.state === "locked" ? `${cat.title} is locked. Complete previous adventures to unlock!` : `Let's learn ${cat.title}!`
      );
      utter.rate = 1.0;
      utter.pitch = 1.25;
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <div
      className="lf-live-app-mockup"
      style={{
        background: "#FFFFFF",
        borderRadius: "24px",
        border: `2px solid ${LF_THEME.navy}`,
        boxShadow: `0 8px 24px rgba(26, 0, 80, 0.08), 3px 4px 0 ${LF_THEME.navy}`,
        padding: "20px",
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      {/* ── Top Greeting Bar ── */}
      <div
        className="lf-greeting-bar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "16px",
          paddingBottom: "12px",
          borderBottom: "1.5px solid rgba(26, 0, 80, 0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              fontSize: "36px",
              lineHeight: 1,
              display: "inline-block",
              transform: "rotate(-4deg)",
              filter: "drop-shadow(2px 3px 0 rgba(26,0,80,0.15))",
            }}
          >
            🦊
          </span>
          <div>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                color: LF_THEME.orange,
                fontSize: "12px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: 0,
              }}
            >
              HELLO!
            </p>
            <h4
              style={{
                fontFamily: "'Fredoka', sans-serif",
                color: LF_THEME.navy,
                fontSize: "clamp(16px, 1.8vw, 22px)",
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Child, what shall we learn?
            </h4>
          </div>
        </div>

        {/* Action button / capsule */}
        <div
          style={{
            background: LF_THEME.cream,
            color: LF_THEME.navy,
            border: `2px solid ${LF_THEME.navy}`,
            boxShadow: `2px 3px 0 ${LF_THEME.navy}`,
            borderRadius: "100px",
            padding: "5px 14px",
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 700,
            fontSize: "12.5px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>Choose Your Adventure!</span>
        </div>
      </div>

      {/* ── Carousel Header: Title + Navigation ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 700,
              fontSize: "17px",
              color: LF_THEME.navy,
            }}
          >
            ✨ Choose Your Adventure!
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              color: LF_THEME.mutedFg,
              fontFamily: "'Nunito', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              marginRight: "4px",
            }}
          >
            4/13 unlocked
          </span>
          <button
            type="button"
            aria-label="Previous adventure"
            onClick={() => handleScroll("left")}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: "#FFFFFF",
              border: `2px solid ${LF_THEME.navy}`,
              boxShadow: `2px 3px 0 ${LF_THEME.navy}`,
              color: LF_THEME.navy,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
              transition: "transform 0.1s ease",
            }}
          >
            ◀
          </button>
          <button
            type="button"
            aria-label="Next adventure"
            onClick={() => handleScroll("right")}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: "#FFFFFF",
              border: `2px solid ${LF_THEME.navy}`,
              boxShadow: `2px 3px 0 ${LF_THEME.navy}`,
              color: LF_THEME.navy,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
              transition: "transform 0.1s ease",
            }}
          >
            ▶
          </button>
        </div>
      </div>

      {/* ── Scrollable Adventure Cards Track (Exact $C component) ── */}
      <div
        ref={carouselRef}
        className="lf-carousel"
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          paddingBottom: "16px",
          scrollSnapType: "x proximity",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.map((cat, idx) => {
          const isSelected = activeId === cat.id;
          const isLocked = cat.state === "locked";

          return (
            <article
              key={cat.id}
              onClick={() => handleCardClick(cat)}
              style={{
                flex: "0 0 210px",
                width: "210px",
                height: "310px",
                borderRadius: "28px",
                border: `3px solid ${isSelected ? LF_THEME.navy : isLocked ? "#C4B8DC" : LF_THEME.navy}`,
                boxShadow: isSelected
                  ? `0 0 0 3px #6366F1, 4px 6px 0 ${LF_THEME.navy}`
                  : `4px 6px 0 ${isLocked ? "rgba(196,184,220,0.5)" : LF_THEME.navy}`,
                overflow: "hidden",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                background: "#FFFFFF",
                cursor: isLocked ? "default" : "pointer",
                scrollSnapAlign: "center",
                filter: isLocked ? "grayscale(0.55) brightness(0.92)" : "none",
                transform: isSelected ? "translateY(-3px)" : "none",
                transition: "transform 0.18s ease, box-shadow 0.18s ease",
                userSelect: "none",
              }}
            >
              {/* Top 46% Colored Banner */}
              <div
                style={{
                  flex: "0 0 46%",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  background: isLocked
                    ? "linear-gradient(135deg, #C8BDE0 0%, #A89AC8 100%)"
                    : `linear-gradient(140deg, ${cat.color}F2 0%, ${cat.dark}C8 100%)`,
                }}
              >
                {/* Subtle highlight gloss */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)",
                  }}
                />

                {/* Floating decorative characters */}
                {cat.deco.map((char, i) => (
                  <span
                    key={i}
                    style={{
                      position: "absolute",
                      fontSize: "1.05rem",
                      opacity: 0.22,
                      color: "#FFFFFF",
                      fontWeight: 800,
                      fontFamily: "'Fredoka', sans-serif",
                      top: ["12%", "62%", "32%"][i],
                      left: ["9%", "72%", "83%"][i],
                      transform: `rotate(${[-18, 22, -12][i]}deg)`,
                      pointerEvents: "none",
                    }}
                  >
                    {char}
                  </span>
                ))}

                {/* Large center emoji / symbol */}
                <span
                  style={{
                    fontSize: "58px",
                    lineHeight: 1,
                    filter: `drop-shadow(3px 5px 0 rgba(26,0,80,${isLocked ? "0.15" : "0.38"}))`,
                    position: "relative",
                  }}
                >
                  {cat.emoji}
                </span>

                {/* NEW! yellow pill badge */}
                {cat.isNew && (
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      background: LF_THEME.yellow,
                      color: LF_THEME.navy,
                      border: `2px solid ${LF_THEME.navy}`,
                      boxShadow: `2px 2.5px 0 ${LF_THEME.navy}`,
                      borderRadius: "10px",
                      padding: "2px 7px",
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 700,
                      fontSize: "10.5px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    NEW!
                  </div>
                )}

                {/* Locked overlay badge */}
                {isLocked && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(26,0,80,0.22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.9)",
                        border: `2px solid ${LF_THEME.navy}`,
                        boxShadow: `2px 3px 0 ${LF_THEME.navy}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                      }}
                    >
                      🔒
                    </div>
                  </div>
                )}

                {/* Lessons count pill on bottom left */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "7px",
                    left: "8px",
                    background: "rgba(255,255,255,0.92)",
                    border: "1.5px solid rgba(26,0,80,0.12)",
                    borderRadius: "7px",
                    padding: "2px 7px",
                  }}
                >
                  <span
                    style={{
                      color: isLocked ? LF_THEME.mutedFg : cat.color,
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "10.5px",
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cat.lessons} lessons
                  </span>
                </div>
              </div>

              {/* Bottom 54% White Info Area */}
              <div
                style={{
                  flex: "1 1 54%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: "#FFFFFF",
                }}
              >
                <div style={{ padding: "12px 14px 8px 14px" }}>
                  <h3
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 700,
                      fontSize: "17px",
                      color: isLocked ? LF_THEME.mutedFg : LF_THEME.navy,
                      margin: "0 0 2px 0",
                      lineHeight: 1.2,
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 600,
                      fontSize: "11.5px",
                      color: LF_THEME.mutedFg,
                      margin: 0,
                    }}
                  >
                    {cat.subtitle}
                  </p>
                </div>

                {/* Bottom Full-Width Action Button */}
                {isLocked ? (
                  <div
                    style={{
                      padding: "8px 12px",
                      background: LF_THEME.muted,
                      borderTop: "2px solid rgba(26,0,80,0.12)",
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 700,
                      fontSize: "13px",
                      color: LF_THEME.mutedFg,
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <span>🔒 Locked</span>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "8px 12px",
                      background: cat.color,
                      borderTop: `2.5px solid ${LF_THEME.navy}`,
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 700,
                      fontSize: "13px",
                      color: "#FFFFFF",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <span>▶</span>
                    <span>Start!</span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Dots Pagination (from real app) ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          paddingTop: "6px",
        }}
      >
        {categories.slice(0, 5).map((_, i) => (
          <div
            key={i}
            style={{
              height: "7px",
              width: i === scrollIndex ? "22px" : "7px",
              borderRadius: "100px",
              background: i === scrollIndex ? LF_THEME.navy : "rgba(26, 0, 80, 0.16)",
              transition: "all 0.25s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 02: "Reduce cognitive load"                                               */
/* Single-focus interactive card: One clear action -> One clear response     */
/* ------------------------------------------------------------------------- */
function CognitiveLoadMockup() {
  const [stars, setStars] = useState(3);
  const [justPlayed, setJustPlayed] = useState(false);

  const handleHearSound = () => {
    setJustPlayed(true);
    setStars((prev) => prev + 1);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance("Apple! /æ/");
      utter.rate = 0.9;
      utter.pitch = 1.3;
      window.speechSynthesis.speak(utter);
    }

    setTimeout(() => setJustPlayed(false), 1200);
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "24px",
        border: `2px solid ${LF_THEME.navy}`,
        boxShadow: `0 8px 24px rgba(26, 0, 80, 0.08), 3px 4px 0 ${LF_THEME.navy}`,
        padding: "20px",
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      {/* Top flow indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            background: "#EFF6FF",
            color: "#1D4ED8",
            border: "1.5px solid #BFDBFE",
            borderRadius: "100px",
            padding: "4px 12px",
            fontSize: "12px",
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>1️⃣</span> One clear action
        </span>
        <span style={{ color: LF_THEME.mutedFg, fontWeight: 800 }}>➔</span>
        <span
          style={{
            background: "#FEF3C7",
            color: "#92400E",
            border: "1.5px solid #FDE68A",
            borderRadius: "100px",
            padding: "4px 12px",
            fontSize: "12px",
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>2️⃣</span> One clear response
        </span>
      </div>

      {/* Main Single Action Screen Card */}
      <div
        style={{
          maxWidth: "420px",
          margin: "0 auto",
          background: `linear-gradient(135deg, ${LF_THEME.red} 0%, ${LF_THEME.redDark} 100%)`,
          borderRadius: "24px",
          border: `3px solid ${LF_THEME.navy}`,
          boxShadow: `4px 6px 0 ${LF_THEME.navy}`,
          padding: "22px 18px",
          color: "#FFFFFF",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top bar with stars */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.22)",
              border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: "100px",
              padding: "2px 10px",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            Alphabet · Lesson 1
          </span>
          <span
            style={{
              background: "rgba(255,255,255,0.92)",
              color: LF_THEME.navy,
              border: `2px solid ${LF_THEME.navy}`,
              boxShadow: `2px 2px 0 ${LF_THEME.navy}`,
              borderRadius: "100px",
              padding: "2px 10px",
              fontSize: "11.5px",
              fontWeight: 800,
            }}
          >
            ⭐ {stars} Stars
          </span>
        </div>

        {/* Big Letter Card */}
        <div style={{ padding: "8px 0 16px 0" }}>
          <div
            style={{
              fontSize: "76px",
              lineHeight: 1,
              fontWeight: 800,
              filter: "drop-shadow(3px 5px 0 rgba(26,0,80,0.35))",
            }}
          >
            A
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              margin: "6px 0 2px 0",
              letterSpacing: "0.02em",
            }}
          >
            A is for Apple 🍎
          </div>
          <div
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "13px",
              opacity: 0.9,
              fontWeight: 600,
            }}
          >
            Phoneme: /æ/
          </div>
        </div>

        {/* Oversized 64px thumb-friendly action button */}
        <button
          type="button"
          onClick={handleHearSound}
          style={{
            width: "100%",
            height: "58px",
            background: LF_THEME.yellow,
            color: LF_THEME.navy,
            border: `2.5px solid ${LF_THEME.navy}`,
            boxShadow: justPlayed ? "none" : `3px 4px 0 ${LF_THEME.navy}`,
            borderRadius: "18px",
            fontFamily: "'Fredoka', sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transform: justPlayed ? "translate(2px, 3px)" : "none",
            transition: "all 0.12s ease",
          }}
        >
          <span style={{ fontSize: "20px" }}>🔊</span>
          <span>{justPlayed ? "Playing /æ/ ... +1 ⭐!" : "Tap to hear sound"}</span>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 03: "Every visual element needs a job"                                    */
/* Interactive Before vs After Purpose Audit                                 */
/* ------------------------------------------------------------------------- */
function VisualElementJobMockup() {
  const [view, setView] = useState<"after" | "before">("after");

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "24px",
        border: `2px solid ${LF_THEME.navy}`,
        boxShadow: `0 8px 24px rgba(26, 0, 80, 0.08), 3px 4px 0 ${LF_THEME.navy}`,
        padding: "20px",
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      {/* Toggle Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        <button
          type="button"
          onClick={() => setView("after")}
          style={{
            padding: "6px 16px",
            borderRadius: "100px",
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
            border: `2px solid ${LF_THEME.navy}`,
            background: view === "after" ? LF_THEME.navy : "#FFFFFF",
            color: view === "after" ? "#FFFFFF" : LF_THEME.navy,
            boxShadow: view === "after" ? `2px 3px 0 ${LF_THEME.navy}` : "none",
            transition: "all 0.15s ease",
          }}
        >
          ✓ Shipped Design (Intentional & Focused)
        </button>
        <button
          type="button"
          onClick={() => setView("before")}
          style={{
            padding: "6px 16px",
            borderRadius: "100px",
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
            border: `2px solid ${LF_THEME.navy}`,
            background: view === "before" ? LF_THEME.navy : "#FFFFFF",
            color: view === "before" ? "#FFFFFF" : LF_THEME.navy,
            boxShadow: view === "before" ? `2px 3px 0 ${LF_THEME.navy}` : "none",
            transition: "all 0.15s ease",
          }}
        >
          ✕ Before Testing (Decorative Clutter)
        </button>
      </div>

      {/* Purpose Audit Comparison Card */}
      <div
        style={{
          maxWidth: "440px",
          margin: "0 auto",
          background: view === "after" ? "#F0FDF4" : "#FEF2F2",
          border: `2.5px solid ${view === "after" ? "#16A34A" : "#DC2626"}`,
          borderRadius: "20px",
          padding: "16px",
          boxShadow: `3px 4px 0 ${view === "after" ? "#16A34A" : "#DC2626"}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              color: view === "after" ? "#15803D" : "#B91C1C",
            }}
          >
            {view === "after" ? "Clean Learning Surface" : "Distracting Clutter Identified"}
          </span>
          <span
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              color: LF_THEME.mutedFg,
            }}
          >
            Audit Scorecard
          </span>
        </div>

        {view === "after" ? (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontFamily: "'Nunito', sans-serif",
              fontSize: "13px",
              color: "#166534",
              fontWeight: 600,
            }}
          >
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>✅</span> <strong>High contrast letter:</strong> immediate recognition from 3+ feet away
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>✅</span> <strong>Single 64px button:</strong> thumb-friendly touch target without false taps
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>✅</span> <strong>Star counter:</strong> reinforces positive feedback loop without distraction
            </li>
          </ul>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontFamily: "'Nunito', sans-serif",
              fontSize: "13px",
              color: "#991B1B",
              fontWeight: 600,
            }}
          >
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>❌</span> <strong>Decorative floating sparkles:</strong> toddlers kept tapping them expecting sound
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>❌</span> <strong>Multi-colored frames:</strong> caused cognitive competition with the lesson letter
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>❌</span> <strong>Secondary toolbars:</strong> led to unintentional exits from the learning loop
            </li>
          </ul>
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
