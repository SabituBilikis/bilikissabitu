"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const proof = [
  ["Building solo, native", "Play Store bound"],
  ["$20K raised", "crisis fundraising"],
  ["4-language", "WCAG platform"],
  ["Figma → code", "no dev handoff"],
] as const;

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduce || !root.current) return;

    const scope = root.current;
    const badge = scope.querySelector(".hero-badge");
    const h1 = scope.querySelector("h1");
    const sub = scope.querySelector(".hero-sub");
    const cta = scope.querySelector(".cta-row");

    // transform/opacity only — elements keep their layout box, zero CLS
    const ctx = gsap.context(() => {
      gsap.set([badge, h1, sub, cta], { autoAlpha: 0 });
      gsap.set(badge, { y: 12 });
      gsap.set(h1, { y: 26 });
      gsap.set([sub, cta], { y: 14 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(badge, { autoAlpha: 1, y: 0, duration: 0.45 }, 0)
        .to(h1, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.12)
        .to([sub, cta], { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08 }, 0.34);
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <header className="hero" id="top" ref={root}>
      <div className="wrap">
        <span className="hero-badge">
          <span className="dot" />
          Open to work 
        </span>
        <span className="eyebrow">Product Designer · AI-Native Builder</span>
        <h1>
          I design{" "}
          <span
            className="htile htile-img"
            role="img"
            aria-label="Product design preview"
          />{" "}
          <span className="g">and ship</span>
          <br />
          <span className="g">production apps</span>{" "}
          <span className="htile htile-dark" aria-hidden="true">
            ∞
          </span>{" "}
          end&#8209;to&#8209;end.
        </h1>
        <p className="hero-sub">
          From Figma to React Native to live — solo, with an AI-native workflow.
          I design <b>the states most teams skip.</b>
        </p>
        <div className="cta-row">
          <a href="#work" className="btn btn-primary">
            See the work <span className="arw">→</span>
          </a>
          <a href="#contact" className="btn btn-ghost">
            Get in touch
          </a>
        </div>
        <div className="hero-ticker" aria-label="Selected proof points">
          <div className="ticker-track">
            {[...proof, ...proof].map(([a, b], i) => (
              <span key={i} aria-hidden={i >= proof.length ? true : undefined}>
                <b>{a}</b> · {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
