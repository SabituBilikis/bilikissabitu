"use client";

import React from "react";
import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";

/**
 * High-Fidelity Studio Mockup for Fig 1.0.
 * Replaces generic AI-style vector shapes with authentic, production-grade
 * Apple iPhone device mockups displaying real UI states.
 */
export function ScatteredWorkflowMockup({ ratio = "r169" }: { ratio?: string }) {
  return (
    <div
      className={`fig-scatter-studio fig-${ratio}`}
      role="img"
      aria-label="High fidelity studio mockup of four mobile screens showing saved items scattered across WhatsApp, Apple Notes, Browser links, and Camera Roll"
    >
      {/* Studio Header / Context Bar */}
      <div className="studio-top-bar">
        <div className="studio-top-left">
          <span className="studio-tag-dot" />
          <span className="studio-tag-text">The Scattered Intake Dilemma</span>
        </div>
        <div className="studio-top-right">
          <span className="studio-meta-pill">4 Fragmentation Channels</span>
          <span className="studio-meta-pill highlight">Zero Retrieval Index</span>
        </div>
      </div>

      {/* Grid of 4 Realistic iPhone Device Mockups */}
      <div className="studio-devices-grid">
        {/* Device 1: WhatsApp Self-Chat */}
        <div className="studio-device-col">
          <div className="device-header-strip">
            <div className="app-meta-badge whatsapp">
              <span className="badge-icon">💬</span>
              <span className="badge-name">WhatsApp · Self Chat</span>
            </div>
            <span className="badge-status error">No Search Filter</span>
          </div>

          <div className="studio-phone-wrapper">
            <div className="realistic-screen-surface whatsapp-surface">
              {/* WhatsApp iOS Status & Header */}
              <div className="wa-nav-bar">
                <div className="wa-nav-back">‹ Chats</div>
                <div className="wa-nav-profile">
                  <div className="wa-avatar">Me</div>
                  <div className="wa-info">
                    <span className="wa-name">You (Message Yourself)</span>
                    <span className="wa-sub">14,280 messages</span>
                  </div>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="wa-chat-body">
                <div className="wa-date-chip">Yesterday</div>
                
                <div className="wa-bubble incoming">
                  <p className="wa-msg">Linear onboarding tear-down breakdown — check before sprint planning</p>
                  <span className="wa-time">09:15 AM</span>
                </div>

                <div className="wa-bubble outgoing highlighted">
                  <p className="wa-msg">
                    https://linear.app/method/principles<br />
                    <em>&quot;Great breakdown on speed as a feature.&quot;</em>
                  </p>
                  <div className="wa-meta-row">
                    <span className="wa-time">11:42 PM</span>
                    <span className="wa-ticks">✓✓</span>
                  </div>
                </div>

                <div className="wa-bubble outgoing faded">
                  <p className="wa-msg">IMG_2049.PNG</p>
                  <span className="wa-time">11:43 PM</span>
                </div>
              </div>
            </div>
            {/* Real Apple Frame Bezel */}
            <div className="studio-frame-overlay" />
          </div>

          <div className="device-caption-strip">
            <span className="caption-bold">WhatsApp</span>
            <span className="caption-detail">Links buried under thousands of daily chats.</span>
          </div>
        </div>

        {/* Device 2: Apple Notes */}
        <div className="studio-device-col">
          <div className="device-header-strip">
            <div className="app-meta-badge notes">
              <span className="badge-icon">📝</span>
              <span className="badge-name">Apple Notes</span>
            </div>
            <span className="badge-status error">Unfiled Scratchpad</span>
          </div>

          <div className="studio-phone-wrapper">
            <div className="realistic-screen-surface notes-surface">
              {/* Notes iOS Header */}
              <div className="notes-nav-bar">
                <div className="notes-nav-back">‹ Folders</div>
                <div className="notes-actions">
                  <span className="notes-share-icon">↑</span>
                  <span className="notes-more-icon">•••</span>
                </div>
              </div>

              {/* Note Body */}
              <div className="notes-content-body">
                <span className="notes-timestamp">May 14, 2026 at 3:20 PM</span>
                <h4 className="notes-h1">Linear Onboarding Reference</h4>
                <div className="notes-separator" />
                <p className="notes-text">
                  - Don&apos;t ask user to categorize on step 1<br />
                  - Instant optimistic save<br />
                  - Fast retrieval beats nested folders
                </p>
                <div className="notes-checklist-box">
                  <div className="notes-check-row">
                    <span className="notes-box-dot checked" />
                    <span>Read Linear method doc</span>
                  </div>
                  <div className="notes-check-row">
                    <span className="notes-box-dot" />
                    <span>Apply to Recall v1 scope</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="studio-frame-overlay" />
          </div>

          <div className="device-caption-strip">
            <span className="caption-bold">Notes</span>
            <span className="caption-detail">Unstructured notes with no link back to source.</span>
          </div>
        </div>

        {/* Device 3: Browser Safari Bookmarks */}
        <div className="studio-device-col">
          <div className="device-header-strip">
            <div className="app-meta-badge safari">
              <span className="badge-icon">🧭</span>
              <span className="badge-name">Safari Bookmarks</span>
            </div>
            <span className="badge-status error">200+ Dormant Tabs</span>
          </div>

          <div className="studio-phone-wrapper">
            <div className="realistic-screen-surface safari-surface">
              {/* Safari Tab Bar */}
              <div className="safari-url-bar">
                <span className="safari-lock">🔒</span>
                <span className="safari-url-text">linear.app/method/principles</span>
                <span className="safari-refresh">↻</span>
              </div>

              {/* Real Web Page Preview */}
              <div className="safari-page-body">
                <div className="safari-hero-banner">
                  <span className="safari-kicker">LINEAR METHOD</span>
                  <h5 className="safari-title">Designing with Momentum</h5>
                </div>
                <div className="safari-article-snippet">
                  <p>Momentum is the lifeblood of high-performing product teams. When speed increases, decision quality improves...</p>
                </div>
                <div className="safari-bookmark-toast">
                  <span>★ Added to Reading List (Unread)</span>
                </div>
              </div>
            </div>
            <div className="studio-frame-overlay" />
          </div>

          <div className="device-caption-strip">
            <span className="caption-bold">Browser</span>
            <span className="caption-detail">Saved to bookmarks and forgotten forever.</span>
          </div>
        </div>

        {/* Device 4: iOS Photos Screenshot Gallery */}
        <div className="studio-device-col">
          <div className="device-header-strip">
            <div className="app-meta-badge photos">
              <span className="badge-icon">📸</span>
              <span className="badge-name">Camera Roll</span>
            </div>
            <span className="badge-status error">Text Not Searchable</span>
          </div>

          <div className="studio-phone-wrapper">
            <div className="realistic-screen-surface photos-surface">
              {/* Photos Top Bar */}
              <div className="photos-top-bar">
                <span>‹ Screenshots</span>
                <span className="photos-counter">4,812 Items</span>
                <span>Select</span>
              </div>

              {/* Screenshot Grid View */}
              <div className="photos-grid">
                <div className="photo-cell primary-shot">
                  <div className="shot-preview-ui">
                    <div className="shot-header-pill">Onboarding Wireframe</div>
                    <div className="shot-skeleton-cards">
                      <div className="shot-sk-line l1" />
                      <div className="shot-sk-line l2" />
                    </div>
                  </div>
                  <span className="ocr-fail-tag">No OCR Text Index</span>
                </div>
                <div className="photo-cell c1" />
                <div className="photo-cell c2" />
                <div className="photo-cell c3" />
                <div className="photo-cell c4" />
                <div className="photo-cell c5" />
              </div>
            </div>
            <div className="studio-frame-overlay" />
          </div>

          <div className="device-caption-strip">
            <span className="caption-bold">Screenshots</span>
            <span className="caption-detail">Trapped as static pixels with no text search.</span>
          </div>
        </div>
      </div>

      {/* Bottom Summary Banner */}
      <div className="studio-bottom-banner">
        <div className="banner-left">
          <span className="banner-icon">⚠️</span>
          <span className="banner-text">
            <strong>The Core UX Failure:</strong> Each platform accepts the save, but none can answer: <em>&quot;Where did I save that thing about Linear?&quot;</em>
          </span>
        </div>
        <div className="banner-right">
          <span className="banner-pill">Associative Memory Breakdown</span>
        </div>
      </div>
    </div>
  );
}