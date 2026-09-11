"use client";

import React, { useState, useRef } from "react";

export type VideoOption = {
  label: string;
  video: string;
  poster?: string;
};

type Props = {
  video?: string;
  poster?: string;
  image?: string;
  videos?: VideoOption[];
  caption?: string;
  className?: string;
  aspectRatio?: string;
};

/**
 * Pixel-perfect iPad / Tablet device mockup matching the user's reference image,
 * featuring realistic silver chassis, matte black bezel, top camera & sensor array,
 * and high-performance HTML5 video playback with play/pause and audio controls.
 */
export default function TabletVideoMockup({
  video,
  poster,
  image,
  videos,
  caption,
  className = "",
  aspectRatio = "632 / 916",
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeVideo =
    videos && videos.length > 0 ? videos[selectedIndex].video : video || "/images/learn-fun/learn-fun-tablet-1.mp4";
  const activePoster =
    videos && videos.length > 0 ? videos[selectedIndex].poster : poster || "/images/learn-fun/tablet-frame-1.jpg";

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

  const handleSwitchVideo = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedIndex(idx);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className={`tablet-mockup-wrapper ${className}`}>
      {/* Optional video switcher tabs if multiple videos are provided */}
      {videos && videos.length > 1 && (
        <div className="tablet-mockup-tabs" role="tablist">
          {videos.map((v, i) => (
            <button
              key={v.label}
              type="button"
              role="tab"
              aria-selected={selectedIndex === i}
              className={`tablet-tab-btn ${selectedIndex === i ? "active" : ""}`}
              onClick={(e) => handleSwitchVideo(i, e)}
            >
              <span className="tablet-tab-dot" />
              {v.label}
            </button>
          ))}
        </div>
      )}

      {/* ── iPad Outer Chassis (Silver/Aluminum Edge) ────────────────── */}
      <div className="tablet-mockup-chassis">
        {/* Matte Black Bezel */}
        <div className="tablet-mockup-bezel">
          {/* Top Camera & Sensor Array (matching reference image) */}
          <div className="tablet-mockup-sensors" aria-hidden="true">
            <span className="sensor-dot sensor-light" />
            <span className="sensor-lens" />
            <span className="sensor-dot sensor-ir" />
          </div>

          {/* Screen Viewport with Video Player or Image */}
          <div
            className="tablet-mockup-screen"
            style={{ aspectRatio: image ? "467 / 355" : aspectRatio }}
            onClick={image ? undefined : togglePlay}
            role={image ? undefined : "button"}
            tabIndex={image ? undefined : 0}
            aria-label={image ? undefined : isPlaying ? "Click to pause video" : "Click to play video"}
          >
            {image ? (
              <img
                src={image}
                alt="Learn Fun tablet learning interface preview"
                className="tablet-image-element"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <>
                <video
                  key={activeVideo}
                  ref={videoRef}
                  src={activeVideo}
                  poster={activePoster}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="tablet-video-element"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Play / Pause overlay */}
                {!isPlaying && (
                  <div className="tablet-play-overlay">
                    <div className="tablet-play-btn">
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Audio Mute / Unmute Button */}
                <button
                  type="button"
                  className="tablet-sound-toggle"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
                  title={isMuted ? "Click to hear audio" : "Mute"}
                >
                  {isMuted ? (
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                  <span className="tablet-sound-label">{isMuted ? "Sound Off" : "Sound On"}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {caption && (
        <figcaption className="tablet-mockup-caption" dangerouslySetInnerHTML={{ __html: caption }} />
      )}
    </div>
  );
}
