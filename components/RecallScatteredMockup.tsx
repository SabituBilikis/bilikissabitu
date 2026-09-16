"use client";

import React from "react";

export function ScatteredWorkflowMockup({ ratio = "r169" }: { ratio?: string }) {
  return (
    <div
      className={`fig-scatter-realistic fig-${ratio}`}
      role="img"
      aria-label="Realistic multi-app mockup showing saved items scattered across WhatsApp, Apple Notes, Safari bookmarks, and Camera Roll screenshots"
    >
      {/* Background Ambience & Grid */}
      <div className="scatter-canvas-bg">
        <div className="scatter-grid-lines" />
        <div className="scatter-central-beacon">
          <div className="beacon-ring beacon-r1" />
          <div className="beacon-ring beacon-r2" />
          <div className="beacon-core">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="beacon-tag">Where was it saved?</span>
          </div>
        </div>
      </div>

      {/* SVG Connecting trails */}
      <svg className="scatter-connector-svg" viewBox="0 0 1000 562" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradChat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#25D366" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8A8A8E" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradLink" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8A8A8E" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradNote" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8A8A8E" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradShot" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8A8A8E" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <path d="M 230 140 C 350 180, 420 220, 500 280" fill="none" stroke="url(#gradChat)" strokeWidth="1.5" strokeDasharray="4 4" className="flow-dash" />
        <path d="M 760 130 C 660 180, 580 220, 500 280" fill="none" stroke="url(#gradLink)" strokeWidth="1.5" strokeDasharray="4 4" className="flow-dash" />
        <path d="M 270 420 C 360 380, 430 330, 500 280" fill="none" stroke="url(#gradNote)" strokeWidth="1.5" strokeDasharray="4 4" className="flow-dash" />
        <path d="M 760 410 C 670 370, 580 320, 500 280" fill="none" stroke="url(#gradShot)" strokeWidth="1.5" strokeDasharray="4 4" className="flow-dash" />
      </svg>

      {/* 1. TOP-LEFT: WhatsApp Self-Chat Card */}
      <div className="scatter-item item-chat">
        <div className="card-glass-shell">
          <div className="app-card-header">
            <div className="app-badge whatsapp-badge">
              <span className="app-dot" />
              <span>WhatsApp · You</span>
            </div>
            <span className="app-timestamp">Yesterday</span>
          </div>

          <div className="chat-bubble-content">
            <p className="chat-text">
              Read this breakdown later: how Linear built their onboarding loop without friction.
            </p>
            <div className="chat-meta">
              <span className="chat-time">11:42 PM</span>
              <svg className="check-icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M1.5 8.5L5.5 12.5L14.5 3.5" stroke="#53bdeb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 8.5L9 12.5L15 6.5" stroke="#53bdeb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className="fragment-warning">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>Lost in 14,000 chat messages</span>
          </div>
        </div>
      </div>

      {/* 2. TOP-RIGHT: Safari / Chrome Bookmark Preview Card */}
      <div className="scatter-item item-link">
        <div className="card-glass-shell">
          <div className="app-card-header">
            <div className="app-badge safari-badge">
              <span className="app-dot" />
              <span>Browser · Saved Bookmark</span>
            </div>
            <svg className="bookmark-icon" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          <div className="link-preview-box">
            <div className="link-og-image">
              <div className="og-pattern" />
              <span className="og-pill">ARTICLE</span>
            </div>
            <div className="link-details">
              <span className="link-domain">linear.app/method</span>
              <h5 className="link-headline">Designing with Momentum: Why Speed is a Feature</h5>
            </div>
          </div>

          <div className="fragment-warning">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>Buried in 230 unread tabs</span>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM-LEFT: Apple Notes Scratchpad Card */}
      <div className="scatter-item item-note">
        <div className="card-glass-shell">
          <div className="notes-yellow-header" />
          <div className="app-card-header">
            <div className="app-badge notes-badge">
              <span className="app-dot" />
              <span>Notes · Quick Ideas</span>
            </div>
            <span className="app-timestamp">May 14</span>
          </div>

          <div className="note-body">
            <h5 className="note-title">Product Reference — Retrieval</h5>
            <ul className="note-checklist">
              <li className="note-item done">
                <span className="chk" />
                <span>Zero organization requirement</span>
              </li>
              <li className="note-item">
                <span className="chk" />
                <span>Search by context not folders</span>
              </li>
            </ul>
          </div>

          <div className="fragment-warning">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>Unfiled across 3 notes apps</span>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM-RIGHT: Camera Roll Screenshot Card */}
      <div className="scatter-item item-shot">
        <div className="card-glass-shell">
          <div className="app-card-header">
            <div className="app-badge photos-badge">
              <span className="app-dot" />
              <span>Camera Roll · Screenshot</span>
            </div>
            <span className="app-timestamp">IMG_8492.PNG</span>
          </div>

          <div className="screenshot-crop">
            <div className="mock-screen-inner">
              <div className="mock-ui-header">
                <span className="bar-title">Design System 2.0</span>
                <span className="bar-tag">UI</span>
              </div>
              <div className="mock-ui-grid">
                <div className="mock-ui-cell c1" />
                <div className="mock-ui-cell c2" />
                <div className="mock-ui-cell c3" />
              </div>
            </div>
            <div className="screenshot-ocr-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3" />
              </svg>
              <span>Image text unindexed</span>
            </div>
          </div>

          <div className="fragment-warning">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>No searchable tags or OCR</span>
          </div>
        </div>
      </div>
    </div>
  );
}