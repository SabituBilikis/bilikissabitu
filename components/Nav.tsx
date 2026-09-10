"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className="nav">
      <div className="wrap nav-in">
        <a href="#top" className="brand" aria-label="Bilikis Sabitu, home">
          <Image src="/images/brand/profile.png" alt="Bilikis Sabitu" width={36} height={36} className="brand-avatar" priority />
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <span className="status">
            <span className="dot" />
            Open to work
          </span>
          <a href="#contact" className="nav-cta">
            Get in touch
          </a>
        </div>
        <div className="nav-mobile">
          <a href="#contact" className="nav-cta">
            Get in touch
          </a>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div id="mobile-menu" className="mobile-menu" data-open={open}>
        <a href="#work" onClick={close}>Work</a>
        <a href="#about" onClick={close}>About</a>
        <span className="status">
          <span className="dot" />
          Open to work
        </span>
      </div>
    </nav>
  );
}
