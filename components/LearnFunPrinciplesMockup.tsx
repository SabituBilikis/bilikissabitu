"use client";

import React, { useState, useRef } from "react";

/* ------------------------------------------------------------------------- */
/* Authentic Learn Fun Design Tokens & Palette (from live learnfunkids web app) */
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
  teal: "#00C7BE",
  tealDark: "#009B94",
  cream: "#F3EEFF",
  muted: "#E8DFFF",
  mutedFg: "#6B4FA0",
  white: "#FFFFFF",
};

/* ------------------------------------------------------------------------- */
/* 01: "Learning should feel like play"                                      */
/* Exact replica of the Adventure Carousel Component (from live app `/`)     */
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
      deco: ["🐱", "🐮", "🐷"],
      isNew: true,
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth = 232;
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
        cat.state === "locked"
          ? `${cat.title} is locked. Complete previous adventures to unlock!`
          : `Let's learn ${cat.title}!`
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
        border: `2.5px solid ${LF_THEME.navy}`,
        boxShadow: `0 8px 24px rgba(26, 0, 80, 0.08), 3px 4px 0 ${LF_THEME.navy}`,
        padding: "20px",
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      {/* Top Greeting Bar */}
      <div
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
          }}
        >
          Choose Your Adventure!
        </div>
      </div>

      {/* Carousel Header: Title + Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "14px",
        }}
      >
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
            }}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Cards Track */}
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
        {categories.map((cat) => {
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
              {/* Top Colored Banner */}
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
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)",
                  }}
                />

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

              {/* Bottom White Info */}
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

      {/* Dots */}
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
/* 02: "Reduce cognitive load — One clear action -> one clear response"       */
/* Exact replica of the Lesson Screen (`wd` / `Yb` / `Kb` / `Gb` in live app) */
/* ------------------------------------------------------------------------- */
function CognitiveLoadMockup() {
  const [stars, setStars] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLetterIdx, setActiveLetterIdx] = useState(0);

  const lessons = [
    { letter: "A", word: "Apple", emoji: "🍎", phoneme: "/æ/", color: LF_THEME.red, dark: LF_THEME.redDark },
    { letter: "B", word: "Ball", emoji: "⚽", phoneme: "/b/", color: LF_THEME.blue, dark: LF_THEME.blueDark },
    { letter: "C", word: "Cat", emoji: "🐱", phoneme: "/k/", color: LF_THEME.green, dark: LF_THEME.greenDark },
  ];

  const current = lessons[activeLetterIdx];

  const handleSpeak = () => {
    setIsPlaying(true);
    setStars((s) => s + 1);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(`${current.letter}! ${current.letter} for ${current.word}!`);
      utter.rate = 0.85;
      utter.pitch = 1.3;
      window.speechSynthesis.speak(utter);
    }

    setTimeout(() => setIsPlaying(false), 1400);
  };

  return (
    <div
      style={{
        position: "relative",
        background: `linear-gradient(150deg, ${current.color} 0%, ${current.dark} 100%)`,
        borderRadius: "24px",
        border: `3px solid ${LF_THEME.navy}`,
        boxShadow: `0 8px 24px rgba(26, 0, 80, 0.12), 4px 6px 0 ${LF_THEME.navy}`,
        padding: "16px 20px 20px 20px",
        color: "#FFFFFF",
        fontFamily: "'Fredoka', sans-serif",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Floating background decorative characters */}
      <span
        style={{
          position: "absolute",
          top: "10%",
          left: "6%",
          fontSize: "110px",
          fontWeight: 900,
          color: "rgba(255, 255, 255, 0.08)",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        {current.letter}
      </span>
      <span
        style={{
          position: "absolute",
          bottom: "12%",
          right: "8%",
          fontSize: "90px",
          opacity: 0.1,
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        {current.emoji}
      </span>

      {/* ── Screen Header Bar (from live `wd`) ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "18px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={() => setActiveLetterIdx((i) => Math.max(0, i - 1))}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "14px",
            background: "rgba(255, 255, 255, 0.22)",
            border: "2px solid rgba(255, 255, 255, 0.6)",
            color: "#FFFFFF",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ◀
        </button>

        {/* Lesson Progress Badge */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            border: "2px solid rgba(255, 255, 255, 0.5)",
            borderRadius: "100px",
            padding: "3px 14px",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.04em",
          }}
        >
          {activeLetterIdx + 1} / {lessons.length}
        </div>

        {/* Stars counter & Done button */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.22)",
              border: "2px solid rgba(255, 255, 255, 0.5)",
              borderRadius: "14px",
              padding: "4px 12px",
              fontSize: "13px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>⭐</span>
            <span>{stars}</span>
          </div>

          <div
            style={{
              background: LF_THEME.green,
              border: `2px solid ${LF_THEME.navy}`,
              boxShadow: `2px 3px 0 ${LF_THEME.navy}`,
              borderRadius: "14px",
              padding: "4px 12px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            ✓ Done!
          </div>
        </div>
      </div>

      {/* ── Main 3-Column Stage (mascot, letter button, object panel) ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr 1fr",
          alignItems: "center",
          justifyItems: "center",
          gap: "16px",
          padding: "10px 0 20px 0",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Mascot Prompt (`Gb`) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "52px", lineHeight: 1 }}>🦊</span>
          <div
            style={{
              background: "#FFFFFF",
              border: `2px solid ${LF_THEME.navy}`,
              boxShadow: `2.5px 3.5px 0 ${LF_THEME.navy}`,
              borderRadius: "14px",
              padding: "5px 12px",
              color: LF_THEME.navy,
              fontSize: "12px",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            What is this?
          </div>
        </div>

        {/* Center Giant Letter Button (`Yb`) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            onClick={handleSpeak}
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "9999px",
              background: "#FFFFFF",
              border: `5px solid ${LF_THEME.navy}`,
              boxShadow: `6px 8px 0 ${LF_THEME.navy}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: isPlaying ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.15s ease",
            }}
          >
            <span
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 700,
                fontSize: "76px",
                color: current.color,
                lineHeight: 1,
              }}
            >
              {current.letter}
            </span>
          </button>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.24)",
              border: "1.5px solid rgba(255, 255, 255, 0.5)",
              borderRadius: "100px",
              padding: "3px 14px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            Tap letter to hear sound
          </div>
        </div>

        {/* Word & Emoji Panel (`Kb`) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontSize: "58px",
              lineHeight: 1,
              filter: "drop-shadow(3px 5px 0 rgba(26,0,80,0.35))",
            }}
          >
            {current.emoji}
          </span>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.24)",
              border: "1.5px solid rgba(255, 255, 255, 0.55)",
              backdropFilter: "blur(6px)",
              borderRadius: "14px",
              padding: "4px 14px",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            {current.word}
          </div>
        </div>
      </div>

      {/* ── Bottom Controls: Previous, Giant Sound Button, Next ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          position: "relative",
          zIndex: 2,
          paddingTop: "6px",
        }}
      >
        <button
          type="button"
          onClick={() => setActiveLetterIdx((i) => Math.max(0, i - 1))}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.22)",
            border: "2.5px solid rgba(255, 255, 255, 0.6)",
            color: "#FFFFFF",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ◀
        </button>

        {/* Giant Yellow Tactile Sound Button (from live app) */}
        <button
          type="button"
          onClick={handleSpeak}
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "9999px",
            background: LF_THEME.yellow,
            border: `3.5px solid ${LF_THEME.navy}`,
            boxShadow: isPlaying ? "none" : `4px 6px 0 ${LF_THEME.navy}`,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            transform: isPlaying ? "translate(2px, 3px) scale(1.05)" : "scale(1)",
            transition: "all 0.12s ease",
          }}
          title="Tap to speak"
        >
          🔊
        </button>

        <button
          type="button"
          onClick={() => setActiveLetterIdx((i) => Math.min(lessons.length - 1, i + 1))}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.22)",
            border: "2.5px solid rgba(255, 255, 255, 0.6)",
            color: "#FFFFFF",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 03: "Every visual element needs a job"                                    */
/* Exact replica of the Phonics Sound Discovery Board (`eE` in live app)     */
/* ------------------------------------------------------------------------- */
function SoundDiscoveryBoardMockup() {
  const [activePhoneme, setActivePhoneme] = useState<string | null>("a");

  const soundTiles = [
    { id: "a", letter: "A", phoneme: "/æ/", word: "Apple", emoji: "🍎", color: LF_THEME.red, speechText: "ah. Apple!" },
    { id: "b", letter: "B", phoneme: "/b/", word: "Ball", emoji: "⚽", color: LF_THEME.blue, speechText: "buh. Ball!" },
    { id: "c", letter: "C", phoneme: "/k/", word: "Cat", emoji: "🐱", color: LF_THEME.green, speechText: "kuh. Cat!" },
    { id: "d", letter: "D", phoneme: "/d/", word: "Dog", emoji: "🐶", color: LF_THEME.orange, speechText: "duh. Dog!" },
    { id: "e", letter: "E", phoneme: "/ɛ/", word: "Elephant", emoji: "🐘", color: LF_THEME.purple, speechText: "eh. Elephant!" },
    { id: "f", letter: "F", phoneme: "/f/", word: "Fish", emoji: "🐟", color: LF_THEME.teal, speechText: "fuh. Fish!" },
  ];

  const handleTileClick = (tile: typeof soundTiles[0]) => {
    setActivePhoneme(tile.id);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(tile.speechText);
      utter.rate = 0.9;
      utter.pitch = 1.3;
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #FFF9F0 0%, #FFFFFF 50%, #F3EEFF 100%)",
        borderRadius: "24px",
        border: `2.5px solid ${LF_THEME.navy}`,
        boxShadow: `0 8px 24px rgba(26, 0, 80, 0.08), 3px 4px 0 ${LF_THEME.navy}`,
        padding: "18px 20px 22px 20px",
        fontFamily: "'Fredoka', sans-serif",
        userSelect: "none",
      }}
    >
      {/* ── Top Navigation Bar (from live app `eE`) ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "12px",
          borderBottom: `2.5px solid ${LF_THEME.navy}`,
          marginBottom: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              background: "#FFFFFF",
              border: `2px solid ${LF_THEME.navy}`,
              boxShadow: `2px 2.5px 0 ${LF_THEME.navy}`,
              borderRadius: "12px",
              padding: "4px 12px",
              fontSize: "12.5px",
              fontWeight: 700,
              color: LF_THEME.navy,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>🏠</span> Home
          </div>
        </div>

        <div
          style={{
            background: LF_THEME.orange,
            border: `2px solid ${LF_THEME.navy}`,
            boxShadow: `2px 2.5px 0 ${LF_THEME.navy}`,
            borderRadius: "12px",
            padding: "4px 12px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>⭐</span>
          <span>24 Stars</span>
        </div>
      </div>

      {/* ── Heading (exact text from live app `/phonics`) ── */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <h3
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(18px, 2.4vw, 24px)",
            color: LF_THEME.navy,
            margin: "0 0 2px 0",
          }}
        >
          Let&apos;s Discover Sounds! 🗣️
        </h3>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            color: LF_THEME.mutedFg,
            margin: 0,
          }}
        >
          Tap a letter and listen — every visual element has a functional sound job.
        </p>
      </div>

      {/* ── Grid of 6 Interactive Sound Tiles (from live `eE`) ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "14px",
        }}
      >
        {soundTiles.map((tile) => {
          const isActive = activePhoneme === tile.id;

          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => handleTileClick(tile)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 10px 10px 10px",
                borderRadius: "22px",
                background: "#FFFFFF",
                border: `3px solid ${isActive ? tile.color : LF_THEME.navy}`,
                boxShadow: isActive
                  ? `0 0 0 2px ${tile.color}, 4px 6px 0 ${LF_THEME.navy}`
                  : `4px 6px 0 ${LF_THEME.navy}`,
                cursor: "pointer",
                height: "155px",
                position: "relative",
                overflow: "hidden",
                transform: isActive ? "scale(1.03)" : "scale(1)",
                transition: "all 0.15s ease",
              }}
            >
              {/* Top Header inside tile: sound wave emoji + phoneme */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "0 4px",
                }}
              >
                <span style={{ fontSize: "14px" }}>🗣️</span>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 700,
                    fontSize: "13px",
                    color: tile.color,
                  }}
                >
                  {tile.phoneme}
                </span>
              </div>

              {/* Big Bold Letter */}
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: 700,
                  fontSize: "48px",
                  lineHeight: 1,
                  color: tile.color,
                  display: "block",
                  margin: "4px 0",
                }}
              >
                {tile.letter}
              </span>

              {/* Word + Emoji Badge */}
              <div
                style={{
                  width: "100%",
                  background: LF_THEME.cream,
                  border: "1.5px solid rgba(26, 0, 80, 0.12)",
                  borderRadius: "10px",
                  padding: "3px 6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <span style={{ fontSize: "14px" }}>{tile.emoji}</span>
                <span
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: LF_THEME.navy,
                  }}
                >
                  {tile.word}
                </span>
              </div>
            </button>
          );
        })}
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
      component: <SoundDiscoveryBoardMockup />,
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
