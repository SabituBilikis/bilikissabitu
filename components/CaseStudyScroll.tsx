"use client";

import { useEffect } from "react";

/** Reveal-on-scroll for case-study sections. Server-rendered content stays
 * fully visible/crawlable; the reveal is purely a client-side enhancement. */
export default function CaseStudyScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const rev = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            rev.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    const sections = [...document.querySelectorAll(".cs-section")];
    sections.forEach((el) => {
      el.classList.add("reveal-init");
      rev.observe(el);
    });
    return () => rev.disconnect();
  }, []);

  return null;
}
