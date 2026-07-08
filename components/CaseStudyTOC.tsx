"use client";

import { useEffect, useRef } from "react";

export default function CaseStudyTOC({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const links = [...(navRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.toggle("on", l.dataset.sec === entry.target.id));
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    document.querySelectorAll("section.cs-section").forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  return (
    <nav className="cs-toc" ref={navRef}>
      <span className="mono">Contents</span>
      <div className="cs-toc-links">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} data-sec={s.id}>
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
