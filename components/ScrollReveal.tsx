"use client";

import { useEffect } from "react";

/**
 * Native IntersectionObserver scroll-reveal for work cards and process steps.
 * Server-rendered markup stays fully visible/crawlable; the init class is only
 * added on the client, so no-JS and crawlers never see hidden content.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    // ---- Work cards ----
    const cards = [...document.querySelectorAll<HTMLElement>(".card")];
    let order = 0;
    const cardIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          cardIO.unobserve(card);
          card.style.transitionDelay = `${order++ * 60}ms`;
          requestAnimationFrame(() => card.classList.add("rv-in"));
          card.addEventListener("transitionend", function done(e) {
            if ((e as TransitionEvent).propertyName !== "transform") return;
            card.removeEventListener("transitionend", done);
            card.style.transitionDelay = "";
            card.classList.remove("rv-init", "rv-in");
            order = Math.max(0, order - 1);
          });
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    cards.forEach((c) => {
      c.classList.add("rv-init");
      cardIO.observe(c);
    });

    // NOTE: Process `.step` cards intentionally excluded — they use static
    // rotate() tilts that a translateY reveal would override.

    return () => {
      cardIO.disconnect();
    };
  }, []);

  return null;
}
