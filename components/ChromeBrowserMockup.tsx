"use client";

import React, { useState, useRef } from "react";

type Props = {
  video?: string;
  poster?: string;
  caption?: string;
  className?: string;
  aspectRatio?: string;
};

/**
 * Pixel-perfect Chrome desktop browser window mockup matching the user reference,
 * framing the application walkthrough video with tabs, toolbar, omnibox, and interactive video playback.
 */
export default function ChromeBrowserMockup({
  video = "/images/learn-fun/learn-fun-case-study.mp4",
  poster = "/images/learn-fun/video-frame.jpg",
  caption,
  className = "",
  aspectRatio = "1914 / 922",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className={`chrome-mockup-wrapper ${className}`}>
      <div className="chrome-window">
        {/* ── 1. Chrome Tab Bar ───────────────────────────────────────────── */}
        <div className="chrome-tabbar">
          {/* macOS Traffic Lights */}
          <div className="chrome-traffic-lights" aria-hidden="true">
            <span className="dot dot-close" />
            <span className="dot dot-min" />
            <span className="dot dot-max" />
          </div>

          {/* Chrome Tabs */}
          <div className="chrome-tabs-list">
            {/* Tab 1: Inactive "Portfolio" */}
            <div className="chrome-tab inactive">
              <span className="tab-fav tab-fav-pink" />
              <span className="tab-title">Portfolio</span>
              <span className="tab-close">×</span>
            </div>

            {/* Tab 2: Active "learn Fun" (matches reference exactly) */}
            <div className="chrome-tab active">
              <span className="tab-title">learn Fun</span>
              <span className="tab-close">×</span>
            </div>

            {/* Tab 3: Inactive "Landing Page" (Figma icon) */}
            <div className="chrome-tab inactive">
              <span className="tab-fav tab-fav-figma">
                <svg width="10" height="15" viewBox="0 0 38 57" fill="none">
                  <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                  <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                  <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                  <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                  <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                </svg>
              </span>
              <span className="tab-title">Landing Page</span>
              <span className="tab-close">×</span>
            </div>

            {/* Add Tab Button */}
            <button type="button" className="chrome-tab-add" aria-label="New tab">
              +
            </button>
          </div>
        </div>

        {/* ── 2. Chrome Navigation Toolbar & Omnibox ──────────────────────── */}
        <div className="chrome-toolbar">
          {/* Left Navigation Buttons */}
          <div className="chrome-nav-actions">
            {/* Back Arrow */}
            <button type="button" className="chrome-btn" aria-label="Back">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            {/* Forward Arrow (disabled) */}
            <button type="button" className="chrome-btn disabled" aria-label="Forward">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            {/* Reload Button */}
            <button type="button" className="chrome-btn" aria-label="Reload">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M23 4v6h-6M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </button>
          </div>

          {/* Omnibox / URL Bar */}
          <div className="chrome-omnibox">
            {/* Google "G" 4-color icon */}
            <svg className="chrome-google-icon" viewBox="0 0 24 24" width="14" height="14">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span className="chrome-omnibox-text">Learn Fun</span>
            {/* Bookmark star */}
            <svg className="chrome-star-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>

          {/* Right Extensions & Profile Icons */}
          <div className="chrome-tools-actions">
            {/* Extensions puzzle icon */}
            <button type="button" className="chrome-btn" aria-label="Extensions">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2v4a2 2 0 0 0 2 2h4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8z" />
              </svg>
            </button>
            {/* Side panel icon */}
            <button type="button" className="chrome-btn" aria-label="Side Panel">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="15" y1="3" x2="15" y2="21" />
              </svg>
            </button>
            {/* Profile Avatar circle */}
            <span className="chrome-profile-dot" aria-label="User Profile">
              <span>🌸</span>
            </span>
            {/* 3-dots Menu */}
            <button type="button" className="chrome-btn" aria-label="Menu">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <circle cx="12" cy="5" r="1.8" />
                <circle cx="12" cy="12" r="1.8" />
                <circle cx="12" cy="19" r="1.8" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── 3. Chrome Viewport (Video Player) ────────────────────────────── */}
        <div
          className="chrome-viewport"
          style={{ aspectRatio }}
          onClick={togglePlay}
          role="button"
          tabIndex={0}
          aria-label={isPlaying ? "Click to pause video" : "Click to play video"}
        >
          <video
            ref={videoRef}
            src={video}
            poster={poster}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="chrome-video-element"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Play / Pause indicator overlay */}
          {!isPlaying && (
            <div className="chrome-play-overlay">
              <div className="chrome-play-btn">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          )}

          {/* Audio Mute / Unmute Button */}
          <button
            type="button"
            className="chrome-sound-toggle"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
            title={isMuted ? "Click to hear audio" : "Mute"}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
            <span className="chrome-sound-label">{isMuted ? "Sound Off" : "Sound On"}</span>
          </button>
        </div>
      </div>

      {caption && (
        <p className="chrome-mockup-caption" dangerouslySetInnerHTML={{ __html: caption }} />
      )}
    </div>
  );
}

