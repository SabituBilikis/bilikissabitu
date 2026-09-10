"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";


const stackPills = [
  { label: "Figma", logo: "figma" },
  { label: "Claude Code", logo: "claude" },
  { label: "Codex", logo: "openai" },
  { label: "ChatGPT", logo: "openai" },
  { label: "Lovable", logo: "lovable" },
  { label: "Antigravity", logo: "antigravity" },
];

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
    const stack = scope.querySelector(".hero-stack-marquee");

    // transform/opacity only — elements keep their layout box, zero CLS
    const ctx = gsap.context(() => {
      gsap.set([badge, h1, sub, cta, stack], { autoAlpha: 0 });
      gsap.set(badge, { y: 12 });
      gsap.set(h1, { y: 26 });
      gsap.set([sub, cta, stack], { y: 14 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(badge, { autoAlpha: 1, y: 0, duration: 0.45 }, 0)
        .to(h1, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.12)
        .to([sub, cta, stack], { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08 }, 0.34);
    }, scope);

    return () => ctx.revert();
  }, []);

  // 4 duplicates ensure seamless infinite wrapping at translateX(-50%) on any display width
  const marqueeItems = [...stackPills, ...stackPills, ...stackPills, ...stackPills];

  return (
    <header className="hero" id="top" ref={root}>
      <div className="wrap">
        <span className="hero-badge">
          <span className="dot" />
          Open to work 
        </span>
        <span className="eyebrow">Product Designer · AI-Native Builder</span>
        <h1>
          Product Designer{" "}
          <span
            className="htile htile-img"
            role="img"
            aria-label="Product design preview"
          />{" "}
          <span className="g">turning</span>
          <br />
          <span className="g">ideas into</span>{" "}
          <span className="htile htile-dark" aria-hidden="true">
            ∞
          </span>{" "}
          digital products
        </h1>
        <p className="hero-sub">
          I design end-to-end experiences across UX, UI, systems and prototyping, with the technical fluency to take ideas from Figma into production using AI assisted workflow.
        </p>
        <div className="cta-row">
          <a href="mailto:sabitubilikis96@gmail.com" className="btn btn-primary">
            Get in touch <span className="arw">→</span>
          </a>
          <a
            href="https://drive.google.com/file/d/1sP3iajFnCaA_vQ3InErJX8hmhDVdqSgE/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Resume
          </a>
        </div>

        <div className="hero-stack-marquee" aria-label="Tools and tech stack marquee">
          <div className="hero-stack-track">
            {marqueeItems.map((p, i) => (
              <span
                className="hero-stack-pill"
                key={i}
                aria-hidden={i >= stackPills.length ? true : undefined}
              >
                <img src={`/logos/${p.logo}.svg`} alt="" aria-hidden="true" />
                {p.label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </header>
  );
}
